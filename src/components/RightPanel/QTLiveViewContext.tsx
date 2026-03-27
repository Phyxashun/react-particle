import { createContext, use } from 'react';
import { type LiveViewData } from '../Canvas/useParticleSystem';

export const QTLiveViewContext = createContext<{
  liveViewData: LiveViewData;
  setLiveViewData(data): (data: LiveViewData) => void;
} | null>(null);

// Custom hook to consume the context
export const useQTLiveView = () => {
  const context = use(QTLiveViewContext);
  if (context === undefined) {
    throw new Error('useQTLiveView must be used within a QTLiveViewContextProvider');
  }
  return context;
};
