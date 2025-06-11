import PageHeaderSection from '@/components/layout/page-header-section';
import React from 'react';
import { KanbanBoard } from '@/components/kanban/kanban-board';

const KanbanPage = () => {
  return (
    <main className="mx-auto mb-5 min-h-screen max-w-7xl space-y-8 py-8">
      <PageHeaderSection
        title="Interactive Kanban Board"
        description="Experience hands-on project management with our interactive Kanban board. Drag and drop user stories between columns, and export your board state to GitHub Projects or download as JSON."
      />
      <KanbanBoard />
    </main>
  );
};

export default KanbanPage;
