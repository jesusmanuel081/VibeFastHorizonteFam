export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignCls = align === "left" ? "text-left" : "mx-auto max-w-2xl text-center"
  return (
    <div className={alignCls}>
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wider text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-balance text-base-content/70">{subtitle}</p>}
    </div>
  )
}
