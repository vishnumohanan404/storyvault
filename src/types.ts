// overview types
export interface ProjectsList {
  _id?: string;
  createdAt: string; // ISO string from Sanity
  title: string;
  tags?: string[];
  description: string;
  project: {
    _id: string;
    title: string;
  };
  goals: {
    primary: string;
    secondary?: string;
    future?: string;
  };
  stacks?: {
    title: string;
    description?: string;
  }[];
}

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
