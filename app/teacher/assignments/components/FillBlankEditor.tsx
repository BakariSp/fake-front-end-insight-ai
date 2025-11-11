'use client';

import React from 'react';
import { FillBlankConfig } from '../types';
import { generateId } from '../mockData';
import styles from './FillBlankEditor.module.css';

interface FillBlankEditorProps {
  config: FillBlankConfig;
  onChange: (config: FillBlankConfig) => void;
}

export default function FillBlankEditor({ config, onChange }: FillBlankEditorProps) {
  // 有内容且有空格时默认显示预览，否则显示编辑
  const [isEditMode, setIsEditMode] = React.useState(
    !config.content || config.blanks.length === 0
  );
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleContentChange = (content: string) => {
    // 只支持 {{答案}} 格式：如 {{H2O}} 或 {{H2O|水}}
    const answerMatches = content.match(/\{\{([^}]+)\}\}/g) || [];
    const newBlanks: any[] = [];
    
    answerMatches.forEach((match, index) => {
      const innerContent = match.replace(/\{\{|\}\}/g, '');
      // 直接包含答案，支持 | 分隔多个答案
      const answers = innerContent.split('|').map(a => a.trim()).filter(a => a);
      const blankIndex = index + 1;
      const existingBlank = config.blanks.find(b => b.index === blankIndex);
      
      newBlanks.push({
        id: existingBlank?.id || generateId('blank'),
        index: blankIndex,
        answers: answers.length > 0 ? answers : [''],
        points: existingBlank?.points || 2
      });
    });
    
    onChange({ ...config, content, blanks: newBlanks });
  };

  // 插入空格按钮
  const handleInsertBlank = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 如果不在编辑模式，先切换到编辑模式
    if (!isEditMode) {
      setIsEditMode(true);
      setTimeout(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.focus();
        const cursorPos = textarea.value.length;
        const blankText = ` {{答案}}`;
        const newContent = textarea.value + blankText;
        handleContentChange(newContent);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos + 3, cursorPos + 5);
        }, 0);
      }, 0);
      return;
    }

    const cursorPos = textarea.selectionStart;
    const textBefore = config.content.substring(0, cursorPos);
    const textAfter = config.content.substring(cursorPos);
    
    const blankText = `{{答案}}`;
    const newContent = textBefore + blankText + textAfter;
    
    handleContentChange(newContent);
    
    // 设置光标位置到{{}}内部，方便直接输入答案
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPos + 2; // 光标放在{{和}}之间
      textarea.setSelectionRange(newCursorPos, newCursorPos + 2); // 选中"答案"文字
    }, 0);
  };

  // 点击预览区域，切换到编辑模式
  const handlePreviewClick = () => {
    setIsEditMode(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  // 监听点击外部事件，自动切换到预览模式
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // 点击外部，如果有内容则切换到预览模式
        if (config.content && config.blanks.length > 0) {
          setIsEditMode(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [config.content, config.blanks.length]);

  // 失去焦点时切换到预览模式
  const handleBlur = (e: React.FocusEvent) => {
    // 检查新焦点是否还在容器内
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
        if (config.content && config.blanks.length > 0) {
          setIsEditMode(false);
        }
      }
    }, 100);
  };

  const handleBlankAnswerChange = (blankId: string, answers: string) => {
    const newBlanks = config.blanks.map(blank =>
      blank.id === blankId
        ? { ...blank, answers: answers.split('|').map(a => a.trim()).filter(a => a) }
        : blank
    );
    onChange({ ...config, blanks: newBlanks });
  };

  const handleBlankPointsChange = (blankId: string, points: number) => {
    const newBlanks = config.blanks.map(blank =>
      blank.id === blankId ? { ...blank, points } : blank
    );
    onChange({ ...config, blanks: newBlanks });
  };

  return (
    <div className={styles.fillBlankEditor}>
      <div className={styles.exampleBox}>
        <div className={styles.exampleTitle}>📖 填空题使用说明</div>
        <div className={styles.singleMethod}>
          <div className={styles.methodExample}>
            <strong>示例：</strong>水的化学式是 <code>{'{{H2O|水}}'}</code> ，由 <code>{'{{氢|H}}'}</code> 和 <code>{'{{氧|O}}'}</code> 组成。
          </div>
          <div className={styles.methodTips}>
            <div className={styles.tip}>💡 在 <code>{'{{}}'}</code> 中直接写答案，多个答案用 <code>|</code> 分隔</div>
            <div className={styles.tip}>✨ 点击下方按钮快速插入空格，系统自动切换编辑/预览模式</div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection} ref={containerRef} onBlur={handleBlur}>
        <div className={styles.contentHeader}>
          <label>题目内容</label>
          <button 
            type="button"
            className={styles.insertButton} 
            onClick={handleInsertBlank}
            title="在光标位置插入空格"
          >
            ➕ 插入空格
          </button>
        </div>
        
        {!isEditMode && config.content && config.blanks.length > 0 ? (
          <div 
            className={styles.previewContainer}
            onClick={handlePreviewClick}
          >
            <div className={styles.previewContent}>
              {config.content.split(/(\{\{[^}]+\}\})/g).map((part, index) => {
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
            ref={textareaRef}
            value={config.content}
            onChange={(e) => handleContentChange(e.target.value)}
            onFocus={() => setIsEditMode(true)}
            placeholder="请输入题目内容，例如：水的化学式是 {{H2O|水}}&#10;点击上方【插入空格】按钮快速添加"
            rows={6}
            className={styles.textarea}
          />
        )}
      </div>

      {config.blanks.length > 0 && (
        <div className={styles.blanksSection}>
          <div className={styles.blanksSectionHeader}>
            <label>空格答案与分值设置</label>
            <span className={styles.blanksCount}>{config.blanks.length} 个空格</span>
          </div>
          {config.blanks.map((blank, index) => (
            <div key={blank.id} className={styles.blankItem}>
              <div className={styles.blankHeader}>
                <span className={styles.blankNumber}>空格 {blank.index}</span>
                <div className={styles.blankPoints}>
                  <label>分值：</label>
                  <input
                    type="number"
                    value={blank.points}
                    onChange={(e) => handleBlankPointsChange(blank.id, parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
              <div className={styles.blankAnswers}>
                <div className={styles.answerLabel}>正确答案：</div>
                <input
                  type="text"
                  value={blank.answers.join(' | ')}
                  onChange={(e) => handleBlankAnswerChange(blank.id, e.target.value)}
                  placeholder="多个答案用 | 分隔"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.optionsSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={config.caseSensitive}
            onChange={(e) => onChange({ ...config, caseSensitive: e.target.checked })}
          />
          <span>区分大小写</span>
        </label>
      </div>
    </div>
  );
}

