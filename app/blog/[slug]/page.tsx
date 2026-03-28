import { notFound } from "next/navigation";
import { blogPosts } from "@/data/siteContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-wide py-16 md:py-24">
      <p className="text-xs text-muted-foreground">
        {post.category} • {post.publishedAt}
      </p>
      <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
      <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
      <div className="mt-8 whitespace-pre-line leading-7 text-foreground/90">{post.content}</div>
    </article>
  );
}
