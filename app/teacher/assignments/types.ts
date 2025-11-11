// Assignment Builder 数据模型和类型定义

export type Subject = 'chinese' | 'english' | 'math' | 'physics' | 'chem' | 'bio' | 'ls' | 'other';
export type TaskType = 'quiz' | 'essay' | 'fill-blank' | 'scan' | 'audio' | 'video' | 'file' | 'group';
export type SubmissionMethod = 'typein' | 'handwriting' | 'image' | 'audio' | 'video' | 'file';
export type GradingMode = 'auto' | 'assist' | 'manual';
export type AssignmentState = 'draft' | 'published' | 'archived';
export type OCRStatus = 'idle' | 'queued' | 'processing' | 'done' | 'error';
export type LatePolicy = 'none' | 'penalty_10' | 'penalty_20';
export type AudienceType = 'class' | 'group' | 'students';

// 作业包
export interface AssignmentPackage {
  id: string;
  title: string;
  subject: Subject;
  topics: string[];
  classIds: string[];          // 分发时再填
  dueAt: string;               // ISO
  totalPoints: number;
  taskIds: string[];
  state: AssignmentState;
  ocrStatus?: OCRStatus;
  createdAt: string;
  updatedAt: string;
  version?: number;
  // 全局设置
  gradingMode: GradingMode;    // 全局批改模式
  rubricId?: string;           // 全局评分模板
  allowLateSubmission?: boolean;  // 是否允许迟交
  latePolicy?: LatePolicy;     // 迟交策略
}

// 任务
export interface Task {
  id: string;
  type: TaskType;
  title: string;
  instructions?: string;       // rich text
  points: number;
  topics?: string[];
  submissionMethods: SubmissionMethod[];     // 多选
  submissionConfig?: {
    maxFiles?: number;
    maxDurationSec?: number;
    maxLength?: number;
    accept?: string[];
  };
  // 保留以支持个别任务的特殊配置（可选，优先级高于全局设置）
  gradingMode?: GradingMode;   // 如果不设置，使用全局的
  rubricId?: string;           // 语/数/英模板库
  rubricWeights?: Record<string, number>; // 维度权重
  allowResubmit?: boolean;
  resubmitLimit?: number;
  audience?: {
    type: AudienceType;
    ids?: string[];
  };
  meta?: {
    detectedType?: TaskType;
    confidence?: number;
    conflict?: boolean;
  };
  order?: number;  // 用于排序
  
  // 特定类型的配置
  quizConfig?: QuizConfig;     // 选择题配置
  fillBlankConfig?: FillBlankConfig;  // 填空题配置
  essayConfig?: EssayConfig;   // 写作题配置
  subQuestions?: SubQuestion[]; // 子问题列表（用于essay等题型）
}

// Quiz 子结构（用于 quiz 题内编辑）
export interface QuizItem {
  id: string;
  stem: string;
  options: string[];
  correct?: number[];   // 支持单/多选
  score: number;
}

// 选择题配置
export interface QuizConfig {
  type: 'single' | 'multiple' | 'true-false';  // 单选、多选、判断
  options: QuizOption[];
  correctAnswer?: number[];  // 正确答案的索引
  explanation?: string;      // 答案解析
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// 填空题配置
export interface FillBlankConfig {
  content: string;           // 题目内容，用 {{}} 标记空格
  blanks: FillBlank[];       // 空格列表
  caseSensitive?: boolean;   // 是否区分大小写
}

export interface FillBlank {
  id: string;
  index: number;
  answers: string[];         // 可接受的答案（支持多个正确答案）
  points: number;            // 该空分值
}

// 写作题配置
export interface EssayConfig {
  answerType: 'short' | 'long';  // 短答案或长答案
  minLength?: number;            // 最小字数
  maxLength?: number;            // 最大字数
  placeholder?: string;          // 提示文字
}

// 子题目
export interface SubQuestion {
  id: string;
  order: number;
  title: string;
  points: number;
  type: 'quiz' | 'fill-blank' | 'essay';
  quizConfig?: QuizConfig;
  fillBlankConfig?: FillBlankConfig;
}

// 任务库项目
export interface LibraryItem {
  type: TaskType;
  icon: string;
  label: string;
  description: string;
  color: string;
}

// 科目选项
export interface SubjectOption {
  value: Subject;
  label: string;
  icon?: string;
}

// Rubric 模板
export interface RubricTemplate {
  id: string;
  name: string;
  subject: Subject;
  dimensions: {
    name: string;
    weight: number;
    description: string;
  }[];
}

// 导入状态
export interface ImportStatus {
  id: string;
  status: OCRStatus;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  lowConfidenceCount: number;
  conflictCount: number;
  errors?: string[];
}

// 冲突类型
export type ConflictType = 'low_confidence' | 'type_mismatch' | 'submission_mismatch' | 'missing_answer';

// 冲突项
export interface ConflictItem {
  taskId: string;
  type: ConflictType;
  message: string;
  suggestedFix?: Partial<Task>;
}

