import { PageData, BlogPost, CaseStudy } from "@/types/content";

export const pages: Record<string, PageData> = {
  home: {
    id: "home",
    slug: "/",
    title: "Apex — Build the Future",
    description: "Premium digital solutions for modern businesses. We craft experiences that drive growth.",
    sections: [
      {
        id: "home-hero",
        type: "hero",
        visible: true,
        order: 0,
        animate: true,
        data: {
          badge: "Trusted by 500+ companies",
          title: "Build products that",
          highlightedText: "users love.",
          subtitle: "We help ambitious teams ship world-class digital experiences. From concept to launch, we bring your vision to life with precision engineering and bold design.",
          primaryCta: { text: "Start a Project", link: "/contact" },
          secondaryCta: { text: "View Our Work", link: "/portfolio" },
          stats: [
            { value: "500+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "12+", label: "Years Experience" },
            { value: "50+", label: "Team Members" },
          ],
        },
      },
      {
        id: "home-features",
        type: "features",
        visible: true,
        order: 1,
        animate: true,
        data: {
          badge: "What We Do",
          title: "Everything you need to scale",
          subtitle: "End-to-end digital solutions tailored to your business goals.",
          features: [
            { icon: "Layers", title: "Product Design", description: "User-centered design that converts. We craft intuitive interfaces backed by research and testing." },
            { icon: "Code", title: "Engineering", description: "Scalable, performant code built with modern technologies and battle-tested architectures." },
            { icon: "BarChart3", title: "Growth Strategy", description: "Data-driven strategies to acquire, engage, and retain your users at every touchpoint." },
            { icon: "Shield", title: "Security & DevOps", description: "Enterprise-grade infrastructure with automated deployments and 24/7 monitoring." },
            { icon: "Zap", title: "Performance", description: "Sub-second load times with optimized assets, CDN delivery, and edge computing." },
            { icon: "Globe", title: "Global Scale", description: "Multi-region deployments with localization support for worldwide audiences." },
          ],
        },
      },
      {
        id: "home-testimonials",
        type: "testimonials",
        visible: true,
        order: 2,
        animate: true,
        data: {
          title: "Loved by industry leaders",
          subtitle: "See what our clients say about working with us.",
          testimonials: [
            { quote: "Apex transformed our entire digital presence. The results exceeded every metric we set.", author: "Sarah Chen", role: "CEO, TechFlow", rating: 5 },
            { quote: "Their engineering team is world-class. They delivered a complex platform in half the expected time.", author: "Marcus Rivera", role: "CTO, DataScale", rating: 5 },
            { quote: "The design quality is unmatched. Our conversion rate jumped 340% after the redesign.", author: "Emily Zhang", role: "VP Product, Lumina", rating: 5 },
          ],
        },
      },
      {
        id: "home-cta",
        type: "cta",
        visible: true,
        order: 3,
        animate: true,
        data: {
          title: "Ready to build something extraordinary?",
          subtitle: "Let's discuss your next project and create something users will love.",
          primaryCta: { text: "Get in Touch", link: "/contact" },
          secondaryCta: { text: "View Pricing", link: "/services" },
        },
      },
    ],
  },
  about: {
    id: "about",
    slug: "/about",
    title: "About Apex",
    description: "Learn about our mission, team, and the values that drive us forward.",
    sections: [
      {
        id: "about-hero",
        type: "hero",
        visible: true,
        order: 0,
        animate: true,
        data: {
          title: "We're on a mission to",
          highlightedText: "redefine digital.",
          subtitle: "Founded in 2014, Apex has grown from a small studio to a global team of designers, engineers, and strategists united by one goal: building products that matter.",
          primaryCta: { text: "Join Our Team", link: "/contact" },
        },
      },
      {
        id: "about-content",
        type: "content",
        visible: true,
        order: 1,
        animate: true,
        data: {
          title: "Our Story",
          content: "What started as a two-person operation in a garage has evolved into a 50+ team spanning three continents. We've shipped over 500 products, helped startups become unicorns, and partnered with Fortune 500 companies to reinvent their digital experiences. Our approach is simple: understand deeply, design boldly, and engineer precisely.",
          image: "",
          imagePosition: "right",
        },
      },
      {
        id: "about-features",
        type: "features",
        visible: true,
        order: 2,
        animate: true,
        data: {
          title: "Our Values",
          features: [
            { icon: "Heart", title: "Craft Over Convenience", description: "We never take shortcuts. Every pixel, every line of code is intentional." },
            { icon: "Users", title: "Radical Collaboration", description: "We work as one team with our clients, breaking down silos and ego." },
            { icon: "Target", title: "Impact First", description: "We measure success by the real-world impact our work creates." },
            { icon: "Lightbulb", title: "Continuous Learning", description: "We invest 20% of our time in R&D and skill development." },
          ],
        },
      },
    ],
  },
  services: {
    id: "services",
    slug: "/services",
    title: "Our Services",
    description: "Comprehensive digital services from strategy to deployment.",
    sections: [
      {
        id: "services-hero",
        type: "hero",
        visible: true,
        order: 0,
        animate: true,
        data: {
          title: "Services built for",
          highlightedText: "ambitious teams.",
          subtitle: "From early-stage startups to enterprise organizations, we offer flexible engagement models to match your needs.",
        },
      },
      {
        id: "services-pricing",
        type: "pricing",
        visible: true,
        order: 1,
        animate: true,
        data: {
          title: "Transparent Pricing",
          subtitle: "Choose the engagement model that works for you.",
          plans: [
            {
              name: "Starter",
              price: "$5,000",
              period: "/project",
              description: "Perfect for MVPs and small projects.",
              features: ["UI/UX Design", "Frontend Development", "2 Revision Rounds", "1 Month Support"],
              cta: { text: "Get Started", link: "/contact" },
            },
            {
              name: "Growth",
              price: "$15,000",
              period: "/month",
              description: "For teams ready to scale fast.",
              features: ["Full-Stack Development", "Dedicated Team", "Weekly Sprints", "Priority Support", "Performance Optimization", "Analytics Dashboard"],
              highlighted: true,
              cta: { text: "Start Growing", link: "/contact" },
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large-scale, mission-critical projects.",
              features: ["Custom Architecture", "Dedicated PM", "24/7 Support", "SLA Guarantees", "Security Audits", "Multi-region Deploy"],
              cta: { text: "Contact Sales", link: "/contact" },
            },
          ],
        },
      },
      {
        id: "services-faq",
        type: "faq",
        visible: true,
        order: 2,
        animate: true,
        data: {
          title: "Frequently Asked Questions",
          faqs: [
            { question: "How long does a typical project take?", answer: "Project timelines vary based on scope. An MVP typically takes 6-8 weeks, while larger projects can span 3-6 months. We'll provide a detailed timeline during our discovery phase." },
            { question: "Do you work with startups?", answer: "Absolutely! About 40% of our clients are startups. We offer flexible pricing and can work within tighter budgets while maintaining quality." },
            { question: "What technologies do you use?", answer: "We're technology-agnostic and choose the best tools for each project. Our stack commonly includes React, TypeScript, Node.js, Python, and cloud services like AWS and GCP." },
            { question: "Can you take over an existing project?", answer: "Yes, we regularly take over and improve existing codebases. We start with a technical audit to understand the current state before proposing improvements." },
          ],
        },
      },
    ],
  },
  portfolio: {
    id: "portfolio",
    slug: "/portfolio",
    title: "Our Portfolio",
    description: "Explore our latest work across industries and technologies.",
    sections: [
      {
        id: "portfolio-hero",
        type: "hero",
        visible: true,
        order: 0,
        animate: true,
        data: {
          title: "Work that speaks",
          highlightedText: "for itself.",
          subtitle: "A selection of projects we're proud of. Each one represents a unique challenge solved with creativity and precision.",
        },
      },
      {
        id: "portfolio-gallery",
        type: "gallery",
        visible: true,
        order: 1,
        animate: true,
        data: {
          title: "Featured Projects",
          categories: ["All", "Web App", "Mobile", "Branding", "E-Commerce"],
          items: [
            { image: "", title: "DataFlow Dashboard", category: "Web App", description: "Real-time analytics platform processing 1M+ events daily.", link: "/case-studies/dataflow" },
            { image: "", title: "Lumina Mobile", category: "Mobile", description: "Social commerce app with 2M+ downloads in 6 months.", link: "/case-studies/lumina" },
            { image: "", title: "NexGen Rebrand", category: "Branding", description: "Complete brand overhaul for a Fortune 500 tech company.", link: "/case-studies/nexgen" },
            { image: "", title: "ShopWave", category: "E-Commerce", description: "Headless e-commerce platform with 99.99% uptime.", link: "/case-studies/shopwave" },
            { image: "", title: "HealthSync", category: "Web App", description: "Patient management system for 200+ clinics.", link: "/case-studies/healthsync" },
            { image: "", title: "FinTrack Pro", category: "Mobile", description: "Personal finance app with AI-powered insights.", link: "/case-studies/fintrack" },
          ],
        },
      },
    ],
  },
  contact: {
    id: "contact",
    slug: "/contact",
    title: "Contact Us",
    description: "Get in touch to discuss your next project.",
    sections: [
      {
        id: "contact-hero",
        type: "hero",
        visible: true,
        order: 0,
        animate: true,
        data: {
          title: "Let's build something",
          highlightedText: "great together.",
          subtitle: "Tell us about your project and we'll get back to you within 24 hours.",
        },
      },
      {
        id: "contact-form",
        type: "contact",
        visible: true,
        order: 1,
        animate: true,
        data: {
          title: "Send Us a Message",
          subtitle: "Fill out the form below and we'll be in touch shortly.",
          fields: [
            { name: "name", type: "text", label: "Full Name", required: true, placeholder: "John Doe" },
            { name: "email", type: "email", label: "Email Address", required: true, placeholder: "john@example.com" },
            { name: "company", type: "text", label: "Company", placeholder: "Your Company" },
            { name: "budget", type: "select", label: "Budget Range", placeholder: "Select a range" },
            { name: "message", type: "textarea", label: "Project Details", required: true, placeholder: "Tell us about your project..." },
          ],
          submitText: "Send Message",
        },
      },
    ],
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-web-development",
    title: "The Future of Web Development in 2026",
    excerpt: "Exploring the trends and technologies shaping the next generation of web applications.",
    content: "The web development landscape continues to evolve at a rapid pace. From edge computing to AI-assisted development, the tools and techniques we use are changing fundamentally...\n\nServer components, streaming SSR, and partial hydration are becoming standard patterns. The line between static and dynamic content is blurring as frameworks adopt hybrid rendering strategies.\n\nAI is not replacing developers—it's augmenting them. Code generation tools help with boilerplate while developers focus on architecture, user experience, and business logic.",
    category: "Technology",
    author: { name: "Alex Thompson" },
    publishedAt: "2026-03-15",
    tags: ["Web Dev", "Trends", "AI"],
  },
  {
    id: "2",
    slug: "design-systems-at-scale",
    title: "Building Design Systems That Actually Scale",
    excerpt: "Lessons learned from implementing design systems at Fortune 500 companies.",
    content: "A design system is only as good as its adoption. After building systems for dozens of enterprise clients, we've learned that the technical implementation is the easy part...\n\nThe real challenge is governance, documentation, and creating a culture of contribution. Token-based architectures and component APIs must be designed for flexibility without sacrificing consistency.",
    category: "Design",
    author: { name: "Maria Santos" },
    publishedAt: "2026-03-10",
    tags: ["Design Systems", "UI/UX", "Enterprise"],
  },
  {
    id: "3",
    slug: "startup-mvp-playbook",
    title: "The Startup MVP Playbook: Ship in 6 Weeks",
    excerpt: "A practical guide to building and launching your minimum viable product quickly.",
    content: "Speed matters in the startup world, but speed without direction is just chaos. Our MVP playbook balances velocity with quality...\n\nWeek 1-2: Discovery and architecture. Week 3-4: Core feature development. Week 5: Integration and testing. Week 6: Launch preparation and deployment.",
    category: "Startups",
    author: { name: "James Wu" },
    publishedAt: "2026-03-05",
    tags: ["Startups", "MVP", "Strategy"],
  },
  {
    id: "4",
    slug: "performance-optimization-guide",
    title: "Web Performance: From 6s to 600ms Load Time",
    excerpt: "How we achieved a 10x performance improvement for a high-traffic e-commerce platform.",
    content: "Performance isn't a feature—it's a requirement. Every 100ms of latency costs 1% in revenue. Here's how we systematically optimized a platform serving 10M monthly visitors...\n\nWe started with measurement, identifying the critical rendering path and eliminating render-blocking resources. Image optimization alone saved 40% of page weight.",
    category: "Engineering",
    author: { name: "Alex Thompson" },
    publishedAt: "2026-02-28",
    tags: ["Performance", "Optimization", "Engineering"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "dataflow",
    title: "DataFlow: Real-Time Analytics at Scale",
    client: "DataFlow Inc.",
    excerpt: "Building a real-time analytics dashboard processing over 1 million events per day.",
    content: "DataFlow needed a complete rebuild of their analytics platform to handle exponential growth. Their legacy system was struggling with 100K daily events—they needed to scale to 1M+.\n\nWe architected a new system using event streaming, real-time aggregation, and an optimized frontend that renders complex visualizations without dropping frames.\n\nThe result: a platform that handles 10x the load with 3x faster query times and a dashboard that users actually enjoy using.",
    image: "",
    results: [
      { metric: "Events/Day", value: "1M+" },
      { metric: "Query Speed", value: "3x Faster" },
      { metric: "User Adoption", value: "+280%" },
      { metric: "Downtime", value: "0 Hours" },
    ],
    tags: ["Analytics", "Real-Time", "Scale"],
  },
  {
    id: "2",
    slug: "lumina",
    title: "Lumina: Social Commerce Revolution",
    client: "Lumina App",
    excerpt: "Designing and building a social commerce app that reached 2M downloads in 6 months.",
    content: "Lumina had a vision for social commerce but needed a team to bring it to life. We took them from concept to App Store in 16 weeks.\n\nThe app combines live shopping, social feeds, and AI-powered recommendations in a seamless mobile experience. We built the entire stack: React Native frontend, Node.js microservices, and a real-time messaging system.",
    image: "",
    results: [
      { metric: "Downloads", value: "2M+" },
      { metric: "Time to Market", value: "16 Weeks" },
      { metric: "Avg Session", value: "12 min" },
      { metric: "Rating", value: "4.8 ★" },
    ],
    tags: ["Mobile", "Social", "Commerce"],
  },
];

// Simulated API functions
export const api = {
  getPage: async (slug: string): Promise<PageData | undefined> => {
    await new Promise((r) => setTimeout(r, 200));
    return Object.values(pages).find((p) => p.slug === slug);
  },
  getBlogPosts: async (): Promise<BlogPost[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return blogPosts;
  },
  getBlogPost: async (slug: string): Promise<BlogPost | undefined> => {
    await new Promise((r) => setTimeout(r, 150));
    return blogPosts.find((p) => p.slug === slug);
  },
  getCaseStudies: async (): Promise<CaseStudy[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return caseStudies;
  },
  getCaseStudy: async (slug: string): Promise<CaseStudy | undefined> => {
    await new Promise((r) => setTimeout(r, 150));
    return caseStudies.find((s) => s.slug === slug);
  },
};
