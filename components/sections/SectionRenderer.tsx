"use client";

import type { Section } from "@/types/content";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TestimonialSection from "./TestimonialSection";
import PricingSection from "./PricingSection";
import GallerySection from "./GallerySection";
import CtaSection from "./CtaSection";
import FaqSection from "./FaqSection";
import ContentSection from "./ContentSection";
import ContactSection from "./ContactSection";

const renderers: Record<string, React.FC<{ data: any }>> = {
  hero: HeroSection,
  features: FeatureSection,
  testimonials: TestimonialSection,
  pricing: PricingSection,
  gallery: GallerySection,
  cta: CtaSection,
  faq: FaqSection,
  content: ContentSection,
  contact: ContactSection,
};

interface Props {
  sections: Section[];
}

const SectionRenderer = ({ sections }: Props) => {
  const sorted = [...sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {sorted.map((section) => {
        const Component = renderers[section.type];
        if (!Component) return null;
        return <Component key={section.id} data={section.data} />;
      })}
    </>
  );
};

export default SectionRenderer;
