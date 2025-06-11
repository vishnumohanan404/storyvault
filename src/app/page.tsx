import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/client';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  ExternalLinkIcon,
  StarIcon,
  StarsIcon,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Project } from './(commonsidebar)/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';

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
      <section className="relative overflow-hidden py-20 lg:py-42">
        {/* bg animation */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div> */}
        <div className="from-primary/5 to-primary/2 absolute inset-0 bg-gradient-to-br via-transparent" />

        {/* bg animation */}
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="space-y-4">
              <Badge
                className="border-primary/20 bg-primary/5 hover:bg-primary/10 mb-9 rounded-3xl transition-all duration-300"
                variant={'outline'}
              >
                <Zap className="mr-1 h-3 w-3" />
                Interactive Project Narratives
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
                Project{' '}
                <span className="font-highlight from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  Showcase
                </span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                A comprehensive platform for documenting, demonstrating, and
                sharing my DevOps projects with interactive tools for engagment.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/projects">
                <Button className="hover:cursor-pointer">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/resource">
                <Button
                  className="border-muted-foreground rounded-3xl border hover:cursor-pointer"
                  variant={'secondary'}
                >
                  View Resources
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative border-t py-32">
        <div className="from-muted/20 to-background absolute inset-0 bg-gradient-to-bl"></div>
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
