import SectionRenderer from "@/components/sections/SectionRenderer";
import { pages } from "@/data/siteContent";

export default function ContactPage() {
  return <SectionRenderer sections={pages.contact.sections} />;
}
