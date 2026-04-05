import React from 'react';
import Stat from './Stat';
import { useStatsData, type StatsDisplayProps } from './StatsContext';

const StatsDisplay: React.FC = () => {
  const stats: StatsDisplayProps = useStatsData();

  return (
    <div className="stats dropdown-content rounded-box z-1 m-0.5 flex h-auto w-auto flex-none border border-dashed border-slate-700 bg-gray-900 p-0.5 text-center shadow-lg">
      {Object.entries(stats).map(([key, item]) => (
        <Stat key={key} title={item.title} stat={item.stat} color={item.color} />
      ))}
    </div>
  );
};

export default StatsDisplay;
