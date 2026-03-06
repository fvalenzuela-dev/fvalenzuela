import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Endpoint POST para procesar el formulario de contacto y enviar un correo electrónico.
 * Valida los campos requeridos y utiliza el servicio Resend para el envío.
 *
 * @param {NextRequest} request - Objeto de solicitud que contiene name, email y message en el body.
 * @returns {Promise<NextResponse>} Respuesta JSON con el estado de la operación (success: true o error).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["fernando.valenzuela@fvalenzuela.cl"],
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}