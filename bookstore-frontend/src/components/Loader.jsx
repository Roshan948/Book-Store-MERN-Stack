export default function Loader({ label = 'Pulling the drawer\u2026' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-ink/70">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-ink/15 rounded-sm" />
        <div className="absolute inset-0 border-2 border-brass border-t-transparent rounded-sm animate-spin" />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}
