import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  Code2, Globe, Database, ShieldCheck, Wrench, Cpu, Menu, X, Sun, Moon,
  MessageCircle, Mail, Copy, Check, Github, Award, Download, Linkedin,
  ArrowUpRight, ArrowDown, ArrowUp, GraduationCap, UserPlus,
} from "lucide-react";
import * as es from "@/data/profile";
import * as en from "@/data/profile.en";
import { SITE_URL, profile as baseProfile, type Category, type ServiceIcon } from "@/data/profile";

/* ───────────── idioma ───────────── */

type Lang = "es" | "en";
const CONTENT = { es, en } satisfies Record<Lang, typeof es>;
const LangCtx = createContext<Lang>("es");
const useContent = () => CONTENT[useContext(LangCtx)];

/* ───────────── SEO y vista previa al compartir ───────────── */

const DESC = "Angel Nahum Trejo Osornio — Ingeniero en Ciberseguridad y Desarrollo de Software en Aguascalientes, MX. Software seguro: del código a la red.";
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: baseProfile.name,
  jobTitle: baseProfile.title,
  url: SITE_URL,
  image: OG_IMAGE,
  email: `mailto:${baseProfile.email}`,
  telephone: "+52 " + baseProfile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Aguascalientes", addressCountry: "MX" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Global University" },
  knowsLanguage: ["es", "en"],
  sameAs: [baseProfile.linkedin, baseProfile.github, baseProfile.credly],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angel Nahum Trejo Osornio · Ciberseguridad y Desarrollo de Software" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Angel Nahum Trejo Osornio · dev + sec" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Angel Nahum Trejo Osornio — dev + sec" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Angel Nahum Trejo Osornio · dev + sec" },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(PERSON_LD) }],
  }),
  component: Page,
});

/* ───────────── constantes ───────────── */

const NAV_IDS = ["sobre-mi", "servicios", "experiencia", "proyectos", "formacion", "contacto"] as const;
// Secciones sin enlace propio en el menú: resaltan la sección más cercana.
const SPY_ALIAS: Record<string, string> = { proceso: "servicios", stack: "servicios" };

const ICONS: Record<ServiceIcon, typeof Code2> = {
  code: Code2, globe: Globe, database: Database, shield: ShieldCheck, wrench: Wrench, cpu: Cpu,
};

