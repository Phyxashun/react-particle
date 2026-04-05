import { createContext, use } from 'react';

export interface CanvasActionContextProps {
  action: string | null;
  triggerAction: (action: string) => void;
  completeAction: () => void;
}

export const CanvasActionContext = createContext<CanvasActionContextProps>({
  action: null,
  triggerAction: () => {},
  completeAction: () => {},
});

export const useCanvasAction = () => use(CanvasActionContext);
