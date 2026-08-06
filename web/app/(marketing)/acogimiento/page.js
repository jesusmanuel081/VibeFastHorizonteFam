import config from "@/config"
import InfoPage from "@/components/site/InfoPage"

export const metadata = { title: "Familias de acogimiento" }

export default function AcogimientoPage() {
  return <InfoPage content={config.content.acogimiento} />
}
