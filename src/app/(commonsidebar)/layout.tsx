"use client";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarMenu = [
  {
    title: "Projects",
    href: "/projects",
    description: "Explore our complete collection of projects",
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Explore the resources to start your own project",
  },
  {
    title: "Changelogs",
    href: "/changelogs",
    description: "Current version: v1.0.0",
  },
];

const CommonSidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div className="flex space-x-14">
      <aside className="w-74 shrink-0">
        <ScrollArea>
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Features
              </h4>
              <div className="space-y-1">
                {sidebarMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      item.href === pathname
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    <div className="space-y-1">
                      <div>{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider"></h4>
            </div>
          </div>
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
};

export default CommonSidebarLayout;
