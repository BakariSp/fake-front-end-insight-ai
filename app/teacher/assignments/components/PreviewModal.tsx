'use client';

import { useState } from 'react';
import { Task, TaskType } from '../types';
import { LIBRARY_ITEMS } from '../mockData';
import styles from './PreviewModal.module.css';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

const TYPE_COLORS: Record<TaskType, string> = {
  quiz: '#4f7fff',
  'fill-blank': '#6b8aff',
  essay: '#3d6fe8',
  scan: '#5a7dff',
  audio: '#7a9bff',
  video: '#2e5fdb',
  file: '#6b7280',
  group: '#6b8aff'
};

// 答案状态类型
interface TaskAnswer {
  taskId: string;
  quizAnswer?: number[];  // 选择题答案
  fillBlankAnswers?: Record<number, string>;  // 填空题答案 {空格索引: 答案}
  submitted?: boolean;
  isCorrect?: boolean;
  score?: number;
}

export default function PreviewModal({ isOpen, onClose, tasks }: PreviewModalProps) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, TaskAnswer>>({});
  const [showResult, setShowResult] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentTask = tasks[selectedTaskIndex];
  const libraryItem = currentTask ? LIBRARY_ITEMS.find(item => item.type === currentTask.type) : null;
  const currentAnswer = currentTask ? answers[currentTask.id] : undefined;
  const currentShowResult = currentTask ? showResult[currentTask.id] : false;

  // 处理选择题选项点击
  const handleQuizOptionChange = (optionIndex: number) => {
    if (!currentTask || currentAnswer?.submitted) return;

    const isMultiple = currentTask.quizConfig?.type === 'multiple';
    const currentSelection = currentAnswer?.quizAnswer || [];

    let newSelection: number[];
    if (isMultiple) {
      // 多选：toggle选项
      if (currentSelection.includes(optionIndex)) {
        newSelection = currentSelection.filter(i => i !== optionIndex);
      } else {
        newSelection = [...currentSelection, optionIndex];
      }
    } else {
      // 单选：替换选项
      newSelection = [optionIndex];
    }

    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        taskId: currentTask.id,
        quizAnswer: newSelection,
        submitted: false
      }
    }));
  };

  // 处理填空题输入
  const handleFillBlankChange = (blankIndex: number, value: string) => {
    if (!currentTask || currentAnswer?.submitted) return;

    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        taskId: currentTask.id,
        fillBlankAnswers: {
          ...(prev[currentTask.id]?.fillBlankAnswers || {}),
          [blankIndex]: value
        },
        submitted: false
      }
    }));
  };

  // 提交答案并判断
  const handleSubmit = () => {
    if (!currentTask || !currentAnswer) return;

    let isCorrect = false;
    let score = 0;

    // 判断选择题
    if (currentTask.type === 'quiz' && currentTask.quizConfig) {
      const correctAnswers = (currentTask.quizConfig.correctAnswer || []).sort();
      const userAnswers = (currentAnswer.quizAnswer || []).sort();
      
      isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
      score = isCorrect ? currentTask.points : 0;
    }

    // 判断填空题
    if (currentTask.type === 'fill-blank' && currentTask.fillBlankConfig) {
      const blanks = currentTask.fillBlankConfig.blanks;
      let correctCount = 0;

      blanks.forEach(blank => {
        const userAnswer = currentAnswer.fillBlankAnswers?.[blank.index]?.trim() || '';
        const correctAnswers = blank.answers.map(a => 
          currentTask.fillBlankConfig?.caseSensitive ? a : a.toLowerCase()
        );
        const checkAnswer = currentTask.fillBlankConfig?.caseSensitive 
          ? userAnswer 
          : userAnswer.toLowerCase();

        if (correctAnswers.includes(checkAnswer)) {
          correctCount++;
          score += blank.points;
        }
      });

      isCorrect = correctCount === blanks.length;
    }

    // 更新答案状态
    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        submitted: true,
        isCorrect,
        score
      }
    }));

    // 显示结果
    setShowResult(prev => ({
      ...prev,
      [currentTask.id]: true
    }));
  };

  // 重新作答
  const handleRetry = () => {
    if (!currentTask) return;

    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: {
        taskId: currentTask.id,
        submitted: false
      }
    }));

    setShowResult(prev => ({
      ...prev,
      [currentTask.id]: false
    }));
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3>学生端预览</h3>
            <span className={styles.badge}>预览模式</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* 左侧任务列表 */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h4>任务列表</h4>
              <span className={styles.taskCount}>{tasks.length} 个任务</span>
            </div>
            <div className={styles.taskList}>
              {tasks.map((task, index) => {
                const item = LIBRARY_ITEMS.find(i => i.type === task.type);
                return (
                  <button
                    key={task.id}
                    className={`${styles.taskItem} ${index === selectedTaskIndex ? styles.active : ''}`}
                    onClick={() => setSelectedTaskIndex(index)}
                    style={{ '--type-color': TYPE_COLORS[task.type] } as React.CSSProperties}
                  >
                    <span className={styles.taskNumber}>{index + 1}</span>
                    <span className={styles.taskIcon}>{item?.icon}</span>
                    <div className={styles.taskInfo}>
                      <div className={styles.taskTitle}>{task.title}</div>
                      <div className={styles.taskPoints}>{task.points} 分</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右侧预览区 */}
          <div className={styles.preview}>
            {currentTask ? (
              <>
                <div className={styles.previewHeader}>
                  <div className={styles.typeChip} style={{ background: TYPE_COLORS[currentTask.type] }}>
                    {libraryItem?.icon} {libraryItem?.label}
                  </div>
                  <div className={styles.pointsBadge}>{currentTask.points} 分</div>
                </div>

                <h2 className={styles.taskTitle}>{currentTask.title}</h2>

                {/* 只有非quiz和非fill-blank类型才显示说明 */}
                {currentTask.instructions && currentTask.type !== 'quiz' && currentTask.type !== 'fill-blank' && (
                  <div className={styles.instructions}>
                    <strong>说明：</strong>
                    <p>{currentTask.instructions}</p>
                  </div>
                )}

                {/* Quiz题目预览 */}
                {currentTask.type === 'quiz' && currentTask.quizConfig && (
                  <div className={styles.quizPreview}>
                    {currentShowResult && (
                      <div className={currentAnswer?.isCorrect ? styles.resultCorrect : styles.resultWrong}>
                        <div className={styles.resultHeader}>
                          <span className={styles.resultIcon}>
                            {currentAnswer?.isCorrect ? '✓' : '✗'}
                          </span>
                          <span className={styles.resultText}>
                            {currentAnswer?.isCorrect ? '回答正确！' : '回答错误'}
                          </span>
                          <span className={styles.resultScore}>
                            得分：{currentAnswer?.score || 0} / {currentTask.points}
                          </span>
                        </div>
                        {currentTask.quizConfig.explanation && (
                          <div className={styles.explanation}>
                            <strong>解析：</strong>
                            {currentTask.quizConfig.explanation}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className={styles.quizOptions}>
                      {currentTask.quizConfig.options.map((option, index) => {
                        const isSelected = currentAnswer?.quizAnswer?.includes(index);
                        const isCorrectOption = currentTask.quizConfig?.correctAnswer?.includes(index) || false;
                        const showCorrectness = currentShowResult;
                        
                        return (
                          <label 
                            key={option.id} 
                            className={`${styles.quizOption} 
                              ${isSelected ? styles.selected : ''} 
                              ${showCorrectness && isCorrectOption ? styles.correctOption : ''} 
                              ${showCorrectness && isSelected && !isCorrectOption ? styles.wrongOption : ''}
                              ${currentAnswer?.submitted ? styles.disabled : ''}`}
                            onClick={() => !currentAnswer?.submitted && handleQuizOptionChange(index)}
                          >
                            <input
                              type={currentTask.quizConfig!.type === 'multiple' ? 'checkbox' : 'radio'}
                              name={`quiz-answer-${currentTask.id}`}
                              checked={isSelected}
                              onChange={() => {}}
                              disabled={currentAnswer?.submitted}
                            />
                            <span className={styles.optionLetter}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className={styles.optionText}>{option.text}</span>
                            {showCorrectness && isCorrectOption && (
                              <span className={styles.correctMark}>✓</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                    
                    <div className={styles.submitActions}>
                      {!currentAnswer?.submitted ? (
                        <>
                          <button className={styles.draftButton}>保存草稿</button>
                          <button 
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            disabled={!currentAnswer?.quizAnswer || currentAnswer.quizAnswer.length === 0}
                          >
                            提交答案
                          </button>
                        </>
                      ) : (
                        <button className={styles.retryButton} onClick={handleRetry}>
                          重新作答
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 填空题预览 - 文字输入模式 */}
                {currentTask.type === 'fill-blank' && currentTask.fillBlankConfig && (
                  <div className={styles.fillBlankPreview}>
                    {currentShowResult && (
                      <div className={currentAnswer?.isCorrect ? styles.resultCorrect : styles.resultWrong}>
                        <div className={styles.resultHeader}>
                          <span className={styles.resultIcon}>
                            {currentAnswer?.isCorrect ? '✓' : '✗'}
                          </span>
                          <span className={styles.resultText}>
                            {currentAnswer?.isCorrect ? '全部正确！' : '部分或全部错误'}
                          </span>
                          <span className={styles.resultScore}>
                            得分：{currentAnswer?.score || 0} / {currentTask.points}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className={styles.fillBlankQuestion}>
                      {currentTask.fillBlankConfig.content.split(/(\{\{[^}]+\}\})/g).map((part, partIndex) => {
                        const match = part.match(/\{\{([^}]+)\}\}/);
                        if (match) {
                          // 找到对应的blank配置
                          const blankIndex = currentTask.fillBlankConfig!.blanks.findIndex(
                            b => b.index === partIndex
                          );
                          const blank = currentTask.fillBlankConfig!.blanks[blankIndex];
                          
                          if (!blank) {
                            return (
                              <input
                                key={partIndex}
                                type="text"
                                className={styles.blankInput}
                                placeholder="___"
                                disabled
                              />
                            );
                          }
                          
                          const userAnswer = currentAnswer?.fillBlankAnswers?.[blank.index] || '';
                          const isCorrect = currentShowResult && blank.answers.some(ans => {
                            const checkAns = currentTask.fillBlankConfig?.caseSensitive 
                              ? userAnswer 
                              : userAnswer.toLowerCase();
                            const correctAns = currentTask.fillBlankConfig?.caseSensitive 
                              ? ans 
                              : ans.toLowerCase();
                            return checkAns.trim() === correctAns.trim();
                          });
                          
                          return (
                            <input
                              key={partIndex}
                              type="text"
                              className={`${styles.blankInput} 
                                ${currentShowResult ? (isCorrect ? styles.correctInput : styles.wrongInput) : ''}`}
                              placeholder="___"
                              value={userAnswer}
                              onChange={(e) => handleFillBlankChange(blank.index, e.target.value)}
                              disabled={currentAnswer?.submitted}
                            />
                          );
                        }
                        return <span key={partIndex}>{part}</span>;
                      })}
                    </div>
                    
                    {currentShowResult && currentTask.fillBlankConfig.blanks.length > 0 && (
                      <div className={styles.correctAnswersBox}>
                        <strong>正确答案：</strong>
                        <div className={styles.answersList}>
                          {currentTask.fillBlankConfig.blanks.map((blank, idx) => (
                            <div key={blank.id} className={styles.answerItem}>
                              <span className={styles.answerLabel}>空格 {idx + 1}：</span>
                              <span className={styles.answerValue}>
                                {blank.answers.join(' / ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className={styles.submitActions}>
                      {!currentAnswer?.submitted ? (
                        <>
                          <button className={styles.draftButton}>保存草稿</button>
                          <button 
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            disabled={!currentAnswer?.fillBlankAnswers || 
                              Object.keys(currentAnswer.fillBlankAnswers).length === 0}
                          >
                            提交答案
                          </button>
                        </>
                      ) : (
                        <button className={styles.retryButton} onClick={handleRetry}>
                          重新作答
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 子问题预览 - 每个子问题独立手写区域 */}
                {currentTask.subQuestions && currentTask.subQuestions.length > 0 && (
                  <div className={styles.subQuestionsPreview}>
                    <h4 className={styles.subQuestionsTitle}>子问题</h4>
                    {currentTask.subQuestions.map((subQ, index) => (
                      <div key={subQ.id} className={styles.subQuestionPreviewItem}>
                        <div className={styles.subQuestionHeader}>
                          <span className={styles.subQuestionNum}>{index + 1}.</span>
                          <span className={styles.subQuestionTitle}>{subQ.title}</span>
                          <span className={styles.subQuestionPoints}>({subQ.points}分)</span>
                        </div>
                        <div className={styles.subQuestionAnswerArea}>
                          <div className={styles.handwritingCanvas}>
                            <div className={styles.canvasPlaceholder}>
                              <div className={styles.canvasIcon}>✍️</div>
                              <div className={styles.canvasText}>在此手写作答</div>
                              <div className={styles.canvasHint}>支持Apple Pencil或触控笔</div>
                            </div>
                          </div>
                          <div className={styles.subQuestionTools}>
                            <button className={styles.uploadPhotoBtn} disabled>📷 拍照上传</button>
                            <div className={styles.toolsGroup}>
                              <button className={styles.toolBtnSmall} disabled>🖊️</button>
                              <button className={styles.toolBtnSmall} disabled>🧹</button>
                              <button className={styles.toolBtnSmall} disabled>↩️</button>
                              <button className={styles.toolBtnSmall} disabled>🗑️</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className={styles.submitActions}>
                      <button className={styles.draftButton} disabled>保存草稿</button>
                      <button className={styles.submitButton} disabled>提交作业</button>
                    </div>
                  </div>
                )}

                {/* Essay作答区域 - 手写为主 */}
                {currentTask.type === 'essay' && (!currentTask.subQuestions || currentTask.subQuestions.length === 0) && (
                  <div className={styles.essayAnswerArea}>
                    <div className={styles.answerArea}>
                      <div className={styles.answerAreaHeader}>
                        <h4>作答区域</h4>
                        <button className={styles.uploadPhotoBtn} disabled>
                          📷 拍照上传
                        </button>
                      </div>
                      <div className={styles.handwritingCanvas}>
                        <div className={styles.canvasPlaceholder}>
                          <div className={styles.canvasIcon}>✍️</div>
                          <div className={styles.canvasText}>在此手写作答</div>
                          <div className={styles.canvasHint}>
                            {currentTask.essayConfig?.answerType === 'short' 
                              ? '简要回答 · 支持Apple Pencil或触控笔' 
                              : '详细作答 · 支持Apple Pencil或触控笔'}
                          </div>
                        </div>
                      </div>
                      <div className={styles.canvasTools}>
                        <div className={styles.toolsLeft}>
                          <button className={styles.toolBtn} disabled>🖊️ 画笔</button>
                          <button className={styles.toolBtn} disabled>🧹 橡皮</button>
                          <button className={styles.toolBtn} disabled>↩️ 撤销</button>
                        </div>
                        <button className={styles.clearBtn} disabled>🗑️ 清空</button>
                      </div>
                    </div>
                    
                    <div className={styles.submitActions}>
                      <button className={styles.draftButton} disabled>保存草稿</button>
                      <button className={styles.submitButton} disabled>提交作业</button>
                    </div>
                  </div>
                )}

                {/* 其他提交方式预览 - 仅用于非quiz、非fill-blank、非essay类型 */}
                {currentTask.submissionMethods.length > 0 && 
                 currentTask.type !== 'quiz' && 
                 currentTask.type !== 'fill-blank' && 
                 currentTask.type !== 'essay' &&
                 (!currentTask.subQuestions || currentTask.subQuestions.length === 0) && (
                  <div className={styles.submissionArea}>
                    <h4>提交方式</h4>
                    <div className={styles.submissionMethods}>
                    {currentTask.submissionMethods.map(method => (
                      <div key={method} className={styles.methodPreview}>
                        {method === 'audio' && (
                          <div className={styles.audioPreview}>
                            <label>音频录制</label>
                            <div className={styles.recorder}>
                              🎤 点击开始录音
                            </div>
                          </div>
                        )}
                        {method === 'video' && (
                          <div className={styles.videoPreview}>
                            <label>视频录制</label>
                            <div className={styles.recorder}>
                              🎥 点击开始录像
                            </div>
                          </div>
                        )}
                        {method === 'file' && (
                          <div className={styles.filePreview}>
                            <label>文件上传</label>
                            <div className={styles.uploadBox}>
                              📎 点击或拖拽上传文件
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    </div>

                    <div className={styles.submitActions}>
                      <button className={styles.draftButton} disabled>保存草稿</button>
                      <button className={styles.submitButton} disabled>提交作业</button>
                    </div>
                  </div>
                )}

                {/* 附加信息 */}
                <div className={styles.additionalInfo}>
                  {currentTask.allowResubmit && (
                    <div className={styles.infoItem}>
                      ✓ 允许重新提交
                      {currentTask.resubmitLimit && ` (最多${currentTask.resubmitLimit}次)`}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <p>没有任务可预览</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <button
              className={styles.navButton}
              onClick={() => setSelectedTaskIndex(Math.max(0, selectedTaskIndex - 1))}
              disabled={selectedTaskIndex === 0}
            >
              ← 上一个
            </button>
            <span className={styles.navInfo}>
              {selectedTaskIndex + 1} / {tasks.length}
            </span>
            <button
              className={styles.navButton}
              onClick={() => setSelectedTaskIndex(Math.min(tasks.length - 1, selectedTaskIndex + 1))}
              disabled={selectedTaskIndex === tasks.length - 1}
            >
              下一个 →
            </button>
          </div>
          <button className={styles.closeButtonFooter} onClick={onClose}>
            关闭预览
          </button>
        </div>
      </div>
    </>
  );
}

