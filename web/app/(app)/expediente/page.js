import ExpedienteAnalyzer from "@/components/ai/ExpedienteAnalyzer"

export const metadata = { title: "Revisión de expediente" }

export default function ExpedientePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Revisión y acompañamiento de expedientes
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          El agente organiza la información que comparte una familia o solicitante y
          señala lo que el equipo humano debe revisar.
        </p>
      </div>

      <ExpedienteAnalyzer />
    </div>
  )
}
