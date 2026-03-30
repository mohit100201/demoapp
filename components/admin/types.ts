export type ContentItem = {
  id: string;
  title: string;
  status: "draft" | "published";
  updatedAt: string;
  summary: string;
};

export type ContentSection = {
  key: string;
  title: string;
  description: string;
  items: ContentItem[];
};
