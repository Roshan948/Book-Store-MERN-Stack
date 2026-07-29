export default function ConnectionError({ message }) {
  return (
    <div className="border border-burgundy/40 bg-burgundy/5 rounded-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-10 h-10 shrink-0 grid place-items-center rounded-sm bg-burgundy text-parchment font-display font-bold">
        !
      </div>
      <div>
        <h3 className="font-semibold text-burgundy">Can&rsquo;t reach the backend</h3>
        <p className="text-sm text-charcoal/70 mt-1">
          {message || "The catalog server isn't responding."} Make sure the Express API from the
          Book-Store-MERN-Stack repo is running, and that{' '}
          <code className="font-mono bg-ink/5 px-1 py-0.5 rounded-sm">VITE_API_URL</code> in this
          project&rsquo;s <code className="font-mono bg-ink/5 px-1 py-0.5 rounded-sm">.env</code>{' '}
          matches its port (check <code className="font-mono bg-ink/5 px-1 py-0.5 rounded-sm">backend/config.js</code>).
        </p>
      </div>
    </div>
  );
}
