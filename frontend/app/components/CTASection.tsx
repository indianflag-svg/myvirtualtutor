'use client';

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  const block = (d: number) => ({
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: d } },
  });

  return (
    <section className="relative mt-16 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-white shadow-2xl">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-sky-500/12 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <motion.div
        variants={block(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="relative px-6 py-20 sm:px-10 sm:py-24 text-center"
      >
        <motion.h2
          variants={block(0.05)}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Give your child calm, focused math help tonight.
        </motion.h2>

        <motion.p
          variants={block(0.1)}
          className="mx-auto mt-4 max-w-2xl text-white/70"
        >
          Step-by-step explanations. Guided practice. A simple whiteboard that shows every move —
          without pressure or rushing.
        </motion.p>

        <motion.div variants={block(0.14)} className="mt-8 flex justify-center">
          <Link
            href="/session"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-10 py-4 font-semibold text-slate-950"
          >
            <span className="absolute inset-0 bg-white" />
            <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-white via-sky-50 to-white" />
            <span className="absolute -left-16 top-0 h-full w-16 bg-white/40 blur-xl rotate-12 translate-x-0 transition-transform duration-700 group-hover:translate-x-[36rem]" />
            <span className="relative transition-transform duration-150 active:scale-[0.98]">
              Start Free Session
            </span>
          </Link>
        </motion.div>

        <motion.p variants={block(0.18)} className="mt-4 text-sm text-white/60">
          No credit card required
        </motion.p>
      </motion.div>
    </section>
  );
}
