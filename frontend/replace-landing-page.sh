#!/bin/bash

mkdir -p app/components

# --- Hero.tsx ---
cat > app/components/Hero.tsx << 'EOF_HERO'
'use client';
import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white relative overflow-hidden text-black rounded-xl shadow-lg border border-gray-200">
      <div className="relative max-w-7xl mx-auto px-6 py-36 flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 space-y-8 z-10">
          <div className="flex items-center gap-2 fade-in">
            <span className="text-red-500 font-bold text-2xl">+</span>
            <span className="text-blue-500 font-bold text-2xl">−</span>
            <span className="text-green-500 font-bold text-2xl">×</span>
            <span className="text-yellow-500 font-bold text-2xl">÷</span>
            <span className="text-black font-bold text-2xl ml-2">MyVirtualTutor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight fade-in text-black">
            Calm, step-by-step math help—anytime
          </h1>
          <p className="text-lg text-gray-600 max-w-lg fade-in">
            MyVirtualTutor is a focused AI math tutor that explains clearly,
            writes on a whiteboard, and never rushes your child.
          </p>
          <div className="flex gap-4 mt-6 fade-in">
            <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
              Start Free Session
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black px-8 py-4 rounded-lg transition">
              See How It Works
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full h-96 md:h-[34rem] fade-in rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform z-10">
          <div className="w-full h-full rounded-xl bg-gray-300 flex items-center justify-center">
            <span className="text-gray-700 text-lg font-semibold">Mother + Child Image</span>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF_HERO

# --- FeaturesSection.tsx ---
cat > app/components/FeaturesSection.tsx << 'EOF_FEATURES'
'use client';
import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform fade-in">
        <span className="text-red-500 text-4xl mb-4">+</span>
        <h3 className="text-xl font-semibold mb-2">Addition Practice</h3>
        <p className="text-gray-500">Step-by-step addition exercises for all levels.</p>
      </div>
      <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform fade-in">
        <span className="text-blue-500 text-4xl mb-4">−</span>
        <h3 className="text-xl font-semibold mb-2">Subtraction Practice</h3>
        <p className="text-gray-500">Clear explanations for subtraction problems.</p>
      </div>
      <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform fade-in">
        <span className="text-green-500 text-4xl mb-4">× ÷</span>
        <h3 className="text-xl font-semibold mb-2">Multiplication & Division</h3>
        <p className="text-gray-500">Hands-on practice with multiplication and division.</p>
      </div>
    </section>
  );
}
EOF_FEATURES

# --- CTASection.tsx ---
cat > app/components/CTASection.tsx << 'EOF_CTA'
'use client';
import React from 'react';

export default function CTASection() {
  return (
    <section className="bg-white py-28 text-center rounded-xl shadow-md border border-gray-200 fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">
        Give your child calm, focused math help tonight
      </h2>
      <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-10 py-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
        Start Free Session
      </button>
      <p className="text-gray-500 mt-4">No credit card required</p>
    </section>
  );
}
EOF_CTA

# --- Footer.tsx ---
cat > app/components/Footer.tsx << 'EOF_FOOTER'
'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white py-20 md:py-24 text-gray-700 text-center text-sm rounded-t-xl border-t border-gray-200 fade-in">
      <p>© 2026 MyVirtualTutor. Math tutoring for grades 6–12.</p>
      <div className="flex justify-center gap-6 mt-6">
        <a href="#" className="hover:text-black">Privacy</a>
        <a href="#" className="hover:text-black">Terms</a>
        <a href="#" className="hover:text-black">Contact</a>
      </div>
    </footer>
  );
}
EOF_FOOTER

# --- page.tsx ---
cat > app/page.tsx << 'EOF_PAGE'
'use client';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
EOF_PAGE

echo "All landing page files replaced successfully!"
