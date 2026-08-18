import ExpedienteAnalyzer from "@/components/ai/ExpedienteAnalyzer"

export const metadata = { title: "Diagnóstico de expediente — Horizonte Familiar" }

export default function DiagnosticoExpedientePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Herramienta de IA
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Diagnóstico y acompañamiento de expedientes
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Pega la información que la familia o solicitante compartió y obtén un
          resumen estructurado: etapa del proceso, pendientes, alertas y
          respuesta sugerida. Esta herramienta es de apoyo — las decisiones
          finales siempre las toma el equipo humano.
        </p>
      </div>

      <ExpedienteAnalyzer />
    </div>
  )
}
