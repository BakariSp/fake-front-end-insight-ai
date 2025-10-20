// Mock data for student platform

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'unsent' | 'sent' | 'graded';
  submitTime?: string;
  aiScore?: number;
  teacherFeedback?: string;
  classId: string;
}

export interface Class {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  progress: string;
  nextClass?: string;
}

export interface Grade {
  assignmentId: string;
  assignmentName: string;
  score: number;
  maxScore: number;
  date: string;
  subject: string;
}

export interface ClassMember {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  email?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

// Classes data - HKDSE aligned
export const mockClasses: Class[] = [
  {
    id: '801',
    name: 'Mathematics (Compulsory Part)',
    teacher: 'Mr. Wong Chi Wai',
    subject: 'Mathematics',
    progress: 'Topic 1: Quadratic Functions',
    nextClass: '2025-10-25 09:00',
  },
  {
    id: '802',
    name: 'English Language',
    teacher: 'Ms. Sarah Chan',
    subject: 'English',
    progress: 'Paper 1: Reading Comprehension',
  },
  {
    id: '803',
    name: 'Physics (Elective)',
    teacher: 'Dr. Leung Kar Ming',
    subject: 'Physics',
    progress: 'Heat and Gases',
  },
  {
    id: '804',
    name: 'Chinese Language',
    teacher: 'Mrs. Li Siu Fong',
    subject: 'Chinese',
    progress: '閱讀理解：白話文',
  },
  {
    id: '805',
    name: 'Chemistry (Elective)',
    teacher: 'Mr. Tam Wai Kit',
    subject: 'Chemistry',
    progress: 'Microscopic World III',
  },
];

// Assignments data - HKDSE aligned
export const mockAssignments: Assignment[] = [
  {
    id: 'A20251012_001',
    title: 'Quadratic Functions Worksheet',
    subject: 'Mathematics',
    dueDate: '2025-10-25',
    status: 'unsent',
    classId: '801',
  },
  {
    id: 'A20251012_002',
    title: 'More about Quadratic Functions',
    subject: 'Mathematics',
    dueDate: '2025-10-28',
    status: 'sent',
    submitTime: '2025-10-20 14:30',
    classId: '801',
  },
  {
    id: 'A20251010_003',
    title: 'Paper 1 Part B2 - Reading Passage Analysis',
    subject: 'English',
    dueDate: '2025-10-22',
    status: 'graded',
    submitTime: '2025-10-18 20:43',
    aiScore: 82,
    teacherFeedback: 'Good understanding of the text. Try to elaborate more on your arguments.',
    classId: '802',
  },
  {
    id: 'A20251015_004',
    title: 'Heat and Internal Energy - Lab Report',
    subject: 'Physics',
    dueDate: '2025-10-30',
    status: 'graded',
    submitTime: '2025-10-19 16:20',
    aiScore: 78,
    teacherFeedback: 'Experimental procedure is clear. Analysis needs improvement.',
    classId: '803',
  },
  {
    id: 'A20251008_005',
    title: 'Paper 2 Writing Task 8 - Article Writing',
    subject: 'English',
    dueDate: '2025-10-20',
    status: 'graded',
    submitTime: '2025-10-17 19:00',
    aiScore: 88,
    teacherFeedback: 'Well-structured article with good vocabulary. Keep it up!',
    classId: '802',
  },
  {
    id: 'A20251016_006',
    title: '文言文閱讀理解練習',
    subject: 'Chinese',
    dueDate: '2025-10-26',
    status: 'unsent',
    classId: '804',
  },
  {
    id: 'A20251018_007',
    title: 'Redox Reactions Practice Questions',
    subject: 'Chemistry',
    dueDate: '2025-10-29',
    status: 'sent',
    submitTime: '2025-10-21 18:15',
    classId: '805',
  },
];

// Grades data - HKDSE aligned
export const mockGrades: Grade[] = [
  { assignmentId: 'A20251010_003', assignmentName: 'Paper 1 Part B2 Reading', score: 82, maxScore: 100, date: '2025-10-18', subject: 'English' },
  { assignmentId: 'A20251015_004', assignmentName: 'Heat & Energy Lab', score: 78, maxScore: 100, date: '2025-10-19', subject: 'Physics' },
  { assignmentId: 'A20251008_005', assignmentName: 'Paper 2 Article Writing', score: 88, maxScore: 100, date: '2025-10-17', subject: 'English' },
  { assignmentId: 'A20250920_006', assignmentName: 'Functions & Graphs Quiz', score: 75, maxScore: 100, date: '2025-09-20', subject: 'Mathematics' },
  { assignmentId: 'A20250915_007', assignmentName: '文言文閱讀測驗', score: 80, maxScore: 100, date: '2025-09-15', subject: 'Chinese' },
  { assignmentId: 'A20250910_008', assignmentName: 'Chemical Bonding Test', score: 85, maxScore: 100, date: '2025-09-10', subject: 'Chemistry' },
];

// Class members data - HKDSE aligned
export const mockClassMembers: Record<string, ClassMember[]> = {
  '801': [
    { id: 'T001', name: 'Mr. Wong Chi Wai', role: 'teacher', email: 'wong.cw@school.edu.hk' },
    { id: 'S001', name: 'Chan Siu Ming', role: 'student' },
    { id: 'S002', name: 'Leung Ka Yan', role: 'student' },
    { id: 'S003', name: 'Wong Tsz Hin', role: 'student' },
    { id: 'S004', name: 'Lam Wing Kei', role: 'student' },
    { id: 'S005', name: 'Cheng Hoi Ling', role: 'student' },
  ],
  '802': [
    { id: 'T002', name: 'Ms. Sarah Chan', role: 'teacher', email: 'chan.s@school.edu.hk' },
    { id: 'S001', name: 'Chan Siu Ming', role: 'student' },
    { id: 'S006', name: 'Li Ka Wai', role: 'student' },
    { id: 'S007', name: 'Tam Sze Wing', role: 'student' },
  ],
  '803': [
    { id: 'T003', name: 'Dr. Leung Kar Ming', role: 'teacher', email: 'leung.km@school.edu.hk' },
    { id: 'S001', name: 'Chan Siu Ming', role: 'student' },
    { id: 'S002', name: 'Leung Ka Yan', role: 'student' },
    { id: 'S008', name: 'Ho Yee Man', role: 'student' },
  ],
  '804': [
    { id: 'T004', name: 'Mrs. Li Siu Fong', role: 'teacher', email: 'li.sf@school.edu.hk' },
    { id: 'S001', name: 'Chan Siu Ming', role: 'student' },
    { id: 'S003', name: 'Wong Tsz Hin', role: 'student' },
    { id: 'S009', name: 'Ng Sze Ching', role: 'student' },
  ],
  '805': [
    { id: 'T005', name: 'Mr. Tam Wai Kit', role: 'teacher', email: 'tam.wk@school.edu.hk' },
    { id: 'S002', name: 'Leung Ka Yan', role: 'student' },
    { id: 'S005', name: 'Cheng Hoi Ling', role: 'student' },
    { id: 'S010', name: 'Cheung Chun Hei', role: 'student' },
  ],
};

// ==================== RESOURCE LIBRARY ====================

// Resource interface (extends Material)
export interface Resource extends Material {
  isFavorite?: boolean;
  isAIRecommended?: boolean;
  recommendationReason?: string;
  relatedTopics?: string[];
}

// AI Recommended Resources
export const mockAIRecommendedResources: Resource[] = [
  {
    id: 'AIR001',
    title: 'Quadratic Functions Practice Set - Similar to Your Recent Errors',
    description: 'Based on your recent performance, this practice set focuses on completing the square and finding vertex forms.',
    subject: 'Mathematics',
    type: 'pdf',
    uploadDate: '2025-10-21',
    uploadedBy: 'AI Learning System',
    classId: '801',
    fileSize: '1.2 MB',
    downloads: 0,
    tags: ['AI Recommended', 'Quadratic', 'Practice'],
    isAIRecommended: true,
    recommendationReason: 'Based on your recent assignment performance in Topic 1',
    relatedTopics: ['Completing the Square', 'Vertex Form', 'Maximum/Minimum'],
  },
  {
    id: 'AIR002',
    title: 'English Paper 2 - Article Writing Samples (Level 5+ Examples)',
    description: 'High-quality sample answers from past DSE exams to help improve your writing skills.',
    subject: 'English',
    type: 'pdf',
    uploadDate: '2025-10-20',
    uploadedBy: 'AI Learning System',
    classId: '802',
    fileSize: '3.5 MB',
    downloads: 0,
    tags: ['AI Recommended', 'Writing', 'Samples'],
    isAIRecommended: true,
    recommendationReason: 'You scored well on your recent article - build on this strength!',
    relatedTopics: ['Article Writing', 'DSE Paper 2', 'High Level Samples'],
  },
  {
    id: 'AIR003',
    title: 'Physics: Heat Transfer Video Tutorial',
    description: 'Visual explanation of conduction, convection, and radiation with real-world examples.',
    subject: 'Physics',
    type: 'video',
    uploadDate: '2025-10-19',
    uploadedBy: 'AI Learning System',
    classId: '803',
    fileSize: '52 MB',
    downloads: 0,
    tags: ['AI Recommended', 'Heat', 'Video Tutorial'],
    isAIRecommended: true,
    recommendationReason: 'Strengthen your understanding of heat transfer concepts',
    relatedTopics: ['Heat Transfer', 'Thermal Physics', 'Real-world Applications'],
  },
];

// ==================== SETTINGS ====================

// User Settings interface
export interface UserSettings {
  // Account Info
  account: {
    studentId: string;
    name: string;
    email: string;
    phone?: string;
    grade: string;
    classes: string[];
    avatar?: string;
  };
  
