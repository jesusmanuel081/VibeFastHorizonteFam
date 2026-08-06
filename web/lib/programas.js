import config from "@/config"
import { createClient } from "@/lib/supabase/server"

const HAS_SUPABASE =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Programas visibles al público (solo estado 'Publicado').
// Si Supabase no está configurado, devuelve contenido de respaldo
// para que la plataforma funcione igual en desarrollo.
export async function getProgramasPublic() {
  if (!HAS_SUPABASE) return config.content.programas.fallback

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("programas")
    .select("*")
    .eq("estado", "Publicado")
    .order("orden", { ascending: true })
    .order("created_at", { ascending: false })

  if (error || !data?.length) return config.content.programas.fallback
  return data
}

export async function getProgramaPublic(id) {
  if (!id) return null

  if (!HAS_SUPABASE) {
    return (
      config.content.programas.fallback.find((p) => String(p.id) === String(id)) || null
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("programas")
    .select("*")
    .eq("id", id)
    .eq("estado", "Publicado")
    .single()

  if (error || !data) return null
  return data
}
