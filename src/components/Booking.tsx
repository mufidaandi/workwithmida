"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarDays, Clock, Video } from "lucide-react";

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-link";

  return (
    <section
      id="booking"
      className="py-24 bg-cream-50 dark:bg-[#1a1612] relative"
      ref={ref}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blush-200 dark:via-accent-700 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium text-blush-500 dark:text-blush-300 tracking-widest uppercase">
            Let&apos;s Connect
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100">
            Schedule a Discovery Call
          </h2>
          <p className="mt-4 text-accent-800/50 dark:text-cream-400/60 text-lg leading-relaxed max-w-xl mx-auto">
            Let&apos;s discuss your needs and find the best way I can support
            your business. No commitment required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          {/* Calendly placeholder card */}
          <div className="bg-white/80 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-3xl p-8 sm:p-12 text-center shadow-lg shadow-blush-100/30 dark:shadow-accent-900/30">
            <div className="w-16 h-16 bg-gradient-to-br from-blush-100 to-accent-100 dark:from-accent-700/50 dark:to-accent-600/50 rounded-2xl flex items-center justify-center mx-auto">
              <CalendarDays
                size={32}
                className="text-accent-600 dark:text-cream-200"
              />
            </div>

            <h3 className="mt-6 font-serif text-2xl font-semibold text-accent-800 dark:text-cream-100">
              30-Minute Free Consultation
            </h3>
            <p className="mt-3 text-accent-800/50 dark:text-cream-400/60 max-w-md mx-auto">
              Pick a time that works for you, and let&apos;s have a friendly
              conversation about your business needs.
            </p>

            {/* Info badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-accent-800/50 dark:text-cream-400/60">
                <Clock
                  size={16}
                  className="text-blush-400 dark:text-blush-300"
                />
                30 minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-accent-800/50 dark:text-cream-400/60">
                <Video
                  size={16}
                  className="text-blush-400 dark:text-blush-300"
                />
                Google Meet / Zoom
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-accent-600 text-white font-medium px-10 py-4 rounded-full hover:bg-accent-700 transition-all hover:shadow-xl hover:shadow-accent-600/20 text-lg"
            >
              <CalendarDays size={20} />
              Book Your Free Call
            </a>

            <p className="mt-4 text-xs text-accent-800/30 dark:text-cream-500/30">
              Powered by Calendly — You&apos;ll be redirected to schedule
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
