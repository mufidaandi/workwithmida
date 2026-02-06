"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
} from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-cream-50 to-blush-50/30 dark:from-[#1a1612] dark:to-[#1e1a16] relative"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-blush-500 dark:text-blush-300 tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100">
            Contact Me
          </h2>
          <p className="mt-4 text-accent-800/50 dark:text-cream-400/60 text-lg leading-relaxed">
            Have a question or ready to get started? Send me a message and
            I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-2xl p-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blush-100 to-accent-100 dark:from-accent-700/50 dark:to-accent-600/50 rounded-xl flex items-center justify-center">
                <Mail
                  size={18}
                  className="text-accent-600 dark:text-cream-200"
                />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-accent-800 dark:text-cream-100">
                Email
              </h3>
              <p className="mt-1 text-sm text-accent-800/50 dark:text-cream-400/60">
                hello@workwithmida.com
              </p>
            </div>

            <div className="bg-white/80 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-2xl p-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blush-100 to-accent-100 dark:from-accent-700/50 dark:to-accent-600/50 rounded-xl flex items-center justify-center">
                <MapPin
                  size={18}
                  className="text-accent-600 dark:text-cream-200"
                />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-accent-800 dark:text-cream-100">
                Location
              </h3>
              <p className="mt-1 text-sm text-accent-800/50 dark:text-cream-400/60">
                Davao City, Philippines
              </p>
              <p className="text-xs text-accent-800/30 dark:text-cream-500/30 mt-1">
                Available for remote work worldwide
              </p>
            </div>

            <div className="bg-accent-600 rounded-2xl p-6 text-white">
              <p className="font-serif text-lg font-semibold">
                Prefer a call instead?
              </p>
              <p className="mt-2 text-white/70 text-sm">
                Schedule a free 30-minute discovery call to discuss your needs.
              </p>
              <a
                href="#booking"
                className="mt-4 inline-block text-sm font-medium bg-white text-accent-600 px-5 py-2 rounded-full hover:bg-cream-50 transition-colors"
              >
                Book a Call →
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white/80 dark:bg-accent-800/40 backdrop-blur-sm border border-blush-100 dark:border-accent-700 rounded-3xl p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-accent-800 dark:text-cream-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-accent-800/60 border border-blush-100 dark:border-accent-600 rounded-xl text-accent-800 dark:text-cream-100 placeholder:text-accent-800/30 dark:placeholder:text-cream-500/40 focus:outline-none focus:ring-2 focus:ring-blush-300 dark:focus:ring-accent-500 focus:border-transparent transition-all"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-accent-800 dark:text-cream-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-accent-800/60 border border-blush-100 dark:border-accent-600 rounded-xl text-accent-800 dark:text-cream-100 placeholder:text-accent-800/30 dark:placeholder:text-cream-500/40 focus:outline-none focus:ring-2 focus:ring-blush-300 dark:focus:ring-accent-500 focus:border-transparent transition-all"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-accent-800 dark:text-cream-200 mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 bg-cream-50 dark:bg-accent-800/60 border border-blush-100 dark:border-accent-600 rounded-xl text-accent-800 dark:text-cream-100 placeholder:text-accent-800/30 dark:placeholder:text-cream-500/40 focus:outline-none focus:ring-2 focus:ring-blush-300 dark:focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Inquiry about VA services"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-accent-800 dark:text-cream-200 mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-cream-50 dark:bg-accent-800/60 border border-blush-100 dark:border-accent-600 rounded-xl text-accent-800 dark:text-cream-100 placeholder:text-accent-800/30 dark:placeholder:text-cream-500/40 focus:outline-none focus:ring-2 focus:ring-blush-300 dark:focus:ring-accent-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your business and how I can help..."
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-accent-600 text-white font-medium px-8 py-3.5 rounded-full hover:bg-accent-700 transition-all hover:shadow-lg hover:shadow-accent-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-green-600"
                >
                  <CheckCircle size={16} />
                  Message sent successfully!
                </motion.span>
              )}

              {status === "error" && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-red-500"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
