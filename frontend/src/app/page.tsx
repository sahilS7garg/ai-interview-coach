"use client";

import Link from "next/link";
import { Code2, ArrowRight, Star, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-float">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">AI-Powered Interview Excellence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Ace Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Next Pivot.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Personalized coding tracks, real-time AI feedback, and production-grade assessments to help you land your dream engineering role.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              href="/problems" 
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-opacity-80 transition-all transform hover:scale-105 shadow-xl shadow-primary/20"
            >
              Start Practicing Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 glass text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
              View Demo video
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "AI Feedback", desc: "Get real-time feedback on time complexity and code quality from our advanced ML model." },
            { icon: Zap, title: "Smart Tracks", desc: "Our recommendation engine learns your weaknesses and builds a custom path to mastery." },
            { icon: ShieldCheck, title: "Production Ready", desc: "Practice with the same environment used by top-tier tech companies." }
          ].map((f, i) => (
            <div key={i} className="glass p-8 rounded-3xl group hover:bg-white/5 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
