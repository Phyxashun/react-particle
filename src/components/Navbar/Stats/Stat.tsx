import React from 'react';

export interface StatProps {
  title: string;
  stat: number;
  color: string;
}

const Stat: React.FC<StatProps> = ({ title, stat, color }: StatProps) => {
  return (
    <div className="stat m-0.5 w-24 p-0.5">
      <span className="stat-title text-xs">{title}</span>
      <b className={`stat-value text-sm ${color}`}>{stat}</b>
    </div>
  );
};

export default Stat;
