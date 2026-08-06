import config from "@/config"
import InfoPage from "@/components/site/InfoPage"

export const metadata = { title: "Nuestra historia" }

export default function HistoriaPage() {
  return <InfoPage content={config.content.historia} />
}
