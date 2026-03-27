import { createContext, use } from 'react';
import { type ParticleMode } from '../../lib/Mode';

export const DefaultValue = 'spark';

export const ModeContext = createContext<{
  mode: string;
  setMode: (newMode: ParticleMode) => void;
}>(DefaultValue);

// Custom hook to consume the context
export const useMode = () => {
  const context = use(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
