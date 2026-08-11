// ============================================================
// OpenAI · structured outputs (multi-proveedor)
// ------------------------------------------------------------
// generateObject() intenta que el modelo devuelva un objeto que
// cumple un schema de Zod. Primero usa response_format con JSON
// Schema estricto (OpenAI/OpenRouter compatibles). Si el proveedor
// o modelo no lo soporta (p. ej. Ollama o modelos :free), cae a
// JSON plano + validación con Zod, que es el fallback universal.
// ============================================================

import { zodResponseFormat } from "openai/helpers/zod"
import { openai, getModel } from "./client"
import config from "@/config"

function stripCodeFence(text) {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
}

async function generateStrict(schema, prompt, model) {
  const completion = await openai.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(schema, "result"),
  })
  return completion.choices[0]?.message?.parsed ?? null
}

async function generatePlain(schema, prompt, model, withFormat) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Devuelve SOLO un objeto JSON válido. No agregues texto, markdown, ni comentarios.",
      },
      { role: "user", content: prompt },
    ],
    ...(withFormat ? { response_format: { type: "json_object" } } : {}),
  })
  const text = stripCodeFence(completion.choices[0]?.message?.content || "")
  const json = JSON.parse(text)
  const result = schema.safeParse(json)
  if (!result.success) {
    throw new Error(
      `La respuesta del modelo no cumple el schema esperado: ${result.error.message}`
    )
  }
  return result.data
}

// schema: ZodSchema · prompt: string · model: opcional (override)
// Devuelve el objeto ya validado contra `schema`.
export async function generateObject(
  schema,
  prompt,
  model = getModel(config.ai.structuredModel)
) {
  try {
    const parsed = await generateStrict(schema, prompt, model)
    if (parsed != null) {
      const result = schema.safeParse(parsed)
      if (result.success) return result.data
    }
  } catch {
    // Proveedor/modelo sin soporte de JSON Schema estricto -> fallback
  }
  try {
    return await generatePlain(schema, prompt, model, true)
  } catch {
    // Sin soporte de response_format -> último recurso: JSON plano
  }
  return generatePlain(schema, prompt, model, false)
}
