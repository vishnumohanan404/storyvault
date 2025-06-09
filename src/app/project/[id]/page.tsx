import { Badge } from "@/components/ui/badge";
import { ArrowRight, TargetIcon, UsersIcon, ZapIcon } from "lucide-react";
import React from "react";

const projectData = {
  createdAt: new Date(),
  metadata: {
    tags: ["AWS", "Kubernetes"],
    title: "GitOps AWS Pipeline",
    topic: "GitOps",
    description:
      "A comprehensive Next.js web application designed to showcase DevOps expertise through interactive documentation, project management tools, and community engagement features. Project",
  },
  goals: [
    {
      title: "Primary Goal",
      goal: "Demonstrate DevOps expertise through comprehensive project documentation",
      icon: <TargetIcon className="h-5 w-5" />,
    },
    {
      title: "Secondary Goal",
      goal: "Provide interactive learning experience for visitors",
      icon: <UsersIcon className="text-blue-500 h-5 w-5" />,
    },
    {
      title: "Future Vision",
      goal: "Expandable platform for showcasing multiple DevOps projects",
      icon: <ZapIcon className="h-5 w-5 text-purple-500" />,
    },
  ],
  stacks: [
    { title: "Next.js 14", description: "Frontend Framework" },
    { title: "TypeScript", description: "Language" },
    { title: "Tailwind CSS", description: "Styling" },
    { title: "Shadcn/ui", description: "UI Components" },
    { title: "Supabase", description: "Database" },
    { title: "NextAuth.js", description: "Authentication" },
    { title: "@dnd-kit", description: "Drag &amp; Drop" },
    { title: "MDX", description: "Content" },
  ],
};

const ProjectPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex gap-2">
          {projectData.metadata.tags.map((item) => (
            <Badge key={item} variant="outline" className="rounded-2xl">
              {item}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          {projectData.metadata.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {projectData.metadata.description}
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectData.goals.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden"
            >
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-muted-foreground text-base">{item.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectData.stacks.map((stack) => (
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
                href="/docs/architecture"
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
                href="/docs/user-stories"
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
