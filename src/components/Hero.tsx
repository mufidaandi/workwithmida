"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100 dark:from-[#1a1612] dark:via-[#1e1a16] dark:to-[#221e19]" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blush-200/30 dark:bg-accent-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-100/20 dark:bg-accent-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blush-100/20 dark:bg-accent-700/5 rounded-full blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #7C3A62 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 dark:text-cream-300 bg-accent-50 dark:bg-accent-800/50 border border-accent-200 dark:border-accent-700 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for New Clients
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
        >
          <span className="text-accent-800 dark:text-cream-100">Reliable </span>
          <span className="text-blush-500 dark:text-blush-300 italic">
            Virtual&nbsp;
          </span>
          <br className="hidden sm:block" />
          <span className="text-accent-800 dark:text-cream-100">
            Assistance for{" "}
          </span>
          <span className="relative inline-block">
            <span className="text-accent-800 dark:text-cream-100">
              Your Business
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C50 3 100 2 150 5C200 8 250 4 298 6"
                stroke="#F28DA5"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-accent-800/60 dark:text-cream-300/70 max-w-2xl mx-auto leading-relaxed"
        >
          I help businesses stay organized and efficient — from managing emails
          and schedules to creating polished visuals. Based in Davao City,
          Philippines.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 bg-accent-600 text-white font-medium px-8 py-3.5 rounded-full hover:bg-accent-700 transition-all hover:shadow-xl hover:shadow-accent-600/20 animate-subtle-pulse"
          >
            <Calendar size={18} />
            Book a Discovery Call
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 text-accent-700 dark:text-cream-200 font-medium px-8 py-3.5 rounded-full border-2 border-accent-200 dark:border-accent-600 hover:border-accent-400 hover:bg-accent-50 dark:hover:bg-accent-800 transition-all"
          >
            View My Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-accent-800/40 dark:text-cream-300/50"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blush-100 dark:bg-accent-700/50 rounded-full flex items-center justify-center">
              <span className="text-blush-600 dark:text-blush-300 text-xs font-bold">
                ✓
              </span>
            </div>
            Detail-Oriented
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blush-100 dark:bg-accent-700/50 rounded-full flex items-center justify-center">
              <span className="text-blush-600 dark:text-blush-300 text-xs font-bold">
                ✓
              </span>
            </div>
            Fast Turnaround
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blush-100 dark:bg-accent-700/50 rounded-full flex items-center justify-center">
              <span className="text-blush-600 dark:text-blush-300 text-xs font-bold">
                ✓
              </span>
            </div>
            Flexible Availability
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-50 dark:from-[#1a1612] to-transparent" />
    </section>
  );
}
