export default function Footer({ reader = false }: { reader?: boolean }) {
  return (
    <footer className="footer">
      <span>DSA JOURNAL / 2026</span>
      <span>
        {reader ? 'Keep learning in public.' : <>Created by <a href="https://github.com/deepak-k-marian" target="_blank" rel="noopener noreferrer">@deepak-k-marian</a>.</>}
      </span>
    </footer>
  );
}
