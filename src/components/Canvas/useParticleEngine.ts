import { useEffect, useRef, type RefObject } from 'react';
import Bounds from '../../lib/Bounds';
import ParticleSystem from '../../lib/ParticleSystem';
import { buildClasses } from '../../lib/decorators';

export interface LatestPropsRef<T> {
  current: T;
}

export interface EngineRefs {
  systemRef: RefObject<ParticleSystem | null>;
  classesRef: RefObject<ReturnType<typeof buildClasses> | null>;
}

export const useParticleEngine = (canvasRef: RefObject<HTMLCanvasElement | null>): EngineRefs => {
  const systemRef: RefObject<ParticleSystem | null> = useRef<ParticleSystem | null>(null);
  const classesRef: RefObject<ReturnType<typeof buildClasses> | null> = useRef<ReturnType<typeof buildClasses> | null>(
    null
  );

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const parent = canvas.parentElement as HTMLElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect() as DOMRect;

      canvas.width = rect.width;
      canvas.height = rect.height;

      const bounds = new Bounds(rect.height, rect.width); // Bounds(h, w) — height first

      if (!systemRef.current) {
        systemRef.current = new ParticleSystem(bounds);
      } else {
        systemRef.current.resize(bounds);
      }

      classesRef.current = buildClasses(bounds);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => ro.disconnect();
  }, [canvasRef]);

  // Return a stable object reference — a plain `{ systemRef, classesRef }` literal
  // creates a new object on every render, causing useParticleLoop's effect to
  // re-run on every parent re-render and restarting the RAF loop each time.
  const engineRef = useRef<EngineRefs>({ systemRef, classesRef });
  return engineRef.current; // eslint-disable-line react-hooks/refs
};
