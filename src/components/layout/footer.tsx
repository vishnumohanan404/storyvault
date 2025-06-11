import {
  GithubIcon,
  Globe2Icon,
  LinkedinIcon,
  TwitterIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="w-full border border-t">
      <div className="container mx-auto max-w-7xl py-6">
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <h4 className="text-xl font-semibold">Story</h4>
            <p className="text-muted-foreground text-sm">
              Interactive Project Narratives.
            </p>
            <p className="text-muted-foreground mt-4 text-xs">
              © 2025 Story. Built with Next.js and Tailwind CSS.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="text-muted-foreground"
              href={'https://github.com/vishnumohanan404/storyvault'}
              target="_blank"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              className="text-muted-foreground"
              href={'https://vishnuvw.xyz/'}
              target="_blank"
            >
              <Globe2Icon className="h-5 w-5" />
            </Link>
            <Link
              className="text-muted-foreground"
              href={'https://www.linkedin.com/in/404vishnu/'}
              target="_blank"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
