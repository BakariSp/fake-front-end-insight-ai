# Assignment Types System Guide

## Overview
This document describes the comprehensive assignment types system implemented for the student platform, including different submission methods and question types.

## Assignment Types

### 1. Text Assignment (`type: 'text'`)
Simple text-based instructions from the teacher. No file submission required.

**Features:**
- Text-only instructions
- Optional teacher-provided materials/attachments
- Students read and complete work offline (e.g., in textbook)

**Example Use Cases:**
- Weekly practice sets from textbook
- Reading assignments
- In-class exercises

### 2. File Upload Assignment (`type: 'file_upload'`)
Traditional assignment where students submit files.

**Features:**
- Assignment instructions and description
- Teacher-provided materials (PDFs, documents, etc.)
- File upload interface (PDF, JPG, PNG, DOC)
- Support for multiple file submissions
- File preview before submission

**Example Use Cases:**
- Lab reports
- Essays and writing assignments
- Reading comprehension with written responses
- Homework worksheets

### 3. Online Quiz (`type: 'online_quiz'`)
Interactive quizzes that students complete directly in the browser.

**Features:**
- Multiple question types
- Progress tracking
- Timer (optional)
- Point system
- Question navigator
- Instant submission

#### Question Types

##### Single Choice Questions
- One correct answer from multiple options
- Radio button selection
- Automatic grading

**Example:**
```typescript
{
  type: 'single_choice',
  question: 'What is the capital of France?',
  points: 5,
  options: ['London', 'Paris', 'Berlin', 'Madrid'],
  correctAnswer: 'Paris'
}
```

##### Multiple Choice Questions
- Multiple correct answers
- Checkbox selection
- Partial credit possible

**Example:**
```typescript
{
  type: 'multiple_choice',
  question: 'Which are primary colors?',
  points: 10,
  options: ['Red', 'Green', 'Blue', 'Yellow'],
  correctAnswer: ['Red', 'Blue', 'Yellow']
}
```

##### Open-Ended Questions
- Free-text response
- Large text area for detailed answers
- Character count
- Manual or AI grading

**Example:**
```typescript
{
  type: 'open_ended',
  question: 'Explain the water cycle in your own words.',
  points: 15,
  explanation: 'Include at least 3 main stages.'
}
```

##### Voice Response Questions
- Record audio responses
- Ideal for language learning
- Practice for oral exams

**Features:**
- Start/stop recording
- Playback recorded audio
- Re-record option
- Recording duration display

**Example Use Cases:**
- English oral practice
- Language pronunciation
- Speaking presentations
- Interview practice

##### Video Response Questions
- Record video demonstrations
- Show work visually
- Explain concepts with visuals

**Features:**
- Video recording interface
- Re-record option
- Duration tracking

**Example Use Cases:**
- Science experiments
- Physical demonstrations
- Presentation practice
- Art/performance assessments

## UI Enhancements

### Assignment List Page
1. **Removed Subject Filter**
   - Each class only has one subject
   - Subject filter is redundant within a class
   - Cleaner, simpler interface

2. **Type Icons**
   - Visual indicators for assignment types
   - Color-coded backgrounds:
     - 🟣 Purple: Online Quiz
     - 🟡 Yellow: File Upload
     - 🔵 Blue: Text Assignment

3. **Compact Stats Display**
   - Inline statistics in header
   - Replaced large statistics cards
   - Higher information density
   - More space for actual content

4. **Smart Alerts**
   - Urgent assignment warnings
   - Shows assignments due within 3 days
   - Automatic detection

### Assignment Detail Pages

#### Text Assignment View
- Clean instruction display
- Teacher materials section
- Deadline information
- Submission tips

#### File Upload View
- Clear instructions
- Download teacher materials
- Drag-and-drop file upload
- File list with preview
- Multiple file support

#### Online Quiz View
- Progress bar
- Timer display
- Question-by-question navigation
- Visual question navigator
- Different interfaces for each question type
- Answer state tracking

## Data Structure

### Assignment Interface
```typescript
interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'unsent' | 'sent' | 'graded';
  submitTime?: string;
  aiScore?: number;
  teacherFeedback?: string;
  classId: string;
  
  // New fields
  type: 'text' | 'file_upload' | 'online_quiz';
  description?: string;
  attachments?: string[];
  questions?: QuizQuestion[];
  totalPoints?: number;
  duration?: number; // in minutes
}
```

### QuizQuestion Interface
```typescript
interface QuizQuestion {
  id: string;
  type: 'single_choice' | 'multiple_choice' | 'open_ended' | 'voice' | 'video';
  question: string;
  points: number;
  options?: string[]; // For choice questions
  correctAnswer?: string | string[];
  explanation?: string;
  imageUrl?: string;
  audioUrl?: string;
}
```

## Mock Data Examples

The system includes comprehensive mock data with:
- 10 different assignments across all types
- Various question types in quizzes
- Different difficulty levels
- Realistic HKDSE-aligned content

## Benefits

### For Students
- Clear visual differentiation of assignment types
- Appropriate interface for each task
- Reduced confusion
- Better time management with smart alerts
- Practice with different response formats

### For Teachers
- Flexibility in assignment creation
- Support for various pedagogical approaches
- Reduced paper usage with online quizzes
- Automatic grading for objective questions
- Better assessment variety

### For Learning
- Authentic assessment experiences
- Practice for DSE exam formats
- Multimedia responses (voice, video)
- Immediate feedback on quizzes
- Progressive skill development

## Future Enhancements

Potential additions:
1. Equation editor for math questions
2. Drawing tools for diagrams
3. Code editor for programming questions
4. Collaborative group assignments
5. Peer review system
6. Rubric-based grading interface
7. Question bank and randomization
8. Adaptive quiz difficulty

## Technical Implementation

### Files Modified/Created
1. `app/data/mockData.ts` - Added interfaces and mock data
2. `app/student/class/[classId]/assignments/page.tsx` - Updated list view
3. `app/student/class/[classId]/assignments/assignments.module.css` - New styles
4. `app/student/class/[classId]/assignments/[assignmentId]/page.tsx` - Updated detail view
5. `app/student/class/[classId]/assignments/[assignmentId]/OnlineQuizView.tsx` - New quiz component
6. `app/student/class/[classId]/assignments/[assignmentId]/assignmentDetail.module.css` - Quiz styles

### Key Components
- `OnlineQuizView` - Main quiz interface component
- `DeadlineCard` - Reusable deadline display
- `TipsCard` - Reusable tips component
- Question type renderers (choice, open-ended, voice, video)

## Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Clear visual states (hover, active, selected)
- High contrast color schemes
- Screen reader friendly

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Media recording APIs (for voice/video)
- Fallback for unsupported features

