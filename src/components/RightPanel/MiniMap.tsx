// src/components/RightPanel/QuadTreeLiveView.tsx
import React, { useEffect, useRef } from 'react';
import { useMiniMap } from './MiniMapContext';

export interface MiniMapProps {
  className?: string;
}

const QuadTreeLiveView: React.FC<MiniMapProps> = ({ className = '' }: MiniMapProps) => {
  const { miniMapData } = useMiniMap();

  const qtCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = qtCanvasRef.current;
    // miniMapData is null until the first loop tick populates it
    if (!canvas || !miniMapData) return;

    const { quadTree, particles, bounds } = miniMapData;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    const sx = w / (bounds.w || 1);
    const sy = h / (bounds.h || 1);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.scale(sx, sy);

    // Draw the QuadTree grid
    quadTree.draw(ctx);

    // Draw the particles
    ctx.fillStyle = 'rgba(56,200,168,0.7)';
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.position.x, p.position.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }, [miniMapData]); // Re-draw whenever the live data changes

  return (
    <div className={`${className} b-4 flex-col gap-2`}>
      <p className="mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase">QuadTree Live View</p>
      <canvas
        className="border-base-300 bg-base-100 block aspect-square h-full w-full overflow-hidden rounded border"
        ref={qtCanvasRef}
      ></canvas>
    </div>
  );
};

export default QuadTreeLiveView;
