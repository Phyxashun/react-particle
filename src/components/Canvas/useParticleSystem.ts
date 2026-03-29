// src/components/Canvas/useParticleSystem.ts
import { useEffect, useRef } from 'react';
import Bounds from '../../lib/Bounds';
import Particle from '../../lib/Particle';
import ParticleSystem from '../../lib/ParticleSystem';
import Rectangle from '../../lib/Rectangle';
import Vector from '../../lib/Vector';
import { buildClasses, makeConfettiClass, PERCEPTION } from '../../lib/decorators';
import { useMode } from '../LeftPanel/ModeContext';
import type { StatsDisplayProps } from '../Navbar/StatsDisplay';
import { useMiniMap } from '../RightPanel/MiniMapContext';

export interface UseParticleSystemProps {
  action: string | null;
  spawnCount: number;
  spawnSpeed: number;
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  onStatsChange: (stats: StatsDisplayProps) => void;
  onActionComplete: () => void;
}

export type ParticleClassMap = ReturnType<typeof buildClasses>;

export const rand = (a: number, b: number) => a + Math.random() * (b - a);

export const useParticleSystem = (props: UseParticleSystemProps) => {
  const { onStatsChange, onActionComplete } = props;
  const { mode } = useMode();
  const { setMiniMapData } = useMiniMap();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem>(undefined);
  const particleClassesRef = useRef<ParticleClassMap>(undefined);
  const animationFrameIdRef = useRef<number>(undefined);
  const latestPropsRef = useRef(props);
  //const dprRef = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  useEffect(() => {
    latestPropsRef.current = props;
  }, [props]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent: HTMLElement = canvas.parentElement as HTMLElement;

    const handleResize = () => {
      const rect = parent.getBoundingClientRect();

      //dprRef.current = window.devicePixelRatio || 1;

      canvas.width = rect.width; //* dprRef.current;
      canvas.height = rect.height; //* dprRef.current;

      const w = canvas.width;
      const h = canvas.height;

      const sx = w / (rect.width || 1);
      const sy = h / (rect.height || 1);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(sx, sy);

      const newBounds: Bounds<{ x: number; y: number }> = new Bounds(canvas.width, canvas.height);

      if (systemRef.current) {
        systemRef.current.resize(newBounds);
      } else {
        systemRef.current = new ParticleSystem(newBounds);
      }
      particleClassesRef.current = buildClasses(newBounds);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const getPos = (e: MouseEvent | TouchEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();

      if (e instanceof MouseEvent) {
        return [e.clientX - rect.left, e.clientY - rect.top];
      } else {
        const touch = e.touches[0];
        return [touch.clientX - rect.left, touch.clientY - rect.top];
      }
    };

    let isMouseDown = false;
    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      e.preventDefault();
      const [x, y] = getPos(e);
      const { spawnCount } = latestPropsRef.current;
      for (let i = 0; i < spawnCount; i++) {
        spawnAt(x + rand(-10, 10), y + rand(-10, 10));
      }
    };
    const onMouseUp = () => {
      isMouseDown = false;
    };
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const { spawnCount } = latestPropsRef.current;
      const [x, y] = getPos(e);
      for (let i = 0; i < Math.ceil(spawnCount / 4); i++) {
        spawnAt(x + rand(-8, 8), y + rand(-8, 8));
      }
    };

    const spawnAt = (x: number, y: number) => {
      const system = systemRef.current;
      const particleClasses = particleClassesRef.current;
      if (!system || !particleClasses) return;

      const { spawnSpeed } = latestPropsRef.current;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(60, 160) * spawnSpeed;
      const vx = Math.cos(angle) * speed;
      const vy = mode === 'spark' ? Math.sin(angle) * speed - 80 : Math.sin(angle) * speed;

      const ParticleClass =
        mode === 'confetti' ? makeConfettiClass() : particleClasses[mode as keyof typeof particleClasses];
      if (ParticleClass) {
        system.add(new ParticleClass(new Vector(x, y), new Vector(vx, vy)));
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchstart', onMouseDown, { passive: false });
    canvas.addEventListener('touchend', onMouseUp);
    canvas.addEventListener('touchmove', onMouseMove, { passive: false });

    let lastTime = performance.now();
    const fpsArr: number[] = [];
    let qtTick = 0;

    const loop = (now: DOMHighResTimeStamp) => {
      animationFrameIdRef.current = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const { action, showQt, showRadius } = latestPropsRef.current;
      const system = systemRef.current;

      if (action && system) {
        if (action === 'clear') system.clear();
        if (action === 'fill') {
          for (let i = 0; i < 200; i++) spawnAt(rand(20, system.bounds.w - 20), rand(20, system.bounds.h - 20));
        }
        onActionComplete();
      }

      fpsArr.push(1 / dt);
      if (fpsArr.length > 30) fpsArr.shift();
      const fps = Math.round(fpsArr.reduce((a, b) => a + b, 0) / fpsArr.length);

      const { width, height } = canvas.getBoundingClientRect();

      ctx.save();
      ctx.fillStyle = 'rgba(3,5,13,0.8)';
      ctx.fillRect(0, 0, width, height);
      //ctx.fillRect(0, 0, canvas.width / dprRef.current, canvas.height / dprRef.current);
      ctx.restore();

      if (system) {
        system.update(dt);
        system.render(ctx, showQt);

        let neighbors = 0;
        const perceptionRadius = PERCEPTION[mode as keyof typeof PERCEPTION] ?? 0;
        if (system.all.length > 0 && perceptionRadius > 0) {
          const sampleParticle = system.all[0];
          const queryBuffer: Particle[] = [];
          system.quadTree.query(
            Rectangle.circle(sampleParticle.position.x, sampleParticle.position.y, perceptionRadius),
            queryBuffer
          );
          neighbors = queryBuffer.length;
          if (showRadius) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sampleParticle.position.x, sampleParticle.position.y, perceptionRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
        onStatsChange({ count: system.count, fps, qt: system.quadTree.countNodes(), nb: neighbors });

        if (++qtTick % 3 === 0) {
          setMiniMapData({
            quadTree: system.quadTree,
            particles: system.all,
            bounds: system.bounds,
          });
        }
      }
    };
    loop(performance.now());

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchstart', onMouseDown);
      canvas.removeEventListener('touchend', onMouseUp);
      canvas.removeEventListener('touchmove', onMouseMove);
    };
  }, [onActionComplete, onStatsChange, setMiniMapData, mode]);

  return { canvasRef };
};
