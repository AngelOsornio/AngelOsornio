// Edita este archivo para agregar o cambiar contenido sin tocar el diseño.
import cv from "@/assets/cv.pdf.asset.json";

export const profile = {
  name: "Angel Nahum Trejo Osornio",
  title: "Ingeniero en Ciberseguridad y Desarrollo de Software",
  tagline: "Construyo software seguro: del código a la red.",
  location: "Aguascalientes, MX · Disponible para proyectos",
  phone: "771 122 1326",
  email: "angelnahumtrejoosornio@gmail.com",
  whatsapp: "https://wa.me/527711221326?text=" + encodeURIComponent("Hola Angel, vi tu página y me interesa…"),
  github: "https://github.com/AngelOsornio",
  credly: "https://www.credly.com/users/trejo-osornio-angel-nahum",
  linkedin: "", // TODO: agrega tu URL de LinkedIn
  cv: cv.url,
  languages: "Español (nativo) · Inglés C2 (Oxford)",
  about:
    "Soy estudiante de Ingeniería en Seguridad Informática y Desarrollo de Software en Global University (egreso en diciembre de 2026). Desarrollo aplicaciones web de punta a punta, desde la base de datos y el backend hasta el despliegue en producción, con la seguridad como parte del diseño y no como un agregado. He cofundado una startup de software, desarrollado plataformas SaaS en producción y realizado auditorías de seguridad siguiendo la metodología de un pentest profesional.",
  stats: ["7 certificaciones", "8+ proyectos", "2° lugar Hidrotalent 2024"],
};

export type ServiceIcon = "code" | "globe" | "database" | "shield" | "wrench" | "cpu";
export const services: { icon: ServiceIcon; title: string; desc: string }[] = [
  { icon: "code", title: "Creación de software", desc: "Sistemas a la medida, CRM/ERP y plataformas SaaS." },
  { icon: "globe", title: "Páginas web", desc: "Sitios y aplicaciones web modernas, rápidas y responsive." },
  { icon: "database", title: "Bases de datos", desc: "Diseño, modelado, migración y optimización." },
  { icon: "shield", title: "Ciberseguridad", desc: "Pentesting web, auditorías y buenas prácticas OWASP." },
  { icon: "wrench", title: "Mantenimiento", desc: "Soporte, actualización y despliegue de sistemas existentes." },
  { icon: "cpu", title: "Hardware", desc: "Diagnóstico, configuración de equipos y redes." },
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
    dates: "Actualidad", // TODO: agrega fecha de inicio
    points: [
      "Desarrollo y mantenimiento de una plataforma SaaS para la gestión de clubes de pádel: clientes, reservas y cobros.",
      "Migración de la plataforma a infraestructura propia: despliegue en VPS con EasyPanel, configuración de dominio y enrutamiento SPA.",
      "Stack: React, TypeScript, Supabase (PostgreSQL), Tailwind CSS.",
    ],
  },
  {
    company: "SoftMex",
    role: "Cofundador y Desarrollador de Software",
    dates: "Actualidad", // TODO: agrega fechas
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
  desc: string;
  tech: string[];
  demo?: string;
  code?: string;
};
export const projects: Project[] = [
  { name: "Padelize", categories: ["Software", "Web"], desc: "SaaS para gestión de clubes de pádel con clientes, reservas y cobros, desplegado en producción.", tech: ["React", "TypeScript", "Supabase", "EasyPanel"] },
  { name: "Astra", categories: ["Software"], desc: "CRM/ERP con agenda y automatizaciones de WhatsApp.", tech: ["CRM/ERP", "WhatsApp"] },
  { name: "SGA — Sistema de Gestión de Almacén", year: "2026", categories: ["Web"], desc: "Recepción, inventario y traspasos para Grupo Zeta / ZPremia.", tech: ["Angular 17", "Java 21", "Spring Boot 3", "SQL Server 2022", "Docker"] },
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
