// Mock 数据

import {
  Subject,
  TaskType,
  LibraryItem,
  SubjectOption,
  RubricTemplate,
  Task,
  AssignmentPackage
} from './types';

// 科目選項
export const SUBJECTS: SubjectOption[] = [
  { value: 'chinese', label: '中文' },
  { value: 'english', label: '英文' },
  { value: 'math', label: '數學' },
  { value: 'physics', label: '物理' },
  { value: 'chem', label: '化學' },
  { value: 'bio', label: '生物' },
  { value: 'ls', label: '生命科學' },
  { value: 'other', label: '其他' },
];

// 任務庫項目
export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    type: 'quiz',
    icon: '',
    label: '選擇題',
    description: '單選、多選、判斷題',
    color: '#4F7FFF'
  },
  {
    type: 'fill-blank',
    icon: '',
    label: '填空題',
    description: '單空、多空填空',
    color: '#6B8AFF'
  },
  {
    type: 'essay',
    icon: '',
    label: '寫作題',
    description: '簡答、段落、作文',
    color: '#3D6FE8'
  },
  {
    type: 'scan',
    icon: '',
    label: '掃描上傳',
    description: '手寫作業拍照上傳',
    color: '#5A7DFF'
  },
  {
    type: 'audio',
    icon: '',
    label: '錄音',
    description: '口語、朗讀、發音',
    color: '#7A9BFF'
  },
  {
    type: 'video',
    icon: '',
    label: '錄影',
    description: '示範、講解、實驗',
    color: '#2E5FDB'
  },
  {
    type: 'file',
    icon: '',
    label: '檔案上傳',
    description: '文檔、代碼、作品',
    color: '#6B7280'
  }
];

// 主題標籤（示例）
export const TOPIC_TAGS: Record<Subject, string[]> = {
  chinese: ['古詩詞', '現代文閱讀', '作文', '文言文', '語法'],
  english: ['Vocabulary', 'Grammar', 'Reading', 'Writing', 'Listening'],
  math: ['代數', '幾何', '函數', '概率統計', '微積分'],
  physics: ['力學', '電磁學', '光學', '熱學', '近代物理'],
  chem: ['無機化學', '有機化學', '物理化學', '分析化學'],
  bio: ['細胞生物學', '遺傳學', '生態學', '進化論'],
  ls: ['生命系統', '健康', '環境'],
  other: ['綜合', '項目', '實驗']
};

// Rubric 模板
export const RUBRIC_TEMPLATES: RubricTemplate[] = [
  {
    id: 'rubric-chinese-essay',
    name: '中文作文評分標準',
    subject: 'chinese',
    dimensions: [
      { 
        id: 'dim-1', 
        name: '內容與主題', 
        weight: 0.3, 
        description: '主題鮮明，內容充實',
        prompt: '評估文章主題是否明確，內容是否豐富、具體、有深度，是否緊扣主題展開論述。'
      },
      { 
        id: 'dim-2', 
        name: '結構與邏輯', 
        weight: 0.2, 
        description: '結構清晰，邏輯嚴密',
        prompt: '檢查文章結構是否完整（開頭、正文、結尾），段落之間的銜接是否自然，論述邏輯是否清晰。'
      },
      { 
        id: 'dim-3', 
        name: '語言表達', 
        weight: 0.3, 
        description: '語言流暢，用詞準確',
        prompt: '評價語言是否通順流暢，用詞是否準確恰當，句式是否多樣，有無錯別字和語法錯誤。'
      },
      { 
        id: 'dim-4', 
        name: '創新與亮點', 
        weight: 0.2, 
        description: '有獨特見解或創新',
        prompt: '尋找文章中的亮點，如獨特的觀點、新穎的角度、精彩的表達、恰當的修辭手法等。'
      }
    ]
  },
  {
    id: 'rubric-english-writing',
    name: 'English Writing Rubric',
    subject: 'english',
    dimensions: [
      { 
        id: 'dim-5', 
        name: 'Content', 
        weight: 0.25, 
        description: 'Relevant ideas and details',
        prompt: 'Assess if the content is relevant, well-developed with supporting details, and demonstrates understanding of the topic.'
      },
      { 
        id: 'dim-6', 
        name: 'Organization', 
        weight: 0.25, 
        description: 'Clear structure and flow',
        prompt: 'Evaluate the logical flow of ideas, paragraph structure, transitions between paragraphs, and overall coherence.'
      },
      { 
        id: 'dim-7', 
        name: 'Language Use', 
        weight: 0.25, 
        description: 'Grammar and vocabulary',
        prompt: 'Check grammar accuracy, sentence variety, vocabulary range and appropriateness, and word choice.'
      },
      { 
        id: 'dim-8', 
        name: 'Mechanics', 
        weight: 0.25, 
        description: 'Spelling and punctuation',
        prompt: 'Review spelling accuracy, punctuation usage, capitalization, and formatting conventions.'
      }
    ]
  },
  {
    id: 'rubric-math-problem',
    name: '數學解題評分標準',
    subject: 'math',
    dimensions: [
      { 
        id: 'dim-9', 
        name: '問題理解', 
        weight: 0.2, 
        description: '正確理解題意',
        prompt: '檢查學生是否正確理解題目要求，是否明確已知條件和求解目標。'
      },
      { 
        id: 'dim-10', 
        name: '解題思路', 
        weight: 0.3, 
        description: '思路清晰，方法恰當',
        prompt: '評估解題思路是否清晰合理，方法選擇是否恰當，步驟是否完整有邏輯。'
      },
      { 
        id: 'dim-11', 
        name: '計算準確性', 
        weight: 0.3, 
        description: '計算過程準確',
        prompt: '檢查計算過程是否準確無誤，公式運用是否正確，有無計算錯誤。'
      },
      { 
        id: 'dim-12', 
        name: '答案完整性', 
        weight: 0.2, 
        description: '答案完整，有單位',
        prompt: '確認最終答案是否完整，是否標註單位，表達是否規範。'
      }
    ]
  }
];

