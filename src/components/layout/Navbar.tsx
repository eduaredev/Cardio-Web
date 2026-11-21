import React, { useEffect, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import logod from "../../assets/LogoDoc-cropped.png";
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme, isAdmin, isEditing, setIsEditing, loginAdmin, logoutAdmin } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'a') {
        if (!isAdmin) {
          event.preventDefault();
          setShowModal(true);
        }
      }

      if (event.key === 'Escape') {
        setShowModal(false);
        setPassword('');
        setError('');
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcut);

    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setShowModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Contraseña incorrecta. Intenta con: cardio2026');
    }
  };

  return (
    <>
      <header className={`navbar ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>

        <div className="navbar-brand" onClick={() => setActiveTab('inicio')}>
          <span className="heart-icon">
            <img src={logod} alt="Logo Cardiólogo" />
          </span>

          <div>
            <h1>DR. ANTONIO CITALÁN</h1>
            <h2>CARDIOLOGIA Y REHABILITACION</h2>
          </div>
        </div>
        <nav className="navbar-links">
          <button
            className={activeTab === 'inicio' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('inicio')}
          >
            Inicio
          </button>
          <button
            className={activeTab === 'mision-vision' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('mision-vision')}
          >
            Misión y Visión
          </button>
          <button
            className={activeTab === 'servicios' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('servicios')}
          >
            Servicios y Estudios
          </button>
          <button
            className={activeTab === 'ubicacion' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('ubicacion')}
          >
            Ubicación
          </button>
        </nav>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="action-pill" title="Cambiar modo de color">
            {theme === 'dark' ? 'Modo Normal' : 'Modo Nocturno'}
          </button>

          {!isAdmin ? (
            null
          ) : (
            <div className="admin-controls">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`action-pill ${isEditing ? 'editing-active' : ''}`}
              >
                {isEditing ? 'Guardar Cambios' : 'Editar Página'}
              </button>
              <button onClick={logoutAdmin} className="action-pill logout-btn" title="Salir del modo médico">
                Salir
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Modal de Acceso Exclusivo para el Doctor */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Acceso Exclusivo del Médico</h3>
            <p>Ingresa tu clave para habilitar la edición de textos, fotos y teléfono de citas.</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Contraseña (cardio2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="calendar-input"
                autoFocus
              />
              {error && <span className="error-msg">{error}</span>}
              <div className="modal-btns">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Desbloquear Edición
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;