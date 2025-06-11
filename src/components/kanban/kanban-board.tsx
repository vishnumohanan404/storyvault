'use client';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Download, Github, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { KanbanCard } from './kanban-card';
import { KanbanColumn } from './kanban-column';
import { StoryDrawer } from './story-drawer';

interface KanbanBoardProps {
  projectId?: string;
}

// Project-specific board data
const projectBoardData = {
  'gitops-aws-pipeline': {
    project: 'gitops-aws-pipeline',
    columns: [
      { id: 'backlog', title: 'Backlog', color: 'gray' },
      { id: 'ready', title: 'Ready', color: 'blue' },
      { id: 'in-progress', title: 'In Progress', color: 'yellow' },
      { id: 'in-review', title: 'In Review', color: 'purple' },
      { id: 'done', title: 'Done', color: 'green' },
    ],
    stories: [
      {
        id: 'us1',
        title: 'Set Up Git Repository',
        status: 'Complete',
        estimate: '1 day',
        labels: ['M'],
        column: 'done',
        description:
          'Set up GitLab repository with proper structure for GitOps workflow including branches, protection rules, and initial documentation.',
      },
      {
        id: 'us2',
        title: 'Infrastructure as Code Setup',
        status: 'Complete',
        estimate: '3 days',
        labels: ['L'],
        column: 'done',
        description:
          'Create Terraform configurations for AWS infrastructure including VPC, EKS cluster, and supporting services.',
      },
      {
        id: 'us3',
        title: 'CI/CD Pipeline Configuration',
        status: 'Complete',
        estimate: '2 days',
        labels: ['M'],
        column: 'done',
        description:
          'Configure GitLab CI/CD pipeline for automated testing, building, and deployment of applications.',
      },
      {
        id: 'us4',
        title: 'ArgoCD Installation & Setup',
        status: 'Complete',
        estimate: '2 days',
        labels: ['M'],
        column: 'done',
        description:
          'Install and configure ArgoCD for GitOps continuous deployment with proper RBAC and security settings.',
      },
      {
        id: 'us5',
        title: 'Application Deployment',
        status: 'Complete',
        estimate: '1 day',
        labels: ['S'],
        column: 'done',
        description:
          'Deploy sample application using GitOps principles with ArgoCD managing the deployment lifecycle.',
      },
      {
        id: 'us6',
        title: 'Monitoring & Observability',
        status: 'Complete',
        estimate: '3 days',
        labels: ['L'],
        column: 'done',
        description:
          'Implement comprehensive monitoring with Prometheus, Grafana, and logging solutions for full observability.',
      },
      {
        id: 'us7',
        title: 'Security Implementation',
        status: 'Complete',
        estimate: '2 days',
        labels: ['M'],
        column: 'done',
        description:
          'Implement security best practices including RBAC, network policies, and vulnerability scanning.',
      },
      {
        id: 'us8',
        title: 'Documentation & Testing',
        status: 'Complete',
        estimate: '2 days',
        labels: ['M'],
        column: 'done',
        description:
          'Create comprehensive documentation and implement automated testing for the entire GitOps pipeline.',
      },
    ],
  },
  'microservices-k8s': {
    project: 'microservices-k8s',
    columns: [
      { id: 'backlog', title: 'Backlog', color: 'gray' },
      { id: 'ready', title: 'Ready', color: 'blue' },
      { id: 'in-progress', title: 'In Progress', color: 'yellow' },
      { id: 'in-review', title: 'In Review', color: 'purple' },
      { id: 'done', title: 'Done', color: 'green' },
    ],
    stories: [
      {
        id: 'us1',
        title: 'Microservices Architecture Design',
        status: 'Complete',
        estimate: '2 days',
        labels: ['L'],
        column: 'done',
        description:
          'Design the overall microservices architecture with service boundaries and communication patterns.',
      },
      {
        id: 'us2',
        title: 'Service Mesh Implementation',
        status: 'In Progress',
        estimate: '3 days',
        labels: ['L'],
        column: 'in-progress',
        description:
          'Implement Istio service mesh for traffic management, security, and observability.',
      },
      {
        id: 'us3',
        title: 'API Gateway Setup',
        status: 'Ready',
        estimate: '2 days',
        labels: ['M'],
        column: 'ready',
        description:
          'Configure API gateway for external traffic routing and rate limiting.',
      },
      {
        id: 'us4',
        title: 'Service Discovery',
        status: 'Ready',
        estimate: '1 day',
        labels: ['S'],
        column: 'ready',
        description:
          'Implement service discovery mechanism for dynamic service registration.',
      },
      {
        id: 'us5',
        title: 'Distributed Tracing',
        status: 'Draft',
        estimate: '2 days',
        labels: ['M'],
        column: 'backlog',
        description:
          'Set up distributed tracing with Jaeger for request flow visibility.',
      },
    ],
  },
};

