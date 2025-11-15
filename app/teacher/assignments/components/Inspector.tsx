'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Task, SubmissionMethod, EssayConfig, RubricDimension } from '../types';
import { TOPIC_TAGS, SUBJECTS } from '../mockData';
import RubricEditor from './RubricEditor';
import styles from './Inspector.module.css';

interface InspectorProps {
  task: Task;
  onUpdateTask: (updates: Partial<Task>) => void;
  onClose: () => void;
}

type TabType = 'basics' | 'submission' | 'advanced';

const SUBMISSION_METHODS: { value: SubmissionMethod; label: string; icon: string }[] = [
  { value: 'typein', label: '文字输入', icon: '⌨️' },
  { value: 'handwriting', label: '手写', icon: '✍️' },
  { value: 'image', label: '图片上传', icon: '📷' },
  { value: 'audio', label: '音频录制', icon: '🎤' },
  { value: 'video', label: '视频录制', icon: '🎥' },
  { value: 'file', label: '文件上传', icon: '📎' }
];

export default function Inspector({ task, onUpdateTask, onClose }: InspectorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basics');
  const [topicInput, setTopicInput] = useState('');
  const [customDimensions, setCustomDimensions] = useState<RubricDimension[] | undefined>();
  const topicInputRef = useRef<HTMLInputElement>(null);

  const handleSubmissionMethodToggle = (method: SubmissionMethod) => {
    const methods = task.submissionMethods.includes(method)
      ? task.submissionMethods.filter(m => m !== method)
      : [...task.submissionMethods, method];
    
    if (methods.length > 0) {
      onUpdateTask({ submissionMethods: methods });
    }
  };

  const handleTopicToggle = (topic: string) => {
    const topics = task.topics || [];
    const newTopics = topics.includes(topic)
      ? topics.filter(t => t !== topic)
      : [...topics, topic];
    onUpdateTask({ topics: newTopics });
  };

  const handleAddTopic = (topic: string) => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) return;
    
    const topics = task.topics || [];
    if (!topics.includes(trimmedTopic)) {
      onUpdateTask({ topics: [...topics, trimmedTopic] });
    }
    setTopicInput('');
  };

  const handleRemoveTopic = (topic: string) => {
    const topics = task.topics || [];
    onUpdateTask({ topics: topics.filter(t => t !== topic) });
  };

  const handleTopicKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTopic(topicInput);
    }
  };

  // 获取当前任务类型对应的科目主题
  const currentSubject = SUBJECTS[0].value; // 这里简化处理，实际应从assignment获取
  const availableTopics = TOPIC_TAGS[currentSubject] || [];

  return (
    <div className={styles.inspector}>
      <div className={styles.header}>
        <h3>任务属性</h3>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'basics' ? styles.active : ''}`}
          onClick={() => setActiveTab('basics')}
        >
          基本信息
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'submission' ? styles.active : ''}`}
          onClick={() => setActiveTab('submission')}
        >
          提交方式
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'advanced' ? styles.active : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          高级选项
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'basics' && (
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label>任务标题</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => onUpdateTask({ title: e.target.value })}
                placeholder="输入任务标题"
              />
            </div>

            <div className={styles.formGroup}>
              <label>说明</label>
              <textarea
                value={task.instructions || ''}
                onChange={(e) => onUpdateTask({ instructions: e.target.value })}
                placeholder="输入任务说明和要求"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>分值</label>
              <input
                type="number"
                value={task.points}
                onChange={(e) => onUpdateTask({ points: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            {/* 评分标准选择器 - 仅对主观题显示 */}
            {(task.type === 'essay' || task.type === 'scan' || task.type === 'audio' || 
              task.type === 'video' || task.type === 'file') && (
              <RubricEditor
                selectedRubricId={task.rubricId}
                onSelectRubric={(rubricId) => onUpdateTask({ rubricId })}
                customDimensions={customDimensions}
                onUpdateDimensions={setCustomDimensions}
                showPromptEditor={true}
              />
            )}

            {/* 写作题详细编辑 */}
            {task.type === 'essay' && (
              <div className={styles.formGroup}>
                <label>答案类型</label>
                <div className={styles.answerTypeButtons}>
                  <button
                    className={`${styles.answerTypeButton} ${
                      (task.essayConfig?.answerType || 'long') === 'short' ? styles.active : ''
                    }`}
                    onClick={() => onUpdateTask({
                      essayConfig: {
                        ...task.essayConfig,
                        answerType: 'short',
                        minLength: 10,
                        maxLength: 200,
                        placeholder: '请简要回答...'
                      } as EssayConfig
                    })}
                  >
                    <div className={styles.answerTypeIcon}>📝</div>
                    <div className={styles.answerTypeLabel}>短答案</div>
                    <div className={styles.answerTypeDesc}>10-200字</div>
                  </button>
                  <button
                    className={`${styles.answerTypeButton} ${
                      (task.essayConfig?.answerType || 'long') === 'long' ? styles.active : ''
                    }`}
                    onClick={() => onUpdateTask({
                      essayConfig: {
                        ...task.essayConfig,
                        answerType: 'long',
                        minLength: 100,
                        maxLength: 1000,
                        placeholder: '请详细作答...'
                      } as EssayConfig
                    })}
                  >
                    <div className={styles.answerTypeIcon}>📄</div>
                    <div className={styles.answerTypeLabel}>长答案</div>
                    <div className={styles.answerTypeDesc}>100-1000字</div>
                  </button>
                </div>
                {task.essayConfig && (
                  <div className={styles.lengthConfig}>
                    <div className={styles.lengthInput}>
                      <label>最小字数</label>
                      <input
                        type="number"
                        value={task.essayConfig.minLength || 0}
                        onChange={(e) => onUpdateTask({
                          essayConfig: {
                            answerType: task.essayConfig?.answerType || 'long',
                            ...task.essayConfig,
                            minLength: parseInt(e.target.value) || 0
                          } as EssayConfig
                        })}
                        min="0"
                      />
                    </div>
                    <div className={styles.lengthInput}>
                      <label>最大字数</label>
                      <input
                        type="number"
                        value={task.essayConfig.maxLength || 1000}
                        onChange={(e) => onUpdateTask({
                          essayConfig: {
                            answerType: task.essayConfig?.answerType || 'long',
                            ...task.essayConfig,
                            maxLength: parseInt(e.target.value) || 1000
                          } as EssayConfig
                        })}
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>主题标签</label>
              
              {/* 已选择的标签 */}
              {task.topics && task.topics.length > 0 && (
                <div className={styles.selectedTopics}>
                  {task.topics.map(topic => (
                    <div key={topic} className={styles.topicTag}>
                      <span>{topic}</span>
                      <button
                        type="button"
                        className={styles.removeTopicBtn}
                        onClick={() => handleRemoveTopic(topic)}
                        title="移除标签"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 添加标签输入框 */}
              <div className={styles.addTopicContainer}>
                <input
                  ref={topicInputRef}
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={handleTopicKeyDown}
                  placeholder="输入自定义标签，按回车添加"
                  className={styles.topicInput}
                />
                <button
                  type="button"
                  className={styles.addTopicBtn}
                  onClick={() => handleAddTopic(topicInput)}
                  disabled={!topicInput.trim()}
                >
                  ➕ 添加
                </button>
              </div>

              {/* 预设标签快速选择 */}
              <div className={styles.presetTopics}>
                <div className={styles.presetLabel}>快速选择：</div>
                <div className={styles.presetGrid}>
                  {availableTopics
                    .filter(topic => !task.topics?.includes(topic))
                    .map(topic => (
                      <button
                        key={topic}
                        type="button"
                        className={styles.presetTopicBtn}
                        onClick={() => handleAddTopic(topic)}
                      >
                        + {topic}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submission' && (
          <div className={styles.section}>
            {task.type === 'quiz' && (
              <div className={styles.infoBox}>
                <span className={styles.infoIcon}>ℹ️</span>
                <span>选择题无需额外的提交方式，学生通过选择选项直接作答。</span>
              </div>
            )}
            
            {task.type === 'fill-blank' && (
              <div className={styles.infoBox}>
                <span className={styles.infoIcon}>⌨️</span>
                <span>填空题默认使用文字输入，学生在每个空格处直接输入答案，简单快捷。</span>
              </div>
            )}
            
            {task.type === 'essay' && (
              <div className={styles.infoBox}>
                <span className={styles.infoIcon}>✍️</span>
                <span>问答题默认使用手写作答（平板手写或纸张拍照），确保最佳作答体验。</span>
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label>提交方式（可多选）</label>
              <div className={styles.methodGrid}>
                {SUBMISSION_METHODS.map(method => (
                  <label
                    key={method.value}
                    className={`${styles.methodCard} ${
                      task.submissionMethods.includes(method.value) ? styles.selected : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.submissionMethods.includes(method.value)}
                      onChange={() => handleSubmissionMethodToggle(method.value)}
                    />
                    <span className={styles.methodIcon}>{method.icon}</span>
                    <span className={styles.methodLabel}>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {task.submissionMethods.includes('file') && (
              <div className={styles.formGroup}>
                <label>最多上传文件数</label>
                <input
                  type="number"
                  value={task.submissionConfig?.maxFiles || 1}
                  onChange={(e) => onUpdateTask({
                    submissionConfig: {
                      ...task.submissionConfig,
                      maxFiles: parseInt(e.target.value) || 1
                    }
                  })}
                  min="1"
                  max="10"
                />
              </div>
            )}

            {(task.submissionMethods.includes('audio') || task.submissionMethods.includes('video')) && (
              <div className={styles.formGroup}>
                <label>最长时长（秒）</label>
                <input
                  type="number"
                  value={task.submissionConfig?.maxDurationSec || 300}
                  onChange={(e) => onUpdateTask({
                    submissionConfig: {
                      ...task.submissionConfig,
                      maxDurationSec: parseInt(e.target.value) || 300
                    }
                  })}
                  min="30"
                  max="3600"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label className={styles.switchLabel}>
                <input
                  type="checkbox"
                  checked={task.allowResubmit || false}
                  onChange={(e) => onUpdateTask({ allowResubmit: e.target.checked })}
                />
                <span>允许重新提交</span>
              </label>
            </div>

            {task.allowResubmit && (
              <div className={styles.formGroup}>
                <label>重交次数限制</label>
                <input
                  type="number"
                  value={task.resubmitLimit || 1}
                  onChange={(e) => onUpdateTask({ resubmitLimit: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="10"
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>可见范围</label>
              <select
                value={task.audience?.type || 'class'}
                onChange={(e) => onUpdateTask({
                  audience: { type: e.target.value as any }
                })}
              >
                <option value="class">全班可见</option>
                <option value="group">指定小组</option>
                <option value="students">指定学生</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

