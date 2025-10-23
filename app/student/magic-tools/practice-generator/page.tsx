'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Select } from '@ui';
import styles from './practiceGenerator.module.css';

interface PracticeQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function PracticeGeneratorPage() {
  const router = useRouter();
  const [subject, setSubject] = useState('Math');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [generatedQuestions, setGeneratedQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const subjects = ['Math', 'English', 'Science', 'History'];
  
  const topicsBySubject: Record<string, string[]> = {
    Math: ['Fractions', 'Algebra', 'Geometry', 'Calculus', 'Statistics'],
    English: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing', 'Literature'],
    Science: ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Environmental Science'],
    History: ['World History', 'US History', 'Ancient Civilizations', 'Modern History'],
  };

  // Mock question generation
  const mockQuestions: Record<string, PracticeQuestion[]> = {
    Math: [
      {
        id: '1',
        question: 'What is 3/4 + 1/2?',
        options: ['5/6', '5/4', '4/6', '1/4'],
        correctAnswer: '5/4',
        explanation: 'To add fractions, find a common denominator. 3/4 + 2/4 = 5/4',
        difficulty: 'medium',
      },
      {
        id: '2',
        question: 'Solve for x: 2x + 5 = 13',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 'x = 4',
        explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
        difficulty: 'medium',
      },
      {
        id: '3',
        question: 'What is the area of a circle with radius 5?',
        options: ['25π', '10π', '5π', '100π'],
        correctAnswer: '25π',
        explanation: 'Area = πr², so π(5)² = 25π',
        difficulty: 'hard',
      },
    ],
    English: [
      {
        id: '1',
        question: 'Choose the correct form: She ____ to the store yesterday.',
        options: ['go', 'goes', 'went', 'going'],
        correctAnswer: 'went',
        explanation: '"Yesterday" indicates past tense, so we use "went"',
        difficulty: 'easy',
      },
      {
        id: '2',
        question: 'Which word is a synonym for "happy"?',
        options: ['sad', 'joyful', 'angry', 'tired'],
        correctAnswer: 'joyful',
        explanation: 'Joyful means feeling great happiness, similar to happy',
        difficulty: 'easy',
      },
    ],
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResults(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);

    // Simulate AI generation
    setTimeout(() => {
      const questions = mockQuestions[subject] || mockQuestions.Math;
      const selectedQuestions = questions
        .filter(q => difficulty === 'medium' || q.difficulty === difficulty)
        .slice(0, questionCount);
      
      setGeneratedQuestions(selectedQuestions);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    generatedQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: generatedQuestions.length,
      percentage: Math.round((correct / generatedQuestions.length) * 100),
    };
  };

  const currentQuestion = generatedQuestions[currentQuestionIndex];
  const score = showResults ? calculateScore() : null;

  return (
    <MainLayout>
      <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className={styles.backButton}
        >
          ← Back
        </Button>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.icon}>✨</span>
            Practice Generator
          </h1>
          <p className={styles.subtitle}>智能练习生成 - AI-powered personalized practice problems</p>
        </div>
      </div>

      {generatedQuestions.length === 0 ? (
        // Configuration Panel
        <div className={styles.configPanel}>
          <Card className={styles.configCard}>
            <h3 className={styles.configTitle}>⚙️ Configure Your Practice Session</h3>
            <p className={styles.configDescription}>
              Customize your practice session by selecting the subject, topic, difficulty, and number of questions.
              AI will generate personalized problems based on your selections.
            </p>

            <div className={styles.configForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Subject 科目</label>
                <Select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setTopic('');
                  }}
                  options={subjects.map(s => ({ value: s, label: s }))}
                  className={styles.select}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Topic 主题</label>
                <Select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  options={[
                    { value: '', label: 'Any Topic' },
                    ...(topicsBySubject[subject] || []).map(t => ({ value: t, label: t }))
                  ]}
                  className={styles.select}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Difficulty Level 难度</label>
                <div className={styles.difficultyButtons}>
                  <button
                    className={`${styles.difficultyBtn} ${difficulty === 'easy' ? styles.active : ''}`}
                    onClick={() => setDifficulty('easy')}
                    style={{ borderColor: difficulty === 'easy' ? '#10B981' : '#E5E7EB' }}
                  >
                    <span className={styles.diffIcon}>😊</span>
                    Easy 简单
                  </button>
                  <button
                    className={`${styles.difficultyBtn} ${difficulty === 'medium' ? styles.active : ''}`}
                    onClick={() => setDifficulty('medium')}
                    style={{ borderColor: difficulty === 'medium' ? '#F59E0B' : '#E5E7EB' }}
                  >
                    <span className={styles.diffIcon}>🤔</span>
                    Medium 中等
                  </button>
                  <button
                    className={`${styles.difficultyBtn} ${difficulty === 'hard' ? styles.active : ''}`}
                    onClick={() => setDifficulty('hard')}
                    style={{ borderColor: difficulty === 'hard' ? '#EF4444' : '#E5E7EB' }}
                  >
                    <span className={styles.diffIcon}>😰</span>
                    Hard 困难
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Number of Questions 题目数量: {questionCount}</label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>3</span>
                  <span>20</span>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={styles.generateButton}
              >
                {isGenerating ? '⏳ Generating...' : '✨ Generate Practice Questions'}
              </Button>
            </div>
          </Card>

          {/* Feature Highlights */}
          <div className={styles.featuresGrid}>
            <Card className={styles.featureCard}>
              <span className={styles.featureIcon}>🎯</span>
              <h4 className={styles.featureTitle}>Adaptive Difficulty</h4>
              <p className={styles.featureDescription}>
                Questions adapt to your skill level for optimal learning
              </p>
            </Card>
            <Card className={styles.featureCard}>
              <span className={styles.featureIcon}>💡</span>
              <h4 className={styles.featureTitle}>Instant Feedback</h4>
              <p className={styles.featureDescription}>
                Get detailed explanations for every question
              </p>
            </Card>
            <Card className={styles.featureCard}>
              <span className={styles.featureIcon}>📊</span>
              <h4 className={styles.featureTitle}>Progress Tracking</h4>
              <p className={styles.featureDescription}>
                Monitor your improvement over time
              </p>
            </Card>
          </div>
        </div>
      ) : !showResults ? (
        // Practice Session
        <div className={styles.practiceSession}>
          <Card className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <div className={styles.progressInfo}>
                <span className={styles.progressLabel}>Question</span>
                <span className={styles.progressText}>
                  {currentQuestionIndex + 1} / {generatedQuestions.length}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentQuestionIndex + 1) / generatedQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.subjectBadge}>{subject}</span>
              <span 
                className={styles.difficultyBadge}
                style={{ 
                  backgroundColor: 
                    currentQuestion.difficulty === 'easy' ? '#10B981' :
                    currentQuestion.difficulty === 'medium' ? '#F59E0B' : '#EF4444'
                }}
              >
                {currentQuestion.difficulty}
              </span>
            </div>

            <h3 className={styles.questionText}>{currentQuestion.question}</h3>

            <div className={styles.optionsGrid}>
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.optionButton} ${
                    userAnswers[currentQuestion.id] === option ? styles.selected : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={styles.optionText}>{option}</span>
                </button>
              ))}
            </div>

            <div className={styles.navigationButtons}>
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                ← Previous
              </Button>
              {currentQuestionIndex < generatedQuestions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={Object.keys(userAnswers).length < generatedQuestions.length}
                >
                  Submit Answers 提交答案
                </Button>
              )}
            </div>
          </Card>
        </div>
      ) : (
        // Results View
        <div className={styles.resultsView}>
          <Card className={styles.resultsCard}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsIcon}>
                {score && score.percentage >= 80 ? '🎉' : score && score.percentage >= 60 ? '👍' : '💪'}
              </span>
              <h2 className={styles.resultsTitle}>Practice Complete!</h2>
              <p className={styles.resultsSubtitle}>Here's how you did:</p>
            </div>

            <div className={styles.scoreDisplay}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreValue}>{score?.percentage}%</div>
                <div className={styles.scoreLabel}>Score</div>
              </div>
              <div className={styles.scoreDetails}>
                <div className={styles.scoreDetail}>
                  <span className={styles.scoreDetailIcon}>✅</span>
                  <span className={styles.scoreDetailText}>
                    {score?.correct} Correct
                  </span>
                </div>
                <div className={styles.scoreDetail}>
                  <span className={styles.scoreDetailIcon}>❌</span>
                  <span className={styles.scoreDetailText}>
                    {score && score.total - score.correct} Incorrect
                  </span>
                </div>
              </div>
            </div>

            {/* Question Review */}
            <div className={styles.reviewSection}>
              <h3 className={styles.reviewTitle}>📝 Review Your Answers</h3>
              {generatedQuestions.map((question, index) => {
                const isCorrect = userAnswers[question.id] === question.correctAnswer;
                return (
                  <div key={question.id} className={styles.reviewQuestion}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewNumber}>Question {index + 1}</span>
                      <span className={`${styles.reviewStatus} ${isCorrect ? styles.correct : styles.incorrect}`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className={styles.reviewQuestionText}>{question.question}</p>
                    <div className={styles.reviewAnswers}>
                      <div className={styles.reviewAnswer}>
                        <strong>Your Answer:</strong>
                        <span className={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}>
                          {userAnswers[question.id] || 'Not answered'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className={styles.reviewAnswer}>
                          <strong>Correct Answer:</strong>
                          <span className={styles.correctAnswer}>{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.reviewExplanation}>
                      <strong>💡 Explanation:</strong>
                      <p>{question.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.resultsActions}>
              <Button
                variant="secondary"
                onClick={() => {
                  setGeneratedQuestions([]);
                  setUserAnswers({});
                  setShowResults(false);
                }}
              >
                New Practice Session 新练习
              </Button>
              <Button
                variant="primary"
                onClick={() => router.push('/student/magic-tools/ai-tutor')}
              >
                Get AI Help 获取AI帮助
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
    </MainLayout>
  );
}

