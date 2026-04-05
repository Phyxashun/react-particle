import { createContext, use } from 'react';

export interface DisplayContextProps {
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  setShowQt: (v: boolean) => void;
  setShowRadius: (v: boolean) => void;
  setShowLinks: (v: boolean) => void;
}

export const DisplayContext = createContext<DisplayContextProps>({
  showQt: false,
  showRadius: false,
  showLinks: true,
  setShowQt: () => {},
  setShowRadius: () => {},
  setShowLinks: () => {},
});

export const useDisplay = () => use(DisplayContext);
