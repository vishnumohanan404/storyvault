import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex w-full justify-between border-b backdrop-blur-lg">
      <div className="container mx-auto flex max-w-7xl justify-between py-4">
        <Link href={'/'} className="text-xl font-bold capitalize">
          Stories
        </Link>
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
