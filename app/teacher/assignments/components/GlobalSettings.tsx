'use client';

import { useState } from 'react';
import { AssignmentPackage, GradingMode, LatePolicy, RubricDimension } from '../types';
import RubricEditor from './RubricEditor';
import styles from './GlobalSettings.module.css';

interface GlobalSettingsProps {
  assignment: AssignmentPackage;
  onUpdate: (updates: Partial<AssignmentPackage>) => void;
  onClose: () => void;
}

const GRADING_MODES: { value: GradingMode; label: string; description: string; icon: string }[] = [
  { value: 'auto', label: '自动批改', description: '系统自动评分（适用于选择题）', icon: '🤖' },
  { value: 'assist', label: 'AI辅助批改', description: 'AI提供建议，教师确认', icon: '✨' },
  { value: 'manual', label: '人工批改', description: '完全由教师手动评分', icon: '✍️' }
];

export default function GlobalSettings({ assignment, onUpdate, onClose }: GlobalSettingsProps) {
  const [customDimensions, setCustomDimensions] = useState<RubricDimension[] | undefined>();

  const handleUpdateDimensions = (dimensions: RubricDimension[]) => {
    setCustomDimensions(dimensions);
    // 可以在这里保存到 assignment 的自定义字段
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.icon}>⚙️</div>
            <div>
              <h3>全局设置</h3>
              <p className={styles.subtitle}>这些设置将应用到所有任务</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* 批改模式 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4>📝 批改模式</h4>
              <p className={styles.sectionDesc}>选择作业的批改方式</p>
            </div>
            <div className={styles.gradingModes}>
              {GRADING_MODES.map(mode => (
                <label
                  key={mode.value}
                  className={`${styles.gradingCard} ${
                    assignment.gradingMode === mode.value ? styles.selected : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="gradingMode"
                    checked={assignment.gradingMode === mode.value}
                    onChange={() => onUpdate({ gradingMode: mode.value })}
                  />
                  <div className={styles.cardIcon}>{mode.icon}</div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardLabel}>{mode.label}</div>
                    <div className={styles.cardDescription}>{mode.description}</div>
                  </div>
                </label>
              ))}
            </div>

            {assignment.gradingMode === 'assist' && (
              <div className={styles.rubricSection}>
                <RubricEditor
                  selectedRubricId={assignment.rubricId}
                  onSelectRubric={(rubricId) => onUpdate({ rubricId })}
                  customDimensions={customDimensions}
                  onUpdateDimensions={handleUpdateDimensions}
                  showPromptEditor={true}
                />
              </div>
            )}
          </div>

          {/* 提交设置 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4>📅 提交设置</h4>
              <p className={styles.sectionDesc}>设置作业提交的规则</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.switchLabel}>
                <input
                  type="checkbox"
                  checked={assignment.allowLateSubmission ?? true}
                  onChange={(e) => onUpdate({ allowLateSubmission: e.target.checked })}
                />
                <span>允许迟交</span>
              </label>
            </div>

            {assignment.allowLateSubmission && (
              <div className={styles.formGroup}>
                <label>迟交扣分策略</label>
                <select
                  value={assignment.latePolicy || 'none'}
                  onChange={(e) => onUpdate({ latePolicy: e.target.value as LatePolicy })}
                >
                  <option value="none">不扣分</option>
                  <option value="penalty_10">扣除10%</option>
                  <option value="penalty_20">扣除20%</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.confirmButton} onClick={onClose}>
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

