"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  CalendarDays,
  Database,
  FileText,
  Palette,
  Image,
  Presentation,
  Sparkles,
} from "lucide-react";

const vaServices = [
  {
    icon: Mail,
    title: "Email Management",
    desc: "Inbox organization, template responses, and follow-up tracking to keep your communications running smoothly.",
  },
  {
    icon: CalendarDays,
    title: "Calendar Scheduling",
    desc: "Appointment management, conflict resolution, and timezone coordination for seamless scheduling.",
  },
  {
    icon: Database,
    title: "Data Entry & Spreadsheets",
    desc: "Accurate data entry, spreadsheet creation, and organization to keep your records clean and accessible.",
  },
  {
    icon: FileText,
    title: "Document & File Organization",
    desc: "Professional formatting, cloud file management, and structured organization systems.",
  },
];

const designServices = [
  {
    icon: Image,
    title: "Photo Editing",
    desc: "Basic photo editing and image enhancement for professional online presence.",
  },
  {
    icon: Palette,
    title: "Social Media Graphics",
    desc: "Eye-catching social media posts and visual content that represent your brand.",
  },
  {
    icon: Presentation,
    title: "Presentation Design",
    desc: "Clean, professional presentation slides that effectively communicate your message.",
  },
  {
    icon: Sparkles,
    title: "Digital Materials",
    desc: "Simple graphics and marketing materials tailored for digital platforms.",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
  isInView,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/60 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-blush-100/50 dark:hover:shadow-accent-900/30 hover:border-blush-200 dark:hover:border-accent-600 transition-all hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blush-50 to-accent-50 dark:from-accent-700/50 dark:to-accent-600/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={22} className="text-accent-600 dark:text-cream-200" />
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-accent-800 dark:text-cream-100">
        {title}
      </h3>
      <p className="mt-2 text-accent-800/50 dark:text-cream-400/60 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-cream-50 to-blush-50/30 dark:from-[#1a1612] dark:to-[#1e1a16] relative"
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
            What I Offer
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100">
            Services
          </h2>
          <p className="mt-4 text-accent-800/50 dark:text-cream-400/60 text-lg leading-relaxed">
            Comprehensive virtual assistance and creative design support to help
            your business operate at its best.
          </p>
        </motion.div>

        {/* VA Services */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-2xl font-semibold text-accent-800 dark:text-cream-100 mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-blush-300 dark:bg-accent-500" />
            Administrative Support
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vaServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Design Services */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-serif text-2xl font-semibold text-accent-800 dark:text-cream-100 mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-blush-300 dark:bg-accent-500" />
            Creative & Design
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {designServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center bg-white/60 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-2xl p-8"
        >
          <p className="font-serif text-xl text-accent-800 dark:text-cream-100 font-semibold">
            Custom Pricing for Every Client
          </p>
          <p className="mt-2 text-accent-800/50 dark:text-cream-400/60 max-w-lg mx-auto">
            Every business is unique, so my rates are tailored to your specific
            needs and scope of work.{" "}
            <a
              href="#booking"
              className="text-accent-600 dark:text-blush-300 hover:text-accent-700 dark:hover:text-blush-200 underline underline-offset-4"
            >
              Book a discovery call
            </a>{" "}
            to discuss your requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
