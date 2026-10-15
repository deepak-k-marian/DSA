import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import { diagramSources, imageAssets } from '../lib/assets';
import { renderMarkdown, type Heading } from '../lib/markdown';
import { renderMermaidDiagrams } from '../lib/mermaid';

export default function Reader() {
  const [params] = useSearchParams();
  const [html, setHtml] = useState('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const file = params.get('file');

  useEffect(() => {
    if (!file) return;
    const target = file.replace(/^(\.\.\/)+/, './');
    const candidates = [target, file, `../${target.replace(/^\.\//, '')}`];
    (async () => {
      for (const candidate of candidates) {
        try {
          const response = await fetch(new URL(candidate, window.location.href));
          if (!response.ok) continue;
          const result = renderMarkdown(await response.text());
          setHtml(result.html); setHeadings(result.headings); setSourceUrl(response.url); document.title = `${result.headings.find((heading) => heading.text !== 'Question')?.text || 'DSA Note'} / DSA Journal`; return;
        } catch { /* Try the next Pages-relative path. */ }
      }
      setError(true);
    })();
  }, [file]);

  useEffect(() => {
    if (!contentRef.current || !html) return;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((image) => {
      const source = image.getAttribute('src');
      const filename = source?.split('/').pop();
      if (filename && imageAssets[filename]) image.src = imageAssets[filename];
      else if (source && sourceUrl) image.src = new URL(source, sourceUrl).href;
    });
    const diagramNodes = contentRef.current.querySelectorAll<HTMLElement>('.mermaid-source');
    diagramNodes.forEach((node) => {
      const source = diagramSources[node.dataset.diagram ?? ''];
      if (!source) {
        node.textContent = `Diagram source "${node.dataset.diagram ?? 'unknown'}" was not found.`;
        console.error(`Could not find Mermaid source "${node.dataset.diagram ?? 'unknown'}".`);
        return;
      }
      node.className = 'mermaid';
      node.textContent = source;
    });
    renderMermaidDiagrams(contentRef.current).catch((loadError) => console.error('Could not render Mermaid diagram', loadError));
  }, [html, sourceUrl]);

  useEffect(() => {
    const elements = headings.map((heading) => document.getElementById(heading.id)).filter((heading): heading is HTMLElement => Boolean(heading));
    const links = headings.filter((heading) => heading.text !== 'Question');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      document.querySelectorAll('.reader-index a').forEach((link) => link.classList.toggle('active', (link as HTMLAnchorElement).hash === `#${visible.target.id}`));
    }, { rootMargin: '-18% 0px -68% 0px' });
    elements.forEach((heading) => observer.observe(heading));
    if (links[0]) document.querySelector(`.reader-index a[href="#${links[0].id}"]`)?.classList.add('active');
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (event: MouseEvent<HTMLAnchorElement>, headingId: string) => {
    event.preventDefault();
    document.getElementById(headingId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return <div className="shell reader-page"><Topbar reader /><main className="reader-layout"><aside className="reader-sidebar"><p className="eyebrow">READING ROOM</p><div className="reader-index">{headings.filter((heading) => heading.text !== 'Question').map((heading) => <a key={heading.id} href={`#${heading.id}`} onClick={(event) => scrollToHeading(event, heading.id)}>{heading.text}</a>)}</div></aside><article className="markdown-content" id="content" ref={contentRef}>{error ? <div className="error-state">This note could not be opened. <Link to="/#notes">Return to the journal.</Link></div> : html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <div className="loading-state">Opening note<span>...</span></div>}</article></main><Footer reader /></div>;
}
