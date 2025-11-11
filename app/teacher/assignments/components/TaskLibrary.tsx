'use client';

import { TaskType } from '../types';
import { LIBRARY_ITEMS } from '../mockData';
import styles from './TaskLibrary.module.css';

interface TaskLibraryProps {
  onAddTask: (type: TaskType) => void;
}

export default function TaskLibrary({ onAddTask }: TaskLibraryProps) {
  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <h3>任务库</h3>
        <p className={styles.subtitle}>拖拽或点击添加任务</p>
      </div>

      <div className={styles.items}>
        {LIBRARY_ITEMS.map((item) => (
          <div
            key={item.type}
            className={styles.libraryItem}
            onClick={() => onAddTask(item.type)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('taskType', item.type);
            }}
            style={{ '--item-color': item.color } as React.CSSProperties}
          >
            <div className={styles.itemIcon}>{item.icon}</div>
            <div className={styles.itemContent}>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemDescription}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.tip}>
          💡 <strong>提示：</strong>点击任务卡片快速添加
        </div>
      </div>
    </div>
  );
}

