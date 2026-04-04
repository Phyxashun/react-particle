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

export const useParticleSpawner = ({ canvasRef, engine, latestProps, mode }: UseParticleSpawnerParams): void => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDown = false;

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

    const onDown = (e: MouseEvent): void => {
      isDown = true;

      const [x, y] = getMouse(e);
      const { spawnCount } = latestProps.current!;

      for (let i = 0; i < spawnCount; i++) {
        spawnAt(x + Random(-10, 10), y + Random(-10, 10));
      }
    };

    const onMove = (e: MouseEvent): void => {
      if (!isDown) return;

      const [x, y] = getMouse(e);
      const { spawnCount } = latestProps.current!;

      for (let i = 0; i < Math.ceil(spawnCount / 4); i++) {
        spawnAt(x + Random(-8, 8), y + Random(-8, 8));
      }
    };

    const onUp = (): void => {
      isDown = false;
    };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [canvasRef, engine, latestProps, mode]);
};
