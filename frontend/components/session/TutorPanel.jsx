"use client";

import React from "react";

export default function TutorPanel({ messages = [], onSend = () => {} }) {
  const [text, setText] = React.useState("");

  const send = (e) => {
    if (e) e.preventDefault();   // 🔴 prevent page navigation
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>AI Tutor</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Math • Grades 6–12</div>
      </div>

      <div style={{ flex: 1, padding: 14, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 12px",
                borderRadius: 14,
                background: m.role === "user"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 13,
                whiteSpace: "pre-wrap"
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={send}
        style={{
          padding: 12,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          gap: 10
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your question…"
          style={{
            flex: 1,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            color: "#e8eef6",
            padding: "10px 12px",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.10)",
            color: "#e8eef6",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
