// src/components/RightPanel/QuadTreeLiveView.tsx
import React, { useRef, useEffect } from 'react';
import { useQTLiveView } from './QTLiveViewContext';

const QuadTreeLiveView: React.FC<QuadTreeLiveViewProps> = () => {
  const { liveViewData } = useQTLiveView();

  const qtCanvasRef = useRef<HTMLCanvasElement>(null);
  const { quadTree, particles, bounds } = liveViewData;

  useEffect(() => {
    const canvas = qtCanvasRef.current;
    if (!canvas || !quadTree || !particles || !bounds) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on its display size for high-DPI rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const w = canvas.width;
    const h = canvas.height;
    const sx = w / (bounds.width || 1);
    const sy = h / (bounds.height || 1);

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
  }, [quadTree, particles, bounds]); // Re-draw whenever the live data changes

  return (
    <div className="border-base-300 bg-base-100 mb-3.5 aspect-square overflow-hidden rounded border">
      <canvas id="qt-canvas" className="block h-full w-full" ref={qtCanvasRef}></canvas>
    </div>
  );
};

export default QuadTreeLiveView;
