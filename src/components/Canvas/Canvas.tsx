// src/components/Canvas/Canvas.tsx
import { StarIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useMode } from '../LeftPanel/ModeContext';
import { useParticleSystem, type UseParticleSystemProps } from './useParticleSystem';

const Canvas: React.FC<UseParticleSystemProps> = (props) => {
  const { canvasRef } = useParticleSystem(props);
  const { mode } = useMode();

  return (
    <>
      {/* CANVAS */}
      <canvas className="block h-full w-full cursor-crosshair bg-[#070711]" ref={canvasRef} />

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
