"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Zap, Shield, Clock } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Reliable & Organized",
    desc: "Meticulous attention to detail in every task I handle.",
  },
  {
    icon: Zap,
    title: "Fast Learner",
    desc: "Quick to adapt to new tools, workflows, and systems.",
  },
  {
    icon: Clock,
    title: "Proactive",
    desc: "I anticipate needs and take initiative to streamline processes.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-24 bg-cream-50 dark:bg-[#1a1612] relative"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blush-200 dark:via-accent-700 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-blush-500 dark:text-blush-300 tracking-widest uppercase">
              About Me
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100 leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-blush-500 dark:text-blush-300 italic">
                Muhamida
              </span>
            </h2>
            <p className="mt-6 text-accent-800/60 dark:text-cream-300/70 text-lg leading-relaxed">
              I&apos;m a detail-oriented General Virtual Assistant with strong
              digital skills. I specialize in administrative support, digital
              tools, and organization — helping businesses run smoothly so you
              can focus on what matters most.
            </p>
            <p className="mt-4 text-accent-800/60 dark:text-cream-300/70 text-lg leading-relaxed">
              I bring strong transferable skills, fast learning ability, and a
              proactive work ethic to every project. My goal is to deliver
              reliable, high-quality support that makes a real difference in
              your daily operations.
            </p>

            <div className="mt-6 flex items-center gap-2 text-accent-800/50 dark:text-cream-400/50">
              <MapPin
                size={16}
                className="text-blush-400 dark:text-blush-300"
              />
              <span className="text-sm">Davao City, Philippines</span>
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 bg-white/80 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-2xl p-6 hover:shadow-lg hover:shadow-blush-100/50 dark:hover:shadow-accent-900/30 transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blush-100 to-accent-100 dark:from-accent-700/50 dark:to-accent-600/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon
                    size={22}
                    className="text-accent-600 dark:text-cream-200"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-accent-800 dark:text-cream-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-accent-800/50 dark:text-cream-400/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Tools badge */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Google Workspace",
                "Microsoft Office",
                "Canva",
                "Photoshop",
                "Trello",
                "Slack",
              ].map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-medium text-accent-600 dark:text-cream-300 bg-accent-50 dark:bg-accent-800/50 border border-accent-100 dark:border-accent-700 px-3 py-1.5 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
