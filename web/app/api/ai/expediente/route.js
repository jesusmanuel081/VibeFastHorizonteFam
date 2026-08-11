// ============================================================
// POST /api/ai/expediente
// ------------------------------------------------------------
// Body:  { texto: string } — información del expediente/familia
// Resp:  JSON con el análisis estructurado validado contra el
//        schema de Zod (ver lib/agents/expediente.js).
//        400 si el texto falta o excede el tamaño permitido.
//        504 si OpenAI tarda demasiado.
//        500 en cualquier otro error (mensaje genérico, sin
//        detalles internos ni contenido del usuario).
//
// La llamada a OpenAI ocurre EXCLUSIVAMENTE aquí (backend). La
// API key vive en OPENAI_API_KEY (variable de entorno del
// servidor) y nunca llega al navegador.
// ============================================================

import { NextResponse } from "next/server"
import { analizarExpediente } from "@/lib/agents/expediente"

const MAX_TEXT_LENGTH = 12000
const TIMEOUT_MS = 60_000

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(Object.assign(new Error("timeout"), { name: "TimeoutError" })),
      ms
    )
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      }
    )
  })
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null)
    const texto = body?.texto

    if (!texto || typeof texto !== "string" || texto.trim().length === 0) {
      return NextResponse.json(
        { error: "El texto es requerido y no puede estar vacío." },
        { status: 400 }
      )
    }

    if (texto.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `El texto es demasiado largo (máximo ${MAX_TEXT_LENGTH} caracteres).` },
        { status: 400 }
      )
    }

    const result = await withTimeout(analizarExpediente({ texto }), TIMEOUT_MS)
    return NextResponse.json(result)
  } catch (err) {
    if (err?.name === "TimeoutError") {
      return NextResponse.json(
        { error: "El análisis tardó demasiado. Intenta de nuevo." },
        { status: 504 }
      )
    }

    // Sin secretos ni detalles internos. No logueamos el texto del
    // usuario: solo el mensaje de error, que no lo contiene.
    console.error("[ai/expediente] error al analizar:", err?.message)
    return NextResponse.json(
      { error: "No pudimos procesar el análisis. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