  // Notification Preferences
  notifications: {
    system: boolean;
    email: boolean;
    push: boolean;
    assignments: boolean;
    grades: boolean;
    announcements: boolean;
    messages: boolean;
    aiRecommendations: boolean;
  };
  
  // Privacy & Security
  privacy: {
    showAchievementsToClassmates: boolean;
    showGradesToClassmates: boolean;
    allowTeacherViewProgress: boolean;
    allowParentAccess: boolean;
    dataSharing: boolean;
  };
  
  // Learning Preferences
  learning: {
    dailyLearningReminder: boolean;
    aiTutorEnabled: boolean;
    studyGoal: number; // minutes per day
    preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  };
  
  // Language & Display
  display: {
    language: 'en' | 'zh' | 'es';
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
  };
}

// Mock User Settings
export const mockUserSettings: UserSettings = {
  account: {
    studentId: '230001',
    name: 'Chan Siu Ming',
    email: 'chan.sm@school.edu.hk',
    phone: '9876 5432',
    grade: 'Form 5 (中五)',
    classes: ['Mathematics', 'English', 'Physics', 'Chinese', 'Chemistry'],
    avatar: '/avatars/student.jpg',
  },
  notifications: {
    system: true,
    email: true,
    push: true,
    assignments: true,
    grades: true,
    announcements: true,
    messages: true,
    aiRecommendations: true,
  },
  privacy: {
    showAchievementsToClassmates: true,
    showGradesToClassmates: false,
    allowTeacherViewProgress: true,
    allowParentAccess: true,
    dataSharing: false,
  },
  learning: {
    dailyLearningReminder: true,
    aiTutorEnabled: true,
    studyGoal: 120, // 2 hours per day
    preferredStudyTime: 'evening',
  },
  display: {
    language: 'en',
    theme: 'light',
    fontSize: 'medium',
  },
};

// Announcements data - HKDSE aligned
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN001',
    title: 'HKDSE Mock Exam Schedule Released',
    content: 'The mock examination will be held from November 18-25. Please check the timetable on the school portal.',
    date: '2025-10-20',
    isRead: true,
  },
  {
    id: 'ANN002',
    title: 'Mathematics Compulsory Part Quiz - Next Friday',
    content: 'Quiz will cover Topics 1-2 (Quadratic Functions & Equations). Please prepare well.',
    date: '2025-10-19',
    isRead: false,
  },
  {
    id: 'ANN003',
    title: 'STEM Fair Project Registration',
    content: 'Register for the school STEM Fair by October 30th. Top projects will represent our school in inter-school competition.',
    date: '2025-10-18',
    isRead: false,
  },
];