const wa = (msg: string) => `${baseProfile.whatsapp.split("?")[0] ?? ""}?text=${encodeURIComponent(msg)}`;
const splitLocation = (loc: string) => {
  const [place = "", availability = ""] = loc.split(" · ");
  return { place, availability };
};

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:opacity-90`;
const btnOutline = `${btn} border border-border hover:border-primary hover:text-primary`;
const pill = "inline-flex h-11 items-center rounded-full border border-border bg-background/80 backdrop-blur-md";

/* ───────────── helpers ───────────── */

function useReducedMotion() {
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

function useInView<T extends Element>(threshold = 0.25) {
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

function Logo() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-primary text-xs font-extrabold text-primary">
      AT
    </span>
  );
}

/** Título con la parte del medio resaltada: ["antes ", "resaltado", " después"]. */
function Title({ parts }: { parts: readonly string[] }) {
  return <>{parts[0]}<em className="not-italic text-primary">{parts[1]}</em>{parts[2] ?? ""}</>;
}

function Block({ id, alt, children }: { id?: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={alt ? "section-alt" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: readonly string[]; aside?: ReactNode }) {
  return (
    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"><Title parts={title} /></h2>
      </div>
      {aside && <div className="max-w-sm text-muted-foreground md:text-right">{aside}</div>}
    </div>
  );
}

function Typewriter({ words }: { words: string[] }) {
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

function CountUp({ value }: { value: string }) {
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
function ScrollWords({ text, className }: { text: string; className?: string }) {
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
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
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

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
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

/* ───────────── página ───────────── */

function Page() {
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
      <Index light={light} onTheme={() => setLight(!light)} onLang={() => setLang(lang === "es" ? "en" : "es")} />
    </LangCtx.Provider>
  );
}

function Index({ light, onTheme, onLang }: { light: boolean; onTheme: () => void; onLang: () => void }) {
  const lang = useContext(LangCtx);
  const { ui, profile, stack, experience, education, certifications } = useContent();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(SPY_ALIAS[e.target.id] ?? e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["inicio", "proceso", "stack", ...NAV_IDS].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    return () => { io.disconnect(); spy.disconnect(); };
  }, []);

  return (
    <>
      <a href="#inicio" className="sr-only focus:not-sr-only">{ui.skip}</a>

      {/* Navegación flotante */}
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2" aria-label="Principal">
          <a href="#inicio" aria-label="Inicio" className={`${pill} gap-2.5 pl-1.5 pr-4`}>
            <Logo />
            <span className="whitespace-nowrap text-sm font-bold tracking-tight">Angel Osornio<span className="text-primary">_</span></span>
          </a>
          <ul className="hidden h-11 items-center gap-0.5 rounded-full border border-border bg-background/80 px-1 backdrop-blur-md lg:flex">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {ui.nav[id]}
                </a>
              </li>
            ))}
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
              {NAV_IDS.map((id, i) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setMenu(false)}
                    className={`flex items-baseline gap-3 rounded-xl px-4 py-3 text-lg font-semibold ${active === id ? "text-primary" : ""}`}>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>{ui.nav[id]}
                  </a>
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

      <main>
        <Hero />

        {/* Sobre mí: texto que se enciende con el scroll */}
        <section id="sobre-mi" className="section-alt">
          <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
            <p className="eyebrow text-center">{ui.aboutEyebrow}</p>
            <ScrollWords key={lang} text={profile.about}
              className="mx-auto mt-6 max-w-4xl text-center text-2xl font-bold leading-snug tracking-tight md:text-[2.5rem] md:leading-[1.2]" />
            <p className="mt-10 text-center font-mono text-sm text-muted-foreground">{profile.languages}</p>
            <div className="mt-20 grid border-t border-border sm:grid-cols-3">
              {profile.stats.map((s) => {
                const [num = "", ...rest] = s.split(" ");
                return (
                  <div key={s} className="border-b border-border py-8 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0">
                    <p className="text-5xl font-extrabold tracking-tight md:text-6xl"><CountUp value={num} /></p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">{rest.join(" ")}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Services />

        <Workflow />

        {/* Stack */}
        <Block id="stack">
          <SectionHead eyebrow={ui.stack.eyebrow} title={ui.stack.title} aside={ui.stack.aside} />
          <div className="mt-14 -mx-5 space-y-3">
            <Marquee items={stack.slice(0, 4).flatMap((g) => g.items)} />
            <Marquee items={stack.slice(4).flatMap((g) => g.items)} reverse />
          </div>
          <div className="reveal mt-14 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((g) => (
              <div key={g.group} className="border-r border-b border-border p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary">{g.group}</h3>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {g.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        {/* Experiencia */}
        <Block id="experiencia" alt>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">{ui.experience.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"><Title parts={ui.experience.title} /></h2>
              <p className="mt-5 max-w-sm text-muted-foreground">{ui.experience.desc}</p>
              <a href={profile.cv} download="CV_AngelNahumTrejoOsornio.pdf" className={`${btnOutline} mt-8`}>
                <Download size={16} /> {ui.experience.cv}
              </a>
            </div>
            <ol className="reveal">
              {experience.map((e) => (
                <li key={e.company} className="group border-b border-border py-8 first:pt-0 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">{e.company}</h3>
                    <p className="font-mono text-xs text-primary">{e.dates}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.role}</p>
                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-primary" aria-hidden />{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Block>

        <Projects />

        {/* Formación */}
        <Block id="formacion" alt>
          <SectionHead eyebrow={ui.education.eyebrow} title={ui.education.title} />
          <div className="reveal mt-14 grid gap-3 md:grid-cols-2">
            {education.map((e) => (
              <div key={e.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <GraduationCap size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-mono text-xs text-primary">{e.dates}</p>
                  <h3 className="mt-2 font-bold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-3 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <div key={c.name} className="flex gap-3 border-r border-b border-border p-5">
                <Award size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{c.org} · {c.date}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={profile.credly} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-8`}>
            {ui.education.credly} <ArrowUpRight size={16} />
          </a>
        </Block>

        <Contact />
      </main>

      <Footer />

      <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={ui.whatsappCta}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground sm:hidden">
        <MessageCircle size={24} />
      </a>
    </>
  );
}

/* ───────────── inicio ───────────── */

