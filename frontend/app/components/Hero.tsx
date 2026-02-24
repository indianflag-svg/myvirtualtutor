'use client';

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import HeroVisual from "./landing/HeroVisual";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const wrap = (d: number) => ({
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: d } },
  });

  const stagger = prefersReducedMotion
    ? {}
    : { transition: { staggerChildren: 0.08, delayChildren: 0.05 } };

  return (
    <section className="bg-slate-950 relative overflow-hidden text-white rounded-2xl shadow-2xl border border-white/10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT SIDE */}
        <motion.div
          variants={wrap(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="flex-1 space-y-8 z-10"
        >
          {/* Logo Row */}
          <motion.div variants={wrap(0.05)} className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-red-400">+</span>
            <span className="text-blue-400">−</span>
            <span className="text-green-400">×</span>
            <span className="text-yellow-400">÷</span>
            <span className="ml-2 tracking-tight">MyVirtualTutor</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={wrap(0.08)} className="text-4xl md:text-5xl font-semibold leading-tight">
            Calm, step-by-step math help—anytime.
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={wrap(0.1)} className="text-lg text-white/70 max-w-xl">
            MyVirtualTutor explains clearly, adapts to your child’s pace,
            and uses a simple whiteboard to show every step.
            Built to feel calm. Built to build confidence.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.div variants={wrap(0.12)}>
              <Link
                href="/session"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-semibold text-slate-950"
              >
                {/* animated gradient sheen */}
                <span className="absolute inset-0 bg-white" />
                <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-white via-sky-50 to-white" />
                <span className="absolute -left-16 top-0 h-full w-16 bg-white/40 blur-xl rotate-12 translate-x-0 transition-transform duration-700 group-hover:translate-x-[28rem]" />

                <span className="relative transition-transform duration-150 active:scale-[0.98]">
                  Start Free Session
                </span>
              </Link>
            </motion.div>

            <motion.div variants={wrap(0.14)}>
              <Link
                href="#how-it-works"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10 active:scale-[0.99]"
              >
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Tags */}
          <motion.div variants={stagger} className="flex flex-wrap gap-3 text-sm text-white/60 mt-6">
            <motion.span variants={wrap(0.16)} className="border border-white/10 bg-white/5 px-4 py-2 rounded-full">
              ✔ Math-only focus
            </motion.span>
            <motion.span variants={wrap(0.18)} className="border border-white/10 bg-white/5 px-4 py-2 rounded-full">
              ✔ Voice + Chat
            </motion.span>
            <motion.span variants={wrap(0.2)} className="border border-white/10 bg-white/5 px-4 py-2 rounded-full">
              ✔ Visual whiteboard steps
            </motion.span>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          variants={wrap(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="flex-1"
        >
          <HeroVisual />
        </motion.div>

      </div>
    </section>
  );
}
