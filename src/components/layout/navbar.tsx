import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex w-full justify-between border-b backdrop-blur-lg">
      <div className="container mx-auto flex max-w-7xl justify-between py-4">
        <Link href={'/'} className="text-xl font-bold capitalize">
          Story
        </Link>
        {/* todo: searchbar + theme toggle */}
      </div>
    </nav>
  );
};

export default Navbar;
