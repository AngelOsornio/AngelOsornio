// ENGLISH content. Same fields as profile.ts, translated.
// Links, phone, photo and CV are shared with the Spanish version.
import { profile as es, type Category, type Project, type ServiceIcon } from "./profile";

export { SITE_URL } from "./profile";

export const profile = {
  ...es,
  title: "Cybersecurity & Software Development Engineer",
  tagline: "Fast, secure websites built for your business.",
  location: "Aguascalientes, MX · Available for projects",
  whatsapp: "https://wa.me/527711221326?text=" + encodeURIComponent("Hi Angel, I saw your website and I'm interested in…"),
  languages: "Spanish (native) · English C2 (Oxford)",
  about:
    "I'm a cybersecurity and software development engineer. I help businesses and professionals get online with websites that look great, load fast and stay protected. I handle everything from design to launch, and I explain each step without the jargon.",
  aboutTech:
    "Computer Security and Software Development Engineering student at Global University (graduating December 2026). I build web applications end to end, from the database and backend to production deployment, with security as part of the design rather than an afterthought. I co-founded a software startup, built SaaS platforms running in production and carried out security audits following a professional pentest methodology.",
  stats: ["8+ projects", "7 certifications", "2nd place Hidrotalent 2024"],
};

export const heroWords = ["for your business", "that bring in clients", "fast and secure"];

export const services: { icon: ServiceIcon; title: string; desc: string }[] = [
  { icon: "globe", title: "Websites", desc: "A professional website that shows who you are, what you offer and how to reach you. Looks perfect on phones." },
  { icon: "code", title: "Custom systems", desc: "Bookings, appointments, inventory or customer tracking: tools built around the way your business works." },
  { icon: "message", title: "WhatsApp automation", desc: "Automatic replies, reminders and follow-ups so no customer slips through the cracks." },
  { icon: "shield", title: "Security & maintenance", desc: "Your website always up to date, backed up and protected against attacks." },
];

export const workflow: { step: string; title: string; desc: string; output: string[] }[] = [
  {
    step: "Let's talk",
    title: "Tell me your idea",
    desc: "We talk about your business, what you want to achieve and who you want to reach. No jargon.",
    output: ["clear proposal", "price and timeline defined"],
  },
  {
    step: "Design",
    title: "See your site before it's built",
    desc: "I show you how it will look on desktop and mobile so we can adjust it to your liking.",
    output: ["your website design", "adjustments before building"],
  },
  {
    step: "Build",
    title: "I bring it to life",
    desc: "I code your website so it loads fast, looks great on any phone and stays protected.",
    output: ["test version to review", "WhatsApp and social media buttons", "security included"],
  },
  {
    step: "Launch",
    title: "Your website, live",
    desc: "I publish it on your own domain and stay with you after launch.",
    output: ["your own domain (.com or .mx)", "security padlock (https)", "support after launch"],
  },
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
  { name: "Padelize", categories: ["Software", "Web"], desc: "SaaS for padel club management with customers, bookings and payments, running in production.", pitch: "Platform for padel clubs: their customers book courts and pay from their phones.", tech: ["React", "TypeScript", "Supabase", "EasyPanel"], demo: "https://padelize.app/" },
  { name: "Astra", categories: ["Software"], desc: "CRM/ERP with scheduling and WhatsApp automations.", pitch: "Business system with appointment scheduling and automatic WhatsApp messages.", tech: ["CRM/ERP", "WhatsApp"] },
  { name: "WMS — Warehouse Management System", year: "2026", categories: ["Web"], desc: "Receiving, inventory and transfers for Grupo Zeta / ZPremia.", pitch: "Web system that lets a company track its inventory and warehouse movements.", tech: ["Angular 17", "Java 21", "Spring Boot 3", "SQL Server 2022", "Docker"] },
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
  nav: {
    servicios: "Services", proceso: "How I work", proyectos: "Projects", "sobre-mi": "About", contacto: "Contact",
    tech: "Tech profile", home: "Home", stack: "Stack", experiencia: "Experience", formacion: "Education",
  },
  skip: "Skip to content",
  themeToLight: "Switch to light mode",
  themeToDark: "Switch to dark mode",
  langSwitch: "Cambiar a español",
  menu: "Menu",
  contact: "Contact",
  whatsappCta: "Message me on WhatsApp",
  saveContact: "Save contact",
  heroLead: "I build websites",
  heroIntro: ["I'm", ". I design and build websites that are fast, secure and easy to use. You focus on your business; I take care of the tech."],
  seeProjects: "See projects",
  remote: "Remote",
  photoAlt: "Photo of",
  terminal: [
    { cmd: "whoami", out: "angel_trejo_osornio" },
    { cmd: "cat role.txt", out: "websites · dev + sec" },
    { cmd: "status", out: "● available for projects" },
  ],
  services: { eyebrow: "01 / services", title: ["How I can ", "help you."], aside: "Tap a service and WhatsApp opens with your message ready.", quote: "Get a quote", message: "Hi Angel, I'm interested in: " },
  workflow: { eyebrow: "02 / how I work", title: ["From your idea to your website, ", "step by step."], desc: "This is how we work together. Tap a step to see it.", tabs: "Work steps", get: "What you get", step: "step" },
  projects: { eyebrow: "03 / projects", title: ["Projects that ", "already work."], more: "See all in my tech profile", demo: "See it live" },
  about: { eyebrow: "04 / about", techTitle: "Are you a recruiter or developer?", techDesc: "Check out my tools, experience, projects and certifications.", techCta: "View tech profile", cv: "Download CV" },
  contactSection: {
    eyebrow: "05 / contact",
    title: ["Ready to get ", "your website", "?"],
    desc: "Message me and let's talk about what you need, no strings attached.",
    copyEmail: "Copy email",
    copied: "Email copied ✓",
  },
  tech: {
    eyebrow: "> tech profile",
    lead: "For recruiters and development teams: tools, experience, projects and certifications.",
    back: "Back to home",
    stack: { eyebrow: "01 / stack", title: ["The tools I ", "build with."] },
    experience: { eyebrow: "02 / experience", title: ["Where I've ", "worked."] },
    projects: { eyebrow: "03 / projects", title: ["All my ", "projects."], filter: "Filter projects", all: "All", demo: "View demo", code: "View code" },
    education: { eyebrow: "04 / education", title: ["Education & ", "certifications."], credly: "View credentials on Credly" },
    cta: { title: ["Hiring for a ", "role", "?"], desc: "I'm open to remote opportunities and freelance projects." },
  },
  categories: { Web: "Web", Software: "Software", Seguridad: "Security", IA: "AI" } as Record<Category, string>,
  footer: { contact: "Contact", base: "Based in", nav: "Navigation", status: "Status", remote: "Remote projects worldwide", top: "Back to top" },
};
