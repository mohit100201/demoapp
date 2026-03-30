"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImagePlus, Plus, Sparkles, Trash2 } from "lucide-react";

import type { PageData, Section } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PageContentEditorProps = {
  pages: Record<string, PageData>;
  onChange: (nextPages: Record<string, PageData>) => void;
};

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const pageAccent: string[] = ["from-cyan-500/20", "from-emerald-500/20", "from-orange-500/20", "from-fuchsia-500/20"];

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toInputValue(value: JsonValue): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return "";
}

function titleFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (s) => s.toUpperCase());
}

function createFromSample(sample: JsonValue | undefined): JsonValue {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isObject(sample)) {
    const next: JsonObject = {};
    for (const [key, value] of Object.entries(sample)) {
      next[key] = createFromSample(value);
    }
    return next;
  }
  return "";
}

function createSection(pageKey: string, order: number): Section {
  return {
    id: `${pageKey}-section-${Date.now()}`,
    type: "content",
    visible: true,
    order,
    animate: true,
    data: {
      title: "New Section",
      content: "",
      image: "",
      imagePosition: "right",
    },
  } as Section;
}

function fileToDataUrl(file: File, onDone: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onDone(typeof reader.result === "string" ? reader.result : "");
  reader.readAsDataURL(file);
}

