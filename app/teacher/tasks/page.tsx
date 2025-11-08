'use client';

import React from 'react';
import styles from './tasks.module.css';

const TasksPage: React.FC = () => {
  const mockTasks = [
    {
      id: '1',
      type: 'AI Quiz Generation',
      title: 'Geometry - Triangles Quiz',
      status: 'Ready for Review',
      createdAt: '2 hours ago',
      statusColor: '#52C41A',
    },
    {
      id: '2',
      type: 'Text Analysis',
      title: 'Student Essay Feedback - Grade 10-A',
      status: 'Processing',
      createdAt: '1 day ago',
      statusColor: '#4F7FFF',
    },
    {
      id: '3',
      type: 'Quiz Generation',
      title: 'Algebra Chapter 3 Assessment',
      status: 'Completed',
      createdAt: '3 days ago',
      statusColor: '#8C8C8C',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Tasks</h1>
        <p className={styles.subtitle}>
          View and manage your AI-generated content and automated tasks
        </p>
      </div>

      <div className={styles.taskList}>
        {mockTasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <span className={styles.taskType}>{task.type}</span>
              <span 
                className={styles.taskStatus}
                style={{ color: task.statusColor }}
              >
                {task.status}
              </span>
            </div>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskTime}>{task.createdAt}</p>
            <div className={styles.taskActions}>
              <button className={styles.viewButton}>View Details</button>
              <button className={styles.downloadButton}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

