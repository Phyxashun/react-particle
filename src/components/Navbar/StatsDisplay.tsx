import React from 'react';

export interface StatsDisplayProps {
  count: number;
  fps: number;
  qt: number;
  nb: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = (stats: StatsDisplayProps) => {
  const { count, fps, qt, nb } = stats;

  return (
    <div className="">
      <div className="rounded-box border border-dashed border-slate-700 bg-gray-900 text-center shadow-lg">
        <div className="">
          <div className="stats w-auto">
            <div className="stat w-24">
              <span className="stat-title text-[8px]">particles</span>
              <span className="stat-value text-[8px] text-teal-400">{count}</span>
            </div>
            <div className="stat w-24">
              <span className="stat-title text-[8px]">fps</span>
              <span className="stat-value text-[8px] text-rose-400">{fps}</span>
            </div>
            <div className="stat w-24">
              <span className="stat-title text-[8px]">qt nodes</span>
              <span className="stat-value text-[8px] text-yellow-300">{qt}</span>
            </div>
            <div className="stat w-24">
              <span className="stat-title text-[8px]">avg neighbors</span>
              <span className="stat-value text-[8px] text-blue-400">{nb}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
