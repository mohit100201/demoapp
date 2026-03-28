import SectionRenderer from "@/components/sections/SectionRenderer";
import { pages } from "@/data/siteContent";

export default function AboutPage() {
  return <SectionRenderer sections={pages.about.sections} />;
}
