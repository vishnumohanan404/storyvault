import { readFileSync } from 'node:fs';
import path from 'node:path';

import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';

// Utility: get latest version from CHANGELOG.md
const getLatestVersion = () => {
  const filePath = path.join(process.cwd(), 'CHANGELOG.md');
  const fileContents = readFileSync(filePath, 'utf8');

  // Find the first version header (e.g., "## 0.2.0")
  const match = fileContents.match(/^##\s+([\d.]+)/m);
  return match ? match[1] : '0.0.0';
};

const Navbar = () => {
  const latestVersion = getLatestVersion();

  return (
    <nav className="sticky top-0 z-10 flex w-full justify-between border-b backdrop-blur-lg">
      <div className="container mx-auto flex max-w-7xl justify-between py-4">
        <div className="flex items-center space-x-2">
          <Link href={'/'} className="text-xl font-bold capitalize">
            Stories
          </Link>
          <div className="m-auto w-min rounded-3xl bg-gradient-to-b from-blue-300 to-pink-300 p-px dark:from-blue-800 dark:to-purple-800 ">
            <div className="rounded-[calc(1.5rem-1px)] bg-white p-1 py-0 dark:bg-gray-900">
              <span className="text-nowrap text-muted-foreground line-clamp-1 whitespace-nowrap px-1 text-[12px] font-light">
                Beta v{latestVersion}
              </span>
            </div>
          </div>
        </div>
        {/* todo: searchbar + theme toggle */}
        <div className="space-x-2">
          <Link href={'/projects'}>
            <Button variant={'link'} className="cursor-pointer">
              Projects
            </Button>
          </Link>
          <Link href={'/resources'}>
            <Button variant={'link'} className="cursor-pointer">
              Resources
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
