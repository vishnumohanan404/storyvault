import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GripVertical } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  status: string;
  estimate: string;
  labels: string[];
  column: string;
  description: string;
}

interface KanbanCardProps {
  story: Story;
  onClick?: () => void;
}

const labelColors = {
  S: 'bg-green-500/10 text-green-700 dark:text-green-400',
  M: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  L: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

export function KanbanCard({ story, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: story.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger onClick if not dragging and not clicking on drag handle
    if (
      !isDragging &&
      onClick &&
      !(e.target as HTMLElement).closest('[data-drag-handle]')
    ) {
      onClick();
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'cursor-grab transition-shadow hover:shadow-md active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg',
      )}
      {...attributes}
      {...listeners}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium leading-tight">
            {story.title}
          </CardTitle>
          <GripVertical className="text-muted-foreground ml-2 h-4 w-4 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* <CardDescription className="text-xs leading-relaxed">
          {story.description}
        </CardDescription> */}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {story.labels.map(label => (
              <Badge
                key={label}
                variant="secondary"
                className={cn(
                  'px-1.5 py-0.5 text-xs',
                  labelColors[label as keyof typeof labelColors],
                )}
              >
                {label}
              </Badge>
            ))}
          </div>

          <div className="text-muted-foreground flex items-center space-x-1 text-xs">
            <Clock className="h-3 w-3" />
            <span>{story.estimate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {story.status}
          </Badge>
          <span className="text-muted-foreground font-mono text-xs">
            {story.id.toUpperCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
