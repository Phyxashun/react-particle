import { useState, type ReactNode } from 'react';
import { StatsDataContext, StatsSetterContext } from './StatsContext';
import type { StatsDisplayProps } from './StatsDisplay';

export const StatsProvider = ({ children }: { children?: ReactNode }) => {
  const [stats, setStats] = useState<StatsDisplayProps>({ count: 0, fps: 0, qt: 0, nb: 0 });

  // Setter context wraps data context — setStats is a stable useState setter,
  // so StatsSetterContext.value never changes and Canvas never re-renders
  // from its own stats writes.
  return (
    <StatsSetterContext value={setStats}>
      <StatsDataContext value={stats}>{children}</StatsDataContext>
    </StatsSetterContext>
  );
};
