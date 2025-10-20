import type { Language } from '@/app/contexts/LanguageContext';

// Translation data for mock content - HKDSE aligned
export const classTranslations = {
  en: {
    '801': {
      name: 'Mathematics (Compulsory Part)',
      progress: 'Topic 1: Quadratic Functions',
      subject: 'Mathematics',
    },
    '802': {
      name: 'English Language',
      progress: 'Paper 1: Reading Comprehension',
      subject: 'English',
    },
    '803': {
      name: 'Physics (Elective)',
      progress: 'Heat and Gases',
      subject: 'Physics',
    },
    '804': {
      name: 'Chinese Language',
      progress: 'Reading Comprehension: Vernacular Chinese',
      subject: 'Chinese',
    },
    '805': {
      name: 'Chemistry (Elective)',
      progress: 'Microscopic World III',
      subject: 'Chemistry',
    },
  },
  zh: {
    '801': {
      name: '数学科（必修部分）',
      progress: '课题一：二次函数',
      subject: '数学',
    },
    '802': {
      name: '英国语文科',
      progress: '卷一：阅读理解',
      subject: '英文',
    },
    '803': {
      name: '物理科（选修）',
      progress: '热和气体',
      subject: '物理',
    },
    '804': {
      name: '中国语文科',
      progress: '阅读理解：白话文',
      subject: '中文',
    },
    '805': {
      name: '化学科（选修）',
      progress: '微观世界III',
      subject: '化学',
    },
  },
  es: {
    '801': {
      name: 'Matemáticas (Parte Obligatoria)',
      progress: 'Tema 1: Funciones Cuadráticas',
      subject: 'Matemáticas',
    },
    '802': {
      name: 'Lengua Inglesa',
      progress: 'Papel 1: Comprensión de Lectura',
      subject: 'Inglés',
    },
    '803': {
      name: 'Física (Electiva)',
      progress: 'Calor y Gases',
      subject: 'Física',
    },
    '804': {
      name: 'Lengua China',
      progress: 'Comprensión Lectora: Chino Vernáculo',
      subject: 'Chino',
    },
    '805': {
      name: 'Química (Electiva)',
      progress: 'Mundo Microscópico III',
      subject: 'Química',
    },
  },
};

export const assignmentTranslations = {
  en: {
    'A20251012_001': {
      title: 'Quadratic Functions Worksheet',
      subject: 'Mathematics',
    },
    'A20251012_002': {
      title: 'More about Quadratic Functions',
      subject: 'Mathematics',
    },
    'A20251010_003': {
      title: 'Paper 1 Part B2 - Reading Passage Analysis',
      subject: 'English',
      teacherFeedback: 'Good understanding of the text. Try to elaborate more on your arguments.',
    },
    'A20251015_004': {
      title: 'Heat and Internal Energy - Lab Report',
      subject: 'Physics',
      teacherFeedback: 'Experimental procedure is clear. Analysis needs improvement.',
    },
    'A20251008_005': {
      title: 'Paper 2 Writing Task 8 - Article Writing',
      subject: 'English',
      teacherFeedback: 'Well-structured article with good vocabulary. Keep it up!',
    },
    'A20251016_006': {
      title: 'Classical Chinese Reading Comprehension Exercise',
      subject: 'Chinese',
    },
    'A20251018_007': {
      title: 'Redox Reactions Practice Questions',
      subject: 'Chemistry',
    },
  },
  zh: {
    'A20251012_001': {
      title: '二次函数工作纸',
      subject: '数学',
    },
    'A20251012_002': {
      title: '进阶二次函数练习',
      subject: '数学',
    },
    'A20251010_003': {
      title: '卷一乙部二 - 阅读篇章分析',
      subject: '英文',
      teacherFeedback: '对文章理解良好。尝试更详细阐述你的论点。',
    },
    'A20251015_004': {
      title: '热和内能 - 实验报告',
      subject: '物理',
      teacherFeedback: '实验程序清晰。数据分析需要改进。',
    },
    'A20251008_005': {
      title: '卷二写作任务8 - 文章写作',
      subject: '英文',
      teacherFeedback: '文章结构良好，词汇运用佳。继续努力！',
    },
    'A20251016_006': {
      title: '文言文阅读理解练习',
      subject: '中文',
    },
    'A20251018_007': {
      title: '氧化还原反应练习题',
      subject: '化学',
    },
  },
  es: {
    'A20251012_001': {
      title: 'Hoja de Trabajo de Funciones Cuadráticas',
      subject: 'Matemáticas',
    },
    'A20251012_002': {
      title: 'Más sobre Funciones Cuadráticas',
      subject: 'Matemáticas',
    },
    'A20251010_003': {
      title: 'Papel 1 Parte B2 - Análisis de Pasaje',
      subject: 'Inglés',
      teacherFeedback: 'Buena comprensión del texto. Intenta elaborar más tus argumentos.',
    },
    'A20251015_004': {
      title: 'Calor y Energía Interna - Informe de Lab',
      subject: 'Física',
      teacherFeedback: 'Procedimiento experimental claro. El análisis necesita mejora.',
    },
    'A20251008_005': {
      title: 'Papel 2 Tarea 8 - Escritura de Artículo',
      subject: 'Inglés',
      teacherFeedback: 'Artículo bien estructurado con buen vocabulario. ¡Sigue así!',
    },
    'A20251016_006': {
      title: 'Ejercicio de Comprensión de Chino Clásico',
      subject: 'Chino',
    },
    'A20251018_007': {
      title: 'Preguntas de Práctica de Reacciones Redox',
      subject: 'Química',
    },
  },
};

