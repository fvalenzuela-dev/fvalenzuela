"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

interface AppCardData {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
  status: "active" | "coming-soon";
}

const apps: AppCardData[] = [
  {
    title: "Generador de Ideas",
    description: "Genera y organiza ideas para tus proyectos con almacenamiento local.",
    icon: "solar:lightbulb-bolt-bold-duotone",
    href: "/generador-ideas",
    color: "text-warning",
    bgColor: "bg-lightwarning/30",
    status: "active",
  },
  {
    title: "Contacto",
    description: "Formulario de contacto para recibir mensajes y propuestas.",
    icon: "solar:letter-bold-duotone",
    href: "/contacto",
    color: "text-primary",
    bgColor: "bg-lightprimary/30",
    status: "active",
  },
  {
    title: "Notas",
    description: "Bloc de notas personal con organizacion por categorias.",
    icon: "solar:notes-bold-duotone",
    href: "#",
    color: "text-success",
    bgColor: "bg-lightsuccess/30",
    status: "coming-soon",
  },
  {
    title: "Tareas",
    description: "Gestor de tareas y proyectos con seguimiento de progreso.",
    icon: "solar:list-check-bold-duotone",
    href: "#",
    color: "text-info",
    bgColor: "bg-lightinfo/30",
    status: "coming-soon",
  },
];

const AppsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {apps.map((app) => (
        <Link
          key={app.title}
          href={app.href}
          className={`group bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder p-6 transition-all duration-200 ${
            app.status === "active"
              ? "hover:border-primary/30 hover:shadow-md cursor-pointer"
              : "opacity-60 cursor-default pointer-events-none"
          }`}
        >
          <div className={`w-12 h-12 ${app.bgColor} rounded-lg flex items-center justify-center mb-4`}>
            <Icon icon={app.icon} className={app.color} width={24} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-dark dark:text-white group-hover:text-primary transition-colors">
              {app.title}
            </h3>
            {app.status === "coming-soon" && (
              <span className="text-xs bg-lightwarning/30 text-warning px-2 py-0.5 rounded-full font-medium">
                Pronto
              </span>
            )}
          </div>
          <p className="text-sm text-muted dark:text-darklink">
            {app.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default AppsGrid;
