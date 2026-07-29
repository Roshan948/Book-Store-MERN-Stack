import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from '../routes/booksRoute.js';

// On Vercel, set MONGO_URI in Project Settings -> Environment Variables.
// Locally (via `vercel dev`), it will read from backend/.env if you use
// something like `vercel env pull` or `dotenv` — see README notes below.
const mongoDBURL = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  return response.status(200).send('Welcome To MERN Stack Tutorial (Vercel)');
});

app.use('/books', booksRoute);

// Serverless functions can be invoked concurrently and are reused between
// invocations while "warm", so we cache the DB connection instead of
// reconnecting on every request.
let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;

  if (!mongoDBURL) {
    throw new Error(
      'MONGO_URI environment variable is not set. Add it in Vercel Project Settings.'
    );
  }

  await mongoose.connect(mongoDBURL);
  isConnected = true;
  console.log('App connected to database');
}

// Vercel's Node runtime calls this exported function as the request handler.
export default async function handler(request, response) {
  try {
    await connectDB();
    return app(request, response);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Database connection failed' });
  }
}
