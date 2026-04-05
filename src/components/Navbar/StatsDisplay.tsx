import React from 'react';
import { useStatsData } from './StatsContext';

export interface StatsDisplayProps {
  count: number;
  fps: number;
  qt: number;
  nb: number;
}

const StatsDisplay: React.FC = () => {
  const stats: StatsDisplayProps = useStatsData();

  return (
    <div className="flex-none">
      <div className="dropdown-content rounded-box z-1 h-auto w-auto border border-dashed border-slate-700 bg-gray-900 text-center shadow-lg">
        <div className="m-0.5 p-0.5">
          <div className="stats w-auto">
            <div className="stat m-0 w-24 p-0">
              <span className="stat-title text-xs">particles</span>
              <b className="stat-value text-sm text-teal-400">{stats.count}</b>
            </div>
            <div className="stat m-0 w-24 p-0">
              <span className="stat-title text-xs">fps</span>
              <b className="stat-value text-sm text-rose-400">{stats.fps}</b>
            </div>
            <div className="stat m-0 w-24 p-0">
              <span className="stat-title text-xs">qt nodes</span>
              <b className="stat-value text-sm text-yellow-300">{stats.qt}</b>
            </div>
            <div className="stat m-0 w-24 p-0">
              <span className="stat-title text-xs">neighbors</span>
              <b className="stat-value text-sm text-blue-400">{stats.nb}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
