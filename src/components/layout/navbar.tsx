import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b flex justify-between sticky top-0 w-full z-10 backdrop-blur-lg ">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <Link href={"/projects"} className="text-xl font-bold capitalize">
          Story
        </Link>
        {/* todo: searchbar + theme toggle */}
      </div>
    </nav>
  );
};

export default Navbar;
