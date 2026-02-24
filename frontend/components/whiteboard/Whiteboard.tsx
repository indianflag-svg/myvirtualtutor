"use client";

import React, { useRef, useEffect, useState } from "react";

export default function TestBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
  }, []);

  const start = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stop = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Whiteboard Test</h1>
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        style={{ border: "1px solid black", background: "white" }}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseLeave={stop}
      />
      <br />
      <button onClick={clear}>Clear</button>
    </div>
  );
}
