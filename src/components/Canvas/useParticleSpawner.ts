import { useEffect, useRef } from 'react';
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
  const modeRef = useRef(mode);

  useEffect(() => {
    const mode = modeRef.current;

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
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onUp);
    };
  }, [canvasRef, engine, latestProps, mode]);
};