// Default board data for unknown projects
const defaultBoardData = {
  project: 'default',
  columns: [
    { id: 'backlog', title: 'Backlog', color: 'gray' },
    { id: 'ready', title: 'Ready', color: 'blue' },
    { id: 'in-progress', title: 'In Progress', color: 'yellow' },
    { id: 'in-review', title: 'In Review', color: 'purple' },
    { id: 'done', title: 'Done', color: 'green' },
  ],
  stories: [
    {
      id: 'us1',
      title: 'Sample User Story',
      status: 'Draft',
      estimate: '1 day',
      labels: ['M'],
      column: 'backlog',
      description:
        'This is a sample user story to demonstrate the Kanban board functionality.',
    },
  ],
};
const exportToGitHub = () => {
  // Placeholder for GitHub export functionality
  toast.info('GitHub export will be available in Phase 2 with authentication');
};
export function KanbanBoard({ projectId = 'default' }: KanbanBoardProps) {
  const initialData =
    projectBoardData[projectId as keyof typeof projectBoardData] ||
    defaultBoardData;
  const [boardData, setBoardData] = useState(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // Load board state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedBoard = localStorage.getItem(`kanban-board-state-${projectId}`);
    if (savedBoard) {
      try {
        setBoardData(JSON.parse(savedBoard));
      } catch (error) {
        console.error('Failed to load board state:', error);
      }
    }
  }, [projectId]);

  // Save board state to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        `kanban-board-state-${projectId}`,
        JSON.stringify(boardData),
      );
    }
  }, [boardData, mounted, projectId]);

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
    // eslint-disable-next-line unicorn/prefer-array-some
    const activeStory = boardData.stories.find(story => story.id === activeId);
    if (!activeStory) return;

    // Determine the target column
    let targetColumn = overId;
    if (!boardData.columns.some(col => col.id === overId)) {
      // If dropped on a story, find its column
      const targetStory = boardData.stories.find(story => story.id === overId);
      if (targetStory) {
        targetColumn = targetStory.column;
      } else {
        return;
      }
    }

    // Update the story's column
    setBoardData(previous => ({
      ...previous,
      stories: previous.stories.map(story =>
        story.id === activeId ? { ...story, column: targetColumn } : story,
      ),
    }));

    toast.success(
      `Moved "${activeStory.title}" to ${
        boardData.columns.find(col => col.id === targetColumn)?.title
      }`,
    );
  };

  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    setIsDrawerOpen(true);
  };

  const handleStoryUpdate = (updatedStory: any) => {
    setBoardData(previous => ({
      ...previous,
      stories: previous.stories.map(story =>
        story.id === updatedStory.id ? updatedStory : story,
      ),
    }));
    setSelectedStory(updatedStory);
    toast.success(`Updated "${updatedStory.title}"`);
  };

  const resetBoard = () => {
    setBoardData(initialData);
    localStorage.removeItem(`kanban-board-state-${projectId}`);
    toast.success('Board reset to initial state');
  };

  const downloadBoard = () => {
    const dataString = JSON.stringify(boardData, null, 2);
    const dataBlob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanban-board-${projectId}-${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Board exported as JSON file');
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="bg-muted h-8 animate-pulse rounded" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-muted h-12 animate-pulse rounded" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-muted h-24 animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeStory = boardData.stories.find(story => story.id === activeId);

  return (
    <div className="space-y-6">
      {/* Board Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Board Controls</CardTitle>
              <CardDescription>
                Manage your board state and export options. Click on any story
                card to view details.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={resetBoard}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={downloadBoard}>
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
              <Button variant="outline" size="sm" onClick={exportToGitHub}>
                <Github className="mr-2 h-4 w-4" />
                Export to GitHub
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex items-center space-x-4 text-sm">
            <span>Total Stories: {boardData.stories.length}</span>
            <span>•</span>
            <span>
              Completed:{' '}
              {boardData.stories.filter(s => s.column === 'done').length}
            </span>
            <span>•</span>
            <span>
              In Progress:{' '}
              {boardData.stories.filter(s => s.column === 'in-progress').length}
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {boardData.columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              stories={boardData.stories.filter(
                story => story.column === column.id,
              )}
              onStoryClick={handleStoryClick}
            />
          ))}
        </div>

        <DragOverlay>
          {activeStory ? <KanbanCard story={activeStory} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Story Detail Drawer */}
      <StoryDrawer
        story={selectedStory}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdate={handleStoryUpdate}
      />
    </div>
  );
}
