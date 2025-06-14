'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { SidebarMenu } from './types';

const sidebarMenu: SidebarMenu = [
  {
    title: 'Getting Started',
    menu: [
      {
        id: 1,
        title: 'Overview',
        path: '',
        description: 'Project introduction and goals',
      },
      {
        id: 2,
        title: 'Architecture',
        path: 'architecture',
        description: 'System design and infrastructure',
      },
    ],
  },
  {
    title: 'Implementation',
    menu: [
      {
        id: 1,
        title: 'User Stories',
        path: 'userstories',
        description: 'Detailed development breakdown',
      },
      {
        id: 2,
        title: 'Implementation Guide',
        path: 'implementation',
        description: 'Step-by-step process',
      },
      // todo: after completing first project
      // {
      //   id: 3,
      //   title: "Lessons Learned",
      //   path: "lessons",
      //   description: "Insights and best practices",
      // },
    ],
  },
  {
    title: 'Interactive Tools',
    menu: [
      {
        id: 1,
        title: 'Kanban',
        href: 'kanban',
        description: 'Interractive userstory to track your progress',
      },
    ],
  },
];

const ProjectSidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const projectId = segments[1];

  return (
    <main className="mx-auto min-h-screen max-w-7xl py-8">
      <div className="flex space-x-14">
        <aside className="w-74 shrink-0">
          <ScrollArea>
            <div className="space-y-6">
              {sidebarMenu.map(menuItems => (
                <div className="space-y-3" key={menuItems.title}>
                  <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                    {menuItems.title}
                  </h4>
                  <div className="space-y-1">
                    {menuItems.menu.map(item => {
                      const linkHref = item.href
                        ? `/${item.href}/${projectId}` // use href directly
                        : `/project/${projectId}${
                            item.path ? `/${item.path}` : ''
                          }`; // fallback to path logic

                      const isActive = pathname === linkHref;

                      return (
                        <Link
                          key={item.id}
                          href={linkHref}
                          className={cn(
                            'hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground',
                          )}
                        >
                          <div className="space-y-1">
                            <div>{item.title}</div>
                            <div className="text-muted-foreground text-xs">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <div>{children}</div>
      </div>
    </main>
  );
};

export default ProjectSidebarLayout;
