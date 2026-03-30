import { ContentSection } from "@/components/admin/types";

export const adminSections: ContentSection[] = [
  {
    key: "home",
    title: "Home",
    description: "Hero, value props, and featured content shown on the landing page.",
    items: [
      {
        id: "home-1",
        title: "Hero Banner - Build Faster Sites",
        status: "published",
        updatedAt: "2026-03-22",
        summary: "Main headline and CTA block for the top fold.",
      },
      {
        id: "home-2",
        title: "Feature Grid - What We Offer",
        status: "draft",
        updatedAt: "2026-03-25",
        summary: "Three-column list of feature highlights and icons.",
      },
      {
        id: "home-3",
        title: "Client Logo Strip",
        status: "published",
        updatedAt: "2026-03-20",
        summary: "Brand trust row with partner logos.",
      },
    ],
  },
  {
    key: "portfolio",
    title: "Portfolio",
    description: "Case studies and project cards displayed in the work section.",
    items: [
      {
        id: "portfolio-1",
        title: "E-Commerce Redesign",
        status: "published",
        updatedAt: "2026-03-18",
        summary: "Checkout flow redesign for a fashion brand.",
      },
      {
        id: "portfolio-2",
        title: "SaaS Dashboard UI",
        status: "published",
        updatedAt: "2026-03-27",
        summary: "Data-heavy admin dashboard with analytics widgets.",
      },
      {
        id: "portfolio-3",
        title: "Travel Booking App",
        status: "draft",
        updatedAt: "2026-03-29",
        summary: "Mobile-first booking flow with dynamic filters.",
      },
    ],
  },
  {
    key: "blog",
    title: "Blog",
    description: "Articles, thought leadership posts, and release notes.",
    items: [
      {
        id: "blog-1",
        title: "How We Design Fast Landing Pages",
        status: "published",
        updatedAt: "2026-03-12",
        summary: "Breakdown of performance and UX decisions.",
      },
      {
        id: "blog-2",
        title: "State Management Patterns in React",
        status: "draft",
        updatedAt: "2026-03-28",
        summary: "Comparing local state, context, and lightweight stores.",
      },
      {
        id: "blog-3",
        title: "Quarterly Product Updates - Q1 2026",
        status: "published",
        updatedAt: "2026-03-30",
        summary: "Feature launches, bug fixes, and roadmap notes.",
      },
    ],
  },
  {
    key: "services",
    title: "Services",
    description: "Service offerings and package details for your agency section.",
    items: [
      {
        id: "services-1",
        title: "Website Design Package",
        status: "published",
        updatedAt: "2026-03-17",
        summary: "Brand-aligned marketing site design and prototyping.",
      },
      {
        id: "services-2",
        title: "SEO Growth Plan",
        status: "draft",
        updatedAt: "2026-03-24",
        summary: "Monthly keyword strategy and technical audits.",
      },
    ],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description: "Client success quotes and social proof entries.",
    items: [
      {
        id: "testimonials-1",
        title: "Retail Brand Founder Quote",
        status: "published",
        updatedAt: "2026-03-08",
        summary: "Feedback on conversion uplift after redesign.",
      },
      {
        id: "testimonials-2",
        title: "Startup CTO Review",
        status: "draft",
        updatedAt: "2026-03-19",
        summary: "Comment on delivery speed and code quality.",
      },
    ],
  },
];
