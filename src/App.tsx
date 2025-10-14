import { Scene } from './components/game/Scene';

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)'
    }}>
      <Scene />
    </div>
  );
}

export default App;
