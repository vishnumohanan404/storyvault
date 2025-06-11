import { ArrowRight } from 'lucide-react';
import React from 'react';

const ExploreKanban = ({ id }: { id: string }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Kanban</h3>
        <p className="text-muted-foreground">
          Kanban board template to track your progress using Agile Userstories
        </p>
        <a
          className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-fit items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href={`/kanban/${id}`}
        >
          Try Kanban
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ExploreKanban;
