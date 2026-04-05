// src/App.tsx
import Canvas from './components/Canvas/Canvas';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Navbar from './components/Navbar/Navbar';
import RightPanel from './components/RightPanel/RightPanel';

const App = () => (
  <div className="flex flex-col overflow-hidden">
    <Navbar className="flex-1" />
    <div className="flex h-screen w-full flex-row">
      <LeftPanel className="p-2" />
      <div className="flex flex-1 items-center justify-center">
        <Canvas />
      </div>
      <RightPanel className="p-2" />
    </div>
  </div>
);

export default App;
