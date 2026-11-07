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
  { id: '1', titulo: 'Electrocardiograma.', imagen: electrocardiograma },
  { id: '2', titulo: 'Estudio Holter', imagen: estudioHolter },
  { id: '3', titulo: 'Ecocardiograma.', imagen: ecocardiograma },
  { id: '4', titulo: 'Prueba de ejercicio o de esfuerzo.', imagen: pruebaEjercicio },
  { id: '5', titulo: 'Estudio MAPA.', imagen: estudioMapa },
  { id: '6', titulo: 'Implante de Marcapasos.', imagen: implanteMarcapasos },
  { id: '7', titulo: 'Cateterismo cardíaco o Coronariografía Diagnóstica y Terapéutica.', imagen: cateterismoCardiaco },
  { id: '8', titulo: 'Rehabilitación Cardíaca.', imagen: rehabilitacionCardiaca }
] as EstudioVisual[],

  listaServicios: [
    'Electrocardiograma',
    'Estudio Holter de 24 horas',
    'Monitoreo Ambulatorio de la Presión Arterial (MAPA)',
    'Ecocardiograma',
    'Prueba de esfuerzo',
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

    return { ...DEFAULT_CONTENT, ...savedContent, trayectoriaItems };
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