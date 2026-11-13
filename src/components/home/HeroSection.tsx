import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  useSite,
  EditableText,
  EditableImage,
  type TrayectoriaItem
} from '../../context/SiteContext';
import './HeroSection.css';

const HeroSection = () => {
  const {
    content,
    updateField,
    isEditing
  } = useSite();

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [telefonoPaciente, setTelefonoPaciente] = useState('');
  const [edadPaciente, setEdadPaciente] = useState('');
  const [motivo, setMotivo] = useState('Consulta de Valoración');
  const [sintomas, setSintomas] = useState('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' }
    }
  };

  const handleTrayectoriaChange = (
    index: number,
    field: keyof TrayectoriaItem,
    value: string
  ) => {
    const copia = [...content.trayectoriaItems];
    copia[index] = { ...copia[index], [field]: value };
    updateField('trayectoriaItems', copia);
  };

  const handleReservarWhatsApp = () => {
    if (
      !nombrePaciente.trim() ||
      telefonoPaciente.length !== 10
    ) {
      alert(
        'Por favor completa tu nombre e ingresa un teléfono de 10 dígitos.'
      );
      return;
    }

    const mensajeAutomatizado = [
      '*NUEVA SOLICITUD DE CITA CARDIOLÓGICA*',
      '-----------------------------------------',
      '*Médico:* Dr. José Antonio Citalán Jiménez',
      `*Paciente:* ${nombrePaciente}`,
      `*Edad:* ${edadPaciente ? `${edadPaciente} años` : 'No especificada'}`,
      `*Teléfono:* ${telefonoPaciente}`,
      `*Estudio / Consulta:* ${motivo}`,
      '*Horario de atención:* Lunes a viernes, de 6:00 PM a 6:30 PM',
      `*Motivo o síntomas:* ${sintomas.trim() || 'Valoración general'}`,
      '-----------------------------------------',
      '_Solicitud enviada desde el sistema web de citas. Quedo atento(a) a su confirmación._'
    ].join('\n');

    const numeroLimpio = content.whatsappDoctor.replace(/\D/g, '');

    if (!numeroLimpio) {
      alert('El número de WhatsApp del doctor no está configurado.');
      return;
    }

    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensajeAutomatizado)}`;

    window.open(url, '_blank');
  };

  return (
    <div className="inicio-wrapper">
      <section className="hero-container">

        {/* Encabezado */}
        <motion.div
          className="hero-top-header"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <EditableText
              as="h3"
              className="subtitle"
              value={content.heroSubtitulo}
              onChange={(val) => updateField('heroSubtitulo', val)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EditableText
              as="h1"
              className="title"
              value={content.heroTitulo}
              onChange={(val) => updateField('heroTitulo', val)}
            />
          </motion.div>
        </motion.div>

        {/* Biografía y Agenda */}
        <div className="hero-cards-row">

          {/* Biografía del Doctor */}
          <motion.div
            className="doctor-bio-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="doctor-photo-col">
              <EditableImage
                src={content.doctorFoto}
                alt="Dr. José Antonio Citalán Jiménez"
                className="doctor-portrait"
                onChange={(newSrc) => updateField('doctorFoto', newSrc)}
              />
            </div>

            <div className="doctor-text-col">
              <EditableText
                as="h2"
                className="conoce-title"
                value={content.conoceTitulo}
                onChange={(val) => updateField('conoceTitulo', val)}
              />

              <EditableText
                as="p"
                multiline
                className="bio-paragraph"
                value={content.bioParrafo1}
                onChange={(val) => updateField('bioParrafo1', val)}
              />

              <EditableText
                as="p"
                multiline
                className="bio-paragraph"
                value={content.bioParrafo2}
                onChange={(val) => updateField('bioParrafo2', val)}
              />

              <EditableText
                as="p"
                multiline
                className="bio-paragraph"
                value={content.bioParrafo3}
                onChange={(val) => updateField('bioParrafo3', val)}
              />

              <EditableText
                as="p"
                multiline
                className="bio-paragraph highlight-cert"
                value={content.bioParrafo4}
                onChange={(val) => updateField('bioParrafo4', val)}
              />
            </div>
          </motion.div>

          {/* Agenda de Citas */}
          <motion.div
            className="hero-calendar-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="calendar-card">

              <div className="calendar-header">
                <h2>Agenda tu Cita</h2>
                <p>
                  Completa tus datos y envía tu solicitud
                  directamente por WhatsApp.
                </p>

                {isEditing && (
                  <div className="doctor-phone-edit">
                    <label>
                      Número de WhatsApp del Doctor
                      (Código 52 + 10 dígitos):
                    </label>

                    <input
                      type="text"
                      value={content.whatsappDoctor}
                      onChange={(e) =>
                        updateField('whatsappDoctor', e.target.value)
                      }
                      className="cms-editable-input"
                    />
                  </div>
                )}
              </div>

              {/* Nombre */}
              <div className="form-group">
                <label>1. Nombre Completo del Paciente *</label>
                <input
                  type="text"
                  placeholder="Ej. María González López"
                  value={nombrePaciente}
                  onChange={(e) => setNombrePaciente(e.target.value)}
                  className="calendar-input"
                />
              </div>

              {/* Teléfono y Edad */}
              <div className="form-row">
                <div className="form-group">
                  <label>2. Teléfono del Paciente *</label>
                  <input
                    type="tel"
                    placeholder="Ej. 9611234567"
                    inputMode="numeric"
                    maxLength={10}
                    value={telefonoPaciente}
                    onChange={(e) =>
                      setTelefonoPaciente(
                        e.target.value.replace(/\D/g, '').slice(0, 10)
                      )
                    }
                    className="calendar-input"
                  />
                </div>

                <div className="form-group">
                  <label>3. Edad</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Ej. 45"
                    value={edadPaciente}
                    onChange={(e) => setEdadPaciente(e.target.value)}
                    className="calendar-input"
                  />
                </div>
              </div>

              {/* Servicio */}
              <div className="form-group">
                <label>4. Servicio / Estudio *</label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="calendar-input select-constrained"
                >
                  <option value="Consulta de Valoración">
                    Consulta de Valoración
                  </option>

                  {content.listaServicios.map((serv) => (
                    <option key={serv} value={serv}>
                      {serv}
                    </option>
                  ))}
                </select>
              </div>

              

              {/* Síntomas */}
              <div className="form-group">
                <label>5. Síntomas o Motivo Breve (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Dolor en el pecho, chequeo de presión arterial..."
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
                  className="calendar-input"
                />
              </div>

              {/* Horarios */}
              <div className="horarios-info">
                <h3>Horarios de atención</h3>
                <p>Lunes a viernes</p>
                <p className="horario-destacado">
                  6:00 PM - 6:30 PM
                </p>
              </div>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleReservarWhatsApp}
                className="btn-confirm-whatsapp"
              >
                Enviar Ficha de Cita por WhatsApp
              </button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Trayectoria profesional */}
      <section className="trayectoria-section">
        <div className="trayectoria-grid">
          {content.trayectoriaItems.map((item, idx) => (
            <div key={item.id} className="trayectoria-item">

              <div className="trayectoria-logo-box">
                <EditableImage
                  src={item.logo}
                  alt={item.especialidad}
                  className="trayectoria-shield-img"
                  onChange={(newLogo) =>
                    handleTrayectoriaChange(idx, 'logo', newLogo)
                  }
                />
              </div>

              <div className="trayectoria-info">
                <EditableText
                  as="h3"
                  className="trayectoria-title"
                  value={item.especialidad}
                  onChange={(val) =>
                    handleTrayectoriaChange(idx, 'especialidad', val)
                  }
                />

                <EditableText
                  as="p"
                  className="trayectoria-hospital"
                  value={item.institucion}
                  onChange={(val) =>
                    handleTrayectoriaChange(idx, 'institucion', val)
                  }
                />

                <EditableText
                  as="p"
                  className="trayectoria-aval"
                  value={item.aval}
                  onChange={(val) =>
                    handleTrayectoriaChange(idx, 'aval', val)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="trayectoria-red-divider"></div>

        {/* Instituciones */}
        <div className="institutions-strip-wrapper">
          <EditableImage
            src={content.bannerInstitucionesUrl}
            alt="Instituciones Avales: UNACH, UNAM, Universidad La Salle, Escuela Médico Militar, PEMEX, CMN 20 de Noviembre, Hospital Central Militar, Consejo Mexicano de Cardiología"
            className="institutions-strip-img"
            onChange={(newBanner) =>
              updateField('bannerInstitucionesUrl', newBanner)
            }
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;