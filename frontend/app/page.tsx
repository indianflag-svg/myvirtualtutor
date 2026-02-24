import Link from "next/link";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="text-red-400">+</span>
          <span className="text-blue-400">−</span>
          <span className="text-green-400">×</span>
          <span className="text-yellow-400">÷</span>
          <span className="ml-2 tracking-tight">MyVirtualTutor</span>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="#how-it-works"
            className="hidden sm:inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            How it works
          </Link>

          <Link
            href="/session"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white/90 transition"
          >
            Start session
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <TopNav />

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Hero />
      </div>

      <HowItWorks />

      <div className="mx-auto max-w-7xl px-6">
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
