import { BookOpen, ExternalLinkIcon, StarIcon, StarsIcon } from 'lucide-react';
import Link from 'next/link';

import Hero from '@/components/layout/hero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { client } from '@/sanity/client';

import { Project } from './(commonsidebar)/types';

const PROJECTS_QUERY = `*[_type == "projects" && featured == true][0...3]{ 
  _id, 
  title, 
  description,
  badges,
  topic,
  featured,
  createdOn }`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  return (
    <main className="mx-auto min-h-screen">
      <div className="absolute bottom-0 left-0 right-0 top-[64px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <Hero />
      <section className="relative border-t py-32">
        {/* <div className="from-muted/20 to-background absolute inset-0 bg-gradient-to-bl"></div> */}
        <div className="absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#4f4f4f2e_1px)] bg-[size:100px_100px]"></div>
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 space-y-6 text-center">
            <Badge className="text-foreground rounded-full border border-amber-500/20 bg-amber-500/5 text-xs font-semibold transition-colors duration-300">
              <StarsIcon className="mr-1 h-3 w-3 text-amber-500" />
              Featured Implementation
            </Badge>
            <h2 className="text-4xl font-bold lg:text-5xl">
              Latest Project Showcase
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Dive deep into our most recent DevOps implementation with
              comprehensive documentation and interactive tools.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <Card key={project._id} className="hover:shadow-accent">
                <CardHeader className="flex flex-col space-y-2">
                  <CardAction className="flex justify-between gap-2">
                    {project.featured ? (
                      <Badge
                        className="rounded-3xl border-amber-500/20 bg-amber-500/5"
                        variant="secondary"
                      >
                        <StarIcon className="text-amber-500" />
                        Featured
                      </Badge>
                    ) : (
                      <></>
                    )}
                    <Badge
                      className="border-chart-1 rounded-3xl"
                      variant="outline"
                    >
                      {project.topic}
                    </Badge>
                  </CardAction>
                  <CardTitle>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                  </CardTitle>
                  <CardDescription>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    {project.badges.slice(0, 2).map(badge => (
                      <Badge
                        className="rounded-3xl"
                        variant="secondary"
                        key={badge}
                      >
                        {badge}
                      </Badge>
                    ))}
                    {project.badges.length > 2 && (
                      <Badge className="rounded-3xl" variant="outline">
                        +{project.badges.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Link href={`/project/${project._id}`}>
                      <Button size="sm" className="hover:cursor-pointer">
                        View Docs
                      </Button>
                    </Link>
                    <Link href={`/kanban/${project._id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center hover:cursor-pointer"
                      >
                        Kanban
                        <ExternalLinkIcon />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t py-32">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"></div> */}
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-6 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Dive into the documentation, try the interactive Kanban board, or
              explore the resources to start your own GitOps journey.
            </p>
          </div>

          <div className="flex justify-center gap-2">
            <Link href={`/project/${projects[0]._id}`}>
              <Button size="sm" className="hover:cursor-pointer">
                <BookOpen className="" />
                Start Reading
              </Button>
            </Link>
            <Link href={`/resources`}>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center hover:cursor-pointer"
              >
                View Resources
                <ExternalLinkIcon className="" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
