"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

// CRUD de programas vía Server Actions. La RLS de Supabase garantiza
// que cada quien solo toca sus filas; aun así filtramos por user_id
// como defensa en profundidad.

const PUBLICOS_OBJETIVO = ["Familias interesadas", "Profesionales", "Comunidad", "Todos"]
const ESTADOS = ["Publicado", "Borrador"]

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("No autenticado")
  return { supabase, user }
}

function parsePrograma(formData) {
  const nombre = formData.get("nombre")?.toString().trim() || null
  const descripcion_corta =
    formData.get("descripcion_corta")?.toString().trim() || null
  const descripcion_completa =
    formData.get("descripcion_completa")?.toString().trim() || null
  const publico_objetivo = formData.get("publico_objetivo")?.toString() || "Todos"
  const estado = formData.get("estado")?.toString() || "Borrador"
  const orden = Number.parseInt(formData.get("orden")?.toString() || "0", 10) || 0

  return {
    nombre,
    descripcion_corta,
    descripcion_completa,
    publico_objetivo: PUBLICOS_OBJETIVO.includes(publico_objetivo)
      ? publico_objetivo
      : "Todos",
    estado: ESTADOS.includes(estado) ? estado : "Borrador",
    orden,
  }
}

export async function createPrograma(formData) {
  const data = parsePrograma(formData)
  if (!data.nombre) return

  const { supabase, user } = await requireUser()
  await supabase.from("programas").insert({ ...data, user_id: user.id })
  revalidatePath("/dashboard")
  revalidatePath("/programas")
}

export async function updatePrograma(formData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  const data = parsePrograma(formData)
  if (!data.nombre) return

  const { supabase, user } = await requireUser()
  await supabase
    .from("programas")
    .update(data)
    .eq("id", id)
    .eq("user_id", user.id)
  revalidatePath("/dashboard")
  revalidatePath("/programas")
}

export async function deletePrograma(formData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  const { supabase, user } = await requireUser()
  await supabase.from("programas").delete().eq("id", id).eq("user_id", user.id)
  revalidatePath("/dashboard")
  revalidatePath("/programas")
}
