import { createContext, use } from 'react';
import type { StatsDisplayProps } from './StatsDisplay';

// Split into two contexts — the same pattern as MiniMapContext.
// StatsSetterContext holds the stable useState setter; Canvas / useParticleLoop
// only subscribes to this, so it never re-renders from its own 60fps writes.
// StatsDataContext changes every frame; only StatsDisplay subscribes to it.

export const StatsDataContext = createContext<StatsDisplayProps>({
  count: 0,
  fps: 0,
  qt: 0,
  nb: 0,
});

export const StatsSetterContext = createContext<(stats: StatsDisplayProps) => void>(() => {});

export const useStatsData = () => use(StatsDataContext);
export const useStatsSetter = () => use(StatsSetterContext);
