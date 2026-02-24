import "dotenv/config";
"use strict";

import express from "express";
import rateLimit from "express-rate-limit";
import { fetch } from "undici";

const app = express();
app.use(express.json());
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3001;

// -----------------------------
// CORS (manual, explicit)
// -----------------------------
const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://myvirtualtutor.com",
  "https://www.myvirtualtutor.com",
]);

function isAllowedVercel(origin) {
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin) res.setHeader("Vary", "Origin");

  if (origin && (ALLOWED_ORIGINS.has(origin) || isAllowedVercel(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "86400");
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// -----------------------------
// HEALTH
// -----------------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "myvirtualtutor-backend",
    ts: new Date().toISOString(),
  });
});

// -----------------------------
// RATE LIMIT
// -----------------------------
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
});

// -----------------------------
// TEXT CHAT
// POST /chat
// body: { message: string }
// -----------------------------
app.post("/chat", chatLimiter, async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ ok: false, error: "OPENAI_API_KEY is not set" });
    }

    const message = String(req.body?.message || "").trim();
    if (!message) {
      return res.status(400).json({ ok: false, error: "Missing message" });
    }

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "You are MyVirtualTutor, a professional math tutor for grades 6–12. Always respond in English. Keep explanations step-by-step, concise, and supportive.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ ok: false, error: data });
    }

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    return res.json({ ok: true, reply: text });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
