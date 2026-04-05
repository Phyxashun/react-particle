import React, { type PropsWithChildren } from 'react';
import StatsDisplay from './Stats/StatsDisplay';
import Title from './Title';

interface NavBarProps {
  className?: string;
}

const Navbar: React.FC<PropsWithChildren<NavBarProps>> = ({
  className = '',
  children,
}: PropsWithChildren<NavBarProps>) => (
  <header className={className}>
    <nav className="navbar text-base-content bg-bg shadow-md">
      {/* Left Side */}
      <img className="mr-2 ml-4 size-8 flex-none" src="favicon.png" alt="logo" />
      <Title />

      {/* Right Side */}
      <StatsDisplay />
      {children}
    </nav>
  </header>
);

export default Navbar;
