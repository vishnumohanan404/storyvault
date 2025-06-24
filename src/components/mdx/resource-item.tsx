import { ExternalLink } from 'lucide-react';
import React from 'react';

const ResourceItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={link}
    >
      {title}
      <ExternalLink className="ml-2 h-3 w-3" />
    </a>
  );
};

export default ResourceItem;