// Accuracy rate chart data
export const mockAccuracyData = [
  { label: 'Oct2', value: 65 },
  { label: 'Oct3', value: 70 },
  { label: 'Oct4', value: 68 },
  { label: 'Oct5', value: 75 },
  { label: 'Oct6', value: 72 },
  { label: 'Oct7', value: 80 },
  { label: 'Oct8', value: 40 },
];

// Material interface
export interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'pdf' | 'video' | 'ppt' | 'doc' | 'link';
  uploadDate: string;
  uploadedBy: string;
  classId: string;
  fileSize?: string;
  downloads?: number;
  tags?: string[];
}

// Materials data - HKDSE aligned
export const mockMaterials: Material[] = [
  {
    id: 'M001',
    title: 'Topic 1: Quadratic Functions in One Variable',
    description: 'Complete notes covering quadratic functions, graphs, maximum/minimum values, and applications.',
    subject: 'Mathematics',
    type: 'pdf',
    uploadDate: '2025-10-01',
    uploadedBy: 'Mr. Wong Chi Wai',
    classId: '801',
    fileSize: '2.4 MB',
    downloads: 28,
    tags: ['Quadratic Functions', 'Topic 1', 'Core'],
  },
  {
    id: 'M002',
    title: 'Quadratic Functions DSE Past Paper Questions',
    description: 'Selected DSE past paper questions (2012-2024) on quadratic functions with full solutions.',
    subject: 'Mathematics',
    type: 'pdf',
    uploadDate: '2025-10-03',
    uploadedBy: 'Mr. Wong Chi Wai',
    classId: '801',
    fileSize: '1.8 MB',
    downloads: 24,
    tags: ['Past Paper', 'Practice', 'DSE'],
  },
  {
    id: 'M003',
    title: 'Video: Completing the Square Method',
    description: 'Step-by-step tutorial on completing the square and finding vertex form.',
    subject: 'Mathematics',
    type: 'video',
    uploadDate: '2025-10-05',
    uploadedBy: 'Mr. Wong Chi Wai',
    classId: '801',
    fileSize: '45 MB',
    downloads: 32,
    tags: ['Video Tutorial', 'Completing Square', 'Methods'],
  },
  {
    id: 'M004',
    title: 'Paper 1 Part B2 - Reading Skills',
    description: 'Techniques for tackling long reading passages and data-based questions in Paper 1.',
    subject: 'English',
    type: 'ppt',
    uploadDate: '2025-10-08',
    uploadedBy: 'Ms. Sarah Chan',
    classId: '802',
    fileSize: '5.2 MB',
    downloads: 22,
    tags: ['Reading', 'Paper 1', 'Skills'],
  },
  {
    id: 'M005',
    title: 'Paper 2 Writing Guide - All Text Types',
    description: 'Comprehensive guide covering all DSE Paper 2 text types with sample answers.',
    subject: 'English',
    type: 'pdf',
    uploadDate: '2025-10-10',
    uploadedBy: 'Ms. Sarah Chan',
    classId: '802',
    fileSize: '1.5 MB',
    downloads: 19,
    tags: ['Writing', 'Paper 2', 'Text Types'],
  },
  {
    id: 'M006',
    title: 'Heat and Gases - Lecture Notes',
    description: 'Detailed notes on heat transfer, internal energy, ideal gas law and kinetic theory.',
    subject: 'Physics',
    type: 'pdf',
    uploadDate: '2025-10-12',
    uploadedBy: 'Dr. Leung Kar Ming',
    classId: '803',
    fileSize: '3.1 MB',
    downloads: 26,
    tags: ['Heat', 'Gases', 'Theory'],
  },
  {
    id: 'M007',
    title: 'Physics Elective Laboratory Manual',
    description: 'Complete lab procedures for all required HKDSE Physics experiments.',
    subject: 'Physics',
    type: 'pdf',
    uploadDate: '2025-10-14',
    uploadedBy: 'Dr. Leung Kar Ming',
    classId: '803',
    fileSize: '4.7 MB',
    downloads: 30,
    tags: ['Lab', 'Experiments', 'Practical'],
  },
  {
    id: 'M008',
    title: 'Video: Gas Laws Demonstrations',
    description: 'Visual demonstrations of Boyle\'s Law, Charles\'s Law and real-world applications.',
    subject: 'Physics',
    type: 'video',
    uploadDate: '2025-10-16',
    uploadedBy: 'Dr. Leung Kar Ming',
    classId: '803',
    fileSize: '67 MB',
    downloads: 18,
    tags: ['Video', 'Gas Laws', 'Demo'],
  },
  {
    id: 'M009',
    title: '文言文常用詞彙表',
    description: 'Common classical Chinese vocabulary and grammar patterns for DSE Chinese Language.',
    subject: 'Chinese',
    type: 'doc',
    uploadDate: '2025-10-02',
    uploadedBy: 'Mrs. Li Siu Fong',
    classId: '804',
    fileSize: '856 KB',
    downloads: 35,
    tags: ['文言文', 'Vocabulary', 'Reference'],
  },
  {
    id: 'M010',
    title: 'Redox Reactions Summary Notes',
    description: 'Complete summary of oxidation-reduction reactions, half-equations and electrochemistry.',
    subject: 'Chemistry',
    type: 'pdf',
    uploadDate: '2025-10-18',
    uploadedBy: 'Mr. Tam Wai Kit',
    classId: '805',
    fileSize: '2.1 MB',
    downloads: 12,
    tags: ['Redox', 'Electrochemistry', 'Summary'],
  },
];

