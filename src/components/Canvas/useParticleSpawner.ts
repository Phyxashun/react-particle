import { useEffect } from 'react';
import { makeConfettiClass } from '../../lib/decorators';
import { Random } from '../../lib/Random';
import Vector from '../../lib/Vector';
import type { EngineRefs, LatestPropsRef } from './useParticleEngine';
import type { UseParticleSystemProps } from './useParticleSystem';

interface UseParticleSpawnerParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  engine: EngineRefs;
  latestProps: LatestPropsRef<UseParticleSystemProps | null>;
  mode: string | null;
}
/**
 * web address:  https://github.com/Phyxashun/react-particle
 * https git:    https://github.com/Phyxashun/react-particle.git
 * ssh git:      git@github.com:Phyxashun/react-particle.git
 * github cli:   gh repo clone Phyxashun/react-particle
 * download zip: https://github.com/Phyxashun/react-particle/archive/refs/heads/main.zip
 */
export const useParticleSpawner = ({ canvasRef, engine, latestProps, mode }: UseParticleSpawnerParams): void => {
  useEffect(() => {
    // `mode` is in the dep array — the effect re-runs on every mode change,
    // so the closure always captures the current value directly.

    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMouse = (e: MouseEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };

    const spawnAt = (x: number, y: number): void => {
      const system = engine.systemRef.current;
      const classes = engine.classesRef.current;
      if (!system || !classes) return;

      const { spawnSpeed } = latestProps.current!;

      const angle = Random(Math.PI * 2);
      const speed = Random(60, 160) * spawnSpeed;

      const vx = Math.cos(angle) * speed;
      const vy = mode === 'spark' ? Math.sin(angle) * speed - 80 : Math.sin(angle) * speed;

      const ParticleClass = mode === 'confetti' ? makeConfettiClass() : classes[mode as keyof typeof classes];

      if (ParticleClass) {
        system.add(new ParticleClass(new Vector(x, y), new Vector(vx, vy)));
      }
    };

    // Promoted to window during drag so events are never lost when the cursor
    // briefly leaves the canvas boundary (which would fire mouseleave and kill
    // the drag if listeners stayed on the canvas element).
    const onWindowMove = (e: MouseEvent): void => {
      const [x, y] = getMouse(e);
      const { spawnCount } = latestProps.current!;

      for (let i = 0; i < Math.ceil(spawnCount / 4); i++) {
        spawnAt(x + Random(-8, 8), y + Random(-8, 8));
      }
    };

    const onWindowUp = (): void => {
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowUp);
    };

    const onDown = (e: MouseEvent): void => {
      // Prevent the browser's native drag / text-selection behavior from
      // swallowing subsequent mousemove events on the canvas.
      e.preventDefault();

      const [x, y] = getMouse(e);
      const { spawnCount } = latestProps.current!;

      for (let i = 0; i < spawnCount; i++) {
        spawnAt(x + Random(-10, 10), y + Random(-10, 10));
      }

      // Promote move + release listeners to window for the duration of the drag.
      window.addEventListener('mousemove', onWindowMove);
      window.addEventListener('mouseup', onWindowUp);
    };

    canvas.addEventListener('mousedown', onDown);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      // Clean up window listeners if the effect tears down mid-drag.
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowUp);
    };
  }, [canvasRef, engine, latestProps, mode]);
};
