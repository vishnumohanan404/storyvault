import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { KanbanCard } from './kanban-card';

interface Column {
  id: string;
  title: string;
  color: string;
}

interface Story {
  id: string;
  title: string;
  status: string;
  estimate: string;
  labels: string[];
  column: string;
  description: string;
}

interface KanbanColumnProps {
  column: Column;
  stories: Story[];
  onStoryClick?: (story: Story) => void;
}

const colorMap = {
  gray: 'bg-gray-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
};

export function KanbanColumn({
  column,
  stories,
  onStoryClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Card
      className={cn(
        'h-fit transition-colors',
        isOver && 'ring-primary ring-2 ring-offset-2',
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                'h-3 w-3 rounded-full',
                colorMap[column.color as keyof typeof colorMap] ||
                  'bg-gray-500',
              )}
            />
            <span>{column.title}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {stories.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div ref={setNodeRef} className="min-h-[200px] space-y-3">
          <SortableContext
            items={stories.map(story => story.id)}
            strategy={verticalListSortingStrategy}
          >
            {stories.map(story => (
              <KanbanCard
                key={story.id}
                story={story}
                onClick={() => onStoryClick?.(story)}
              />
            ))}
          </SortableContext>

          {stories.length === 0 && (
            <div className="text-muted-foreground border-muted flex h-32 items-center justify-center rounded-lg border-2 border-dashed text-sm">
              Drop stories here
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
