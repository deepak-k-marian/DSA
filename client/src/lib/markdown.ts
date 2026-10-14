export interface Heading { id: string; text: string }
export interface RenderedMarkdown { html: string; headings: Heading[] }

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character] ?? character));
}

export function syntaxHighlight(source: string, language: string): string {
  if (!['python', 'py', 'text', ''].includes(language)) return escapeHtml(source);
  const keywords = new Set('def class return if elif else for while in not and or import from as with try except finally raise pass break continue lambda yield True False None assert del global nonlocal is self'.split(' '));
  const builtins = new Set('print len range enumerate zip map filter sorted sum min max abs int float str list dict set tuple bool type isinstance any all input open round pow divmod ord chr hex bin format repr super vars iter next reversed hash id'.split(' '));
  const tokens: Array<{ type: string; value: string }> = [];
  let index = 0;
  while (index < source.length) {
    if (source[index] === '@') { let end = index + 1; while (end < source.length && /[\w.]/.test(source[end])) end++; tokens.push({ type: 'deco', value: source.slice(index, end) }); index = end; continue; }
    if (source[index] === '#') { let end = source.indexOf('\n', index); if (end < 0) end = source.length; tokens.push({ type: 'comment', value: source.slice(index, end) }); index = end; continue; }
    const triple = source.slice(index, index + 3);
    if (triple === '"""' || triple === "'''") { let end = index + 3; while (end < source.length && source.slice(end, end + 3) !== triple) end++; end += 3; tokens.push({ type: 'string', value: source.slice(index, end) }); index = end; continue; }
    if (source[index] === '"' || source[index] === "'") { const quote = source[index]; let end = index + 1; while (end < source.length && source[end] !== quote && source[end] !== '\n') { if (source[end] === '\\') end++; end++; } if (source[end] === quote) end++; tokens.push({ type: 'string', value: source.slice(index, end) }); index = end; continue; }
    if (/[0-9]/.test(source[index])) { let end = index; while (end < source.length && /[0-9._xXbBoO]/.test(source[end])) end++; tokens.push({ type: 'number', value: source.slice(index, end) }); index = end; continue; }
    if (/[a-zA-Z_]/.test(source[index])) { let end = index; while (end < source.length && /\w/.test(source[end])) end++; const value = source.slice(index, end); tokens.push({ type: keywords.has(value) ? 'keyword' : builtins.has(value) ? 'builtin' : 'id', value }); index = end; continue; }
    tokens.push({ type: 'other', value: source[index++] });
  }
  return tokens.map(({ type, value }) => { const escaped = escapeHtml(value); return type === 'other' || type === 'id' ? escaped : `<span class="tok-${type}">${escaped}</span>`; }).join('');
}

function renderMath(value: string): string {
  return value.replace(/\\Omega/g, 'Ω').replace(/\\Theta/g, 'Θ').replace(/\\infty/g, '∞').replace(/\\ldots|\\cdots/g, '…').replace(/\\cdot/g, '·').replace(/\\lfloor/g, '⌊').replace(/\\rfloor/g, '⌋').replace(/\\lceil/g, '⌈').replace(/\\rceil/g, '⌉').replace(/\\times/g, '×').replace(/\\geq/g, '≥').replace(/\\leq/g, '≤').replace(/\\neq/g, '≠').replace(/\\approx/g, '≈').replace(/\\pm/g, '±')
    .replace(/\\(log|ln|sin|cos|tan|max|min|gcd|lcm|sum|prod|lim)/g, '$1').replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
    .replace(/\^\{([^}]*)\}/g, (_, inner: string) => `<sup>${inner}</sup>`).replace(/_\{([^}]*)\}/g, (_, inner: string) => `<sub>${inner}</sub>`)
    .replace(/\^([a-zA-Z0-9])/g, (_, character: string) => `<sup>${character}</sup>`).replace(/_([a-zA-Z0-9])/g, (_, character: string) => `<sub>${character}</sub>`).replace(/\\([a-zA-Z]+)/g, '$1');
}

function inlineMarkdown(value: string): string {
  let html = escapeHtml(value);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html.replace(/\$([^$]+)\$/g, (_, math: string) => `<span class="math">${renderMath(math)}</span>`);
}

export function renderMarkdown(markdown: string): RenderedMarkdown {
  const output: string[] = [];
  const headings: Heading[] = [];
  let paragraph: string[] = [], list: string[] = [], quote: string[] = [], table: string[] = [], codeLanguage: string | null = null, codeLines: string[] = [];
  const flushParagraph = () => { if (paragraph.length) { output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`); paragraph = []; } };
  const flushList = () => { if (list.length) { output.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`); list = []; } };
  const flushQuote = () => { if (quote.length) { output.push(`<blockquote>${inlineMarkdown(quote.join(' '))}</blockquote>`); quote = []; } };
  const flushTable = () => { if (table.length) { const rows = table.filter((row) => !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(row)).map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean)); output.push(`<div class="table-wrap"><table>${rows.map((row, rowIndex) => `<tr>${row.map((cell) => { const tag = rowIndex === 0 ? 'th' : 'td'; return `<${tag}>${inlineMarkdown(cell)}</${tag}>`; }).join('')}</tr>`).join('')}</table></div>`); table = []; } };
  for (const line of markdown.replace(/\r/g, '').split('\n')) {
    if (codeLanguage) { if (line.startsWith('```')) { output.push(codeLanguage === 'mermaid' ? `<div class="diagram-card"><div class="diagram-label">CONCEPT MAP</div><div class="mermaid">${escapeHtml(codeLines.join('\n'))}</div></div>` : `<pre><code class="language-${codeLanguage}">${syntaxHighlight(codeLines.join('\n'), codeLanguage)}</code></pre>`); codeLanguage = null; codeLines = []; } else codeLines.push(line); continue; }
    if (line.startsWith('```')) { flushParagraph(); flushList(); flushQuote(); flushTable(); codeLanguage = line.slice(3).trim() || 'text'; continue; }
    if (/^\s*\|/.test(line)) { flushParagraph(); flushList(); flushQuote(); table.push(line); continue; }
    if (!line.trim()) { flushParagraph(); flushList(); flushQuote(); flushTable(); continue; }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) { flushParagraph(); flushList(); flushQuote(); flushTable(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)/);
    if (heading) { flushParagraph(); flushList(); flushQuote(); flushTable(); const id = `heading-${headings.length}`; headings.push({ id, text: heading[2] }); output.push(`<h${heading[1].length} id="${id}">${inlineMarkdown(heading[2])}</h${heading[1].length}>`); continue; }
    if (/^>\s?/.test(line)) { flushParagraph(); flushList(); flushTable(); quote.push(line.replace(/^>\s?/, '')); continue; }
    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/);
    if (item) { flushParagraph(); flushQuote(); flushTable(); list.push(item[1]); continue; }
    flushList(); flushQuote(); flushTable(); paragraph.push(line.trim());
  }
  flushParagraph(); flushList(); flushQuote(); flushTable();
  return { html: output.join(''), headings };
}
