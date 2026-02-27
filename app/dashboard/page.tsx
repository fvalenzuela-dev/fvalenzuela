"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

const experience: Readonly<{ company: string; role: string; period: string; description: string }[]> = [
  {
    company: "VidaCamara",
    role: "Technical Lead",
    period: "2023 – Actual",
    description: "Encargado de liderar el equipo responsable de mantener sistemas legados y asegurar la continuidad operativa de plataformas productivas, tales como administración de pólizas, Enrolamiento Digital, facturación y cobranza, entre otras. Actúa además como facilitador en la integración de nuevas tecnologías con sistemas heredados, permitiendo su convivencia en paralelo de manera eficiente."
  },
  {
    company: "VidaCamara",
    role: "Ingeniero Software",
    period: "2021 – 2023",
    description: "Encargado de implementar y mantener mejoras en los sistemas productivos relacionados con seguros de vida y salud, abarcando la creación de pólizas, gestión de asegurados, administración de siniestros, liquidaciones y todos los procesos asociados al flujo completo del negocio."
  },
  {
    company: "Ecert Chile (Externo Kibernum)",
    role: "Analista Desarrollador",
    period: "2020 - 2021",
    description: "Responsable del desarrollo de portal Group, plataforma que permite firmar digitalmente distintos documentos con un control de flujo (firma secuencial del documento). Encargado de liderar el desarrollo del back-end del portal. Plantear e implementar mejoras del portal."
  },
  {
    company: "Partnertech Solutions (AMF Logistic)",
    role: "Desarrollador Senior",
    period: "2015 - 2020",
    description: "Responsable de liderar proyectos de TI, capacitándome continuamente en nuevas metodologías de desarrollo para luego traspasarla al equipo de desarrollo.\n\n• Encargado de liderar desarrollo y mantención de software.\n• Lidera la implementación de proyectos nuevos y mantención de estos.\n• Lidera proyecto de Facturación Electrónica desde su inicio hasta que fue implementado en el cliente.\n• Lidera proyecto de pago a proveedores, sistema que se encarga de recolectar la aprobación de los involucrados (primera firma, segunda firma, contralor, gerente general y contabilidad).\n• Lidera proyecto encargado de recepción de facturas (SGR) el cual se encarga de asociar las facturas con las órdenes de compra y DRM, para luego contabilizarlos en el sistema Ultra Gestión.\n• Lidera proyecto de encuestas dinámicas para las defunciones por neumonía solicitado por el Ministerio de Salud."
  },
  {
    company: "CAS Chile SA",
    role: "Analista de Sistema",
    period: "2010 - 2015",
    description: "Responsable dar soporte y mejoras continuas a los sistemas municipales, aplicar cambio de tecnologías, destacando la capacidad de resolución de problemas y de como aplicarlos sin que afecte a otros componentes del sistema.\n\n• Encargado de corregir y desarrollar nuevas solicitudes de los clientes.\n• Encargado de planificar y desarrollar mejoras de procesos y rendimientos de los sistemas.\n• Encargado de migrar el sistema Derechos de Aseo de VB6 a VB.Net.\n• Encargado de migrar el sistema Patentes Municipales de VB6 a VB.Net.\n• Encargado de gestionar las actualizaciones hacia los clientes."
  },
  {
    company: "Actionline SA",
    role: "Coordinador de Explotación de Sistema",
    period: "2008 - 2010",
    description: "Responsable de liderar el equipo de sistema, planificar y asignar las tareas del área desarrollar script y cargar bases, se destaca por compromiso por la empresa, capacitándose en nuevas tecnologías asociadas a Callcenter aplicarlas en la empresa y capacitando al personal.\n\n• Encargado de liderar desarrollo y mantención de software.\n• Encargado de la planificación y asignación de tareas.\n• Encargado de aplicar mejoras continuas en los procesos internos del área.\n• Encargado de la planificación de vacaciones del personal para que no afecte la operación del área.\n• Encargado de las nuevas tecnologías y como aplicarlas en la empresa."
  }
];