// Favorite Resources (defined after mockMaterials to avoid reference errors)
export const mockFavoriteResources: Resource[] = [
  {
    ...mockMaterials[0], // Quadratic Functions notes
    isFavorite: true,
  },
  {
    ...mockMaterials[3], // English Paper 1 Skills
    isFavorite: true,
  },
  {
    ...mockMaterials[5], // Physics Heat and Gases
    isFavorite: true,
  },
];

// Student profile - HKDSE aligned
export const mockStudent = {
  id: 'S001',
  name: 'Chan Siu Ming',
  email: 'chan.sm@school.edu.hk',
  avatar: '/avatars/student.jpg',
  studentId: '230001',
  grade: 'Form 5 (中五)',
};

// Dashboard stats
export const mockDashboardStats = {
  totalAssignments: mockAssignments.length,
  completedAssignments: mockAssignments.filter(a => a.status === 'graded').length,
  pendingAssignments: mockAssignments.filter(a => a.status === 'unsent').length,
  averageScore: 88.6,
};

// ==================== COMMUNICATION CENTER ====================

// School Announcement interface
export interface SchoolAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'school' | 'class';
  target: string; // school name or class name
  publishDate: string;
  status: 'unread' | 'read' | 'confirmed';
  attachments?: string[];
  requireConfirmation?: boolean;
}

