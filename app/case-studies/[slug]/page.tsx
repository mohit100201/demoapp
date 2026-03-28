import { notFound } from "next/navigation";
import { caseStudies } from "@/data/siteContent";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <article className="container-wide py-16 md:py-24">
      <p className="text-xs text-muted-foreground">{study.client}</p>
      <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">{study.title}</h1>
      <p className="mt-4 text-muted-foreground">{study.excerpt}</p>
      <div className="mt-8 whitespace-pre-line leading-7 text-foreground/90">{study.content}</div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {study.results.map((result) => (
          <div key={result.metric} className="rounded-xl border border-border p-4 bg-card">
            <p className="text-xs text-muted-foreground">{result.metric}</p>
            <p className="mt-1 text-lg font-semibold">{result.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
