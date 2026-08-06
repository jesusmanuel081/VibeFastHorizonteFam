import config from "@/config"
import InfoPage from "@/components/site/InfoPage"

export const metadata = { title: "Misión, visión y valores" }

export default function MisionPage() {
  return <InfoPage content={config.content.mision} />
}
