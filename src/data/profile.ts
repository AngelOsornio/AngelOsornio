// Contenido en ESPAÑOL. Edita este archivo para cambiar textos sin tocar el diseño.
// La versión en inglés está en profile.en.ts (mismos campos, traducidos).
//
// La página principal (/) habla con clientes en lenguaje sencillo.
// Lo técnico (stack, experiencia, todos los proyectos, certificaciones) vive en /perfil-tecnico.
import cv from "@/assets/cv.pdf.asset.json";
import photo from "@/assets/angel-osornio.webp";

// URL pública de la página (para la vista previa al compartir y Google).
// Cámbiala cuando tengas tu propio dominio.
export const SITE_URL = "https://angelosornio.lovable.app";

export const profile = {
  name: "Angel Nahum Trejo Osornio",
  title: "Ingeniero en Ciberseguridad y Desarrollo de Software",
  tagline: "Páginas web rápidas, seguras y hechas para tu negocio.",
  location: "Aguascalientes, MX · Disponible para proyectos",
  phone: "771 122 1326",
  email: "angelnahumtrejoosornio@gmail.com",
  whatsapp: "https://wa.me/527711221326?text=" + encodeURIComponent("Hola Angel, vi tu página y me interesa…"),
  github: "https://github.com/AngelOsornio",
  credly: "https://www.credly.com/users/trejo-osornio-angel-nahum",
  linkedin: "https://www.linkedin.com/in/angel-trejo-osornio-485685334",
  photo,
  cv: cv.url,
  vcard: "/angel-osornio.vcf",
  languages: "Español (nativo) · Inglés C2 (Oxford)",
  // Versión corta y sencilla (página principal).
  about:
    "Soy ingeniero en ciberseguridad y desarrollo de software. Ayudo a negocios y profesionistas a tener presencia en internet con páginas web que se ven bien, cargan rápido y están protegidas. Me encargo de todo, del diseño a la publicación, y te explico cada paso sin tecnicismos.",
  // Versión técnica (perfil técnico).
  aboutTech:
    "Estudiante de Ingeniería en Seguridad Informática y Desarrollo de Software en Global University (egreso en diciembre de 2026). Desarrollo aplicaciones web de punta a punta, desde la base de datos y el backend hasta el despliegue en producción, con la seguridad como parte del diseño y no como un agregado. He cofundado una startup de software, desarrollado plataformas SaaS en producción y realizado auditorías de seguridad siguiendo la metodología de un pentest profesional.",
  stats: ["8+ proyectos", "7 certificaciones", "2° lugar Hidrotalent 2024"],
};

// Palabras que se escriben y borran en el titular del inicio.
export const heroWords = ["para tu negocio", "que atraen clientes", "rápidas y seguras"];

// Servicios (página principal). Al tocar uno se abre WhatsApp con el mensaje listo.
export type ServiceIcon = "globe" | "code" | "message" | "shield";
export const services: { icon: ServiceIcon; title: string; desc: string }[] = [
  { icon: "globe", title: "Páginas web", desc: "Una página profesional que muestra quién eres, qué ofreces y cómo contactarte. Se ve perfecta en celular." },
  { icon: "code", title: "Sistemas a la medida", desc: "Reservas, citas, inventario o control de clientes: herramientas hechas para la forma en que trabaja tu negocio." },
  { icon: "message", title: "Automatización con WhatsApp", desc: "Respuestas, recordatorios y seguimientos automáticos para que no se te escape ningún cliente." },
  { icon: "shield", title: "Seguridad y mantenimiento", desc: "Tu página siempre actualizada, respaldada y protegida contra ataques." },
];

