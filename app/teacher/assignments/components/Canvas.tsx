'use client';

import { useEffect, useRef } from 'react';
import { Task, TaskType } from '../types';
import TaskCard from './TaskCard';
import styles from './Canvas.module.css';

interface CanvasProps {
  tasks: Task[];
  selectedTaskId: string | null;
  scrollToTaskId?: string | null;
  onSelectTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onDuplicateTask: (taskId: string) => void;
  onReorderTasks: (startIndex: number, endIndex: number) => void;
  onOpenImportDrawer: () => void;
  onOpenConflictDrawer: () => void;
  onOpenGlobalSettings: () => void;
  onScrollComplete?: () => void;
}

export default function Canvas({
  tasks,
  selectedTaskId,
  scrollToTaskId,
  onSelectTask,
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  onReorderTasks,
  onOpenImportDrawer,
  onOpenConflictDrawer,
  onOpenGlobalSettings,
  onScrollComplete
}: CanvasProps) {
  const taskRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 当需要滚动到特定任务时
  useEffect(() => {
    if (scrollToTaskId && taskRefs.current[scrollToTaskId]) {
      // 短暂延迟以确保DOM已经更新
      setTimeout(() => {
        taskRefs.current[scrollToTaskId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        onScrollComplete?.();
      }, 100);
    }
  }, [scrollToTaskId, onScrollComplete]);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskType = e.dataTransfer.getData('taskType') as TaskType;
    if (taskType) {
      // 这会通过TaskLibrary的点击事件触发
      console.log('Dropped task type:', taskType);
    }
  };

  const handleCardDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cardIndex', index.toString());
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCardDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('cardIndex'));
    if (dragIndex !== dropIndex && !isNaN(dragIndex)) {
      onReorderTasks(dragIndex, dropIndex);
    }
  };

  // 低置信度和冲突统计
  const lowConfidenceCount = tasks.filter(t => 
    t.meta?.confidence && t.meta.confidence < 0.7
  ).length;
  const conflictCount = tasks.filter(t => t.meta?.conflict).length;

  return (
    <div 
      className={styles.canvas}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.canvasHeader}>
        <div className={styles.headerLeft}>
          <h3>任务列表</h3>
          <span className={styles.taskCount}>{tasks.length} 个任务</span>
          
          {(lowConfidenceCount > 0 || conflictCount > 0) && (
            <button
              className={styles.conflictBadge}
              onClick={onOpenConflictDrawer}
            >
              ⚠️ {lowConfidenceCount + conflictCount} 个问题
            </button>
          )}
        </div>
        
        <div className={styles.headerRight}>
          <button
            className={styles.settingsButton}
            onClick={onOpenGlobalSettings}
            title="全局设置"
          >
            ⚙️ 全局设置
          </button>
          <button
            className={styles.importButton}
            onClick={onOpenImportDrawer}
          >
            📁 导入
          </button>
        </div>
      </div>

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIllustration}>📝</div>
            <h4>还没有任务</h4>
            <p>从左侧任务库拖拽或点击添加任务</p>
            <p>或者</p>
            <button className={styles.emptyImportButton} onClick={onOpenImportDrawer}>
              从文件/资源库导入
            </button>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              ref={(el) => {
                taskRefs.current[task.id] = el;
              }}
            >
              <TaskCard
                task={task}
                index={index}
                isSelected={task.id === selectedTaskId}
                onClick={() => onSelectTask(task.id)}
                onUpdate={(updates) => onUpdateTask(task.id, updates)}
                onDelete={() => onDeleteTask(task.id)}
                onDuplicate={() => onDuplicateTask(task.id)}
                onDragStart={(e) => handleCardDragStart(e, index)}
                onDragOver={(e) => handleCardDragOver(e, index)}
                onDrop={(e) => handleCardDrop(e, index)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

