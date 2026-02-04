'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 10000;

// IMPORTANT: include your Vercel frontend origin here
const ALLOWED_ORIGINS = new Set([
  'https://myvirtualtutor-frontend.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

function corsOrigin(origin, callback) {
  // Allow server-to-server / curl (no Origin header)
  if (!origin) return callback(null, true);

  if (ALLOWED_ORIGINS.has(origin)) return callback(null, true);

  return callback(new Error(`CORS blocked for origin: ${origin}`));
}

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

// Ensure preflight requests are handled
app.options('*', cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/session', async (req, res) => {
  try {
    // If you create an OpenAI realtime session here, keep that logic.
    // For now we return a placeholder to confirm CORS is fixed.
    res.status(200).json({ ok: true, message: 'Session endpoint reachable (CORS OK)' });
  } catch (err) {
    console.error('POST /session error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CORS error handler so OPTIONS doesn’t become a generic 500 HTML
app.use((err, req, res, next) => {
  if (err && String(err.message || '').includes('CORS blocked for origin')) {
    return res.status(403).json({ error: err.message });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`Allowed origin(s): ${Array.from(ALLOWED_ORIGINS).join(', ')}`);
});
