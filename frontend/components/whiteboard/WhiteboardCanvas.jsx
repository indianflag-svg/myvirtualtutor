import React, { useRef, useEffect, useState } from "react";

export default function WhiteboardCanvas({ steps, currentStep, onDraw }) {
  const canvasRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [glowAlpha, setGlowAlpha] = useState(0.3);

  // Animate glow alpha for pulsing effect
  useEffect(() => {
    let increasing = true;
    const interval = setInterval(() => {
      setGlowAlpha(prev => {
        if (increasing) {
          const next = prev + 0.02;
          if (next >= 0.8) increasing = false;
          return next;
        } else {
          const next = prev - 0.02;
          if (next <= 0.3) increasing = true;
          return next;
        }
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate steps
  useEffect(() => {
    if (!Array.isArray(steps) || steps.length === 0) return;
    setVisibleSteps([]);
    let index = 0;

    const animateStep = () => {
      if (index >= steps.length || steps[index] === undefined) return; // prevent undefined
      setVisibleSteps(prev => [...prev, steps[index]]);
      if (onDraw) onDraw(index);
      index++;
      setTimeout(animateStep, 600);
    };

    animateStep();
  }, [steps, onDraw]);

  // Draw visible steps on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Dark navy background
    ctx.fillStyle = "#0a0f1a";
    ctx.fillRect(0, 0, width, height);

    ctx.font = "22px 'Segoe UI', sans-serif";
    ctx.textBaseline = "top";

    visibleSteps.forEach((step, idx) => {
      if (!step) return; // skip undefined
      const y = 40 * idx + 10;
      if (idx === currentStep) {
        // Pulsing glow for current step
        ctx.shadowColor = `rgba(0, 255, 255, ${glowAlpha})`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#00ffff"; // bright cyan
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#aaaaaa"; // past steps
      }
      ctx.fillText(step, 20, y);
    });

    ctx.shadowBlur = 0; // reset shadow
  }, [visibleSteps, currentStep, glowAlpha]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{
        border: "2px solid #444",
        borderRadius: "10px",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
