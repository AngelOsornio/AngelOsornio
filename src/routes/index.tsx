import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  Code2, Globe, Database, ShieldCheck, Wrench, Cpu, Menu, X, Sun, Moon,
  MessageCircle, Mail, Copy, Check, Github, Award, Download, ExternalLink, Linkedin,
} from "lucide-react";
import {
  profile, services, stack, experience, projects, education, certifications,
  type Category, type ServiceIcon,
} from "@/data/profile";

const DESC = "Angel Nahum Trejo Osornio — Ingeniero en Ciberseguridad y Desarrollo de Software en Aguascalientes, MX. Software seguro: del código a la red.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angel Nahum Trejo Osornio · Ciberseguridad y Desarrollo de Software" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Angel Nahum Trejo Osornio · dev + sec" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];

const ICONS: Record<ServiceIcon, typeof Code2> = {
  code: Code2, globe: Globe, database: Database, shield: ShieldCheck, wrench: Wrench, cpu: Cpu,
};

const btn = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:opacity-90`;
const btnOutline = `${btn} border border-border hover:border-primary hover:text-primary`;

function Logo() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-primary font-extrabold text-primary">
      AT
    </span>
  );
}

function Section({ id, title, eyebrow, alt, children }: { id?: string; title: string; eyebrow: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={alt ? "section-alt" : undefined}>
      <div className="reveal mx-auto max-w-5xl px-5 py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(localStorage.getItem("theme") === "light");
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) spy.observe(el); });
    return () => { io.disconnect(); spy.disconnect(); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.body.className = light ? "theme-light" : "theme-dark";
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <>
      <a href="#inicio" className="sr-only focus:not-sr-only">Saltar al contenido</a>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5" aria-label="Principal">
          <a href="#inicio" aria-label="Inicio"><Logo /></a>
          <ul className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined}
                  className={`text-sm transition-colors hover:text-primary ${active === n.id ? "text-primary" : "text-muted-foreground"}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <button onClick={() => setLight(!light)} aria-label={light ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
              className="rounded-md p-2 text-muted-foreground hover:text-primary">
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setMenu(!menu)} aria-label="Menú" aria-expanded={menu} className="rounded-md p-2 md:hidden">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {menu && (
          <ul className="border-t border-border px-5 py-3 md:hidden">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setMenu(false)}
                  className={`block py-3 ${active === n.id ? "text-primary" : ""}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="inicio">
          <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-5 pt-24 pb-16">
            <p className="font-mono text-sm text-primary">&gt; dev + sec<span className="cursor-blink">_</span></p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-lg font-medium md:text-xl">{profile.title}</p>
            <p className="mt-2 max-w-xl text-muted-foreground">{profile.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                <MessageCircle size={18} /> Escríbeme por WhatsApp
              </a>
              <a href="#proyectos" className={btnOutline}>Ver proyectos</a>
            </div>
            <p className="mt-8 font-mono text-xs text-muted-foreground">{profile.location}</p>
          </div>
        </section>

        <Section id="sobre-mi" eyebrow="01 / sobre mí" title="Sobre mí" alt>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{profile.about}</p>
          <p className="mt-5 font-mono text-sm">{profile.languages}</p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
            {profile.stats.map((s) => {
              const [num, ...rest] = s.split(" ");
              return (
                <div key={s} className="bg-background p-6">
                  <dt className="font-mono text-3xl font-medium text-primary">{num}</dt>
                  <dd className="mt-1 font-mono text-xs text-muted-foreground">{rest.join(" ")}</dd>
                </div>
              );
            })}
          </dl>
        </Section>

        <Section eyebrow="02 / servicios" title="Servicios">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.title} className="rounded-md border border-border p-6 transition-colors hover:border-primary">
                  <Icon size={22} strokeWidth={1.5} className="text-primary" aria-hidden />
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section eyebrow="03 / stack" title="Conocimientos" alt>
          <div className="grid gap-8 md:grid-cols-2">
            {stack.map((g) => (
              <div key={g.group}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((i) => <li key={i} className="chip">{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experiencia" eyebrow="04 / experiencia" title="Experiencia">
          <ol className="relative border-l border-border">
            {experience.map((e) => (
              <li key={e.company} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-primary bg-background" />
                <p className="font-mono text-xs text-primary">{e.dates}</p>
                <h3 className="mt-1 text-xl font-bold">{e.company}</h3>
                <p className="text-sm text-muted-foreground">{e.role}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {e.points.map((p) => <li key={p} className="flex gap-3"><span className="text-primary">·</span>{p}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Projects />

        <Section id="formacion" eyebrow="06 / formación" title="Formación">
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((e) => (
              <div key={e.title} className="rounded-md border border-border p-6">
                <p className="font-mono text-xs text-primary">{e.dates}</p>
                <h3 className="mt-2 font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-16 text-2xl font-bold">Certificaciones</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <div key={c.name} className="flex gap-3 rounded-md border border-border p-4">
                <Award size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{c.org} · {c.date}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={profile.credly} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-8`}>
            Ver credenciales en Credly <ExternalLink size={16} />
          </a>
        </Section>

        <Contact />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 pb-24 md:flex-row md:items-center md:justify-between md:pb-10">
          <div className="flex items-center gap-3">
            <Logo />
            <p className="font-mono text-xs text-muted-foreground">© 2026 {profile.name}</p>
          </div>
          <ul className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-primary">{n.label}</a></li>)}
          </ul>
        </div>
      </footer>

      <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground md:hidden">
        <MessageCircle size={24} />
      </a>
    </>
  );
}

