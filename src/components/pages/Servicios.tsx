import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite, EditableText, EditableImage } from '../../context/SiteContext';

const Servicios = () => {
  const { content, updateField, isEditing } = useSite();
  const [selectedEstudioId, setSelectedEstudioId] = useState<string | null>(null);
  const selectedEstudio = content.estudiosVisuales.find(({ id }) => id === selectedEstudioId);

  useEffect(() => {
    if (!selectedEstudio) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEstudioId(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedEstudio]);

  const handleEstudioChange = (
    index: number,
    field: 'titulo' | 'imagen' | 'descripcion',
    value: string
  ) => {
    const copia = [...content.estudiosVisuales];
    copia[index] = { ...copia[index], [field]: value };
    updateField('estudiosVisuales', copia);
  };

  const handleServicioListaChange = (index: number, value: string) => {
    const copia = [...content.listaServicios];
    copia[index] = value;
    updateField('listaServicios', copia);
  };

  return (
    <section className="page-container">
      {/* Parte 1: Galería Visual de los 8 Estudios Diagnósticos e Intervencionistas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-header"
      >
        <span className="page-tag">TECNOLOGÍA Y DIAGNÓSTICO</span>
        <h1>Estudios y Procedimientos Especializados</h1>
        <p>Equipos de alta precisión para el cuidado integral de tu corazón.</p>
      </motion.div>

      <div className="estudios-visual-grid">
        {content.estudiosVisuales.map((estudio, index) => (
          <motion.article
            key={estudio.id}
            className={`estudio-visual-card${isEditing ? ' is-editing' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            {isEditing ? (
              <div className="estudio-img-wrapper">
                <EditableImage
                  src={estudio.imagen}
                  alt={estudio.titulo}
                  className="estudio-img"
                  onChange={(newUrl) => handleEstudioChange(index, 'imagen', newUrl)}
                />
              </div>
            ) : (
              <button
                type="button"
                className="estudio-image-button"
                onClick={() => setSelectedEstudioId(estudio.id)}
                aria-label={`Ver información de ${estudio.titulo}`}
                aria-haspopup="dialog"
              >
                <EditableImage
                  src={estudio.imagen}
                  alt={estudio.titulo}
                  className="estudio-img"
                  onChange={(newUrl) => handleEstudioChange(index, 'imagen', newUrl)}
                />
              </button>
            )}
            <EditableText
              as="h3"
              className="estudio-red-title"
              value={estudio.titulo}
              onChange={(newVal) => handleEstudioChange(index, 'titulo', newVal)}
            />
            {isEditing && (
              <div className="estudio-description-editor">
                <EditableText
                  as="p"
                  className="estudio-description-text"
                  value={estudio.descripcion}
                  multiline
                  onChange={(newVal) => handleEstudioChange(index, 'descripcion', newVal)}
                />
              </div>
            )}
          </motion.article>
        ))}
      </div>

      {selectedEstudio && (
        <div
          className="estudio-modal-backdrop"
          onClick={() => setSelectedEstudioId(null)}
        >
          <section
            className="estudio-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="estudio-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="estudio-modal-close"
              onClick={() => setSelectedEstudioId(null)}
              aria-label="Cerrar información"
              autoFocus
            >
              &times;
            </button>
            <div className="estudio-modal-content">
              <h2 id="estudio-modal-title">{selectedEstudio.titulo}</h2>
              <p>{selectedEstudio.descripcion}</p>
            </div>
          </section>
        </div>
      )}

      {/* Parte 2: Bloque "NUESTROS SERVICIOS" y Banner "ESPECIALISTA EN" */}
      <div className="nuestros-servicios-block">
        <div className="nuestros-servicios-header">
          <h2>NUESTROS SERVICIOS</h2>
          <div className="red-underline"></div>
        </div>

        <div className="servicios-split-container">
          <ul className="servicios-bullet-list">
            {content.listaServicios.map((item, idx) => (
              <li key={idx}>
                <span className="blue-dot">•</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleServicioListaChange(idx, e.target.value)}
                    className="cms-editable-input"
                  />
                ) : (
                  <span>{item}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="especialista-side-box">
            <div className="especialista-ribbon">
              <span>ESPECIALISTA EN</span>
            </div>
            <ul className="especialista-right-list">
              {content.especialistaEn.map((esp, idx) => (
                <li key={idx}>{esp}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="latido-slogan-box">
          <EditableText
            as="h3"
            className="latido-slogan"
            value={content.esloganServicios}
            onChange={(val) => updateField('esloganServicios', val)}
          />
        </div>
      </div>
    </section>
  );
};

export default Servicios;