function Hero() {
  const lang = useContext(LangCtx);
  const { ui, profile, heroWords } = useContent();
  const { place, availability } = splitLocation(profile.location);
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-5 pt-28 pb-20 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="font-mono text-sm text-primary">&gt; dev + sec<span className="cursor-blink">_</span></p>
          <h1 className="mt-6 min-h-[3.2em] text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:min-h-[2.1em] sm:text-6xl lg:text-[4.6rem]">
            <span className="sr-only">{ui.heroLead} {heroWords.join(", ")}.</span>
            <span aria-hidden>{ui.heroLead} <br className="hidden sm:block" /><Typewriter key={lang} words={heroWords} /></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {ui.heroIntro[0]} <strong className="font-semibold text-foreground">{profile.name}</strong>{ui.heroIntro[1]}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <MessageCircle size={18} /> {ui.whatsappCta}
            </a>
            <a href={profile.vcard} className={btnOutline}>
              <UserPlus size={18} /> {ui.saveContact}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><span className="status-dot" aria-hidden />{availability}</span>
            <span>{place} · {ui.remote}</span>
            <a href="#proyectos" className="inline-flex items-center gap-1 text-foreground hover:text-primary">{ui.seeProjects} <ArrowDown size={13} /></a>
          </div>
        </div>
        <HeroCard />
      </div>
      <a href="#sobre-mi" aria-label={ui.scrollDown}
        className="absolute bottom-8 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

function HeroCard() {
  const { ui, profile } = useContent();
  const terminal = ui.terminal;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) { setShown(terminal.length); return; }
    if (shown >= terminal.length) return;
    const t = window.setTimeout(() => setShown(shown + 1), shown === 0 ? 700 : 900);
    return () => window.clearTimeout(t);
  }, [shown, reduced, terminal.length]);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-none">
      <div ref={ref} onPointerMove={tilt} onPointerLeave={reset}
        className="rounded-2xl border border-border bg-card transition-transform duration-200 ease-out">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-primary" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">~/angel — zsh</span>
        </div>
        <div className="p-3">
          <img src={profile.photo} alt={`${ui.photoAlt} ${profile.name}`} width={720} height={720} fetchPriority="high"
            className="aspect-square w-full rounded-lg object-cover" />
        </div>
        <div className="min-h-[8.5rem] border-t border-border px-4 py-4 font-mono text-xs leading-relaxed">
          {terminal.slice(0, shown).map((l) => (
            <div key={l.cmd} className="fade-up">
              <p><span className="text-primary">$</span> {l.cmd}</p>
              <p className="text-muted-foreground">{l.out}</p>
            </div>
          ))}
          {shown < terminal.length && <p><span className="text-primary">$</span> <span className="cursor-blink">▍</span></p>}
        </div>
      </div>
    </div>
  );
}

/* ───────────── servicios ───────────── */

function Services() {
  const { ui, services } = useContent();
  return (
    <Block id="servicios">
      <SectionHead eyebrow={ui.services.eyebrow} title={ui.services.title} aside={ui.services.aside} />
      <div className="reveal mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <a key={s.icon} href={wa(`${ui.services.message}${s.title}.`)} target="_blank" rel="noopener noreferrer"
              className="group flex min-h-72 flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border text-primary transition-colors group-hover:border-primary">
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-12 text-xl font-bold">{s.title}</h3>
              <p className="mt-1.5 mb-6 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-auto flex items-center justify-between border-t border-border pt-4 font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                {ui.services.quote}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          );
        })}
      </div>
    </Block>
  );
}

/* ───────────── cómo trabajo (interactivo) ───────────── */

const STEP_MS = 5200;

