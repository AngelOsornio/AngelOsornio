// Página principal: pensada para clientes, en lenguaje sencillo.
// Lo técnico vive en /perfil-tecnico (src/routes/perfil-tecnico.tsx).
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Check, Code2, Copy, Download, Github, Globe, Linkedin, Mail, MessageCircle, MessagesSquare,
  ShieldCheck, UserPlus,
} from "lucide-react";
import { SITE_URL, profile as baseProfile, type ServiceIcon } from "@/data/profile";
import {
  Block, CountUp, ScrollWords, SectionHead, Shell, Title, Typewriter, btnOutline, btnPrimary, splitLocation,
  useContent, useInView, useLang, useReducedMotion, wa, type NavItem,
} from "@/components/site";

/* ───────────── SEO y vista previa al compartir ───────────── */

const DESC = "Angel Nahum Trejo Osornio — Páginas web rápidas, seguras y hechas para tu negocio. Ingeniero en Ciberseguridad y Desarrollo de Software en Aguascalientes, MX.";
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
      { title: "Angel Nahum Trejo Osornio · Páginas web y desarrollo de software" },
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
  component: Home,
});

/* ───────────── menú ───────────── */

const NAV = (ui: ReturnType<typeof useContent>["ui"]): NavItem[] => [
  { label: ui.nav.servicios, href: "#servicios", id: "servicios" },
  { label: ui.nav.proceso, href: "#proceso", id: "proceso" },
  { label: ui.nav.proyectos, href: "#proyectos", id: "proyectos" },
  { label: ui.nav["sobre-mi"], href: "#sobre-mi", id: "sobre-mi" },
  { label: ui.nav.contacto, href: "#contacto", id: "contacto" },
  { label: ui.nav.tech, href: "/perfil-tecnico", route: "/perfil-tecnico" },
];
const SPY = {};

const ICONS: Record<ServiceIcon, typeof Code2> = { globe: Globe, code: Code2, message: MessagesSquare, shield: ShieldCheck };

function Home() {
  return (
    <Shell nav={NAV} spy={SPY}>
      <Hero />
      <Services />
      <Workflow />
      <Projects />
      <About />
      <Contact />
    </Shell>
  );
}

/* ───────────── inicio ───────────── */

