import Link from "next/link"
import config from "@/config"
import PageHero from "@/components/site/PageHero"
import SiteIcon from "@/components/site/SiteIcon"
import CtaBanner from "@/components/site/CtaBanner"

export const metadata = { title: "Cómo puedes ayudar" }

const CHIP_COLORS = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-info/10 text-info",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-primary/10 text-primary",
]

export default function AyudarPage() {
  const { eyebrow, title, lede, ways } = config.content.ayudar

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      <section className="border-t border-base-200 bg-base-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ways.map((way, i) => (
              <li key={way.title} className="rounded-2xl border border-base-200 bg-base-100 p-6">
                <div
                  className={
                    "mb-4 inline-flex size-10 items-center justify-center rounded-xl " +
                    CHIP_COLORS[i % CHIP_COLORS.length]
                  }
                >
                  <SiteIcon name={way.icon} className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{way.title}</h3>
                <p className="mt-2 text-sm leading-6 text-base-content/70">{way.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Cada ayuda cuenta</h2>
            <p className="mx-auto mt-2 max-w-xl text-base-content/70">
              Desde compartir información hasta sumarte como voluntario: todas las formas de
              apoyo hacen posible que más niñas, niños y adolescentes crezcan en familia.
            </p>
            <Link href="/contacto" className="btn btn-accent btn-lg mt-6">
              Escríbenos para sumarte
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
