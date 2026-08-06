import config from "@/config"
import PageHero from "@/components/site/PageHero"
import SiteIcon from "@/components/site/SiteIcon"

export const metadata = { title: "Contacto" }

export default function ContactoPage() {
  const { eyebrow, title, lede, channels } = config.content.contacto

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      <section className="border-t border-base-200 bg-base-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid gap-6 sm:grid-cols-3">
            {channels.map((channel) =>
              channel.href ? (
                <li key={channel.title}>
                  <a
                    href={channel.href}
                    className="flex h-full flex-col items-center rounded-2xl border border-base-200 bg-base-100 p-8 text-center transition hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <SiteIcon name={channel.icon} className="size-6" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold">{channel.title}</h2>
                    <p className="mt-1 text-base-content/70">{channel.value}</p>
                  </a>
                </li>
              ) : (
                <li key={channel.title}>
                  <div className="flex h-full flex-col items-center rounded-2xl border border-base-200 bg-base-100 p-8 text-center">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <SiteIcon name={channel.icon} className="size-6" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold">{channel.title}</h2>
                    <p className="mt-1 text-base-content/70">{channel.value}</p>
                  </div>
                </li>
              )
            )}
          </ul>

          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-base-200 bg-base-200/40 p-8 text-center">
            <h2 className="text-xl font-semibold">¿Prefieres platicar con nosotros?</h2>
            <p className="mt-2 text-sm leading-6 text-base-content/70">
              Escríbenos contando en qué punto estás y te orientamos sobre el siguiente paso.
              Tu información se trata con confidencialidad.
            </p>
            <a
              href="mailto:hola@horizontefamiliar.mx"
              className="btn btn-accent btn-lg mt-6"
            >
              Escribir por correo
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
