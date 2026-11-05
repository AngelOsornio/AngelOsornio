// Piezas compartidas por la página principal (/) y el perfil técnico (/perfil-tecnico):
// idioma, tema, navegación, footer, botones y animaciones.
import { Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ArrowUpRight, Menu, MessageCircle, Moon, Sun, UserPlus, X } from "lucide-react";
import * as es from "@/data/profile";
import * as en from "@/data/profile.en";

/* ───────────── idioma ───────────── */

export type Lang = "es" | "en";
const CONTENT = { es, en } satisfies Record<Lang, typeof es>;
const LangCtx = createContext<Lang>("es");
export const useLang = () => useContext(LangCtx);
export const useContent = () => CONTENT[useContext(LangCtx)];

/* ───────────── estilos comunes ───────────── */

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors";
export const btnPrimary = `${btn} bg-primary text-primary-foreground hover:opacity-90`;
export const btnOutline = `${btn} border border-border hover:border-primary hover:text-primary`;
const pill = "inline-flex h-11 items-center rounded-full border border-border bg-background/80 backdrop-blur-md";

export const wa = (base: string, msg: string) => `${base.split("?")[0] ?? ""}?text=${encodeURIComponent(msg)}`;
export const splitLocation = (loc: string) => {
  const [place = "", availability = ""] = loc.split(" · ");
  return { place, availability };
};

/* ───────────── hooks ───────────── */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ───────────── piezas visuales ───────────── */

export function Logo() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-primary text-xs font-extrabold text-primary">
      AT
    </span>
  );
}

/** Título con la parte del medio resaltada: ["antes ", "resaltado", " después"]. */
export function Title({ parts }: { parts: readonly string[] }) {
  return <>{parts[0]}<em className="not-italic text-primary">{parts[1]}</em>{parts[2] ?? ""}</>;
}

export function Block({ id, alt, children }: { id?: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={alt ? "section-alt" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: readonly string[]; aside?: ReactNode }) {
  return (
    <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"><Title parts={title} /></h2>
      </div>
      {aside && <div className="max-w-sm text-muted-foreground md:text-right">{aside}</div>}
    </div>
  );
}

export function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [w, setW] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[w % words.length] ?? "";

  useEffect(() => {
    if (reduced) return;
    let t: number;
    if (!deleting && len < word.length) t = window.setTimeout(() => setLen(len + 1), 70);
    else if (!deleting) t = window.setTimeout(() => setDeleting(true), 1800);
    else if (len > 0) t = window.setTimeout(() => setLen(len - 1), 35);
    else t = window.setTimeout(() => { setDeleting(false); setW(w + 1); }, 250);
    return () => window.clearTimeout(t);
  }, [w, len, deleting, reduced, word]);

  return (
    <span className="text-primary">
      {reduced ? (words[0] ?? "") : word.slice(0, len)}
      <span className="cursor-blink">_</span>
    </span>
  );
}

export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? "";
  const hasMatch = !!match;
  const [ref, inView] = useInView<HTMLSpanElement>(0);
  const reduced = useReducedMotion();
  const [n, setN] = useState(target);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || reduced || !hasMatch || done.current) return;
    done.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, hasMatch]);

  if (!hasMatch) return <span>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
}

/** Párrafo que se "enciende" palabra por palabra al hacer scroll. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.9 - r.top) / (r.height + vh * 0.3);
      setLit(Math.round(Math.max(0, Math.min(1, p)) * words.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="transition-opacity duration-300" style={{ opacity: i < lit ? 1 : 0.16 }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

export function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask flex overflow-hidden" aria-hidden>
      <ul className={`marquee gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}>
        {[...items, ...items].map((t, i) => (
          <li key={i} className="shrink-0 rounded-full border border-border px-4 py-2 font-mono text-sm">{t}</li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── estructura de página ───────────── */

export type NavItem = { label: string; href: string; id?: string; route?: "/" | "/perfil-tecnico" };

function NavLink({ item, className, onClick, current }: { item: NavItem; className: string; onClick?: () => void; current?: boolean }) {
  if (item.route) {
    return <Link to={item.route} className={className} onClick={onClick}>{item.label}</Link>;
  }
  return <a href={item.href} className={className} onClick={onClick} aria-current={current ? "true" : undefined}>{item.label}</a>;
}

/**
 * Envuelve cada página: guarda idioma y tema, dibuja la navegación flotante,
 * el footer y el botón flotante de WhatsApp en celular.
 * `nav(ui)` devuelve los enlaces del menú; `spy` relaciona secciones sin enlace con uno del menú.
 */
