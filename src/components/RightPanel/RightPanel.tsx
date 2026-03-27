// src/components/RightPanel/RightPanel.tsx
import React from 'react';
import type { ParticleMode } from '../../lib/Mode';
import DecoratorStack from './DecoratorStack';
import PerformanceNote from './PerformanceNote';
import QuadTreeLiveView from './QuadTreeLiveView';

interface RightPanelProps {
  mode: ParticleMode;
  showQt: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ showQt }) => {
  return (
    <aside className="bg-base-200 border-base-300 flex h-screen flex-col border-l px-3 py-3.5">
      {showQt && (
        <div className="mb-4 flex flex-col gap-2">
          <p className="text-base-content/60 text-[8.5px] tracking-[0.15em] uppercase">QuadTree Live View</p>
          <div className="w-full">
            <QuadTreeLiveView />
          </div>
        </div>
      )}

      {/* Force DecoratorStack to stay within the 205px width */}
      <div className="flex h-full w-full grow">
        <DecoratorStack />
      </div>

      <div className="divider my-2"></div>

      <PerformanceNote />
    </aside>
  );
};

export default RightPanel;
