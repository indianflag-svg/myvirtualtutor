import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import multer from "multer";
import FormData from "form-data";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT || 3001);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment");
  process.exit(1);
}

/* ---------------- CORS ---------------- */

const ALLOWED_ORIGINS = new Set([
  "https://myvirtualtutor.com",
  "https://www.myvirtualtutor.com",
  "https://myvirtualtutor-frontend.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function isAllowedVercelSubdomain(origin) {
  try {
    const u = new URL(origin);
    return (
      u.protocol === "https:" &&
      u.hostname.endsWith(".vercel.app") &&
      (u.hostname === "myvirtualtutor-frontend.vercel.app" ||
        u.hostname.startsWith("myvirtualtutor-frontend-"))
    );
  } catch {
    return false;
  }
}

function originAllowed(origin) {
  return ALLOWED_ORIGINS.has(origin) || isAllowedVercelSubdomain(origin);
}

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (originAllowed(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path}`
  );
  next();
});

/* ---------------- Health ---------------- */

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

/* ---------------- Speech-to-Text ---------------- */

const upload = multer({ dest: "uploads/" });

app.post("/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No audio uploaded" });
    }

    const audioPath = path.join(__dirname, req.file.path);

    const form = new FormData();
    form.append("file", fs.createReadStream(audioPath));
    form.append("model", "whisper-1");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: form,
      }
    );

    const data = await response.json();
    fs.unlinkSync(audioPath);

    if (!data?.text) {
      return res.status(500).json({ ok: false, error: "Transcription failed" });
    }

    res.json({ ok: true, text: data.text });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

/* ---------------- Chat + TTS ---------------- */

app.post("/chat-voice", async (req, res) => {
  try {
    const message = String(req.body?.message ?? "").trim();
    if (!message) {
      return res.status(400).json({ ok: false, error: "Missing message" });
    }

    const chatResp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are MyVirtualTutor, a calm math tutor. Solve step-by-step. Each step on its own line.",
            },
            { role: "user", content: message },
          ],
          temperature: 0.2,
        }),
      }
    );

    const chatData = await chatResp.json();
    const textReply =
      chatData?.choices?.[0]?.message?.content?.trim() ??
      "I couldn't generate a response.";

    const ttsResp = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: textReply,
      }),
    });

    const audioBuffer = Buffer.from(await ttsResp.arrayBuffer());
    const filename = `tts_${Date.now()}.mp3`;
    const filePath = path.join("public", filename);
    fs.writeFileSync(filePath, audioBuffer);

    res.json({
      ok: true,
      reply: textReply,
      audio_url: `/${filename}`,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

/* ---------------- Realtime ---------------- */

app.post("/session", async (req, res) => {
  try {
    const r = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime",
            instructions:
              "You are MyVirtualTutor, a professional math tutor.",
            audio: { output: { voice: "marin" } },
          },
        }),
      }
    );

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
});