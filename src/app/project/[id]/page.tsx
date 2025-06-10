import ExploreArchitecture from "@/components/common/explore-cards/architecture";
import ExploreUserstories from "@/components/common/explore-cards/userstories";
import PageContentSection from "@/components/layout/page-content-section";
import PageHeaderSection from "@/components/layout/page-header-section";
import { client } from "@/sanity/client";
import { TargetIcon, UsersIcon, ZapIcon } from "lucide-react";
import React from "react";
import { Project, ProjectPageProps } from "./types";
import { Separator } from "@/components/ui/separator";

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

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  const projectData: Project = await client.fetch(PROJECT_OVERVIEW_QUERY, {
    projectId: id,
  });
  if (!projectData) {
    return (
      <div className="text-red-500 text-center text-xl py-10">
        Project not found.
      </div>
    );
  }
  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title={projectData.title}
        description={projectData.description}
        tags={projectData.tags}
      />
      <Separator />
      <PageContentSection title="Goals">
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
      </PageContentSection>
      <PageContentSection title="Technology Stack">
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
      </PageContentSection>
      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExploreArchitecture id={id} />
          <ExploreUserstories id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default ProjectPage;
