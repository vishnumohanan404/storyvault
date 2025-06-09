import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b flex justify-between sticky top-0 w-full z-10 backdrop-blur-lg ">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <h4 className="text-xl font-bold capitalize">Story</h4>
        {/* todo: searchbar + theme toggle */}
      </div>
    </nav>
  );
};

export default Navbar;
