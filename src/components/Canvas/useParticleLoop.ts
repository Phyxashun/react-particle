import { useEffect, useRef, type RefObject } from 'react';
import { PERCEPTION } from '../../lib/decorators';
import Particle from '../../lib/Particle';
import Rectangle from '../../lib/Rectangle';
import type { MiniMapData } from '../RightPanel/MiniMapContext';
import type { EngineRefs, LatestPropsRef } from './useParticleEngine';
import type { UseParticleSystemProps } from './useParticleSystem';

interface UseParticleLoopParams {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  engine: EngineRefs;
  latestProps: LatestPropsRef<UseParticleSystemProps | null>;
  mode: string | null;
  onStatsChange: UseParticleSystemProps['onStatsChange'];
  onActionComplete: UseParticleSystemProps['onActionComplete'];
  setMiniMapData: (data: MiniMapData) => void;
}

export const useParticleLoop = ({
  canvasRef,
  engine,
  latestProps,
  mode,
  onStatsChange,
  onActionComplete,
  setMiniMapData,
}: UseParticleLoopParams): void => {
  const rafRef = useRef<number>(0);
  const lastActionRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let last = performance.now();
    const fpsBuf: number[] = [];
    let qtTick = 0;

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const system = engine.systemRef.current;
      if (!system) return;

      const { action, showQt, showRadius } = latestProps.current!;

      if (action && action !== lastActionRef.current) {
        lastActionRef.current = action;

        if (action === 'clear') system.clear();

        if (action === 'fill') {
          for (let i = 0; i < 200; i++) {
            system.addRandom();
          }
        }

        onActionComplete();
      }

      fpsBuf.push(1 / dt);
      if (fpsBuf.length > 30) fpsBuf.shift();

      const fps = Math.round(fpsBuf.reduce((a, b) => a + b, 0) / fpsBuf.length);

      // CLEAR FIRST
      ctx.save();
      ctx.fillStyle = 'rgba(3,5,13,0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // THEN UPDATE + RENDER
      system.update(dt);
      system.render(ctx, showQt);

      // THEN MINIMAP (unchanged timing)
      if (++qtTick % 3 === 0) {
        setMiniMapData({
          quadTree: system.quadTree,
          particles: system.all,
          bounds: system.bounds,
        });
      }

      let neighbors = 0;
      const perception = PERCEPTION[mode as keyof typeof PERCEPTION] ?? 0;

      if (system.all.length && perception > 0) {
        const p = system.all[0];
        const buf: Particle[] = [];

        system.quadTree.query(Rectangle.circle(p.position.x, p.position.y, perception), buf);

        neighbors = buf.length;

        if (showRadius) {
          ctx.beginPath();
          ctx.arc(p.position.x, p.position.y, perception, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.stroke();
        }
      }

      onStatsChange({
        count: system.count,
        fps,
        qt: system.quadTree.countNodes(),
        nb: neighbors,
      });
    };

    loop(performance.now());

    return () => cancelAnimationFrame(rafRef.current!);
  }, [canvasRef, engine, latestProps, mode, onStatsChange, onActionComplete, setMiniMapData]);
};
