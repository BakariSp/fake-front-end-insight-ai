'use client';

import { useState } from 'react';
import { Task, ConflictType } from '../types';
import styles from './ConflictDrawer.module.css';

interface ConflictDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onResolveConflicts: (tasks: Task[]) => void;
}

interface ConflictItem {
  task: Task;
  type: ConflictType;
  message: string;
}

export default function ConflictDrawer({
  isOpen,
  onClose,
  tasks,
  onResolveConflicts
}: ConflictDrawerProps) {
  const [activeTab, setActiveTab] = useState<ConflictType | 'all'>('all');

  // 提取所有冲突
  const conflicts: ConflictItem[] = tasks.flatMap(task => {
    const items: ConflictItem[] = [];
    
    if (task.meta?.confidence && task.meta.confidence < 0.7) {
      items.push({
        task,
        type: 'low_confidence',
        message: `识别置信度较低 (${(task.meta.confidence * 100).toFixed(0)}%)`
      });
    }
    
    if (task.meta?.conflict) {
      items.push({
        task,
        type: 'type_mismatch',
        message: '任务类型可能不匹配'
      });
    }
    
    if (task.submissionMethods.length === 0) {
      items.push({
        task,
        type: 'submission_mismatch',
        message: '未设置提交方式'
      });
    }
    
    return items;
  });

  const filteredConflicts = activeTab === 'all'
    ? conflicts
    : conflicts.filter(c => c.type === activeTab);

  const conflictCounts = {
    all: conflicts.length,
    low_confidence: conflicts.filter(c => c.type === 'low_confidence').length,
    type_mismatch: conflicts.filter(c => c.type === 'type_mismatch').length,
    submission_mismatch: conflicts.filter(c => c.type === 'submission_mismatch').length,
    missing_answer: conflicts.filter(c => c.type === 'missing_answer').length
  };

  const handleAutoFix = () => {
    const fixedTasks = tasks.map(task => {
      const updates: Partial<Task> = {};
      
      // 修复提交方式缺失
      if (task.submissionMethods.length === 0) {
        updates.submissionMethods = ['typein'];
      }
      
      // 清除冲突标记（假设已修复）
      if (task.meta?.conflict) {
        updates.meta = { ...task.meta, conflict: false };
      }
      
      return { ...task, ...updates };
    });
    
    onResolveConflicts(fixedTasks);
  };

  const handleIgnoreAll = () => {
    const clearedTasks = tasks.map(task => ({
      ...task,
      meta: task.meta ? { ...task.meta, conflict: false } : undefined
    }));
    
    onResolveConflicts(clearedTasks);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h3>问题修正</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>发现问题</span>
            <span className={styles.summaryValue}>{conflictCounts.all}</span>
          </div>
          <div className={styles.summaryActions}>
            <button className={styles.autoFixButton} onClick={handleAutoFix}>
              🔧 自动修正
            </button>
            <button className={styles.ignoreButton} onClick={handleIgnoreAll}>
              忽略全部
            </button>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
          >
            全部 ({conflictCounts.all})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'low_confidence' ? styles.active : ''}`}
            onClick={() => setActiveTab('low_confidence')}
          >
            低置信度 ({conflictCounts.low_confidence})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'type_mismatch' ? styles.active : ''}`}
            onClick={() => setActiveTab('type_mismatch')}
          >
            类型冲突 ({conflictCounts.type_mismatch})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'submission_mismatch' ? styles.active : ''}`}
            onClick={() => setActiveTab('submission_mismatch')}
          >
            提交方式 ({conflictCounts.submission_mismatch})
          </button>
        </div>

        <div className={styles.content}>
          {filteredConflicts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✓</div>
              <h4>没有发现问题</h4>
              <p>所有任务都已正确配置</p>
            </div>
          ) : (
            <div className={styles.conflictList}>
              {filteredConflicts.map((conflict, index) => (
                <div key={`${conflict.task.id}-${index}`} className={styles.conflictItem}>
                  <div className={styles.conflictHeader}>
                    <div className={styles.conflictType}>
                      {conflict.type === 'low_confidence' && '❓'}
                      {conflict.type === 'type_mismatch' && '⚠️'}
                      {conflict.type === 'submission_mismatch' && '📝'}
                      {conflict.type === 'missing_answer' && '❌'}
                    </div>
                    <div className={styles.conflictInfo}>
                      <div className={styles.taskTitle}>{conflict.task.title}</div>
                      <div className={styles.conflictMessage}>{conflict.message}</div>
                    </div>
                  </div>
                  <div className={styles.conflictActions}>
                    <button className={styles.fixButton}>修正</button>
                    <button className={styles.ignoreButton}>忽略</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredConflicts.length > 0 && (
          <div className={styles.footer}>
            <button className={styles.secondaryButton} onClick={onClose}>
              稍后处理
            </button>
            <button className={styles.primaryButton} onClick={handleAutoFix}>
              应用修正
            </button>
          </div>
        )}
      </div>
    </>
  );
}

