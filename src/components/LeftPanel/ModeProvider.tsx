import { useMemo, useState, type ReactNode } from 'react';
import { type ParticleMode } from '../../lib/Mode';
import { ModeContext } from './ModeContext';

interface ModeProviderProps {
  children?: ReactNode;
}

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const [mode, setMode] = useState<ParticleMode | null>(null);
  const contextValue = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeContext value={contextValue}>{children}</ModeContext>;
};
