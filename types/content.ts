export interface SectionBase {
  id: string;
  type: string;
  visible: boolean;
  order: number;
  animate?: boolean;
}

export interface HeroSection extends SectionBase {
  type: "hero";
  data: {
    badge?: string;
    title: string;
    highlightedText?: string;
    subtitle: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    stats?: { value: string; label: string }[];
  };
}

export interface FeatureSection extends SectionBase {
  type: "features";
  data: {
    badge?: string;
    title: string;
    subtitle?: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export interface TestimonialSection extends SectionBase {
  type: "testimonials";
  data: {
    title: string;
    subtitle?: string;
    testimonials: {
      quote: string;
      author: string;
      role: string;
      avatar?: string;
      rating?: number;
    }[];
  };
}

export interface PricingSection extends SectionBase {
  type: "pricing";
  data: {
    title: string;
    subtitle?: string;
    plans: {
      name: string;
      price: string;
      period?: string;
      description: string;
      features: string[];
      highlighted?: boolean;
      cta: { text: string; link: string };
    }[];
  };
}

export interface GallerySection extends SectionBase {
  type: "gallery";
  data: {
    title: string;
    subtitle?: string;
    categories?: string[];
    items: {
      image: string;
      title: string;
      category?: string;
      description?: string;
      link?: string;
    }[];
  };
}

export interface CtaSection extends SectionBase {
  type: "cta";
  data: {
    title: string;
    subtitle?: string;
    primaryCta: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
  };
}

export interface FaqSection extends SectionBase {
  type: "faq";
  data: {
    title: string;
    subtitle?: string;
    faqs: { question: string; answer: string }[];
  };
}

export interface ContentSection extends SectionBase {
  type: "content";
  data: {
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    imagePosition?: "left" | "right";
  };
}

export interface ContactSection extends SectionBase {
  type: "contact";
  data: {
    title: string;
    subtitle?: string;
    fields: { name: string; type: string; label: string; required?: boolean; placeholder?: string }[];
    submitText?: string;
  };
}

export type Section =
  | HeroSection
  | FeatureSection
  | TestimonialSection
  | PricingSection
  | GallerySection
  | CtaSection
  | FaqSection
  | ContentSection
  | ContactSection;

export interface PageData {
  id: string;
  slug: string;
  title: string;
  description: string;
  ogImage?: string;
  sections: Section[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; avatar?: string };
  publishedAt: string;
  image?: string;
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  content: string;
  image?: string;
  results: { metric: string; value: string }[];
  tags?: string[];
}
