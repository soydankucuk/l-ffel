"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  Coffee,
  Cookie,
  Flame,
  GlassWater,
  Globe,
  UtensilsCrossed,
} from "lucide-react";
import { formatPrice, menu } from "@/data/menu";

const ICONS = {
  coffee: Coffee,
  glass: GlassWater,
  utensils: UtensilsCrossed,
  cookie: Cookie,
};

const POWERED_BY = "LÖFFEL";

const pillTransition = { type: "spring", stiffness: 420, damping: 34 };

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M14.2 21v-6.2h2.1l.3-2.4h-2.4V10.9c0-.7.2-1.2 1.2-1.2h1.3V7.6c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.6H9.3v2.4h2.3V21h2.6Z" />
    </svg>
  );
}

function MenuImage({ item }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(231,211,161,0.35),rgba(255,255,255,0.06)_58%)]" />
    );
  }

  return (
    <img
      src={item.image}
      alt={item.name}
      width={224}
      height={224}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function MenuCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.45,
        delay: (index % 2) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center gap-3.5 rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/[0.09] md:gap-4 md:p-4"
    >
      <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:h-28 sm:w-28 md:h-32 md:w-32">
        <MenuImage item={item} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17px]">
            {item.name}
          </h3>
          <p className="shrink-0 pt-0.5 text-[15px] font-semibold tabular-nums tracking-tight text-gold">
            {formatPrice(item.price)}
          </p>
        </div>
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium tracking-wide text-cream/80">
          <Flame className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden="true" />
          {item.calories} kcal
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-cream/65">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

function SocialLink({ label, children }) {
  return (
    <a
      href="#footer"
      aria-label={label}
      onClick={(event) => event.preventDefault()}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-cream/80 transition duration-300 hover:border-white/30 hover:bg-white hover:text-forest"
    >
      {children}
    </a>
  );
}

export default function DigitalMenu() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const [scrolled, setScrolled] = useState(false);
  const tabsRef = useRef(null);
  const spacerRef = useRef(null);
  const lockRef = useRef(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 6);
      if (lockRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) {
        const lastId = menu[menu.length - 1].id;
        setActiveId((previous) => (previous === lastId ? previous : lastId));
        return;
      }

      const header = document.getElementById("site-header");
      const marker = (header?.offsetHeight ?? 0) + 20;
      let current = menu[0].id;

      for (const category of menu) {
        const section = document.getElementById(category.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= marker) {
          current = category.id;
        }
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const spacer = spacerRef.current;
    const last = document.getElementById(menu[menu.length - 1].id);
    const header = document.getElementById("site-header");
    if (!spacer || !last || !header) return;

    const fit = () => {
      const desired =
        last.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16;
      const maxScroll =
        document.documentElement.scrollHeight - spacer.offsetHeight - window.innerHeight;
      const shortfall = Math.max(0, Math.ceil(desired - maxScroll));
      if (spacer.offsetHeight !== shortfall) {
        spacer.style.height = `${shortfall}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(document.body);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useEffect(() => {
    const container = tabsRef.current;
    const tab = document.getElementById(`tab-${activeId}`);
    if (!container || !tab) return;
    if (container.scrollWidth <= container.clientWidth + 1) return;

    const left = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  function selectCategory(id) {
    const section = document.getElementById(id);
    const header = document.getElementById("site-header");
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lockRef.current = true;
    setActiveId(id);

    const top =
      section.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 0) - 16;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : "smooth",
    });

    window.setTimeout(() => {
      lockRef.current = false;
    }, reduceMotion ? 50 : 800);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh">
        <header
          id="site-header"
          className={`sticky top-0 z-40 border-b pt-[max(0.85rem,env(safe-area-inset-top))] transition-colors duration-300 ${
            scrolled
              ? "border-white/10 bg-forest/75 backdrop-blur-xl"
              : "border-transparent bg-forest/88 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto w-full max-w-lg px-4 md:max-w-3xl lg:max-w-5xl">
            <h1 className="text-center font-display text-[1.7rem] font-light uppercase leading-none tracking-[0.46em] text-white sm:text-[1.9rem]">
              <span className="inline-block pl-[0.46em]">LÖFFEL</span>
            </h1>
            <div className="mx-auto mt-3 h-px w-10 bg-gold/80" />
            <nav aria-label="Menu categories" className="mt-3">
              <div
                ref={tabsRef}
                id="category-tabs"
                className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 [justify-content:safe_center]"
              >
                {menu.map((category) => {
                  const isActive = category.id === activeId;
                  return (
                    <button
                      key={category.id}
                      id={`tab-${category.id}`}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => selectCategory(category.id)}
                      className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors ${
                        isActive ? "text-forest" : "text-white/75 hover:text-white"
                      }`}
                    >
                      <span className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.04]" />
                      {isActive ? (
                        <motion.span
                          layoutId="category-pill"
                          className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
                          transition={pillTransition}
                        />
                      ) : null}
                      <span className="relative z-10">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-lg px-4 pt-6 pb-4 md:max-w-3xl lg:max-w-5xl">
          {menu.map((category) => {
            const Icon = ICONS[category.icon];
            return (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                className="scroll-mt-40 pb-12"
              >
                <div className="mb-4 flex items-end justify-between gap-4 px-0.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-gold">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h2
                      id={`${category.id}-title`}
                      className="font-display text-[2rem] font-light leading-none tracking-wide text-white"
                    >
                      {category.label}
                    </h2>
                  </div>
                  <p className="pb-1 text-xs tracking-wide text-cream/50">
                    {category.items.length} items
                  </p>
                </div>
                <div className="mb-4 h-px bg-gradient-to-r from-gold/60 via-white/15 to-transparent" />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {category.items.map((item, index) => (
                    <MenuCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        <footer
          id="footer"
          className="border-t border-white/10 px-4 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex w-full max-w-lg flex-col items-center md:max-w-3xl lg:max-w-5xl">
            <div className="flex items-center gap-3">
              <SocialLink label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink label="Website">
                <Globe className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </SocialLink>
            </div>
            <p className="mt-6 text-[11px] font-medium tracking-[0.28em] text-cream/55 uppercase">
              Powered by {POWERED_BY}
            </p>
          </div>
        </footer>
        <div ref={spacerRef} aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
