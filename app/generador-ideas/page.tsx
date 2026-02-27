"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface Idea {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: "borrador" | "refinada" | "archivada";
  fechaCreacion: string;
  fechaActualizacion: string;
}

const categorias = [
  { value: "negocio", label: "Negocio" },
  { value: "proyecto", label: "Proyecto" },
  { value: "personal", label: "Personal" },
  { value: "creatividad", label: "Creatividad" },
  { value: "otra", label: "Otra" },
];

export default function GeneradorIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ideaEditando, setIdeaEditando] = useState<Idea | null>(null);
  
  // Formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("negocio");
  const [estado, setEstado] = useState<Idea["estado"]>("borrador");

  // Cargar ideas desde localStorage
  useEffect(() => {
    const ideasGuardadas = localStorage.getItem("generador-ideas");
    if (ideasGuardadas) {
      try {
        setIdeas(JSON.parse(ideasGuardadas));
      } catch (e: unknown) {
        console.error("Error al cargar ideas:", e);
      }
    }
  }, []);

  // Guardar ideas en localStorage
  useEffect(() => {
    localStorage.setItem("generador-ideas", JSON.stringify(ideas));
  }, [ideas]);

  const resetFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setCategoria("negocio");
    setEstado("borrador");
    setModoEdicion(false);
    setIdeaEditando(null);
  };

  const handleGuardar = () => {
    if (!titulo.trim() || !descripcion.trim()) {
      alert("Por favor completa el título y la descripción de la idea");
      return;
    }

    const ahora = new Date().toISOString();

    if (modoEdicion && ideaEditando) {
      // Actualizar idea existente
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === ideaEditando.id
            ? {
                ...idea,
                titulo: titulo.trim(),
                descripcion: descripcion.trim(),
                categoria,
                estado,
                fechaActualizacion: ahora,
              }
            : idea
        )
      );
    } else {
      // Crear nueva idea
      const nuevaIdea: Idea = {
        id: crypto.randomUUID(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        categoria,
        estado,
        fechaCreacion: ahora,
        fechaActualizacion: ahora,
      };
      setIdeas((prev) => [nuevaIdea, ...prev]);
    }

    resetFormulario();
  };

  const handleEditar = (idea: Idea) => {
    setModoEdicion(true);
    setIdeaEditando(idea);
    setTitulo(idea.titulo);
    setDescripcion(idea.descripcion);
    setCategoria(idea.categoria);
    setEstado(idea.estado);
  };

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta idea?")) {
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
      if (ideaEditando?.id === id) {
        resetFormulario();
      }
    }
  };

  const handleRefinarIdea = () => {
    if (!descripcion.trim()) {
      alert("Primero escribe una descripción de tu idea para refinarla");
      return;
    }

    // Simulación de refinamiento con preguntas guía
    const preguntas = [
      "¿Qué problema resuelve esta idea?",
      "¿Quién es el público objetivo?",
      "¿Qué recursos necesitas?",
      "¿Cuál es el próximo paso concreto?",
    ];

    const refinamiento = `\n\n--- REFINAMIENTO ---\n` +
      preguntas.map((p, i) => `${i + 1}. ${p}`).join("\n") +
      `\n\nAgrega tus respuestas para profundizar en la idea.`;

    setDescripcion((prev) => {
      if (prev.includes("--- REFINAMIENTO ---")) {
        return prev;
      }
      return prev + refinamiento;
    });
  };

  const getColorEstado = (estado: Idea["estado"]) => {
    switch (estado) {
      case "borrador":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "refinada":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "archivada":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getLabelEstado = (estado: Idea["estado"]) => {
    switch (estado) {
      case "borrador":
        return "Borrador";
      case "refinada":
        return "Refinada";
      case "archivada":
        return "Archivada";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark dark:text-white flex items-center gap-3">
          <Icon icon="solar:lightbulb-bold-duotone" className="text-warning text-4xl" />
          Generador de Ideas
        </h1>
        <p className="text-darklink dark:text-darklink mt-2">
          Captura, refina y desarrolla tus ideas. Nunca dejes escapar un buen pensamiento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-md dark:shadow-dark-md">
          <div className="p-6 border-b border-border dark:border-darkborder">
            <h2 className="text-xl font-semibold text-dark dark:text-white">
              {modoEdicion ? "Editar Idea" : "Nueva Idea"}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Título de la idea
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: App de gestión de tareas para equipos remotos"
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-darkborder bg-white dark:bg-dark text-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Descripción / Notas
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe tu idea en detalle..."
                rows={8}
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-darkborder bg-white dark:bg-dark text-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-darkborder bg-white dark:bg-dark text-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  {categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                  Estado
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as Idea["estado"])}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-darkborder bg-white dark:bg-dark text-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="borrador">Borrador</option>
                  <option value="refinada">Refinada</option>
                  <option value="archivada">Archivada</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleGuardar}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primaryemphasis transition-colors font-medium"
              >
                <Icon icon="solar:diskette-bold-duotone" className="h-5 w-5" />
                {modoEdicion ? "Actualizar Idea" : "Guardar Idea"}
              </button>
              
              <button
                onClick={handleRefinarIdea}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-white rounded-lg hover:bg-secondaryemphasis transition-colors font-medium"
              >
                <Icon icon="solar:pen-new-square-bold-duotone" className="h-5 w-5" />
                Refinar Idea
              </button>

              {modoEdicion && (
                <button
                  onClick={resetFormulario}
                  className="px-4 py-2.5 bg-gray-200 dark:bg-darkgray text-dark dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lista de Ideas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark dark:text-white">
              Mis Ideas ({ideas.length})
            </h2>
          </div>

          {ideas.length === 0 ? (
            <div className="bg-white dark:bg-dark rounded-lg shadow-md dark:shadow-dark-md p-12 text-center">
              <Icon icon="solar:lightbulb-bold-duotone" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-darklink dark:text-darklink">
                No tienes ideas guardadas aún.
                <br />
                ¡Comienza capturando tu primera idea!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className={`bg-white dark:bg-dark rounded-lg shadow-md dark:shadow-dark-md transition-all hover:shadow-lg ${
                    ideaEditando?.id === idea.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-dark dark:text-white truncate">
                            {idea.titulo}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${getColorEstado(
                              idea.estado
                            )}`}
                          >
                            {getLabelEstado(idea.estado)}
                          </span>
                        </div>
                        
                        <p className="text-xs text-darklink dark:text-darklink mb-2 capitalize">
                          {categorias.find((c) => c.value === idea.categoria)?.label} • {" "}
                          {new Date(idea.fechaCreacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        
                        <p className="text-sm text-dark dark:text-white/80 line-clamp-3">
                          {idea.descripcion.substring(0, 150)}
                          {idea.descripcion.length > 150 ? "..." : ""}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => handleEditar(idea)}
                          className="p-2 rounded-lg text-dark dark:text-white hover:bg-lightprimary hover:text-primary transition-colors"
                          title="Editar"
                        >
                          <Icon icon="solar:pen-2-bold-duotone" className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEliminar(idea.id)}
                          className="p-2 rounded-lg text-dark dark:text-white hover:bg-lighterror hover:text-error transition-colors"
                          title="Eliminar"
                        >
                          <Icon icon="solar:trash-bin-trash-bold-duotone" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Consejos */}
      <div className="mt-8 bg-white dark:bg-dark rounded-lg shadow-md dark:shadow-dark-md">
        <div className="p-6">
          <h3 className="font-semibold text-dark dark:text-white mb-3">
            Consejos para refinar tus ideas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-darklink dark:text-darklink">
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <p>Define claramente el problema que resuelves</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <p>Identifica tu público objetivo específico</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <p>Lista los recursos y habilidades necesarias</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                4
              </span>
              <p>Establece el primer paso concreto a dar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
