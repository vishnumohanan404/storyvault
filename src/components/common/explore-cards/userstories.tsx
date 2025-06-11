import { ArrowRight } from 'lucide-react';
import React from 'react';

const ExploreUserstories = ({ id }: { id: string }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">User Stories</h3>
        <p className="text-muted-foreground">
          Explore the detailed breakdown of development phases, user
          requirements, and implementation strategies.
        </p>
        <a
          className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-fit items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          href={`/project/${id}/userstories`}
        >
          Try User Stories
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ExploreUserstories;
