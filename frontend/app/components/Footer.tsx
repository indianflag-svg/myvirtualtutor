'use client';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-red-400">+</span>
              <span className="text-blue-400">−</span>
              <span className="text-green-400">×</span>
              <span className="text-yellow-400">÷</span>
              <span className="ml-2 tracking-tight">MyVirtualTutor</span>
            </div>
            <p className="mt-2 text-sm text-white/60">
              © 2026 MyVirtualTutor. Math tutoring for grades 6–12.
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-white/65">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </nav>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        <p className="mt-6 text-xs text-white/45">
          Calm, step-by-step tutoring experience. Built for clarity and confidence.
        </p>
      </div>
    </footer>
  );
}
