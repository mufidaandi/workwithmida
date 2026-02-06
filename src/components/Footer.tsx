import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-800 dark:bg-[#141110] text-white/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main footer */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl font-bold text-white">
              workwith<span className="text-blush-400">mida</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Professional Virtual Assistant based in Davao City, Philippines.
              Providing reliable administrative support and creative design
              services.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-white tracking-widest uppercase mb-4">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#process", label: "How It Works" },
                { href: "#booking", label: "Book a Call" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm hover:text-blush-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-white tracking-widest uppercase mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm">
              <p>hello@workwithmida.com</p>
              <p>Davao City, Philippines</p>
              <p className="text-xs text-white/30 mt-4">
                Available for remote work worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {currentYear} workwithmida. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart size={12} className="text-blush-400 fill-blush-400" /> in
            Davao City
          </p>
        </div>
      </div>
    </footer>
  );
}
