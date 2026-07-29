import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-24 border border-dashed border-ink/25 rounded-sm bg-parchment-dark/40">
      <div className="w-14 h-14 grid place-items-center rounded-sm bg-ink text-brass font-display text-2xl rotate-3">
        &empty;
      </div>
      <div>
        <h3 className="text-xl font-semibold">The drawer is empty</h3>
        <p className="text-charcoal/60 max-w-sm mt-1">
          No entries on file yet. Add the first title to start the catalog.
        </p>
      </div>
      <Link to="/acquire" className="btn-primary mt-2">
        Catalog a new book
      </Link>
    </div>
  );
}
