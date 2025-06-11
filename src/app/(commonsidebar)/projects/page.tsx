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
import { ExternalLinkIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Project } from '../types';

const PROJECTS_QUERY = `*[_type == "projects"]{ 
  _id, 
  title, 
  description,
  badges,
  topic,
  featured,
  createdOn }`;

const options = { next: { revalidate: 30 } };

const ProjectsPage = async () => {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <Badge className="border-chart-1 rounded-3xl" variant="outline">
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
  );
};

export default ProjectsPage;
