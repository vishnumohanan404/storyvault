import { Badge } from "@/components/ui/badge";
import { ArrowRight, TargetIcon, UsersIcon, ZapIcon } from "lucide-react";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-2xl">
            AWS
          </Badge>
          <Badge variant="outline" className="rounded-2xl">
            Kubernetes
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          GitOps AWS Pipeline
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A comprehensive Next.js web application designed to showcase DevOps
          expertise through interactive documentation, project management tools,
          and community engagement features. Project
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                Demonstrate DevOps expertise through comprehensive project
                documentation
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <UsersIcon className="text-blue-500 h-5 w-5" />
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Secondary Goal
                </h3>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground text-base">
                Provide interactive learning experience for visitors
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <ZapIcon className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Future Vision
                </h3>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-muted-foreground text-base">
                Expandable platform for showcasing multiple DevOps projects
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">Next.js 14</h4>
              <p className="text-sm text-muted-foreground">
                Frontend Framework
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">TypeScript</h4>
              <p className="text-sm text-muted-foreground">Language</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">Tailwind CSS</h4>
              <p className="text-sm text-muted-foreground">Styling</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">Shadcn/ui</h4>
              <p className="text-sm text-muted-foreground">UI Components</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">Supabase</h4>
              <p className="text-sm text-muted-foreground">Database</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">NextAuth.js</h4>
              <p className="text-sm text-muted-foreground">Authentication</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">@dnd-kit</h4>
              <p className="text-sm text-muted-foreground">Drag &amp; Drop</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <h4 className="font-medium">MDX</h4>
              <p className="text-sm text-muted-foreground">Content</p>
            </div>
          </div>
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
