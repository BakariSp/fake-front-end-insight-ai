'use client';

import { useState } from 'react';
import { RubricTemplate, RubricDimension } from '../types';
import { RUBRIC_TEMPLATES } from '../mockData';
import styles from './RubricEditor.module.css';

interface RubricEditorProps {
  selectedRubricId?: string;
  onSelectRubric: (rubricId: string | undefined) => void;
  customDimensions?: RubricDimension[];
  onUpdateDimensions?: (dimensions: RubricDimension[]) => void;
  showPromptEditor?: boolean;
}

export default function RubricEditor({
  selectedRubricId,
  onSelectRubric,
  customDimensions,
  onUpdateDimensions,
  showPromptEditor = true
}: RubricEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingDimId, setEditingDimId] = useState<string | null>(null);

  const selectedRubric = RUBRIC_TEMPLATES.find(r => r.id === selectedRubricId);
  const displayDimensions = customDimensions || selectedRubric?.dimensions || [];

  const handleRubricChange = (rubricId: string) => {
    if (rubricId === 'none') {
      onSelectRubric(undefined);
      setIsExpanded(false);
    } else {
      onSelectRubric(rubricId);
      setIsExpanded(true);
      // 初始化自定义维度
      if (onUpdateDimensions) {
        const template = RUBRIC_TEMPLATES.find(r => r.id === rubricId);
        if (template) {
          onUpdateDimensions([...template.dimensions]);
        }
      }
    }
  };

  const handleWeightChange = (dimId: string, weight: number) => {
    if (!onUpdateDimensions) return;
    
    const newDimensions = displayDimensions.map(dim =>
      dim.id === dimId ? { ...dim, weight: weight / 100 } : dim
    );
    onUpdateDimensions(newDimensions);
  };

  const handleFieldChange = (dimId: string, field: keyof RubricDimension, value: string) => {
    if (!onUpdateDimensions) return;
    
    const newDimensions = displayDimensions.map(dim =>
      dim.id === dimId ? { ...dim, [field]: value } : dim
    );
    onUpdateDimensions(newDimensions);
  };

  const handleAddDimension = () => {
    if (!onUpdateDimensions) return;
    
    const newDim: RubricDimension = {
      id: `dim-custom-${Date.now()}`,
      name: '新维度',
      weight: 0.1,
      description: '请输入描述',
      prompt: '请输入评分提示词...'
    };
    onUpdateDimensions([...displayDimensions, newDim]);
    setEditingDimId(newDim.id);
  };

  const handleRemoveDimension = (dimId: string) => {
    if (!onUpdateDimensions) return;
    if (displayDimensions.length <= 1) {
      alert('至少需要保留一个评分维度');
      return;
    }
    onUpdateDimensions(displayDimensions.filter(dim => dim.id !== dimId));
  };

  const getDisplayWeight = (weight: number): number => {
    return Math.round(weight * 100);
  };

  const totalWeight = displayDimensions.reduce((sum, dim) => sum + getDisplayWeight(dim.weight), 0);

  return (
    <div className={styles.rubricEditor}>
      <div className={styles.formGroup}>
        <label>评分标准模板</label>
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

            {isExpanded && onUpdateDimensions && (
              <button
                type="button"
                className={styles.addDimButton}
                onClick={handleAddDimension}
              >
                ➕ 添加维度
              </button>
            )}
          </div>

          {isExpanded && (
            <div className={styles.rubricContent}>
              <div className={styles.dimensionsList}>
                {displayDimensions.map((dimension) => {
                  const weight = getDisplayWeight(dimension.weight);
                  const isEditing = editingDimId === dimension.id;
                  
                  return (
                    <div key={dimension.id} className={styles.dimensionItem}>
                      <div className={styles.dimensionHeader}>
                        <div className={styles.dimensionName}>
                          {onUpdateDimensions && isEditing ? (
                            <input
                              type="text"
                              value={dimension.name}
                              onChange={(e) => handleFieldChange(dimension.id, 'name', e.target.value)}
                              className={styles.nameInput}
                              placeholder="维度名称"
                            />
                          ) : (
                            <>
                              <span className={styles.dimensionIcon}>📊</span>
                              <span>{dimension.name}</span>
                            </>
                          )}
                        </div>
                        <div className={styles.dimensionActions}>
                          <div className={styles.dimensionWeight}>
                            {onUpdateDimensions ? (
                              <input
                                type="number"
                                value={weight}
                                onChange={(e) => handleWeightChange(
                                  dimension.id,
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
                          {onUpdateDimensions && (
                            <div className={styles.actionButtons}>
                              <button
                                type="button"
                                className={styles.editBtn}
                                onClick={() => setEditingDimId(isEditing ? null : dimension.id)}
                                title={isEditing ? '完成编辑' : '编辑'}
                              >
                                {isEditing ? '✓' : '✏️'}
                              </button>
                              <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => handleRemoveDimension(dimension.id)}
                                title="删除维度"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {onUpdateDimensions && isEditing ? (
                        <input
                          type="text"
                          value={dimension.description}
                          onChange={(e) => handleFieldChange(dimension.id, 'description', e.target.value)}
                          className={styles.descInput}
                          placeholder="简短描述"
                        />
                      ) : (
                        <div className={styles.dimensionDescription}>
                          {dimension.description}
                        </div>
                      )}

                      {showPromptEditor && (
                        <div className={styles.promptSection}>
                          <div className={styles.promptLabel}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            AI 评分提示词
                          </div>
                          {onUpdateDimensions && isEditing ? (
                            <textarea
                              value={dimension.prompt || ''}
                              onChange={(e) => handleFieldChange(dimension.id, 'prompt', e.target.value)}
                              className={styles.promptTextarea}
                              placeholder="输入详细的 AI 评分提示，帮助 AI 更准确地评估这个维度..."
                              rows={3}
                            />
                          ) : (
                            <div className={styles.promptDisplay}>
                              {dimension.prompt || '未设置评分提示'}
                            </div>
                          )}
                        </div>
                      )}

                      {onUpdateDimensions && (
                        <div className={styles.weightSlider}>
                          <input
                            type="range"
                            value={weight}
                            onChange={(e) => handleWeightChange(
                              dimension.id,
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

              {onUpdateDimensions && (
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
                <span>AI 将根据评分维度、权重和提示词进行智能评分，您可以随时调整结果</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

