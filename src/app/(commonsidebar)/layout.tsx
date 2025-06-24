'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const sidebarMenu = [
  {
    title: 'Featured',
    menu: [
      {
        title: 'Projects',
        href: '/projects',
        description: 'Explore our complete collection of projects',
      },
      {
        title: 'Resources',
        href: '/resources',
        description: 'Explore resources to help you get started',
      },
    ],
  },
  {
    title: 'Others',
    menu: [
      {
        title: 'Changelogs',
        href: '/changelogs',
        description: 'Current version & features',
      },
    ],
  },
];

const CommonSidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
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
                    {menuItems.menu.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-sm transition-colors',
                          item.href === pathname
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
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
        {children}
      </div>
    </main>
  );
};

export default CommonSidebarLayout;
