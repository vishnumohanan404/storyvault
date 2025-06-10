import ExploreLessons from "@/components/common/explore-cards/lessons";
import PageContentSection from "@/components/layout/page-content-section";
import PageHeaderSection from "@/components/layout/page-header-section";
import {
  BookOpenIcon,
  CircleCheckBig,
  Download,
  ExternalLink,
  TerminalIcon,
} from "lucide-react";
import React from "react";
import { ProjectPageProps } from "../types";
import ExploreKanban from "@/components/common/explore-cards/kanban";
import { Separator } from "@/components/ui/separator";

const ImplementationPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;

  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title="Interactive Kanban Board"
        description="Experience hands-on project management with our interactive Kanban board. Drag and drop user stories between columns, and export your board state to GitHub Projects or download as JSON."
      />
      <Separator />
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Sample Applications</h1>
        <p className="text-muted-foreground">
          Ready-to-deploy sample applications with complete GitOps configuration
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="space-y-2">
                <h3 className="font-semibold tracking-tight text-lg">
                  Node.js Microservice
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete Node.js application with Express, Docker, and
                  Kubernetes manifests
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                  Node.js
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                  Express
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                  Docker
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                  Kubernetes
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Features</h5>
                <ul className="space-y-1">
                  <li className="text-sm text-muted-foreground flex items-center">
                    <CircleCheckBig className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    Health checks
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center">
                    <CircleCheckBig className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    Metrics endpoint
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center">
                    <CircleCheckBig className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    Graceful shutdown
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center">
                    <CircleCheckBig className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    Configuration management
                  </li>
                </ul>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                href="https://github.com/example/nodejs-microservice-template"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </a>
            </div>
          </div>
        </div>
      </section>
      <PageContentSection title="Implementation Phases">
        <div className="space-y-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold tracking-tight text-xl">
                      Phase 1: Foundation Setup
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Estimated duration: 2-3 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-medium text-primary">
                        1
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="font-semibold text-lg">
                          AWS Account &amp; IAM Setup
                        </h4>
                        <p className="text-muted-foreground">
                          Configure AWS account with proper IAM roles and
                          policies
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <TerminalIcon className="h-4 w-4 mr-2" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>aws configure</code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              aws iam create-role --role-name EKSClusterRole
                            </code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              aws iam attach-role-policy --role-name
                              EKSClusterRole --policy-arn
                              arn:aws:iam::aws:policy/AmazonEKSClusterPolicy
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
                          >
                            AWS IAM Best Practices
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html"
                          >
                            EKS Service Role
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 w-px h-6 bg-border"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-medium text-primary">
                        2
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="font-semibold text-lg">
                          GitLab Repository Setup
                        </h4>
                        <p className="text-muted-foreground">
                          Create and configure GitLab repository with proper
                          structure
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <TerminalIcon className="h-4 w-4 mr-2" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              git clone
                              https://gitlab.com/your-username/gitops-pipeline.git
                            </code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              mkdir -p{" "}
                              {/* {(infrastructure, applications, manifests)} */}
                            </code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              git add . &amp;&amp; git commit -m "Initial
                              project structure"
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://docs.gitlab.com/ee/ci/"
                          >
                            GitLab CI/CD
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://www.gitops.tech/"
                          >
                            GitOps Workflow
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 w-px h-6 bg-border"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-medium text-primary">
                        3
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="font-semibold text-lg">
                          Development Environment
                        </h4>
                        <p className="text-muted-foreground">
                          Set up local development tools and dependencies
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <TerminalIcon className="h-4 w-4 mr-2" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              curl -LO "https://dl.k8s.io/release/$(curl -L -s
                              https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                            </code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              curl --silent --location
                              "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname
                              -s)_amd64.tar.gz" | tar xz -C /tmp
                            </code>
                          </div>
                          <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>
                              wget
                              https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center">
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://kubernetes.io/docs/tasks/tools/"
                          >
                            kubectl Installation
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            href="https://eksctl.io/installation/"
                          >
                            eksctl Installation
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContentSection>
      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExploreLessons id={id} />
          <ExploreKanban id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default ImplementationPage;
