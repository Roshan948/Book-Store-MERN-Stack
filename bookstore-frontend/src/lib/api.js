import axios from 'axios';

/**
 * This points at your Express backend from the Book-Store-MERN-Stack repo.
 * That server mounts its router at app.use('/books', booksRoute) and reads
 * its port from backend/config.js (commonly PORT = 5555).
 *
 * Override it by creating a .env file in this project's root:
 *   VITE_API_URL=http://localhost:5555
 */
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// GET /books -> { count, data: Book[] }
export const listBooks = () => api.get('/books').then((res) => res.data);

// GET /books/:id -> Book
export const getBook = (id) => api.get(`/books/${id}`).then((res) => res.data);

// POST /books  body: { title, author, publishedYear }
export const createBook = (payload) => api.post('/books', payload).then((res) => res.data);

// PUT /books/:id  body: { title, author, publishedYear }
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload).then((res) => res.data);

// DELETE /books/:id
export const deleteBook = (id) => api.delete(`/books/${id}`).then((res) => res.data);
