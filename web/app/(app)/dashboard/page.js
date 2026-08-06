import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createPrograma, updatePrograma, deletePrograma } from "./actions"
import ProgramaFields from "@/components/programas/ProgramaFields"

export const metadata = { title: "Programas" }

const ESTADO_BADGE = {
  Publicado: "badge-success",
  Borrador: "badge-ghost",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: programas, error } = await supabase
    .from("programas")
    .select("*")
    .order("orden", { ascending: true })
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tus programas</h1>
        <p className="mt-1 text-sm text-base-content/70">
          Crea, edita y publica los programas de la asociación. Los que estén en estado{" "}
          <span className="font-medium">Publicado</span> aparecen en la página{" "}
          <Link href="/programas" className="text-primary underline underline-offset-2">
            /programas
          </Link>
          .
        </p>
      </div>

      {/* Crear */}
      <form
        action={createPrograma}
        className="rounded-box border border-base-200 bg-base-100 p-5"
      >
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Plus className="size-4 text-primary" />
          Nuevo programa
        </h2>
        <ProgramaFields />
        <button type="submit" className="btn btn-primary mt-4">
          Crear programa
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
          No pudimos cargar tus programas: {error.message}
        </div>
      )}

      {/* Lista */}
      {!programas?.length ? (
        <div className="rounded-box border border-dashed border-base-300 bg-base-100 px-4 py-12 text-center text-base-content/60">
          Aún no tienes programas. Crea el primero arriba.
        </div>
      ) : (
        <ul className="space-y-3">
          {programas.map((programa) => (
            <li
              key={programa.id}
              className="rounded-box border border-base-200 bg-base-100 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-medium">{programa.nombre}</p>
                    <span
                      className={`badge badge-sm ${
                        ESTADO_BADGE[programa.estado] || "badge-ghost"
                      }`}
                    >
                      {programa.estado}
                    </span>
                    <span className="badge badge-sm badge-outline">
                      {programa.publico_objetivo}
                    </span>
                    <span className="badge badge-sm badge-ghost">Orden: {programa.orden}</span>
                  </div>
                  {programa.descripcion_corta && (
                    <p className="mt-1 truncate text-sm text-base-content/60">
                      {programa.descripcion_corta}
                    </p>
                  )}
                </div>

                <form action={deletePrograma}>
                  <input type="hidden" name="id" value={programa.id} />
                  <button
                    type="submit"
                    className="btn btn-ghost btn-sm btn-square text-error"
                    title="Borrar"
                    aria-label={`Borrar ${programa.nombre}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>

              <details className="group mt-3 rounded-box border border-base-200">
                <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium">
                  <Pencil className="size-3.5" />
                  Editar programa
                </summary>
                <form action={updatePrograma} className="border-t border-base-200 p-4">
                  <input type="hidden" name="id" value={programa.id} />
                  <ProgramaFields values={programa} />
                  <button type="submit" className="btn btn-primary btn-sm mt-4">
                    Guardar cambios
                  </button>
                </form>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
