import { CircleCheckBig, Download } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

import ExploreKanban from '@/components/common/explore-cards/kanban';
import PageContentSection from '@/components/layout/page-content-section';
import PageHeaderSection from '@/components/layout/page-header-section';
import YouTubePlayer from '@/components/layout/videoplayer';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { Separator } from '@/components/ui/separator';
import { client } from '@/sanity/client';

import { ProjectPageProps } from '../types';

const IMPLEMENTATION_GUIDE_QUERY = `
  *[_type == "implementation" && project._ref == $id][0]{
    _id,
    project->{
      _id,
      title
    },
    content,
    sampleApplication,
    createdAt
  }
`;
const ImplementationPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  const result = await client.fetch(IMPLEMENTATION_GUIDE_QUERY, { id });
  console.log('result :>>', result);
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
        <MDXRemote source={result.content.code} components={mdxComponents} />
      </PageContentSection>
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Sample Applications</h1>
        <p className="text-muted-foreground">
          Ready-to-deploy sample applications.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-card text-card-foreground rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {result.sampleApplication.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {result.sampleApplication.description}
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {result.sampleApplication.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="focus:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Features</h5>
                <ul className="space-y-1">
                  {result.sampleApplication.features.map(
                    (feature: string, index: number) => (
                      <li
                        className="text-muted-foreground flex items-center text-sm"
                        key={feature + '_' + index}
                      >
                        <CircleCheckBig className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                href={result.sampleApplication.link}
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
