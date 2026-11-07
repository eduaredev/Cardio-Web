import { motion } from 'framer-motion';
import { useSite, EditableText } from '../../context/SiteContext';

const Ubicacion = () => {
  const { content, updateField } = useSite();

  return (
    <section className="page-container">
      <motion.div
        className="ubicacion-top-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="gmaps-icon-card">
          <div className="gmaps-logo-visual">
            <span className="g-letter">G</span>
            <span className="pin-icon">📍</span>
          </div>
        </div>

        <div className="ubicacion-info-card">
          <EditableText
            as="h2"
            className="ubicanos-heading"
            value={content.ubicacionTitulo}
            onChange={(val) => updateField('ubicacionTitulo', val)}
          />
          <div className="divider-line"></div>
          <EditableText
            as="p"
            multiline
            className="ubicacion-address"
            value={content.ubicacionDireccion}
            onChange={(val) => updateField('ubicacionDireccion', val)}
          />
          <EditableText
            as="h3"
            className="ubicacion-clinic"
            value={content.ubicacionClinica}
            onChange={(val) => updateField('ubicacionClinica', val)}
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=18A.+Pte.+Sur+5,+Xamaipak,+29067+Tuxtla+Gutiérrez,+Chis."
            target="_blank"
            rel="noreferrer"
            className="btn-open-maps"
          >
            🗺️ Abrir ubicación en Google Maps
          </a>
        </div>
      </motion.div>

      <motion.div
        className="map-iframe-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <iframe
          title="Ubicación Clínica Dr. José Antonio Citalán"
          src="https://www.google.com/maps?q=18A.+Pte.+Sur+5,+Xamaipak,+29067+Tuxtla+Guti%C3%A9rrez,+Chis.,+M%C3%A9xico&output=embed"
          width="100%"
          height="460"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </section>
  );
};

export default Ubicacion;