import { useState, type ReactNode } from 'react';
import { StatsDataContext, StatsSetterContext, type StatsDisplayProps } from './StatsContext';

export const StatsProvider = ({ children }: { children?: ReactNode }) => {
  const [stats, setStats] = useState<StatsDisplayProps>({
    key: { title: '', stat: 0, color: '' },
  });

  return (
    <StatsSetterContext value={setStats}>
      <StatsDataContext value={stats}>{children}</StatsDataContext>
    </StatsSetterContext>
  );
};
