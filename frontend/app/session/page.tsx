"use client";

import { useState } from "react";

export default function SessionPage() {
  const [input, setInput] = useState("");
  const [displayedSteps, setDisplayedSteps] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const API_BASE = "http://localhost:3001";

  const speakStep = async (text: string) => {
    const response = await fetch(`${API_BASE}/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);

    return new Promise<void>((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.play();
    });
  };

  const runStepsSequentially = async (stepsArray: any[]) => {
    setDisplayedSteps([]);
    setIsRunning(true);

    for (let step of stepsArray) {
      setDisplayedSteps(prev => [...prev, step]);
      await speakStep(step.spokenText);
    }

    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!input) return;

    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    if (data.type === "math") {
      runStepsSequentially(data.steps);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>MyVirtualTutor</h1>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter equation..."
        style={{ padding: 10, width: 300 }}
      />

      <button
        onClick={handleSubmit}
        disabled={isRunning}
        style={{ marginLeft: 10, padding: 10 }}
      >
        Solve
      </button>

      <div style={{ marginTop: 40 }}>
        {displayedSteps.map(step => (
          <div key={step.id} style={{ fontSize: 24, marginBottom: 12 }}>
            {step.text}
          </div>
        ))}
      </div>
    </div>
  );
}
