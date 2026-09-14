const content = document.querySelector('#content');
const index = document.querySelector('#reader-index');
const file = new URLSearchParams(window.location.search).get('file');

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[character]));

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\$([^$]+)\$/g, '<span class="math">$1</span>');
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
          : `<pre><code class="language-${code}">${escapeHtml(codeLines.join('\n'))}</code></pre>`;
        output.push(codeMarkup);
        code = null;
        codeLines = [];
      } else codeLines.push(line);
      return;
    }
    if (line.startsWith('```')) { flushParagraph(); flushList(); flushQuote(); flushTable(); code = line.slice(3).trim() || 'text'; codeLines = []; return; }
    if (/^\s*\|/.test(line)) { flushParagraph(); flushList(); flushQuote(); table.push(line); return; }
    if (!line.trim()) { flushParagraph(); flushList(); flushQuote(); flushTable(); return; }
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
  fetch(new URL(file, window.location.href)).then((response) => { if (!response.ok) throw new Error('Note unavailable'); return response.text(); }).then((markdown) => {
    try { renderMarkdown(markdown, file); } catch (error) { console.error('Could not render note', error); throw error; }
  }).catch(() => { content.innerHTML = '<div class="error-state">This note could not be opened. <a href="index.html#notes">Return to the journal.</a></div>'; });
}