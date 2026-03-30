import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentSection } from "@/components/admin/types";

type SectionSummaryProps = {
  sections: ContentSection[];
};

export default function SectionSummary({ sections }: SectionSummaryProps) {
  const totalItems = sections.reduce((count, section) => count + section.items.length, 0);
  const publishedItems = sections.reduce(
    (count, section) => count + section.items.filter((item) => item.status === "published").length,
    0,
  );
  const draftItems = totalItems - publishedItems;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{sections.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Published</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600">{publishedItems}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-amber-600">{draftItems}</p>
        </CardContent>
      </Card>
    </div>
  );
}
