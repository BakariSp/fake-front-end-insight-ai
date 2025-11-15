'use client';

import { AssignmentPackage } from '../types';
import { SUBJECTS, TOPIC_TAGS } from '../mockData';
import styles from './TopBar.module.css';

interface TopBarProps {
  assignment: AssignmentPackage;
  totalPoints: number;
  onUpdate: (updates: Partial<AssignmentPackage>) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

export default function TopBar({
  assignment,
  totalPoints,
  onUpdate,
  onSaveDraft,
  onPublish,
  onPreview
}: TopBarProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ title: e.target.value });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ subject: e.target.value as any, topics: [] });
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ dueAt: new Date(e.target.value).toISOString() });
  };

  const handleTopicToggle = (topic: string) => {
    const topics = assignment.topics.includes(topic)
      ? assignment.topics.filter(t => t !== topic)
      : [...assignment.topics, topic];
    onUpdate({ topics });
  };

  const availableTopics = TOPIC_TAGS[assignment.subject] || [];

  return (
    <div className={styles.topBar}>
      <div className={styles.leftSection}>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          ← 返回
        </button>
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.titleInput}
            placeholder="作業標題"
            value={assignment.title}
            onChange={handleTitleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>科目</label>
          <select
            className={styles.select}
            value={assignment.subject}
            onChange={handleSubjectChange}
          >
            {SUBJECTS.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>主題標籤</label>
          <div className={styles.topicSelector}>
            <button
              className={styles.topicButton}
              onClick={(e) => {
                e.currentTarget.nextElementSibling?.classList.toggle(styles.show);
              }}
            >
              {assignment.topics.length > 0
                ? `${assignment.topics.length} 個標籤`
                : '選擇標籤'}
            </button>
            <div className={styles.topicDropdown}>
              {availableTopics.map(topic => (
                <label key={topic} className={styles.topicOption}>
                  <input
                    type="checkbox"
                    checked={assignment.topics.includes(topic)}
                    onChange={() => handleTopicToggle(topic)}
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>
          {assignment.topics.length > 0 && (
            <div className={styles.selectedTopics}>
              {assignment.topics.map(topic => (
                <span key={topic} className={styles.topicChip}>
                  {topic}
                  <button onClick={() => handleTopicToggle(topic)}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>截止時間</label>
          <input
            type="datetime-local"
            className={styles.dateInput}
            value={assignment.dueAt.slice(0, 16)}
            onChange={handleDueDateChange}
          />
        </div>

        <div className={styles.pointsBadge}>
          總分: <strong>{totalPoints}</strong>
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.ghostButton} onClick={onPreview}>
          預覽
        </button>
        <button className={styles.secondaryButton} onClick={onSaveDraft}>
          儲存草稿
        </button>
        <button className={styles.primaryButton} onClick={onPublish}>
          發佈作業
        </button>
      </div>
    </div>
  );
}

