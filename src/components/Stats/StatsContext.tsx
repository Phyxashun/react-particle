import { createContext, use } from 'react';
import type { StatProps } from './Stat';

export type StatsDisplayProps = Record<string, StatProps>;

export const StatsDataContext = createContext<StatsDisplayProps>({
  key: { title: '', stat: 0, color: '' },
});

export const StatsSetterContext = createContext<(stats: StatsDisplayProps) => void>(() => {});

export const useStatsData = () => use(StatsDataContext);
export const useStatsSetter = () => use(StatsSetterContext);
