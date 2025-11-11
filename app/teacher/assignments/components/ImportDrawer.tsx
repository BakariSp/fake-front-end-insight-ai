'use client';

import { useState } from 'react';
import { Task } from '../types';
import { createDefaultTask, RESOURCE_LIBRARY_ITEMS } from '../mockData';
import styles from './ImportDrawer.module.css';

interface ImportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (tasks: Task[]) => void;
  tasks: Task[];  // 用于获取当前任务数量
}

type ImportMethod = 'ocr' | 'resource' | 'ai' | 'google-form';

export default function ImportDrawer({ isOpen, onClose, onImport, tasks }: ImportDrawerProps) {
  const [selectedMethod, setSelectedMethod] = useState<ImportMethod>('ocr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    // 模拟文件上传和OCR处理
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // 模拟延迟
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // 生成模拟任务
      const mockTasks: Task[] = [
        {
          ...createDefaultTask('quiz', 0),
          title: 'OCR识别：选择题 1-5',
          instructions: '从文档中识别的选择题',
          meta: { confidence: 0.85 }
        },
        {
          ...createDefaultTask('essay', 1),
          title: 'OCR识别：简答题 1',
          instructions: '从文档中识别的简答题',
          meta: { confidence: 0.65, conflict: true }
        }
      ];

      setTimeout(() => {
        onImport(mockTasks);
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }, 2000);
  };

  const handleAIGenerate = () => {
    setIsProcessing(true);
    setProgress(0);

    // 模拟AI生成
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      const mockTasks: Task[] = [
        {
          ...createDefaultTask('quiz', 0),
          title: 'AI生成：函数基础概念测试',
          instructions: '测试学生对函数定义域、值域的理解'
        },
        {
          ...createDefaultTask('essay', 1),
          title: 'AI生成：函数应用问题',
          instructions: '请解释函数单调性在实际问题中的应用'
        }
      ];

      setTimeout(() => {
        onImport(mockTasks);
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h3>导入任务</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.methods}>
            <button
              className={`${styles.methodButton} ${selectedMethod === 'ocr' ? styles.active : ''}`}
              onClick={() => setSelectedMethod('ocr')}
            >
              📄 PDF/图片 OCR
            </button>
            <button
              className={`${styles.methodButton} ${selectedMethod === 'resource' ? styles.active : ''}`}
              onClick={() => setSelectedMethod('resource')}
            >
              📚 资源库
            </button>
            <button
              className={`${styles.methodButton} ${selectedMethod === 'ai' ? styles.active : ''}`}
              onClick={() => setSelectedMethod('ai')}
            >
              🤖 AI 生成
            </button>
            <button
              className={`${styles.methodButton} ${selectedMethod === 'google-form' ? styles.active : ''}`}
              onClick={() => setSelectedMethod('google-form')}
            >
              📋 Google Form
            </button>
          </div>

          <div className={styles.methodContent}>
            {selectedMethod === 'ocr' && (
              <div className={styles.ocrSection}>
                <h4>上传文件进行 OCR 识别</h4>
                <p className={styles.description}>
                  支持 PDF、JPG、PNG 格式，系统将自动识别文档中的题目
                </p>
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileUpload}
                    disabled={isProcessing}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>📁</div>
                    <div className={styles.uploadText}>
                      {isProcessing ? '处理中...' : '点击选择文件或拖拽文件到此处'}
                    </div>
                  </label>
                </div>
                {isProcessing && (
                  <div className={styles.progress}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                    <div className={styles.progressText}>{progress}%</div>
                  </div>
                )}
                <div className={styles.tips}>
                  <strong>💡 提示：</strong>
                  <ul>
                    <li>清晰的扫描件识别率更高</li>
                    <li>支持批量上传多个文件</li>
                    <li>识别后可在冲突面板中修正</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedMethod === 'resource' && (
              <div className={styles.resourceSection}>
                <h4>从资源库选择</h4>
                <p className={styles.description}>
                  浏览和导入已有的题目和任务模板
                </p>
                
                <div className={styles.resourceTabs}>
                  <button className={styles.resourceTab + ' ' + styles.active}>
                    选择题
                  </button>
                  <button className={styles.resourceTab}>
                    填空题
                  </button>
                  <button className={styles.resourceTab}>
                    写作题
                  </button>
                </div>

                <div className={styles.resourceList}>
                  {/* 使用真实数据渲染 */}
                  {RESOURCE_LIBRARY_ITEMS.quiz.map((item: any) => (
                    <div key={item.id} className={styles.resourceItem}>
                      <div className={styles.resourceHeader}>
                        <h5>{item.title}</h5>
                        <span className={styles.usageCount}>
                          使用 {item.usageCount} 次
                        </span>
                      </div>
                      <p className={styles.resourceInstructions}>
                        {item.instructions}
                      </p>
                      <div className={styles.resourceFooter}>
                        <div className={styles.resourceTags}>
                          {item.topics?.map((topic: string) => (
                            <span key={topic} className={styles.tag}>{topic}</span>
                          ))}
                        </div>
                        <button 
                          className={styles.addResourceButton}
                          onClick={() => {
                            const newTask = createDefaultTask(item.type, tasks.length);
                            onImport([{
                              ...newTask,
                              title: item.title,
                              instructions: item.instructions,
                              points: item.points,
                              topics: item.topics,
                              quizConfig: item.quizConfig,
                              fillBlankConfig: item.fillBlankConfig
                            }]);
                          }}
                        >
                          + 添加
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMethod === 'ai' && (
              <div className={styles.aiSection}>
                <h4>AI 智能生成</h4>
                <p className={styles.description}>
                  根据主题和要求，让AI帮你生成题目
                </p>
                <div className={styles.formGroup}>
                  <label>主题</label>
                  <input type="text" placeholder="例如：函数的定义域和值域" />
                </div>
                <div className={styles.formGroup}>
                  <label>难度</label>
                  <select>
                    <option>简单</option>
                    <option>中等</option>
                    <option>困难</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>题目数量</label>
                  <input type="number" defaultValue={5} min={1} max={20} />
                </div>
                <button 
                  className={styles.primaryButton}
                  onClick={handleAIGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing ? '生成中...' : '开始生成'}
                </button>
                {isProcessing && (
                  <div className={styles.progress}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                    <div className={styles.progressText}>{progress}%</div>
                  </div>
                )}
              </div>
            )}

            {selectedMethod === 'google-form' && (
              <div className={styles.googleFormSection}>
                <h4>导入 Google Form</h4>
                <p className={styles.description}>
                  粘贴 Google Form 链接，自动导入题目
                </p>
                <div className={styles.formGroup}>
                  <label>Google Form 链接</label>
                  <input type="url" placeholder="https://docs.google.com/forms/..." />
                </div>
                <button className={styles.primaryButton}>导入</button>
                <div className={styles.tips}>
                  <strong>💡 注意：</strong>
                  <ul>
                    <li>需要表单的查看权限</li>
                    <li>支持单选、多选、简答、段落等题型</li>
                    <li>导入后可以继续编辑</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

