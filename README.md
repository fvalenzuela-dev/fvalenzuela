# fvalenzuela

Versión: 1.1.0

## Descripción
Este proyecto es una aplicación construida con Next.js que integra un sistema de autenticación con Clerk, estilos con Tailwind CSS y un servicio de mensajería mediante Resend.

## Características
- **Formulario de Contacto**: Interfaz interactiva ubicada en `/contacto` que permite a los usuarios enviar mensajes con validación en tiempo real y manejo de estados (carga, éxito y error).
- **Integración con Resend**: Procesamiento de correos electrónicos mediante una API Route (`/api/contacto`) utilizando el SDK oficial de Resend.
- **Autenticación**: Configurada con Clerk para la gestión segura de usuarios.
- **Diseño**: Componentes modernos con soporte para modo oscuro y diseño responsivo.

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno (ver sección abajo).

## Variables de Entorno

Copia el archivo `.env.example` a `.env` y completa los valores requeridos:

### Autenticación (Clerk)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Ruta de redirección tras el inicio de sesión.

### APIs
- `NEXT_PUBLIC_API_URL`: URL de la API principal.
- `NEXT_PUBLIC_PYTHON_API_URL`: URL de la API de Python.

### Email (Resend)
- `RESEND_API_KEY`: Clave de API necesaria para habilitar el envío de correos desde el formulario de contacto.

## Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

## API Endpoints

### `POST /api/contacto`

Envía un correo electrónico basado en la información del formulario.

**Body esperado:**
```json
{
  "name": "Nombre del usuario",
  "email": "correo@ejemplo.com",
  "message": "Contenido del mensaje"
}
```

**Respuestas:**
- `200 OK`: El mensaje fue enviado con éxito.
- `400 Bad Request`: Faltan campos obligatorios en la solicitud.
- `500 Internal Server Error`: La API Key no está configurada o hubo un error en el servicio de Resend.