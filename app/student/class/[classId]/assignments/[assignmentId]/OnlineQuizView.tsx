'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@ui';
import type { Assignment, QuizQuestion } from '@data/mockData';
import styles from './assignmentDetail.module.css';

interface OnlineQuizViewProps {
  assignment: Assignment;
  isUrgent: boolean;
  daysLeft: number;
}

const OnlineQuizView: React.FC<OnlineQuizViewProps> = ({ assignment, isUrgent, daysLeft }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(assignment.duration ? assignment.duration * 60 : 0); // in seconds
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Record<string, File[]>>({});
  const [inputMode, setInputMode] = useState<'type' | 'write' | 'upload'>('type'); // Input mode for open-ended questions
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);

  const questions = assignment.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle single choice answer
  const handleSingleChoice = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });
  };

  // Handle multiple choice answer
  const handleMultipleChoice = (option: string) => {
    const currentAnswer = (answers[currentQuestion.id] as string[]) || [];
    const newAnswer = currentAnswer.includes(option)
      ? currentAnswer.filter(o => o !== option)
      : [...currentAnswer, option];
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswer,
    });
  };

  // Handle open-ended answer
  const handleOpenEnded = (text: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: { text, images: uploadedImages[currentQuestion.id] || [] },
    });
  };

  // Handle image upload for open-ended questions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedImages({
        ...uploadedImages,
        [currentQuestion.id]: [...(uploadedImages[currentQuestion.id] || []), ...files],
      });
      
      // Update answer with images
      const currentText = typeof answers[currentQuestion.id] === 'object' 
        ? answers[currentQuestion.id].text 
        : answers[currentQuestion.id] || '';
      
      setAnswers({
        ...answers,
        [currentQuestion.id]: { 
          text: currentText, 
          images: [...(uploadedImages[currentQuestion.id] || []), ...files] 
        },
      });
    }
  };

  // Remove uploaded image
  const handleRemoveImage = (imageIndex: number) => {
    const currentImages = uploadedImages[currentQuestion.id] || [];
    const newImages = currentImages.filter((_, i) => i !== imageIndex);
    
    setUploadedImages({
      ...uploadedImages,
      [currentQuestion.id]: newImages,
    });

    const currentText = typeof answers[currentQuestion.id] === 'object' 
      ? answers[currentQuestion.id].text 
      : answers[currentQuestion.id] || '';
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: { text: currentText, images: newImages },
    });
  };

  // Canvas drawing functions
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    saveCanvasState();
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory([...canvasHistory, imageData]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
  };

  const undoCanvas = () => {
    if (canvasHistory.length <= 1) {
      clearCanvas();
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const newHistory = canvasHistory.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setCanvasHistory(newHistory);
    }
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `handwriting-${currentQuestion.id}.png`, { type: 'image/png' });
        const currentImages = uploadedImages[currentQuestion.id] || [];
        
        setUploadedImages({
          ...uploadedImages,
          [currentQuestion.id]: [...currentImages, file],
        });
        
        setAnswers({
          ...answers,
          [currentQuestion.id]: { 
            text: 'Handwritten answer', 
            images: [...currentImages, file],
            mode: 'write'
          },
        });
      }
    });
  };

  // Initialize canvas when switching to write mode
  React.useEffect(() => {
    if (inputMode === 'write') {
      setTimeout(() => initCanvas(), 100);
    }
  }, [inputMode, currentQuestionIndex]);

  // Handle voice recording
  const handleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Mock recording - in real app, use Web Audio API
      setTimeout(() => {
        setIsRecording(false);
        setAnswers({
          ...answers,
          [currentQuestion.id]: { type: 'voice', duration: '1:32', recorded: true },
        });
      }, 2000);
    }
  };

  // Handle video recording
  const handleVideoRecording = () => {
    // Mock video recording
    alert('Video recording would start here. In real app, use MediaRecorder API.');
    setAnswers({
      ...answers,
      [currentQuestion.id]: { type: 'video', duration: '3:45', recorded: true },
    });
  };

  // Navigation
  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    if (confirm('Are you sure you want to submit? You cannot change your answers after submission.')) {
      setIsSubmitted(true);
      alert('Quiz submitted successfully! (This is a mock action)');
    }
  };

  // Render question based on type
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'single_choice':
        return (
          <div className={styles.questionOptions}>
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${
                  answers[currentQuestion.id] === option ? styles.selected : ''
                }`}
                onClick={() => handleSingleChoice(option)}
              >
                <div className={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </div>
                <div className={styles.optionText}>{option}</div>
                <div className={styles.optionRadio}>
                  {answers[currentQuestion.id] === option && (
                    <div className={styles.radioSelected}></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'multiple_choice':
        const currentMultiple = (answers[currentQuestion.id] as string[]) || [];
        return (
          <div className={styles.questionOptions}>
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${
                  currentMultiple.includes(option) ? styles.selected : ''
                }`}
                onClick={() => handleMultipleChoice(option)}
              >
                <div className={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </div>
                <div className={styles.optionText}>{option}</div>
                <div className={styles.optionCheckbox}>
                  {currentMultiple.includes(option) && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
            <p className={styles.multipleHint}>Select all that apply</p>
          </div>
        );

      case 'open_ended':
        const currentAnswer = answers[currentQuestion.id];
        const textValue = typeof currentAnswer === 'object' ? currentAnswer.text : currentAnswer || '';
        const currentImages = uploadedImages[currentQuestion.id] || [];
        
        return (
          <div className={styles.openEndedSection}>
            {/* Input Mode Selector */}
            <div className={styles.inputModeSelector}>
              <button
                className={`${styles.modeButton} ${inputMode === 'type' ? styles.modeButtonActive : ''}`}
                onClick={() => setInputMode('type')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="5" width="14" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="13" width="12" height="2" rx="1" fill="currentColor"/>
                </svg>
                <span>Type In</span>
              </button>
              <button
                className={`${styles.modeButton} ${inputMode === 'write' ? styles.modeButtonActive : ''}`}
                onClick={() => setInputMode('write')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" fill="currentColor"/>
                </svg>
                <span>Write</span>
              </button>
              <button
                className={`${styles.modeButton} ${inputMode === 'upload' ? styles.modeButtonActive : ''}`}
                onClick={() => setInputMode('upload')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Upload</span>
              </button>
            </div>

            {/* Type In Mode */}
            {inputMode === 'type' && (
              <>
                <textarea
                  className={styles.openEndedInput}
                  placeholder="Type your answer here... Show your work and explain your reasoning."
                  value={textValue}
                  onChange={(e) => handleOpenEnded(e.target.value)}
                  rows={8}
                />
                <div className={styles.textCount}>
                  {textValue.length} characters
                </div>
              </>
            )}

            {/* Write Mode (Canvas) */}
            {inputMode === 'write' && (
              <div className={styles.canvasSection}>
                <div className={styles.canvasToolbar}>
                  <div className={styles.toolGroup}>
                    <label className={styles.toolLabel}>Brush Size:</label>
                    <div className={styles.brushSizeSelector}>
                      {[1, 2, 4, 6].map(size => (
                        <button
                          key={size}
                          className={`${styles.brushSizeButton} ${brushSize === size ? styles.active : ''}`}
                          onClick={() => setBrushSize(size)}
                          title={`Size ${size}px`}
                        >
                          <div 
                            className={styles.brushSizePreview} 
                            style={{ width: `${size * 2 + 4}px`, height: `${size * 2 + 4}px` }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.toolGroup}>
                    <label className={styles.toolLabel}>Color:</label>
                    <div className={styles.colorSelector}>
                      {['#000000', '#FF0000', '#0000FF', '#00AA00'].map(color => (
                        <button
                          key={color}
                          className={`${styles.colorButton} ${brushColor === color ? styles.active : ''}`}
                          onClick={() => setBrushColor(color)}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.toolActions}>
                    <button className={styles.toolActionButton} onClick={undoCanvas} title="Undo">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 7h10a4 4 0 014 4v0a4 4 0 01-4 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M6 4L3 7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Undo
                    </button>
                    <button className={styles.toolActionButton} onClick={clearCanvas} title="Clear All">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Clear
                    </button>
                    <button 
                      className={`${styles.toolActionButton} ${styles.saveButton}`} 
                      onClick={saveCanvasAsImage}
                      title="Save Drawing"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M15 11v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M13 6L9 2 5 6M9 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Save Drawing
                    </button>
                  </div>
                </div>
                <canvas
                  ref={canvasRef}
                  className={styles.drawingCanvas}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <p className={styles.canvasHint}>
                  ✏️ Draw your answer above. Perfect for iPad with Apple Pencil!
                </p>
              </div>
            )}

            {/* Upload Mode */}
            {inputMode === 'upload' && (
              <div className={styles.imageUploadSection}>
                <div className={styles.uploadOptionsLabel}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="7" cy="9" r="1.5" fill="currentColor"/>
                    <path d="M2 13l4-4 3 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Upload photos of your handwritten work:</span>
                </div>
                
                <input
                  type="file"
                  id={`image-upload-${currentQuestion.id}`}
                  className={styles.fileInput}
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={handleImageUpload}
                />
                <label htmlFor={`image-upload-${currentQuestion.id}`} className={styles.imageUploadButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Take Photo / Upload Image
                </label>
              </div>
            )}

            {/* Uploaded Images Preview (shown for all modes) */}
            {currentImages.length > 0 && (
              <div className={styles.uploadedImagesContainer}>
                <h4 className={styles.uploadedImagesTitle}>Uploaded Content:</h4>
                <div className={styles.uploadedImages}>
                  {currentImages.map((file, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Upload ${index + 1}`}
                        className={styles.previewImage}
                      />
                      <button
                        className={styles.removeImageButton}
                        onClick={() => handleRemoveImage(index)}
                        type="button"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <div className={styles.imageFileName}>{file.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'voice':
        const voiceAnswer = answers[currentQuestion.id];
        return (
          <div className={styles.voiceSection}>
            <div className={styles.voiceRecorder}>
              <div className={styles.voiceIcon}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" fill="#EEF2FF"/>
                  <rect x="28" y="18" width="8" height="18" rx="4" fill="#6366F1"/>
                  <path d="M22 32c0 5.5 4.5 10 10 10s10-4.5 10-10" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="32" y1="42" x2="32" y2="48" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="26" y1="48" x2="38" y2="48" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              {voiceAnswer?.recorded ? (
                <div className={styles.recordingCompleteSection}>
                  <div className={styles.recordingComplete}>
                    <div className={styles.recordingInfo}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#10B981" stroke="none"/>
                        <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Recording completed ({voiceAnswer.duration})</span>
                    </div>
                  </div>
                  
                  {/* Playback Controls */}
                  <div className={styles.playbackControls}>
                    <button className={styles.playButton}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                      </svg>
                      <span>Play Recording</span>
                    </button>
                    <div className={styles.waveform}>
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className={styles.waveformBar}
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                    <span className={styles.duration}>{voiceAnswer.duration}</span>
                  </div>

                  <Button variant="secondary" size="small" onClick={handleVoiceRecording}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8h8M8 4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Re-record
                  </Button>
                </div>
              ) : (
                <>
                  <p className={styles.voiceInstructions}>
                    Click the button below to start recording your response. Speak clearly and aim for about 1 minute.
                  </p>
                  <Button
                    variant={isRecording ? 'secondary' : 'primary'}
                    size="large"
                    onClick={handleVoiceRecording}
                    disabled={isRecording}
                  >
                    {isRecording ? (
                      <>
                        <span className={styles.recordingDot}></span>
                        Recording...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect x="7" y="3" width="6" height="10" rx="3" fill="currentColor"/>
                          <path d="M4 10c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Start Recording
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        );

      case 'video':
        const videoAnswer = answers[currentQuestion.id];
        return (
          <div className={styles.videoSection}>
            <div className={styles.videoRecorder}>
              <div className={styles.videoIcon}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" fill="#FEF3C7"/>
                  <rect x="18" y="22" width="22" height="20" rx="2" fill="#F59E0B"/>
                  <path d="M40 27l6-3v16l-6-3z" fill="#F59E0B"/>
                </svg>
              </div>
              {videoAnswer?.recorded ? (
                <div className={styles.recordingComplete}>
                  <div className={styles.recordingInfo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#10B981" stroke="none"/>
                      <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Video recorded ({videoAnswer.duration})</span>
                  </div>
                  <Button variant="secondary" size="small" onClick={handleVideoRecording}>
                    Re-record
                  </Button>
                </div>
              ) : (
                <>
                  <p className={styles.voiceInstructions}>
                    {currentQuestion.explanation || 'Record a video response for this question.'}
                  </p>
                  <Button variant="primary" size="large" onClick={handleVideoRecording}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="5" width="11" height="10" rx="1" fill="currentColor"/>
                      <path d="M14 8l3-2v8l-3-2z" fill="currentColor"/>
                    </svg>
                    Record Video
                  </Button>
                </>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.quizContainer}>
      {/* Quiz Header */}
      <Card className={styles.quizHeader}>
        <div className={styles.quizHeaderTop}>
          <div className={styles.quizProgress}>
            <div className={styles.progressLabel}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          {assignment.duration && (
            <div className={styles.quizTimer}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 5v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <div className={styles.quizPoints}>
          Total Points: {assignment.totalPoints}
        </div>
      </Card>

      {/* Question Card */}
      <Card className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <Badge variant="info">
            {currentQuestion?.type === 'single_choice' && 'Single Choice'}
            {currentQuestion?.type === 'multiple_choice' && 'Multiple Choice'}
            {currentQuestion?.type === 'open_ended' && 'Open Ended'}
            {currentQuestion?.type === 'voice' && 'Voice Response'}
            {currentQuestion?.type === 'video' && 'Video Response'}
          </Badge>
          <span className={styles.questionPoints}>{currentQuestion?.points} points</span>
        </div>
        <h2 className={styles.questionText}>{currentQuestion?.question}</h2>
        {currentQuestion?.imageUrl && (
          <div className={styles.questionImage}>
            <img src={currentQuestion.imageUrl} alt="Question" />
          </div>
        )}
        {renderQuestion()}
      </Card>

      {/* Navigation */}
      <div className={styles.quizNavigation}>
        <div className={styles.navButtons}>
          <Button
            variant="secondary"
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button variant="primary" onClick={goToNext}>
              Next →
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className={styles.questionNavigator}>
          <div className={styles.navigatorLabel}>Jump to question:</div>
          <div className={styles.questionDots}>
            {questions.map((q, index) => (
              <button
                key={q.id}
                className={`${styles.questionDot} ${
                  index === currentQuestionIndex ? styles.active : ''
                } ${answers[q.id] ? styles.answered : ''}`}
                onClick={() => goToQuestion(index)}
                title={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineQuizView;

