"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  FileSearch,
  HeartHandshake,
  ListChecks,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react"

// Análisis de expediente vía POST /api/ai/expediente.
// La llamada a OpenAI ocurre en el backend; este componente solo
// envía el texto y muestra el resultado estructurado.
//
// result (validado contra el schema de Zod):
//   { resumen, etapa_proceso, pendientes, alertas, proximos_pasos,
//     nivel_atencion, respuesta_familia, requiere_intervencion_humana }

const NIVEL_CONFIG = {
  normal: { label: "Normal", badge: "badge-success" },
  requiere_revision: { label: "Requiere revisión", badge: "badge-warning" },
  prioritario: { label: "Prioritario", badge: "badge-error" },
}

const INTERVENCION_CONFIG = {
  true: { label: "Requiere revisión humana", badge: "badge-warning" },
  false: { label: "No requiere intervención inmediata", badge: "badge-success" },
}

const EJEMPLOS = [
  {
    label: "Proceso inicial",
    texto:
      "Familia de dos adultos que desea iniciar el proceso de acogimiento. Ya asistieron a la sesión informativa y entregaron identificación, comprobante de domicilio y cartas de recomendación. Todavía no han presentado los estudios médicos. Uno de los adultos trabaja de lunes a viernes hasta las 6 pm y preguntan si esto afecta las siguientes etapas.",
  },
  {
    label: "Con señales de alerta",
    texto:
      "Solicitante en etapa de evaluaciones. Menciona que en su historial aparece un proceso previo que no terminó y que prefiere no hablar de ello. Pregunta si puede omitir esa parte en las entrevistas. Hoy envió el comprobante de ingresos pero el monto declarado no coincide con el que aparece en los estudios.",
  },
]

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-box border border-dashed border-base-300 bg-base-100 px-6 py-14 text-center">
      <FileSearch className="size-8 text-base-content/40" />
      <p className="mt-4 max-w-md text-sm leading-6 text-base-content/60">
        El análisis aparecerá aquí: resumen, etapa del proceso, pendientes, alertas,
        próximos pasos y una respuesta sugerida para la familia.
      </p>
    </div>
  )
}

