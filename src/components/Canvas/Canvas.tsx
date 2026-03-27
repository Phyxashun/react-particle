// src/components/Canvas/Canvas.tsx
import React from 'react';
import { useParticleSystem } from './useParticleSystem';
import type { NavbarStats } from '../Navbar/Navbar';
import { StarIcon } from '@heroicons/react/24/solid';
import { useMode } from '../LeftPanel/ModeContext';

interface CanvasProps {
  spawnCount: number;
  spawnSpeed: number;
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  action: string | null;
  onActionComplete: () => void;
  onStatsChange: (stats: NavbarStats) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { canvasRef } = useParticleSystem(props);
  const { mode } = useMode();

  return (
    <>
      {/* CANVAS */}
      <canvas id="c" className="block h-full w-full cursor-crosshair bg-[#070711]" ref={canvasRef} />

      {/* CANVAS HINT */}
      <div className="text-base-content/60 pointer-events-none fixed bottom-3 left-1/2 flex -translate-x-1/2 text-center text-xs text-[9.5px] tracking-[0.08em] whitespace-nowrap">
        <span className="mr-1.5">click or drag</span>
        <StarIcon className="mt-px size-3 text-yellow-800" />
        <span className="ml-1.5">{mode}</span>
      </div>
    </>
  );
};

export default Canvas;
