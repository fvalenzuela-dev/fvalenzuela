import React from "react";

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-6">
        Contacto
      </h1>
      <div className="bg-white dark:bg-dark rounded-md shadow-md p-8 border border-border dark:border-darkborder">
        <p className="text-link dark:text-darklink mb-6">
          ¿Tienes alguna pregunta? Contáctanos y te responderemos lo antes posible.
        </p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
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
              className="w-full px-4 py-2 border border-border dark:border-darkborder rounded-md bg-transparent dark:bg-transparent text-dark dark:text-white focus:border-primary dark:focus:border-primary focus:ring-0"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primaryemphasis transition-colors font-medium"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
