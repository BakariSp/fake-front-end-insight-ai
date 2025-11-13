// 作业状态辅助工具 - 简化的四状态模型
import { AssignmentPackage, AssignmentState, AssignmentStats } from './types';

/**
 * 计算作业的统计信息
 * @param submittedCount 已提交学生数
 * @param totalStudents 总学生数
 * @param gradedCount 已批改数
 */
export function calculateAssignmentStats(
  submittedCount: number = 0,
  totalStudents: number = 0,
  gradedCount: number = 0,
  avgScore?: number,
  maxScore?: number,
  minScore?: number
): AssignmentStats {
  const submissionRate = totalStudents > 0 ? (submittedCount / totalStudents) * 100 : 0;
  const gradingProgress = submittedCount > 0 ? (gradedCount / submittedCount) * 100 : 0;
  
  return {
    totalStudents,
    submittedCount,
    gradedCount,
    submissionRate,
    gradingProgress,
    avgScore,
    maxScore,
    minScore
  };
}

/**
 * 获取状态的显示标签和颜色
 */
export function getStatusConfig(state: AssignmentState): {
  label: string;
  color: string;
  bgColor: string;
  description: string;
} {
  switch (state) {
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
        label: state,
        color: '#8C8C8C',
        bgColor: '#F5F5F5',
        description: ''
      };
  }
}

/**
 * 判断是否可以编辑作业
 */
export function canEditAssignment(state: AssignmentState): boolean {
  return state === 'draft';
}

/**
 * 判断是否可以查看分析报告
 */
export function canViewAnalytics(state: AssignmentState): boolean {
  return state === 'graded';
}

/**
 * 判断是否可以开始批改
 */
export function canStartGrading(state: AssignmentState, stats?: AssignmentStats): boolean {
  return state === 'published' && (stats?.submittedCount || 0) > 0;
}

/**
 * 获取Review页面应该显示的内容类型
 */
export type ReviewPageMode = 'draft' | 'published' | 'grading' | 'graded';

export function getReviewPageMode(state: AssignmentState): ReviewPageMode {
  return state as ReviewPageMode;
}

/**
 * 获取状态提示信息
 */
export function getStatusMessage(state: AssignmentState, stats?: AssignmentStats): {
  title: string;
  description: string;
  icon: string;
} {
  switch (state) {
    case 'draft':
      return {
        title: '作业预览',
        description: '作业尚未发布，暂无学生数据。点击"编辑"可修改作业内容。',
        icon: '📝'
      };
    
    case 'published':
      if (!stats || stats.submittedCount === 0) {
        return {
          title: '等待提交',
          description: '作业已发布，等待学生提交作业。',
          icon: '⏳'
        };
      } else {
        return {
          title: '收集中',
          description: `已有 ${stats.submittedCount}/${stats.totalStudents} 名学生提交 (${stats.submissionRate.toFixed(0)}%)`,
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
      return {
        title: '批改中',
        description: `批改进度: ${stats.gradedCount}/${stats.submittedCount} (${stats.gradingProgress.toFixed(0)}%)`,
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
export function shouldShowAnalyticsPlaceholder(state: AssignmentState): boolean {
  return state === 'draft' || state === 'published';
}

