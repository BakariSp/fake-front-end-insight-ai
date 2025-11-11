'use client';

import { QuizConfig, QuizOption } from '../types';
import { generateId } from '../mockData';
import styles from './QuizEditor.module.css';

interface QuizEditorProps {
  config: QuizConfig;
  onChange: (config: QuizConfig) => void;
}

export default function QuizEditor({ config, onChange }: QuizEditorProps) {
  const handleTypeChange = (type: 'single' | 'multiple' | 'true-false') => {
    let newOptions = config.options;
    let newCorrectAnswer = config.correctAnswer || [];
    
    if (type === 'true-false') {
      newOptions = [
        { id: generateId('opt'), text: '正确', isCorrect: false },
        { id: generateId('opt'), text: '错误', isCorrect: false }
      ];
      newCorrectAnswer = [];
    } else {
      // 同步现有选项的isCorrect状态
      newOptions = config.options.map((opt, idx) => ({
        ...opt,
        isCorrect: newCorrectAnswer.includes(idx)
      }));
    }
    
    onChange({ ...config, type, options: newOptions, correctAnswer: newCorrectAnswer });
  };

  const handleAddOption = () => {
    const newOption: QuizOption = {
      id: generateId('opt'),
      text: `选项${String.fromCharCode(65 + config.options.length)}`,
      isCorrect: false
    };
    onChange({ ...config, options: [...config.options, newOption] });
  };

  const handleRemoveOption = (id: string) => {
    if (config.options.length <= 2) {
      alert('至少需要保留2个选项');
      return;
    }
    
    // 找到要删除的选项索引
    const removeIndex = config.options.findIndex(opt => opt.id === id);
    const newOptions = config.options.filter(opt => opt.id !== id);
    
    // 更新正确答案索引：删除对应索引，并调整后续索引
    const newCorrectAnswer = (config.correctAnswer || [])
      .filter(idx => idx !== removeIndex)  // 移除被删除选项的索引
      .map(idx => idx > removeIndex ? idx - 1 : idx);  // 调整后续索引
    
    // 更新新选项的isCorrect字段
    const updatedOptions = newOptions.map((opt, idx) => ({
      ...opt,
      isCorrect: newCorrectAnswer.includes(idx)
    }));
    
    onChange({ ...config, options: updatedOptions, correctAnswer: newCorrectAnswer });
  };

  const handleOptionTextChange = (id: string, text: string) => {
    const newOptions = config.options.map(opt =>
      opt.id === id ? { ...opt, text } : opt
    );
    onChange({ ...config, options: newOptions });
  };

  const handleCorrectAnswerToggle = (index: number) => {
    const correctAnswer = config.correctAnswer || [];
    let newCorrectAnswer: number[];
    
    if (config.type === 'single' || config.type === 'true-false') {
      // 单选或判断题：只能有一个正确答案
      newCorrectAnswer = [index];
    } else {
      // 多选题：可以有多个正确答案
      newCorrectAnswer = correctAnswer.includes(index)
        ? correctAnswer.filter(i => i !== index)
        : [...correctAnswer, index];
    }
    
    // 同步更新options中的isCorrect字段
    const newOptions = config.options.map((opt, idx) => ({
      ...opt,
      isCorrect: newCorrectAnswer.includes(idx)
    }));
    
    onChange({ ...config, correctAnswer: newCorrectAnswer, options: newOptions });
  };

  return (
    <div className={styles.quizEditor}>
      <div className={styles.typeSelector}>
        <label>题型</label>
        <div className={styles.typeButtons}>
          <button
            className={`${styles.typeButton} ${config.type === 'single' ? styles.active : ''}`}
            onClick={() => handleTypeChange('single')}
          >
            单选题
          </button>
          <button
            className={`${styles.typeButton} ${config.type === 'multiple' ? styles.active : ''}`}
            onClick={() => handleTypeChange('multiple')}
          >
            多选题
          </button>
          <button
            className={`${styles.typeButton} ${config.type === 'true-false' ? styles.active : ''}`}
            onClick={() => handleTypeChange('true-false')}
          >
            判断题
          </button>
        </div>
      </div>

      <div className={styles.optionsList}>
        <label>选项设置</label>
        {config.options.map((option, index) => (
          <div key={option.id} className={styles.optionItem}>
            <div className={styles.optionLeft}>
              <input
                type={config.type === 'multiple' ? 'checkbox' : 'radio'}
                checked={config.correctAnswer?.includes(index)}
                onChange={() => handleCorrectAnswerToggle(index)}
                name="correct-answer"
              />
              <span className={styles.optionLabel}>
                {String.fromCharCode(65 + index)}
              </span>
            </div>
            <input
              type="text"
              className={styles.optionInput}
              value={option.text}
              onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
              placeholder={`选项 ${String.fromCharCode(65 + index)}`}
            />
            {config.type !== 'true-false' && config.options.length > 2 && (
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveOption(option.id)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {config.type !== 'true-false' && (
        <button className={styles.addButton} onClick={handleAddOption}>
          + 添加选项
        </button>
      )}

      <div className={styles.explanation}>
        <label>答案解析（可选）</label>
        <textarea
          value={config.explanation || ''}
          onChange={(e) => onChange({ ...config, explanation: e.target.value })}
          placeholder="为学生提供答案解析..."
          rows={3}
        />
      </div>

      <div className={styles.preview}>
        <div className={styles.previewLabel}>正确答案预览：</div>
        {config.correctAnswer && config.correctAnswer.length > 0 ? (
          <div className={styles.correctAnswers}>
            {config.correctAnswer.map(i => (
              <span key={i} className={styles.correctBadge}>
                {String.fromCharCode(65 + i)}
              </span>
            ))}
          </div>
        ) : (
          <span className={styles.noAnswer}>请选择正确答案</span>
        )}
      </div>
    </div>
  );
}

