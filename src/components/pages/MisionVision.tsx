import { motion } from 'framer-motion';
import { useSite, EditableText } from '../../context/SiteContext';

const MisionVision = () => {
  const { content, updateField } = useSite();

  return (
    <section className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-header"
      >
        <span className="page-tag">NUESTRA FILOSOFÍA</span>
        <h1>Misión y Visión</h1>
        <p>Comprometidos con la salud cardiovascular y la recuperación integral en Chiapas.</p>
      </motion.div>

      <div className="mv-grid">
        <motion.div
          className="mv-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="mv-icon"></div>
          <h2>Misión</h2>
          <EditableText
            as="p"
            multiline
            value={content.misionTexto}
            onChange={(val) => updateField('misionTexto', val)}
          />
        </motion.div>

        <motion.div
          className="mv-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mv-icon"></div>
          <h2>Visión</h2>
          <EditableText
            as="p"
            multiline
            value={content.visionTexto}
            onChange={(val) => updateField('visionTexto', val)}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MisionVision;