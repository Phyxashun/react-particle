// Import styles
import './styles/styles.css';

// Import react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import Components
import App from './App.tsx';
import { CanvasActionProvider } from './components/LeftPanel/CanvasActionProvider';
import { DisplayProvider } from './components/LeftPanel/DisplayProvider';
import { ModeProvider } from './components/LeftPanel/ModeProvider';
import { SpawnProvider } from './components/LeftPanel/SpawnProvider';
import { MiniMapProvider } from './components/RightPanel/MiniMapProvider.tsx';
import { StatsProvider } from './components/Stats/StatsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModeProvider>
      <DisplayProvider>
        <SpawnProvider>
          <CanvasActionProvider>
            <StatsProvider>
              <MiniMapProvider>
                <App />
              </MiniMapProvider>
            </StatsProvider>
          </CanvasActionProvider>
        </SpawnProvider>
      </DisplayProvider>
    </ModeProvider>
  </StrictMode>
);