const education: Readonly<{ degree: string; institution: string; period: string }[]> = [
  {
    degree: "Ingeniería en Ejecución en Informática",
    institution: "Instituto Profesional Duoc UC",
    period: "2014 - 2019"
  },
  {
    degree: "Programación en computación",
    institution: "Centro Educacional Santa Rosa",
    period: "1998 - 2001"
  }
];

type SkillLevel = 1 | 2 | 3 | 4 | 5;

const languagesAndFrameworks: Readonly<{ name: string; level: SkillLevel }[]> = [
  { name: "C#", level: 5 },
  { name: "VB.Net", level: 5 },
  { name: "VB6", level: 5 },
  { name: "Java Spring Boot", level: 4 },
  { name: "Java Quarkus", level: 4 },
  { name: "ASP.NET", level: 5 },
  { name: "Rust", level: 3 },
  { name: "Go", level: 3 },
  { name: "Python Django", level: 4 },
  { name: "Python FastAPI", level: 4 },
  { name: "JavaScript", level: 4 },
  { name: "HTML/CSS", level: 4 },
  { name: "React", level: 4 },
  { name: "Angular", level: 3 },
  { name: ".NET Framework", level: 5 },
  { name: ".NET Core", level: 4 },
  { name: "PHP", level: 4 },
  { name: "CakePHP", level: 4 },
  { name: "Joomla", level: 4 }
];

const architectureAndPatterns: Readonly<{ name: string; level: SkillLevel }[]> = [
  { name: "MCP", level: 5 },
  { name: "DDD", level: 3 },
  { name: "EDA", level: 4 },
  { name: "Principios SOLID", level: 5 },
  { name: "Microservicios", level: 5 },
  { name: "REST API", level: 5 },
  { name: "N8N", level: 4 }
];

const toolsAndCloud: Readonly<{ name: string; level: SkillLevel }[]> = [
  { name: "Git", level: 4 },
  { name: "SQL Server", level: 4 },
  { name: "MySQL", level: 4 },
  { name: "PostgreSQL", level: 4 },
  { name: "Oracle", level: 3 },
  { name: "Visual Studio", level: 5 },
  { name: "Visual Code", level: 5 },
  { name: "Eclipse", level: 3 },
  { name: "Office", level: 5 },
  { name: "Kafka", level: 4 },
  { name: "GCP", level: 4 },
  { name: "Azure", level: 4 }
];

const skills: Readonly<string[]> = [
  "Trabajo en Equipo",
  "Resolución de Problemas",
  "Planificación y Organización",
  "Entendimiento de código fuente",
  "Arquitectura de Software",
  "Ingeniería de Software",
  "Gestión de Proyectos",
  "Facturación Electrónica",
  "Liderazgo",
  "Prompt Engineering",
  "IA Skills",
  "Inglés Intermedio"
];

