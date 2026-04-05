import { useEffect, type RefObject } from 'react';
import { makeConfettiClass } from '../../lib/decorators';
import { Random } from '../../lib/Random';
import Vector from '../../lib/Vector';
import type { EngineRefs, LatestPropsRef } from './useParticleEngine';
import type { UseParticleSystemProps } from './useParticleSystem';

interface UseParticleSpawnerParams {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  engine: EngineRefs;
  latestProps: LatestPropsRef<UseParticleSystemProps | null>;
  mode: string | null;
}

export const useParticleSpawner = (props: UseParticleSpawnerParams): void => {
  const { canvasRef, engine, latestProps, mode } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMouse = (e: MouseEvent): [number, number] => {
      const r: DOMRect = canvas.getBoundingClientRect();
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
      const vy = mode === 'spark' || mode === 'bubble' ? Math.sin(angle) * speed - 80 : Math.sin(angle) * speed;

      const ParticleClass = mode === 'confetti' ? makeConfettiClass() : classes[mode as keyof typeof classes];

      if (ParticleClass) {
        system.add(new ParticleClass(new Vector(x, y), new Vector(vx, vy)));
      }
    };

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
      e.preventDefault();

      const [x, y] = getMouse(e);
      const { spawnCount } = latestProps.current!;

      for (let i = 0; i < spawnCount; i++) {
        spawnAt(x + Random(-10, 10), y + Random(-10, 10));
      }

      window.addEventListener('mousemove', onWindowMove);
      window.addEventListener('mouseup', onWindowUp);
    };

    canvas.addEventListener('mousedown', onDown);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowUp);
    };
  }, [canvasRef, engine, latestProps, mode]);
};
