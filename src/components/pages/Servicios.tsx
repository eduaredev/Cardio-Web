import { motion } from 'framer-motion';
import { useSite, EditableText, EditableImage } from '../../context/SiteContext';

const Servicios = () => {
  const { content, updateField, isEditing } = useSite();

  const handleEstudioChange = (index: number, field: 'titulo' | 'imagen', value: string) => {
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
          <motion.div
            key={estudio.id}
            className="estudio-visual-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <div className="estudio-img-wrapper">
              <EditableImage
                src={estudio.imagen}
                alt={estudio.titulo}
                className="estudio-img"
                onChange={(newUrl) => handleEstudioChange(index, 'imagen', newUrl)}
              />
            </div>
            <EditableText
              as="h3"
              className="estudio-red-title"
              value={estudio.titulo}
              onChange={(newVal) => handleEstudioChange(index, 'titulo', newVal)}
            />
          </motion.div>
        ))}
      </div>

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