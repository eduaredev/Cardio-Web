import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSite, EditableText, EditableImage, type TrayectoriaItem } from '../../context/SiteContext';

const HORARIOS_BASE = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '12:00 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
];

const HeroSection = () => {
  const {
    content,
    updateField,
    isAdmin,
    isEditing,
    citasOcupadas,
    registrarCitaOcupada,
    toggleHorarioOcupado
  } = useSite();

  const hoy = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState<string>(hoy);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [nombrePaciente, setNombrePaciente] = useState<string>('');
  const [telefonoPaciente, setTelefonoPaciente] = useState<string>('');
  const [edadPaciente, setEdadPaciente] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('Consulta de Valoración');
  const [sintomas, setSintomas] = useState<string>('');
  const [adminScheduleMode, setAdminScheduleMode] = useState<boolean>(false);

  const horasOcupadasHoy = citasOcupadas[fecha] || [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  };

  const handleTrayectoriaChange = (index: number, field: keyof TrayectoriaItem, value: string) => {
    const copia = [...content.trayectoriaItems];
    copia[index] = { ...copia[index], [field]: value };
    updateField('trayectoriaItems', copia);
  };

  const handleReservarWhatsApp = () => {
    if (!nombrePaciente.trim() || telefonoPaciente.length !== 10 || !horaSeleccionada) {
      alert('Por favor completa tu nombre, ingresa un teléfono de 10 dígitos y selecciona un horario disponible.');
      return;
    }

    registrarCitaOcupada(fecha, horaSeleccionada);

    const mensajeAutomatizado = [
      `*NUEVA SOLICITUD DE CITA CARDIOLÓGICA*`,
      `-----------------------------------------`,
      `*Médico:* Dr. José Antonio Citalán Jiménez`,
      `*Paciente:* ${nombrePaciente}`,
      `*Edad:* ${edadPaciente ? `${edadPaciente} años` : 'No especificada'}`,
      `*Teléfono:* ${telefonoPaciente}`,
      `*Estudio / Consulta:* ${motivo}`,
      `*Fecha solicitada:* ${fecha}`,
      `*Horario:* ${horaSeleccionada}`,
      `*Motivo o síntomas:* ${sintomas.trim() ? sintomas : 'Valoración general'}`,
      `-----------------------------------------`,
      `_Solicitud enviada desde el sistema web de citas. Quedo atento(a) a su confirmación._`
    ].join('\n');

    const numeroLimpio = content.whatsappDoctor.replace(/\D/g, '');
    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensajeAutomatizado)}`;
    window.open(url, '_blank');

    setHoraSeleccionada(null);
  };

  return (
    <div className="inicio-wrapper">
      <section className="hero-container">
        {/* Encabezado / Espacio de ancho completo para el futuro Banner */}
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

        {/* Fila inferior: Ficha de Biografía y Ficha de Agenda a la par */}
        <div className="hero-cards-row">
          {/* Columna Izquierda: Ficha de Biografía */}
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
              <div className="hero-badges">
                <span className="badge">Avalado por UNAM</span>
                <span className="badge">Escuela Médico Militar</span>
                <span className="badge">Universidad La Salle</span>
                <span className="badge">UNACH</span>
              </div>
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

          {/* Columna Derecha: Agenda Interactiva al mismo nivel */}
          <motion.div
            className="hero-calendar-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="calendar-card">
              <div className="calendar-header">
                <div className="calendar-title-row">
                  <h2>Agenda tu Cita</h2>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setAdminScheduleMode(!adminScheduleMode)}
                      className={`admin-schedule-toggle ${adminScheduleMode ? 'active' : ''}`}
                    >
                      {adminScheduleMode ? 'Salir de Gestión de Horas' : 'Bloquear / Liberar Horas'}
                    </button>
                  )}
                </div>
                <p>Reservación inmediata con envío automatizado a WhatsApp</p>

                {isEditing && (
                  <div className="doctor-phone-edit">
                    <label>Número de WhatsApp del Doctor (Código 52 + 10 dígitos):</label>
                    <input
                      type="text"
                      value={content.whatsappDoctor}
                      onChange={(e) => updateField('whatsappDoctor', e.target.value)}
                      className="cms-editable-input"
                    />
                  </div>
                )}

                {isAdmin && adminScheduleMode && (
                  <div className="admin-schedule-notice">
                    <strong>Panel de Horarios del Doctor:</strong> Selecciona una fecha abajo y haz clic sobre cualquier horario para <strong>bloquearlo (Ocupado)</strong> o <strong>desbloquearlo (Disponible)</strong>.
                  </div>
                )}
              </div>

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

              <div className="form-row">
                <div className="form-group">
                  <label>2. Teléfono del Paciente *</label>
                  <input
                    type="tel"
                    placeholder="Ej. 9611234567"
                    inputMode="numeric"
                    maxLength={10}
                    value={telefonoPaciente}
                    onChange={(e) => setTelefonoPaciente(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="calendar-input"
                  />
                </div>

                <div className="form-group">
                  <label>3. Edad</label>
                  <input
                    type="number"
                    placeholder="Ej. 45"
                    value={edadPaciente}
                    onChange={(e) => setEdadPaciente(e.target.value)}
                    className="calendar-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>4. Fecha de Cita *</label>
                  <input
                    type="date"
                    min={hoy}
                    value={fecha}
                    onChange={(e) => {
                      setFecha(e.target.value);
                      setHoraSeleccionada(null);
                    }}
                    className="calendar-input"
                  />
                </div>

                <div className="form-group">
                  <label>5. Servicio / Estudio *</label>
                  <select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="calendar-input select-constrained"
                  >
                    <option value="Consulta de Valoración">Consulta de Valoración</option>
                    {content.listaServicios.map((serv) => (
                      <option key={serv} value={serv}>
                        {serv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  6. {isAdmin && adminScheduleMode ? 'Haz clic para Bloquear / Desbloquear:' : 'Selecciona un Horario Disponible *'}
                </label>
                <div className="time-slots-grid">
                  {HORARIOS_BASE.map((hora) => {
                    const estaOcupado = horasOcupadasHoy.includes(hora);
                    const estaSeleccionado = horaSeleccionada === hora;

                    return (
                      <button
                        key={hora}
                        type="button"
                        disabled={!adminScheduleMode && estaOcupado}
                        onClick={() => {
                          if (isAdmin && adminScheduleMode) {
                            toggleHorarioOcupado(fecha, hora);
                          } else {
                            setHoraSeleccionada(hora);
                          }
                        }}
                        className={`slot-btn ${estaOcupado ? 'ocupado' : ''} ${estaSeleccionado && !adminScheduleMode ? 'seleccionado' : ''} ${isAdmin && adminScheduleMode ? 'admin-slot-mode' : ''}`}
                      >
                        {hora}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>7. Síntomas o Motivo Breve (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Dolor en el pecho, chequeo de presión arterial..."
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
                  className="calendar-input"
                />
              </div>

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

      {/* Sección Inferior: Trayectoria con Escudos y Cintilla de Instituciones */}
      <section className="trayectoria-section">
        <div className="trayectoria-grid">
          {content.trayectoriaItems.map((item, idx) => (
            <div key={item.id} className="trayectoria-item">
              <div className="trayectoria-logo-box">
                <EditableImage
                  src={item.logo}
                  alt={item.especialidad}
                  className="trayectoria-shield-img"
                  onChange={(newLogo) => handleTrayectoriaChange(idx, 'logo', newLogo)}
                />
              </div>
              <div className="trayectoria-info">
                <EditableText
                  as="h3"
                  className="trayectoria-title"
                  value={item.especialidad}
                  onChange={(val) => handleTrayectoriaChange(idx, 'especialidad', val)}
                />
                <EditableText
                  as="p"
                  className="trayectoria-hospital"
                  value={item.institucion}
                  onChange={(val) => handleTrayectoriaChange(idx, 'institucion', val)}
                />
                <EditableText
                  as="p"
                  className="trayectoria-aval"
                  value={item.aval}
                  onChange={(val) => handleTrayectoriaChange(idx, 'aval', val)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="trayectoria-red-divider"></div>

        <div className="institutions-strip-wrapper">
          <EditableImage
            src={content.bannerInstitucionesUrl}
            alt="Instituciones Avales: UNACH, UNAM, Universidad La Salle, Escuela Médico Militar, PEMEX, CMN 20 de Noviembre, Hospital Central Militar, Consejo Mexicano de Cardiología"
            className="institutions-strip-img"
            onChange={(newBanner) => updateField('bannerInstitucionesUrl', newBanner)}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;