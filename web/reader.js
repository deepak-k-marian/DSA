const content = document.querySelector('#content');
const index = document.querySelector('#reader-index');
const file = new URLSearchParams(window.location.search).get('file');

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[character]));

function syntaxHighlight(src, lang) {
  const LANGS = ['python', 'py', 'text', ''];
  if (!LANGS.includes(lang)) return escapeHtml(src);

  const KEYWORDS = new Set([
    'def','class','return','if','elif','else','for','while','in','not','and',
    'or','import','from','as','with','try','except','finally','raise','pass',
    'break','continue','lambda','yield','True','False','None','assert','del',
    'global','nonlocal','is','self'
  ]);
  const BUILTINS = new Set([
    'print','len','range','enumerate','zip','map','filter','sorted','sum',
    'min','max','abs','int','float','str','list','dict','set','tuple','bool',
    'type','isinstance','any','all','input','open','round','pow','divmod',
    'ord','chr','hex','bin','format','repr','super','vars','iter','next',
    'reversed','hash','id'
  ]);

  const tokens = [];
  let i = 0;

  while (i < src.length) {
    // Decorator  @name
    if (src[i] === '@') {
      let j = i + 1;
      while (j < src.length && /[\w.]/.test(src[j])) j++;
      tokens.push({ t: 'deco', v: src.slice(i, j) }); i = j; continue;
    }
    // Comment  # ...
    if (src[i] === '#') {
      let j = src.indexOf('\n', i);
      if (j === -1) j = src.length;
      tokens.push({ t: 'comment', v: src.slice(i, j) }); i = j; continue;
    }
    // Triple-quoted string
    const tq = src.slice(i, i + 3);
    if (tq === '"""' || tq === "'''") {
      let j = i + 3;
      while (j < src.length && src.slice(j, j + 3) !== tq) j++;
      j += 3;
      tokens.push({ t: 'string', v: src.slice(i, j) }); i = j; continue;
    }
    // Single-quoted string
    if (src[i] === '"' || src[i] === "'") {
      const q = src[i]; let j = i + 1;
      while (j < src.length && src[j] !== q && src[j] !== '\n') {
        if (src[j] === '\\') j++; j++;
      }
      if (src[j] === q) j++;
      tokens.push({ t: 'string', v: src.slice(i, j) }); i = j; continue;
    }
    // Number
    if (/[0-9]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[0-9._xXbBoO]/.test(src[j])) j++;
      tokens.push({ t: 'number', v: src.slice(i, j) }); i = j; continue;
    }
    // Word / keyword / builtin
    if (/[a-zA-Z_]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[\w]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const t = KEYWORDS.has(word) ? 'keyword' : BUILTINS.has(word) ? 'builtin' : 'id';
      tokens.push({ t, v: word }); i = j; continue;
    }
    tokens.push({ t: 'other', v: src[i] }); i++;
  }

  return tokens.map(({ t, v }) => {
    const e = escapeHtml(v);
    if (t === 'other' || t === 'id') return e;
    return `<span class="tok-${t}">${e}</span>`;
  }).join('');
}

// Convert the LaTeX subset used in these notes into HTML.
// Input has already been HTML-escaped by escapeHtml(), so we only
// inject safe HTML tags (sup/sub) and Unicode replacement strings.
function renderMath(tex) {
  let s = tex;
  // --- Greek / symbols ---
  s = s.replace(/\\Omega/g, '\u03A9');
  s = s.replace(/\\Theta/g, '\u0398');
  s = s.replace(/\\infty/g, '\u221E');
  s = s.replace(/\\ldots|\\cdots/g, '\u2026');
  s = s.replace(/\\cdot/g, '\u00B7');
  s = s.replace(/\\lfloor/g, '\u230A');
  s = s.replace(/\\rfloor/g, '\u230B');
  s = s.replace(/\\lceil/g,  '\u2308');
  s = s.replace(/\\rceil/g,  '\u2309');
  s = s.replace(/\\times/g, '\u00D7');
  s = s.replace(/\\geq/g, '\u2265');
  s = s.replace(/\\leq/g, '\u2264');
  s = s.replace(/\\neq/g, '\u2260');
  s = s.replace(/\\approx/g, '\u2248');
  s = s.replace(/\\pm/g, '\u00B1');
  // --- Named functions (strip backslash, keep name) ---
  s = s.replace(/\\(log|ln|sin|cos|tan|max|min|gcd|lcm|sum|prod|lim)/g, '$1');
  // --- \frac{a}{b} -> a/b ---
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');
  // --- Braced super / subscripts ---
  s = s.replace(/\^\{([^}]*)\}/g, (_, inner) => `<sup>${inner}</sup>`);
  s = s.replace(/_\{([^}]*)\}/g,  (_, inner) => `<sub>${inner}</sub>`);
  // --- Single-char super / subscripts ---
  s = s.replace(/\^([a-zA-Z0-9])/g, (_, c) => `<sup>${c}</sup>`);
  s = s.replace(/_([a-zA-Z0-9])/g,  (_, c) => `<sub>${c}</sub>`);
  // --- Strip any remaining backslashes before letters ---
  s = s.replace(/\\([a-zA-Z]+)/g, '$1');
  return s;
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Render LaTeX math wrapped in $...$
  html = html.replace(/\$([^$]+)\$/g, (_, tex) => `<span class="math">${renderMath(tex)}</span>`);
  return html;
}

