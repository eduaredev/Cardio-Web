import { useState } from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import MisionVision from './components/pages/MisionVision';
import Servicios from './components/pages/Servicios';
import Ubicacion from './components/pages/Ubicacion';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const { isEditing, setIsEditing, resetContent } = useSite();

  return (
    <div>
      {isEditing && (
        <div className="cms-top-banner">
          <span>
            <strong>MODO EDICIÓN ACTIVO:</strong> Haz clic sobre cualquier texto o imagen para modificarlo. Los cambios se guardan automáticamente.
          </span>
          <div className="cms-banner-actions">
            <button onClick={resetContent} className="cms-reset-btn">
              Restaurar Original
            </button>
            <button onClick={() => setIsEditing(false)} className="cms-done-btn">
              Ver como Paciente
            </button>
          </div>
        </div>
      )}

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'inicio' && <HeroSection />}
        {activeTab === 'mision-vision' && <MisionVision />}
        {activeTab === 'servicios' && <Servicios />}
        {activeTab === 'ubicacion' && <Ubicacion />}
      </main>
    </div>
  );
};

function App() {
  return (
    <SiteProvider>
      <MainContent />
    </SiteProvider>
  );
}

export default App;