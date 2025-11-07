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
    '806': {
      name: 'Liberal Studies (通識教育)',
      progress: 'Theme 1: Personal Development and Interpersonal Relationships',
      subject: 'Liberal Studies',
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
    '806': {
      name: '通识教育科',
      progress: '单元一：个人成长与人际关系',
      subject: '通识教育',
    },
  },
  'zh-TW': {
    '801': {
      name: '數學科（必修部分）',
      progress: '課題一：二次函數',
      subject: '數學',
    },
    '802': {
      name: '英國語文科',
      progress: '卷一：閱讀理解',
      subject: '英文',
    },
    '803': {
      name: '物理科（選修）',
      progress: '熱和氣體',
      subject: '物理',
    },
    '804': {
      name: '中國語文科',
      progress: '閱讀理解：白話文',
      subject: '中文',
    },
    '805': {
      name: '化學科（選修）',
      progress: '微觀世界III',
      subject: '化學',
    },
    '806': {
      name: '通識教育科',
      progress: '單元一：個人成長與人際關係',
      subject: '通識教育',
    },
  },
};

export const assignmentTranslations = {
  en: {
    'A20251012_001': {
      title: 'Quadratic Functions Quiz',
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
    'A20251023_008': {
      title: 'English Oral Practice - Part A Individual Response',
      subject: 'English',
    },
    'A20251012_002': {
      title: 'Functions and Graphs - Concept Check',
      subject: 'Mathematics',
    },
    'A20251024_009': {
      title: 'Physics Experiment Demonstration',
      subject: 'Physics',
    },
    'A20251025_010': {
      title: 'Weekly Math Practice Set 3',
      subject: 'Mathematics',
    },
    'LS_QUIZ_001': {
      title: 'Comprehensive Skills Assessment',
      subject: 'Liberal Studies',
    },
    'LS_FILE_001': {
      title: 'Independent Enquiry Study (IES) - Draft Submission',
      subject: 'Liberal Studies',
    },
    'LS_FILE_002': {
      title: 'Extended Response - Hong Kong Identity',
      subject: 'Liberal Studies',
    },
    'LS_TEXT_001': {
      title: 'Current Affairs Analysis - Weekly Reading',
      subject: 'Liberal Studies',
    },
    'LS_VIDEO_001': {
      title: 'Video Presentation - Social Issue Analysis',
      subject: 'Liberal Studies',
    },
    'LS_VOICE_001': {
      title: 'Oral Practice - Debate Preparation',
      subject: 'Liberal Studies',
    },
    'LS_MIXED_001': {
      title: 'Mid-term Assessment - All Skills',
      subject: 'Liberal Studies',
    },
    'LS_TEXT_002': {
      title: 'Newspaper Clipping Collection',
      subject: 'Liberal Studies',
    },
  },
  zh: {
    'A20251012_001': {
      title: '二次函数测验',
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
    'A20251023_008': {
      title: '英语口语练习 - 第A部分个人回答',
      subject: '英文',
    },
    'A20251012_002': {
      title: '函数与图像 - 概念检测',
      subject: '数学',
    },
    'A20251024_009': {
      title: '物理实验演示',
      subject: '物理',
    },
    'A20251025_010': {
      title: '每周数学练习集3',
      subject: '数学',
    },
    'LS_QUIZ_001': {
      title: '综合技能评估',
      subject: '通识教育',
    },
    'LS_FILE_001': {
      title: '独立专题探究（IES）- 草稿提交',
      subject: '通识教育',
    },
    'LS_FILE_002': {
      title: '延伸回应题 - 香港身份认同',
      subject: '通识教育',
    },
    'LS_TEXT_001': {
      title: '时事分析 - 每周阅读',
      subject: '通识教育',
    },
    'LS_VIDEO_001': {
      title: '视频演示 - 社会议题分析',
      subject: '通识教育',
    },
    'LS_VOICE_001': {
      title: '口语练习 - 辩论准备',
      subject: '通识教育',
    },
    'LS_MIXED_001': {
      title: '期中评估 - 全面技能',
      subject: '通识教育',
    },
    'LS_TEXT_002': {
      title: '报纸剪报收集',
      subject: '通识教育',
    },
  },
  'zh-TW': {
    'A20251012_001': {
      title: '二次函數測驗',
      subject: '數學',
    },
    'A20251010_003': {
      title: '卷一乙部二 - 閱讀篇章分析',
      subject: '英文',
      teacherFeedback: '對文章理解良好。嘗試更詳細闡述你的論點。',
    },
    'A20251015_004': {
      title: '熱和內能 - 實驗報告',
      subject: '物理',
      teacherFeedback: '實驗程序清晰。數據分析需要改進。',
    },
    'A20251008_005': {
      title: '卷二寫作任務8 - 文章寫作',
      subject: '英文',
      teacherFeedback: '文章結構良好，詞彙運用佳。繼續努力！',
    },
    'A20251016_006': {
      title: '文言文閱讀理解練習',
      subject: '中文',
    },
    'A20251018_007': {
      title: '氧化還原反應練習題',
      subject: '化學',
    },
    'A20251023_008': {
      title: '英語口語練習 - 第A部分個人回答',
      subject: '英文',
    },
    'A20251012_002': {
      title: '函數與圖像 - 概念檢測',
      subject: '數學',
    },
    'A20251024_009': {
      title: '物理實驗演示',
      subject: '物理',
    },
    'A20251025_010': {
      title: '每週數學練習集3',
      subject: '數學',
    },
    'LS_QUIZ_001': {
      title: '綜合技能評估',
      subject: '通識教育',
    },
    'LS_FILE_001': {
      title: '獨立專題探究（IES）- 草稿提交',
      subject: '通識教育',
    },
    'LS_FILE_002': {
      title: '延伸回應題 - 香港身份認同',
      subject: '通識教育',
    },
    'LS_TEXT_001': {
      title: '時事分析 - 每週閱讀',
      subject: '通識教育',
    },
    'LS_VIDEO_001': {
      title: '視頻演示 - 社會議題分析',
      subject: '通識教育',
    },
    'LS_VOICE_001': {
      title: '口語練習 - 辯論準備',
      subject: '通識教育',
    },
    'LS_MIXED_001': {
      title: '期中評估 - 全面技能',
      subject: '通識教育',
    },
    'LS_TEXT_002': {
      title: '報紙剪報收集',
      subject: '通識教育',
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
  'zh-TW': {
    'M001': {
      title: '課題一：一元二次函數',
      description: '涵蓋二次函數、圖像、最大/最小值及應用的完整筆記。',
      subject: '數學',
    },
    'M002': {
      title: '二次函數DSE歷屆試題',
      description: '精選DSE歷屆試題（2012-2024）二次函數部分及詳細解答。',
      subject: '數學',
    },
    'M003': {
      title: '視頻：配方法教學',
      description: '配方法及求頂點式的逐步教學。',
      subject: '數學',
    },
    'M004': {
      title: '卷一乙部二 - 閱讀技巧',
      description: '應對卷一長篇章及數據題的技巧。',
      subject: '英文',
    },
    'M005': {
      title: '卷二寫作指南 - 所有文體',
      description: 'DSE卷二所有文體的全面指南及範文。',
      subject: '英文',
    },
    'M006': {
      title: '熱和氣體 - 講義',
      description: '熱傳遞、內能、理想氣體定律及動力學理論的詳細筆記。',
      subject: '物理',
    },
    'M007': {
      title: '物理選修實驗手冊',
      description: 'HKDSE物理科所有必修實驗的完整程序。',
      subject: '物理',
    },
    'M008': {
      title: '視頻：氣體定律演示',
      description: '波義耳定律、查理定律的可視化演示及實際應用。',
      subject: '物理',
    },
    'M009': {
      title: '文言文常用詞彙表',
      description: 'DSE中文科文言文常用詞彙及語法句式。',
      subject: '中文',
    },
    'M010': {
      title: '氧化還原反應摘要筆記',
      description: '氧化還原反應、半方程式及電化學的完整總結。',
      subject: '化學',
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
  'zh-TW': {
    'ANN001': {
      title: 'HKDSE模擬考試時間表公布',
      content: '模擬考試將於11月18-25日舉行。請在學校網站查閱時間表。',
    },
    'ANN002': {
      title: '數學必修部分測驗 - 下週五',
      content: '測驗範圍為課題1-2（二次函數與方程）。請做好準備。',
    },
    'ANN003': {
      title: 'STEM展覽項目報名',
      content: '請在10月30日前報名參加學校STEM展覽。優秀項目將代表學校參加校際比賽。',
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
