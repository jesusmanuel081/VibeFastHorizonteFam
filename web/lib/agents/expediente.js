// ============================================================
// Agente de Revisión y Acompañamiento de Expedientes
// ------------------------------------------------------------
// Primera pieza del sistema de agentes especializados de
// Horizonte Familiar. Recibe el texto que comparte una familia o
// solicitante y devuelve un análisis estructurado y validado
// contra el schema de Zod (structured outputs de OpenAI).
//
// Server-only: importa el cliente de OpenAI. NUNCA se importa
// desde el navegador. La UI solo habla con el Route Handler
// POST /api/ai/expediente.
//
// Este agente NO toma decisiones: organiza información y señala
// lo que el equipo humano debe revisar. Las alertas son señales
// para revisión humana, no conclusiones.
// ============================================================

import { z } from "zod"
import { generateObject } from "@/lib/openai/structured"
import config from "@/config"

// ------------------------------------------------------------
// Schema estricto. `nivel_atencion` solo admite los tres valores
// permitidos; cualquier otra cosa invalida la respuesta.
// ------------------------------------------------------------
export const ExpedienteAnalysisSchema = z.object({
  resumen: z
    .string()
    .describe("Resumen breve y objetivo de la información proporcionada. Solo hechos presentes en el texto."),
  etapa_proceso: z
    .string()
    .describe(
      "Etapa probable del proceso identificada a partir del texto (por ejemplo: información inicial, preparación y formación, presentación de documentos, evaluaciones, vinculación o seguimiento). Si no puede determinarse, indícalo explícitamente."
    ),
  pendientes: z
    .array(z.string())
    .describe("Acciones, documentos o información que aparentemente faltan. Lista vacía si no hay faltantes evidentes."),
  alertas: z
    .array(z.string())
    .describe(
      "Señales que el equipo humano debe revisar (riesgo, información contradictoria, dudas legales, signos de angustia, etc.). NO son conclusiones: son señales. Lista vacía si no hay ninguna."
    ),
  proximos_pasos: z
    .array(z.string())
    .describe("Acciones recomendadas para continuar el proceso. Claras y accionables."),
  nivel_atencion: z
    .enum(["normal", "requiere_revision", "prioritario"])
    .describe("Nivel de atención según la urgencia del análisis."),
  respuesta_familia: z
    .string()
    .describe(
      "Respuesta redactada para mostrar a la familia en lenguaje claro, empático y no revictimizante. No debe sonar a veredicto ni generar culpa."
    ),
  requiere_intervencion_humana: z
    .boolean()
    .describe("true si alguna alerta o situación amerita revisión o intervención de una persona del equipo."),
})

// ------------------------------------------------------------
// System prompt del agente.
// ------------------------------------------------------------
export const EXPEDIENTE_SYSTEM_PROMPT = `
Eres el "Agente de Revisión y Acompañamiento de Expedientes" de Horizonte Familiar, una Asociación Civil de Chihuahua que acompaña procesos de adopción y familias de acogimiento.

Tu función es apoyar al equipo humano organizando la información que una familia o solicitante comparte: resumir, ubicar la etapa probable del proceso, señalar lo que falta y destacar lo que debe revisarse. NO tomas decisiones.

Principios inamovibles:
- Esta herramienta es de apoyo. Las decisiones finales sobre adopciones, acogimiento o idoneidad siempre las toma el equipo humano (trabajadoras y trabajadores sociales, psicólogas y psicólogos, abogadas y abogados, y autoridades).
- NUNCA apruebes ni rechaces a una familia. NUNCA determines si alguien es apto o no para adoptar o acoger. NUNCA hagas diagnósticos psicológicos. NUNCA tomes decisiones sobre niñas, niños o adolescentes. NUNCA sustituyas el criterio de profesionales o autoridades.
- Analiza ÚNICAMENTE la información proporcionada. Si algo no puede determinarse con la información disponible, indícalo explícitamente en lugar de inventarlo.
- Diferencia hechos de inferencias: presenta las inferencias como posibilidades, nunca como hechos.
- Prioriza la seguridad y el bienestar de las niñas, niños y adolescentes.
- Usa lenguaje claro, respetuoso, empático y no revictimizante en todos los campos, especialmente en respuesta_familia.
- Cuando exista una señal que requiera revisión humana (riesgo, contradicciones, dudas legales, angustia, etc.), inclúyela en alertas y activa requiere_intervencion_humana. Las alertas son señales para revisión humana, no conclusiones.

Devuelve el análisis estructurado que se te pide, en español, y nada más.`.trim()

// ------------------------------------------------------------
// Análisis del expediente.
// Componemos el prompt como un solo mensaje de usuario para
// respetar la firma de generateObject (no expone system aparte).
// ------------------------------------------------------------
export async function analizarExpediente({ texto }) {
  const prompt = `${EXPEDIENTE_SYSTEM_PROMPT}\n\n## Información proporcionada por la familia o solicitante\n\n${texto}`

  const parsed = await generateObject(
    ExpedienteAnalysisSchema,
    prompt,
    config.ai.structuredModel // gpt-4o-mini
  )

  // Red de seguridad: si la respuesta no valida el schema
  // (null, campos faltantes, nivel no permitido), lo tratamos
  // como respuesta inválida en vez de propagar datos rotos.
  const result = ExpedienteAnalysisSchema.safeParse(parsed)
  if (!result.success) {
    throw new Error("La respuesta del modelo no cumple el schema esperado.")
  }

  return result.data
}
