"use client";
import { Icon } from "@iconify/react";
import React from "react";

const LeftSidebarPart = () => {
  const trustMetrics = [
    {
      icon: "solar:code-bold-duotone",
      value: "Next.js 16",
      label: "Tecnologia Moderna",
      description: "Construido con React 19, TypeScript y Tailwind CSS",
    },
    {
      icon: "solar:widget-bold-duotone",
      value: "Multi-App",
      label: "Hub de Aplicaciones",
      description: "Multiples herramientas web en un solo dominio",
    },
    {
      icon: "solar:shield-check-bold-duotone",
      value: "Seguro",
      label: "Autenticacion Integrada",
      description: "Gestion de acceso con Clerk para cada aplicacion",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-screen z-10 relative px-12 py-16">
      <div className="max-w-xl mx-auto w-full">
        {/* Main Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-dark dark:text-white leading-tight mb-4">
            Bienvenido a
            <br />
            FValenzuela
          </h2>
          <p className="text-lg text-link dark:text-darklink font-medium">
            Tu espacio personal con herramientas, proyectos y aplicaciones web.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="space-y-8">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="flex gap-5 items-start p-6 rounded-lg border border-border dark:border-darkborder bg-white/40 dark:bg-black/20 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-white/60 dark:hover:bg-black/30"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-lightprimary dark:bg-white/10 flex items-center justify-center">
                  <Icon
                    icon={metric.icon}
                    className="text-primary dark:text-white"
                    width={28}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-dark dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-dark dark:text-white mb-1">
                  {metric.label}
                </div>
                <p className="text-sm text-link dark:text-darklink">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-12 pt-8 border-t border-border dark:border-darkborder">
          <div className="flex items-center gap-3 text-sm text-link dark:text-darklink">
            <Icon
              icon="solar:verified-check-bold"
              className="text-success"
              width={20}
            />
            <span className="font-medium">
              Portafolio Personal • Hub de Apps • Open Source
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarPart;