// 默认任务配置
export const DEFAULT_TASK_CONFIG: Record<TaskType, Partial<Task>> = {
  quiz: {
    points: 10,
    submissionMethods: [],  // 选择题不需要提交方式，直接选择选项即可
    gradingMode: 'auto',
    allowResubmit: false,
    quizConfig: {
      type: 'single',
      options: [
        { id: 'opt-1', text: '选项A', isCorrect: false },
        { id: 'opt-2', text: '选项B', isCorrect: false },
        { id: 'opt-3', text: '选项C', isCorrect: false },
        { id: 'opt-4', text: '选项D', isCorrect: false }
      ],
      correctAnswer: []
    }
  },
  'fill-blank': {
    points: 10,
    submissionMethods: ['typein'],  // 填空题用文字输入，简短答案更方便
    gradingMode: 'auto',
    allowResubmit: false,
    fillBlankConfig: {
      content: '',
      blanks: [],
      caseSensitive: false
    }
  },
  essay: {
    points: 20,
    submissionMethods: ['handwriting', 'image'],  // 问答题手写为主，可拍照上传
    gradingMode: 'assist',
    allowResubmit: true,
    resubmitLimit: 2,
    essayConfig: {
      answerType: 'long',
      minLength: 100,
      maxLength: 1000,
      placeholder: '请在此输入答案...'
    }
  },
  scan: {
    points: 15,
    submissionMethods: ['image'],
    gradingMode: 'assist',
    submissionConfig: { maxFiles: 5, accept: ['image/jpeg', 'image/png'] },
    allowResubmit: true
  },
  audio: {
    points: 15,
    submissionMethods: ['audio'],
    gradingMode: 'assist',
    submissionConfig: { maxDurationSec: 300 },
    allowResubmit: true,
    resubmitLimit: 3
  },
  video: {
    points: 20,
    submissionMethods: ['video'],
    gradingMode: 'manual',
    submissionConfig: { maxDurationSec: 600, maxFiles: 1 },
    allowResubmit: false
  },
  file: {
    points: 15,
    submissionMethods: ['file'],
    gradingMode: 'manual',
    submissionConfig: { maxFiles: 3 },
    allowResubmit: true
  },
  group: {
    points: 30,
    submissionMethods: ['typein', 'file'],
    gradingMode: 'manual',
    allowResubmit: false
  }
};

// ===== 四个状态的示例作业包 =====

