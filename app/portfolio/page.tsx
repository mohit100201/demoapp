import SectionRenderer from "@/components/sections/SectionRenderer";
import { pages } from "@/data/siteContent";

export default function PortfolioPage() {
  return <SectionRenderer sections={pages.portfolio.sections} />;
}
