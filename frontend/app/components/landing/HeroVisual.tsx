"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  const floatAnim = prefersReducedMotion
    ? {}
    : {
        y: [0, -6, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-sky-500/10 via-indigo-500/10 to-emerald-500/10 blur-2xl" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-2xl"
      >
        <motion.div animate={floatAnim} className="relative">
          <Image
            src="/hero.jpg"
            alt="A calm, focused student learning math with step-by-step guidance"
            width={1400}
            height={1000}
            priority
            className="h-[360px] w-full object-cover sm:h-[420px] lg:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
        </motion.div>

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/85 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Calm, step-by-step tutoring
        </div>

        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 border-t border-white/10 bg-black/35 p-3 text-[11px] text-white/80 backdrop-blur sm:p-4 sm:text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Math-only</div>
            <div className="text-white/70">No distractions</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Voice + Chat</div>
            <div className="text-white/70">Explain + practice</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Whiteboard</div>
            <div className="text-white/70">Shows each step</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
