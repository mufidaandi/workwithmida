"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "How It Works" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-50/90 dark:bg-accent-900/90 backdrop-blur-md shadow-sm border-b border-blush-100 dark:border-accent-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-accent-700 dark:text-cream-100 group-hover:text-accent-500 dark:group-hover:text-cream-200 transition-colors">
            workwith
            <span className="text-blush-500 dark:text-blush-400">mida</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-medium text-blush-500 dark:text-blush-300 bg-blush-50 dark:bg-accent-800 px-2 py-0.5 rounded-full border border-blush-200 dark:border-accent-600">
            Virtual Assistant
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-accent-800/70 hover:text-accent-600 dark:text-cream-200 dark:hover:text-cream-100 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-400 dark:bg-blush-300 transition-all group-hover:w-full rounded-full" />
            </a>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-accent-700 dark:text-cream-200 hover:bg-accent-100 dark:hover:bg-accent-800 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <a
            href="#booking"
            className="text-sm font-medium bg-accent-600 text-white px-5 py-2.5 rounded-full hover:bg-accent-700 transition-all hover:shadow-lg hover:shadow-accent-600/20"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-accent-700 dark:text-cream-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-accent-700 dark:text-cream-200 p-2"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50/95 dark:bg-accent-900/95 backdrop-blur-md border-t border-blush-100 dark:border-accent-700"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-base font-medium text-accent-800/70 dark:text-cream-200 hover:text-accent-600 dark:hover:text-cream-100 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMobileOpen(false)}
                className="text-center text-sm font-medium bg-accent-600 text-white px-5 py-3 rounded-full hover:bg-accent-700 transition-all mt-2"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