// Pasos de la sección interactiva "Cómo trabajo". "output" = lo que recibe el cliente.
export const workflow: { step: string; title: string; desc: string; output: string[] }[] = [
  {
    step: "Platicamos",
    title: "Me cuentas tu idea",
    desc: "Hablamos de tu negocio, qué quieres lograr y a quién quieres llegar. Sin tecnicismos.",
    output: ["propuesta clara", "precio y tiempos definidos"],
  },
  {
    step: "Diseño",
    title: "Ves tu página antes de construirla",
    desc: "Te muestro cómo se verá en computadora y en celular para ajustarla a tu gusto.",
    output: ["diseño de tu página", "ajustes antes de construir"],
  },
  {
    step: "Construcción",
    title: "La hago realidad",
    desc: "Programo tu página para que cargue rápido, se vea bien en cualquier celular y esté protegida.",
    output: ["versión de prueba para revisar", "botón de WhatsApp y redes sociales", "seguridad incluida"],
  },
  {
    step: "Lanzamiento",
    title: "Tu página en internet",
    desc: "La publico con tu propio dominio y te acompaño después del lanzamiento.",
    output: ["dominio propio (.com o .mx)", "candado de seguridad (https)", "apoyo después de publicar"],
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Lenguajes", items: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "SQL"] },
  { group: "Frontend", items: ["React", "Angular", "Vite", "Tailwind CSS", "shadcn/ui", "HTML", "CSS"] },
  { group: "Backend y datos", items: ["Node.js", "Express", "Spring Boot", "Supabase", "PostgreSQL", "SQL Server"] },
  { group: "Ciberseguridad", items: ["Pentesting web (SQLi, XSS, IDOR)", "OWASP Top 10", "Kali Linux", "SQLmap", "Redes Cisco"] },
  { group: "DevOps e infraestructura", items: ["Docker", "k3s", "Ansible", "VPS", "EasyPanel", "Dominios y DNS", "Git/GitHub"] },
  { group: "Automatización e IA", items: ["n8n", "Automatizaciones de WhatsApp", "TensorFlow", "Keras", "Google Colab"] },
  { group: "Blockchain", items: ["Solidity", "Hardhat", "Remix IDE", "Hyperledger Fabric"] },
  { group: "Metodologías", items: ["Agile", "Scrum", "Kanban", "Design Thinking"] },
];

export const experience = [
  {
    company: "Padelize",
    role: "Desarrollador Full Stack",
    dates: "May – Oct 2026",
    points: [
      "Desarrollo y mantenimiento de una plataforma SaaS para la gestión de clubes de pádel: clientes, reservas y cobros.",
      "Migración de la plataforma a infraestructura propia: despliegue en VPS con EasyPanel, configuración de dominio y enrutamiento SPA.",
      "Stack: React, TypeScript, Supabase (PostgreSQL), Tailwind CSS.",
    ],
  },
  {
    company: "SoftMex",
    role: "Cofundador y Desarrollador de Software",
    dates: "May – Oct 2026",
    points: [
      "Cofundador de la startup y parte del equipo que desarrolla Astra, un CRM/ERP para negocios.",
      "Actualmente a cargo de la implementación piloto de Astra (agenda y automatizaciones de WhatsApp) para un centro de ejercicio en Aguascalientes.",
    ],
  },
  {
    company: "Grupo Zeta / ZPremia (proyecto con Global University)",
    role: "Desarrollador Frontend, Equipo ORPEL",
    dates: "2026",
    points: [
      "Pantallas en Angular 17 para un sistema de gestión de almacén y contenerización con Docker sobre arquitectura on-premise.",
    ],
  },
];

export type Category = "Web" | "Software" | "Seguridad" | "IA";
export type Project = {
  name: string;
  year?: string;
  categories: Category[];
  desc: string; // descripción técnica (perfil técnico)
  pitch?: string; // descripción sencilla; si existe, el proyecto aparece en la página principal
  tech: string[];
  demo?: string;
  code?: string;
};
export const projects: Project[] = [
  { name: "Padelize", categories: ["Software", "Web"], desc: "SaaS para gestión de clubes de pádel con clientes, reservas y cobros, desplegado en producción.", pitch: "Plataforma para clubes de pádel: sus clientes reservan cancha y pagan desde el celular.", tech: ["React", "TypeScript", "Supabase", "EasyPanel"], demo: "https://padelize.app/" },
  { name: "Astra", categories: ["Software"], desc: "CRM/ERP con agenda y automatizaciones de WhatsApp.", pitch: "Sistema para negocios con agenda de citas y mensajes automáticos por WhatsApp.", tech: ["CRM/ERP", "WhatsApp"] },
  { name: "SGA — Sistema de Gestión de Almacén", year: "2026", categories: ["Web"], desc: "Recepción, inventario y traspasos para Grupo Zeta / ZPremia.", pitch: "Sistema web para que una empresa controle su inventario y los movimientos de su almacén.", tech: ["Angular 17", "Java 21", "Spring Boot 3", "SQL Server 2022", "Docker"] },
  { name: "Auditoría de Seguridad — BadStore", year: "2026", categories: ["Seguridad"], desc: "Pentest académico: exposición de datos sensibles e inyección SQL que permitió extraer la base de usuarios y descifrar la contraseña de administrador.", tech: ["Kali Linux", "SQLmap", "OWASP Top 10"] },
  { name: "Clasificador de Imágenes con CNN", year: "2026", categories: ["IA"], desc: "Red neuronal convolucional con 92.6% de accuracy sobre Animals-10, con balanceo por undersampling.", tech: ["Python", "TensorFlow", "Keras"] },
  { name: "Registro de Métricas Lingüísticas", year: "2026", categories: ["Web"], desc: "Herramienta académica con datos anonimizados (UUID) conforme a la LFPDPPP y control de acceso por roles.", tech: ["React 18", "Node.js", "Express", "k3s", "Ansible"] },
  { name: "Cifrado César / Atbash", categories: ["Seguridad", "Web"], desc: "App web de cifrado y descifrado publicada en GitHub Pages.", tech: ["HTML", "CSS", "JavaScript"] },
  { name: "Hidrotalent — 2° lugar", year: "Nov 2024", categories: ["Software"], desc: "Software de escaneo 3D para fabricar prótesis de bajo costo; segundo lugar en el concurso de innovación de Aguascalientes.", tech: ["Escaneo 3D", "Innovación"] },
];

export const education = [
  { title: "Ingeniería en Seguridad Informática y Desarrollo de Software", place: "Global University", dates: "Ene 2023 – Dic 2026" },
  { title: "Reconocimiento: 2° lugar, Hidrotalent 2024", place: "Concurso de innovación, Aguascalientes", dates: "Nov 2024" },
];

export const certifications = [
  { name: "Introducción a la Ciberseguridad", org: "Cisco", date: "Feb 2026" },
  { name: "Seguridad de Terminales", org: "Cisco", date: "Mar 2026" },
  { name: "Soporte y Seguridad de Red", org: "Cisco", date: "Dic 2025" },
  { name: "Direccionamiento de Red y Solución de Problemas Básicos", org: "Cisco", date: "Dic 2025" },
  { name: "Dispositivos de Red y Configuración Inicial", org: "Cisco", date: "Dic 2025" },
  { name: "Networking Basics", org: "Cisco", date: "Nov 2025" },
  { name: "Inglés C2", org: "Oxford", date: "Dic 2025" },
];

// Textos de la interfaz. En los títulos, la parte del medio va resaltada en verde.
export const ui = {
  nav: {
    servicios: "Servicios", proceso: "Cómo trabajo", proyectos: "Proyectos", "sobre-mi": "Sobre mí", contacto: "Contacto",
    tech: "Perfil técnico", home: "Inicio", stack: "Stack", experiencia: "Experiencia", formacion: "Formación",
  },
  skip: "Saltar al contenido",
  themeToLight: "Cambiar a modo claro",
  themeToDark: "Cambiar a modo oscuro",
  langSwitch: "Switch to English",
  menu: "Menú",
  contact: "Contactar",
  whatsappCta: "Escríbeme por WhatsApp",
  saveContact: "Guardar contacto",
  heroLead: "Creo páginas web",
  heroIntro: ["Soy", ". Diseño y desarrollo páginas web rápidas, seguras y fáciles de usar. Tú te enfocas en tu negocio; yo me encargo de la tecnología."],
  seeProjects: "Ver proyectos",
  remote: "Remoto",
  photoAlt: "Fotografía de",
  terminal: [
    { cmd: "whoami", out: "angel_trejo_osornio" },
    { cmd: "cat rol.txt", out: "páginas web · dev + sec" },
    { cmd: "status", out: "● disponible para proyectos" },
  ],
  services: { eyebrow: "01 / servicios", title: ["En qué te ", "puedo ayudar."], aside: "Toca un servicio y se abre WhatsApp con tu mensaje listo.", quote: "Cotizar", message: "Hola Angel, me interesa: " },
  workflow: { eyebrow: "02 / cómo trabajo", title: ["De tu idea a tu página, ", "paso a paso."], desc: "Así trabajamos juntos. Toca un paso para verlo.", tabs: "Pasos de trabajo", get: "Lo que recibes", step: "paso" },
  projects: { eyebrow: "03 / proyectos", title: ["Proyectos que ", "ya funcionan."], more: "Ver todos en mi perfil técnico", demo: "Ver en vivo" },
  about: { eyebrow: "04 / sobre mí", techTitle: "¿Eres reclutador o desarrollador?", techDesc: "Conoce mis herramientas, experiencia, proyectos y certificaciones.", techCta: "Ver perfil técnico", cv: "Descargar CV" },
  contactSection: {
    eyebrow: "05 / contacto",
    title: ["¿Listo para tener ", "tu página", "?"],
    desc: "Escríbeme y platicamos sin compromiso sobre lo que necesitas.",
    copyEmail: "Copiar correo",
    copied: "Correo copiado ✓",
  },
  tech: {
    eyebrow: "> perfil técnico",
    lead: "Para reclutadores y equipos de desarrollo: herramientas, experiencia, proyectos y certificaciones.",
    back: "Volver al inicio",
    stack: { eyebrow: "01 / stack", title: ["Herramientas con las que ", "construyo."] },
    experience: { eyebrow: "02 / experiencia", title: ["Dónde he ", "trabajado."] },
    projects: { eyebrow: "03 / proyectos", title: ["Todos mis ", "proyectos."], filter: "Filtrar proyectos", all: "Todos", demo: "Ver demo", code: "Ver código" },
    education: { eyebrow: "04 / formación", title: ["Formación y ", "certificaciones."], credly: "Ver credenciales en Credly" },
    cta: { title: ["¿Hablamos de una ", "vacante", "?"], desc: "Estoy abierto a oportunidades remotas y proyectos freelance." },
  },
  categories: { Web: "Web", Software: "Software", Seguridad: "Seguridad", IA: "IA" } as Record<Category, string>,
  footer: { contact: "Contacto", base: "Sede", nav: "Navegación", status: "Estado", remote: "Proyectos remotos en todo México", top: "Volver arriba" },
};
