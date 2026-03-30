"use client";

import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import type { BlogPost } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BlogPostsEditorProps = {
  posts: BlogPost[];
  onChange: (nextPosts: BlogPost[]) => void;
};

export default function BlogPostsEditor({ posts, onChange }: BlogPostsEditorProps) {
  const createNewPost = (): BlogPost => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return {
      id: uniqueId,
      slug: `new-post-${uniqueId}`,
      title: "New Blog Post",
      excerpt: "",
      content: "",
      category: "General",
      author: { name: "Admin" },
      publishedAt: new Date().toISOString().slice(0, 10),
      image: "",
      tags: [],
    };
  };

  const updatePost = (index: number, patch: Partial<BlogPost>) => {
    onChange(posts.map((post, currentIndex) => (currentIndex === index ? { ...post, ...patch } : post)));
  };

  const handleImageUpload = (index: number, file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updatePost(index, { image: typeof reader.result === "string" ? reader.result : "" });
    };
    reader.readAsDataURL(file);
  };

  const addPost = () => {
    onChange([...posts, createNewPost()]);
  };

  const removePost = (index: number) => {
    onChange(posts.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <section className="grid gap-4">
      <div className="flex justify-end">
        <Button type="button" onClick={addPost}>
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>

      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-2 bg-gradient-to-br from-violet-500/10 to-background shadow-md">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Slug: <span className="font-mono text-xs">{post.slug}</span>
              </CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => removePost(index)}>
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`blog-author-${post.id}`}>Author</Label>
                <Input
                  id={`blog-author-${post.id}`}
                  value={post.author.name}
                  onChange={(event) => updatePost(index, { author: { ...post.author, name: event.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`blog-image-${post.id}`}>Image URL</Label>
                <Input
                  id={`blog-image-${post.id}`}
                  value={post.image ?? ""}
                  onChange={(event) => updatePost(index, { image: event.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`blog-image-file-${post.id}`}>Upload Image</Label>
              <Input
                id={`blog-image-file-${post.id}`}
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(index, event.target.files?.[0])}
              />
              {post.image ? (
                <div className="rounded-md border p-2">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={320}
                    height={112}
                    unoptimized
                    className="h-28 w-auto rounded object-cover"
                  />
                </div>
              ) : null}
            </div>

            <CardDescription>
              Edit post content below.
            </CardDescription>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`blog-title-${post.id}`}>Title</Label>
                <Input
                  id={`blog-title-${post.id}`}
                  value={post.title}
                  onChange={(event) => updatePost(index, { title: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`blog-slug-${post.id}`}>Slug</Label>
                <Input
                  id={`blog-slug-${post.id}`}
                  value={post.slug}
                  onChange={(event) => updatePost(index, { slug: event.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`blog-category-${post.id}`}>Category</Label>
                <Input
                  id={`blog-category-${post.id}`}
                  value={post.category}
                  onChange={(event) => updatePost(index, { category: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`blog-date-${post.id}`}>Published At</Label>
                <Input
                  id={`blog-date-${post.id}`}
                  value={post.publishedAt}
                  onChange={(event) => updatePost(index, { publishedAt: event.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`blog-excerpt-${post.id}`}>Excerpt</Label>
              <Textarea
                id={`blog-excerpt-${post.id}`}
                rows={3}
                value={post.excerpt}
                onChange={(event) => updatePost(index, { excerpt: event.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`blog-content-${post.id}`}>Content</Label>
              <Textarea
                id={`blog-content-${post.id}`}
                rows={8}
                value={post.content}
                onChange={(event) => updatePost(index, { content: event.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`blog-tags-${post.id}`}>Tags (comma separated)</Label>
              <Input
                id={`blog-tags-${post.id}`}
                value={(post.tags ?? []).join(", ")}
                onChange={(event) =>
                  updatePost(index, {
                    tags: event.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
        </motion.div>
      ))}
    </section>
  );
}
