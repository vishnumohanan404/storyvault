import { GithubIcon, Globe2Icon, LinkedinIcon, TwitterIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="border border-t w-full">
      <div className="container mx-auto max-w-7xl py-6">
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-xl">Story</h4>
            <p className="text-sm text-muted-foreground">
              Interactive Project Narratives.
            </p>
            <p className="text-xs mt-4 text-muted-foreground">
              © 2025 Story. Built with Next.js and Tailwind CSS.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Link
              className="text-muted-foreground"
              href={"https://github.com/vishnumohanan404/storyvault"}
              target="_blank"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link
              className="text-muted-foreground"
              href={"https://vishnuvw.xyz/"}
              target="_blank"
            >
              <Globe2Icon className="w-5 h-5" />
            </Link>
            <Link
              className="text-muted-foreground"
              href={"https://www.linkedin.com/in/404vishnu/"}
              target="_blank"
            >
              <LinkedinIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
