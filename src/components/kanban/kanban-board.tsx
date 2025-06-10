"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Github, RotateCcw } from "lucide-react";
import { toast } from "sonner";

// Initial board data
const initialBoardData = {
  project: "gitops-aws-pipeline",
  columns: [
    { id: "backlog", title: "Backlog", color: "gray" },
    { id: "ready", title: "Ready", color: "blue" },
    { id: "in-progress", title: "In Progress", color: "yellow" },
    { id: "in-review", title: "In Review", color: "purple" },
    { id: "done", title: "Done", color: "green" },
  ],
  stories: [
    {
      id: "us1",
      title: "Set Up Git Repository",
      status: "Draft",
      estimate: "1 day",
      labels: ["M"],
      column: "backlog",
      description:
        "Set up GitLab repository with proper structure for GitOps workflow including branches, protection rules, and initial documentation.",
    },
    {
      id: "us2",
      title: "Infrastructure as Code Setup",
      status: "Draft",
      estimate: "3 days",
      labels: ["L"],
      column: "backlog",
      description:
        "Create Terraform configurations for AWS infrastructure including VPC, EKS cluster, and supporting services.",
    },
    {
      id: "us3",
      title: "CI/CD Pipeline Configuration",
      status: "Draft",
      estimate: "2 days",
      labels: ["M"],
      column: "backlog",
      description:
        "Configure GitLab CI/CD pipeline for automated testing, building, and deployment of applications.",
    },
    {
      id: "us4",
      title: "ArgoCD Installation & Setup",
      status: "Draft",
      estimate: "2 days",
      labels: ["M"],
      column: "backlog",
      description:
        "Install and configure ArgoCD for GitOps continuous deployment with proper RBAC and security settings.",
    },
    {
      id: "us5",
      title: "Application Deployment",
      status: "Draft",
      estimate: "1 day",
      labels: ["S"],
      column: "backlog",
      description:
        "Deploy sample application using GitOps principles with ArgoCD managing the deployment lifecycle.",
    },
    {
      id: "us6",
      title: "Monitoring & Observability",
      status: "Draft",
      estimate: "3 days",
      labels: ["L"],
      column: "backlog",
      description:
        "Implement comprehensive monitoring with Prometheus, Grafana, and logging solutions for full observability.",
    },
    {
      id: "us7",
      title: "Security Implementation",
      status: "Draft",
      estimate: "2 days",
      labels: ["M"],
      column: "backlog",
      description:
        "Implement security best practices including RBAC, network policies, and vulnerability scanning.",
    },
    {
      id: "us8",
      title: "Documentation & Testing",
      status: "Draft",
      estimate: "2 days",
      labels: ["M"],
      column: "backlog",
      description:
        "Create comprehensive documentation and implement automated testing for the entire GitOps pipeline.",
    },
  ],
};

export function KanbanBoard() {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load board state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedBoard = localStorage.getItem("kanban-board-state");
    if (savedBoard) {
      try {
        setBoardData(JSON.parse(savedBoard));
      } catch (error) {
        console.error("Failed to load board state:", error);
      }
    }
  }, []);

  // Save board state to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("kanban-board-state", JSON.stringify(boardData));
    }
  }, [boardData, mounted]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active story
    const activeStory = boardData.stories.find(
      (story) => story.id === activeId
    );
    if (!activeStory) return;

    // Determine the target column
    let targetColumn = overId;
    if (!boardData.columns.find((col) => col.id === overId)) {
      // If dropped on a story, find its column
      const targetStory = boardData.stories.find(
        (story) => story.id === overId
      );
      if (targetStory) {
        targetColumn = targetStory.column;
      } else {
        return;
      }
    }

    // Update the story's column
    setBoardData((prev) => ({
      ...prev,
      stories: prev.stories.map((story) =>
        story.id === activeId ? { ...story, column: targetColumn } : story
      ),
    }));

    toast.success(
      `Moved "${activeStory.title}" to ${
        boardData.columns.find((col) => col.id === targetColumn)?.title
      }`
    );
  };

  const resetBoard = () => {
    setBoardData(initialBoardData);
    localStorage.removeItem("kanban-board-state");
    toast.success("Board reset to initial state");
  };

  const downloadBoard = () => {
    const dataStr = JSON.stringify(boardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanban-board-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Board exported as JSON file");
  };

  const exportToGitHub = () => {
    // Placeholder for GitHub export functionality
    toast.info(
      "GitHub export will be available in Phase 2 with authentication"
    );
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-12 bg-muted animate-pulse rounded" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-24 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeStory = boardData.stories.find((story) => story.id === activeId);

  return (
    <div className="space-y-6">
      {/* Board Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Board Controls</CardTitle>
              <CardDescription>
                Manage your board state and export options
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={resetBoard}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={downloadBoard}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
              <Button variant="outline" size="sm" onClick={exportToGitHub}>
                <Github className="h-4 w-4 mr-2" />
                Export to GitHub
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Total Stories: {boardData.stories.length}</span>
            <span>•</span>
            <span>
              Completed:{" "}
              {boardData.stories.filter((s) => s.column === "done").length}
            </span>
            <span>•</span>
            <span>
              In Progress:{" "}
              {
                boardData.stories.filter((s) => s.column === "in-progress")
                  .length
              }
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {boardData.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              stories={boardData.stories.filter(
                (story) => story.column === column.id
              )}
            />
          ))}
        </div>

        <DragOverlay>
          {activeStory ? <KanbanCard story={activeStory} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
