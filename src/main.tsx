// Import styles
import './styles/styles.css';

// Import react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import Components
import App from './App.tsx';
import { ModeProvider } from './components/LeftPanel/ModeProvider';
import { QTLiveViewProvider } from './components/RightPanel/QTLiveViewProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModeProvider>
      <QTLiveViewProvider>
        <App />
      </QTLiveViewProvider>
    </ModeProvider>
  </StrictMode>
);