// Teacher Message interface
export interface TeacherMessage {
  id: string;
  title: string;
  content: string;
  teacherId: string;
  teacherName: string;
  messageType: 'notification' | 'reminder' | 'activity';
  publishDate: string;
  status: 'unread' | 'read';
  reactions?: {
    understood: boolean;
    question: boolean;
    completed: boolean;
  };
  attachments?: string[];
  relatedAssignmentId?: string;
}

// Contact interface (for Teachers and Parents)
export interface Contact {
  id: string;
  name: string;
  role: 'teacher' | 'parent';
  title?: string; // e.g., "高中语文教师", "Senior Chinese Teacher"
  phone?: string;
  email?: string;
  department?: string;
  subject?: string;
  classes?: string[];
  avatar?: string;
  relatedStudent?: string; // for parent contacts
}

// Teacher Collaboration Group interface
export interface TeacherGroup {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  members: string[]; // teacher IDs
  role: 'leader' | 'member';
  documents?: GroupDocument[];
  permissions: {
    canCreateDocuments: boolean;
    canEdit: boolean;
  };
}

// Group Document interface
export interface GroupDocument {
  id: string;
  title: string;
  creator: string;
  createdDate: string;
  lastUpdate: string;
  memberCount: number;
}

// School Announcements mock data - HKDSE aligned
export const mockSchoolAnnouncements: SchoolAnnouncement[] = [
  {
    id: 'SA001',
    title: '校际英语辩论比赛报名通知',
    content: '香港学界英语辩论比赛将于11月15日举行，有兴趣参加的同学请在10月30日前向英文科老师报名。比赛采用British Parliamentary制，优胜队伍将代表学校参加全港学界比赛。',
    type: 'school',
    target: '全校',
    publishDate: '2025-10-12',
    status: 'unread',
    requireConfirmation: false,
  },
  {
    id: 'SA002',
    title: 'HKDSE模拟试安排通知',
    content: 'HKDSE模拟试将于11月18-25日进行，请中五及中六同学做好准备。考试时间表及座位编排已上载至学校内联网，请同学自行查阅。',
    type: 'school',
    target: '全校',
    publishDate: '2025-10-15',
    status: 'read',
    attachments: ['mock_exam_timetable.pdf'],
    requireConfirmation: true,
  },
  {
    id: 'SA003',
    title: '家长日通知',
    content: '本学年上学期家长日将于10月26日（星期六）下午2时至5时举行。家长可与各科老师面谈，了解子女的学习情况。地点：各班课室。',
    type: 'class',
    target: '中五A班',
    publishDate: '2025-10-18',
    status: 'confirmed',
    requireConfirmation: true,
  },
  {
    id: 'SA004',
    title: 'STEM专题研习展览报名',
    content: '本年度STEM专题研习展览现已接受报名，截止日期为10月30日。优秀作品将代表学校参加校际科学展览，并有机会获得大学推荐信。',
    type: 'school',
    target: '全校',
    publishDate: '2025-10-10',
    status: 'read',
  },
  {
    id: 'SA005',
    title: '香港数学奥林匹克选拔赛',
    content: '数学科将选拔优秀学生参加香港数学奥林匹克比赛，校内选拔试将于10月28日（星期一）放学后于礼堂举行。',
    type: 'class',
    target: '中五A班',
    publishDate: '2025-10-20',
    status: 'unread',
    requireConfirmation: false,
  },
];

