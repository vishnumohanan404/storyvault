import { ArrowRight } from 'lucide-react';
import React from 'react';

const ExploreArchitecture = async ({ id }: { id: string }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">System Architecture</h3>
        <p className="text-muted-foreground">
          Dive deep into the technical architecture, infrastructure design, and
          implementation patterns used in this project.
        </p>
        <a
          className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-fit items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          href={`/project/${id}/architecture`}
        >
          View Architecture
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ExploreArchitecture;
