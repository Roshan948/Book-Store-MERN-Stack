import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 bg-ink text-parchment border-b-4 border-brass">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid place-items-center w-10 h-10 rounded-sm bg-brass text-ink font-display font-bold text-lg">
            L
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight">Bookish</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-parchment/60">
              Book Store Catalog
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 sm:px-4 py-2 rounded-sm text-sm font-body font-medium transition-colors ${isActive ? 'bg-brass text-ink' : 'text-parchment/80 hover:text-parchment hover:bg-white/5'
              }`
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/acquire"
            className={({ isActive }) =>
              `px-3 sm:px-4 py-2 rounded-sm text-sm font-body font-semibold border transition-colors ${isActive
                ? 'bg-brass text-ink border-brass'
                : 'border-brass/60 text-brass-light hover:bg-brass hover:text-ink'
              }`
            }
          >
            + New Entry
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
