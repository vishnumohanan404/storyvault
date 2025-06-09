import { Badge } from "@/components/ui/badge";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="py-6">
      <div>
        <div className="flex gap-2 mb-3">
          <Badge variant="outline" className="rounded-2xl">
            AWS
          </Badge>
          <Badge variant="outline" className="rounded-2xl">
            Kubernetes
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          GitOps AWS Pipeline
        </h1>
      </div>
    </div>
  );
};

export default ProjectPage;
