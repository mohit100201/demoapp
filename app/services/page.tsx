import SectionRenderer from "@/components/sections/SectionRenderer";
import { pages } from "@/data/siteContent";

export default function ServicesPage() {
  return <SectionRenderer sections={pages.services.sections} />;
}
