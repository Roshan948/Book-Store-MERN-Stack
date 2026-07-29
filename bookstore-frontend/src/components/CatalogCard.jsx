import { Link } from 'react-router-dom';

// Derive a stable, library-style call number from the book's data so every
// card reads like a real catalog entry rather than a raw database id.
function callNumber(book) {
  const authorInitial = (book.author || '?').trim().charAt(0).toUpperCase() || '?';
  const idTail = (book._id || '').slice(-4).toUpperCase() || '0000';
  return `${authorInitial}-${idTail}`;
}

export default function CatalogCard({ book, onRequestDelete }) {
  return (
    <div className="catalog-card p-5 pt-6 flex flex-col gap-4 group">
      <div className="flex items-start justify-between gap-3 pl-4">
        <span className="stamp shrink-0">{book.publishedYear}</span>
        <span className="font-mono text-[11px] text-ink/40 tracking-wide">{callNumber(book)}</span>
      </div>

      <div className="perforation" />

      <div className="pl-4 flex-1">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-charcoal/60 mt-1 font-body">by {book.author}</p>
      </div>

      <div className="pl-4 flex items-center gap-2 pt-1 opacity-90 group-hover:opacity-100">
        <Link
          to={`/entry/${book._id}`}
          className="flex-1 text-center text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-sm border border-ink/25 hover:bg-ink hover:text-parchment transition-colors"
        >
          View
        </Link>
        <Link
          to={`/entry/${book._id}/edit`}
          className="flex-1 text-center text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-sm border border-brass/60 text-brass-light bg-ink hover:bg-brass hover:text-ink transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => onRequestDelete(book)}
          className="text-center text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-sm border border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-parchment transition-colors"
          aria-label={`Delete ${book.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