const FILTERS: ("Todos" | Category)[] = ["Todos", "Web", "Software", "Seguridad", "IA"];

function Projects() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("Todos");
  const list = f === "Todos" ? projects : projects.filter((p) => p.categories.includes(f));
  return (
    <Section id="proyectos" eyebrow="05 / proyectos" title="Proyectos" alt>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
        {FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
            className={`chip transition-colors ${f === x ? "border-primary text-primary" : "hover:border-primary"}`}>
            {x}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.name} className="flex flex-col rounded-md border border-border p-6 transition-colors hover:border-primary">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold">{p.name}</h3>
              {p.year && <span className="shrink-0 font-mono text-xs text-muted-foreground">{p.year}</span>}
            </div>
            <p className="mt-1 font-mono text-xs text-primary">{p.categories.join(" · ")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
            {(p.demo || p.code) && (
              <div className="mt-5 flex gap-4 text-sm font-semibold">
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">Ver demo <ExternalLink size={14} /></a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">Ver código <Github size={14} /></a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(100),
  email: z.string().trim().email("Correo no válido").max(255),
  message: z.string().trim().min(10, "El mensaje es muy corto").max(1000),
});

function Contact() {
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Proyecto — " + r.data.name)}&body=${encodeURIComponent(body)}`;
  };
  const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";
  const links = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.credly, label: "Credly", Icon: Award },
    ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn", Icon: Linkedin }] : []),
  ];
  return (
    <Section id="contacto" eyebrow="07 / contacto" title="¿Tienes un proyecto en mente?">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} w-full py-4 text-base`}>
            <MessageCircle size={20} /> Escríbeme por WhatsApp
          </a>
          <p className="mt-2 text-center font-mono text-xs text-muted-foreground">+52 {profile.phone}</p>
          <div className="mt-6 flex gap-2">
            <a href={`mailto:${profile.email}`} className={`${btnOutline} flex-1`}><Mail size={16} /> Enviar correo</a>
            <button onClick={copy} className={btnOutline} aria-label="Copiar correo">
              {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="mt-2 break-all font-mono text-xs text-muted-foreground" aria-live="polite">
            {copied ? "Correo copiado ✓" : profile.email}
          </p>
          <ul className="mt-8 flex flex-wrap gap-5 text-sm">
            {links.map(({ href, label, Icon }) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Icon size={16} strokeWidth={1.5} />{label}</a></li>
            ))}
          </ul>
          <a href={profile.cv} download="CV_AngelNahumTrejoOsornio.pdf" className={`${btnOutline} mt-8`}>
            <Download size={16} /> Descargar CV
          </a>
        </div>
        <form onSubmit={submit} noValidate className="space-y-4">
          {(["name", "email", "message"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={k} className="font-mono text-xs text-muted-foreground">
                {{ name: "Nombre", email: "Correo", message: "Mensaje" }[k]}
              </label>
              {k === "message"
                ? <textarea id={k} name={k} rows={5} maxLength={1000} className={field} aria-invalid={!!errors[k]} />
                : <input id={k} name={k} type={k === "email" ? "email" : "text"} maxLength={k === "email" ? 255 : 100} className={field} aria-invalid={!!errors[k]} />}
              {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <button type="submit" className={`${btnPrimary} w-full`}>Enviar mensaje</button>
        </form>
      </div>
    </Section>
  );
}
