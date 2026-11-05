// Perfil técnico: para reclutadores y equipos de desarrollo.
// Stack, experiencia, todos los proyectos, formación y certificaciones.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Award, Download, Github, GraduationCap, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SITE_URL, type Category } from "@/data/profile";
import {
  Block, Marquee, SectionHead, Shell, Title, btnOutline, btnPrimary, useContent, type NavItem,
} from "@/components/site";

const DESC = "Perfil técnico de Angel Nahum Trejo Osornio: stack, experiencia, proyectos y certificaciones en desarrollo de software y ciberseguridad.";
const PAGE_URL = `${SITE_URL}/perfil-tecnico`;

export const Route = createFileRoute("/perfil-tecnico")({
  head: () => ({
    meta: [
      { title: "Perfil técnico · Angel Nahum Trejo Osornio" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Perfil técnico · Angel Nahum Trejo Osornio" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: TechProfile,
});

const NAV = (ui: ReturnType<typeof useContent>["ui"]): NavItem[] => [
  { label: ui.nav.home, href: "/", route: "/" },
  { label: ui.nav.stack, href: "#stack", id: "stack" },
  { label: ui.nav.experiencia, href: "#experiencia", id: "experiencia" },
  { label: ui.nav.proyectos, href: "#proyectos", id: "proyectos" },
  { label: ui.nav.formacion, href: "#formacion", id: "formacion" },
];
const SPY = {};

function TechProfile() {
  return (
    <Shell nav={NAV} spy={SPY}>
      <Intro />
      <Stack />
      <Experience />
      <Projects />
      <Education />
      <Hire />
    </Shell>
  );
}

function Intro() {
  const { ui, profile } = useContent();
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 md:pt-40">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> {ui.tech.back}
        </Link>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <img src={profile.photo} alt={`${ui.photoAlt} ${profile.name}`} width={720} height={720}
            className="h-28 w-28 rounded-xl border border-primary object-cover md:h-40 md:w-40" />
          <div>
            <p className="font-mono text-sm text-primary">{ui.tech.eyebrow}<span className="cursor-blink">_</span></p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{profile.name}</h1>
            <p className="mt-3 text-lg font-medium">{profile.title}</p>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{profile.aboutTech}</p>
        <p className="mt-4 font-mono text-sm">{profile.languages}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={profile.cv} download="CV_AngelNahumTrejoOsornio.pdf" className={btnPrimary}><Download size={18} /> {ui.about.cv}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={btnOutline}><Linkedin size={18} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={btnOutline}><Github size={18} /> GitHub</a>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const { ui, stack } = useContent();
  return (
    <Block id="stack" alt>
      <SectionHead eyebrow={ui.tech.stack.eyebrow} title={ui.tech.stack.title} />
      <div className="mt-12 -mx-5 space-y-3">
        <Marquee items={stack.slice(0, 4).flatMap((g) => g.items)} />
        <Marquee items={stack.slice(4).flatMap((g) => g.items)} reverse />
      </div>
      <div className="reveal mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
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
  );
}

function Experience() {
  const { ui, experience } = useContent();
  return (
    <Block id="experiencia">
      <SectionHead eyebrow={ui.tech.experience.eyebrow} title={ui.tech.experience.title} />
      <ol className="reveal mt-12 grid gap-3 lg:grid-cols-3">
        {experience.map((e) => (
          <li key={e.company} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs text-primary">{e.dates}</p>
            <h3 className="mt-3 text-xl font-bold tracking-tight">{e.company}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{e.role}</p>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
              {e.points.map((p) => (
                <li key={p} className="flex gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-primary" aria-hidden />{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Block>
  );
}

const FILTERS: ("all" | Category)[] = ["all", "Web", "Software", "Seguridad", "IA"];

function Projects() {
  const { ui, projects } = useContent();
  const t = ui.tech.projects;
  const [f, setF] = useState<(typeof FILTERS)[number]>("all");
  const list = f === "all" ? projects : projects.filter((p) => p.categories.includes(f));
  const count = (x: (typeof FILTERS)[number]) => (x === "all" ? projects.length : projects.filter((p) => p.categories.includes(x)).length);
  const label = (x: (typeof FILTERS)[number]) => (x === "all" ? t.all : ui.categories[x]);

  return (
    <Block id="proyectos" alt>
      <SectionHead eyebrow={t.eyebrow} title={t.title} />
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t.filter}>
        {FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${f === x ? "border-foreground bg-foreground text-background" : "border-border hover:border-primary hover:text-primary"}`}>
            {label(x)}<span className={`font-mono text-xs ${f === x ? "opacity-70" : "text-muted-foreground"}`}>{count(x)}</span>
          </button>
        ))}
      </div>
      <div key={f} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, n) => (
          <article key={p.name} style={{ animationDelay: `${n * 50}ms` }}
            className="fade-up flex flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary">
            <div className="flex items-baseline justify-between gap-4 font-mono text-xs">
              <span className="text-primary">{p.categories.map((c) => ui.categories[c]).join(" · ")}</span>
              {p.year && <span className="shrink-0 text-muted-foreground">{p.year}</span>}
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">{p.tech.map((x) => <li key={x} className="chip">{x}</li>)}</ul>
            {(p.demo || p.code) && (
              <div className="mt-auto flex gap-5 pt-6 text-sm font-semibold">
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">{t.demo} <ArrowUpRight size={15} /></a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">{t.code} <Github size={14} /></a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </Block>
  );
}

function Education() {
  const { ui, profile, education, certifications } = useContent();
  return (
    <Block id="formacion">
      <SectionHead eyebrow={ui.tech.education.eyebrow} title={ui.tech.education.title} />
      <div className="reveal mt-12 grid gap-3 md:grid-cols-2">
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
        {ui.tech.education.credly} <ArrowUpRight size={16} />
      </a>
    </Block>
  );
}

function Hire() {
  const { ui, profile } = useContent();
  return (
    <Block id="contacto" alt>
      <div className="reveal text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"><Title parts={ui.tech.cta.title} /></h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{ui.tech.cta.desc}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`mailto:${profile.email}`} className={btnPrimary}><Mail size={18} /> {profile.email}</a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={btnOutline}><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </div>
    </Block>
  );
}
