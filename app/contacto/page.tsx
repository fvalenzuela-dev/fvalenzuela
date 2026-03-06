"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando mensaje..." });

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus({ type: "success", message: "¡Mensaje enviado correctamente!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      setStatus({ type: "error", message: errorMessage });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-6">
        Contacto
      </h1>
      <div className="bg-white dark:bg-dark rounded-md shadow-md p-8 border border-border dark:border-darkborder">
        <p className="text-link dark:text-darklink mb-6">
          ¿Tienes alguna pregunta? Contáctanos y te responderemos lo antes posible.
        </p>

        {status.type === "success" && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
            {status.message}
          </div>
        )}

        {status.type === "error" && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-md">
            {status.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border dark:border-darkborder rounded-md bg-transparent dark:bg-transparent text-dark dark:text-white focus:border-primary dark:focus:border-primary focus:ring-0"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border dark:border-darkborder rounded-md bg-transparent dark:bg-transparent text-dark dark:text-white focus:border-primary dark:focus:border-primary focus:ring-0"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-dark dark:text-white mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border dark:border-darkborder rounded-md bg-transparent dark:bg-transparent text-dark dark:text-white focus:border-primary dark:focus:border-primary focus:ring-0"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primaryemphasis transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.type === "loading" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}
