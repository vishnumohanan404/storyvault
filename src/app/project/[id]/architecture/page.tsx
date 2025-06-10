import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  CodeIcon,
  DatabaseIcon,
  Layers,
  ShieldBanIcon,
  ShieldIcon,
  Smartphone,
} from "lucide-react";
import React from "react";

const systemData = {
  coreComponents: [
    {
      title: "Frontend Framework",
      subtitle: "Next.js 14 with App Router",
      features: [
        "Server-side rendering (SSR)",
        "Static site generation (SSG)",
        "API routes for backend logic",
        "TypeScript for type safety",
      ],
    },
    {
      title: "UI Components",
      subtitle: "Shadcn/ui + Tailwind CSS",
      features: [
        "Accessible component library",
        "Consistent design system",
        "Dark/light theme support",
        "Responsive design patterns",
      ],
    },
    {
      title: "Authentication",
      subtitle: "NextAuth.js + GitHub SSO",
      features: [
        "Secure session management",
        "GitHub identity verification",
        "Minimal permission scopes",
        "Token refresh handling",
      ],
    },
    {
      title: "Database",
      subtitle: "Supabase (PostgreSQL)",
      features: [
        "Row-level security (RLS)",
        "Real-time subscriptions",
        "Automatic API generation",
        "Built-in authentication",
      ],
    },
  ],
  dataFlow: [
    {
      order: 1,
      title: "User Authentication",
      description:
        "GitHub OAuth via NextAuth.js provides secure identity verification",
    },
    {
      order: 2,
      title: "Content Delivery",
      description:
        "MDX files processed and served with static generation for optimal performance",
    },
    {
      order: 3,
      title: "Interactive Features",
      description:
        "Kanban board state managed locally with export capabilities to GitHub Projects",
    },
    {
      order: 4,
      title: "Data Persistence",
      description:
        "Comments and analytics stored in Supabase with real-time updates",
    },
  ],
  dbSchema: [
    {
      table: "Comment Table",
      schema: [
        {
          column: "id",
          type: "UUID",
          description: "Primary key",
        },
        {
          column: "content",
          type: "TEXT",
          description: "Comment text",
        },
        {
          column: "github_user_id",
          type: "VARCHAR",
          description: "GitHub user ID",
        },
        {
          column: "project_id",
          type: "VARCHAR",
          description: "Associated project",
        },
        {
          column: "created_at",
          type: "TIMESTAMP",
          description: "Creation time",
        },
      ],
    },
    {
      table: "Analytics Table",
      schema: [
        {
          column: "id",
          type: "UUID",
          description: "Primary key",
        },
        {
          column: "action",
          type: "VARCHAR",
          description: "Action type",
        },
        {
          column: "user_github_id",
          type: "VARCHAR",
          description: "User identifier",
        },
        {
          column: "timestamp",
          type: "TIMESTAMP",
          description: "Action time",
        },
        {
          column: "metadata",
          type: "JSONB",
          description: "Additional data",
        },
      ],
    },
  ],
  deploymentStrategy: {
    url: "",
  },
};

const ArchitecturePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className="space-y-8 mb-5">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          System Architecture
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A modern, scalable architecture built with Next.js, featuring secure
          authentication, real-time data, and seamless GitHub integration for
          the ultimate developer experience.
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Core Components</h2>
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CodeIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    Frontend Framework
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Next.js 14 with App Router
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Server-side rendering (SSR)
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Static site generation (SSG)
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  API routes for backend logic
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  TypeScript for type safety
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Layers className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    UI Components
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Shadcn/ui + Tailwind CSS
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Accessible component library
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Consistent design system
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Dark/light theme support
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Responsive design patterns
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <ShieldBanIcon className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    NextAuth.js + GitHub SSO
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Secure session management
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  GitHub identity verification
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Minimal permission scopes
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Token refresh handling
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <DatabaseIcon className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight text-lg">
                    Database
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Supabase (PostgreSQL)
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Row-level security (RLS)
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Real-time subscriptions
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Automatic API generation
                </li>
                <li className="text-sm text-muted-foreground flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                  Built-in authentication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Data Flow & User Journey</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">User Authentication</h3>
                <p className="text-muted-foreground text-sm">
                  GitHub OAuth via NextAuth.js provides secure identity
                  verification
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Content Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  MDX files processed and served with static generation for
                  optimal performance
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Interactive Features</h3>
                <p className="text-muted-foreground text-sm">
                  Kanban board state managed locally with export capabilities to
                  GitHub Projects
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Data Persistence</h3>
                <p className="text-muted-foreground text-sm">
                  Comments and analytics stored in Supabase with real-time
                  updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Database Design</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Comments Table</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-4 font-medium border-b pb-2">
                <span>Column</span>
                <span>Type</span>
                <span>Description</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>id</span>
                <span>UUID</span>
                <span>Primary key</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>content</span>
                <span>TEXT</span>
                <span>Comment text</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>github_user_id</span>
                <span>VARCHAR</span>
                <span>GitHub user ID</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>project_id</span>
                <span>VARCHAR</span>
                <span>Associated project</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>created_at</span>
                <span>TIMESTAMP</span>
                <span>Creation time</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Analytics Table</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-4 font-medium border-b pb-2">
                <span>Column</span>
                <span>Type</span>
                <span>Description</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>id</span>
                <span>UUID</span>
                <span>Primary key</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>action</span>
                <span>VARCHAR</span>
                <span>Action type</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>user_github_id</span>
                <span>VARCHAR</span>
                <span>User identifier</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>timestamp</span>
                <span>TIMESTAMP</span>
                <span>Action time</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                <span>metadata</span>
                <span>JSONB</span>
                <span>Additional data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Security &amp; Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldIcon className="h-6 w-6 text-green-500" />
              <h3 className="font-semibold text-lg">Security Features</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                OAuth 2.0 authentication with GitHub
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Row-level security policies in database
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                CSRF protection via NextAuth.js
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Rate limiting on API endpoints
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Input validation and sanitization
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Secure session management
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="h-6 w-6 text-blue-500" />
              <h3 className="font-semibold text-lg">
                Performance Optimizations
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Static site generation for documentation
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Image optimization with Next.js
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Code splitting and lazy loading
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                CDN delivery for static assets
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Database query optimization
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Responsive design patterns
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Deployment Strategy</h2>
        <div className="rounded-lg w-full h-120 border">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Explore Further</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Implementation Guide</h3>
              <p className="text-muted-foreground">
                Step-by-step process to guide you through this project from step
                one to production.
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

export default ArchitecturePage;
