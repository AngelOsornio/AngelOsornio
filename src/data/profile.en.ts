// ENGLISH content. Same fields as profile.ts, translated.
// Links, phone, photo and CV are shared with the Spanish version.
import { profile as es, type Category, type Project, type ServiceIcon } from "./profile";

export { SITE_URL } from "./profile";

export const profile = {
  ...es,
  title: "Cybersecurity & Software Development Engineer",
  tagline: "I build secure software: from code to network.",
  location: "Aguascalientes, MX · Available for projects",
  whatsapp: "https://wa.me/527711221326?text=" + encodeURIComponent("Hi Angel, I saw your website and I'm interested in…"),
  languages: "Spanish (native) · English C2 (Oxford)",
  about:
    "I'm a Computer Security and Software Development Engineering student at Global University (graduating December 2026). I build web applications end to end, from the database and backend to production deployment, with security as part of the design rather than an afterthought. I co-founded a software startup, built SaaS platforms running in production and carried out security audits following a professional pentest methodology.",
  stats: ["7 certifications", "8+ projects", "2nd place Hidrotalent 2024"],
};

export const heroWords = ["that's secure", "tailored to you", "that scales", "for your business"];

export const workflow: { step: string; title: string; desc: string; cmd: string; output: string[] }[] = [
  {
    step: "Discovery",
    title: "I learn how you operate",
    desc: "Before writing any code, I map your processes and we agree on the problem we're solving.",
    cmd: "analyze --business",
    output: ["processes mapped", "requirements defined", "scope and timeline agreed"],
  },
  {
    step: "Design",
    title: "Architecture that makes sense",
    desc: "Data model, architecture and a clickable prototype to validate before building.",
    cmd: "design --architecture",
    output: ["data model", "clickable prototype", "role-based access control"],
  },
  {
    step: "Development",
    title: "Releases you can test",
    desc: "I build in short iterations: frontend, backend and integrations like WhatsApp or payments.",
    cmd: "npm run build",
    output: ["frontend + backend", "integrations connected", "automated tests"],
  },
  {
    step: "Security",
    title: "Audited before launch",
    desc: "I review the system the way an attacker would, following the OWASP Top 10.",
    cmd: "audit --owasp-top-10",
    output: ["SQL injection: protected", "XSS: protected", "access control: protected"],
  },
  {
    step: "Deployment",
    title: "Live and monitored",
    desc: "Deployed on your own server with domain, SSL and monitoring, ready to grow.",
    cmd: "deploy --prod",
    output: ["VPS + EasyPanel", "domain and SSL", "monitoring active"],
  },
];

export const services: { icon: ServiceIcon; title: string; desc: string }[] = [
  { icon: "code", title: "Custom software", desc: "Tailored systems, CRM/ERP and SaaS platforms." },
  { icon: "globe", title: "Websites", desc: "Modern, fast and responsive websites and web apps." },
  { icon: "database", title: "Databases", desc: "Design, modeling, migration and optimization." },
  { icon: "shield", title: "Cybersecurity", desc: "Web pentesting, audits and OWASP best practices." },
  { icon: "wrench", title: "Maintenance", desc: "Support, updates and deployment of existing systems." },
  { icon: "cpu", title: "Hardware", desc: "Diagnostics, equipment setup and networking." },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "SQL"] },
  { group: "Frontend", items: ["React", "Angular", "Vite", "Tailwind CSS", "shadcn/ui", "HTML", "CSS"] },
  { group: "Backend & data", items: ["Node.js", "Express", "Spring Boot", "Supabase", "PostgreSQL", "SQL Server"] },
  { group: "Cybersecurity", items: ["Web pentesting (SQLi, XSS, IDOR)", "OWASP Top 10", "Kali Linux", "SQLmap", "Cisco networking"] },
  { group: "DevOps & infrastructure", items: ["Docker", "k3s", "Ansible", "VPS", "EasyPanel", "Domains & DNS", "Git/GitHub"] },
  { group: "Automation & AI", items: ["n8n", "WhatsApp automations", "TensorFlow", "Keras", "Google Colab"] },
  { group: "Blockchain", items: ["Solidity", "Hardhat", "Remix IDE", "Hyperledger Fabric"] },
  { group: "Methodologies", items: ["Agile", "Scrum", "Kanban", "Design Thinking"] },
];

export const experience = [
  {
    company: "Padelize",
    role: "Full Stack Developer",
    dates: "May – Oct 2026",
    points: [
      "Built and maintained a SaaS platform for padel club management: customers, bookings and payments.",
      "Migrated the platform to self-hosted infrastructure: VPS deployment with EasyPanel, domain setup and SPA routing.",
      "Stack: React, TypeScript, Supabase (PostgreSQL), Tailwind CSS.",
    ],
  },
  {
    company: "SoftMex",
    role: "Co-founder & Software Developer",
    dates: "May – Oct 2026",
    points: [
      "Co-founded the startup and was part of the team building Astra, a CRM/ERP for businesses.",
      "Currently leading the Astra pilot implementation (scheduling and WhatsApp automations) for a fitness center in Aguascalientes.",
    ],
  },
  {
    company: "Grupo Zeta / ZPremia (Global University project)",
    role: "Frontend Developer, ORPEL Team",
    dates: "2026",
    points: [
      "Angular 17 screens for a warehouse management system, containerized with Docker on an on-premise architecture.",
    ],
  },
];

