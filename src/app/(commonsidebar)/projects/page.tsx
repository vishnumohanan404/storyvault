import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/sanity/client";
import { ExternalLinkIcon, StarIcon } from "lucide-react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import React from "react";

const PROJECTS_QUERY = `*[_type == "projects"]{ 
  _id, 
  title, 
  description,
  badges,
  topic,
  featured,
  createdOn }`;

const options = { next: { revalidate: 30 } };
type Project = {
  _id: string;
  title: string;
  description: string;
  badges: string[];
  topic: string;
  featured: boolean;
  createdOn: string; // or Date if you parse it
};

const ProjectsPage = async () => {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  console.log('projects :>> ', projects);
  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project._id} className="hover:shadow-accent">
            <CardHeader className="flex flex-col space-y-2">
              <CardAction className="flex justify-between gap-2">
                {project.featured ? (
                  <Badge
                    className="rounded-3xl border-green-400 bg-green-400/25"
                    variant="secondary"
                  >
                    <StarIcon className="text-green-500" />
                    Featured
                  </Badge>
                ) : (
                  <></>
                )}
                <Badge className="rounded-3xl border-chart-1" variant="outline">
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
                <Button
                  variant="secondary"
                  size="sm"
                  className="hover:cursor-pointer flex items-center"
                >
                  Kanban
                  <ExternalLinkIcon />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
