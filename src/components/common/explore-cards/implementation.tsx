import { ArrowRight } from "lucide-react";
import React from "react";

const ExploreImplementation = ({ id }: { id: string }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Implementation Guide</h3>
        <p className="text-muted-foreground">
          Step-by-step process to guide you through this project from step one
          to production.
        </p>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-fit"
          href={`/project/${id}/implementation`}
        >
          View Guide
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ExploreImplementation;