export const projects: Project[] = [
  { name: "Padelize", categories: ["Software", "Web"], desc: "SaaS for padel club management with customers, bookings and payments, running in production.", tech: ["React", "TypeScript", "Supabase", "EasyPanel"], demo: "https://padelize.app/" },
  { name: "Astra", categories: ["Software"], desc: "CRM/ERP with scheduling and WhatsApp automations.", tech: ["CRM/ERP", "WhatsApp"] },
  { name: "WMS — Warehouse Management System", year: "2026", categories: ["Web"], desc: "Receiving, inventory and transfers for Grupo Zeta / ZPremia.", tech: ["Angular 17", "Java 21", "Spring Boot 3", "SQL Server 2022", "Docker"] },
  { name: "Security Audit — BadStore", year: "2026", categories: ["Seguridad"], desc: "Academic pentest: sensitive data exposure and SQL injection that allowed extracting the user database and cracking the admin password.", tech: ["Kali Linux", "SQLmap", "OWASP Top 10"] },
  { name: "CNN Image Classifier", year: "2026", categories: ["IA"], desc: "Convolutional neural network with 92.6% accuracy on Animals-10, balanced through undersampling.", tech: ["Python", "TensorFlow", "Keras"] },
  { name: "Linguistic Metrics Registry", year: "2026", categories: ["Web"], desc: "Academic tool with anonymized data (UUID) compliant with Mexico's LFPDPPP and role-based access control.", tech: ["React 18", "Node.js", "Express", "k3s", "Ansible"] },
  { name: "Caesar / Atbash Cipher", categories: ["Seguridad", "Web"], desc: "Encryption and decryption web app published on GitHub Pages.", tech: ["HTML", "CSS", "JavaScript"] },
  { name: "Hidrotalent — 2nd place", year: "Nov 2024", categories: ["Software"], desc: "3D scanning software to manufacture low-cost prosthetics; second place in Aguascalientes' innovation contest.", tech: ["3D scanning", "Innovation"] },
];

export const education = [
  { title: "B.Eng. in Computer Security and Software Development", place: "Global University", dates: "Jan 2023 – Dec 2026" },
  { title: "Award: 2nd place, Hidrotalent 2024", place: "Innovation contest, Aguascalientes", dates: "Nov 2024" },
];

export const certifications = [
  { name: "Introduction to Cybersecurity", org: "Cisco", date: "Feb 2026" },
  { name: "Endpoint Security", org: "Cisco", date: "Mar 2026" },
  { name: "Network Support and Security", org: "Cisco", date: "Dec 2025" },
  { name: "Network Addressing and Basic Troubleshooting", org: "Cisco", date: "Dec 2025" },
  { name: "Networking Devices and Initial Configuration", org: "Cisco", date: "Dec 2025" },
  { name: "Networking Basics", org: "Cisco", date: "Nov 2025" },
  { name: "English C2", org: "Oxford", date: "Dec 2025" },
];

export const ui = {
  nav: { "sobre-mi": "About", servicios: "Services", experiencia: "Experience", proyectos: "Projects", formacion: "Education", contacto: "Contact" },
  skip: "Skip to content",
  themeToLight: "Switch to light mode",
  themeToDark: "Switch to dark mode",
  langSwitch: "Cambiar a español",
  menu: "Menu",
  contact: "Contact",
  whatsappCta: "Message me on WhatsApp",
  saveContact: "Save contact",
  heroLead: "I build software",
  heroIntro: ["I'm", ", a cybersecurity and software development engineer. I build web applications end to end, with security as part of the design."],
  seeProjects: "See projects",
  remote: "Remote",
  scrollDown: "Scroll to About",
  photoAlt: "Photo of",
  terminal: [
    { cmd: "whoami", out: "angel_trejo_osornio" },
    { cmd: "cat role.txt", out: "dev + sec · full stack" },
    { cmd: "status", out: "● available for projects" },
  ],
  aboutEyebrow: "01 / about",
  services: { eyebrow: "02 / services", title: ["What I can ", "build with you."], aside: "Pick a service and WhatsApp opens with your message ready.", quote: "Get a quote", message: "Hi Angel, I'm interested in: " },
  workflow: { eyebrow: "03 / how I work", title: ["Security by design, ", "not as an afterthought."], desc: "How I take every project from idea to production. Tap a step to see it.", tabs: "Work steps", path: "~/your-project", step: "step" },
  stack: { eyebrow: "04 / stack", title: ["The tools I ", "build with."], aside: "From frontend to infrastructure, with security at every layer." },
  experience: { eyebrow: "05 / experience", title: ["Where I've ", "built."], desc: "Startups, SaaS platforms in production and projects with real companies.", cv: "Download CV" },
  projects: { eyebrow: "06 / projects", title: ["Projects that ", "already work."], aside: "Software in production, security audits and artificial intelligence.", filter: "Filter projects", all: "All", demo: "View demo", code: "View code" },
  categories: { Web: "Web", Software: "Software", Seguridad: "Security", IA: "AI" } as Record<Category, string>,
  education: { eyebrow: "07 / education", title: ["Education & ", "certifications."], credly: "View credentials on Credly" },
  contactSection: {
    eyebrow: "08 / contact",
    title: ["Let's build something ", "secure", " together."],
    desc: "One first conversation is enough to understand your project and propose the most direct path.",
    emailTitle: "Prefer email?",
    emailDesc: "Write to me directly or leave your message in the form.",
    sendEmail: "Send email",
    copyEmail: "Copy email",
    copied: "Email copied ✓",
    fields: { name: "Name", email: "Email", message: "How can I help?" },
    errors: { name: "Please enter your name", email: "Invalid email", message: "Your message is too short" },
    submit: "Send message",
    subject: "Project — ",
  },
  footer: { contact: "Contact", base: "Based in", nav: "Navigation", status: "Status", remote: "Remote projects worldwide", top: "Back to top" },
};
