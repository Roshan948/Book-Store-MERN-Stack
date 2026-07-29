# The Ledger — Book Store Frontend

A React + Vite + Tailwind frontend built for the [Book-Store-MERN-Stack](https://github.com/Roshan948/Book-Store-MERN-Stack)
Express/Mongoose backend. Design concept: a library card-catalog — every book
is an index card with a punch hole, a perforation line, and a stamped
publication year, with "ledger" table and "withdrawal slip" delete modal to
match.

## What it expects from the backend

This talks to the standard routes from that repo's `backend/routes/booksRoute.js`,
mounted at `/books`:

| Method | Path         | Body                                   | Returns                  |
|--------|--------------|-----------------------------------------|---------------------------|
| GET    | `/books`     | —                                        | `{ count, data: Book[] }` |
| GET    | `/books/:id` | —                                        | `Book`                    |
| POST   | `/books`     | `{ title, author, publishedYear }`       | `Book`                    |
| PUT    | `/books/:id` | `{ title, author, publishedYear }`       | `Book`                    |
| DELETE | `/books/:id` | —                                        | message                   |

## 1. Run the backend first

Clone and start the backend from the tutorial repo (its own README covers
MongoDB setup):

```bash
git clone https://github.com/Roshan948/Book-Store-MERN-Stack.git
cd Book-Store-MERN-Stack/backend
npm install
npm run dev
```

Open `backend/config.js` and note the `PORT` value (this tutorial commonly
uses `5555`) and make sure `mongoDBURL` points at a real MongoDB instance
(local `mongod` or an Atlas connection string).

## 2. Configure this frontend

```bash
cp .env.example .env
```

Edit `.env` so `VITE_API_URL` matches the backend port you just checked:

```
VITE_API_URL=http://localhost:5555
```

## 3. Install and run the frontend

```bash
npm install
npm run dev
```

Visit the URL Vite prints (default `http://localhost:5173`).

## Pages

- `/` — Catalog: grid of cards or a compact ledger table, with search
- `/acquire` — New Entry: add a book
- `/entry/:id` — Book Detail: full record view
- `/entry/:id/edit` — Edit Entry: revise a record

## Notes

- If the backend isn't running or the URL/port is wrong, the catalog page
  shows a "Can't reach the backend" banner instead of failing silently.
- CORS: the tutorial's `index.js` already calls `app.use(cors())`, which
  allows all origins, so no backend changes are needed for local dev.
