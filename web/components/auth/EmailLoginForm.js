"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

// Formulario de acceso con email + contraseña (usuario creado en
// Supabase). Pensado para pruebas del equipo: permite entrar aunque
// Google OAuth no esté disponible. Nunca llama a un servidor propio:
// usa directamente supabase.auth.signInWithPassword.
export default function EmailLoginForm({ next = "/dashboard" }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : error.message
      )
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
      <label className="form-control w-full">
        <span className="label-text mb-1 text-sm font-medium">Correo</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="tucorreo@ejemplo.mx"
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1 text-sm font-medium">Contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="input input-bordered w-full"
        />
      </label>

      {error && (
        <p role="alert" className="rounded-lg border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Entrando…" : "Entrar con correo y contraseña"}
      </button>
    </form>
  )
}
