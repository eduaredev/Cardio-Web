import React, { createContext, useContext, useState, useEffect } from 'react';
import logos from '../assets/Logos.png';
import fotoDoctor from '../assets/Doctor.png';
import rehabilitacionCardiaca from '../assets/rehabilitacioncardiaca.png';
import cateterismoCardiaco from '../assets/cateterismocardiaco.png';
import implanteMarcapasos from '../assets/implantemarcapasos.png';
import estudioMapa from '../assets/estudiomapa.png';
import electrocardiograma from '../assets/electrocardiograma.png';
import estudioHolter from '../assets/estudiohoter.png';
import ecocardiograma from '../assets/ecocardiograma.png';
import pruebaEjercicio from '../assets/pruebaejercicio.png';

export interface EstudioVisual {
  id: string;
  titulo: string;
  imagen: string;
  descripcion: string;
}

export interface TrayectoriaItem {
  id: string;
  especialidad: string;
  institucion: string;
  aval: string;
  logo: string;
}

const DEFAULT_CONTENT = {
  whatsappDoctor: '522299846742',
  heroSubtitulo: 'CARDIÓLOGO INTERVENCIONISTA Y CARDIÓLOGO REHABILITADOR EN TUXTLA GUTIÉRREZ',
  heroTitulo: 'Dr. José Antonio Citalán Jiménez',
  conoceTitulo: 'Conoce al Dr. Antonio Citalán.',
  doctorFoto: fotoDoctor,
  bioParrafo1: 'El Dr. José Antonio Citalán Jiménez, es egresado de la Universidad Nacional Autónoma de Chiapas, en donde realizó sus estudios de Medicina general. Posteriormente realizó la Especialidad de Cardiología en el Hospital Central Sur de Alta Especialidad de PEMEX.',
  bioParrafo2: 'Así también realizó estudios de posgrado cursando la Alta Especialidad de Rehabilitación Cardíaca en el Centro Médico Nacional 20 de Noviembre y Alta Especialidad en Cardiología Intervencionista en el Hospital Central Militar, en la Ciudad de México.',
  bioParrafo3: 'Trabajando posteriormente como médico adscrito en el servicio de Cuidados Intensivos Cardiovasculares del Hospital Central Militar en la Ciudad de México durante 3 años en donde desempeñó actividades académicas, y de atención al paciente críticamente enfermo.',
  bioParrafo4: 'Actualmente se encuentra Certificado por el Consejo Mexicano de Cardiología, en las 3 especialidades: Cardiología Clínica, Rehabilitación Cardíaca y Cardiología Intervencionista.',
  misionSubtitulo: 'PROPÓSITO CLÍNICO',
  misionTitulo: 'Nuestra Misión',

  misionTexto: 'Brindar atención cardiológica de alta especialidad, diagnósticos precisos e intervenciones oportunas, acompañando a cada paciente en su rehabilitación cardíaca con calidez humana, ética médica y tecnología de vanguardia en Tuxtla Gutiérrez.',
  visionSubtitulo: 'PROYECCIÓN MÉDICA',
  visionTitulo: 'Nuestra Visión',
  visionTexto: 'Consolidarnos como el centro de referencia líder en Cardiología Clínica, Intervencionista y Rehabilitación Cardiopulmonar en el sureste de México, destacando por la prevención efectiva de enfermedades cardiovasculares y la mejora continua en la calidad de vida de nuestros pacientes.',
  valor1Titulo: 'Precisión Diagnóstica',
  valor1Texto: 'Protocolos clínicos respaldados por equipamiento de alta tecnología y estándares internacionales en cardiología intervencionista.',
  valor2Titulo: 'Ética y Transparencia',
  valor2Texto: 'Comunicación clara, honesta y detallada con el paciente y su familia en cada etapa del diagnóstico y tratamiento.',
  valor3Titulo: 'Rehabilitación Integral',
  valor3Texto: 'Seguimiento personalizado enfocado en recuperar la capacidad funcional y prevenir futuros eventos cardiovasculares.',
  esloganServicios: '¡Cada latido es importante para nosotros!',
  ubicacionTitulo: 'Ubícanos en:',
  ubicacionDireccion: '18 A poniente sur # 5, esquina Av 2 sur poniente Sur, Col. Xamaipac Tuxtla Gutiérrez Chiapas. CP 29060',
  ubicacionClinica: 'CLINICA DE ESPECIALIDADES DR. MARIN',
  trayectoriaItems: [
    {
      id: 't1',
      especialidad: 'Cardiología Intervencionista',
      institucion: 'Hospital Central Militar CDMX.',
      aval: 'Avalado por la Universidad del Ejército y Fuerza Aérea',
      logo: 'https://i.pinimg.com/736x/aa/85/fa/aa85faf671cb1c8c673221a4e8cc8e2e.jpg'
    },
    {
      id: 't2',
      especialidad: 'Rehabilitación Cardiaca',
      institucion: 'Centro Médico Nacional 20 de Noviembre.',
      aval: 'Avalado por la Universidad La Salle.',
      logo: 'https://i.pinimg.com/originals/a0/49/6c/a0496ceaa3ce9f99b43aa54c8726e6f9.png'
    },
    {
      id: 't3',
      especialidad: 'Cardiología',
      institucion: 'Hospital Central Sur de Alta Especialidad de PEMEX.',
      aval: 'Avalado por la Universidad Nacional Autónoma de México. (UNAM)',
      logo: 'https://www.sa.unam.mx/images/escudo-unam-azul.png'
    },
    {
      id: 't4',
      especialidad: 'Médico Cirujano',
      institucion: 'Universidad Nacional Autónoma de Chiapas (UNACH)',
      aval: 'Facultad de Medicina Humana Dr. Manuel Velasco Suárez',
      logo: 'https://yt3.googleusercontent.com/HyWQTUcedYTlifqkh_1Y7fIMALQuy-KXmTVVg95IfKieK1A-MBe98vNaCY2oN4WhIizFqJhH7Q=s900-c-k-c0x00ffffff-no-rj'
    }
  ] as TrayectoriaItem[],
  bannerInstitucionesUrl: logos,

  estudiosVisuales: [
    {
      id: '1',
      titulo: 'Electrocardiograma.',
      imagen: electrocardiograma,
      descripcion: 'Un electrocardiograma (ECG o EKG, por sus siglas en inglés) es una prueba médica que registra la actividad eléctrica del corazón. Es una herramienta diagnóstica utilizada para evaluar la función cardíaca y detectar posibles problemas cardíacos.\n\nEl ECG se realiza colocando electrodos en la piel del pecho, los brazos y las piernas del paciente, que registran la actividad eléctrica del corazón en forma de trazos en un papel o en una pantalla de visualización. El ECG permite a los médicos obtener información sobre la frecuencia cardíaca, el ritmo cardíaco, la duración de los intervalos entre los latidos del corazón y la morfología de las ondas eléctricas, lo que puede ayudar en el diagnóstico de diversas condiciones cardíacas, como arritmias, isquemia cardíaca, enfermedades del músculo cardíaco (miocardio), trastornos del ritmo, enfermedades de las arterias coronarias, inflamaciones del corazón (pericarditis), entre otros.\n\nEl ECG es una prueba de rutina que se realiza en muchos escenarios clínicos, como parte de un chequeo médico, para evaluar síntomas cardíacos como palpitaciones, dolor en el pecho, mareos o desmayos, o para monitorear la respuesta del corazón a medicamentos o tratamientos cardíacos. Es una herramienta importante en la evaluación y manejo de enfermedades cardíacas, y puede ser complementado con otras pruebas de diagnóstico para obtener una evaluación más completa del estado cardíaco del paciente.'
    },
    {
      id: '2',
      titulo: 'Estudio Holter',
      imagen: estudioHolter,
      descripcion: [
        'Un estudio Holter es un examen médico que se utiliza para evaluar el ritmo cardíaco y la actividad eléctrica del corazón durante un período prolongado de tiempo, generalmente durante 24 a 48 horas. El Holter es un monitor portátil que registra continuamente la actividad eléctrica del corazón mientras el paciente realiza sus actividades cotidianas.',
        'Se utiliza para detectar y diagnosticar problemas cardíacos, especialmente aquellos que pueden ocurrir de forma intermitente o que no son fácilmente detectables durante un examen médico de rutina. Algunos de los problemas cardíacos que se pueden detectar con un estudio Holter incluyen:',
        'Arritmias cardíacas: alteraciones en el ritmo normal del corazón, como latidos irregulares o demasiado rápidos o lentos.',
        'Isquemia miocárdica: falta de flujo sanguíneo en el músculo cardíaco.',
        'El estudio Holter es una prueba no invasiva y generalmente indolora que se puede realizar en un centro de atención médica o en el hogar del paciente. Durante el examen, el paciente llevará el dispositivo Holter durante el período de tiempo prescrito, generalmente de 24 a 48 horas. Después de que se complete el examen, el dispositivo se devuelve al médico para su análisis y diagnóstico.'
      ].join('\n\n')
    },
    {
      id: '3',
      titulo: 'Ecocardiograma y Ecocardiograma Estrés',
      imagen: ecocardiograma,
      descripcion: [
        'Un ecocardiograma es un examen médico no invasivo que utiliza ondas sonoras para producir imágenes detalladas del corazón. Es una de las pruebas más comunes utilizadas para evaluar la estructura y función del corazón, y se utiliza para diagnosticar y monitorear una variedad de enfermedades cardíacas.',
        'El ecocardiograma se puede realizar mientras el paciente está acostado o sentado, y por lo general dura unos 30 minutos.',
        'El ecocardiograma se utiliza para evaluar la estructura y función del corazón, incluyendo:',
        'El tamaño del corazón y las cámaras cardíacas.',
        'El grosor de las paredes del corazón.',
        'La función de las válvulas cardíacas.',
        'El flujo sanguíneo a través del corazón.',
        'La presencia de coágulos sanguíneos en el corazón.',
        'La presencia de enfermedades cardíacas congénitas o adquiridas.',
        'El ecocardiograma es una herramienta importante en el diagnóstico y tratamiento de enfermedades cardíacas. Es una prueba no invasiva, segura y relativamente fácil de realizar. Los resultados del examen se utilizan para guiar el tratamiento y monitorizar el progreso del paciente a lo largo del tiempo.'
      ].join('\n\n')
    },
    {
      id: '4',
      titulo: 'Prueba de esfuerzo y prueba de ejercicio cardiopulmonar.',
      imagen: pruebaEjercicio,
      descripcion: [
        'La prueba de esfuerzo, también conocida como prueba de ejercicio o ergometría, es un examen médico en el que se mide la respuesta del corazón y el sistema cardiovascular a un esfuerzo físico. Durante la prueba, el paciente camina o corre en una cinta rodante o bicicleta estacionaria, mientras se registran la presión arterial, la frecuencia cardíaca, el ritmo cardíaco, la respiración y la actividad eléctrica del corazón (mediante un electrocardiograma o ECG).',
        'La prueba de esfuerzo se utiliza para evaluar la capacidad cardiovascular del paciente, identificar problemas cardíacos que pueden no ser evidentes en reposo, diagnosticar enfermedades cardíacas, evaluar la eficacia del tratamiento y establecer un programa de ejercicios seguro y efectivo para el paciente.',
        'Los resultados de la prueba de esfuerzo pueden ayudar a los médicos a diagnosticar enfermedades cardiovasculares, como enfermedad coronaria, arritmias cardíacas, insuficiencia cardíaca y otros trastornos del corazón. También se utiliza para evaluar la eficacia del tratamiento, determinar el pronóstico y establecer un plan de tratamiento y de actividad física individualizado para el paciente.',
        'La prueba de esfuerzo es un examen relativamente seguro y no invasivo. Sin embargo, puede haber riesgos para pacientes con enfermedades cardíacas avanzadas o para aquellos que tienen otros problemas de salud que pueden ser agravados por el ejercicio. Por lo tanto, es importante que la prueba sea supervisada por un médico especialista en cardiología y que se realice en un entorno seguro y controlado.'
      ].join('\n\n')
    },
    {
      id: '5',
      titulo: 'Estudio MAPA.',
      imagen: estudioMapa,
      descripcion: [
        'El estudio MAPA (Monitorización Ambulatoria de la Presión Arterial) es una prueba diagnóstica que se utiliza para medir la presión arterial del paciente en un período de 24 horas, mientras este lleva puesto un dispositivo automático de medición de la presión arterial.',
        'Durante el estudio, el paciente lleva puesto un dispositivo portátil que registra la presión arterial en intervalos regulares (generalmente cada 15-30 minutos) durante un período de 24 horas. La prueba permite medir la presión arterial del paciente mientras realiza sus actividades diarias normales, lo que puede ayudar a identificar patrones y fluctuaciones de la presión arterial que pueden no ser detectados en una única medición en el consultorio médico.',
        'Permite evaluar la eficacia del tratamiento y determinar si la presión arterial del paciente está siendo controlada adecuadamente. Además, puede proporcionar información valiosa sobre el riesgo cardiovascular del paciente y ayudar a predecir el riesgo de complicaciones cardiovasculares en el futuro.',
        'Es necesario que el estudio MAPA sea interpretado por un médico especialista en cardiología, quien analizará los resultados y determinará el plan de tratamiento más adecuado para el paciente.'
      ].join('\n\n')
    },
    {
      id: '6',
      titulo: 'Implante de Marcapasos.',
      imagen: implanteMarcapasos,
      descripcion: [
        'Un marcapaso es un dispositivo médico que se utiliza para regular el ritmo cardíaco en pacientes con trastornos del ritmo cardíaco, como la bradicardia (ritmo cardíaco demasiado lento) o la taquicardia (ritmo cardíaco demasiado rápido). El marcapaso se coloca bajo la piel, generalmente en la zona del pecho, y se conecta al corazón mediante uno o más cables.',
        'El marcapaso emite impulsos eléctricos al corazón que ayudan a regular su ritmo cardíaco. Estos impulsos pueden ser programados por un médico especialista en cardiología para adaptarse a las necesidades individuales del paciente. En general, un marcapaso ayuda a mantener un ritmo cardíaco regular y constante, lo que puede mejorar la calidad de vida del paciente y prevenir complicaciones cardiovasculares.',
        'Existen diferentes tipos de marcapasos, que se diferencian en función de su capacidad de detección de la actividad cardíaca y de la forma en que entregan los impulsos eléctricos al corazón. Por ejemplo, algunos marcapasos pueden detectar cuando el corazón está latiendo de forma natural y ajustar la frecuencia de los impulsos en consecuencia. Otros marcapasos tienen la capacidad de responder a las necesidades del paciente en función de su nivel de actividad física.'
      ].join('\n\n')
    },
    {
      id: '7',
      titulo: 'Cateterismo cardíaco o Coronariografía Diagnóstica y Terapéutica.',
      imagen: cateterismoCardiaco,
      descripcion: [
        'La coronariografía, también conocida como angiografía coronaria o cinecoronariografía, es una técnica médica que se utiliza para examinar el flujo sanguíneo en las arterias coronarias del corazón. Es un procedimiento invasivo que se realiza en un hospital bajo anestesia local o sedación y requiere una preparación previa, como el ayuno y la suspensión de medicamentos.',
        'Durante la coronariografía, se inserta un catéter (un tubo largo y delgado) a través de una arteria en el brazo o la ingle, el cual se lleva hasta el corazón. Luego, se inyecta un medio de contraste a través del catéter para visualizar las arterias coronarias mediante radiografías. De esta manera, se pueden detectar obstrucciones o estrechamientos en las arterias coronarias que puedan estar causando síntomas como dolor en el pecho o falta de aire.',
        'La coronariografía es una técnica muy útil para el diagnóstico de enfermedades cardíacas, como la enfermedad coronaria, y también se puede utilizar para realizar procedimientos terapéuticos, como la angioplastia coronaria o la colocación de stents en las arterias coronarias obstruidas en caso de un infarto al corazón.',
        'El cateterismo cardíaco también se utiliza para medir las presiones de las cavidades del corazón y la presión de los pulmones en caso de pacientes con hipertensión pulmonar.'
      ].join('\n\n')
    },
    {
      id: '8',
      titulo: 'Rehabilitación Cardíaca.',
      imagen: rehabilitacionCardiaca,
      descripcion: [
        'La rehabilitación cardíaca es un programa multidisciplinario de tratamiento y cuidado que se enfoca en ayudar a las personas que han sufrido una enfermedad o afección del corazón a recuperarse y mejorar su salud cardiovascular.',
        'Generalmente incluye un conjunto de intervenciones terapéuticas, que incluyen ejercicio físico, educación sobre nutrición y estilo de vida saludable, manejo del estrés y asesoramiento psicológico. Estas intervenciones son diseñadas para ayudar a las personas a mejorar su capacidad física, reducir el riesgo de complicaciones cardíacas y mejorar su calidad de vida.',
        'La rehabilitación cardíaca puede ser recomendada para personas que han sufrido un infarto de miocardio (ataque al corazón), han tenido una cirugía cardíaca o han sido diagnosticadas con una enfermedad cardíaca crónica, como la insuficiencia cardíaca. También puede ser recomendada para personas que tienen un alto riesgo de desarrollar enfermedad cardíaca, como aquellas con diabetes, hipertensión arterial, obesidad o colesterol elevado.'
      ].join('\n\n')
    }
  ] as EstudioVisual[],

  listaServicios: [
    'Electrocardiograma',
    'Estudio Holter de 24 horas',
    'Monitoreo Ambulatorio de la Presión Arterial (MAPA)',
    'Ecocardiograma y/o Estrés',
    'Prueba de esfuerzo y Prueba de ejercicio cardiopulmonar',
    'Valoración de Riesgo quirúrgico',
    'Cateterismo Cardíaco',
    'Implante de Marcapasos',
    'Rehabilitación Cardiopulmonar',
    'Check up cardiovascular'
  ],
  especialistaEn: [
    'Hipertensión',
    'Cardiopatía Isquémica',
    'Infarto agudo al miocardio',
    'Arritmias',
    'Rehabilitación cardíaca',
    'Insuficiencia cardíaca'
  ]
};

