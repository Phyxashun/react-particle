import React, { type PropsWithChildren } from 'react';

interface NavBarProps {
  className?: string;
}

const Navbar: React.FC<PropsWithChildren<NavBarProps>> = ({
  className = '',
  children,
}: PropsWithChildren<NavBarProps>) => (
  <nav className={`navbar text-base-content bg-bg shadow-md ${className}`}>
    <img className="mr-2 ml-4 size-8 flex-none" src="favicon.png" alt="logo" />
    {children}
  </nav>
);

export default Navbar;
