import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/client";
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
const PROJECT_SYSTEM_ARCHITECTURE = `*[_type == "systemArchitecture" && project._ref == $projectId][0] {
  _id,
  _createdAt,
  description,
  coreComponents[] {
    title,
    subtitle,
    features
  },
  dataFlow[] {
    order,
    title,
    description
  },
  dbSchema[] {
    table,
    schema[] {
      column,
      type,
      description
    }
  },
  deploymentStrategy {
    url
  }
}`;

const ArchitecturePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const systemArchitecture: SystemArchitecture = await client.fetch(
    PROJECT_SYSTEM_ARCHITECTURE,
    {
      projectId: id, // replace dynamically
    }
  );
  console.log("systemArchitecture :>> ", systemArchitecture);
  return (
    <div className="space-y-8 mb-5">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          System Architecture
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {systemArchitecture.description}
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Core Components</h2>
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
          {systemArchitecture.coreComponents.map((component) => (
            <div
              key={component.title}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold tracking-tight text-lg">
                      {component.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {component.subtitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <ul className="space-y-2">
                  {component.features.map((feature) => (
                    <li
                      key={component.title + "_" + feature}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Data Flow & User Journey</h2>
        <div className="space-y-4">
          {systemArchitecture.dataFlow.map((flow) => (
            <div
              key={flow.order + "_" + flow.title}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {flow.order}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{flow.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {flow.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Database Design</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemArchitecture.dbSchema.map((collection) => (
            <div
              key={collection.table}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
            >
              <h3 className="font-semibold text-lg mb-4">{collection.table}</h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-4 font-medium border-b pb-2">
                  <span>Column</span>
                  <span>Type</span>
                  <span>Description</span>
                </div>
                {collection.schema.map((item) => (
                  <div
                    key={item.column}
                    className="grid grid-cols-3 gap-4 text-muted-foreground"
                  >
                    <span>{item.column}</span>
                    <span>{item.type}</span>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="space-y-3">
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
      </div> */}
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
                View Guide
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
                Try User Stories
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
