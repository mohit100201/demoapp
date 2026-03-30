import { BadgeCheck, FileText } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentSection } from "@/components/admin/types";

type SectionDataCardProps = {
  section: ContentSection;
};

export default function SectionDataCard({ section }: SectionDataCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">{section.title}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {section.items.map((item) => (
          <article key={item.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.status === "published"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.status === "published" ? <BadgeCheck className="mr-1 h-3.5 w-3.5" /> : <FileText className="mr-1 h-3.5 w-3.5" />}
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{item.summary}</p>
            <p className="mt-2 text-xs text-muted-foreground">Updated: {item.updatedAt}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