export const materialTranslations = {
  en: {
    'M001': {
      title: 'Topic 1: Quadratic Functions in One Variable',
      description: 'Complete notes covering quadratic functions, graphs, maximum/minimum values, and applications.',
      subject: 'Mathematics',
    },
    'M002': {
      title: 'Quadratic Functions DSE Past Paper Questions',
      description: 'Selected DSE past paper questions (2012-2024) on quadratic functions with full solutions.',
      subject: 'Mathematics',
    },
    'M003': {
      title: 'Video: Completing the Square Method',
      description: 'Step-by-step tutorial on completing the square and finding vertex form.',
      subject: 'Mathematics',
    },
    'M004': {
      title: 'Paper 1 Part B2 - Reading Skills',
      description: 'Techniques for tackling long reading passages and data-based questions in Paper 1.',
      subject: 'English',
    },
    'M005': {
      title: 'Paper 2 Writing Guide - All Text Types',
      description: 'Comprehensive guide covering all DSE Paper 2 text types with sample answers.',
      subject: 'English',
    },
    'M006': {
      title: 'Heat and Gases - Lecture Notes',
      description: 'Detailed notes on heat transfer, internal energy, ideal gas law and kinetic theory.',
      subject: 'Physics',
    },
    'M007': {
      title: 'Physics Elective Laboratory Manual',
      description: 'Complete lab procedures for all required HKDSE Physics experiments.',
      subject: 'Physics',
    },
    'M008': {
      title: 'Video: Gas Laws Demonstrations',
      description: 'Visual demonstrations of Boyle\'s Law, Charles\'s Law and real-world applications.',
      subject: 'Physics',
    },
    'M009': {
      title: 'Classical Chinese Vocabulary List',
      description: 'Common classical Chinese vocabulary and grammar patterns for DSE Chinese Language.',
      subject: 'Chinese',
    },
    'M010': {
      title: 'Redox Reactions Summary Notes',
      description: 'Complete summary of oxidation-reduction reactions, half-equations and electrochemistry.',
      subject: 'Chemistry',
    },
  },
  zh: {
    'M001': {
      title: '课题一：一元二次函数',
      description: '涵盖二次函数、图像、最大/最小值及应用的完整笔记。',
      subject: '数学',
    },
    'M002': {
      title: '二次函数DSE历届试题',
      description: '精选DSE历届试题（2012-2024）二次函数部分及详细解答。',
      subject: '数学',
    },
    'M003': {
      title: '视频：配方法教学',
      description: '配方法及求顶点式的逐步教学。',
      subject: '数学',
    },
    'M004': {
      title: '卷一乙部二 - 阅读技巧',
      description: '应对卷一长篇章及数据题的技巧。',
      subject: '英文',
    },
    'M005': {
      title: '卷二写作指南 - 所有文体',
      description: 'DSE卷二所有文体的全面指南及范文。',
      subject: '英文',
    },
    'M006': {
      title: '热和气体 - 讲义',
      description: '热传递、内能、理想气体定律及动力学理论的详细笔记。',
      subject: '物理',
    },
    'M007': {
      title: '物理选修实验手册',
      description: 'HKDSE物理科所有必修实验的完整程序。',
      subject: '物理',
    },
    'M008': {
      title: '视频：气体定律演示',
      description: '波义耳定律、查理定律的可视化演示及实际应用。',
      subject: '物理',
    },
    'M009': {
      title: '文言文常用词汇表',
      description: 'DSE中文科文言文常用词汇及语法句式。',
      subject: '中文',
    },
    'M010': {
      title: '氧化还原反应摘要笔记',
      description: '氧化还原反应、半方程式及电化学的完整总结。',
      subject: '化学',
    },
  },
  es: {
    'M001': {
      title: 'Tema 1: Funciones Cuadráticas en Una Variable',
      description: 'Notas completas sobre funciones cuadráticas, gráficos, valores máximos/mínimos y aplicaciones.',
      subject: 'Matemáticas',
    },
    'M002': {
      title: 'Preguntas de Exámenes Pasados DSE - Funciones',
      description: 'Preguntas seleccionadas de exámenes DSE (2012-2024) sobre funciones cuadráticas con soluciones.',
      subject: 'Matemáticas',
    },
    'M003': {
      title: 'Video: Método de Completar el Cuadrado',
      description: 'Tutorial paso a paso sobre completar el cuadrado y encontrar la forma de vértice.',
      subject: 'Matemáticas',
    },
    'M004': {
      title: 'Papel 1 Parte B2 - Habilidades de Lectura',
      description: 'Técnicas para abordar pasajes largos y preguntas basadas en datos en Papel 1.',
      subject: 'Inglés',
    },
    'M005': {
      title: 'Guía de Escritura Papel 2 - Todos los Tipos',
      description: 'Guía completa de todos los tipos de texto del DSE Papel 2 con respuestas de muestra.',
      subject: 'Inglés',
    },
    'M006': {
      title: 'Calor y Gases - Notas de Clase',
      description: 'Notas detalladas sobre transferencia de calor, energía interna, ley de gases ideales y teoría cinética.',
      subject: 'Física',
    },
    'M007': {
      title: 'Manual de Laboratorio de Física Electiva',
      description: 'Procedimientos de laboratorio completos para todos los experimentos requeridos de HKDSE Física.',
      subject: 'Física',
    },
    'M008': {
      title: 'Video: Demostraciones de Leyes de Gases',
      description: 'Demostraciones visuales de la Ley de Boyle, Ley de Charles y aplicaciones del mundo real.',
      subject: 'Física',
    },
    'M009': {
      title: 'Lista de Vocabulario de Chino Clásico',
      description: 'Vocabulario común de chino clásico y patrones gramaticales para DSE Lengua China.',
      subject: 'Chino',
    },
    'M010': {
      title: 'Notas Resumen de Reacciones Redox',
      description: 'Resumen completo de reacciones de oxidación-reducción, semi-ecuaciones y electroquímica.',
      subject: 'Química',
    },
  },
};