function ResultView({ result }) {
  const nivel = NIVEL_CONFIG[result.nivel_atencion] || NIVEL_CONFIG.normal
  const intervencion = INTERVENCION_CONFIG[result.requiere_intervencion_humana]

  return (
    <div className="space-y-4">
      {/* Resumen */}
      <section className="rounded-box border border-base-200 bg-base-100 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <ClipboardCheck className="size-4 text-primary" />
          Resumen
        </h3>
        <p className="mt-3 text-sm leading-6 text-base-content/80">{result.resumen}</p>
      </section>

      {/* Etapa del proceso */}
      <section className="flex flex-wrap items-center gap-3 rounded-box border border-base-200 bg-base-100 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-4 text-primary" />
          Etapa del proceso
        </h3>
        <span className="badge badge-lg badge-outline">{result.etapa_proceso}</span>
      </section>

      {/* Pendientes */}
      <section className="rounded-box border border-base-200 bg-base-100 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <ListChecks className="size-4 text-primary" />
          Pendientes
        </h3>
        {result.pendientes.length === 0 ? (
          <p className="mt-3 text-sm text-base-content/60">
            No se detectaron pendientes evidentes en la información compartida.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {result.pendientes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-6 text-base-content/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Alertas */}
      <section className="rounded-box border border-warning/40 bg-warning/10 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="size-4 text-warning" />
          Alertas para revisión del equipo
        </h3>
        {result.alertas.length === 0 ? (
          <p className="mt-3 text-sm text-base-content/70">
            No se detectaron alertas que requieran revisión inmediata.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {result.alertas.map((alerta, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg border border-warning/30 bg-base-100 px-3 py-2 text-sm leading-6 text-base-content/80"
              >
                <AlertTriangle className="mt-1 size-4 shrink-0 text-warning" />
                {alerta}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-base-content/60">
          Las alertas son señales para que el equipo humano revise, no conclusiones.
        </p>
      </section>

      {/* Próximos pasos */}
      <section className="rounded-box border border-base-200 bg-base-100 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <ArrowRight className="size-4 text-primary" />
          Próximos pasos
        </h3>
        <ol className="mt-3 space-y-2">
          {result.proximos_pasos.map((paso, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-6 text-base-content/80">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
      </section>

      {/* Nivel de atención + Intervención humana */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box border border-base-200 bg-base-100 p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <UserCheck className="size-4 text-primary" />
            Nivel de atención
          </h3>
          <span className={`badge badge-lg mt-3 ${nivel.badge}`}>{nivel.label}</span>
        </div>
        <div className="rounded-box border border-base-200 bg-base-100 p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4 text-primary" />
            Intervención humana
          </h3>
          <span className={`badge badge-lg mt-3 ${intervencion.badge}`}>
            {intervencion.label}
          </span>
        </div>
      </section>

      {/* Respuesta sugerida para la familia */}
      <section className="rounded-box border border-primary/30 bg-primary/5 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <MessageSquareHeart className="size-4 text-primary" />
          Respuesta sugerida para la familia
        </h3>
        <p className="mt-3 whitespace-pre-wrap rounded-lg bg-base-100 p-4 text-sm leading-6 text-base-content/80">
          {result.respuesta_familia}
        </p>
        <p className="mt-3 text-xs text-base-content/60">
          El equipo humano revisa y ajusta este texto antes de enviarlo.
        </p>
      </section>
    </div>
  )
}

export default function ExpedienteAnalyzer() {
  const [texto, setTexto] = useState("")
  const [result, setResult] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  function cargarEjemplo(ejemplo) {
    setTexto(ejemplo.texto)
    setResult(null)
    setError(null)
  }

  async function analizar() {
    const value = texto.trim()
    if (!value) {
      setError("Escribe o pega la información del expediente para analizarla.")
      return
    }

    setError(null)
    setResult(null)
    setAnalyzing(true)

    try {
      const res = await fetch("/api/ai/expediente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: value }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setError(data?.error || "No pudimos procesar el análisis. Intenta de nuevo.")
        return
      }

      setResult(data)
    } catch {
      setError("Hubo un problema de conexión. Intenta de nuevo.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Entrada */}
      <div className="rounded-box border border-base-200 bg-base-100 p-5">
        <label htmlFor="expediente-texto" className="flex items-center gap-2 font-semibold">
          <HeartHandshake className="size-4 text-primary" />
          Información del expediente o de la familia
        </label>
        <textarea
          id="expediente-texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          disabled={analyzing}
          rows={7}
          placeholder="Pega aquí la información que la familia o solicitante compartió: datos del proceso, documentos entregados, dudas, avances…"
          className="textarea textarea-bordered mt-3 w-full resize-y leading-6"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-base-content/60">Probar con un ejemplo:</span>
          {EJEMPLOS.map((ejemplo) => (
            <button
              key={ejemplo.label}
              type="button"
              onClick={() => cargarEjemplo(ejemplo)}
              disabled={analyzing}
              className="btn btn-ghost btn-xs"
            >
              {ejemplo.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={analizar}
          disabled={analyzing || !texto.trim()}
          className="btn btn-primary mt-4"
        >
          {analyzing ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Analizando…
            </>
          ) : (
            <>
              <ClipboardCheck className="size-4" />
              Analizar expediente
            </>
          )}
        </button>

        <p className="mt-3 text-xs leading-5 text-base-content/60">
          Esta IA es una herramienta de apoyo: organiza la información y señala lo que
          debe revisarse. Las decisiones finales sobre adopciones, acogimiento o
          idoneidad siempre las toma el equipo humano.
        </p>
      </div>

      {/* Errores */}
      {error && (
        <div role="alert" className="alert alert-error">
          <AlertTriangle className="size-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {analyzing && (
        <div className="rounded-box border border-base-200 bg-base-100 p-5">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <span className="loading loading-dots loading-sm" />
            Analizando la información y preparando el acompañamiento…
          </div>
        </div>
      )}

      {/* Resultado */}
      {!analyzing && !error && (result ? <ResultView result={result} /> : <EmptyState />)}
    </div>
  )
}
