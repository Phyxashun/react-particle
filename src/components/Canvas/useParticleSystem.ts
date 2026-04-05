import { useEffect, useRef } from 'react';
import { useMode } from '../LeftPanel/ModeContext';
import { useMiniMapSetter } from '../RightPanel/MiniMapContext';

import type { StatsDisplayProps } from '../Navbar/StatsDisplay';
import { useParticleEngine } from './useParticleEngine';
import { useParticleLoop } from './useParticleLoop';
import { useParticleSpawner } from './useParticleSpawner';

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

export const useParticleSystem = (props: UseParticleSystemProps) => {
  const { mode } = useMode();
  const setMiniMapData = useMiniMapSetter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const latestPropsRef = useRef(props);

  useEffect(() => {
    latestPropsRef.current = props;
  });

  const engine = useParticleEngine(canvasRef);

  useParticleSpawner({
    canvasRef,
    engine,
    latestProps: latestPropsRef,
    mode,
  });

  useParticleLoop({
    canvasRef,
    engine,
    latestProps: latestPropsRef,
    mode,
    setMiniMapData,
    onStatsChange: props.onStatsChange,
    onActionComplete: props.onActionComplete,
  });

  return { canvasRef };
};
