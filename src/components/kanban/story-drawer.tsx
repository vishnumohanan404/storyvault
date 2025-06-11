'use client';

import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  Flag,
  Tag,
  Target,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  status: string;
  estimate: string;
  labels: string[];
  column: string;
  description: string;
  acceptanceCriteria?: string[];
  tasks?: string[];
  priority?: string;
  assignee?: string;
  reporter?: string;
  created?: string;
  updated?: string;
}

interface StoryDrawerProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (story: Story) => void;
}

const labelColors = {
  S: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  M: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  L: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const statusColors = {
  Complete:
    'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  'In Progress':
    'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Ready:
    'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  Draft: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
};

const priorityColors = {
  High: 'text-red-600 dark:text-red-400',
  Medium: 'text-yellow-600 dark:text-yellow-400',
  Low: 'text-green-600 dark:text-green-400',
};

// Extended story data with additional details
const getExtendedStoryData = (story: Story) => {
  const baseData = {
    acceptanceCriteria: [
      'Feature should be fully functional',
      'All tests should pass',
      'Documentation should be updated',
      'Code review should be completed',
    ],
    tasks: [
      'Research and planning',
      'Implementation',
      'Testing',
      'Documentation',
    ],
    priority: 'Medium',
    assignee: 'DevOps Team',
    reporter: 'Product Owner',
    created: '2024-01-01',
    updated: '2024-01-15',
  };

  // Project-specific story details
  const storyDetails: Record<string, Partial<Story>> = {
    us1: {
      acceptanceCriteria: [
        'GitLab repository created with proper naming convention',
        'Branch protection rules configured for main branch',
        'Initial README and documentation structure in place',
        'GitOps workflow directory structure established',
      ],
      tasks: [
        'Create GitLab repository',
        'Configure branch protection',
        'Set up initial documentation',
        'Create GitOps directory structure',
      ],
      priority: 'High',
      assignee: 'DevOps Engineer',
      reporter: 'Tech Lead',
    },
    us2: {
      acceptanceCriteria: [
        'Terraform modules created for VPC and networking',
        'EKS cluster configuration with proper node groups',
        'IAM roles and policies defined',
        'State management configured with S3 backend',
      ],
      tasks: [
        'Design VPC and networking architecture',
        'Create Terraform modules for infrastructure',
        'Configure EKS cluster with node groups',
        'Set up Terraform state management',
      ],
      priority: 'High',
      assignee: 'Infrastructure Engineer',
      reporter: 'Solutions Architect',
    },
    us3: {
      acceptanceCriteria: [
        'GitLab CI/CD pipeline configured with multiple stages',
        'Automated testing integrated into pipeline',
        'Docker image building and pushing to registry',
        'Security scanning integrated',
      ],
      tasks: [
        'Create .gitlab-ci.yml configuration',
        'Set up automated testing stage',
        'Configure Docker image building',
        'Integrate security scanning',
      ],
      priority: 'High',
      assignee: 'DevOps Engineer',
      reporter: 'Development Team',
    },
    us4: {
      acceptanceCriteria: [
        'ArgoCD installed on EKS cluster',
        'RBAC configured for team access',
        'Git repository connected to ArgoCD',
        'Application deployment templates created',
      ],
      tasks: [
        'Install ArgoCD on EKS cluster',
        'Configure RBAC and user access',
        'Connect Git repository',
        'Create application templates',
      ],
      priority: 'High',
      assignee: 'Platform Engineer',
      reporter: 'DevOps Lead',
    },
    us5: {
      acceptanceCriteria: [
        'Sample application deployed via ArgoCD',
        'Application accessible through ingress',
        'Health checks and monitoring configured',
        'Rollback capability tested',
      ],
      tasks: [
        'Create application manifests',
        'Deploy via ArgoCD',
        'Configure ingress and networking',
        'Test rollback functionality',
      ],
      priority: 'Medium',
      assignee: 'Application Developer',
      reporter: 'Product Owner',
    },
  };

  return {
    ...story,
    ...baseData,
    ...storyDetails[story.id],
  };
};

export function StoryDrawer({
  story,
  isOpen,
  onClose,
  onUpdate,
}: StoryDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!story) return null;

  const extendedStory = getExtendedStoryData(story);

  const handleStatusChange = (newStatus: string) => {
    if (onUpdate) {
      onUpdate({ ...story, status: newStatus });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader className="space-y-4 px-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {extendedStory.id.toUpperCase()}
                </Badge>
                <Badge
                  className={
                    statusColors[
                      extendedStory.status as keyof typeof statusColors
                    ]
                  }
                >
                  {extendedStory.status}
                </Badge>
              </div>
              <SheetTitle className="pr-8 text-2xl leading-tight">
                {extendedStory.title}
              </SheetTitle>
            </div>
          </div>
          <SheetDescription className="text-base leading-relaxed">
            {extendedStory.description}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Story Details */}
          <div className="grid grid-cols-2 gap-4 px-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {extendedStory.estimate}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Flag className="mr-2 h-4 w-4" />
                  Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    'text-lg font-semibold',
                    priorityColors[
                      extendedStory.priority as keyof typeof priorityColors
                    ],
                  )}
                >
                  {extendedStory.priority}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labels */}
          <div className="space-y-3 px-6">
            <h3 className="flex items-center font-semibold">
              <Tag className="mr-2 h-4 w-4" />
              Labels
            </h3>
            <div className="flex flex-wrap gap-2">
              {extendedStory.labels.map(label => (
                <Badge
                  key={label}
                  className={cn(
                    'px-3 py-1',
                    labelColors[label as keyof typeof labelColors],
                  )}
                >
                  {label === 'S' && 'Small'}
                  {label === 'M' && 'Medium'}
                  {label === 'L' && 'Large'}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* People */}
          <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="flex items-center font-semibold">
                <User className="mr-2 h-4 w-4" />
                Assignee
              </h3>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                  <User className="text-primary h-4 w-4" />
                </div>
                <span className="text-sm">{extendedStory.assignee}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center font-semibold">
                <User className="mr-2 h-4 w-4" />
                Reporter
              </h3>
              <div className="flex items-center space-x-3">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                  <User className="text-muted-foreground h-4 w-4" />
                </div>
                <span className="text-sm">{extendedStory.reporter}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Acceptance Criteria */}
          <div className="space-y-4 px-6">
            <h3 className="flex items-center font-semibold">
              <Target className="mr-2 h-4 w-4" />
              Acceptance Criteria
            </h3>
            <div className="space-y-3">
              {extendedStory.acceptanceCriteria?.map((criteria, index) => (
                <div
                  key={index}
                  className="bg-muted/30 flex items-start space-x-3 rounded-lg p-3"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span className="text-sm leading-relaxed">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tasks */}
          <div className="space-y-4 px-6">
            <h3 className="flex items-center font-semibold">
              <FileText className="mr-2 h-4 w-4" />
              Implementation Tasks
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {extendedStory.tasks?.map((task, index) => (
                <div
                  key={index}
                  className="bg-muted/30 flex items-center space-x-3 rounded-lg p-3"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                  <span className="text-sm">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2 px-6">
              <h4 className="flex items-center text-sm font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                Created
              </h4>
              <p className="text-muted-foreground text-sm">
                {new Date(extendedStory.created!).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center text-sm font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                Last Updated
              </h4>
              <p className="text-muted-foreground text-sm">
                {new Date(extendedStory.updated!).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t p-6 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusChange('In Progress')}
              disabled={extendedStory.status === 'In Progress'}
            >
              Move to In Progress
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusChange('Complete')}
              disabled={extendedStory.status === 'Complete'}
            >
              Mark Complete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
