'use client';

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    title: "Start a session",
    body: "Open MyVirtualTutor and choose voice or chat. The tutor stays calm and focused on math.",
    tag: "Step 1",
  },
  {
    title: "Learn step-by-step",
    body: "The tutor explains each step clearly and checks understanding before moving on.",
    tag: "Step 2",
  },
  {
    title: "Practice + build confidence",
    body: "Get guided practice problems, hints, and corrections—without rushing.",
    tag: "Step 3",
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  const container = prefersReducedMotion
    ? {}
    : { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

  const item = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute left-1/4 bottom-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
            How it works
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
            Simple. Calm. Effective.
          </h2>

          <p className="mt-4 text-white/70">
            Designed to feel like a real tutor — clear explanations,
            visual steps, and guided practice without pressure.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20 hover:bg-white/10"
            >
              {/* inner sheen */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              </div>

              <div className="relative">
                <div className="text-sm font-semibold text-white/60">{s.tag}</div>

                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {s.body}
                </p>

                <div className="mt-6 h-px w-full bg-white/10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
