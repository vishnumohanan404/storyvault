import { TargetIcon, UsersIcon, ZapIcon } from 'lucide-react';
import React from 'react';

import ExploreArchitecture from '@/components/common/explore-cards/architecture';
import ExploreUserstories from '@/components/common/explore-cards/userstories';
import PageContentSection from '@/components/layout/page-content-section';
import PageHeaderSection from '@/components/layout/page-header-section';
import { Separator } from '@/components/ui/separator';
import { client } from '@/sanity/client';

import { Project, ProjectPageProps } from './types';

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
      <div className="py-10 text-center text-xl text-red-500">
        Project not found.
      </div>
    );
  }
  return (
    <main className="mb-5 space-y-8">
      <PageHeaderSection
        title={projectData.title}
        description={projectData.description}
        tags={projectData.tags}
      />
      <Separator />
      <PageContentSection title="Goals">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projectData.goals.primary && (
            <div className="bg-card text-card-foreground relative overflow-hidden rounded-lg border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <TargetIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
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
          <div className="bg-card text-card-foreground relative overflow-hidden rounded-lg border shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
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
          <div className="bg-card text-card-foreground relative overflow-hidden rounded-lg border shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <ZapIcon className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectData.stacks?.map(stack => (
            <div
              key={stack.title}
              className="bg-card text-card-foreground rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="space-y-2">
                <h4 className="font-medium">{stack.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {stack.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>
      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ExploreArchitecture id={id} />
          <ExploreUserstories id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default ProjectPage;
