"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  CalendarDays,
  Database,
  Plane,
  Palette,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PortfolioItem {
  title: string;
  desc: string;
  image?: string;
  alt?: string;
}

interface DesignItem {
  image: string;
  alt: string;
  isStory?: boolean;
  aspectRatio?: string; // e.g., "4/5", "16/9", defaults to square (1/1)
}

const categories = [
  {
    id: "email",
    label: "Email Management",
    icon: Mail,
    description:
      "I love bringing order to busy inboxes! From setting up smart folder systems and creating professional templates to making sure no important message falls through the cracks, I'll help you stay on top of your communications with ease.",
    items: [
      {
        title: "Inbox Organization System",
        desc: "Structured folder and label system for efficient email management",
        image: "/email1.png",
        alt: "Email inbox organization sample",
      },
      {
        title: "Template Responses",
        desc: "Professional email templates for common client communications",
        image: "/email2.png",
        alt: "Email template responses sample",
      },
    ],
  },
  {
    id: "calendar",
    label: "Calendar Management",
    icon: CalendarDays,
    description:
      "Your time is precious, and I'm here to protect it. I coordinate schedules across time zones, catch conflicts before they happen, and prep everything you need for each meeting so you can walk in confident and prepared.",
    items: [
      {
        title: "Schedule Coordination",
        desc: "Organized calendar management with timezone-aware scheduling",
        image: "/calendar1.png",
        alt: "Calendar coordination sample",
      },
      {
        title: "Conflict Resolution",
        desc: "Proactive identification and resolution of scheduling conflicts",
        image: "/calendar2.png",
        alt: "Calendar conflict resolution sample",
      },
    ],
  },
  {
    id: "data",
    label: "Data Entry",
    icon: Database,
    description:
      "Numbers and spreadsheets don't intimidate me—I actually enjoy them! Whether it's organizing messy data, creating formulas that do the heavy lifting, or generating clear reports from complex information, I'll make your data work for you.",
    items: [
      {
        title: "Spreadsheet Organization",
        desc: "Clean, formatted spreadsheets with formulas and data validation",
        image: "/data1.png",
        alt: "Spreadsheet organization sample",
      },
      {
        title: "Data Cleanup",
        desc: "Systematic data cleaning and standardization for accuracy",
        image: "/data2.png",
        alt: "Data cleanup sample",
      },
    ],
  },
  {
    id: "travel",
    label: "Travel Management",
    icon: Plane,
    description:
      "Planning trips can be overwhelming, but it doesn't have to be! I handle all the details—from booking flights and hotels to creating detailed itineraries and organizing travel documents—so you can focus on the adventure ahead.",
    items: [
      {
        title: "Itinerary Planning",
        desc: "Detailed travel itineraries with all bookings and logistics",
        image: "/travel1.png",
        alt: "Travel itinerary planning sample",
      },
      {
        title: "Booking Coordination",
        desc: "Flight, hotel, and transportation booking management",
        image: "/travel2.png",
        alt: "Travel booking coordination sample",
      },
    ],
  },
  {
    id: "cafe",
    label: "Cafe Designs",
    icon: Palette,
    items: [],
  },
  {
    id: "fashion",
    label: "Fashion Designs",
    icon: Palette,
    items: [],
  },
];

interface DesignSection {
  heading: string;
  items: DesignItem[];
}

const designSections: Record<string, DesignSection[]> = {
  cafe: [
    {
      heading: "Menu Designs",
      items: [
        {
          image: "/designs/cafe/cafe menu1.png",
          alt: "Cafe menu design",
          aspectRatio: "4/5",
        },
        {
          image: "/designs/cafe/cafe menu 2.png",
          alt: "Cafe menu design",
          aspectRatio: "4/5",
        },
        {
          image: "/designs/cafe/cafe menu 3.png",
          alt: "Cafe menu design",
          aspectRatio: "4/5",
        },
      ],
    },
    {
      heading: "Story Designs",
      items: [
        {
          image: "/designs/cafe/cafe story 1.png",
          alt: "Cafe story design",
          isStory: true,
        },
        {
          image: "/designs/cafe/cafe story 2.png",
          alt: "Cafe story design",
          isStory: true,
        },
        {
          image: "/designs/cafe/cafe story 3.png",
          alt: "Cafe story design",
          isStory: true,
        },
      ],
    },
  ],
  fashion: [
    {
      heading: "Square Posts",
      items: [
        {
          image: "/designs/fashion/fashion square 1.png",
          alt: "Fashion square post",
        },
        {
          image: "/designs/fashion/fashion square 2.png",
          alt: "Fashion square post",
        },
        {
          image: "/designs/fashion/fashion square 3.png",
          alt: "Fashion square post",
        },
        {
          image: "/designs/fashion/fashion square 4.png",
          alt: "Fashion square post",
        },
        {
          image: "/designs/fashion/fashion square 5.png",
          alt: "Fashion square post",
        },
        {
          image: "/designs/fashion/fashion square 6.png",
          alt: "Fashion square post",
        },
      ],
    },
    {
      heading: "Story Designs",
      items: [
        {
          image: "/designs/fashion/fashion story 1.png",
          alt: "Fashion story design",
          isStory: true,
        },
        {
          image: "/designs/fashion/fashion story 2.png",
          alt: "Fashion story design",
          isStory: true,
        },
      ],
    },
  ],
};

