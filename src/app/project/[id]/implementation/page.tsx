import ExploreLessons from '@/components/common/explore-cards/lessons';
import PageContentSection from '@/components/layout/page-content-section';
import PageHeaderSection from '@/components/layout/page-header-section';
import {
  BookOpenIcon,
  CircleCheckBig,
  Download,
  ExternalLink,
  TerminalIcon,
} from 'lucide-react';
import React from 'react';
import { ProjectPageProps } from '../types';
import ExploreKanban from '@/components/common/explore-cards/kanban';
import { Separator } from '@/components/ui/separator';
import YouTubePlayer from '@/components/layout/videoplayer';

const ImplementationPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;

  return (
    <main className="mb-5 space-y-8">
      <PageHeaderSection
        title="Step-by-Step Implementation"
        description="Complete guide for implementing this production-ready project. Follow these detailed steps to build your own scalable infrastructure."
      />
      <Separator />
      <PageContentSection title="Video Walkthrough">
        <YouTubePlayer
          videoUrl="https://www.youtube.com/watch?v=pJ9f7w4AxtU"
          // width={800}
          height={450}
          autoplay={false}
          controls={true}
          mute={false}
        />
      </PageContentSection>
      <PageContentSection title="Implementation Phases">
        <div className="space-y-8">
          <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm">
            <div className="from-primary/5 to-accent/5 flex flex-col space-y-1.5 bg-gradient-to-r p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      Phase 1: Foundation Setup
                    </h3>
                    <p className="text-muted-foreground text-sm">
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
                    <div className="bg-primary/10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-primary text-xs font-medium">
                        1
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold">
                          AWS Account &amp; IAM Setup
                        </h4>
                        <p className="text-muted-foreground">
                          Configure AWS account with proper IAM roles and
                          policies
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <TerminalIcon className="mr-2 h-4 w-4" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>aws configure</code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              aws iam create-role --role-name EKSClusterRole
                            </code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              aws iam attach-role-policy --role-name
                              EKSClusterRole --policy-arn
                              arn:aws:iam::aws:policy/AmazonEKSClusterPolicy
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
                          >
                            AWS IAM Best Practices
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html"
                          >
                            EKS Service Role
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-border ml-3 h-6 w-px"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-primary text-xs font-medium">
                        2
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold">
                          GitLab Repository Setup
                        </h4>
                        <p className="text-muted-foreground">
                          Create and configure GitLab repository with proper
                          structure
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <TerminalIcon className="mr-2 h-4 w-4" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              git clone
                              https://gitlab.com/your-username/gitops-pipeline.git
                            </code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              mkdir -p{' '}
                              {/* {(infrastructure, applications, manifests)} */}
                            </code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              git add . &amp;&amp; git commit -m "Initial
                              project structure"
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://docs.gitlab.com/ee/ci/"
                          >
                            GitLab CI/CD
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://www.gitops.tech/"
                          >
                            GitOps Workflow
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-border ml-3 h-6 w-px"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-primary text-xs font-medium">
                        3
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold">
                          Development Environment
                        </h4>
                        <p className="text-muted-foreground">
                          Set up local development tools and dependencies
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <TerminalIcon className="mr-2 h-4 w-4" />
                          Commands
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              curl -LO "https://dl.k8s.io/release/$(curl -L -s
                              https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                            </code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              curl --silent --location
                              "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname
                              -s)_amd64.tar.gz" | tar xz -C /tmp
                            </code>
                          </div>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            <code>
                              wget
                              https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="flex items-center text-sm font-medium">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Resources
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://kubernetes.io/docs/tasks/tools/"
                          >
                            kubectl Installation
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://eksctl.io/installation/"
                          >
                            eksctl Installation
                            <ExternalLink className="ml-2 h-3 w-3" />
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
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Sample Applications</h1>
        <p className="text-muted-foreground">
          Ready-to-deploy sample applications with complete GitOps configuration
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-card text-card-foreground rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  Node.js Microservice
                </h3>
                <p className="text-muted-foreground text-sm">
                  Complete Node.js application with Express, Docker, and
                  Kubernetes manifests
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                <div className="focus:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  Node.js
                </div>
                <div className="focus:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  Express
                </div>
                <div className="focus:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  Docker
                </div>
                <div className="focus:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  Kubernetes
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Features</h5>
                <ul className="space-y-1">
                  <li className="text-muted-foreground flex items-center text-sm">
                    <CircleCheckBig className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                    Health checks
                  </li>
                  <li className="text-muted-foreground flex items-center text-sm">
                    <CircleCheckBig className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                    Metrics endpoint
                  </li>
                  <li className="text-muted-foreground flex items-center text-sm">
                    <CircleCheckBig className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                    Graceful shutdown
                  </li>
                  <li className="text-muted-foreground flex items-center text-sm">
                    <CircleCheckBig className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                    Configuration management
                  </li>
                </ul>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                href="https://github.com/example/nodejs-microservice-template"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </a>
            </div>
          </div>
        </div>
      </section>
      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* <ExploreLessons id={id} /> */}
          <ExploreKanban id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default ImplementationPage;
