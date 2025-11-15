'use client';

import { useState } from 'react';
import { RubricTemplate } from '../types';
import { RUBRIC_TEMPLATES } from '../mockData';
import styles from './RubricSelector.module.css';

interface RubricSelectorProps {
  selectedRubricId?: string;
  onSelectRubric: (rubricId: string | undefined) => void;
  onUpdateWeights?: (weights: Record<string, number>) => void;
  currentWeights?: Record<string, number>;
}

export default function RubricSelector({
  selectedRubricId,
  onSelectRubric,
  onUpdateWeights,
  currentWeights = {}
}: RubricSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const selectedRubric = RUBRIC_TEMPLATES.find(r => r.id === selectedRubricId);

  const handleRubricChange = (rubricId: string) => {
    if (rubricId === 'none') {
      onSelectRubric(undefined);
      setIsExpanded(false);
      setEditMode(false);
    } else {
      onSelectRubric(rubricId);
      setIsExpanded(true);
    }
  };

  const handleWeightChange = (dimensionName: string, weight: number) => {
    if (!onUpdateWeights) return;
    
    const newWeights = {
      ...currentWeights,
      [dimensionName]: weight / 100 // 转换为 0-1 的比例
    };
    onUpdateWeights(newWeights);
  };

  const getDisplayWeight = (dimensionName: string, defaultWeight: number): number => {
    if (currentWeights[dimensionName] !== undefined) {
      return Math.round(currentWeights[dimensionName] * 100);
    }
    return Math.round(defaultWeight * 100);
  };

  const totalWeight = selectedRubric
    ? selectedRubric.dimensions.reduce((sum, dim) => {
        return sum + getDisplayWeight(dim.name, dim.weight);
      }, 0)
    : 100;

  return (
    <div className={styles.rubricSelector}>
      <div className={styles.formGroup}>
        <label>评分标准 Rubric</label>
        <select
          value={selectedRubricId || 'none'}
          onChange={(e) => handleRubricChange(e.target.value)}
          className={styles.rubricSelect}
        >
          <option value="none">无评分标准（自由批改）</option>
          {RUBRIC_TEMPLATES.map(rubric => (
            <option key={rubric.id} value={rubric.id}>
              {rubric.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRubric && (
        <>
          <div className={styles.rubricHeader}>
            <button
              type="button"
              className={styles.expandButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={isExpanded ? styles.expandIconOpen : ''}
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{isExpanded ? '收起' : '展开'}评分维度</span>
            </button>
            
            {isExpanded && (
              <button
                type="button"
                className={styles.editButton}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? '✓ 完成' : '✏️ 调整权重'}
              </button>
            )}
          </div>

          {isExpanded && (
            <div className={styles.rubricContent}>
              <div className={styles.dimensionsList}>
                {selectedRubric.dimensions.map((dimension, index) => {
                  const weight = getDisplayWeight(dimension.name, dimension.weight);
                  
                  return (
                    <div key={index} className={styles.dimensionItem}>
                      <div className={styles.dimensionHeader}>
                        <div className={styles.dimensionName}>
                          <span className={styles.dimensionIcon}>📊</span>
                          <span>{dimension.name}</span>
                        </div>
                        <div className={styles.dimensionWeight}>
                          {editMode ? (
                            <input
                              type="number"
                              value={weight}
                              onChange={(e) => handleWeightChange(
                                dimension.name,
                                parseInt(e.target.value) || 0
                              )}
                              min="0"
                              max="100"
                              className={styles.weightInput}
                            />
                          ) : (
                            <span className={styles.weightDisplay}>{weight}%</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.dimensionDescription}>
                        {dimension.description}
                      </div>
                      {editMode && (
                        <div className={styles.weightSlider}>
                          <input
                            type="range"
                            value={weight}
                            onChange={(e) => handleWeightChange(
                              dimension.name,
                              parseInt(e.target.value)
                            )}
                            min="0"
                            max="100"
                            step="5"
                            className={styles.slider}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {editMode && (
                <div className={`${styles.totalWeight} ${totalWeight !== 100 ? styles.warning : ''}`}>
                  <span>总权重：</span>
                  <strong>{totalWeight}%</strong>
                  {totalWeight !== 100 && (
                    <span className={styles.warningText}>
                      ⚠️ 权重总和应为 100%
                    </span>
                  )}
                </div>
              )}

              <div className={styles.rubricInfo}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 4v3M7 9v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>AI 将根据以上维度和权重进行智能评分，您可以随时调整结果</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

