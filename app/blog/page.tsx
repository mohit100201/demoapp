import Link from "next/link";
import { blogPosts } from "@/data/siteContent";

export default function BlogPage() {
  return (
    <section className="container-wide py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
      <p className="mt-3 text-muted-foreground">Insights, playbooks, and product stories from our team.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-border p-5 bg-card">
            <p className="text-xs text-muted-foreground">
              {post.category} • {post.publishedAt}
            </p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm text-primary hover:underline">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
