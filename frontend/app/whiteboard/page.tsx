"use client";

import React, { useRef, useEffect, useState } from "react";

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Whiteboard Test</h1>

      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="border border-gray-400 bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <button
        onClick={clearBoard}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Clear
      </button>
    </div>
  );
}
