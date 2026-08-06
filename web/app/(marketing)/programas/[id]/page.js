import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import config from "@/config"
import PageHero from "@/components/site/PageHero"
import { getProgramaPublic, getProgramasPublic } from "@/lib/programas"

export async function generateMetadata({ params }) {
  const { id } = await params
  const programa = await getProgramaPublic(id)
  if (!programa) return { title: "Programa no encontrado" }
  return { title: programa.nombre }
}

export default async function ProgramaPage({ params }) {
  const { id } = await params
  const programa = await getProgramaPublic(id)
  if (!programa) notFound()

  const otros = (await getProgramasPublic()).filter((p) => p.id !== programa.id).slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow="Programas"
        title={programa.nombre}
        lede={programa.descripcion_corta}
      />

      <section className="border-t border-base-200 bg-base-100 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary">{programa.publico_objetivo}</span>
            <span className="badge badge-ghost">Programa</span>
          </div>

          <div className="mt-8 space-y-5">
            {programa.descripcion_completa
              ? programa.descripcion_completa
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i} className="text-lg leading-8 text-base-content/80">
                      {paragraph}
                    </p>
                  ))
              : (
                  <p className="text-lg leading-8 text-base-content/80">
                    {programa.descripcion_corta}
                  </p>
                )}
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className="btn btn-accent">
              Me interesa este programa
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/programas" className="btn btn-ghost">
              <ArrowLeft className="size-4" />
              Ver todos los programas
            </Link>
          </div>
        </div>
      </section>

      {otros.length > 0 && (
        <section className="border-t border-base-200 bg-base-200/40 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold tracking-tight">Otros programas</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {otros.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/programas/${p.id}`}
                    className="flex h-full flex-col rounded-2xl border border-base-200 bg-base-100 p-6 transition hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="badge badge-sm badge-ghost">{p.publico_objetivo}</span>
                    <h3 className="mt-3 text-lg font-semibold">{p.nombre}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-base-content/70">
                      {p.descripcion_corta}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
