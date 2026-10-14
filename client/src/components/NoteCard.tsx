import { Link } from 'react-router-dom';
import type { Note } from '../lib/manifest';
import ComplexityBars from './ComplexityBars';

export default function NoteCard({ note, index }: { note: Note; index: number }) {
  const theme = note.theme
    ? (note.theme.startsWith('note-card-') ? note.theme : `note-card-${note.theme}`)
    : ([0, 3].includes(index % 4) ? 'note-card-dark' : 'note-card-light');
  return (
    <Link className={`note-card ${theme}`} to={`/reader?file=./notes/${note.file}`}>
      <div className="card-top"><span>NOTE {String(index + 1).padStart(2, '0')}</span><span>↗</span></div>
      {note.icon === 'bars' ? <ComplexityBars /> : <div className="card-icon">{note.icon}</div>}
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="card-bottom"><span>{note.time}</span><span className="arrow">→</span></div>
    </Link>
  );
}
