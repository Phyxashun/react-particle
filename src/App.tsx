// src/App.tsx
import Canvas from './components/Canvas/Canvas';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Navbar from './components/Navbar/Navbar';
import RightPanel from './components/RightPanel/RightPanel';
import StatsDisplay from './components/Stats/StatsDisplay';
import Title from './components/Title/Title';

const App = () => (
  <div className="flex flex-col overflow-hidden">
    <header>
      <Navbar>
        <Title />
        <StatsDisplay />
      </Navbar>
    </header>
    <section className="flex h-screen w-full flex-row">
      <LeftPanel className="p-2" />
      <div className="flex flex-1 items-center justify-center">
        <Canvas />
      </div>
      <RightPanel className="p-2" />
    </section>
    <footer></footer>
  </div>
);

export default App;
