import ExploreImplementation from "@/components/common/explore-cards/implementation";
import PageContentSection from "@/components/layout/page-content-section";
import PageHeaderSection from "@/components/layout/page-header-section";
import { getPriorityStyle, getSizeStyle, getStatusStyle } from "@/lib/utils";
import { client } from "@/sanity/client";
import { Clock, Target } from "lucide-react";
import React from "react";
import { UserStory } from "../types";

const PROJECT_USERSTORIES_QUERY = `
    *[_type == "userstories" && project._ref == $projectId][0].userstory[]{
      storyId,
      title,
      description,
      status,
      size,
      estimate,
      priority,
      acceptanceCriteria[]
    }
  `;

const UserStories = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const userstoriesData: UserStory[] = await client.fetch(
    PROJECT_USERSTORIES_QUERY,
    {
      projectId: id,
    }
  );

  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title="User Stories"
        description="Detailed breakdown of development phases, user requirements, and implementation strategies for the gitops aws-pipeline project."
      />
      <PageContentSection title="All User Stories">
        <div className="space-y-6">
          {userstoriesData.map((userstory) => {
            const statusStyle = getStatusStyle(userstory.status);
            const sizeStyle = getSizeStyle(userstory.size);
            const priorityStyle = getPriorityStyle(userstory.priority);

            return (
              <div
                key={userstory.storyId}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3 flex-wrap gap-2">
                        <div
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  ${statusStyle}`}
                        >
                          {userstory.status}
                        </div>
                        <div
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 ${sizeStyle}`}
                        >
                          {userstory.size.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {userstory.estimate} day
                            {userstory.estimate !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <span
                          className={`text-sm font-medium ${priorityStyle}`}
                        >
                          {userstory.priority.charAt(0).toUpperCase() +
                            userstory.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold tracking-tight text-xl flex items-center space-x-2">
                          <span className="text-muted-foreground font-mono text-sm">
                            US1
                          </span>
                          <span>Set Up Git Repository</span>
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          Set up GitLab repository with proper structure for
                          GitOps workflow including branches, protection rules,
                          and initial documentation.
                        </p>
                      </div>
                    </div>
                    {/* todo: Use CircleCheckBig when kanbanboard is done, to reflect the progress from localStorage */}
                    {/* <CircleCheckBig className="h-6 w-6 text-green-500 flex-shrink-0 ml-4" /> */}
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Acceptance Criteria</span>
                    </h4>
                    <ul className="space-y-2 list-disc list-inside ml-1">
                      <li className="text-sm text-muted-foreground">
                        GitLab repository created with proper naming convention
                      </li>
                      <li className="text-sm text-muted-foreground">
                        Branch protection rules configured for main branch
                      </li>
                      <li className="text-sm text-muted-foreground">
                        Initial README and documentation structure in place
                      </li>
                      <li className="text-sm text-muted-foreground">
                        GitOps workflow directory structure established
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContentSection>
      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExploreImplementation id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default UserStories;
