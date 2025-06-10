import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/client";
import { ArrowRight, TargetIcon, UsersIcon, ZapIcon } from "lucide-react";
import React from "react";
export interface ProjectOverview {
  _id?: string;
  createdAt: string; // ISO string from Sanity
  title: string;
  tags?: string[];
  description?: string;
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

const PROJECT_OVERVIEW_QUERY = `
  *[_type == "overview" && project._ref == $projectId][0]{
    _id,
    createdAt,
    tags,
    title,
    topic,
    description,
    goals {
      primary,
      secondary,
      future
    },
    stacks[] {
      title,
      description
    },
    project->{
      _id,
      title
    }
  }
`;

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const projectData: ProjectOverview = await client.fetch(
    PROJECT_OVERVIEW_QUERY,
    {
      projectId: id,
    }
  );
  if (!projectData) {
    return (
      <div className="text-red-500 text-center text-xl py-10">
        Project not found.
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex gap-2">
          {projectData.tags?.map((item) => (
            <Badge key={item} variant="outline" className="rounded-2xl">
              {item}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          {projectData.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {projectData.description}
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectData.goals.primary && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TargetIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    Primary Goal
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-muted-foreground text-base">
                  {projectData.goals.primary}
                </p>
              </div>
            </div>
          )}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <UsersIcon className="text-blue-500 h-5 w-5" />
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Secondary Goal
                </h3>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground text-base">
                {projectData.goals.secondary}
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ZapIcon className="text-purple-500 h-5 w-5" />
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Future Vision
                </h3>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground text-base">
                {projectData.goals.future}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectData.stacks?.map((stack) => (
            <div
              key={stack.title}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <h4 className="font-medium">{stack.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {stack.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Explore Further</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">System Architecture</h3>
              <p className="text-muted-foreground">
                Dive deep into the technical architecture, infrastructure
                design, and implementation patterns used in this project.
              </p>
              <a
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-fit"
                href={`/project/${id}/architecture`}
              >
                View Architecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">User Stories</h3>
              <p className="text-muted-foreground">
                Explore the detailed breakdown of development phases, user
                requirements, and implementation strategies.
              </p>
              <a
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-fit"
                href={`/project/${id}/userstories`}
              >
                Read User Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
