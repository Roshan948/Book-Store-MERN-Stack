import { AnimatePresence, motion } from 'framer-motion';

export default function ConfirmDeleteModal({ book, isDeleting, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm bg-parchment border-2 border-burgundy/70 rounded-sm shadow-card-hover p-6"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-burgundy mb-2">
              Withdrawal Slip
            </p>
            <h3 className="font-display text-xl font-semibold text-ink">Remove this entry?</h3>
            <p className="text-sm text-charcoal/70 mt-2">
              &ldquo;{book.title}&rdquo; by {book.author} will be permanently struck from the
              catalog. This can&rsquo;t be undone.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button className="btn-secondary flex-1" onClick={onCancel} disabled={isDeleting}>
                Keep it
              </button>
              <button className="btn-danger flex-1" onClick={onConfirm} disabled={isDeleting}>
                {isDeleting ? 'Removing\u2026' : 'Remove'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
