// TEMPORAL: diagnóstico de env (se elimina tras verificar).
export const dynamic = "force-dynamic"

export async function GET() {
  const mask = (v) => (v ? `${v.slice(0, 6)}...${v.slice(-4)} (${v.length})` : "(vacío)")
  return Response.json({
    AI_PROVIDER: process.env.AI_PROVIDER || "(vacío)",
    AI_MODEL: process.env.AI_MODEL || "(vacío)",
    GEMINI_API_KEY: mask(process.env.GEMINI_API_KEY),
    OPENAI_API_KEY: mask(process.env.OPENAI_API_KEY),
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "ok" : "(vacío)",
  })
}
