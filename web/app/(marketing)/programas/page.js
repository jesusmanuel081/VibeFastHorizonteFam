import Link from "next/link"
import { ArrowRight } from "lucide-react"
import config from "@/config"
import PageHero from "@/components/site/PageHero"
import SectionHeading from "@/components/site/SectionHeading"
import SiteIcon from "@/components/site/SiteIcon"
import ProgramCard from "@/components/site/ProgramCard"
import CtaBanner from "@/components/site/CtaBanner"
import { getProgramasPublic } from "@/lib/programas"

export const metadata = { title: "Nuestros programas" }

const AUDIENCE_ICONS = {
  "Familias interesadas": "Heart",
  Profesionales: "Briefcase",
  Comunidad: "Users",
  Todos: "Globe",
}

export default async function ProgramasPage() {
  const { eyebrow, title, lede } = config.content.programas
  const programas = await getProgramasPublic()

  const audiencias = ["Familias interesadas", "Profesionales", "Comunidad", "Todos"].map(
    (nombre) => ({
      nombre,
      count: programas.filter((p) => p.publico_objetivo === nombre).length,
    })
  )

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      <section className="border-t border-base-200 bg-base-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiencias.map((a) => (
              <div
                key={a.nombre}
                className="flex items-center gap-3 rounded-2xl border border-base-200 bg-base-100 p-4"
              >
                <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SiteIcon name={AUDIENCE_ICONS[a.nombre] || "Users"} className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.nombre}</p>
                  <p className="text-xs text-base-content/60">
                    {a.count} {a.count === 1 ? "programa" : "programas"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <SectionHeading
            align="left"
            title="Programas activos"
            subtitle="Cada programa está pensado para acompañarte en un momento distinto del camino."
          />

          {programas.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programas.map((programa) => (
                <li key={programa.id} className="h-full">
                  <ProgramCard programa={programa} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-base-300 bg-base-100 px-4 py-12 text-center text-base-content/60">
              Pronto compartiremos nuestros programas aquí. Mientras tanto, escríbenos y con
              gusto te orientamos.
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h3 className="text-xl font-semibold">¿No encuentras lo que buscas?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-base-content/70">
              Cuéntanos en qué punto estás y te orientamos sobre el programa o la información
              que necesitas.
            </p>
            <Link href="/contacto" className="btn btn-accent btn-lg mt-6">
              Hablar con nosotros
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