function renderMarkdown(markdown, sourceFile) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const output = [];
  const headings = [];
  let paragraph = [];
  let list = [];
  let code = null;
  let codeLines = [];
  let quote = [];
  let table = [];

  const flushParagraph = () => {
    if (paragraph.length) { output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`); paragraph = []; }
  };
  const flushList = () => {
    if (list.length) { output.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`); list = []; }
  };
  const flushQuote = () => {
    if (quote.length) { output.push(`<blockquote>${inlineMarkdown(quote.join(' '))}</blockquote>`); quote = []; }
  };
  const flushTable = () => {
    if (table.length) {
      const rows = table.filter((row) => !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(row));
      const cells = rows.map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean));
      output.push(`<div class="table-wrap"><table>${cells.map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex === 0 ? 'th' : 'td'}>${inlineMarkdown(cell)}</${rowIndex === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>`);
      table = [];
    }
  };

  lines.forEach((line) => {
    if (code) {
      if (line.startsWith('```')) {
        const codeMarkup = code === 'mermaid'
          ? `<div class="diagram-card"><div class="diagram-label">CONCEPT MAP</div><div class="mermaid">${escapeHtml(codeLines.join('\n'))}</div></div>`
          : `<pre><code class="language-${code}">${syntaxHighlight(codeLines.join('\n'), code)}</code></pre>`;
        output.push(codeMarkup);
        code = null;
        codeLines = [];
      } else codeLines.push(line);
      return;
    }
    if (line.startsWith('```')) { flushParagraph(); flushList(); flushQuote(); flushTable(); code = line.slice(3).trim() || 'text'; codeLines = []; return; }
    if (/^\s*\|/.test(line)) { flushParagraph(); flushList(); flushQuote(); table.push(line); return; }
    if (!line.trim()) { flushParagraph(); flushList(); flushQuote(); flushTable(); return; }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) { flushParagraph(); flushList(); flushQuote(); flushTable(); return; }
    const heading = line.match(/^(#{1,3})\s+(.+)/);
    if (heading) { flushParagraph(); flushList(); flushQuote(); flushTable(); const level = heading[1].length; const id = `heading-${headings.length}`; headings.push({ id, text: heading[2] }); output.push(`<h${level} id="${id}">${inlineMarkdown(heading[2])}</h${level}>`); return; }
    if (/^>\s?/.test(line)) { flushParagraph(); flushList(); flushTable(); quote.push(line.replace(/^>\s?/, '')); return; }
    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/);
    if (item) { flushParagraph(); flushQuote(); flushTable(); list.push(item[1]); return; }
    flushList(); flushQuote(); flushTable(); paragraph.push(line.trim());
  });
  flushParagraph(); flushList(); flushQuote(); flushTable();
  content.innerHTML = output.join('');
  content.querySelectorAll('img').forEach((image) => { image.src = new URL(image.getAttribute('src'), new URL(sourceFile, window.location.href)).href; });
  index.innerHTML = headings.filter((heading) => heading.text !== 'Question').map((heading) => `<a href="#${heading.id}">${inlineMarkdown(heading.text)}</a>`).join('');
  const indexLinks = [...index.querySelectorAll('a')];
  const indexHeadings = indexLinks.map((link) => document.querySelector(link.hash));
  const setActiveHeading = (headingId) => {
    indexLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${headingId}`));
  };
  setActiveHeading(indexHeadings[0]?.id);
  const headingObserver = new IntersectionObserver((entries) => {
    const visibleHeading = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
    if (visibleHeading) setActiveHeading(visibleHeading.target.id);
  }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
  indexHeadings.forEach((heading) => headingObserver.observe(heading));
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: { primaryColor: '#c8e9d8', primaryTextColor: '#1c2525', primaryBorderColor: '#2d6c58', lineColor: '#e9785b', secondaryColor: '#fbfaf6', tertiaryColor: '#f4f1ea' } });
    window.mermaid.run({ querySelector: '.mermaid' });
  }
  const title = headings.find((heading) => heading.text !== 'Question')?.text || 'DSA Note';
  document.title = `${title} / DSA Journal`;
}

if (!file) {
  content.innerHTML = '<div class="error-state">No note was selected. <a href="index.html#notes">Return to the journal.</a></div>';
} else {
  const targetFile = file.replace(/^(\.\.\/)+/, './');
  const fetchNote = (filePath) => fetch(new URL(filePath, window.location.href)).then((response) => {
    if (!response.ok) throw new Error('Note unavailable');
    return response.text();
  });

  fetchNote(targetFile)
    .catch(() => fetchNote(file))
    .catch(() => fetchNote(`../${targetFile.replace(/^\.\//, '')}`))
    .then((markdown) => {
      try { renderMarkdown(markdown, `../${targetFile.replace(/^\.\//, '')}`); } catch (error) { console.error('Could not render note', error); throw error; }
    })
    .catch(() => { content.innerHTML = '<div class="error-state">This note could not be opened. <a href="index.html#notes">Return to the journal.</a></div>'; });
}