// Teacher Messages mock data - HKDSE aligned
export const mockTeacherMessages: TeacherMessage[] = [
  {
    id: 'TM001',
    title: 'Paper 1 阅读作业延期提交',
    content: '由于本周课程调整，Paper 1 Part B2阅读分析作业的提交时间延后至下周一。请同学们善用额外时间，提升答题质量。',
    teacherId: 'T002',
    teacherName: 'Ms. Sarah Chan',
    messageType: 'notification',
    publishDate: '2025-10-14',
    status: 'read',
    reactions: {
      understood: true,
      question: false,
      completed: false,
    },
    relatedAssignmentId: 'A20251010_003',
  },
  {
    id: 'TM002',
    title: '数学科小测提醒',
    content: '各位同学，下周五将进行Topic 1-2（二次函数）的小测，请做好准备。重点温习配方法、顶点式及判别式的应用。',
    teacherId: 'T001',
    teacherName: 'Mr. Wong Chi Wai',
    messageType: 'reminder',
    publishDate: '2025-10-19',
    status: 'unread',
  },
  {
    id: 'TM003',
    title: '物理实验报告已批改',
    content: '上周Heat and Internal Energy实验报告已批改完成，请于Google Classroom查阅。整体表现不错，但部分同学的数据分析需要加强。',
    teacherId: 'T003',
    teacherName: 'Dr. Leung Kar Ming',
    messageType: 'notification',
    publishDate: '2025-10-20',
    status: 'read',
    relatedAssignmentId: 'A20251015_004',
  },
  {
    id: 'TM004',
    title: '英语口试练习安排',
    content: '本周四将进行DSE Paper 4（口试）小组讨论练习，每组4人，讨论时间8分钟。这是很好的操练机会，请同学们认真准备！',
    teacherId: 'T002',
    teacherName: 'Ms. Sarah Chan',
    messageType: 'activity',
    publishDate: '2025-10-17',
    status: 'read',
    reactions: {
      understood: true,
      question: false,
      completed: true,
    },
  },
  {
    id: 'TM005',
    title: 'DSE模拟试温习资料已上载',
    content: '已将模拟试温习资料上载至Google Drive，包括历届DSE试题精选及重点笔记。请尽早下载并开始温习。',
    teacherId: 'T001',
    teacherName: 'Mr. Wong Chi Wai',
    messageType: 'notification',
    publishDate: '2025-10-21',
    status: 'unread',
  },
];

