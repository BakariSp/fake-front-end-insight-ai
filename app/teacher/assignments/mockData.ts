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

// 科目选项
export const SUBJECTS: SubjectOption[] = [
  { value: 'chinese', label: '语文' },
  { value: 'english', label: '英语' },
  { value: 'math', label: '数学' },
  { value: 'physics', label: '物理' },
  { value: 'chem', label: '化学' },
  { value: 'bio', label: '生物' },
  { value: 'ls', label: '生命科学' },
  { value: 'other', label: '其他' },
];

// 任务库项目
export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    type: 'quiz',
    icon: '📝',
    label: '选择题',
    description: '单选、多选、判断题',
    color: '#4F7FFF'
  },
  {
    type: 'fill-blank',
    icon: '✏️',
    label: '填空题',
    description: '单空、多空填空',
    color: '#8B5CF6'
  },
  {
    type: 'essay',
    icon: '✍️',
    label: '写作题',
    description: '简答、段落、作文',
    color: '#9B59B6'
  },
  {
    type: 'scan',
    icon: '📷',
    label: '扫描上传',
    description: '手写作业拍照上传',
    color: '#14B8A6'
  },
  {
    type: 'audio',
    icon: '🎤',
    label: '音频录制',
    description: '口语、朗读、发音',
    color: '#F97316'
  },
  {
    type: 'video',
    icon: '🎥',
    label: '视频录制',
    description: '演示、讲解、实验',
    color: '#EC4899'
  },
  {
    type: 'file',
    icon: '📎',
    label: '文件上传',
    description: '文档、代码、作品',
    color: '#6B7280'
  }
];

// 主题标签（示例）
export const TOPIC_TAGS: Record<Subject, string[]> = {
  chinese: ['古诗词', '现代文阅读', '作文', '文言文', '语法'],
  english: ['Vocabulary', 'Grammar', 'Reading', 'Writing', 'Listening'],
  math: ['代数', '几何', '函数', '概率统计', '微积分'],
  physics: ['力学', '电磁学', '光学', '热学', '近代物理'],
  chem: ['无机化学', '有机化学', '物理化学', '分析化学'],
  bio: ['细胞生物学', '遗传学', '生态学', '进化论'],
  ls: ['生命系统', '健康', '环境'],
  other: ['综合', '项目', '实验']
};

// Rubric 模板
export const RUBRIC_TEMPLATES: RubricTemplate[] = [
  {
    id: 'rubric-chinese-essay',
    name: '语文作文评分标准',
    subject: 'chinese',
    dimensions: [
      { name: '内容与主题', weight: 0.3, description: '主题鲜明，内容充实' },
      { name: '结构与逻辑', weight: 0.2, description: '结构清晰，逻辑严密' },
      { name: '语言表达', weight: 0.3, description: '语言流畅，用词准确' },
      { name: '创新与亮点', weight: 0.2, description: '有独特见解或创新' }
    ]
  },
  {
    id: 'rubric-english-writing',
    name: 'English Writing Rubric',
    subject: 'english',
    dimensions: [
      { name: 'Content', weight: 0.25, description: 'Relevant ideas and details' },
      { name: 'Organization', weight: 0.25, description: 'Clear structure and flow' },
      { name: 'Language Use', weight: 0.25, description: 'Grammar and vocabulary' },
      { name: 'Mechanics', weight: 0.25, description: 'Spelling and punctuation' }
    ]
  },
  {
    id: 'rubric-math-problem',
    name: '数学解题评分标准',
    subject: 'math',
    dimensions: [
      { name: '问题理解', weight: 0.2, description: '正确理解题意' },
      { name: '解题思路', weight: 0.3, description: '思路清晰，方法恰当' },
      { name: '计算准确性', weight: 0.3, description: '计算过程准确' },
      { name: '答案完整性', weight: 0.2, description: '答案完整，有单位' }
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

// 示例作业包
export const MOCK_ASSIGNMENT: AssignmentPackage = {
  id: 'assignment-001',
  title: '第一单元综合练习',
  subject: 'math',
  topics: ['代数', '函数'],
  classIds: ['class-001', 'class-002'],
  dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  totalPoints: 100,
  taskIds: ['task-001', 'task-002', 'task-003'],
  state: 'draft',
  gradingMode: 'assist',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

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

