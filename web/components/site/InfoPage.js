import PageHero from "@/components/site/PageHero"
import SectionHeading from "@/components/site/SectionHeading"
import SiteIcon from "@/components/site/SiteIcon"

const CHIP_COLORS = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-info/10 text-info",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
]

export default function InfoPage({ content }) {
  const { eyebrow, title, lede, sections = [], valuesTitle, values = [] } = content
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-20">
        {sections.map((section, i) => (
          <div key={section.title} className={i > 0 ? "mt-14" : undefined}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.title}</h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph, j) => (
                <p key={j} className="leading-8 text-base-content/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {values.length > 0 && (
        <section className="border-t border-base-200 bg-base-200/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading title={valuesTitle} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, i) => (
                <li
                  key={value.title}
                  className="rounded-2xl border border-base-200 bg-base-100 p-6"
                >
                  <div
                    className={
                      "mb-4 inline-flex size-10 items-center justify-center rounded-xl " +
                      CHIP_COLORS[i % CHIP_COLORS.length]
                    }
                  >
                    <SiteIcon name={value.icon} className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-base-content/70">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
