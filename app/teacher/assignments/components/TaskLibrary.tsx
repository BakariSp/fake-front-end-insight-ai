'use client';

import { TaskType } from '../types';
import { LIBRARY_ITEMS } from '../mockData';
import { TaskIcon } from './TaskIcons';
import styles from './TaskLibrary.module.css';

interface TaskLibraryProps {
  onAddTask: (type: TaskType) => void;
}

export default function TaskLibrary({ onAddTask }: TaskLibraryProps) {
  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <h3>任務庫</h3>
        <p className={styles.subtitle}>拖拽或點擊新增任務</p>
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
            <div className={styles.itemIcon}>
              <TaskIcon type={item.type} size={32} color={item.color} />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemDescription}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.tip}>
          💡 <strong>提示：</strong>點擊任務卡片快速新增
        </div>
      </div>
    </div>
  );
}

