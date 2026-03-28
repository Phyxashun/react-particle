import { createContext, use } from 'react';
import { type ParticleMode } from '../../lib/Mode';

export interface ModeContextProps {
  mode: string | null;
  setMode: (newMode: ParticleMode) => void;
}

export const ModeContext = createContext<ModeContextProps | undefined>(undefined);

// Custom hook to consume the context
export const useMode = () => {
  const context = use(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
