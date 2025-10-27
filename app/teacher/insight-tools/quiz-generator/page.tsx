'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card } from '@ui';
import { useRouter } from 'next/navigation';
import styles from './quizGenerator.module.css';

// Question type options with SVG icons
const QUESTION_TYPES = [
  { 
    id: 'single-choice', 
    name: 'Single Choice', 
    nameZh: '单选题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="10" r="3" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'multiple-choice', 
    name: 'Multiple Choice', 
    nameZh: '多选题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'true-false', 
    name: 'True/False', 
    nameZh: '判断题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'short-answer', 
    name: 'Short Answer', 
    nameZh: '简答题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M3 6h14M3 10h10M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'fill-blank', 
    name: 'Fill in Blank', 
    nameZh: '填空题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="8" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="8" width="5" height="4" rx="1" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'matching', 
    name: 'Matching', 
    nameZh: '配对题',
    category: 'basic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="5" cy="5" r="2" fill="currentColor"/>
        <circle cx="15" cy="15" r="2" fill="currentColor"/>
        <path d="M7 5h6M7 15h6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  { 
    id: 'ordering', 
    name: 'Ordering', 
    nameZh: '排序题',
    category: 'advanced',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M3 6h14M3 10h10M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4v12m-2-2l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'audio-response', 
    name: 'Audio Response', 
    nameZh: '语音回答',
    category: 'advanced',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="8" y="3" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 9c0 2.761 2.239 5 5 5s5-2.239 5-5M10 14v3m-3 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'video-response', 
    name: 'Video Response', 
    nameZh: '视频回答',
    category: 'advanced',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 8l4-2v8l-4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'essay', 
    name: 'Essay', 
    nameZh: '论述题',
    category: 'advanced',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 8h8M6 11h8M6 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
];

const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', nameZh: '简单', color: '#10B981' },
  { id: 'medium', name: 'Medium', nameZh: '中等', color: '#F59E0B' },
  { id: 'hard', name: 'Hard', nameZh: '困难', color: '#EF4444' },
];

interface QuestionPart {
  id: string;
  questionCount: number;
  questionTypes: string[];
  difficulty: string;
}

