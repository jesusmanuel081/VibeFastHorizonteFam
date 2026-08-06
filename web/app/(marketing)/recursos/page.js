import Link from "next/link"
import config from "@/config"
import PageHero from "@/components/site/PageHero"
import SectionHeading from "@/components/site/SectionHeading"
import SiteIcon from "@/components/site/SiteIcon"
import CtaBanner from "@/components/site/CtaBanner"

export const metadata = { title: "Recursos y guías" }

export default function RecursosPage() {
  const { eyebrow, title, lede, groups } = config.content.recursos

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      <section className="border-t border-base-200 bg-base-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {groups.map((group) => (
            <div key={group.title} className="mb-16 last:mb-0">
              <SectionHeading align="left" title={group.title} />
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="flex h-full items-start gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 transition hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <SiteIcon name={item.icon} className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-base-content/70">{item.body}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
