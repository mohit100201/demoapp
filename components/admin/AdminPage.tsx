"use client";

import { useState } from "react";

import BlogPostsEditor from "@/components/admin/BlogPostsEditor";
import CaseStudiesEditor from "@/components/admin/CaseStudiesEditor";
import PageContentEditor from "@/components/admin/PageContentEditor";
import { blogPosts as initialBlogPosts, caseStudies as initialCaseStudies, pages as initialPages } from "@/data/siteContent";
import type { BlogPost, CaseStudy, PageData } from "@/types/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default function AdminPage() {
  const [pages, setPages] = useState<Record<string, PageData>>(() => cloneDeep(initialPages));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => cloneDeep(initialBlogPosts));
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => cloneDeep(initialCaseStudies));
  const pageTabs = ["home", "about", "services", "portfolio"] as const;

  const updateSinglePage = (pageKey: string) => (nextPageRecord: Record<string, PageData>) => {
    const updated = nextPageRecord[pageKey];
    if (!updated) return;
    setPages((prev) => ({
      ...prev,
      [pageKey]: updated,
    }));
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dynamic Content Admin</h1>
        <p className="text-sm text-muted-foreground">
          Edit all website content here. Changes are in local state only right now and are not saved to API/database.
        </p>
      </header>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="mb-3">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        {pageTabs.map((pageKey) => (
          <TabsContent key={pageKey} value={pageKey}>
            {pages[pageKey] ? <PageContentEditor pages={{ [pageKey]: pages[pageKey] }} onChange={updateSinglePage(pageKey)} /> : null}
          </TabsContent>
        ))}

        <TabsContent value="blog">
          <BlogPostsEditor posts={blogPosts} onChange={setBlogPosts} />
        </TabsContent>

        <TabsContent value="case-studies">
          <CaseStudiesEditor caseStudies={caseStudies} onChange={setCaseStudies} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
