import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSite, EditableText, EditableImage } from '../../context/SiteContext';

const HORARIOS_BASE = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '12:00 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
];

const HeroSection = () => {
  const { content, updateField, isEditing, citasOcupadas, registrarCitaOcupada } = useSite();

  const hoy = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState<string>(hoy);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [nombrePaciente, setNombrePaciente] = useState<string>('');
  const [telefonoPaciente, setTelefonoPaciente] = useState<string>('');
  const [edadPaciente, setEdadPaciente] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('Consulta de Valoración');
  const [sintomas, setSintomas] = useState<string>('');

  const horasOcupadasHoy = citasOcupadas[fecha] || [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const handleReservarWhatsApp = () => {
    if (!nombrePaciente.trim() || !telefonoPaciente.trim() || !horaSeleccionada) {
      alert('Por favor completa tu nombre, teléfono de contacto y selecciona un horario disponible.');
      return;
    }

    // Bloquea el horario en el calendario local
    registrarCitaOcupada(fecha, horaSeleccionada);

    // Mensaje automatizado estructurado para que el doctor responda directamente
    const mensajeAutomatizado = [
      `-----------------------------------------`,
      `👨‍⚕️ *Para:* Dr. José Antonio Citalán Jiménez`,
      `👤 *Paciente:* ${nombrePaciente}`,
      `🎂 *Edad:* ${edadPaciente ? `${edadPaciente} años` : 'No especificada'}`,
      `📱 *Teléfono de contacto:* ${telefonoPaciente}`,
      `🩺 *Estudio / Consulta:* ${motivo}`,
      `📅 *Fecha solicitada:* ${fecha}`,
      `⏰ *Horario:* ${horaSeleccionada}`,
      `📝 *Motivo o síntomas:* ${sintomas.trim() ? sintomas : 'Valoración general'}`,
      `-----------------------------------------`,
      `_Mensaje generado automáticamente desde el portal web. Quedo atento(a) a la confirmación de mi cita._`
    ].join('\n');

    const numeroLimpio = content.whatsappDoctor.replace(/\D/g, '');
    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensajeAutomatizado)}`;
    window.open(url, '_blank');

    setHoraSeleccionada(null);
  };

  return (
    <div className="inicio-wrapper">
      <section className="hero-container">
        {/* Columna Izquierda: Foto del Doctor + Biografía Editable */}
        <motion.div
          className="hero-profile"
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

          {/* Tarjeta "Conoce al Dr. Antonio Citalán" con foto y biografía completa */}
          <motion.div variants={itemVariants} className="doctor-bio-card">
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
        </motion.div>

        {/* Columna Derecha: Sistema de Calendario y Reservación Automatizada */}
        <motion.div
          className="hero-calendar-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="calendar-card">
            <div className="calendar-header">
              <h2>Agenda tu Cita</h2>
              <p>Reservación inmediata con envío automatizado a WhatsApp</p>
              {isEditing && (
                <div className="doctor-phone-edit">
                  <label>📱 Número de WhatsApp del Doctor (con código de país 52):</label>
                  <input
                    type="text"
                    value={content.whatsappDoctor}
                    onChange={(e) => updateField('whatsappDoctor', e.target.value)}
                    className="cms-editable-input"
                  />
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
                  placeholder="Ej. 961 123 4567"
                  value={telefonoPaciente}
                  onChange={(e) => setTelefonoPaciente(e.target.value)}
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
                  className="calendar-input"
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
              <label>6. Selecciona un Horario Disponible *</label>
              <div className="time-slots-grid">
                {HORARIOS_BASE.map((hora) => {
                  const estaOcupado = horasOcupadasHoy.includes(hora);
                  const estaSeleccionado = horaSeleccionada === hora;

                  return (
                    <button
                      key={hora}
                      type="button"
                      disabled={estaOcupado}
                      onClick={() => setHoraSeleccionada(hora)}
                      className={`slot-btn ${estaOcupado ? 'ocupado' : ''} ${estaSeleccionado ? 'seleccionado' : ''}`}
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
      </section>

      {/* Sección Inferior: Credenciales Académicas */}
      <section className="credentials-section">
        <h2 className="section-title">Formación Académica y Avales</h2>
        <div className="credentials-grid">
          <div className="cred-card">
            <h3>Cardiología Intervencionista</h3>
            <p className="cred-place">Hospital Central Militar CDMX.</p>
            <span className="cred-aval">Avalado por la Universidad del Ejército y Fuerza Aérea</span>
          </div>
          <div className="cred-card">
            <h3>Rehabilitación Cardíaca</h3>
            <p className="cred-place">Centro Médico Nacional 20 de Noviembre.</p>
            <span className="cred-aval">Avalado por la Universidad La Salle.</span>
          </div>
          <div className="cred-card">
            <h3>Cardiología</h3>
            <p className="cred-place">Hospital Central Sur de Alta Especialidad de PEMEX.</p>
            <span className="cred-aval">Avalado por la Universidad Nacional Autónoma de México. (UNAM)</span>
          </div>
          <div className="cred-card">
            <h3>Médico Cirujano</h3>
            <p className="cred-place">Facultad de Medicina Humana Dr. Manuel Velasco Suárez</p>
            <span className="cred-aval">Universidad Nacional Autónoma de Chiapas (UNACH)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;