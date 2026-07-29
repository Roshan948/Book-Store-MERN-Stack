import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getBook, updateBook } from '../lib/api';
import Loader from '../components/Loader';
import ConnectionError from '../components/ConnectionError';

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', publishedYear: '' });
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getBook(id)
      .then((data) => {
        if (cancelled) return;
        setForm({
          title: data.title || '',
          author: data.author || '',
          publishedYear: data.publishedYear ?? '',
        });
        setStatus('ready');
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

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.author.trim()) next.author = 'Author is required';
    if (!form.publishedYear) next.publishedYear = 'Published year is required';
    else if (Number.isNaN(Number(form.publishedYear))) next.publishedYear = 'Must be a number';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await updateBook(id, {
        title: form.title.trim(),
        author: form.author.trim(),
        publishedYear: Number(form.publishedYear),
      });
      toast.success('Entry revised');
      navigate(`/entry/${id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not save changes');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <Link
        to={`/entry/${id}`}
        className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-ink"
      >
        &larr; Back to record
      </Link>

      {status === 'loading' && <Loader label="Pulling the record\u2026" />}
      {status === 'error' && (
        <div className="mt-6">
          <ConnectionError message={errorMessage} />
        </div>
      )}

      {status === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 bg-parchment border border-ink/15 rounded-sm shadow-card p-6 sm:p-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass mb-2">
            Revision Slip
          </p>
          <h1 className="text-3xl font-semibold mb-1">Edit Entry</h1>
          <p className="text-charcoal/60 mb-8">Update the details on file for this title.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="field-label" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                className="field-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <p className="text-burgundy text-xs mt-1.5">{errors.title}</p>}
            </div>

            <div>
              <label className="field-label" htmlFor="author">
                Author
              </label>
              <input
                id="author"
                className="field-input"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              {errors.author && <p className="text-burgundy text-xs mt-1.5">{errors.author}</p>}
            </div>

            <div>
              <label className="field-label" htmlFor="publishedYear">
                Published Year
              </label>
              <input
                id="publishedYear"
                type="number"
                className="field-input"
                value={form.publishedYear}
                onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
              />
              {errors.publishedYear && (
                <p className="text-burgundy text-xs mt-1.5">{errors.publishedYear}</p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button type="submit" className="btn-primary flex-1" disabled={submitting}>
                {submitting ? 'Saving\u2026' : 'Save Changes'}
              </button>
              <Link to={`/entry/${id}`} className="btn-secondary flex-1 text-center">
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
