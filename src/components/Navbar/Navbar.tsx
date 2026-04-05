import React from 'react';
import StatsDisplay from './StatsDisplay';
import Title from './Title';

interface NavBarProps {
  className?: string;
}

const Navbar: React.FC<NavBarProps> = ({ className = '' }) => (
  <header className={className}>
    <nav className="navbar text-base-content bg-bg shadow-md">
      {/* Left Side */}
      <img className="mr-2 ml-4 size-8 flex-none" src="favicon.png" alt="logo" />
      <Title />

      {/* Right Side */}
      <div className="flex flex-none">
        <StatsDisplay />
      </div>
    </nav>
  </header>
);

export default Navbar;
