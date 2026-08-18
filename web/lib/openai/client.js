// ============================================================
// OpenAI · cliente compartido (multi-proveedor)
// ------------------------------------------------------------
// TODO el acceso a IA pasa por aquí. Un solo cliente para chat,
// structured outputs, agentes y embeddings — así la API key y la
// configuración del SDK viven en un único lugar.
//
// Importa desde aquí en server-only (Route Handlers, Server
// Actions). Nunca expongas este cliente al browser.
//
// El cliente se construye de forma perezosa (Proxy): el SDK valida
// la presencia de la API key al instanciarse, y `next build`
// importa cada route para recolectar su metadata. Si construyéramos
// el cliente al importar, el build fallaría sin la key. Difiriendo
// la construcción al primer uso, el build pasa y una request sin
// key falla de forma controlada dentro del try/catch de la route.
//
// Proveedores compatibles con el endpoint de OpenAI:
//   openai    -> api.openai.com                (OPENAI_API_KEY)
//   openrouter-> openrouter.ai (modelos :free) (OPENROUTER_API_KEY)
//   gemini    -> Google AI Studio (gratis)     (GEMINI_API_KEY)
//   ollama    -> local, sin key                (OLLAMA_BASE_URL)
// El proveedor se elige con la variable AI_PROVIDER. El modelo por
// defecto del feature se puede sobreescribir con AI_MODEL.
// ============================================================

import OpenAI from "openai"

let client = null

const PROVIDERS = {
  openai: {
    baseURL: process.env.OPENAI_BASE_URL || undefined,
    apiKey: process.env.OPENAI_API_KEY,
    requiresKey: true,
  },
  openrouter: {
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    requiresKey: true,
  },
  gemini: {
    baseURL: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: process.env.GEMINI_API_KEY,
    requiresKey: true,
  },
  ollama: {
    baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
    apiKey: process.env.OLLAMA_API_KEY || "ollama",
    requiresKey: false,
  },
}

function getProvider() {
  const name = process.env.AI_PROVIDER || "openai"
  const provider = PROVIDERS[name]
  if (!provider) {
    throw new Error(
      `AI_PROVIDER desconocido: "${name}". Usa uno de: ${Object.keys(PROVIDERS).join(", ")}`
    )
  }
  return { name, ...provider }
}

export function getModel(fallback) {
  if (process.env.AI_MODEL) return process.env.AI_MODEL
  if (process.env.AI_PROVIDER === "gemini") return "gemini-3.5-flash-lite"
  if (process.env.AI_PROVIDER === "ollama") return "llama3.1:8b"
  return fallback
}

function getClient() {
  if (!client) {
    const { name, baseURL, apiKey, requiresKey } = getProvider()
    if (requiresKey && !apiKey) {
      throw new Error(
        `Falta la API key para AI_PROVIDER="${name}". Revisa web/.env.local.`
      )
    }
    client = new OpenAI({ apiKey, baseURL })
  }
  return client
}

export const openai = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = getClient()[prop]
      return typeof value === "function" ? value.bind(getClient()) : value
    },
  }
)
