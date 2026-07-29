import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getBook, deleteBook } from '../lib/api';
import Loader from '../components/Loader';
import ConnectionError from '../components/ConnectionError';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getBook(id)
      .then((data) => {
        if (cancelled) return;
        if (!data || !data._id) {
          setStatus('notfound');
        } else {
          setBook(data);
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err?.message);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBook(id);
      toast.success('Entry removed from the catalog');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not remove that entry');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <Link to="/" className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-ink">
        &larr; Back to catalog
      </Link>

      {status === 'loading' && <Loader label="Retrieving record\u2026" />}
      {status === 'error' && (
        <div className="mt-6">
          <ConnectionError message={errorMessage} />
        </div>
      )}
      {status === 'notfound' && (
        <p className="text-center text-charcoal/50 py-24 font-mono text-sm">
          No record found for that entry.
        </p>
      )}

      {status === 'ready' && book && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 catalog-card p-8 pt-9"
        >
          <div className="flex items-start justify-between pl-4">
            <span className="stamp">Published {book.publishedYear}</span>
            <span className="font-mono text-[11px] text-ink/40">
              ID {book._id.slice(-8).toUpperCase()}
            </span>
          </div>

          <div className="perforation my-5" />

          <div className="pl-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass mb-2">
              Catalog Record
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">{book.title}</h1>
            <p className="text-lg text-charcoal/70 mt-2">by {book.author}</p>

            <dl className="grid grid-cols-2 gap-4 mt-8 max-w-sm">
              <div>
                <dt className="field-label">Author</dt>
                <dd className="font-body text-charcoal">{book.author}</dd>
              </div>
              <div>
                <dt className="field-label">Published</dt>
                <dd className="font-body text-charcoal">{book.publishedYear}</dd>
              </div>
              {book.createdAt && (
                <div>
                  <dt className="field-label">Filed On</dt>
                  <dd className="font-body text-charcoal">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
              {book.updatedAt && (
                <div>
                  <dt className="field-label">Last Revised</dt>
                  <dd className="font-body text-charcoal">
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex items-center gap-3 mt-10">
              <Link to={`/entry/${book._id}/edit`} className="btn-primary flex-1 text-center">
                Edit Entry
              </Link>
              <button className="btn-danger flex-1" onClick={() => setConfirmingDelete(true)}>
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <ConfirmDeleteModal
        book={confirmingDelete ? book : null}
        isDeleting={isDeleting}
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
