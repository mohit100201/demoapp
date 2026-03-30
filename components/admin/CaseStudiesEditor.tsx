"use client";

import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import type { CaseStudy } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CaseStudiesEditorProps = {
  caseStudies: CaseStudy[];
  onChange: (nextCaseStudies: CaseStudy[]) => void;
};

export default function CaseStudiesEditor({ caseStudies, onChange }: CaseStudiesEditorProps) {
  const createNewCaseStudy = (): CaseStudy => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return {
      id: uniqueId,
      slug: `new-case-study-${uniqueId}`,
      title: "New Case Study",
      client: "",
      excerpt: "",
      content: "",
      image: "",
      results: [],
      tags: [],
    };
  };

  const updateCaseStudy = (index: number, patch: Partial<CaseStudy>) => {
    onChange(caseStudies.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item)));
  };

  const handleImageUpload = (index: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateCaseStudy(index, { image: typeof reader.result === "string" ? reader.result : "" });
    };
    reader.readAsDataURL(file);
  };

  const addCaseStudy = () => onChange([...caseStudies, createNewCaseStudy()]);
  const removeCaseStudy = (index: number) => onChange(caseStudies.filter((_, currentIndex) => currentIndex !== index));

  const addResult = (index: number) => {
    const current = caseStudies[index];
    updateCaseStudy(index, { results: [...current.results, { metric: "New Metric", value: "" }] });
  };

  const updateResult = (index: number, resultIndex: number, field: "metric" | "value", value: string) => {
    const current = caseStudies[index];
    updateCaseStudy(index, {
      results: current.results.map((result, currentIndex) =>
        currentIndex === resultIndex ? { ...result, [field]: value } : result,
      ),
    });
  };

  const removeResult = (index: number, resultIndex: number) => {
    const current = caseStudies[index];
    updateCaseStudy(index, {
      results: current.results.filter((_, currentIndex) => currentIndex !== resultIndex),
    });
  };

  return (
    <section className="grid gap-4">
      <div className="flex justify-end">
        <Button type="button" onClick={addCaseStudy}>
          <Plus className="h-4 w-4" />
          Add Case Study
        </Button>
      </div>

      {caseStudies.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-2 bg-gradient-to-br from-sky-500/10 to-background shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                  Client: {item.client || "N/A"} | Slug: <span className="font-mono text-xs">{item.slug}</span>
                </CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => removeCaseStudy(index)}>
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`case-image-${item.id}`}>Image URL</Label>
                  <Input
                    id={`case-image-${item.id}`}
                    value={item.image ?? ""}
                    onChange={(event) => updateCaseStudy(index, { image: event.target.value })}
                    placeholder="https://example.com/case-study.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`case-image-file-${item.id}`}>Upload Image</Label>
                  <Input
                    id={`case-image-file-${item.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(index, event.target.files?.[0])}
                  />
                </div>
              </div>

              {item.image ? (
                <div className="rounded-md border p-2">
                  <Image src={item.image} alt={item.title} width={320} height={112} unoptimized className="h-28 w-auto rounded object-cover" />
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`case-title-${item.id}`}>Title</Label>
                  <Input id={`case-title-${item.id}`} value={item.title} onChange={(event) => updateCaseStudy(index, { title: event.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`case-slug-${item.id}`}>Slug</Label>
                  <Input id={`case-slug-${item.id}`} value={item.slug} onChange={(event) => updateCaseStudy(index, { slug: event.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`case-client-${item.id}`}>Client</Label>
                <Input id={`case-client-${item.id}`} value={item.client} onChange={(event) => updateCaseStudy(index, { client: event.target.value })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`case-excerpt-${item.id}`}>Excerpt</Label>
                <Textarea id={`case-excerpt-${item.id}`} rows={3} value={item.excerpt} onChange={(event) => updateCaseStudy(index, { excerpt: event.target.value })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`case-content-${item.id}`}>Content</Label>
                <Textarea id={`case-content-${item.id}`} rows={8} value={item.content} onChange={(event) => updateCaseStudy(index, { content: event.target.value })} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Results</Label>
                  <Button type="button" size="sm" variant="secondary" onClick={() => addResult(index)}>
                    <Plus className="h-4 w-4" />
                    Add Result
                  </Button>
                </div>
                <div className="space-y-2 rounded-md border bg-muted/30 p-3">
                  {item.results.map((result, resultIndex) => (
                    <div key={`${item.id}-result-${resultIndex}`} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                      <Input
                        value={result.metric}
                        onChange={(event) => updateResult(index, resultIndex, "metric", event.target.value)}
                        placeholder="Metric name"
                      />
                      <Input
                        value={result.value}
                        onChange={(event) => updateResult(index, resultIndex, "value", event.target.value)}
                        placeholder="Metric value"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeResult(index, resultIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {item.results.length === 0 ? <p className="text-xs text-muted-foreground">No results added yet.</p> : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`case-tags-${item.id}`}>Tags (comma separated)</Label>
                <Input
                  id={`case-tags-${item.id}`}
                  value={(item.tags ?? []).join(", ")}
                  onChange={(event) =>
                    updateCaseStudy(index, {
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
