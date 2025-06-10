import PageHeaderSection from "@/components/layout/page-header-section";
import React from "react";
import { KanbanBoard } from "@/components/kanban/kanban-board";

const KanbanPage = () => {
  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title="Interactive Kanban Board"
        description="Experience hands-on project management with our interactive Kanban board. Drag and drop user stories between columns, and export your board state to GitHub Projects or download as JSON."
      />
      <KanbanBoard />
    </main>
  );
};

export default KanbanPage;
