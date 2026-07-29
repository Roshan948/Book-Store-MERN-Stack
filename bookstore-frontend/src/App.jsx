import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import Catalog from './pages/Catalog';
import NewEntry from './pages/NewEntry';
import BookDetail from './pages/BookDetail';
import EditEntry from './pages/EditEntry';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#16233A',
            color: '#F3ECDD',
            fontFamily: '"Libre Franklin", sans-serif',
            fontSize: '14px',
            borderRadius: '2px',
            border: '1px solid #B08D57',
          },
        }}
      />
      <NavBar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/acquire" element={<NewEntry />} />
          <Route path="/entry/:id" element={<BookDetail />} />
          <Route path="/entry/:id/edit" element={<EditEntry />} />
          <Route
            path="*"
            element={
              <div className="max-w-xl mx-auto px-8 py-24 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
                  404
                </p>
                <h1 className="text-3xl font-semibold">No such record</h1>
                <p className="text-charcoal/60 mt-2">That page isn&rsquo;t in the catalog.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-ink/10 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-charcoal/40">
          <span>The Ledger</span>
          <span>Book-Store-MERN-Stack Frontend</span>
        </div>
      </footer>
    </div>
  );
}
