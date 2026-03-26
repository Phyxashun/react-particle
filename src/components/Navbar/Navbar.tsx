import React from "react";
import StatsDisplay from "./StatsDisplay";
import Title from "./Title";

export interface NavbarStats {
  count: number;
  fps: number;
  qt: number;
  nb: number;
}

export interface NavbarProps {
  stats: NavbarStats;
}

const Navbar: React.FC<NavbarProps> = ({ stats }) => {
  return (
    <header>
      <nav className="navbar text-base-content bg-bg shadow-md">
        {/* Left Side */}
        <img className="mr-2 ml-4 size-8 flex-none " src="favicon.png" alt="logo" />
        <Title />

        {/* Right Side */}
        <StatsDisplay stats={stats} />
      </nav>
    </header>
  );
};

export default Navbar;