/* helper: flatten all images for a tab (for lightbox navigation) */
const allDesignImages = (tab: string): DesignItem[] =>
  (designSections[tab] ?? []).flatMap((s) => s.items);

/* ─── Lightbox ─── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { image: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index].image}
          alt={images[index].alt}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 text-white/60 text-sm">
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("email");
  const [lightbox, setLightbox] = useState<{
    images: { image: string; alt: string }[];
    index: number;
  } | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  const openLightbox = (
    images: { image: string; alt: string }[],
    index: number,
  ) => {
    setLightbox({ images, index });
  };

  return (
    <>
      <section
        id="portfolio"
        className="py-24 bg-cream-50 dark:bg-[#1a1612] relative"
        ref={ref}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blush-200 dark:via-accent-700 to-transparent" />

        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-sm font-medium text-blush-500 dark:text-blush-300 tracking-widest uppercase">
              Sample Work
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-accent-800 dark:text-cream-100">
              Portfolio
            </h2>
            <p className="mt-4 text-accent-800/50 dark:text-cream-400/60 text-lg leading-relaxed">
              A selection of sample works showcasing my skills and attention to
              detail.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? "bg-accent-600 text-white shadow-lg shadow-accent-600/20"
                    : "bg-white/60 dark:bg-accent-800/40 text-accent-800/60 dark:text-cream-300 border border-blush-100 dark:border-accent-700 hover:border-blush-300 dark:hover:border-accent-500 hover:text-accent-700 dark:hover:text-cream-100"
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Content */}
          {designSections[activeTab] ? (
            /* ─── Sectioned Design Grid ─── */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 space-y-12"
            >
              {designSections[activeTab].map((section, si) => {
                const allImages = allDesignImages(activeTab);
                /* offset = how many images came before this section (for lightbox index) */
                const offset = designSections[activeTab]
                  .slice(0, si)
                  .reduce((n, s) => n + s.items.length, 0);

                return (
                  <div key={section.heading}>
                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px flex-1 bg-gradient-to-r from-blush-200 dark:from-accent-700 to-transparent" />
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-accent-700 dark:text-cream-200 tracking-wide">
                        {section.heading}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-l from-blush-200 dark:from-accent-700 to-transparent" />
                    </div>

                    {/* Grid — stories get 3 cols, squares/menus get 3 cols */}
                    <div
                      className={`grid gap-3 sm:gap-4 ${
                        section.items[0]?.isStory
                          ? "grid-cols-2 sm:grid-cols-3"
                          : "grid-cols-2 sm:grid-cols-3"
                      }`}
                    >
                      {section.items.map((item, i) => (
                        <motion.div
                          key={item.image}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          onClick={() => openLightbox(allImages, offset + i)}
                          className={`group relative bg-gradient-to-br from-blush-50 to-accent-50 dark:from-accent-800 dark:to-accent-700/50 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer ${
                            item.isStory
                              ? "aspect-[9/16]"
                              : item.aspectRatio === "4/5"
                                ? "aspect-[4/5]"
                                : "aspect-square"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-accent-800/0 group-hover:bg-accent-800/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                                <ImageIcon
                                  size={18}
                                  className="text-accent-700"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* ─── Simple Portfolio Section ─── */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 space-y-8"
            >
              {/* Category heading and description */}
              <div className="max-w-4xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accent-800 dark:text-cream-100">
                  {activeCategory.label}
                </h3>
                <p className="mt-3 text-accent-800/60 dark:text-cream-400/70 leading-relaxed">
                  {activeCategory.description ||
                    activeCategory.items.map((item) => item.desc).join(" • ")}
                </p>
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto items-start">
                {activeCategory.items
                  .filter((item) => item.image)
                  .map((item, i) => {
                    const allImages = activeCategory.items
                      .filter((it) => it.image)
                      .map((it) => ({
                        image: it.image!,
                        alt: it.alt || it.title,
                      }));

                    return (
                      <motion.div
                        key={item.image}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        onClick={() => openLightbox(allImages, i)}
                        className="group relative bg-gradient-to-br from-blush-50 to-accent-50 dark:from-accent-800 dark:to-accent-700/50 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.alt || item.title}
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-accent-800/0 group-hover:bg-accent-800/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                              <ImageIcon
                                size={18}
                                className="text-accent-700"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
