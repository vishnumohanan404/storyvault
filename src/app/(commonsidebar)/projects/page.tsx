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
import { ExternalLinkIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const projects = [
  {
    id: "1",
    title: "GitOps AWS Pipeline",
    description:
      "Complete GitOps implementation on AWS with EKS, ArgoCD, and automated CI/CD pipeline.",
    badges: ["AWS", "Kubernetes", "ArgoCD", "EKS", "GitLab"],
    featured: true,
    topic: "GitOps",
    createdOn: new Date(8.64e15).toString(),
  },
  {
    id: "2",
    title: "Microservices on K8s",
    description:
      "Scalable microservices architecture with service mesh, monitoring, and observability.",
    badges: ["Kubernetes", "Istio", "Prometheus"],
    featured: false,
    topic: "Architecture",
    createdOn: new Date(8.64e15).toString(),
  },
  {
    id: "3",
    title: "Serverless Platform",
    description:
      "Event-driven serverless platform with AWS Lambda, API Gateway, and DynamoDB.",
    badges: ["AWS Lambda", "API Gateway", "DynamoDB"],
    featured: true,
    topic: "Serverless",
    createdOn: new Date(8.64e15).toString(),
  },
  {
    id: "4",
    title: "Cloud Resume Project",
    description:
      "A portfolio website hosted in S3 with AWS Lambda, API Gateway, CloudFront and DynamoDB.",
    badges: ["AWS Lambda", "API Gateway", "DynamoDB", "S3"],
    featured: true,
    topic: "AWS",
    createdOn: new Date(8.64e15).toString(),
  },
];

const ProjectsPage = () => {
  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-accent">
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
                <Link href={`/project/${project.id}`}>
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
