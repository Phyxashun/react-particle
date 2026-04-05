import { useEffect, useRef } from 'react';
import { useMode } from '../LeftPanel/ModeContext';
import { useMiniMapSetter } from '../RightPanel/MiniMapContext';

import { useCanvasAction } from '../LeftPanel/CanvasActionContext';
import { useDisplay } from '../LeftPanel/DisplayContext';
import { useSpawn } from '../LeftPanel/SpawnContext';
import type { StatsDisplayProps } from '../Stats/StatsContext';
import { useStatsSetter } from '../Stats/StatsContext';
import { useParticleEngine } from './useParticleEngine';
import { useParticleLoop } from './useParticleLoop';
import { useParticleSpawner } from './useParticleSpawner';

export interface UseParticleSystemProps {
  // Navbar stats display
  onStatsChange: (stats: StatsDisplayProps) => void;
  // Left panel toggles
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  // Left panel sliders
  spawnCount: number;
  spawnSpeed: number;
  // Left panel buttons;
  action: string | null;
  onActionComplete: () => void;
}

export const useParticleSystem = () => {
  // Navbar stats
  const stats = useStatsSetter();

  // Left panel mode selection buttons
  const { mode } = useMode();

  // Left panel toggles
  const displayToggle = useDisplay();

  // Left panel sliders
  const spawnControl = useSpawn();

  // Left panel action buttons
  const canvasAction = useCanvasAction();

  const CanvasLatestValues: UseParticleSystemProps = {
    // Navbar stats
    onStatsChange: stats,

    // Display toggles
    showQt: displayToggle.showQt,
    showRadius: displayToggle.showRadius,
    showLinks: displayToggle.showLinks,

    // Spawn controls
    spawnCount: spawnControl.particleCount,
    spawnSpeed: spawnControl.particleSpeed,

    // Canvas actions
    action: canvasAction.action,
    onActionComplete: canvasAction.completeAction,
  };

  // Right panel quadtree minimap
  const setMiniMapData = useMiniMapSetter();

  // Canvas element
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
