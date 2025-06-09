import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b flex justify-between">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <h4 className="text-xl font-bold capitalize">Svault</h4>
        {/* todo: searchbar + theme toggle */}
      </div>
    </nav>
  );
};

export default Navbar;