function Workflow() {
  const { ui, workflow } = useContent();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [lines, setLines] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const step = workflow[i] ?? workflow[0]!;
  const playing = auto && inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setI((i + 1) % workflow.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [i, playing, workflow.length]);

  useEffect(() => {
    if (reduced) { setLines(step.output.length); return; }
    setLines(0);
    let n = 0;
    const t = window.setInterval(() => {
      n += 1;
      setLines(n);
      if (n >= step.output.length) window.clearInterval(t);
    }, 550);
    return () => window.clearInterval(t);
  }, [i, reduced, step.output.length]);

  const pick = (n: number) => { setAuto(false); setI(n); };

  return (
    <Block id="proceso" alt>
      <div ref={ref} className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal">
          <p className="eyebrow">{ui.workflow.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"><Title parts={ui.workflow.title} /></h2>
          <p className="mt-5 max-w-md text-muted-foreground">{ui.workflow.desc}</p>
          <div role="tablist" aria-label={ui.workflow.tabs} className="mt-8 border-t border-border">
            {workflow.map((s, n) => (
              <button key={n} role="tab" aria-selected={n === i} onClick={() => pick(n)}
                className={`relative flex w-full items-baseline gap-4 border-b border-border py-4 text-left transition-colors ${n === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <span className="font-mono text-xs text-primary">0{n + 1}</span>
                <span className="text-lg font-bold">{s.step}</span>
                {n === i && (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-border" aria-hidden>
                    <span key={`${i}-${playing}`} className={`block h-full bg-primary ${playing ? "progress-fill" : "w-full"}`}
                      style={playing ? { animationDuration: `${STEP_MS}ms` } : undefined} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal rounded-2xl border border-border bg-card lg:self-center" role="tabpanel" aria-label={step.step}>
          <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-xs text-muted-foreground">
            <span>{ui.workflow.path} — {step.step.toLowerCase()}</span>
            <span>{ui.workflow.step} 0{i + 1} / 0{workflow.length}</span>
          </div>

          <div className="px-5 pt-8 sm:px-8">
            <ol className="flex items-center" aria-hidden>
              {workflow.map((s, n) => (
                <li key={n} className="flex flex-1 items-center last:flex-none">
                  <button tabIndex={-1} onClick={() => pick(n)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${n < i ? "border-primary bg-primary text-primary-foreground" : n === i ? "border-primary text-primary ring-4 ring-primary/15" : "border-border text-muted-foreground"}`}>
                    {n < i ? <Check size={14} /> : n + 1}
                  </button>
                  {n < workflow.length - 1 && (
                    <span className="mx-1 h-px flex-1 bg-border">
                      <span className="block h-full bg-primary transition-all duration-500" style={{ width: n < i ? "100%" : "0%" }} />
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div key={`${i}-${step.step}`} className="fade-up mt-8">
              <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.desc}</p>
            </div>
          </div>

          <div className="m-5 mt-6 rounded-xl border border-border bg-background p-5 font-mono text-sm sm:m-8 sm:mt-6">
            <p><span className="text-primary">$</span> {step.cmd}</p>
            <ul className="mt-3 min-h-[5.25rem] space-y-1.5">
              {step.output.slice(0, lines).map((o) => (
                <li key={`${i}-${o}`} className="fade-up flex items-center gap-2 text-muted-foreground">
                  <Check size={14} className="shrink-0 text-primary" /> {o}
                </li>
              ))}
              {lines < step.output.length && <li className="cursor-blink text-primary">▍</li>}
            </ul>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* ───────────── proyectos ───────────── */

const FILTERS: ("all" | Category)[] = ["all", "Web", "Software", "Seguridad", "IA"];

function Projects() {
  const { ui, projects } = useContent();
  const [f, setF] = useState<(typeof FILTERS)[number]>("all");
  const list = f === "all" ? projects : projects.filter((p) => p.categories.includes(f));
  const count = (x: (typeof FILTERS)[number]) => (x === "all" ? projects.length : projects.filter((p) => p.categories.includes(x)).length);
  const label = (x: (typeof FILTERS)[number]) => (x === "all" ? ui.projects.all : ui.categories[x]);

  return (
    <Block id="proyectos">
      <SectionHead eyebrow={ui.projects.eyebrow} title={ui.projects.title} aside={ui.projects.aside} />
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={ui.projects.filter}>
        {FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${f === x ? "border-foreground bg-foreground text-background" : "border-border hover:border-primary hover:text-primary"}`}>
            {label(x)}<span className={`font-mono text-xs ${f === x ? "opacity-70" : "text-muted-foreground"}`}>{count(x)}</span>
          </button>
        ))}
      </div>
      <div key={f} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, n) => (
          <article key={p.name} style={{ animationDelay: `${n * 60}ms` }}
            className="fade-up group flex flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary">
            <div className="flex items-baseline justify-between gap-4 font-mono text-xs">
              <span className="text-primary">{p.categories.map((c) => ui.categories[c]).join(" · ")}</span>
              {p.year && <span className="shrink-0 text-muted-foreground">{p.year}</span>}
            </div>
            <h3 className="mt-6 text-xl font-bold tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">{p.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
            {(p.demo || p.code) && (
              <div className="mt-auto flex gap-5 pt-6 text-sm font-semibold">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                    {ui.projects.demo} <ArrowUpRight size={15} />
                  </a>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                    {ui.projects.code} <Github size={14} />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Block>
  );
}

/* ───────────── contacto ───────────── */

function Contact() {
  const { ui, profile } = useContent();
  const t = ui.contactSection;
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const schema = z.object({
    name: z.string().trim().min(2, t.errors.name).max(100),
    email: z.string().trim().email(t.errors.email).max(255),
    message: z.string().trim().min(10, t.errors.message).max(1000),
  });
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(t.subject + r.data.name)}&body=${encodeURIComponent(body)}`;
  };
  const field = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
  const links = [
    { href: profile.github, label: "GitHub", Icon: Github },
    ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn", Icon: Linkedin }] : []),
    { href: profile.credly, label: "Credly", Icon: Award },
  ];
  const rowLink = "group flex items-center justify-between border-b border-border py-4 transition-colors hover:text-primary";

  return (
    <Block id="contacto">
      <div className="reveal text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl"><Title parts={t.title} /></h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t.desc}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} px-8 py-4 text-base`}>
            <MessageCircle size={20} /> {ui.whatsappCta} <ArrowUpRight size={18} />
          </a>
          <a href={profile.vcard} className={`${btnOutline} px-8 py-4 text-base`}>
            <UserPlus size={20} /> {ui.saveContact}
          </a>
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">+52 {profile.phone}</p>
      </div>

      <div className="reveal mt-20 grid gap-12 border-t border-border pt-16 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{t.emailTitle}</h3>
          <p className="mt-2 text-muted-foreground">{t.emailDesc}</p>
          <div className="mt-6 flex gap-2">
            <a href={`mailto:${profile.email}`} className={`${btnOutline} flex-1`}><Mail size={16} /> {t.sendEmail}</a>
            <button onClick={copy} className={`${btnOutline} px-4`} aria-label={t.copyEmail}>
              {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="mt-2 break-all font-mono text-xs text-muted-foreground" aria-live="polite">
            {copied ? t.copied : profile.email}
          </p>
          <ul className="mt-10 border-t border-border">
            {links.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={rowLink}>
                  <span className="inline-flex items-center gap-3 font-semibold"><Icon size={18} strokeWidth={1.5} />{label}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} download="CV_AngelNahumTrejoOsornio.pdf" className={rowLink}>
                <span className="inline-flex items-center gap-3 font-semibold"><Download size={18} strokeWidth={1.5} />{ui.experience.cv}</span>
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-border bg-card p-6">
          {(["name", "email", "message"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={k} className="font-mono text-xs text-muted-foreground">{t.fields[k]}</label>
              {k === "message"
                ? <textarea id={k} name={k} rows={5} maxLength={1000} className={field} aria-invalid={!!errors[k]} />
                : <input id={k} name={k} type={k === "email" ? "email" : "text"} maxLength={k === "email" ? 255 : 100} className={field} aria-invalid={!!errors[k]} />}
              {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <button type="submit" className={`${btnPrimary} w-full`}>{t.submit} <ArrowUpRight size={16} /></button>
        </form>
      </div>
    </Block>
  );
}

/* ───────────── footer ───────────── */

function Footer() {
  const { ui, profile } = useContent();
  const { place, availability } = splitLocation(profile.location);
  const head = "font-mono text-xs uppercase tracking-wider text-muted-foreground";
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-28 sm:pb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-5xl font-extrabold tracking-tight md:text-7xl">Angel Osornio<span className="text-primary">_</span></p>
            <p className="mt-3 text-muted-foreground">{profile.tagline}</p>
          </div>
          <a href="#inicio" className="inline-flex items-center gap-2 self-start text-sm font-semibold hover:text-primary md:self-auto">
            {ui.footer.top} <ArrowUp size={16} />
          </a>
        </div>
        <div className="mt-14 grid gap-10 border-t border-border pt-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
              {NAV_IDS.map((id) => <li key={id}><a href={`#${id}`} className="hover:text-primary">{ui.nav[id]}</a></li>)}
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
        <p className="mt-14 font-mono text-xs text-muted-foreground">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