export function Shell({ nav, spy = {}, children }: { nav: (ui: typeof es.ui) => NavItem[]; spy?: Record<string, string>; children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const [light, setLight] = useState(false);

  // Idioma: ?lang=en en la URL > preferencia guardada > idioma del navegador.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch { /* sin almacenamiento */ }
    const pick = param ?? saved ?? (navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    setLang(pick === "en" ? "en" : "es");
    try { setLight(localStorage.getItem("theme") === "light"); } catch { /* sin almacenamiento */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch { /* sin almacenamiento */ }
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.body.className = light ? "theme-light" : "theme-dark";
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch { /* sin almacenamiento */ }
  }, [light]);

  return (
    <LangCtx.Provider value={lang}>
      <Frame nav={nav} spy={spy} light={light} onTheme={() => setLight(!light)} onLang={() => setLang(lang === "es" ? "en" : "es")}>
        {children}
      </Frame>
    </LangCtx.Provider>
  );
}

function Frame({ nav, spy, light, onTheme, onLang, children }: {
  nav: (ui: typeof es.ui) => NavItem[]; spy: Record<string, string>; light: boolean; onTheme: () => void; onLang: () => void; children: ReactNode;
}) {
  const lang = useLang();
  const { ui, profile } = useContent();
  const items = nav(ui);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const watcher = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(spy[e.target.id] ?? e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((el) => watcher.observe(el));
    return () => { io.disconnect(); watcher.disconnect(); };
  }, [spy]);

  return (
    <>
      <a href="#inicio" className="sr-only focus:not-sr-only">{ui.skip}</a>

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2" aria-label="Principal">
          <Link to="/" aria-label={ui.nav.home} className={`${pill} gap-2.5 pl-1.5 pr-4`}>
            <Logo />
            <span className="whitespace-nowrap text-sm font-bold tracking-tight">Angel Osornio<span className="text-primary">_</span></span>
          </Link>
          <ul className="hidden h-11 items-center gap-0.5 rounded-full border border-border bg-background/80 px-1 backdrop-blur-md lg:flex">
            {items.map((item) => {
              const on = !!item.id && active === item.id;
              return (
                <li key={item.href}>
                  <NavLink item={item} current={on}
                    className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors ${on ? "bg-primary/15 text-primary" : item.route ? "text-foreground hover:text-primary" : "text-muted-foreground hover:text-foreground"}`} />
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={onLang} aria-label={ui.langSwitch} title={ui.langSwitch}
              className={`${pill} w-11 justify-center font-mono text-xs font-medium text-muted-foreground hover:text-primary`}>
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button onClick={onTheme} aria-label={light ? ui.themeToDark : ui.themeToLight}
              className={`${pill} w-11 justify-center text-muted-foreground hover:text-primary`}>
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer"
              className="hidden h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex">
              {ui.contact} <ArrowUpRight size={16} />
            </a>
            <button onClick={() => setMenu(!menu)} aria-label={ui.menu} aria-expanded={menu} className={`${pill} w-11 justify-center lg:hidden`}>
              {menu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
        {menu && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-background/95 p-2 backdrop-blur-md lg:hidden">
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} onClick={() => setMenu(false)}
                    className={`block rounded-xl px-4 py-3 text-lg font-semibold ${item.id && active === item.id ? "text-primary" : ""}`} />
                </li>
              ))}
            </ul>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)} className={btnPrimary}>
                <MessageCircle size={18} /> {ui.whatsappCta}
              </a>
              <a href={profile.vcard} onClick={() => setMenu(false)} className={btnOutline}>
                <UserPlus size={18} /> {ui.saveContact}
              </a>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <Footer items={items} />

      <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={ui.whatsappCta}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground sm:hidden">
        <MessageCircle size={24} />
      </a>
    </>
  );
}

function Footer({ items }: { items: NavItem[] }) {
  const { ui, profile } = useContent();
  const { place, availability } = splitLocation(profile.location);
  const head = "font-mono text-xs uppercase tracking-wider text-muted-foreground";
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-28 sm:pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-4xl font-extrabold tracking-tight md:text-6xl">Angel Osornio<span className="text-primary">_</span></p>
            <p className="mt-3 text-muted-foreground">{profile.tagline}</p>
          </div>
          <a href="#inicio" className="inline-flex items-center gap-2 self-start text-sm font-semibold hover:text-primary md:self-auto">
            {ui.footer.top} <ArrowUp size={16} />
          </a>
        </div>
        <div className="mt-12 grid gap-10 border-t border-border pt-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className={head}>{ui.footer.contact}</p>
            <ul className="mt-4 space-y-2">
              <li><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp · {profile.phone}</a></li>
              <li><a href={`mailto:${profile.email}`} className="break-all hover:text-primary">{profile.email}</a></li>
              <li><a href={profile.vcard} className="hover:text-primary">{ui.saveContact}</a></li>
            </ul>
          </div>
          <div>
            <p className={head}>{ui.footer.base}</p>
            <ul className="mt-4 space-y-2">
              <li>{place}</li>
              <li className="text-muted-foreground">{ui.footer.remote}</li>
            </ul>
          </div>
          <div>
            <p className={head}>{ui.footer.nav}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {items.map((item) => <li key={item.href}><NavLink item={item} className="hover:text-primary" /></li>)}
            </ul>
          </div>
          <div>
            <p className={head}>{ui.footer.status}</p>
            <ul className="mt-4 space-y-2">
              <li className="inline-flex items-center gap-2"><span className="status-dot" aria-hidden />{availability}</li>
              <li className="font-mono text-xs text-muted-foreground">MX-AGS / 01</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 font-mono text-xs text-muted-foreground">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