export const announcementTranslations = {
  en: {
    'ANN001': {
      title: 'HKDSE Mock Exam Schedule Released',
      content: 'The mock examination will be held from November 18-25. Please check the timetable on the school portal.',
    },
    'ANN002': {
      title: 'Mathematics Compulsory Part Quiz - Next Friday',
      content: 'Quiz will cover Topics 1-2 (Quadratic Functions & Equations). Please prepare well.',
    },
    'ANN003': {
      title: 'STEM Fair Project Registration',
      content: 'Register for the school STEM Fair by October 30th. Top projects will represent our school in inter-school competition.',
    },
  },
  zh: {
    'ANN001': {
      title: 'HKDSE模拟考试时间表公布',
      content: '模拟考试将于11月18-25日举行。请在学校网站查阅时间表。',
    },
    'ANN002': {
      title: '数学必修部分测验 - 下周五',
      content: '测验范围为课题1-2（二次函数与方程）。请做好准备。',
    },
    'ANN003': {
      title: 'STEM展览项目报名',
      content: '请在10月30日前报名参加学校STEM展览。优秀项目将代表学校参加校际比赛。',
    },
  },
  es: {
    'ANN001': {
      title: 'Horario de Examen Simulado HKDSE Publicado',
      content: 'El examen simulado se llevará a cabo del 18 al 25 de noviembre. Por favor consulte el horario en el portal escolar.',
    },
    'ANN002': {
      title: 'Cuestionario de Matemáticas Parte Obligatoria - Próximo Viernes',
      content: 'El cuestionario cubrirá los Temas 1-2 (Funciones y Ecuaciones Cuadráticas). Por favor prepárese bien.',
    },
    'ANN003': {
      title: 'Registro de Proyecto Feria STEM',
      content: 'Regístrese para la Feria STEM de la escuela antes del 30 de octubre. Los mejores proyectos representarán a nuestra escuela en competencias inter-escolares.',
    },
  },
};

// Helper functions to get translated data
export function getTranslatedClass(classId: string, language: Language) {
  const translations = classTranslations[language] || classTranslations.en;
  return translations[classId as keyof typeof translations] || classTranslations.en[classId as keyof typeof classTranslations.en];
}

export function getTranslatedAssignment(assignmentId: string, language: Language) {
  const translations = assignmentTranslations[language] || assignmentTranslations.en;
  return translations[assignmentId as keyof typeof translations] || assignmentTranslations.en[assignmentId as keyof typeof assignmentTranslations.en];
}

export function getTranslatedMaterial(materialId: string, language: Language) {
  const translations = materialTranslations[language] || materialTranslations.en;
  return translations[materialId as keyof typeof translations] || materialTranslations.en[materialId as keyof typeof materialTranslations.en];
}

export function getTranslatedAnnouncement(announcementId: string, language: Language) {
  const translations = announcementTranslations[language] || announcementTranslations.en;
  return translations[announcementId as keyof typeof translations] || announcementTranslations.en[announcementId as keyof typeof announcementTranslations.en];
}
