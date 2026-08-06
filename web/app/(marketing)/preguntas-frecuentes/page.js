import Link from "next/link"
import config from "@/config"
import PageHero from "@/components/site/PageHero"
import CtaBanner from "@/components/site/CtaBanner"
import FAQ from "@/components/landing/FAQ"

export const metadata = { title: "Preguntas frecuentes" }

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        lede="Las dudas que más nos comparten las familias, respondidas con claridad. Si la tuya no está aquí, escríbenos."
      />
      <section className="border-t border-base-200 bg-base-200/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <FAQ {...config.landing.faq} />
          <p className="mt-8 text-center text-sm text-base-content/60">
            ¿Tienes otra pregunta?{" "}
            <Link href="/contacto" className="font-medium text-primary underline underline-offset-2">
              Contáctanos
            </Link>{" "}
            y te respondemos con confidencialidad.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