export type ContentType = typeof DEFAULT_CONTENT;

const LEGACY_TRAJECTORY_LOGOS: Record<string, string> = {
  t1: 'https://via.placeholder.com/160x160/ffffff/0f172a?text=Escuela+Militar',
  t2: 'https://via.placeholder.com/160x160/ffffff/0f172a?text=Univ+La+Salle',
  t3: 'https://via.placeholder.com/160x160/ffffff/0f172a?text=UNAM',
  t4: 'https://via.placeholder.com/160x160/1e3a5f/ffffff?text=UNACH'
};

interface SiteContextProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdmin: boolean;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  content: ContentType;
  updateField: <K extends keyof ContentType>(key: K, value: ContentType[K]) => void;
  resetContent: () => void;
  citasOcupadas: Record<string, string[]>;
  registrarCitaOcupada: (fecha: string, hora: string) => void;
  toggleHorarioOcupado: (fecha: string, hora: string) => void;
}

const SiteContext = createContext<SiteContextProps | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('cardio_theme') as 'dark' | 'light') || 'dark';
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [content, setContent] = useState<ContentType>(() => {
    const saved = localStorage.getItem('cardio_cms_content');
    if (!saved) return DEFAULT_CONTENT;

    const savedContent = JSON.parse(saved) as Partial<ContentType>;
    const estudiosActualizados = DEFAULT_CONTENT.estudiosVisuales.map((estudioNuevo) => {
      const estudioGuardado = savedContent.estudiosVisuales?.find(
        (estudio) => estudio.id === estudioNuevo.id
      );
      const descripcionAnterior: Record<string, string> = {
        '1': '.',
        '2': 'Monitorea el ritmo del corazón durante las actividades cotidianas para identificar cambios a lo largo del día.',
        '3': 'Utiliza ultrasonido para observar la estructura del corazón y valorar su funcionamiento.',
        '4': 'Evalúa la respuesta del corazón al ejercicio bajo supervisión médica.',
        '5': 'Registra la presión arterial a intervalos durante las actividades habituales y el descanso.',
        '6': 'Procedimiento para colocar un dispositivo que ayuda a regular el ritmo cardíaco cuando está indicado.',
        '7': 'Permite observar las arterias del corazón y, según la valoración médica, realizar un tratamiento durante el procedimiento.',
        '8': 'Programa supervisado de ejercicio y acompañamiento para apoyar la recuperación y el cuidado cardiovascular.'
      };

      return {
        ...estudioGuardado,
        ...estudioNuevo,
        titulo: estudioGuardado?.titulo ?? estudioNuevo.titulo,
        descripcion: !estudioGuardado?.descripcion ||
          estudioGuardado.descripcion === descripcionAnterior[estudioNuevo.id] ||
          (estudioNuevo.id === '1' &&
            estudioGuardado.descripcion === 'Registra la actividad eléctrica del corazón en reposo y ayuda a evaluar el ritmo cardíaco.')
          ? estudioNuevo.descripcion
          : estudioGuardado?.descripcion ?? estudioNuevo.descripcion
      };
    });
    const trayectoriaItems = savedContent.trayectoriaItems?.map((item) => {
      const defaultItem = DEFAULT_CONTENT.trayectoriaItems.find(({ id }) => id === item.id);
      if (!defaultItem) return item;

      return {
        ...defaultItem,
        ...item,
        logo: item.logo === LEGACY_TRAJECTORY_LOGOS[item.id] || !item.logo
          ? defaultItem.logo
          : item.logo
      };
    }) ?? DEFAULT_CONTENT.trayectoriaItems;

  return {
    ...DEFAULT_CONTENT,
    ...savedContent,
    trayectoriaItems,
    estudiosVisuales: estudiosActualizados
  };
  });

  const [citasOcupadas, setCitasOcupadas] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('cardio_citas_ocupadas');
    const hoy = new Date().toISOString().split('T')[0];
    return saved ? JSON.parse(saved) : { [hoy]: ['10:00 AM', '04:30 PM'] };
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cardio_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cardio_cms_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('cardio_citas_ocupadas', JSON.stringify(citasOcupadas));
  }, [citasOcupadas]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginAdmin = (password: string) => {
    if (password === 'cardio2026') {
      setIsAdmin(true);
      setIsEditing(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setIsEditing(false);
  };

  const updateField = <K extends keyof ContentType>(key: K, value: ContentType[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const resetContent = () => {
    if (window.confirm('¿Restaurar todos los textos e imágenes a los valores originales?')) {
      setContent(DEFAULT_CONTENT);
      localStorage.removeItem('cardio_cms_content');
    }
  };

  const registrarCitaOcupada = (fecha: string, hora: string) => {
    setCitasOcupadas((prev) => {
      const horasDia = prev[fecha] || [];
      if (horasDia.includes(hora)) return prev;
      return { ...prev, [fecha]: [...horasDia, hora] };
    });
  };

  // Permite al doctor bloquear o liberar un horario haciendo clic sobre él
  const toggleHorarioOcupado = (fecha: string, hora: string) => {
    setCitasOcupadas((prev) => {
      const horasDia = prev[fecha] || [];
      const existe = horasDia.includes(hora);
      const nuevasHoras = existe
        ? horasDia.filter((h) => h !== hora)
        : [...horasDia, hora];
      return { ...prev, [fecha]: nuevasHoras };
    });
  };

  return (
    <SiteContext.Provider
      value={{
        theme,
        toggleTheme,
        isAdmin,
        isEditing,
        setIsEditing,
        loginAdmin,
        logoutAdmin,
        content,
        updateField,
        resetContent,
        citasOcupadas,
        registrarCitaOcupada,
        toggleHorarioOcupado
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite debe usarse dentro de SiteProvider');
  return context;
};

interface EditableTextProps {
  value: string;
  onChange: (newVal: string) => void;
  multiline?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  multiline = false,
  className = '',
  as: Tag = 'span'
}) => {
  const { isEditing } = useSite();

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  return multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cms-editable-input ${className}`}
      rows={3}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cms-editable-input ${className}`}
    />
  );
};

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (newSrc: string) => void;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ src, alt, onChange, className = '' }) => {
  const { isEditing } = useSite();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="editable-img-container">
      <img src={src} alt={alt} className={className} />
      {isEditing && (
        <div className="editable-img-overlay">
          <label className="upload-btn-label">
            Subir imagen
            <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
          </label>
          <input
            type="text"
            value={src}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de imagen"
            className="cms-url-input"
          />
        </div>
      )}
    </div>
  );
};