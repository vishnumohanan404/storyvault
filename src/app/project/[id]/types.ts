// project page params.id prop
export type ProjectPageProps = { params: { id: string } };

// sidebar nav menu types
type SidebarMenuItem = {
  id: number;
  title: string;
  description: string;
  path?: string; // optional because some items use `href` instead
  href?: string;
};

type SidebarSection = {
  title: string;
  menu: SidebarMenuItem[];
};

export type SidebarMenu = SidebarSection[];

// overview page
export interface Project {
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

// architecture

export interface SystemArchitecture {
  _id: string;
  _createdAt: string;
  project: {
    _ref: string;
    _type: "reference";
  };
  title: string;
  description: string;
  coreComponents: CoreComponent[];
  dataFlow: DataFlowStep[];
  dbSchema: DatabaseTable[];
  deploymentStrategy: {
    url: string;
  };
}

export interface CoreComponent {
  title: string;
  subtitle?: string;
  features: string[];
}

export interface DataFlowStep {
  order: number;
  title: string;
  description?: string;
}

export interface DatabaseTable {
  table: string;
  schema: SchemaField[];
}

export interface SchemaField {
  column: string;
  type: string;
  description?: string;
}

// userstories page
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

// implementation page