// 1. Draft - 草稿状态
export const MOCK_ASSIGNMENT_DRAFT: AssignmentPackage = {
  id: 'assignment-draft-001',
  title: '第三单元测试 - 三角函数',
  subject: 'math',
  topics: ['三角函数', '恒等变换'],
  classIds: [],  // 还未分配班级
  dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  totalPoints: 100,
  taskIds: ['task-001', 'task-002', 'task-003'],
  state: 'draft',
  gradingMode: 'assist',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

// 2. Published - 已发布，收集中
export const MOCK_ASSIGNMENT_PUBLISHED: AssignmentPackage = {
  id: 'assignment-published-001',
  title: '第一单元综合练习 - 集合与函数',
  subject: 'math',
  topics: ['集合', '函数'],
  classIds: ['class-001'],
  dueAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  totalPoints: 100,
  taskIds: ['task-011', 'task-012', 'task-013'],
  state: 'published',
  publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    totalStudents: 45,
    submittedCount: 28,
    gradedCount: 0,
    submissionRate: 62.2,
    gradingProgress: 0
  },
  gradingMode: 'assist',
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

// 3. Grading - 批改中
export const MOCK_ASSIGNMENT_GRADING: AssignmentPackage = {
  id: 'assignment-grading-001',
  title: '期中复习 - 数列与不等式',
  subject: 'math',
  topics: ['数列', '不等式'],
  classIds: ['class-001', 'class-002'],
  dueAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  totalPoints: 120,
  taskIds: ['task-021', 'task-022', 'task-023', 'task-024'],
  state: 'grading',
  publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    totalStudents: 45,
    submittedCount: 43,
    gradedCount: 28,
    submissionRate: 95.6,
    gradingProgress: 65.1
  },
  gradingMode: 'assist',
  createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

// 4. Graded - 已批改完成
export const MOCK_ASSIGNMENT_GRADED: AssignmentPackage = {
  id: 'assignment-graded-001',
  title: '第二单元测试 - 平面向量',
  subject: 'math',
  topics: ['平面向量', '向量运算'],
  classIds: ['class-001'],
  dueAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  totalPoints: 100,
  taskIds: ['task-031', 'task-032', 'task-033'],
  state: 'graded',
  publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  gradedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    totalStudents: 45,
    submittedCount: 43,
    gradedCount: 43,
    submissionRate: 95.6,
    gradingProgress: 100,
    avgScore: 78.5,
    maxScore: 94,
    minScore: 52
  },
  gradingMode: 'assist',
  createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

// 所有示例作业的数组
export const MOCK_ASSIGNMENTS: AssignmentPackage[] = [
  MOCK_ASSIGNMENT_DRAFT,
  MOCK_ASSIGNMENT_PUBLISHED,
  MOCK_ASSIGNMENT_GRADING,
  MOCK_ASSIGNMENT_GRADED
];

// 示例任务
export const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    type: 'quiz',
    title: '选择题：函数的定义域',
    instructions: '请选择正确答案',
    points: 10,
    topics: ['函数'],
    submissionMethods: ['typein'],
    gradingMode: 'auto',
    allowResubmit: false,
    order: 1
  },
  {
    id: 'task-002',
    type: 'essay',
    title: '简答题：解释函数单调性',
    instructions: '请用自己的话解释什么是函数的单调性，并举例说明',
    points: 20,
    topics: ['函数'],
    submissionMethods: ['typein', 'handwriting'],
    gradingMode: 'assist',
    rubricId: 'rubric-math-problem',
    allowResubmit: true,
    resubmitLimit: 2,
    order: 2
  },
  {
    id: 'task-003',
    type: 'scan',
    title: '解答题：函数综合应用',
    instructions: '请在作业本上完成以下题目，拍照上传',
    points: 30,
    topics: ['代数', '函数'],
    submissionMethods: ['image'],
    gradingMode: 'assist',
    submissionConfig: {
      maxFiles: 3,
      accept: ['image/jpeg', 'image/png']
    },
    allowResubmit: true,
    order: 3
  }
];