// Teacher Contacts mock data - HKDSE aligned
export const mockTeacherContacts: Contact[] = [
  {
    id: 'T001',
    name: 'Mr. Wong Chi Wai',
    role: 'teacher',
    title: '数学科主任',
    phone: '9123 4567',
    email: 'wong.cw@school.edu.hk',
    department: '数学科',
    subject: '数学',
    classes: ['中五A班', '中五B班'],
    avatar: '/avatars/teacher1.jpg',
  },
  {
    id: 'T002',
    name: 'Ms. Sarah Chan',
    role: 'teacher',
    title: '英文科教师',
    phone: '9234 5678',
    email: 'chan.s@school.edu.hk',
    department: '英文科',
    subject: '英文',
    classes: ['中五A班', '中六C班'],
    avatar: '/avatars/teacher2.jpg',
  },
  {
    id: 'T003',
    name: 'Dr. Leung Kar Ming',
    role: 'teacher',
    title: '物理科主任',
    phone: '9345 6789',
    email: 'leung.km@school.edu.hk',
    department: '物理科',
    subject: '物理',
    classes: ['中五A班', '中五B班'],
    avatar: '/avatars/teacher3.jpg',
  },
  {
    id: 'T004',
    name: 'Mrs. Li Siu Fong',
    role: 'teacher',
    title: '中文科教师',
    phone: '9456 7890',
    email: 'li.sf@school.edu.hk',
    department: '中文科',
    subject: '中文',
    classes: ['中五A班', '中六A班', '中六C班'],
    avatar: '/avatars/teacher4.jpg',
  },
  {
    id: 'T005',
    name: 'Mr. Tam Wai Kit',
    role: 'teacher',
    title: '化学科教师',
    phone: '9567 8901',
    email: 'tam.wk@school.edu.hk',
    department: '化学科',
    subject: '化学',
    classes: ['中四A班', '中五B班'],
    avatar: '/avatars/teacher5.jpg',
  },
  {
    id: 'T006',
    name: 'Miss Cheung Wing Sze',
    role: 'teacher',
    title: '生物科教师',
    phone: '9678 9012',
    email: 'cheung.ws@school.edu.hk',
    department: '生物科',
    subject: '生物',
    classes: ['中四A班', '中五A班'],
    avatar: '/avatars/teacher6.jpg',
  },
  {
    id: 'T007',
    name: 'Mr. Ho Chi Fai',
    role: 'teacher',
    title: '通识教育科主任',
    phone: '9789 0123',
    email: 'ho.cf@school.edu.hk',
    department: '通识科',
    subject: '通识教育',
    classes: ['中五A班', '中六B班'],
    avatar: '/avatars/teacher7.jpg',
  },
  {
    id: 'T008',
    name: 'Ms. Lau Ka Man',
    role: 'teacher',
    title: '经济科教师',
    phone: '9890 1234',
    email: 'lau.km@school.edu.hk',
    department: '经济科',
    subject: '经济',
    classes: ['中四B班', '中五C班'],
    avatar: '/avatars/teacher8.jpg',
  },
  {
    id: 'T009',
    name: 'Mr. Ng Siu Chung',
    role: 'teacher',
    title: '资讯及通讯科技科教师',
    phone: '9901 2345',
    email: 'ng.sc@school.edu.hk',
    department: 'ICT科',
    subject: 'ICT',
    classes: ['中三A班', '中四A班'],
    avatar: '/avatars/teacher9.jpg',
  },
];

