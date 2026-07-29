import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { listBooks, deleteBook } from '../lib/api';
import CatalogCard from '../components/CatalogCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ConnectionError from '../components/ConnectionError';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid'); // grid | ledger
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBooks = async () => {
    setStatus('loading');
    try {
      const res = await listBooks();
      setBooks(res.data || []);
      setStatus('ready');
    } catch (err) {
      setErrorMessage(err?.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        String(b.publishedYear).includes(q)
    );
  }, [books, query]);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteBook(pendingDelete._id);
      setBooks((prev) => prev.filter((b) => b._id !== pendingDelete._id));
      toast.success(`"${pendingDelete.title}" removed from the catalog`);
      setPendingDelete(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not remove that entry');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass mb-2">
            Drawer 01 &mdash; General Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">The Catalog</h1>
          <p className="text-charcoal/60 mt-2 max-w-md">
            Every title on file, indexed and stamped. Search, browse, or add a new acquisition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-ink/5 border border-ink/15 rounded-sm p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                view === 'grid' ? 'bg-ink text-parchment' : 'text-ink/60 hover:text-ink'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setView('ledger')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                view === 'ledger' ? 'bg-ink text-parchment' : 'text-ink/60 hover:text-ink'
              }`}
            >
              Ledger
            </button>
          </div>
          <Link to="/acquire" className="btn-primary whitespace-nowrap">
            + New Entry
          </Link>
        </div>
      </motion.div>

      {status === 'ready' && books.length > 0 && (
        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or year\u2026"
            className="field-input max-w-md"
          />
        </div>
      )}

      {status === 'loading' && <Loader />}
      {status === 'error' && <ConnectionError message={errorMessage} />}

      {status === 'ready' && books.length === 0 && <EmptyState />}

      {status === 'ready' && books.length > 0 && filtered.length === 0 && (
        <p className="text-center text-charcoal/50 py-16 font-mono text-sm">
          No entries match &ldquo;{query}&rdquo;.
        </p>
      )}

      {status === 'ready' && filtered.length > 0 && view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            >
              <CatalogCard book={book} onRequestDelete={setPendingDelete} />
            </motion.div>
          ))}
        </div>
      )}

      {status === 'ready' && filtered.length > 0 && view === 'ledger' && (
        <div className="border border-ink/15 rounded-sm overflow-hidden bg-parchment">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ink text-parchment font-mono text-xs uppercase tracking-wider">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden sm:table-cell">Author</th>
                <th className="px-4 py-3 w-28">Year</th>
                <th className="px-4 py-3 w-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book, i) => (
                <tr
                  key={book._id}
                  className={`border-t border-ink/10 ${i % 2 === 1 ? 'bg-ink/[0.03]' : ''}`}
                >
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link to={`/entry/${book._id}`} className="hover:text-brass transition-colors">
                      {book.title}
                    </Link>
                    <div className="text-xs text-charcoal/50 sm:hidden mt-0.5">{book.author}</div>
                  </td>
                  <td className="px-4 py-3 text-charcoal/70 hidden sm:table-cell">{book.author}</td>
                  <td className="px-4 py-3 font-mono text-charcoal/70">{book.publishedYear}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3 font-mono text-xs uppercase tracking-wider">
                      <Link to={`/entry/${book._id}/edit`} className="text-brass hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => setPendingDelete(book)}
                        className="text-burgundy hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        book={pendingDelete}
        isDeleting={isDeleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
