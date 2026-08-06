import config from "@/config"
import InfoPage from "@/components/site/InfoPage"

export const metadata = { title: "¿Qué es la adopción?" }

export default function AdopcionPage() {
  return <InfoPage content={config.content.adopcion} />
}
