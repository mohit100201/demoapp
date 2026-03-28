import Link from "next/link";
import { caseStudies } from "@/data/siteContent";

export default function CaseStudiesPage() {
  return (
    <section className="container-wide py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold">Case Studies</h1>
      <p className="mt-3 text-muted-foreground">How we ship measurable business outcomes.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {caseStudies.map((study) => (
          <article key={study.id} className="rounded-2xl border border-border p-5 bg-card">
            <p className="text-xs text-muted-foreground">{study.client}</p>
            <h2 className="mt-2 text-xl font-semibold">{study.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{study.excerpt}</p>
            <Link href={`/case-studies/${study.slug}`} className="mt-4 inline-block text-sm text-primary hover:underline">
              View case study
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
