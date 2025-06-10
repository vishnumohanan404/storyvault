// userstories types
export type UserStoryStatus =
  | "Backlog"
  | "Ready"
  | "In Progress"
  | "In Review"
  | "Completed";
export type UserStorySize = "large" | "medium" | "small";
export type UserStoryPriority = "low" | "medium" | "high";
export interface UserStory {
  storyId: string;
  title: string;
  description: string;
  status: UserStoryStatus;
  size: UserStorySize;
  estimate: number;
  priority: UserStoryPriority;
  acceptanceCriteria?: string[];
}
// ----------------------
//
// ----------------------
