import { motion } from 'framer-motion';
import { useSite, EditableText } from '../../context/SiteContext';

const MisionVision = () => {
  const { content, updateField } = useSite();

  return (
    <section className="page-container mv-page-modern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-header"
      >
        <span className="page-tag">EXCELENCIA CARDIOVASCULAR</span>
        <h1>Filosofía y Compromiso Clínico</h1>
        <p>Atención médica de alta especialidad respaldada por rigor científico, precisión intervencionista y calidez humana.</p>
      </motion.div>

      <div className="mv-editorial-grid">
        {/* Tarjeta Misión */}
        <motion.article
          className="mv-editorial-card"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mv-card-top">
            <div className="mv-svg-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="mv-index-num">01</span>
          </div>

          <EditableText
            as="span"
            className="mv-small-label"
            value={content.misionSubtitulo}
            onChange={(val) => updateField('misionSubtitulo', val)}
          />
          <EditableText
            as="h2"
            className="mv-main-heading"
            value={content.misionTitulo}
            onChange={(val) => updateField('misionTitulo', val)}
          />
          <div className="mv-accent-bar"></div>
          <EditableText
            as="p"
            multiline
            className="mv-body-text"
            value={content.misionTexto}
            onChange={(val) => updateField('misionTexto', val)}
          />
        </motion.article>

        {/* Tarjeta Visión */}
        <motion.article
          className="mv-editorial-card mv-card-featured"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="mv-card-top">
            <div className="mv-svg-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="mv-index-num">02</span>
          </div>

          <EditableText
            as="span"
            className="mv-small-label"
            value={content.visionSubtitulo}
            onChange={(val) => updateField('visionSubtitulo', val)}
          />
          <EditableText
            as="h2"
            className="mv-main-heading"
            value={content.visionTitulo}
            onChange={(val) => updateField('visionTitulo', val)}
          />
          <div className="mv-accent-bar"></div>
          <EditableText
            as="p"
            multiline
            className="mv-body-text"
            value={content.visionTexto}
            onChange={(val) => updateField('visionTexto', val)}
          />
        </motion.article>
      </div>

      {/* Pilares de Valor Clínico */}
      <motion.div
        className="mv-pillars-row"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mv-pillar-item">
          <div className="pillar-line"></div>
          <EditableText
            as="h3"
            value={content.valor1Titulo}
            onChange={(val) => updateField('valor1Titulo', val)}
          />
          <EditableText
            as="p"
            multiline
            value={content.valor1Texto}
            onChange={(val) => updateField('valor1Texto', val)}
          />
        </div>

        <div className="mv-pillar-item">
          <div className="pillar-line"></div>
          <EditableText
            as="h3"
            value={content.valor2Titulo}
            onChange={(val) => updateField('valor2Titulo', val)}
          />
          <EditableText
            as="p"
            multiline
            value={content.valor2Texto}
            onChange={(val) => updateField('valor2Texto', val)}
          />
        </div>

        <div className="mv-pillar-item">
          <div className="pillar-line"></div>
          <EditableText
            as="h3"
            value={content.valor3Titulo}
            onChange={(val) => updateField('valor3Titulo', val)}
          />
          <EditableText
            as="p"
            multiline
            value={content.valor3Texto}
            onChange={(val) => updateField('valor3Texto', val)}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MisionVision;