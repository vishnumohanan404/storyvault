import React from "react";
import { Badge } from "../ui/badge";

const PageHeaderSection = ({
  description,
  title,
  tags,
}: {
  description: string;
  title: string;
  tags?: string[];
}) => {
  return (
    <section className="space-y-3">
      {tags?.length && (
        <div className="flex gap-2">
          {tags?.map((item) => (
            <Badge key={item} variant="outline" className="rounded-2xl">
              {item}
            </Badge>
          ))}
        </div>
      )}
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </section>
  );
};

export default PageHeaderSection;
