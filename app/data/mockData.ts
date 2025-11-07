// Mock data for student platform

// Question types for online quizzes
export interface QuizQuestion {
  id: string;
  type: 'single_choice' | 'multiple_choice' | 'open_ended' | 'voice' | 'video';
  question: string;
  points: number;
  options?: string[]; // For choice questions
  correctAnswer?: string | string[]; // For auto-grading
  explanation?: string;
  imageUrl?: string;
  audioUrl?: string;
}

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
  type: 'text' | 'file_upload' | 'online_quiz'; // Assignment type
  description?: string; // Assignment instructions
  attachments?: string[]; // Teacher provided files
  questions?: QuizQuestion[]; // For online_quiz type
  totalPoints?: number; // Total points for quiz
  duration?: number; // Time limit in minutes
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
  {
    id: '806',
    name: 'Liberal Studies (通識教育)',
    teacher: 'Mr. Ho Chi Fai',
    subject: 'Liberal Studies',
    progress: 'Theme 1: Personal Development and Interpersonal Relationships',
    nextClass: '2025-10-24 14:00',
  },
];

// Assignments data - HKDSE aligned with various types
export const mockAssignments: Assignment[] = [
  // ONLINE QUIZ - Single/Multiple Choice
  {
    id: 'A20251012_001',
    title: 'Quadratic Functions Quiz',
    subject: 'Mathematics',
    dueDate: '2025-10-25',
    status: 'unsent',
    classId: '801',
    type: 'online_quiz',
    description: 'Complete the following quiz about quadratic functions. You have 30 minutes to complete all 10 questions.',
    totalPoints: 50,
    duration: 30,
    questions: [
      {
        id: 'Q001',
        type: 'single_choice',
        question: '15 + 3 = ?',
        points: 5,
        options: ['12', '18', '13', '16'],
        correctAnswer: '18',
        explanation: '15加3等于18。',
      },
      {
        id: 'Q002',
        type: 'single_choice',
        question: 'What is the vertex form of a quadratic function?',
        points: 5,
        options: [
          'y = ax² + bx + c',
          'y = a(x - h)² + k',
          'y = a(x + h)² - k',
          'y = (x - h)(x - k)'
        ],
        correctAnswer: 'y = a(x - h)² + k',
        explanation: 'The vertex form is y = a(x - h)² + k, where (h, k) is the vertex.',
      },
      {
        id: 'Q003',
        type: 'multiple_choice',
        question: 'Which of the following are properties of quadratic functions? (Select all that apply)',
        points: 10,
        options: [
          'They have a parabolic shape',
          'They have exactly one turning point',
          'They are always increasing',
          'The graph is symmetric about a vertical line'
        ],
        correctAnswer: ['They have a parabolic shape', 'They have exactly one turning point', 'The graph is symmetric about a vertical line'],
        explanation: 'Quadratic functions have a parabolic shape, one turning point (vertex), and are symmetric about a vertical line through the vertex. They are not always increasing.',
      },
      {
        id: 'Q004',
        type: 'single_choice',
        question: 'If a > 0 in y = ax² + bx + c, the parabola opens:',
        points: 5,
        options: ['Upward', 'Downward', 'To the right', 'To the left'],
        correctAnswer: 'Upward',
        explanation: 'When a > 0, the parabola opens upward.',
      },
      {
        id: 'Q005',
        type: 'open_ended',
        question: 'Convert y = 2x² + 8x + 5 to vertex form. Show your work using the completing the square method.',
        points: 15,
        explanation: 'y = 2(x² + 4x) + 5 = 2(x² + 4x + 4 - 4) + 5 = 2(x + 2)² - 8 + 5 = 2(x + 2)² - 3',
      },
      {
        id: 'Q006',
        type: 'single_choice',
        question: 'What is the axis of symmetry for y = (x - 3)² + 4?',
        points: 5,
        options: ['x = -3', 'x = 3', 'x = 4', 'x = -4'],
        correctAnswer: 'x = 3',
        explanation: 'In vertex form y = a(x - h)² + k, the axis of symmetry is x = h. Here h = 3.',
      },
      {
        id: 'Q007',
        type: 'single_choice',
        question: 'The minimum value of y = 2(x - 1)² + 3 is:',
        points: 5,
        options: ['1', '2', '3', '-3'],
        correctAnswer: '3',
        explanation: 'Since a = 2 > 0, the parabola opens upward and has a minimum at the vertex (1, 3). The minimum value is k = 3.',
      },
    ],
  },
  
  // FILE UPLOAD - Lab Report
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
    type: 'file_upload',
    description: 'Submit your complete lab report including: experimental setup, procedure, data collection, analysis, and conclusion. Include all graphs and calculations.',
    attachments: ['Lab_Guidelines.pdf', 'Data_Template.xlsx'],
  },
  
  // TEXT TYPE - Reading Analysis
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
    type: 'file_upload',
    description: 'Read the provided passage and answer questions 1-6. Write your responses in complete sentences and support your answers with evidence from the text.',
    attachments: ['Reading_Passage.pdf'],
  },
  
  // TEXT TYPE - Essay Writing
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
    type: 'file_upload',
    description: 'Write an article (400-500 words) about "The Impact of Social Media on Teenagers". Include an engaging introduction, well-developed body paragraphs, and a strong conclusion.',
  },
  
  // ONLINE QUIZ with VOICE question
  {
    id: 'A20251023_008',
    title: 'English Oral Practice - Part A Individual Response',
    subject: 'English',
    dueDate: '2025-11-05',
    status: 'unsent',
    classId: '802',
    type: 'online_quiz',
    description: 'Practice for DSE Paper 4 Speaking. Record your responses to the prompts. Speak clearly and aim for 1 minute per response.',
    totalPoints: 20,
    duration: 10,
    questions: [
      {
        id: 'Q101',
        type: 'voice',
        question: 'Describe a memorable experience from your school life. Explain why it was significant to you.',
        points: 10,
        explanation: 'Speak for about 1 minute. Include specific details and personal reflections.',
      },
      {
        id: 'Q102',
        type: 'voice',
        question: 'Do you think students should have part-time jobs? Why or why not?',
        points: 10,
        explanation: 'Give your opinion with at least 2 supporting reasons.',
      },
    ],
  },
  
  // ONLINE QUIZ - Mixed types
  {
    id: 'A20251012_002',
    title: 'Functions and Graphs - Concept Check',
    subject: 'Mathematics',
    dueDate: '2025-10-28',
    status: 'sent',
    submitTime: '2025-10-20 14:30',
    classId: '801',
    type: 'online_quiz',
    description: 'Quick quiz to check your understanding of functions and graphs.',
    totalPoints: 30,
    duration: 20,
    questions: [
      {
        id: 'Q201',
        type: 'single_choice',
        question: 'Which of the following is NOT a function?',
        points: 5,
        options: ['y = x²', 'x = y²', 'y = 2x + 1', 'y = |x|'],
        correctAnswer: 'x = y²',
      },
      {
        id: 'Q202',
        type: 'multiple_choice',
        question: 'Select all the even functions:',
        points: 10,
        options: ['y = x²', 'y = x³', 'y = |x|', 'y = cos(x)'],
        correctAnswer: ['y = x²', 'y = |x|', 'y = cos(x)'],
      },
      {
        id: 'Q203',
        type: 'open_ended',
        question: 'Explain in your own words what the vertical line test tells us about whether a graph represents a function.',
        points: 15,
      },
    ],
  },
  
  // TEXT TYPE with attachments
  {
    id: 'A20251016_006',
    title: '文言文閱讀理解練習',
    subject: 'Chinese',
    dueDate: '2025-10-26',
    status: 'unsent',
    classId: '804',
    type: 'file_upload',
    description: '閱讀所提供的文言文篇章，完成理解問題1-8題。需要解釋重點字詞及分析文章主旨。',
    attachments: ['文言文篇章.pdf', '詞彙表.pdf'],
  },
  
  // FILE UPLOAD - Chemistry
  {
    id: 'A20251018_007',
    title: 'Redox Reactions Practice Questions',
    subject: 'Chemistry',
    dueDate: '2025-10-29',
    status: 'sent',
    submitTime: '2025-10-21 18:15',
    classId: '805',
    type: 'file_upload',
    description: 'Complete questions 1-20 from the textbook. Show all working including half-equations and electron transfer.',
    attachments: ['Question_Sheet.pdf'],
  },
  
  // ONLINE QUIZ with VIDEO response
  {
    id: 'A20251024_009',
    title: 'Physics Experiment Demonstration',
    subject: 'Physics',
    dueDate: '2025-11-10',
    status: 'unsent',
    classId: '803',
    type: 'online_quiz',
    description: 'Record a video demonstrating and explaining a simple physics experiment at home.',
    totalPoints: 30,
    duration: 60,
    questions: [
      {
        id: 'Q301',
        type: 'video',
        question: 'Demonstrate an experiment showing the principle of energy conservation. Explain the physics behind your demonstration.',
        points: 30,
        explanation: 'Your video should be 3-5 minutes long. Include: setup, demonstration, explanation of the physics principles, and conclusion.',
      },
    ],
  },
  
  // TEXT TYPE - Simple instruction
  {
    id: 'A20251025_010',
    title: 'Weekly Math Practice Set 3',
    subject: 'Mathematics',
    dueDate: '2025-11-02',
    status: 'unsent',
    classId: '801',
    type: 'text',
    description: 'Complete exercises 1-15 from Chapter 3 of your textbook. Focus on:\n• Solving quadratic equations by factorization\n• Using the quadratic formula\n• Finding the discriminant\n• Solving word problems\n\nShow all your working clearly.',
  },

  // ==================== LIBERAL STUDIES ASSIGNMENTS ====================
  // Covers ALL assignment types for comprehensive testing

  // 1. ONLINE QUIZ with all question types
  {
    id: 'LS_QUIZ_001',
    title: 'Comprehensive Skills Assessment',
    subject: 'Liberal Studies',
    dueDate: '2025-11-08',
    status: 'unsent',
    classId: '806',
    type: 'online_quiz',
    description: 'This comprehensive quiz tests various skills including critical thinking, oral communication, and analytical writing. Complete all sections carefully.',
    totalPoints: 100,
    duration: 45,
    questions: [
      {
        id: 'LSQ1',
        type: 'single_choice',
        question: 'Which of the following best describes sustainable development?',
        points: 10,
        options: [
          'Economic growth at any cost',
          'Meeting present needs without compromising future generations',
          'Focusing only on environmental protection',
          'Maximizing short-term profits'
        ],
        correctAnswer: 'Meeting present needs without compromising future generations',
        explanation: 'Sustainable development balances economic, social, and environmental needs for current and future generations.',
      },
      {
        id: 'LSQ2',
        type: 'multiple_choice',
        question: 'Select all factors that contribute to Hong Kong\'s aging population:',
        points: 15,
        options: [
          'Declining birth rate',
          'Improved healthcare',
          'Increased life expectancy',
          'Economic recession',
          'Better education system'
        ],
        correctAnswer: ['Declining birth rate', 'Improved healthcare', 'Increased life expectancy'],
        explanation: 'Aging population is primarily driven by lower birth rates and longer life expectancy due to better healthcare.',
      },
      {
        id: 'LSQ3',
        type: 'open_ended',
        question: 'Analyze the impact of social media on teenagers\' mental health. Discuss both positive and negative effects, and suggest ways to promote healthy social media use. (250-300 words)',
        points: 30,
        explanation: 'Look for balanced analysis covering: cyberbullying, FOMO, body image issues, but also community building and support networks. Practical suggestions should be included.',
      },
      {
        id: 'LSQ4',
        type: 'voice',
        question: 'Present your views on whether Hong Kong should implement a universal retirement protection scheme. Speak for 2-3 minutes, covering economic feasibility, social benefits, and potential challenges.',
        points: 25,
        explanation: 'Assessment criteria: clarity of expression, logical structure, depth of analysis, and use of evidence.',
      },
      {
        id: 'LSQ5',
        type: 'single_choice',
        question: 'What is the primary cause of wealth inequality in modern societies?',
        points: 10,
        options: [
          'Lack of education opportunities',
          'Unequal distribution of resources and opportunities',
          'Individual laziness',
          'Government overspending'
        ],
        correctAnswer: 'Unequal distribution of resources and opportunities',
      },
      {
        id: 'LSQ6',
        type: 'open_ended',
        question: 'Explain how climate change affects global food security. Use specific examples and data to support your answer.',
        points: 10,
        explanation: 'Should include: extreme weather impacts on crops, changing agricultural zones, water scarcity, and specific case studies.',
      },
    ],
  },

  // 2. FILE UPLOAD - Research Report
  {
    id: 'LS_FILE_001',
    title: 'Independent Enquiry Study (IES) - Draft Submission',
    subject: 'Liberal Studies',
    dueDate: '2025-11-15',
    status: 'unsent',
    classId: '806',
    type: 'file_upload',
    description: 'Submit your IES draft including:\n\n1. Title and research question (clear and focused)\n2. Background and rationale (why this topic matters)\n3. Research methodology (surveys, interviews, data analysis)\n4. Preliminary findings (charts, tables, analysis)\n5. Bibliography (at least 5 credible sources)\n\nFormat: PDF document, 3000-4000 words\nInclude all appendices (survey forms, interview transcripts, raw data)',
    attachments: ['IES_Guidelines_2025.pdf', 'IES_Template.docx', 'Sample_IES_Report.pdf'],
  },

  // 3. FILE UPLOAD - Essay with attachments
  {
    id: 'LS_FILE_002',
    title: 'Extended Response - Hong Kong Identity',
    subject: 'Liberal Studies',
    dueDate: '2025-11-20',
    status: 'unsent',
    classId: '806',
    type: 'file_upload',
    description: 'Write an essay (800-1000 words) on:\n\n"To what extent do young people in Hong Kong identify with Chinese culture?"\n\nYour essay should:\n• Include an introduction with a clear thesis statement\n• Present multiple perspectives and evidence\n• Analyze causes and implications\n• Provide a balanced conclusion\n\nUse the provided reading materials and add at least 3 additional sources.',
    attachments: ['Reading_Package_Identity.pdf', 'Survey_Data_2024.xlsx'],
  },

  // 4. TEXT TYPE - Reading assignment
  {
    id: 'LS_TEXT_001',
    title: 'Current Affairs Analysis - Weekly Reading',
    subject: 'Liberal Studies',
    dueDate: '2025-10-30',
    status: 'unsent',
    classId: '806',
    type: 'text',
    description: 'This week\'s focus: Environmental Protection and Sustainable Development\n\nTasks:\n1. Read the three newspaper articles provided on Google Classroom\n2. Watch the documentary "Our Planet" Episode 3 (45 mins)\n3. Complete the reflection questions in your workbook (pages 23-25)\n4. Prepare to discuss in next class:\n   • What are the main environmental challenges facing Hong Kong?\n   • How can individuals contribute to sustainability?\n   • What policies should the government implement?\n\nNo submission required - but be ready for class discussion and quiz!',
  },

  // 5. VIDEO RESPONSE - Presentation
  {
    id: 'LS_VIDEO_001',
    title: 'Video Presentation - Social Issue Analysis',
    subject: 'Liberal Studies',
    dueDate: '2025-11-25',
    status: 'unsent',
    classId: '806',
    type: 'online_quiz',
    description: 'Create a 5-minute video presentation analyzing a current social issue in Hong Kong.',
    totalPoints: 50,
    duration: 60,
    questions: [
      {
        id: 'LSVID1',
        type: 'video',
        question: 'Record a 4-6 minute video presentation on ONE of the following topics:\n\n1. Housing affordability crisis in Hong Kong\n2. Mental health challenges among students\n3. Digital divide and educational inequality\n4. Youth unemployment and career prospects\n\nYour presentation should include:\n• Clear problem statement and context\n• Analysis of causes and stakeholders\n• Impact on different groups in society\n• At least 2 proposed solutions with justification\n• Visual aids (PowerPoint slides, charts, or images)\n\nAssessment Criteria:\n- Content and Analysis (20 points)\n- Structure and Clarity (10 points)\n- Use of Evidence (10 points)\n- Presentation Skills (10 points)',
        points: 50,
        explanation: 'Your video will be assessed on content depth, logical structure, evidence-based arguments, and presentation delivery.',
      },
    ],
  },

  // 6. ORAL PRACTICE - Voice recording
  {
    id: 'LS_VOICE_001',
    title: 'Oral Practice - Debate Preparation',
    subject: 'Liberal Studies',
    dueDate: '2025-11-12',
    status: 'unsent',
    classId: '806',
    type: 'online_quiz',
    description: 'Prepare for the in-class debate by recording your opening statement.',
    totalPoints: 30,
    duration: 15,
    questions: [
      {
        id: 'LSVOICE1',
        type: 'voice',
        question: 'Motion: "Hong Kong should implement a four-day work week"\n\nRecord your opening statement (2-3 minutes) either FOR or AGAINST the motion.\n\nInclude:\n• Clear stance and position\n• 3 main arguments with explanations\n• Evidence or examples to support each point\n• Anticipate and address opposing views\n• Strong conclusion\n\nTips:\n- Speak clearly and at a steady pace\n- Use persuasive language\n- Show passion but remain logical\n- Time yourself before recording',
        points: 30,
        explanation: 'Your recording will help you prepare for the actual debate and allows me to give you feedback on your arguments and presentation.',
      },
    ],
  },

  // 7. MIXED QUIZ - All question types
  {
    id: 'LS_MIXED_001',
    title: 'Mid-term Assessment - All Skills',
    subject: 'Liberal Studies',
    dueDate: '2025-11-18',
    status: 'unsent',
    classId: '806',
    type: 'online_quiz',
    description: 'Comprehensive mid-term assessment covering multiple skills and content areas.',
    totalPoints: 80,
    duration: 60,
    questions: [
      {
        id: 'LSMIX1',
        type: 'single_choice',
        question: 'Which international organization is primarily responsible for global health issues?',
        points: 5,
        options: ['UNESCO', 'WHO', 'UNICEF', 'WTO'],
        correctAnswer: 'WHO',
      },
      {
        id: 'LSMIX2',
        type: 'multiple_choice',
        question: 'Select all that are renewable energy sources:',
        points: 10,
        options: ['Solar power', 'Natural gas', 'Wind energy', 'Coal', 'Hydroelectric power'],
        correctAnswer: ['Solar power', 'Wind energy', 'Hydroelectric power'],
      },
      {
        id: 'LSMIX3',
        type: 'open_ended',
        question: 'Using the data in the chart provided, analyze the trend in Hong Kong\'s waste generation over the past decade. What are the implications and what solutions would you propose? (Include photos of your analysis with graphs and calculations)',
        points: 25,
        explanation: 'Students can type their analysis and upload photos of hand-drawn graphs or calculations.',
      },
      {
        id: 'LSMIX4',
        type: 'voice',
        question: 'Listen to the news clip about fake news on social media. Summarize the main points and explain why media literacy is important. (2 minutes)',
        points: 20,
      },
      {
        id: 'LSMIX5',
        type: 'single_choice',
        question: 'What does "One Country, Two Systems" refer to?',
        points: 5,
        options: [
          'Hong Kong\'s economic system',
          'The principle governing Hong Kong\'s relationship with Mainland China',
          'Hong Kong\'s education system',
          'The dual language policy'
        ],
        correctAnswer: 'The principle governing Hong Kong\'s relationship with Mainland China',
      },
      {
        id: 'LSMIX6',
        type: 'open_ended',
        question: 'Evaluate the effectiveness of Hong Kong\'s public healthcare system. Consider accessibility, quality, and sustainability.',
        points: 15,
      },
    ],
  },

  // 8. SIMPLE TEXT assignment
  {
    id: 'LS_TEXT_002',
    title: 'Newspaper Clipping Collection',
    subject: 'Liberal Studies',
    dueDate: '2025-11-05',
    status: 'unsent',
    classId: '806',
    type: 'text',
    description: 'Current Affairs Portfolio Task:\n\nCollect 5 newspaper articles (print or online) related to different LS modules:\n• Module 1: Personal Development (1 article)\n• Module 2: Hong Kong Today (2 articles)\n• Module 3: Modern China (1 article)\n• Module 4: Globalization (1 article)\n\nFor each article:\n1. Paste/print and bring to class\n2. Write a 100-word summary\n3. Note down 3 keywords\n4. Think of 2 discussion questions\n\nWe will use these articles for group discussions next week.\n\nNo online submission - bring physical copies to class!',
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
  '806': [
    { id: 'T007', name: 'Mr. Ho Chi Fai', role: 'teacher', email: 'ho.cf@school.edu.hk' },
    { id: 'S001', name: 'Chan Siu Ming', role: 'student' },
    { id: 'S003', name: 'Wong Tsz Hin', role: 'student' },
    { id: 'S004', name: 'Lam Wing Kei', role: 'student' },
    { id: 'S006', name: 'Li Ka Wai', role: 'student' },
    { id: 'S011', name: 'Fung Ching Yi', role: 'student' },
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

// ============================================
// Teacher Platform Data
// ============================================

// Teacher Resource Types
export interface TeacherResource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'pdf' | 'video' | 'ppt' | 'doc' | 'link' | 'image' | 'folder';
  uploadDate: string;
  uploadedBy: string;
  fileSize?: string;
  downloads?: number;
  tags?: string[];
  scope: 'personal' | 'group' | 'school' | 'class';
  grade?: string;
  semester?: string;
  isFavorite?: boolean;
  isAIRecommended?: boolean;
  recommendationReason?: string;
  folder?: string; // Folder path/category for organization
  itemCount?: number; // For folder type - number of items inside
}

export interface ParentNotice {
  id: string;
  title: string;
  content: string;
  recipients: string[];
  sendDate: string;
  deliveryStatus: 'sent' | 'delivered' | 'read';
  readCount: number;
  totalRecipients: number;
  type: 'assignment' | 'report' | 'activity' | 'reminder';
}

export interface TeacherCollaboration {
  id: string;
  groupName: string;
  fileName: string;
  action: 'uploaded' | 'updated' | 'deleted';
  uploadedBy: string;
  uploadDate: string;
  fileType: string;
  description?: string;
}

// Teacher Resources - Mock Data
export const mockTeacherUploads: TeacherResource[] = [
  {
    id: 'TR001',
    title: 'Unit 3 Lesson Plan - Food & Culture',
    description: 'Comprehensive lesson plan for English Unit 3 with activity designs and assessment rubrics',
    subject: 'English',
    type: 'doc',
    uploadDate: '2025-10-18',
    uploadedBy: 'You',
    fileSize: '2.4MB',
    downloads: 15,
    tags: ['lesson plan', 'unit 3', 'grade 6'],
    scope: 'personal',
    grade: 'Grade 6',
    semester: '2025 Fall',
  },
  {
    id: 'TR002',
    title: 'Quadratic Functions - Practice Worksheet',
    description: 'Self-created practice problems covering quadratic functions, vertex form, and applications',
    subject: 'Mathematics',
    type: 'pdf',
    uploadDate: '2025-10-15',
    uploadedBy: 'You',
    fileSize: '1.8MB',
    downloads: 32,
    tags: ['worksheet', 'quadratic', 'practice'],
    scope: 'personal',
    grade: 'Grade 9',
    semester: '2025 Fall',
  },
  {
    id: 'TR003',
    title: 'Chemistry Lab Safety Video',
    description: 'Instructional video on laboratory safety procedures and equipment usage',
    subject: 'Science',
    type: 'video',
    uploadDate: '2025-10-10',
    uploadedBy: 'You',
    fileSize: '45MB',
    downloads: 28,
    tags: ['lab', 'safety', 'video tutorial'],
    scope: 'class',
    grade: 'Grade 8',
  },
];

export const mockSchoolResources: TeacherResource[] = [
  // Folders for organization
  {
    id: 'FOLDER_001',
    title: 'School Policies & Guidelines',
    description: 'Official school policies, handbooks, and administrative guidelines',
    subject: 'General',
    type: 'folder',
    uploadDate: '2025-09-01',
    uploadedBy: 'Admin Office',
    scope: 'school',
    itemCount: 8,
    tags: ['policies', 'guidelines', 'official'],
  },
  {
    id: 'FOLDER_002',
    title: 'Curriculum & Assessment',
    description: 'HKDSE curriculum materials, assessment templates, and exam guidelines',
    subject: 'General',
    type: 'folder',
    uploadDate: '2025-09-01',
    uploadedBy: 'Academic Department',
    scope: 'school',
    itemCount: 15,
    tags: ['curriculum', 'assessment', 'HKDSE'],
  },
  {
    id: 'FOLDER_003',
    title: 'Subject Departments',
    description: 'Shared resources organized by subject departments',
    subject: 'General',
    type: 'folder',
    uploadDate: '2025-09-15',
    uploadedBy: 'Academic Department',
    scope: 'school',
    itemCount: 6,
    tags: ['departments', 'subjects', 'teaching'],
  },
  {
    id: 'FOLDER_004',
    title: 'Professional Development',
    description: 'Teacher training materials, workshops, and PD resources',
    subject: 'General',
    type: 'folder',
    uploadDate: '2025-08-20',
    uploadedBy: 'HR Department',
    scope: 'school',
    itemCount: 12,
    tags: ['training', 'PD', 'workshops'],
  },
  {
    id: 'FOLDER_005',
    title: 'Parent Communication',
    description: 'Templates and resources for parent-teacher communication',
    subject: 'General',
    type: 'folder',
    uploadDate: '2025-09-01',
    uploadedBy: 'Admin Office',
    scope: 'school',
    itemCount: 10,
    tags: ['parent', 'communication', 'templates'],
  },
  
  // Files inside folders
  {
    id: 'SR001',
    title: 'School Assessment Templates 2025',
    description: 'Official assessment and grading templates for all subjects',
    subject: 'General',
    type: 'doc',
    uploadDate: '2025-09-01',
    uploadedBy: 'Admin Office',
    fileSize: '3.2MB',
    downloads: 156,
    tags: ['template', 'assessment', 'official'],
    scope: 'school',
    folder: 'Curriculum & Assessment',
  },
  {
    id: 'SR002',
    title: 'HKDSE Examination Guidelines 2026',
    description: 'Updated examination guidelines and requirements for HKDSE',
    subject: 'General',
    type: 'pdf',
    uploadDate: '2025-09-15',
    uploadedBy: 'Academic Department',
    fileSize: '5.8MB',
    downloads: 234,
    tags: ['HKDSE', 'exam', 'guidelines'],
    scope: 'school',
    folder: 'Curriculum & Assessment',
  },
  {
    id: 'SR003',
    title: 'Math Department - Teaching Resources',
    description: 'Shared teaching materials and best practices from math department',
    subject: 'Mathematics',
    type: 'ppt',
    uploadDate: '2025-10-01',
    uploadedBy: 'Math Department',
    fileSize: '12.5MB',
    downloads: 67,
    tags: ['math', 'teaching', 'department'],
    scope: 'school',
    folder: 'Subject Departments',
  },
  {
    id: 'SR004',
    title: 'Student Handbook 2025-2026',
    description: 'Complete student handbook with school rules and regulations',
    subject: 'General',
    type: 'pdf',
    uploadDate: '2025-08-15',
    uploadedBy: 'Admin Office',
    fileSize: '4.5MB',
    downloads: 298,
    tags: ['handbook', 'rules', 'students'],
    scope: 'school',
    folder: 'School Policies & Guidelines',
  },
  {
    id: 'SR005',
    title: 'English Department - Resources Collection',
    description: 'Curated teaching resources for English language instruction',
    subject: 'English',
    type: 'doc',
    uploadDate: '2025-09-20',
    uploadedBy: 'English Department',
    fileSize: '8.3MB',
    downloads: 89,
    tags: ['english', 'resources', 'department'],
    scope: 'school',
    folder: 'Subject Departments',
  },
  {
    id: 'SR006',
    title: 'Classroom Management Best Practices',
    description: 'Evidence-based strategies for effective classroom management',
    subject: 'General',
    type: 'doc',
    uploadDate: '2025-08-25',
    uploadedBy: 'PD Coordinator',
    fileSize: '2.1MB',
    downloads: 145,
    tags: ['classroom', 'management', 'best practices'],
    scope: 'school',
    folder: 'Professional Development',
  },
  {
    id: 'SR007',
    title: 'Parent-Teacher Meeting Templates',
    description: 'Structured templates for conducting effective parent-teacher conferences',
    subject: 'General',
    type: 'doc',
    uploadDate: '2025-09-05',
    uploadedBy: 'Admin Office',
    fileSize: '1.8MB',
    downloads: 178,
    tags: ['parent', 'meeting', 'templates'],
    scope: 'school',
    folder: 'Parent Communication',
  },
  {
    id: 'SR008',
    title: 'Science Department - Lab Safety Protocols',
    description: 'Essential safety guidelines for science laboratory activities',
    subject: 'Science',
    type: 'pdf',
    uploadDate: '2025-09-10',
    uploadedBy: 'Science Department',
    fileSize: '3.6MB',
    downloads: 112,
    tags: ['science', 'safety', 'lab'],
    scope: 'school',
    folder: 'Subject Departments',
  },
  {
    id: 'SR009',
    title: 'Technology Integration Workshop Materials',
    description: 'Resources from the digital teaching tools workshop',
    subject: 'General',
    type: 'ppt',
    uploadDate: '2025-09-28',
    uploadedBy: 'IT Department',
    fileSize: '15.2MB',
    downloads: 56,
    tags: ['technology', 'workshop', 'digital'],
    scope: 'school',
    folder: 'Professional Development',
  },
  {
    id: 'SR010',
    title: 'School Assessment Calendar 2025-2026',
    description: 'Complete calendar of all assessments and examinations',
    subject: 'General',
    type: 'pdf',
    uploadDate: '2025-08-30',
    uploadedBy: 'Academic Department',
    fileSize: '1.2MB',
    downloads: 267,
    tags: ['calendar', 'assessment', 'schedule'],
    scope: 'school',
    folder: 'Curriculum & Assessment',
  },
];

export const mockTeacherAIResources: TeacherResource[] = [
  {
    id: 'AI001',
    title: 'Similar Lesson Plans - Food & Culture Theme',
    description: 'AI-suggested lesson plans from other teachers covering similar topics',
    subject: 'English',
    type: 'doc',
    uploadDate: '2025-10-20',
    uploadedBy: 'AI System',
    fileSize: '1.5MB',
    tags: ['AI generated', 'lesson plan', 'similar'],
    scope: 'school',
    isAIRecommended: true,
    recommendationReason: 'Based on your recent Unit 3 lesson plan',
  },
  {
    id: 'AI002',
    title: 'Differentiated Learning Materials - Quadratic Functions',
    description: 'Multi-level practice materials adapted for different student abilities',
    subject: 'Mathematics',
    type: 'pdf',
    uploadDate: '2025-10-19',
    uploadedBy: 'AI System',
    fileSize: '2.1MB',
    tags: ['AI generated', 'differentiated', 'practice'],
    scope: 'personal',
    isAIRecommended: true,
    recommendationReason: 'Matches your class performance data',
  },
];

export const mockTeacherFavorites: TeacherResource[] = [
  {
    id: 'FAV001',
    title: 'Classroom Management Strategies',
    description: 'Proven strategies for managing diverse classroom environments',
    subject: 'General',
    type: 'doc',
    uploadDate: '2025-08-20',
    uploadedBy: 'Education Consultant',
    fileSize: '1.2MB',
    downloads: 445,
    tags: ['classroom', 'management', 'best practices'],
    scope: 'school',
    isFavorite: true,
  },
];

// Parent Notices - Mock Data
export const mockParentNotices: ParentNotice[] = [
  {
    id: 'PN001',
    title: 'Unit 3 Assessment Results Available',
    content: 'Dear Parents, your child\'s Unit 3 assessment has been graded. Please review the results and feedback in the parent portal.',
    recipients: ['Class 6A Parents', 'Class 6B Parents'],
    sendDate: '2025-10-21',
    deliveryStatus: 'read',
    readCount: 42,
    totalRecipients: 45,
    type: 'report',
  },
  {
    id: 'PN002',
    title: 'Homework Reminder - Due Tomorrow',
    content: 'This is a reminder that the Quadratic Functions worksheet is due tomorrow. Students who need extra help can attend office hours.',
    recipients: ['Class 9A Parents'],
    sendDate: '2025-10-22',
    deliveryStatus: 'delivered',
    readCount: 18,
    totalRecipients: 28,
    type: 'reminder',
  },
  {
    id: 'PN003',
    title: 'Field Trip Permission Required',
    content: 'We are planning a science museum visit on November 10th. Please sign the permission form by October 30th.',
    recipients: ['Class 8A Parents', 'Class 8B Parents'],
    sendDate: '2025-10-19',
    deliveryStatus: 'sent',
    readCount: 35,
    totalRecipients: 52,
    type: 'activity',
  },
];

// Teacher Collaboration - Mock Data
export const mockTeacherCollaboration: TeacherCollaboration[] = [
  {
    id: 'TC001',
    groupName: 'Mathematics Department',
    fileName: 'Midterm_Exam_Template_2025.docx',
    action: 'uploaded',
    uploadedBy: 'Mr. Wong',
    uploadDate: '2025-10-20',
    fileType: 'doc',
    description: 'Updated midterm exam template with new formatting',
  },
  {
    id: 'TC002',
    groupName: 'Grade 6 Teachers',
    fileName: 'Student_Progress_Report_Oct.xlsx',
    action: 'updated',
    uploadedBy: 'Ms. Chan',
    uploadDate: '2025-10-19',
    fileType: 'excel',
    description: 'Added latest test scores and attendance data',
  },
  {
    id: 'TC003',
    groupName: 'Science Department',
    fileName: 'Lab_Safety_Guidelines_v3.pdf',
    action: 'uploaded',
    uploadedBy: 'Dr. Leung',
    uploadDate: '2025-10-18',
    fileType: 'pdf',
    description: 'Updated safety protocols for chemistry lab',
  },
];