const certifications: Readonly<{ name: string; platform: string; year: string; image?: string; url?: string }[]> = [
  {
    name: "Curso completo del lenguaje Rust",
    platform: "Udemy",
    year: "2026",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.udemy.com/certificate/UC-0af66768-d0bc-4b13-96fa-6e84c6d3e5a2/"
  },
  {
    name: "Arquitectura Software Moderna: DDD, Eventos, Microservicios",
    platform: "Udemy",
    year: "2025",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.udemy.com/certificate/UC-9f0d1fe1-13ae-4af6-ab6c-800b15435afc/"
  },
  {
    name: "Scrum Master Esencial: Fundamentos Sólidos y Efectivos",
    platform: "Udemy",
    year: "2021",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.udemy.com/certificate/UC-b87679b3-71c8-4cac-855d-4464f4c1abc6/"
  },
  {
    name: "Monitor and Log with Google Cloud Operations Suite Skill Badge",
    platform: "Google Cloud",
    year: "2025",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.credly.com/badges/fc1046ab-a565-4d8e-8442-74a6ea5fb953"
  },
  {
    name: "Develop Serverless Apps with Firebase Skill Badge",
    platform: "Google Cloud",
    year: "2025",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.credly.com/badges/508a147b-1078-41f6-901d-447391b32257"
  },
  {
    name: "Develop Serverless Applications on Cloud Run Skill Badge",
    platform: "Google Cloud",
    year: "2025",
    image: "/certificados-img/certificado-udemy.jpg",
    url: "https://www.credly.com/badges/5c33bd68-5302-4062-8594-6dd264a48c10"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-lightgray dark:bg-black">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src="/foto-perfil.jpg"
                alt="Fernando Valenzuela"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-dark dark:text-white mb-2">
                Fernando Valenzuela Ibarra
              </h1>
              <p className="text-xl text-primary dark:text-primary font-medium mb-4">
                Ingeniero Desarrollador Senior
              </p>
              <p className="text-muted dark:text-darklink mb-4">
                Ingeniero en Ejecución en Informática con más de 20 años impulsando la transformación digital a través de software de alto impacto.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/in/fernando-valenzuela-08002a71/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Icon icon="skill-icons:linkedin" width={20} />
                </a>
                <a 
                  href="https://github.com/kuroroluzbell"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-dark dark:text-white hover:bg-dark hover:text-white transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Icon icon="skill-icons:github-dark" width={20} />
                </a>
                <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-[#1877F2] cursor-not-allowed opacity-60" aria-label="Facebook">
                  <Icon icon="logos:facebook" width={20} />
                </div>
                <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-[#FF0000] cursor-not-allowed opacity-60" aria-label="YouTube">
                  <Icon icon="logos:youtube-icon" width={20} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:brain" className="text-primary" width={20} />
              </div>
              <div>
                <h3 className="text-dark dark:text-white font-medium mb-1">Capacidad Analítica</h3>
                <p className="text-sm text-muted dark:text-darklink">Experto en resolución de problemas y entendimiento de códigos fuente complejos bajo diversos lenguajes de programación.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:handshake" className="text-primary" width={20} />
              </div>
              <div>
                <h3 className="text-dark dark:text-white font-medium mb-1">Vínculo Técnico-Negocio</h3>
                <p className="text-sm text-muted dark:text-darklink">Especialista en traducir necesidades empresariales en sistemas eficientes, con amplia experiencia en Seguros (Salud/Vida), Sistemas Municipales y Facturación Electrónica.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:trending-up" className="text-primary" width={20} />
              </div>
              <div>
                <h3 className="text-dark dark:text-white font-medium mb-1">Evolución Constante</h3>
                <p className="text-sm text-muted dark:text-darklink">Proactivo y en capacitación permanente sobre tecnologías emergentes para ofrecer soluciones modernas y seguras.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:user" className="text-primary" width={20} />
              </div>
              <div>
                <h3 className="text-dark dark:text-white font-medium mb-1">Perfil</h3>
                <p className="text-sm text-muted dark:text-darklink">Profesional orientado a resultados, con la madurez necesaria para gestionar proyectos de gran escala y la agilidad para aprender nuevos modelos de negocio rápidamente.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">Sobre Mí</h2>
          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <div className="space-y-4 text-muted dark:text-darklink leading-relaxed">
              <p>
                Llevo más de 20 años descifrando el lenguaje de las máquinas como Ingeniero de Software. En estas dos décadas he visto tecnologías nacer y morir, pero mi curiosidad sigue siendo la misma que el primer día. No solo construyo sistemas; me apasiona entender cómo la tecnología puede simplificarnos la vida, manteniéndome siempre en la primera línea de estudio de lo que está por venir.
              </p>
              <p className="font-medium text-dark dark:text-white">Pero la vida no solo ocurre frente a un monitor. Para mantener la mente aguda y el espíritu equilibrado, cultivo mundos que me apasionan:</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-lightgray dark:bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:chart-bold" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="text-dark dark:text-white font-medium mb-1">Estrategia y Riesgo</h3>
                    <p className="text-sm">Desde hace 4 años me sumerjo a diario en el mercado de valores. Operar como inversor me ha enseñado una lección vital para la ingeniería: la importancia de la paciencia, el análisis de datos fríos y saber cuándo arriesgar para obtener resultados extraordinarios.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-lightgray dark:bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:football-bold" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="text-dark dark:text-white font-medium mb-1">Cancha y Equipo</h3>
                    <p className="text-sm">No importa lo apretada que esté la semana, si hay un partido de fútbol, ahí estaré. El fútbol es mi cable a tierra; me encanta la adrenalina del juego, el trabajo en equipo y esa disciplina que te obliga a estar presente en el aquí y el ahora.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-lightgray dark:bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:book-bold" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="text-dark dark:text-white font-medium mb-1">Aprendizaje y Narrativas</h3>
                    <p className="text-sm">Soy un eterno estudiante. Mi tiempo libre suele dividirse entre especializaciones en nuevas tecnologías, buscando siempre el siguiente nivel técnico, y la inmersión en libros de ciencia ficción o historias que logren cautivar mi interés. Creo que tanto un buen curso como un buen libro tienen el poder de expandir nuestra forma de resolver problemas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-lightgray dark:bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:tree" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="text-dark dark:text-white font-medium mb-1">Mi Refugio en el Sur</h3>
                    <p className="text-sm">Mi conexión con la naturaleza tiene hoy un proyecto concreto. Acabo de comprar una parcela en el sur de Chile que estoy habilitando paso a paso para cuando llegue el momento de &quot;colgar los botines&quot;. Es mi refugio para esas pocas semanas al año donde el ritmo profesional me permite hacer una pausa, caminar entre lagos y proyectar ese futuro donde la pesca y la calma serán la prioridad.</p>
                  </div>
                </div>
              </div>
              <p className="pt-2">
                Cuando las pantallas se apagan, mi prioridad es recargar energías junto a los míos. Me gusta disfrutar de una buena serie en familia, ver algún anime o, por qué no, prender el fuego para un asadito con los amigos y la familia. Al final del día, valoro tanto una arquitectura de software limpia como el regalo de disfrutar una puesta de sol frente a los lagos o el mar.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
            Experiencia Profesional
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <div>
                    <h3 className="text-dark dark:text-white font-semibold text-base">
                      {exp.role}
                    </h3>
                    <p className="text-primary dark:text-primary font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-muted dark:text-darklink whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <div className="text-sm text-muted dark:text-darklink">
                  {exp.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                      {paragraph.split('\n').map((line, lineIdx) => (
                        <span key={lineIdx} className={line.startsWith('•') ? "block ml-4" : (lineIdx > 0 && idx === 0 ? "block" : "")}>
                          {line}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Educación
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="text-dark dark:text-white font-medium">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted dark:text-darklink">
                    {edu.institution}
                  </p>
                  <span className="text-xs text-primary dark:text-primary">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Habilidades Blandas
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-lightprimary/30 dark:bg-white/5 text-primary dark:text-white text-xs font-medium rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Lenguajes y Frameworks
            </h2>
            <div className="space-y-3">
              {languagesAndFrameworks.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-dark dark:text-white font-medium">{item.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full ${dot <= item.level ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Arquitectura y Patrones
            </h2>
            <div className="space-y-3">
              {architectureAndPatterns.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-dark dark:text-white font-medium">{item.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full ${dot <= item.level ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Herramientas y Cloud
            </h2>
            <div className="space-y-3">
              {toolsAndCloud.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-dark dark:text-white font-medium">{item.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full ${dot <= item.level ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-6">
            Certificaciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <a 
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center relative overflow-hidden p-2">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={200}
                      height={150}
                      className="object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                      <div className="w-16 h-12 bg-white dark:bg-dark rounded shadow-lg flex items-center justify-center transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-300">
                        <Icon icon="solar:certificate-bold" className="text-primary" width={24} />
                      </div>
                    </>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {cert.platform}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-dark dark:text-white font-medium text-sm line-clamp-2 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-muted dark:text-darklink text-xs">
                    {cert.year}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
