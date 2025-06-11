import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
  S: "bg-green-500/10 text-green-700 dark:text-green-400",
  M: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  L: "bg-red-500/10 text-red-700 dark:text-red-400",
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
      !(e.target as HTMLElement).closest("[data-drag-handle]")
    ) {
      onClick();
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md",
        isDragging && "opacity-50 shadow-lg",
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
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* <CardDescription className="text-xs leading-relaxed">
          {story.description}
        </CardDescription> */}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {story.labels.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className={cn(
                  "text-xs px-1.5 py-0.5",
                  labelColors[label as keyof typeof labelColors],
                )}
              >
                {label}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{story.estimate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {story.status}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {story.id.toUpperCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