export default function PageContentEditor({ pages, onChange }: PageContentEditorProps) {
  const updatePage = (pageKey: string, updater: (current: PageData) => PageData) => {
    onChange({
      ...pages,
      [pageKey]: updater(pages[pageKey]),
    });
  };

  const updatePageField = (pageKey: string, field: keyof Omit<PageData, "sections">, value: string) => {
    updatePage(pageKey, (current) => ({ ...current, [field]: value }));
  };

  const addSection = (pageKey: string) => {
    updatePage(pageKey, (current) => ({
      ...current,
      sections: [...current.sections, createSection(pageKey, current.sections.length)],
    }));
  };

  const removeSection = (pageKey: string, sectionIndex: number) => {
    updatePage(pageKey, (current) => ({
      ...current,
      sections: current.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const updateSection = (pageKey: string, sectionIndex: number, updater: (section: Section) => Section) => {
    updatePage(pageKey, (current) => ({
      ...current,
      sections: current.sections.map((section, index) => (index === sectionIndex ? updater(section) : section)),
    }));
  };

  const updateSectionData = (pageKey: string, sectionIndex: number, updater: (data: JsonObject) => JsonObject) => {
    updateSection(pageKey, sectionIndex, (section) => {
      const currentData = isObject(section.data) ? section.data : {};
      return { ...section, data: updater(currentData) } as Section;
    });
  };

  const renderEditor = (
    value: JsonValue,
    pathLabel: string,
    onValueChange: (next: JsonValue) => void,
    keyName: string,
  ): React.ReactNode => {
    const isImageField = keyName.toLowerCase().includes("image");

    if (typeof value === "string") {
      const longText = value.length > 120 || keyName.toLowerCase().includes("content") || keyName.toLowerCase().includes("subtitle");
      return (
        <div className="space-y-2">
          <Label>{pathLabel}</Label>
          {longText ? (
            <Textarea value={value} rows={4} onChange={(event) => onValueChange(event.target.value)} />
          ) : (
            <Input value={value} onChange={(event) => onValueChange(event.target.value)} />
          )}
          {isImageField ? (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  fileToDataUrl(file, (dataUrl) => onValueChange(dataUrl));
                }}
              />
              {value ? (
                <div className="rounded border p-2">
                  <Image src={value} alt={pathLabel} width={300} height={112} unoptimized className="h-28 w-auto rounded object-cover" />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      );
    }

    if (typeof value === "number") {
      return (
        <div className="space-y-2">
          <Label>{pathLabel}</Label>
          <Input type="number" value={String(value)} onChange={(event) => onValueChange(Number(event.target.value))} />
        </div>
      );
    }

    if (typeof value === "boolean") {
      return (
        <label className="flex items-center gap-2 rounded-md border p-3 text-sm font-medium">
          <input type="checkbox" checked={value} onChange={(event) => onValueChange(event.target.checked)} />
          {pathLabel}
        </label>
      );
    }

    if (Array.isArray(value)) {
      const sample = value[0];

      return (
        <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">{pathLabel}</Label>
            <Button type="button" size="sm" variant="secondary" onClick={() => onValueChange([...value, createFromSample(sample)])}>
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {value.map((item, itemIndex) => (
              <div key={`${pathLabel}-${itemIndex}`} className="rounded-md border bg-background p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">Item {itemIndex + 1}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onValueChange(value.filter((_, index) => index !== itemIndex))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {renderEditor(
                  item,
                  `${pathLabel} Item`,
                  (nextItem) => onValueChange(value.map((existing, index) => (index === itemIndex ? nextItem : existing))),
                  keyName,
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isObject(value)) {
      return (
        <div className="space-y-3 rounded-lg border p-3">
          <p className="text-sm font-semibold">{pathLabel}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(value).map(([childKey, childValue]) => (
              <div key={`${pathLabel}-${childKey}`} className={Array.isArray(childValue) || isObject(childValue) ? "md:col-span-2" : ""}>
                {renderEditor(
                  childValue,
                  titleFromKey(childKey),
                  (nextChild) => onValueChange({ ...value, [childKey]: nextChild }),
                  childKey,
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Label>{pathLabel}</Label>
        <Input value={toInputValue(value)} onChange={(event) => onValueChange(event.target.value)} />
      </div>
    );
  };

  return (
    <section className="grid gap-6">
      {Object.entries(pages).map(([pageKey, page], pageIndex) => (
        <motion.div
          key={page.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: pageIndex * 0.05 }}
        >
          <Card className={`overflow-hidden border-2 bg-gradient-to-br ${pageAccent[pageIndex % pageAccent.length]} to-background shadow-lg`}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {page.title}
                </CardTitle>
                <Button type="button" onClick={() => addSection(pageKey)} className="shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </div>
              <CardDescription>User-friendly editor for {pageKey}: add services/items, upload images, and remove sections quickly.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-4 rounded-xl border bg-background/80 p-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input value={page.title} onChange={(event) => updatePageField(pageKey, "title", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={page.slug} onChange={(event) => updatePageField(pageKey, "slug", event.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea rows={3} value={page.description} onChange={(event) => updatePageField(pageKey, "description", event.target.value)} />
                </div>
              </div>

              <div className="space-y-4">
                {page.sections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border bg-background/90 p-4 shadow-sm"
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{section.type}</Badge>
                        <Badge variant="outline">Section {sectionIndex + 1}</Badge>
                      </div>
                      <Button type="button" size="sm" variant="outline" onClick={() => removeSection(pageKey, sectionIndex)}>
                        <Trash2 className="h-4 w-4" />
                        Remove Section
                      </Button>
                    </div>

                    <div className="mb-4 grid gap-3 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Section ID</Label>
                        <Input value={section.id} onChange={(event) => updateSection(pageKey, sectionIndex, (curr) => ({ ...curr, id: event.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Input
                          value={section.type}
                          onChange={(event) =>
                            updateSection(pageKey, sectionIndex, (curr) => ({ ...curr, type: event.target.value as Section["type"] }) as Section)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Order</Label>
                        <Input
                          type="number"
                          value={String(section.order)}
                          onChange={(event) => updateSection(pageKey, sectionIndex, (curr) => ({ ...curr, order: Number(event.target.value) }))}
                        />
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-5">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={section.visible}
                          onChange={(event) => updateSection(pageKey, sectionIndex, (curr) => ({ ...curr, visible: event.target.checked }))}
                        />
                        Visible
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={Boolean(section.animate)}
                          onChange={(event) => updateSection(pageKey, sectionIndex, (curr) => ({ ...curr, animate: event.target.checked }))}
                        />
                        Animate
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {Object.entries(isObject(section.data) ? section.data : {}).map(([fieldKey, fieldValue]) => (
                        <div key={`${section.id}-${fieldKey}`} className={Array.isArray(fieldValue) || isObject(fieldValue) ? "md:col-span-2" : ""}>
                          {renderEditor(
                            fieldValue,
                            titleFromKey(fieldKey),
                            (nextValue) =>
                              updateSectionData(pageKey, sectionIndex, (data) => ({
                                ...data,
                                [fieldKey]: nextValue,
                              })),
                            fieldKey,
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <ImagePlus className="h-3.5 w-3.5" />
                      Tip: Use image URL or upload directly for image fields.
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
