'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { AssignmentPackage, Task, TaskType } from '../types';
import { createDefaultTask, createEmptyAssignment } from '../mockData';
import TopBar from './TopBar';
import TaskLibrary from './TaskLibrary';
import Canvas from './Canvas';
import Inspector from './Inspector';
import ImportDrawer from './ImportDrawer';
import ConflictDrawer from './ConflictDrawer';
import PreviewModal from './PreviewModal';
import GlobalSettings from './GlobalSettings';
import styles from './AssignmentBuilder.module.css';

interface AssignmentBuilderProps {
  initialAssignment?: AssignmentPackage;
  initialTasks?: Task[];
  mode: 'new' | 'edit';
}

export default function AssignmentBuilder({
  initialAssignment,
  initialTasks = [],
  mode
}: AssignmentBuilderProps) {
  const searchParams = useSearchParams();
  const fullscreenParam = searchParams.get('fullscreen');
  const isFullscreen = fullscreenParam === null || fullscreenParam !== 'false';

  // 状态管理
  const [assignment, setAssignment] = useState<AssignmentPackage>(
    initialAssignment || createEmptyAssignment()
  );
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isImportDrawerOpen, setIsImportDrawerOpen] = useState(false);
  const [isConflictDrawerOpen, setIsConflictDrawerOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);
  const [scrollToTaskId, setScrollToTaskId] = useState<string | null>(null);

  // 计算总分
  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);

  // 更新作业包信息
  const updateAssignment = useCallback((updates: Partial<AssignmentPackage>) => {
    setAssignment(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  }, []);

  // 添加任务
  const addTask = useCallback((type: TaskType) => {
    const newTask = createDefaultTask(type, tasks.length);
    setTasks(prev => [...prev, newTask]);
    setSelectedTaskId(newTask.id);
    // 设置需要滚动到的任务ID
    setScrollToTaskId(newTask.id);
  }, [tasks.length]);

  // 更新任务
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  }, []);

  // 删除任务
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const currentIndex = prev.findIndex(t => t.id === taskId);
      const remainingTasks = prev.filter(task => task.id !== taskId);
      
      // 如果删除的是当前选中的任务，需要智能选择下一个任务
      if (selectedTaskId === taskId) {
        // 删除后还有其他任务
        if (remainingTasks.length > 0) {
          let newSelectedId: string;
          
          // 优先选择下一个任务（相同索引位置）
          if (currentIndex < remainingTasks.length) {
            newSelectedId = remainingTasks[currentIndex].id;
          } 
          // 如果删除的是最后一个，选择新的最后一个
          else {
            newSelectedId = remainingTasks[remainingTasks.length - 1].id;
          }
          
          // 使用 setTimeout 确保在下一个事件循环中更新选中状态
          setTimeout(() => {
            setSelectedTaskId(newSelectedId);
          }, 0);
        } else {
          // 删除后没有任务了，才关闭属性面板
          setTimeout(() => {
            setSelectedTaskId(null);
          }, 0);
        }
      }
      
      return remainingTasks;
    });
  }, [selectedTaskId]);

  // 复制任务
  const duplicateTask = useCallback((taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newTask = {
        ...task,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: `${task.title} (副本)`,
        order: tasks.length
      };
      setTasks(prev => [...prev, newTask]);
    }
  }, [tasks]);

  // 重新排序任务
  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((task, index) => ({ ...task, order: index }));
    });
  }, []);

  // 保存草稿
  const handleSaveDraft = useCallback(() => {
    console.log('Saving draft...', { assignment, tasks });
    alert('草稿已保存！');
  }, [assignment, tasks]);

  // 发布作业
  const handlePublish = useCallback(() => {
    if (!assignment.title.trim()) {
      alert('请填写作业标题');
      return;
    }
    if (tasks.length === 0) {
      alert('请至少添加一个任务');
      return;
    }
    console.log('Publishing assignment...', { assignment, tasks });
    alert('作业已发布！');
  }, [assignment, tasks]);

  // 预览
  const handlePreview = useCallback(() => {
    setIsPreviewModalOpen(true);
  }, []);

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div 
      className={styles.builderContainer}
      style={{ top: isFullscreen ? '0' : '80px' }}
    >
      <TopBar
        assignment={assignment}
        totalPoints={totalPoints}
        onUpdate={updateAssignment}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onPreview={handlePreview}
      />
      
      <div className={styles.mainContent}>
        <TaskLibrary onAddTask={addTask} />
        
        <Canvas
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          scrollToTaskId={scrollToTaskId}
          onSelectTask={setSelectedTaskId}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onDuplicateTask={duplicateTask}
          onReorderTasks={reorderTasks}
          onOpenImportDrawer={() => setIsImportDrawerOpen(true)}
          onOpenConflictDrawer={() => setIsConflictDrawerOpen(true)}
          onOpenGlobalSettings={() => setIsGlobalSettingsOpen(true)}
          onScrollComplete={() => setScrollToTaskId(null)}
        />
        
        {selectedTask && (
          <Inspector
            task={selectedTask}
            onUpdateTask={(updates) => updateTask(selectedTask.id, updates)}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>

      <ImportDrawer
        isOpen={isImportDrawerOpen}
        onClose={() => setIsImportDrawerOpen(false)}
        tasks={tasks}
        onImport={(importedTasks) => {
          setTasks(prev => [...prev, ...importedTasks]);
          setIsImportDrawerOpen(false);
        }}
      />

      <ConflictDrawer
        isOpen={isConflictDrawerOpen}
        onClose={() => setIsConflictDrawerOpen(false)}
        tasks={tasks}
        onResolveConflicts={(resolvedTasks) => {
          setTasks(resolvedTasks);
          setIsConflictDrawerOpen(false);
        }}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        tasks={tasks}
      />

      {isGlobalSettingsOpen && (
        <GlobalSettings
          assignment={assignment}
          onUpdate={updateAssignment}
          onClose={() => setIsGlobalSettingsOpen(false)}
        />
      )}
    </div>
  );
}

