import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NoteCard from '../components/NoteCard';
import Topbar from '../components/Topbar';
import { fetchManifest, type Note } from '../lib/manifest';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => { fetchManifest().then(setNotes).catch((error) => console.error(error)); }, []);
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-links a[data-section]')];
    const sections = links.map((link) => document.getElementById(link.dataset.section!)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('active', link.dataset.section === visible.target.id));
    }, { rootMargin: '-104px 0px -62% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="shell">
    <Topbar />
    <main id="top">
      <section className="hero" id="overview"><div className="hero-copy">
        <p className="eyebrow">DAILY PRACTICE / 01</p>
        <h1>Build the habit.<br /><em>Understand the pattern.</em></h1>
        <p className="hero-intro">A calm, growing record of data structures, algorithmic thinking, and the problems that make both stick.</p>
        <div className="hero-actions"><a className="button button-primary" href="#notes" onClick={scrollToSection('notes')}>Explore the notes <span aria-hidden="true">↓</span></a><a className="text-link" href="https://github.com/deepak-k-marian/DSA" target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span></a></div>
      </div></section>
      <section className="stats" aria-label="Journal statistics"><div><strong>{String(notes.length || 8).padStart(2, '0')}</strong><span>core notes</span></div><div><strong>02</strong><span>visual guides</span></div><div><strong>Python</strong><span>solution language</span></div><div><strong>∞</strong><span>room to improve</span></div></section>
      <section className="section-block" id="notes"><div className="section-heading"><div><p className="eyebrow">01 / NOTES</p><h2>Start with the<br />shape of things.</h2></div><p className="section-description">Short references for the ideas underneath every solution: how data is organized and how performance changes as input grows.</p></div>
        <div className="note-grid">{notes.map((note, index) => <NoteCard key={note.file} note={note} index={index} />)}</div>
      </section>
    </main>
    <Footer />
  </div>;
}
