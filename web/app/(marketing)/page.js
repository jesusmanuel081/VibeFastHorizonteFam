import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import config from "@/config"
import FAQ from "@/components/landing/FAQ"
import CtaBanner from "@/components/site/CtaBanner"
import SectionHeading from "@/components/site/SectionHeading"
import SiteIcon from "@/components/site/SiteIcon"
import ProgramCard from "@/components/site/ProgramCard"
import { getProgramasPublic } from "@/lib/programas"

export const metadata = {
  title: "Inicio",
  description: config.app.description,
}

export default async function HomePage() {
  const { hero, faq } = config.landing
  const { intro, steps, stepsTitle, sectionsCards } = config.content.home
  const programas = await getProgramasPublic()
  const destacados = programas.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(75%_60%_at_50%_0%,#000,transparent)]"
          aria-hidden
        >
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute left-1/2 top-[-8rem] size-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-[8%] top-[3rem] size-[360px] rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 pt-20 pb-12 text-center md:pt-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/70 px-3 py-1 text-xs font-medium text-base-content/70 backdrop-blur">
            <ShieldCheck className="size-3.5 text-primary" />
            {hero.eyebrow}
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-base-content/70 md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={hero.cta.href} className="btn btn-accent btn-lg">
              {hero.cta.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={hero.ctaSecondary.href} className="btn btn-ghost btn-lg">
              {hero.ctaSecondary.label}
            </Link>
          </div>
          <p className="mt-4 text-sm text-base-content/50">
            Información clara · Acompañamiento humano · Confidencialidad
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-base-200 bg-base-100 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {intro.body.map((paragraph, i) => (
              <p key={i} className="text-center text-lg leading-8 text-base-content/70">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo empezar */}
      <section className="border-t border-base-200 bg-base-200/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={stepsTitle} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.title}
                className="rounded-2xl border border-base-200 bg-base-100 p-6"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SiteIcon name={step.icon} className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-base-content/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Atajos de información */}
      <section className="border-t border-base-200 bg-base-100 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Resuelve tus dudas"
            title="Información que te orienta antes de decidir"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectionsCards.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-2xl border border-base-200 bg-base-100 p-6 transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <SiteIcon name={card.icon} className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-base-content/70">
                    {card.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Saber más
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programas destacados */}
      <section className="border-t border-base-200 bg-base-200/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow={config.content.programas.eyebrow}
            title="Programas que te acompañan"
            subtitle="Conoce las acciones que ofrecemos para informarte, orientarte y acompañarte."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((programa) => (
              <li key={programa.id} className="h-full">
                <ProgramCard programa={programa} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/programas" className="btn btn-outline btn-lg">
              Ver todos los programas
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ {...faq} />
      <CtaBanner />
    </>
  )
}
