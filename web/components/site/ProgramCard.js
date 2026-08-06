import Link from "next/link"
import { ArrowRight } from "lucide-react"

const AUDIENCE_COLORS = {
  "Familias interesadas": "bg-primary/10 text-primary",
  Profesionales: "bg-accent/10 text-accent",
  Comunidad: "bg-success/10 text-success",
  Todos: "bg-info/10 text-info",
}

export default function ProgramCard({ programa }) {
  const { id, nombre, descripcion_corta, publico_objetivo } = programa
  const badge = AUDIENCE_COLORS[publico_objetivo] || "bg-base-300 text-base-content/70"

  return (
    <Link
      href={`/programas/${id}`}
      className="group flex h-full flex-col rounded-2xl border border-base-200 bg-base-100 p-6 transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`badge badge-sm ${badge}`}>{publico_objetivo}</span>
        <ArrowRight className="size-4 text-base-content/30 transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{nombre}</h3>
      {descripcion_corta && (
        <p className="mt-2 flex-1 text-sm leading-6 text-base-content/70">{descripcion_corta}</p>
      )}
    </Link>
  )
}
