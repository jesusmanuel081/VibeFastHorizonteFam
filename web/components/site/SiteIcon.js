import * as LucideIcons from "lucide-react"

export default function SiteIcon({ name, className }) {
  const Cmp = LucideIcons[name] || LucideIcons.Circle
  return <Cmp className={className} aria-hidden="true" />
}