interface GeneratedQuestion {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

export default function QuizGeneratorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [quizDescription, setQuizDescription] = useState('');
  const [parts, setParts] = useState<QuestionPart[]>([
    {
      id: '1',
      questionCount: 10,
      questionTypes: ['single-choice', 'multiple-choice'],
      difficulty: 'medium',
    },
  ]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.typeSelector}`)) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdownId]);

  const addPart = () => {
    const newPart: QuestionPart = {
      id: Date.now().toString(),
      questionCount: 5,
      questionTypes: ['single-choice'],
      difficulty: 'medium',
    };
    setParts([...parts, newPart]);
  };

  const removePart = (id: string) => {
    if (parts.length > 1) {
      setParts(parts.filter(part => part.id !== id));
    }
  };

  const updatePart = (id: string, field: keyof QuestionPart, value: any) => {
    setParts(parts.map(part => 
      part.id === id ? { ...part, [field]: value } : part
    ));
  };

  const toggleQuestionType = (partId: string, typeId: string) => {
    setParts(parts.map(part => {
      if (part.id === partId) {
        const types = part.questionTypes.includes(typeId)
          ? part.questionTypes.length > 1 
            ? part.questionTypes.filter(t => t !== typeId)
            : part.questionTypes
          : [...part.questionTypes, typeId];
        return { ...part, questionTypes: types };
      }
      return part;
    }));
  };

  const handleGenerate = () => {
    if (!quizDescription.trim()) {
      alert('Please describe your quiz first');
      return;
    }
    
    setIsGenerating(true);
    
    // Mock generation
    setTimeout(() => {
      const mockQuestions: GeneratedQuestion[] = [
        {
          id: '1',
          type: 'single-choice',
          question: 'What is the capital of France?',
          options: ['London', 'Berlin', 'Paris', 'Madrid'],
          correctAnswer: 'Paris',
          explanation: 'Paris is the capital and largest city of France.',
          difficulty: 'easy',
        },
        {
          id: '2',
          type: 'multiple-choice',
          question: 'Which of the following are programming languages?',
          options: ['Python', 'HTML', 'JavaScript', 'CSS'],
          correctAnswer: 'Python, JavaScript',
          explanation: 'Python and JavaScript are programming languages, while HTML and CSS are markup/styling languages.',
          difficulty: 'medium',
        },
        {
          id: '3',
          type: 'true-false',
          question: 'The Earth is flat.',
          correctAnswer: 'False',
          explanation: 'The Earth is roughly spherical in shape.',
          difficulty: 'easy',
        },
        {
          id: '4',
          type: 'short-answer',
          question: 'Explain the water cycle in 2-3 sentences.',
          correctAnswer: 'The water cycle describes how water evaporates from the surface, rises into the atmosphere, cools and condenses into clouds, and falls back to the surface as precipitation.',
          explanation: 'This is a standard description of the water cycle process.',
          difficulty: 'medium',
        },
        {
          id: '5',
          type: 'matching',
          question: 'Match the countries with their capitals',
          options: ['Japan - Tokyo', 'Italy - Rome', 'Canada - Ottawa'],
          correctAnswer: 'All matched correctly',
          explanation: 'These are the capital cities of the respective countries.',
          difficulty: 'easy',
        },
      ];
      
      setGeneratedQuestions(mockQuestions);
      setIsGenerating(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true);
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const removeFile = () => {
    setFileUploaded(false);
    setUploadedFileName('');
  };

  const deleteQuestion = (id: string) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const editQuestion = (id: string, field: string, value: string) => {
    setGeneratedQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handlePublish = () => {
    if (!dueDate) {
      alert('Please select a due date');
      return;
    }
    alert('Quiz published successfully! 测验发布成功！');
    router.back();
  };

  const getTypeIcon = (typeId: string) => {
    return QUESTION_TYPES.find(t => t.id === typeId)?.icon || null;
  };

  const getTypeName = (typeId: string) => {
    return QUESTION_TYPES.find(t => t.id === typeId)?.name || typeId;
  };

  const toggleDropdown = (partId: string) => {
    setOpenDropdownId(openDropdownId === partId ? null : partId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-8 6 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 12h12M10 16h8M10 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Quiz Generator</h1>
            <p className={styles.titleZh}>测验生成器</p>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${currentStep >= 1 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <span className={styles.stepLabel}>Configure</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.step} ${currentStep >= 2 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <span className={styles.stepLabel}>Review</span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {currentStep === 1 ? (
          // STEP 1: Configure Quiz
          <>
            {/* Description */}
            <Card className={styles.descriptionCard}>
              <div className={styles.cardHeader}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2 className={styles.cardTitle}>Quiz Description</h2>
              </div>
              <p className={styles.cardSubtitle}>Describe what you'd like the quiz to cover <span className={styles.required}>*</span></p>
              <textarea
                className={styles.textarea}
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="e.g., SAT grammar practice, World War II timeline quiz, algebra equations..."
                rows={3}
              />
            </Card>

            {/* File Upload (Optional) */}
            <Card className={styles.uploadCard}>
              <div className={styles.uploadArea}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M14 32h20M24 22v10m-8-18h16a4 4 0 014 4v16a4 4 0 01-4 4H16a4 4 0 01-4-4V18a4 4 0 014-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={styles.uploadText}>
                  Drag files here or <span className={styles.linkText}>Browse</span>
                </p>
                <p className={styles.uploadSubtext}>Optional: Upload source materials (PDF, DOCX, TXT)</p>
                <input
                  type="file"
                  className={styles.fileInput}
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.txt"
                />
              </div>
              {fileUploaded && (
                <div className={styles.uploadedFile}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 2h8l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{uploadedFileName}</span>
                  <button className={styles.removeFile} onClick={removeFile}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </Card>

            {/* Question Configuration */}
            <div className={styles.partsSection}>
              <h2 className={styles.sectionTitle}>Question Configuration</h2>
              
              {parts.map((part, index) => (
                <Card key={part.id} className={styles.partCard}>
                  <div className={styles.partHeader}>
                    <h3 className={styles.partTitle}>Part {index + 1}</h3>
                    {parts.length > 1 && (
                      <button className={styles.removePartBtn} onClick={() => removePart(part.id)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7h10M8 7V5a1 1 0 011-1h2a1 1 0 011 1v2m-5 3v5m4-5v5M7 7v9a1 1 0 001 1h4a1 1 0 001-1V7H7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Compact Layout */}
                  <div className={styles.partGrid}>
                    {/* Question Count */}
                    <div className={styles.partField}>
                      <label className={styles.partLabel}>Questions</label>
                      <div className={styles.numberInput}>
                        <button className={styles.numberBtn} onClick={() => updatePart(part.id, 'questionCount', Math.max(1, part.questionCount - 1))}>−</button>
                        <input type="number" value={part.questionCount} onChange={(e) => updatePart(part.id, 'questionCount', parseInt(e.target.value) || 1)} className={styles.numberValue} min="1" />
                        <button className={styles.numberBtn} onClick={() => updatePart(part.id, 'questionCount', part.questionCount + 1)}>+</button>
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className={styles.partField}>
                      <label className={styles.partLabel}>Difficulty</label>
                      <div className={styles.difficultyButtons}>
                        {DIFFICULTY_LEVELS.map((level) => (
                          <button
                            key={level.id}
                            className={`${styles.difficultyBtn} ${part.difficulty === level.id ? styles.active : ''}`}
                            onClick={() => updatePart(part.id, 'difficulty', level.id)}
                            style={{
                              borderColor: part.difficulty === level.id ? level.color : '#E5E7EB',
                              backgroundColor: part.difficulty === level.id ? `${level.color}15` : 'white',
                              color: part.difficulty === level.id ? level.color : '#6B7280',
                            }}
                          >
                            {level.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Question Types - Multi-select Dropdown */}
                  <div className={styles.partField}>
                    <label className={styles.partLabel}>Question Types</label>
                    <div className={styles.typeSelector}>
                      {/* Selected Types Display */}
                      <div 
                        className={styles.selectedTypes}
                        onClick={() => toggleDropdown(part.id)}
                      >
                        {part.questionTypes.length === 0 ? (
                          <span className={styles.placeholder}>Select question types...</span>
                        ) : (
                          <div className={styles.selectedTypesList}>
                            {part.questionTypes.map(typeId => {
                              const type = QUESTION_TYPES.find(t => t.id === typeId);
                              return type ? (
                                <div key={typeId} className={styles.selectedTypeBadge}>
                                  {type.icon}
                                  <span>{type.name}</span>
                                  <button
                                    className={styles.removeType}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleQuestionType(part.id, typeId);
                                    }}
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.dropdownIcon}>
                          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Dropdown Menu */}
                      {openDropdownId === part.id && (
                        <div className={styles.typeDropdown}>
                          <div className={styles.typeCategory}>
                            <div className={styles.categoryTitle}>Basic Types</div>
                            {QUESTION_TYPES.filter(t => t.category === 'basic').map((type) => (
                              <div
                                key={type.id}
                                className={`${styles.typeOption} ${part.questionTypes.includes(type.id) ? styles.selected : ''}`}
                                onClick={() => toggleQuestionType(part.id, type.id)}
                              >
                                <div className={styles.typeCheckbox}>
                                  {part.questionTypes.includes(type.id) && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <div className={styles.typeIconWrapper}>{type.icon}</div>
                                <div className={styles.typeInfo}>
                                  <div className={styles.typeOptionName}>{type.name}</div>
                                  <div className={styles.typeOptionNameZh}>{type.nameZh}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className={styles.typeDivider}></div>

                          <div className={styles.typeCategory}>
                            <div className={styles.categoryTitle}>Advanced Types</div>
                            {QUESTION_TYPES.filter(t => t.category === 'advanced').map((type) => (
                              <div
                                key={type.id}
                                className={`${styles.typeOption} ${part.questionTypes.includes(type.id) ? styles.selected : ''}`}
                                onClick={() => toggleQuestionType(part.id, type.id)}
                              >
                                <div className={styles.typeCheckbox}>
                                  {part.questionTypes.includes(type.id) && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <div className={styles.typeIconWrapper}>{type.icon}</div>
                                <div className={styles.typeInfo}>
                                  <div className={styles.typeOptionName}>{type.name}</div>
                                  <div className={styles.typeOptionNameZh}>{type.nameZh}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <button className={styles.addPartBtn} onClick={addPart}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Another Part
              </button>
            </div>

            {/* Generate Button */}
            <Button
              variant="primary"
              className={styles.generateButton}
              onClick={handleGenerate}
              disabled={!quizDescription.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner}></span>
                  Generating Quiz...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l2 6 6 1-5 4 2 6-5-3-5 3 2-6-5-4 6-1 2-6z" fill="currentColor"/>
                  </svg>
                  Generate Quiz with AI
                </>
              )}
            </Button>
          </>
        ) : (
          // STEP 2: Review Generated Questions
          <>
            <div className={styles.reviewHeader}>
              <h2 className={styles.reviewTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Review Generated Questions
              </h2>
              <p className={styles.reviewSubtitle}>{generatedQuestions.length} questions generated</p>
            </div>

            {/* Questions List */}
            <div className={styles.questionsList}>
              {generatedQuestions.map((question, index) => (
                <Card key={question.id} className={styles.questionCard}>
                  <div className={styles.questionHeader}>
                    <div className={styles.questionNumber}>Q{index + 1}</div>
                    <div className={styles.questionMeta}>
                      <span className={styles.typeBadge}>
                        {getTypeIcon(question.type)}
                        {QUESTION_TYPES.find(t => t.id === question.type)?.name}
                      </span>
                      <span className={`${styles.difficultyBadge} ${styles[question.difficulty]}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <button className={styles.deleteBtn} onClick={() => deleteQuestion(question.id)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7h10M8 7V5a1 1 0 011-1h2a1 1 0 011 1v2m-5 3v5m4-5v5M7 7v9a1 1 0 001 1h4a1 1 0 001-1V7H7z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>

                  <div className={styles.questionContent}>
                    <div className={styles.questionText}>{question.question}</div>
                    
                    {question.options && (
                      <div className={styles.optionsList}>
                        {question.options.map((option, i) => (
                          <div key={i} className={styles.option}>
                            <span className={styles.optionLabel}>{String.fromCharCode(65 + i)}.</span>
                            {option}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={styles.answerSection}>
                      <div className={styles.correctAnswer}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3 3 7-7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <strong>Answer:</strong> {question.correctAnswer}
                      </div>
                      <div className={styles.explanation}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 6v4M8 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{question.explanation}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Publish Section */}
            <Card className={styles.publishCard}>
              <div className={styles.publishHeader}>
                <h3 className={styles.publishTitle}>Ready to Publish?</h3>
                <div className={styles.dueDateField}>
                  <label className={styles.dueDateLabel}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Due Date <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.publishActions}>
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Edit
                </Button>
                <Button variant="primary" onClick={handlePublish} disabled={!dueDate}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 8l-6 6-6-6M8 2v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Publish Quiz
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
