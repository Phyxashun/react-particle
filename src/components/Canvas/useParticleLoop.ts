import { useEffect, useRef, type RefObject } from 'react';
import { makeConfettiClass, PERCEPTION } from '../../lib/decorators';
import Particle from '../../lib/Particle';
import { Random } from '../../lib/Random';
import Rectangle from '../../lib/Rectangle';
import Vector from '../../lib/Vector';
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

      const { action, showQt, showRadius, showLinks } = latestProps.current!;

      if (action && action !== lastActionRef.current) {
        lastActionRef.current = action;

        if (action === 'clear') system.clear();

        if (action === 'fill') {
          // addRandom() spawns a bare undecorated Particle with wrong velocities.
          // Use the current mode's decorated class with proper random velocities.
          const classes = engine.classesRef.current;
          if (classes) {
            for (let i = 0; i < 200; i++) {
              const x = Random(0, system.bounds.w);
              const y = Random(0, system.bounds.h);
              const angle = Random(0, Math.PI * 2);
              const speed = Random(60, 160);
              const ParticleClass = mode === 'confetti' ? makeConfettiClass() : classes[mode as keyof typeof classes];
              if (ParticleClass) {
                system.add(
                  new ParticleClass(new Vector(x, y), new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed))
                );
              }
            }
          }
        }

        onActionComplete();
      }

      fpsBuf.push(1 / dt);
      if (fpsBuf.length > 30) fpsBuf.shift();

      const fps = Math.round(fpsBuf.reduce((a, b) => a + b, 0) / fpsBuf.length);

      // CLEAR FIRST — trail/ghost effect when showLinks is on, clean clear when off
      ctx.save();
      ctx.fillStyle = showLinks ? 'rgba(3,5,13,0.8)' : '#03050d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // THEN UPDATE + RENDER — pass showLinks so WithLinkDraw can respect it
      system.update(dt);
      system.render(ctx, showQt, showLinks);

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

      if (perception > 0) {
        // Count neighbors from particle[0] for the stats display
        if (system.all.length) {
          const buf: Particle[] = [];
          const p0 = system.all[0];
          system.quadTree.query(Rectangle.circle(p0.position.x, p0.position.y, perception), buf);
          neighbors = buf.length;
        }

        // Draw perception radius around every particle — was particle[0] only,
        // and opacity 0.06 was imperceptible. Now 0.18 and all particles.
        if (showRadius) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255,255,255,0.18)';
          ctx.lineWidth = 0.5;
          for (const p of system.all) {
            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, perception, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      onStatsChange({
        count: system.count,
        fps,
        qt: system.quadTree.countNodes(),
        nb: neighbors,
      });
    };

    // Start asynchronously — calling loop() directly here fires setState
    // (onStatsChange + setMiniMapData) synchronously inside the effect, which
    // triggers immediate re-renders before React finishes flushing, hitting
    // "Maximum update depth exceeded". RAF defers the first frame safely.
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current!);
  }, [canvasRef, engine, latestProps, mode, onStatsChange, onActionComplete, setMiniMapData]);
};