// 资源库Mock数据
export const RESOURCE_LIBRARY_ITEMS = {
  quiz: [
    {
      id: 'res-quiz-001',
      title: '一元二次方程的解法',
      subject: 'math',
      topics: ['代数', '方程'],
      points: 10,
      type: 'quiz' as TaskType,
      quizConfig: {
        type: 'single' as const,
        options: [
          { id: 'opt-1', text: 'x = 1, x = 2', isCorrect: true },
          { id: 'opt-2', text: 'x = -1, x = -2', isCorrect: false },
          { id: 'opt-3', text: 'x = 0, x = 3', isCorrect: false },
          { id: 'opt-4', text: '无实数解', isCorrect: false }
        ],
        correctAnswer: [0],
        explanation: '通过配方法或求根公式可得'
      },
      instructions: '方程 x² - 3x + 2 = 0 的解是：',
      usageCount: 156
    },
    {
      id: 'res-quiz-002',
      title: '函数的单调性判断',
      subject: 'math',
      topics: ['函数'],
      points: 10,
      type: 'quiz' as TaskType,
      quizConfig: {
        type: 'multiple' as const,
        options: [
          { id: 'opt-1', text: 'f(x) = x² 在 R 上单调递增', isCorrect: false },
          { id: 'opt-2', text: 'f(x) = x³ 在 R 上单调递增', isCorrect: true },
          { id: 'opt-3', text: 'f(x) = 1/x 在 R 上单调递减', isCorrect: false },
          { id: 'opt-4', text: 'f(x) = 2x 在 R 上单调递增', isCorrect: true }
        ],
        correctAnswer: [1, 3]
      },
      instructions: '下列函数中，在其定义域上单调递增的是（可多选）：',
      usageCount: 89
    },
    {
      id: 'res-quiz-003',
      title: '集合的运算',
      subject: 'math',
      topics: ['集合'],
      points: 8,
      type: 'quiz' as TaskType,
      quizConfig: {
        type: 'true-false' as const,
        options: [
          { id: 'opt-1', text: '正确', isCorrect: true },
          { id: 'opt-2', text: '错误', isCorrect: false }
        ],
        correctAnswer: [0],
        explanation: '并集包含两个集合的所有元素'
      },
      instructions: '若 A = {1, 2}，B = {2, 3}，则 A ∪ B = {1, 2, 3}',
      usageCount: 201
    }
  ],
  'fill-blank': [
    {
      id: 'res-fill-001',
      title: '勾股定理填空',
      subject: 'math',
      topics: ['几何'],
      points: 10,
      type: 'fill-blank' as TaskType,
      fillBlankConfig: {
        content: '在直角三角形中，两条直角边分别为 3 和 4，则斜边长为 {{1}}。',
        blanks: [
          { id: 'blank-1', index: 1, answers: ['5', '五'], points: 10 }
        ],
        caseSensitive: false
      },
      instructions: '请根据勾股定理计算',
      usageCount: 234
    },
    {
      id: 'res-fill-002',
      title: '二次函数顶点坐标',
      subject: 'math',
      topics: ['函数'],
      points: 12,
      type: 'fill-blank' as TaskType,
      fillBlankConfig: {
        content: '二次函数 y = (x - 2)² + 3 的顶点坐标是 ({{1}}, {{2}})。',
        blanks: [
          { id: 'blank-1', index: 1, answers: ['2'], points: 6 },
          { id: 'blank-2', index: 2, answers: ['3'], points: 6 }
        ],
        caseSensitive: false
      },
      instructions: '填写顶点的横坐标和纵坐标',
      usageCount: 178
    }
  ],
  essay: [
    {
      id: 'res-essay-001',
      title: '函数概念理解',
      subject: 'math',
      topics: ['函数'],
      points: 15,
      type: 'essay' as TaskType,
      instructions: '请用自己的话解释什么是函数的定义域和值域，并举例说明。',
      usageCount: 67
    },
    {
      id: 'res-essay-002',
      title: '数学归纳法证明',
      subject: 'math',
      topics: ['数学证明'],
      points: 20,
      type: 'essay' as TaskType,
      instructions: '用数学归纳法证明：1 + 2 + 3 + ... + n = n(n+1)/2',
      usageCount: 45
    }
  ]
};

// 生成唯一ID
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 创建默认任务
export function createDefaultTask(type: TaskType, order: number = 0): Task {
  const config = DEFAULT_TASK_CONFIG[type];
  const libraryItem = LIBRARY_ITEMS.find(item => item.type === type);
  
  return {
    id: generateId('task'),
    type,
    title: libraryItem?.label || '新任务',
    instructions: '',
    points: config.points || 10,
    submissionMethods: config.submissionMethods || ['typein'],
    // gradingMode 不再设置默认值，使用全局设置
    allowResubmit: config.allowResubmit,
    resubmitLimit: config.resubmitLimit,
    submissionConfig: config.submissionConfig,
    quizConfig: config.quizConfig,
    fillBlankConfig: config.fillBlankConfig,
    order
  };
}

// 创建空白作业包
export function createEmptyAssignment(): AssignmentPackage {
  return {
    id: generateId('assignment'),
    title: '',
    subject: 'other',
    topics: [],
    classIds: [],
    dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalPoints: 0,
    taskIds: [],
    state: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    // 全局设置
    gradingMode: 'assist',  // 默认使用AI辅助批改
    allowLateSubmission: true,
    latePolicy: 'penalty_10'
  };
}

