import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  ExternalLinkIcon,
  StarIcon,
  StarsIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Project } from "./(commonsidebar)/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

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
    <main className="min-h-screen mx-auto">
      <section className="relative py-20 lg:py-42 overflow-hidden">
        {/* bg animation */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div> */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/2" />

        {/* bg animation */}
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge
                className="mb-9 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 rounded-3xl"
                variant={"outline"}
              >
                <Zap className="h-3 w-3 mr-1" />
                Interactive Project Narratives
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Project{" "}
                <span className="font-highlight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Showcase
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive platform for documenting, demonstrating, and
                sharing my DevOps projects with interactive tools for engagment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button className="hover:cursor-pointer">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  className="rounded-3xl border border-muted-foreground hover:cursor-pointer"
                  variant={"secondary"}
                >
                  View Resources
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 relative border-t">
        <div className="absolute inset-0 bg-gradient-to-bl from-muted/20 to-background"></div>
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge className="rounded-full border text-xs font-semibold transition-colors duration-300 text-foreground border-amber-500/20 bg-amber-500/5">
              <StarsIcon className="h-3 w-3 mr-1 text-amber-500" />
              Featured Implementation
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Latest Project Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive deep into our most recent DevOps implementation with
              comprehensive documentation and interactive tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
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
                      className="rounded-3xl border-chart-1"
                      variant="outline"
                    >
                      {project.topic}
                    </Badge>
                  </CardAction>
                  <CardTitle>
                    <h3 className="font-semibold tracking-tight text-xl">
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
                    {project.badges.slice(0, 2).map((badge) => (
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
                        className="hover:cursor-pointer flex items-center"
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
      <section className="py-32 border-t">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"></div> */}
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                className="hover:cursor-pointer flex items-center"
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
