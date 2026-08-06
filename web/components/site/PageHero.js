export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="relative overflow-hidden border-b border-base-200">
      <div
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(75%_60%_at_50%_0%,#000,transparent)]"
        aria-hidden
      >
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-[-8rem] size-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wider text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-base-content/70 md:text-xl">
            {lede}
          </p>
        )}
      </div>
    </section>
  )
}
