# fvalenzuela

Versión: 1.0.9

## Descripción

Este proyecto es una aplicación construida con **Next.js 16**, **React 19** y **Tailwind CSS v4**. Sirve como portafolio personal e integra un sistema de autenticación con Clerk, estilos modernos y un servicio de mensajería mediante Resend. La aplicación está configurada para el despliegue automatizado en **GCP (Google Cloud Platform)** a través de **Cloud Run**.

Para pautas de codificación específicas del proyecto y estándares para agentes de IA, consulte [AGENTS.md](./AGENTS.md).

## Características

- **Formulario de Contacto**: Interfaz interactiva ubicada en `/contacto` que permite a los usuarios enviar mensajes con validación en tiempo real y manejo de estados (carga, éxito y error).
- **Integración con Resend**: Procesamiento de correos electrónicos mediante una API Route (`/api/contacto`) utilizando el SDK oficial de Resend.
- **Autenticación**: Gestión segura de usuarios mediante **Clerk**.
- **Diseño**: Componentes modernos con soporte para modo oscuro y diseño responsivo utilizando Tailwind CSS v4.

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno (ver sección abajo).

## Variables de Entorno

Este proyecto utiliza variables de entorno para gestionar la configuración. Las variables con el prefijo `NEXT_PUBLIC_` se incrustan en el bundle de JavaScript en tiempo de compilación.

### Desarrollo Local

Copia el archivo `.env.example` a `.env.local` y completa los valores requeridos:

```bash
cp .env.example .env.local
```

### APIs y Servicios

- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Ruta de redirección tras el inicio de sesión.
- `NEXT_PUBLIC_API_URL`: URL de la API principal.
- `NEXT_PUBLIC_PYTHON_API_URL`: URL de la API de Python.
- `RESEND_API_KEY`: Clave de API necesaria para habilitar el envío de correos desde el formulario de contacto.

## CI/CD y Construcción Docker

Las variables de entorno ya no se cargan desde archivos estáticos durante el proceso de construcción de Docker. En su lugar, se pasan como **Docker build arguments**. Esto asegura que las constantes necesarias para Next.js se incorporen correctamente en el bundle de producción.

### Argumentos de Construcción Requeridos

Los siguientes valores deben proporcionarse durante la fase de construcción de Docker:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_PYTHON_API_URL`
- `RESEND_API_KEY`

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

## API Endpoints

### `POST /api/contacto`

Envía un correo electrónico basado en la información del formulario de contacto.

**Cuerpo de la solicitud (JSON):**
```json
{
  "name": "Nombre del usuario",
  "email": "correo@ejemplo.com",
  "message": "Contenido del mensaje"
}
```

**Respuestas:**
- `200 OK`: Mensaje enviado con éxito.
- `400 Bad Request`: Faltan campos obligatorios.
- `500 Internal Server Error`: Error en el servicio Resend o API Key no configurada.