'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Task, TaskType, QuizOption, SubQuestion } from '../types';
import { LIBRARY_ITEMS, generateId } from '../mockData';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const TYPE_COLORS: Record<TaskType, string> = {
  quiz: '#4f7fff',
  'fill-blank': '#8b5cf6',
  essay: '#9b59b6',
  scan: '#14b8a6',
  audio: '#f97316',
  video: '#ec4899',
  file: '#6b7280',
  group: '#8b5cf6'
};

export default function TaskCard({
  task,
  index,
  isSelected,
  onClick,
  onUpdate,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragOver,
  onDrop
}: TaskCardProps) {
  const libraryItem = LIBRARY_ITEMS.find(item => item.type === task.type);

  // 选择题相关
  const handleQuizTypeChange = (type: 'single' | 'multiple' | 'true-false') => {
    let newOptions = task.quizConfig?.options || [];
    
    if (type === 'true-false') {
      newOptions = [
        { id: generateId('opt'), text: '正确', isCorrect: false },
        { id: generateId('opt'), text: '错误', isCorrect: false }
      ];
    } else if (newOptions.length === 0 || task.quizConfig?.type === 'true-false') {
      newOptions = [
        { id: generateId('opt'), text: '', isCorrect: false },
        { id: generateId('opt'), text: '', isCorrect: false },
        { id: generateId('opt'), text: '', isCorrect: false },
        { id: generateId('opt'), text: '', isCorrect: false }
      ];
    }
    
    onUpdate({
      quizConfig: { type, options: newOptions, correctAnswer: [] }
    });
  };

  const handleAddOption = () => {
    if (!task.quizConfig) return;
    onUpdate({
      quizConfig: {
        ...task.quizConfig,
        options: [...task.quizConfig.options, {
          id: generateId('opt'),
          text: '',
          isCorrect: false
        }]
      }
    });
  };

  const handleRemoveOption = (optionId: string) => {
    if (!task.quizConfig || task.quizConfig.options.length <= 2) return;
    onUpdate({
      quizConfig: {
        ...task.quizConfig,
        options: task.quizConfig.options.filter(opt => opt.id !== optionId)
      }
    });
  };

  const handleOptionTextChange = (optionId: string, text: string) => {
    if (!task.quizConfig) return;
    onUpdate({
      quizConfig: {
        ...task.quizConfig,
        options: task.quizConfig.options.map(opt =>
          opt.id === optionId ? { ...opt, text } : opt
        )
      }
    });
  };

  const handleCorrectAnswerToggle = (optIndex: number) => {
    if (!task.quizConfig) return;
    const correctAnswer = task.quizConfig.correctAnswer || [];
    
    if (task.quizConfig.type === 'single' || task.quizConfig.type === 'true-false') {
      onUpdate({
        quizConfig: { ...task.quizConfig, correctAnswer: [optIndex] }
      });
    } else {
      onUpdate({
        quizConfig: {
          ...task.quizConfig,
          correctAnswer: correctAnswer.includes(optIndex)
            ? correctAnswer.filter(i => i !== optIndex)
            : [...correctAnswer, optIndex]
        }
      });
    }
  };

  // 填空题相关 - 支持 {{答案}} 格式
  const [isFillBlankEditMode, setIsFillBlankEditMode] = useState(
    !task.fillBlankConfig?.content || task.fillBlankConfig.blanks.length === 0
  );
  const fillBlankTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fillBlankContainerRef = useRef<HTMLDivElement>(null);

  const handleFillBlankContentChange = (content: string) => {
    if (!task.fillBlankConfig) return;
    
    // 支持 {{答案}} 格式：如 {{H2O}} 或 {{H2O|水}}
    const answerMatches = content.match(/\{\{([^}]+)\}\}/g) || [];
    const newBlanks: any[] = [];
    
    answerMatches.forEach((match, index) => {
      const innerContent = match.replace(/\{\{|\}\}/g, '');
      // 直接包含答案，支持 | 分隔多个答案
      const answers = innerContent.split('|').map(a => a.trim()).filter(a => a);
      const blankIndex = index + 1;
      const existingBlank = task.fillBlankConfig!.blanks.find(b => b.index === blankIndex);
      
      newBlanks.push({
        id: existingBlank?.id || generateId('blank'),
        index: blankIndex,
        answers: answers.length > 0 ? answers : [''],
        points: existingBlank?.points || 2
      });
    });
    
    onUpdate({
      fillBlankConfig: { ...task.fillBlankConfig, content, blanks: newBlanks }
    });
  };

  const handleBlankAnswerChange = (blankId: string, answersText: string) => {
    if (!task.fillBlankConfig) return;
    onUpdate({
      fillBlankConfig: {
        ...task.fillBlankConfig,
        blanks: task.fillBlankConfig.blanks.map(blank =>
          blank.id === blankId
            ? { ...blank, answers: answersText.split('|').map(a => a.trim()).filter(a => a) }
            : blank
        )
      }
    });
  };

  // 插入空格按钮
  const handleInsertBlank = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textarea = fillBlankTextareaRef.current;
    if (!textarea || !task.fillBlankConfig) return;

    // 如果不在编辑模式，先切换到编辑模式
    if (!isFillBlankEditMode) {
      setIsFillBlankEditMode(true);
      setTimeout(() => {
        const textarea = fillBlankTextareaRef.current;
        if (!textarea) return;
        textarea.focus();
        const cursorPos = textarea.value.length;
        const blankText = ` {{答案}}`;
        const newContent = textarea.value + blankText;
        handleFillBlankContentChange(newContent);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos + 3, cursorPos + 5);
        }, 0);
      }, 0);
      return;
    }

    const cursorPos = textarea.selectionStart;
    const textBefore = (task.fillBlankConfig.content || '').substring(0, cursorPos);
    const textAfter = (task.fillBlankConfig.content || '').substring(cursorPos);
    
    const blankText = `{{答案}}`;
    const newContent = textBefore + blankText + textAfter;
    
    handleFillBlankContentChange(newContent);
    
    // 设置光标位置到{{}}内部，方便直接输入答案
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPos + 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos + 2);
    }, 0);
  };

  // 监听点击外部事件，自动切换到预览模式
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fillBlankContainerRef.current && !fillBlankContainerRef.current.contains(event.target as Node)) {
        if (task.fillBlankConfig?.content && task.fillBlankConfig.blanks.length > 0) {
          setIsFillBlankEditMode(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [task.fillBlankConfig?.content, task.fillBlankConfig?.blanks.length]);

  // Essay子问题相关
  const handleAddSubQuestion = () => {
    const subQuestions = task.subQuestions || [];
    const newSubQuestion: SubQuestion = {
      id: generateId('subq'),
      order: subQuestions.length + 1,
      title: '',
      points: 5,
      type: 'essay'
    };
    onUpdate({ subQuestions: [...subQuestions, newSubQuestion] });
  };

  const handleUpdateSubQuestion = (subQId: string, updates: Partial<SubQuestion>) => {
    if (!task.subQuestions) return;
    onUpdate({
      subQuestions: task.subQuestions.map(sq =>
        sq.id === subQId ? { ...sq, ...updates } : sq
      )
    });
  };

  const handleDeleteSubQuestion = (subQId: string) => {
    if (!task.subQuestions) return;
    onUpdate({
      subQuestions: task.subQuestions.filter(sq => sq.id !== subQId)
    });
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ '--type-color': TYPE_COLORS[task.type] } as React.CSSProperties}
    >
      {/* 顶部栏 */}
      <div className={styles.topBar}>
        <div className={styles.leftSection}>
          <div className={styles.dragHandle}>⋮⋮</div>
          <span className={styles.taskIndex}>{index + 1}</span>
          <div className={styles.typeChip} style={{ backgroundColor: TYPE_COLORS[task.type] }}>
            {libraryItem?.icon} {libraryItem?.label}
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.pointsDisplay}>
            <input
              type="number"
              value={task.points}
              onChange={(e) => onUpdate({ points: parseInt(e.target.value) || 0 })}
              onClick={(e) => e.stopPropagation()}
              min="0"
              className={styles.pointsInput}
            />
            <span>分</span>
          </div>
          <button onClick={onDuplicate} className={styles.actionBtn} title="复制">📋</button>
          <button onClick={onDelete} className={styles.actionBtn} title="删除">🗑️</button>
        </div>
      </div>

      {/* 主体内容 */}
      <div className={styles.cardContent}>
        {/* 题干输入 */}
        <input
          type="text"
          className={styles.titleInput}
          value={task.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="点击输入题目"
        />
        
        {/* 只有essay和其他类型才显示说明输入 */}
        {task.type !== 'quiz' && task.type !== 'fill-blank' && (
          <textarea
            className={styles.instructionsInput}
            value={task.instructions || ''}
            onChange={(e) => onUpdate({ instructions: e.target.value })}
            placeholder="输入题目说明（可选）"
            rows={2}
          />
        )}

        {/* 选择题编辑 */}
        {task.type === 'quiz' && (
          <div className={styles.quizSection}>
            <div className={styles.typeSelector}>
              <select
                value={task.quizConfig?.type || 'single'}
                onChange={(e) => handleQuizTypeChange(e.target.value as any)}
                className={styles.typeSelect}
              >
                <option value="single">单选题</option>
                <option value="multiple">多选题</option>
                <option value="true-false">判断题</option>
              </select>
            </div>

            {task.quizConfig && task.quizConfig.options.length > 0 ? (
              <>
                <div className={styles.optionsList}>
                  {task.quizConfig.options.map((option, idx) => (
                    <div key={option.id} className={styles.optionRow}>
                      <input
                        type={task.quizConfig?.type === 'multiple' ? 'checkbox' : 'radio'}
                        checked={task.quizConfig?.correctAnswer?.includes(idx)}
                        onChange={() => handleCorrectAnswerToggle(idx)}
                        className={styles.optionCheckbox}
                      />
                      <span className={styles.optionLabel}>{String.fromCharCode(65 + idx)}.</span>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                        placeholder={`选项 ${String.fromCharCode(65 + idx)}`}
                        className={styles.optionInput}
                      />
                      {task.quizConfig?.type !== 'true-false' && (task.quizConfig?.options.length ?? 0) > 2 && (
                        <button onClick={() => handleRemoveOption(option.id)} className={styles.removeBtn}>
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {task.quizConfig?.type !== 'true-false' && (
                  <button onClick={handleAddOption} className={styles.addOptionBtn}>
                    ➕ 添加选项
                  </button>
                )}
              </>
            ) : (
              <div className={styles.emptyOptions}>
                <p>暂无选项</p>
                <button onClick={handleAddOption} className={styles.addOptionBtn}>
                  ➕ 添加第一个选项
                </button>
              </div>
            )}
          </div>
        )}

        {/* 填空题编辑 */}
        {task.type === 'fill-blank' && (
          <div className={styles.fillBlankSection} ref={fillBlankContainerRef}>
            <div className={styles.fillBlankHeader}>
              <div className={styles.helpText}>
                💡 在 <code>{'{{}}'}</code> 中直接写答案，如 <code>{'{{H2O|水}}'}</code>
              </div>
              <button 
                type="button"
                className={styles.insertBlankBtn} 
                onClick={handleInsertBlank}
                title="在光标位置插入空格"
              >
                ➕ 插入空格
              </button>
            </div>

            {!isFillBlankEditMode && task.fillBlankConfig?.content && task.fillBlankConfig.blanks.length > 0 ? (
              <div 
                className={styles.fillBlankPreview}
                onClick={() => setIsFillBlankEditMode(true)}
              >
                <div className={styles.previewContent}>
                  {task.fillBlankConfig.content.split(/(\{\{[^}]+\}\})/g).map((part, index) => {
                    const match = part.match(/\{\{([^}]+)\}\}/);
                    if (match) {
                      return (
                        <input
                          key={index}
                          type="text"
                          className={styles.previewBlankInput}
                          placeholder="___"
                          readOnly
                          title="点击进入编辑模式"
                        />
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>
                <div className={styles.previewHint}>
                  👁️ 预览模式 · 点击任意处编辑
                </div>
              </div>
            ) : (
              <textarea
                ref={fillBlankTextareaRef}
                value={task.fillBlankConfig?.content || ''}
                onChange={(e) => handleFillBlankContentChange(e.target.value)}
                onFocus={() => setIsFillBlankEditMode(true)}
                placeholder="请输入题目内容，例如：水的化学式是 {{H2O|水}}"
                className={styles.fillBlankInput}
                rows={4}
              />
            )}
            
            {task.fillBlankConfig && task.fillBlankConfig.blanks.length > 0 && (
              <div className={styles.blanksAnswers}>
                <div className={styles.answersTitle}>
                  空格答案与分值 
                  <span className={styles.blanksCount}>({task.fillBlankConfig.blanks.length}个空格)</span>
                </div>
                {task.fillBlankConfig.blanks.map((blank) => (
                  <div key={blank.id} className={styles.blankRow}>
                    <span className={styles.blankLabel}>空格{blank.index}</span>
                    <input
                      type="text"
                      value={blank.answers.join(' | ')}
                      onChange={(e) => handleBlankAnswerChange(blank.id, e.target.value)}
                      placeholder="多个答案用 | 分隔"
                      className={styles.blankAnswerInput}
                    />
                    <input
                      type="number"
                      value={blank.points}
                      onChange={(e) => {
                        if (!task.fillBlankConfig) return;
                        onUpdate({
                          fillBlankConfig: {
                            ...task.fillBlankConfig,
                            blanks: task.fillBlankConfig.blanks.map(b =>
                              b.id === blank.id ? { ...b, points: parseInt(e.target.value) || 0 } : b
                            )
                          }
                        });
                      }}
                      min="0"
                      className={styles.blankPointsInput}
                    />
                    <span className={styles.blankPointsLabel}>分</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Essay子问题 */}
        {task.type === 'essay' && (
          <div className={styles.subQuestionsSection}>
            <div className={styles.subQuestionsHeader}>
              <span className={styles.subQuestionsTitle}>
                子问题设置 
                {task.subQuestions && task.subQuestions.length > 0 && (
                  <span className={styles.subQuestionsCount}>({task.subQuestions.length}个)</span>
                )}
              </span>
              <button 
                type="button"
                onClick={handleAddSubQuestion} 
                className={styles.addSubQuestionBtn}
              >
                ➕ 添加子问题
              </button>
            </div>

            {task.subQuestions && task.subQuestions.length > 0 && (
              <div className={styles.subQuestionsList}>
                {task.subQuestions.map((subQ, idx) => (
                  <div key={subQ.id} className={styles.subQuestionItem}>
                    <div className={styles.subQuestionTop}>
                      <span className={styles.subQuestionNumber}>{idx + 1}.</span>
                      <input
                        type="text"
                        value={subQ.title}
                        onChange={(e) => handleUpdateSubQuestion(subQ.id, { title: e.target.value })}
                        placeholder={`第${idx + 1}小题`}
                        className={styles.subQuestionInput}
                      />
                      <input
                        type="number"
                        value={subQ.points}
                        onChange={(e) => handleUpdateSubQuestion(subQ.id, { points: parseInt(e.target.value) || 0 })}
                        min="0"
                        className={styles.subQuestionPoints}
                      />
                      <span className={styles.subQuestionPointsLabel}>分</span>
                      <button 
                        onClick={() => handleDeleteSubQuestion(subQ.id)} 
                        className={styles.deleteSubQuestionBtn}
                        title="删除"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
