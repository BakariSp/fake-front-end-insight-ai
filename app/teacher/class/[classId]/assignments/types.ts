// 教师端班级作业类型定义

export type AssignmentStatus = 'draft' | 'published' | 'graded';
export type QuestionType = 'choice' | 'fill-blank' | 'essay';

// 作业基本信息
export interface ClassAssignment {
  id: string;
  title: string;
  subject: string;
  classId: string;
  className: string;
  description: string;
  dueDate: string;
  publishDate?: string;
  totalPoints: number;
  status: AssignmentStatus;
  questions: Question[];
  
  // 统计信息
  stats: AssignmentStats;
}

// 作业统计
export interface AssignmentStats {
  totalStudents: number;
  submitted: number;
  notSubmitted: number;
  graded: number;
  avgScore?: number;
  maxScore?: number;
  minScore?: number;
}

// 题目
export interface Question {
  id: string;
  type: QuestionType;
  order: number;
  content: string;
  points: number;
  
  // 选择题特有
  options?: string[];
  correctAnswer?: number | number[];
  
  // 填空题特有
  blanks?: FillBlank[];
  
  // 问答题特有
  rubric?: string;
  keywords?: string[];
}

// 填空题空格
export interface FillBlank {
  id: string;
  index: number;
  correctAnswers: string[];
  points: number;
}

// 学生提交
export interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  assignmentId: string;
  submitTime?: string;
  status: 'not_submitted' | 'submitted' | 'graded';
  answers: StudentAnswer[];
  totalScore?: number;
  aiScore?: number;
  teacherScore?: number;
  feedback?: string;
}

// 学生答案
export interface StudentAnswer {
  questionId: string;
  answer: string | number | number[] | FillBlankAnswer[];
  aiScore?: number;
  teacherScore?: number;
  aiComment?: string;
  teacherComment?: string;
  isCorrect?: boolean;
}

// 填空题答案
export interface FillBlankAnswer {
  blankId: string;
  answer: string;
  isCorrect?: boolean;
}

// 班级成绩分析
export interface ClassAnalytics {
  assignmentId: string;
  classId: string;
  
  // 整体分数分布
  scoreDistribution: ScoreRange[];
  
  // 题目难度分析
  questionDifficulty: QuestionDifficultyAnalysis[];
  
  // 薄弱知识点
  weakPoints: WeakPoint[];
  
  // 优秀表现
  strengths: string[];
  
  // 成绩趋势
  scoreTrend?: {
    labels: string[];
    data: number[];
  };
}

// 分数区间
export interface ScoreRange {
  range: string;
  count: number;
  percentage: number;
}

// 题目难度分析
export interface QuestionDifficultyAnalysis {
  questionId: string;
  questionTitle: string;
  correctRate: number;
  avgScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  commonMistakes?: string[];
}

// 薄弱点
export interface WeakPoint {
  id: string;
  topic: string;
  description: string;
  affectedStudents: number;
  percentage: number;
  relatedQuestions: string[];
  suggestions: string[];
}

// 审阅进度
export interface ReviewProgress {
  assignmentId: string;
  totalSubmissions: number;
  reviewed: number;
  pending: number;
  currentIndex: number;
}

