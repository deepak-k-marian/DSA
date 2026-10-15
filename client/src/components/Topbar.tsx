import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoAsset } from '../lib/assets';

export default function Topbar({ reader = false }: { reader?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    let favicon = document.querySelector<HTMLLinkElement>('link[data-dsa-favicon]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.dataset.dsaFavicon = 'true';
      document.head.appendChild(favicon);
    }
    favicon.href = logoAsset;
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="brand" to="/" aria-label="DSA Journal home">
        <img src={logoAsset} alt="DSA Logo" className="brand-img" />
        {!reader && <span />}
      </Link>
      {reader ? <Link className="back-link" to="/">← Back to journal</Link> : (
        <nav className="nav-links" aria-label="Primary navigation">
          <a className="active" href="#overview" data-section="overview" onClick={scrollToSection('overview')}>Overview</a>
          <a href="#notes" data-section="notes" onClick={scrollToSection('notes')}>Notes</a>
        </nav>
      )}
    </header>
  );
}