function Hero() {
  const lang = useLang();
  const { ui, profile, heroWords } = useContent();
  const { place, availability } = splitLocation(profile.location);
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pt-28 pb-16 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="font-mono text-sm text-primary">&gt; dev + sec<span className="cursor-blink">_</span></p>
          <h1 className="mt-6 min-h-[3.2em] text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:min-h-[2.1em] sm:text-6xl lg:text-[4.4rem]">
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
    <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
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
  const { ui, profile, services } = useContent();
  return (
    <Block id="servicios">
      <SectionHead eyebrow={ui.services.eyebrow} title={ui.services.title} aside={ui.services.aside} />
      <div className="reveal mt-12 grid gap-3 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          const main = i === 0;
          return (
            <a key={s.icon} href={wa(profile.whatsapp, `${ui.services.message}${s.title}.`)} target="_blank" rel="noopener noreferrer"
              className={`group flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-primary sm:p-7 ${main ? "border-primary/60 bg-primary/[0.06]" : "border-border bg-card"}`}>
              <div className="flex items-start justify-between">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border text-primary transition-colors group-hover:border-primary ${main ? "border-primary/60" : "border-border"}`}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                </span>
                <ArrowUpRight size={18} className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-8 text-xl font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-6 font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">{ui.services.quote} →</span>
            </a>
          );
        })}
      </div>
    </Block>
  );
}

/* ───────────── cómo trabajo (interactivo) ───────────── */

const STEP_MS = 5000;

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
    }, 450);
    return () => window.clearInterval(t);
  }, [i, reduced, step.output.length]);

  const pick = (n: number) => { setAuto(false); setI(n); };

  return (
    <Block id="proceso" alt>
      <div ref={ref}>
        <SectionHead eyebrow={ui.workflow.eyebrow} title={ui.workflow.title} aside={ui.workflow.desc} />
        <div className="reveal mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div role="tablist" aria-label={ui.workflow.tabs} className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-0 lg:border-t lg:border-border">
            {workflow.map((s, n) => (
              <button key={n} role="tab" aria-selected={n === i} onClick={() => pick(n)}
                className={`relative flex items-baseline gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-border lg:px-0 lg:py-4 ${n === i ? "border-primary text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                <span className="font-mono text-xs text-primary">0{n + 1}</span>
                <span className="font-bold lg:text-lg">{s.step}</span>
                {n === i && (
                  <span className="absolute inset-x-0 -bottom-px hidden h-px bg-border lg:block" aria-hidden>
                    <span key={`${i}-${playing}`} className={`block h-full bg-primary ${playing ? "progress-fill" : "w-full"}`}
                      style={playing ? { animationDuration: `${STEP_MS}ms` } : undefined} />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8" role="tabpanel" aria-label={step.step}>
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{ui.workflow.step} 0{i + 1} / 0{workflow.length}</span>
              <span className="flex gap-1.5" aria-hidden>
                {workflow.map((_, n) => (
                  <span key={n} className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${n <= i ? "bg-primary" : "bg-border"}`} />
                ))}
              </span>
            </div>
            <div key={`${i}-${step.step}`} className="fade-up mt-6">
              <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.desc}</p>
            </div>
            <div className="mt-6 rounded-xl border border-border bg-background p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">{ui.workflow.get}</p>
              <ul className="mt-3 min-h-[4.75rem] space-y-1.5">
                {step.output.slice(0, lines).map((o) => (
                  <li key={`${i}-${o}`} className="fade-up flex items-center gap-2.5 text-sm">
                    <Check size={15} className="shrink-0 text-primary" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* ───────────── proyectos destacados ───────────── */

function Projects() {
  const { ui, projects } = useContent();
  const featured = projects.filter((p) => p.pitch);
  return (
    <Block id="proyectos">
      <SectionHead eyebrow={ui.projects.eyebrow} title={ui.projects.title}
        aside={<Link to="/perfil-tecnico" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary">{ui.projects.more} <ArrowUpRight size={16} /></Link>} />
      <div className="reveal mt-12 grid gap-3 md:grid-cols-3">
        {featured.map((p) => (
          <article key={p.name} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary">
            <p className="font-mono text-xs text-primary">{p.categories.map((c) => ui.categories[c]).join(" · ")}</p>
            <h3 className="mt-5 text-xl font-bold tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.pitch}</p>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-primary hover:underline">
                {ui.projects.demo} <ArrowUpRight size={15} />
              </a>
            )}
          </article>
        ))}
      </div>
    </Block>
  );
}

/* ───────────── sobre mí ───────────── */

function About() {
  const lang = useLang();
  const { ui, profile } = useContent();
  return (
    <section id="sobre-mi" className="section-alt">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="eyebrow text-center">{ui.about.eyebrow}</p>
        <ScrollWords key={lang} text={profile.about}
          className="mx-auto mt-6 max-w-4xl text-center text-2xl font-bold leading-snug tracking-tight md:text-[2.4rem] md:leading-[1.2]" />
        <div className="mt-14 grid border-t border-border sm:grid-cols-3">
          {profile.stats.map((s) => {
            const [num = "", ...rest] = s.split(" ");
            return (
              <div key={s} className="border-b border-border py-6 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0">
                <p className="text-4xl font-extrabold tracking-tight md:text-5xl"><CountUp value={num} /></p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">{rest.join(" ")}</p>
              </div>
            );
          })}
        </div>
        <div className="reveal mt-10 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs text-primary">&gt; dev + sec</p>
            <h3 className="mt-2 text-xl font-bold">{ui.about.techTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{ui.about.techDesc}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/perfil-tecnico" className={btnPrimary}>{ui.about.techCta} <ArrowUpRight size={16} /></Link>
            <a href={profile.cv} download="CV_AngelNahumTrejoOsornio.pdf" className={btnOutline}><Download size={16} /> {ui.about.cv}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── contacto ───────────── */

function Contact() {
  const { ui, profile } = useContent();
  const t = ui.contactSection;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const chip = "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary";

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
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <a href={`mailto:${profile.email}`} className={chip}><Mail size={16} /> {profile.email}</a>
          <button onClick={copy} className={chip} aria-label={t.copyEmail} aria-live="polite">
            {copied ? <><Check size={16} className="text-primary" /> {t.copied}</> : <Copy size={16} />}
          </button>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={chip}><Linkedin size={16} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={chip}><Github size={16} /> GitHub</a>
        </div>
      </div>
    </Block>
  );
}
