// 作业状态辅助工具 - 四状态模型

import { AssignmentStatus } from './types';

/**
 * 获取状态的显示配置
 */
export function getStatusConfig(status: AssignmentStatus): {
  label: string;
  color: string;
  bgColor: string;
  description: string;
} {
  switch (status) {
    case 'draft':
      return {
        label: '草稿',
        color: '#FF9800',
        bgColor: '#FFF3E0',
        description: '作业尚未发布，可以继续编辑'
      };
    case 'published':
      return {
        label: '收集中',
        color: '#4F7FFF',
        bgColor: '#E3F2FD',
        description: '作业已发布，正在收集学生提交'
      };
    case 'grading':
      return {
        label: '批改中',
        color: '#722ED1',
        bgColor: '#F9F0FF',
        description: 'AI正在批改或教师批改中'
      };
    case 'graded':
      return {
        label: '已完成',
        color: '#52C41A',
        bgColor: '#F6FFED',
        description: '所有作业已批改完成'
      };
    default:
      return {
        label: status,
        color: '#8C8C8C',
        bgColor: '#F5F5F5',
        description: ''
      };
  }
}

/**
 * 判断是否可以编辑作业
 */
export function canEditAssignment(status: AssignmentStatus): boolean {
  return status === 'draft';
}

/**
 * 判断是否可以查看分析报告
 */
export function canViewAnalytics(status: AssignmentStatus): boolean {
  return status === 'graded';
}

/**
 * 判断是否可以开始批改
 */
export function canStartGrading(status: AssignmentStatus, hasSubmissions: boolean): boolean {
  return status === 'published' && hasSubmissions;
}

/**
 * 获取状态提示信息
 */
export function getStatusMessage(status: AssignmentStatus, stats?: {
  submitted: number;
  totalStudents: number;
  graded: number;
  avgScore?: number;
  maxScore?: number;
  minScore?: number;
}): {
  title: string;
  description: string;
  icon: string;
} {
  switch (status) {
    case 'draft':
      return {
        title: '作业预览',
        description: '作业尚未发布，暂无学生数据。点击"编辑"可修改作业内容。',
        icon: '📝'
      };
    
    case 'published':
      if (!stats || stats.submitted === 0) {
        return {
          title: '等待提交',
          description: '作业已发布，等待学生提交作业。',
          icon: '⏳'
        };
      } else {
        const rate = ((stats.submitted / stats.totalStudents) * 100).toFixed(0);
        return {
          title: '收集中',
          description: `已有 ${stats.submitted}/${stats.totalStudents} 名学生提交 (${rate}%)`,
          icon: '📊'
        };
      }
    
    case 'grading':
      if (!stats) {
        return {
          title: '批改中',
          description: 'AI正在批改学生作业...',
          icon: '🤖'
        };
      }
      const progress = ((stats.graded / stats.submitted) * 100).toFixed(0);
      return {
        title: '批改中',
        description: `批改进度: ${stats.graded}/${stats.submitted} (${progress}%)`,
        icon: '🤖'
      };
    
    case 'graded':
      if (!stats) {
        return {
          title: '批改完成',
          description: '所有作业已批改完成',
          icon: '✅'
        };
      }
      return {
        title: '批改完成',
        description: `平均分: ${stats.avgScore?.toFixed(1) || '-'} | 最高分: ${stats.maxScore || '-'} | 最低分: ${stats.minScore || '-'}`,
        icon: '✅'
      };
    
    default:
      return {
        title: '',
        description: '',
        icon: ''
      };
  }
}

/**
 * 判断是否显示AI分析占位符
 */
export function shouldShowAnalyticsPlaceholder(status: AssignmentStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * 获取AI分析占位符文案
 */
export function getAnalyticsPlaceholder(status: AssignmentStatus, submittedCount: number = 0, totalStudents: number = 0): {
  show: boolean;
  title: string;
  message: string;
  icon: string;
} {
  switch (status) {
    case 'draft':
      return {
        show: true,
        title: '暂无数据',
        message: '作业发布后，AI将自动分析学生表现',
        icon: '📝'
      };
    
    case 'published':
      if (submittedCount === 0) {
        return {
          show: true,
          title: '等待数据',
          message: '学生提交作业后，将显示统计信息',
          icon: '⏳'
        };
      } else {
        return {
          show: true,
          title: '数据收集中',
          message: `已收集 ${submittedCount}/${totalStudents} 份作业，批改完成后将生成完整分析报告`,
          icon: '📊'
        };
      }
    
    case 'grading':
      return {
        show: true,
        title: '正在分析',
        message: 'AI正在批改作业，分析报告将在批改完成后生成',
        icon: '🤖'
      };
    
    case 'graded':
      return {
        show: false,
        title: '',
        message: '',
        icon: ''
      };
    
    default:
      return {
        show: true,
        title: '',
        message: '',
        icon: ''
      };
  }
}