// Parent Contacts mock data - HKDSE aligned
export const mockParentContacts: Contact[] = [
  {
    id: 'P001',
    name: 'Mr. Chan',
    role: 'parent',
    phone: '9012 3456',
    relatedStudent: 'Chan Siu Ming',
  },
  {
    id: 'P002',
    name: 'Mrs. Leung',
    role: 'parent',
    phone: '9123 4567',
    relatedStudent: 'Leung Ka Yan',
  },
  {
    id: 'P003',
    name: 'Mr. Wong',
    role: 'parent',
    phone: '9234 5678',
    relatedStudent: 'Wong Tsz Hin',
  },
  {
    id: 'P004',
    name: 'Mrs. Lam',
    role: 'parent',
    phone: '9345 6789',
    relatedStudent: 'Lam Wing Kei',
  },
];

// Teacher Collaboration Groups mock data - HKDSE aligned
export const mockTeacherGroups: TeacherGroup[] = [
  {
    id: 'TG001',
    name: '中五级组',
    description: '负责中五级各科教学资源协调及DSE备试策略',
    leaderId: 'T001',
    leaderName: 'Mr. Wong Chi Wai',
    memberCount: 5,
    members: ['T001', 'T002', 'T003'],
    role: 'leader',
    permissions: {
      canCreateDocuments: true,
      canEdit: true,
    },
    documents: [
      {
        id: 'DOC001',
        title: '中五级2025-26学年教学计划',
        creator: 'Mr. Wong',
        createdDate: '2025-10-12',
        lastUpdate: '2025-10-15',
        memberCount: 8,
      },
    ],
  },
  {
    id: 'TG002',
    name: '英文科组',
    description: 'DSE英文科Paper 1-4教学资源共享及策略研讨',
    leaderId: 'T002',
    leaderName: 'Ms. Sarah Chan',
    memberCount: 4,
    members: ['T002'],
    role: 'member',
    permissions: {
      canCreateDocuments: true,
      canEdit: false,
    },
    documents: [
      {
        id: 'DOC002',
        title: 'DSE English Paper 2 写作教学策略',
        creator: 'Ms. Chan',
        createdDate: '2025-10-15',
        lastUpdate: '2025-10-18',
        memberCount: 12,
      },
      {
        id: 'DOC003',
        title: 'Paper 4 口试评分准则及训练方法',
        creator: 'Miss Lee',
        createdDate: '2025-10-10',
        lastUpdate: '2025-10-12',
        memberCount: 6,
      },
    ],
  },
  {
    id: 'TG003',
    name: '理科科组',
    description: '物理、化学、生物科实验教学资源及DSE策略',
    leaderId: 'T003',
    leaderName: 'Dr. Leung Kar Ming',
    memberCount: 6,
    members: ['T003', 'T005', 'T006'],
    role: 'member',
    permissions: {
      canCreateDocuments: false,
      canEdit: false,
    },
    documents: [
      {
        id: 'DOC004',
        title: 'DSE理科选择题答题技巧',
        creator: 'Dr. Leung',
        createdDate: '2025-10-10',
        lastUpdate: '2025-10-12',
        memberCount: 6,
      },
    ],
  },
];

