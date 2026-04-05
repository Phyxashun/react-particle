import { useEffect, useRef } from 'react';
import { useMode } from '../LeftPanel/ModeContext';
import { useMiniMapSetter } from '../RightPanel/MiniMapContext';

import { useCanvasAction } from '../LeftPanel/CanvasActionContext';
import { useDisplay } from '../LeftPanel/DisplayContext';
import { useSpawn } from '../LeftPanel/SpawnContext';
import { useStatsSetter } from '../Navbar/StatsContext';
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

export const useParticleSystem = () => {
  const { mode } = useMode();
  const displayToggle = useDisplay();
  const canvasAction = useCanvasAction();
  const spawnControl = useSpawn();
  const stats = useStatsSetter();

  const CanvasLatestValues: UseParticleSystemProps = {
    onStatsChange: stats,
    showQt: displayToggle.showQt,
    showRadius: displayToggle.showRadius,
    showLinks: displayToggle.showLinks,
    spawnCount: spawnControl.particleCount,
    spawnSpeed: spawnControl.particleSpeed,
    action: canvasAction.action,
    onActionComplete: canvasAction.completeAction,
  };

  const setMiniMapData = useMiniMapSetter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const latestPropsRef = useRef(CanvasLatestValues);

  useEffect(() => {
    latestPropsRef.current = CanvasLatestValues;
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
    onStatsChange: CanvasLatestValues.onStatsChange,
    onActionComplete: CanvasLatestValues.onActionComplete,
  });

  return canvasRef;
};
