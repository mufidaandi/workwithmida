"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, FileCheck, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Discovery Call",
    desc: "We'll chat about your needs, workflow, and how I can best support your business.",
    color:
      "from-blush-100 to-blush-200 dark:from-accent-700/60 dark:to-accent-600/40",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Custom Proposal",
    desc: "I'll create a tailored plan with services and pricing based on your specific requirements.",
    color:
      "from-accent-100 to-accent-200 dark:from-accent-700/50 dark:to-accent-600/40",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Let's Get Started",
    desc: "Once we agree on the scope, I'll hit the ground running and start delivering results.",
    color:
      "from-blush-100 to-accent-100 dark:from-accent-700/60 dark:to-accent-600/40",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="py-24 bg-gradient-to-b from-blush-50/30 to-cream-50 dark:from-[#1e1a16] dark:to-[#1a1612] relative"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-blush-500 dark:text-blush-300 tracking-widest uppercase">
            Simple & Straightforward
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100">
            How It Works
          </h2>
          <p className="mt-4 text-accent-800/50 dark:text-cream-400/60 text-lg leading-relaxed">
            Getting started is easy. Here&apos;s how we begin working together.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-blush-200 via-accent-200 to-blush-200 dark:from-accent-700 dark:via-accent-600 dark:to-accent-700" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative text-center"
            >
              {/* Step number + icon */}
              <div className="relative inline-flex">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blush-100/50 dark:shadow-accent-900/30`}
                >
                  <step.icon
                    size={32}
                    className="text-accent-700 dark:text-cream-200"
                  />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.num}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-xl font-semibold text-accent-800 dark:text-cream-100">
                {step.title}
              </h3>
              <p className="mt-3 text-accent-800/50 dark:text-cream-400/60 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
