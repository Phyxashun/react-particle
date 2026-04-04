import React from 'react';
import StatsDisplay, { type StatsDisplayProps } from './StatsDisplay';
import Title from './Title';

export interface NavBarProps {
  stats: StatsDisplayProps;
  className?: string;
}

const Navbar: React.FC<NavBarProps> = ({ stats, className = '' }: NavBarProps) => {
  return (
    <header className={`${className}`}>
      <nav className="navbar text-base-content bg-bg shadow-md">
        {/* Left Side */}
        <img className="mr-2 ml-4 size-8 flex-none" src="favicon.png" alt="logo" />
        <Title />

        {/* Right Side */}
        <div className="flex flex-none">
          <StatsDisplay {...stats} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
