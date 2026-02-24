'use client';

import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    icon: "+",
    title: "Addition practice",
    body: "Step-by-step addition exercises with clear explanations and checks for understanding.",
    accent: "text-red-400",
  },
  {
    icon: "−",
    title: "Subtraction practice",
    body: "Build confidence by learning clean subtraction strategies and common mistake fixes.",
    accent: "text-sky-400",
  },
  {
    icon: "× ÷",
    title: "Multiplication & division",
    body: "Hands-on practice with patterns, factors, and division strategies that actually stick.",
    accent: "text-emerald-400",
  },
];

export default function FeaturesSection() {
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
    <section className="relative py-24">
      {/* subtle divider feel */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Practice areas
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Focused math practice that feels calm.
          </h2>

          <p className="mt-4 text-white/70">
            Each topic is taught step-by-step with explanations, examples, and guided practice—no rushing.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20 hover:bg-white/10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              </div>

              <div className="relative">
                <div className={`text-4xl font-bold ${f.accent}`}>{f.icon}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
