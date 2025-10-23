'use client';

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@layout/MainLayout';
import { Button } from '@ui';
import styles from './wellnessChat.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Topic {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  topic: string;
  messages: Message[];
}

export default function WellnessChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string>('current');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock chat history with messages
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { 
      id: '1', 
      title: 'Exam Stress Discussion', 
      timestamp: new Date('2025-10-20 15:20'), 
      topic: 'stress',
      messages: [
        { id: '1-1', role: 'user', content: "I'm really stressed about my upcoming exams. I don't know how to handle it.", timestamp: new Date('2025-10-20 15:20') },
        { id: '1-2', role: 'assistant', content: "I understand how stressful exam time can be. It's completely normal to feel this way. Let's work through this together.\n\nFirst, remember that feeling stressed shows you care about doing well, which is a good thing! Here are some strategies:\n\n1. Break your study time into small, manageable chunks\n2. Take regular breaks (try the Pomodoro technique)\n3. Make sure you're getting enough sleep\n4. Practice deep breathing when you feel overwhelmed\n\nWhat subject is causing you the most stress?", timestamp: new Date('2025-10-20 15:21') },
        { id: '1-3', role: 'user', content: 'Math is my biggest concern. I keep making mistakes.', timestamp: new Date('2025-10-20 15:22') },
        { id: '1-4', role: 'assistant', content: "Making mistakes is actually part of learning! Each mistake helps you understand what you need to focus on.\n\nFor math specifically:\n- Review your mistakes and understand why they happened\n- Practice similar problems\n- Don't try to cram everything at once\n- Ask for help when you're stuck\n\nRemember, you're doing better than you think. Taking breaks and staying calm will actually help you perform better!", timestamp: new Date('2025-10-20 15:23') },
      ]
    },
    { 
      id: '2', 
      title: 'Study Motivation Tips', 
      timestamp: new Date('2025-10-19 14:00'), 
      topic: 'motivation',
      messages: [
        { id: '2-1', role: 'user', content: 'I just cant seem to stay motivated to study lately', timestamp: new Date('2025-10-19 14:00') },
        { id: '2-2', role: 'assistant', content: "Losing motivation is something every student experiences! You're not alone in this.\n\nLet's find what works for you:\n\n1. Set small, achievable goals\n2. Reward yourself after completing tasks\n3. Study with friends or in a study group\n4. Remember WHY you're doing this - your goals and dreams\n5. Change your study environment to keep it fresh\n\nWhat usually motivates you? Is it grades, learning something new, or future goals?", timestamp: new Date('2025-10-19 14:01') },
      ]
    },
    { id: '3', title: 'Time Management Help', timestamp: new Date('2025-10-19 11:30'), topic: 'time', messages: [] },
    { id: '4', title: 'Test Anxiety Support', timestamp: new Date('2025-10-18 16:45'), topic: 'anxiety', messages: [] },
    { id: '5', title: 'Work-Life Balance Chat', timestamp: new Date('2025-10-18 10:15'), topic: 'balance', messages: [] },
    { id: '6', title: 'Staying Focused on Studies', timestamp: new Date('2025-10-17 13:30'), topic: 'focus', messages: [] },
    { id: '7', title: 'Dealing with Assignment Stress', timestamp: new Date('2025-10-17 09:45'), topic: 'stress', messages: [] },
    { id: '8', title: 'Finding Study Motivation', timestamp: new Date('2025-10-16 15:20'), topic: 'motivation', messages: [] },
    { id: '9', title: 'Planning Study Schedule', timestamp: new Date('2025-10-16 11:00'), topic: 'time', messages: [] },
    { id: '10', title: 'Pre-Exam Nervousness', timestamp: new Date('2025-10-15 16:15'), topic: 'anxiety', messages: [] },
    { id: '11', title: 'Managing School and Hobbies', timestamp: new Date('2025-10-15 14:30'), topic: 'balance', messages: [] },
    { id: '12', title: 'Concentration Techniques', timestamp: new Date('2025-10-14 10:45'), topic: 'focus', messages: [] },
    { id: '13', title: 'Overwhelmed with Homework', timestamp: new Date('2025-10-14 08:30'), topic: 'stress', messages: [] },
    { id: '14', title: 'Building Good Study Habits', timestamp: new Date('2025-10-13 15:50'), topic: 'motivation', messages: [] },
    { id: '15', title: 'Effective Time Blocking', timestamp: new Date('2025-10-13 12:20'), topic: 'time', messages: [] },
  ]);

  const topics: Topic[] = [
    {
      id: 'stress',
      name: 'Stress',
      icon: '😰',
      color: '#EF4444',
      description: 'Managing study stress',
    },
    {
      id: 'motivation',
      name: 'Motivation',
      icon: '💪',
      color: '#10B981',
      description: 'Staying motivated',
    },
    {
      id: 'time',
      name: 'Time',
      icon: '⏰',
      color: '#3B82F6',
      description: 'Time management',
    },
    {
      id: 'anxiety',
      name: 'Anxiety',
      icon: '😟',
      color: '#F59E0B',
      description: 'Test anxiety',
    },
    {
      id: 'balance',
      name: 'Balance',
      icon: '⚖️',
      color: '#8B5CF6',
      description: 'Work-life balance',
    },
    {
      id: 'focus',
      name: 'Focus',
      icon: '🎯',
      color: '#06B6D4',
      description: 'Concentration tips',
    },
  ];

  const getAIResponse = (userMessage: string, category?: string): string => {
    const responses: Record<string, string[]> = {
      stress: [
        "I understand that studying can feel overwhelming sometimes. Remember, it's okay to feel stressed - it shows you care about doing well. Let's break this down together. What specific aspect of your studies is causing you the most stress right now?",
        "Feeling stressed is a normal part of being a student. Here are some strategies that might help: 1) Break large tasks into smaller, manageable chunks. 2) Take regular breaks using the Pomodoro Technique (25 min study, 5 min break). 3) Practice deep breathing exercises. What do you think would work best for you?",
        "I hear you. Stress can make everything feel harder. Remember, you don't have to handle everything at once. Let's prioritize: What's the most urgent thing you need to focus on right now? We can tackle that first.",
      ],
      motivation: [
        "Great that you're looking for ways to stay motivated! Here's what I suggest: 1) Set small, achievable daily goals. 2) Celebrate your wins, no matter how small. 3) Remember your 'why' - why did you start this journey? What helps you stay motivated?",
        "Motivation can be tricky - it comes and goes. The key is building habits that work even when motivation is low. Try: Creating a study routine, finding a study buddy, or rewarding yourself after completing tasks. What sounds most appealing to you?",
        "Every expert was once a beginner! You're making progress every day, even if it doesn't feel like it. Look how far you've come already! What's one thing you've learned recently that makes you proud?",
      ],
      'time-management': [
        "Time management is a skill that gets better with practice! Let's start with the basics: 1) Use a planner or app to track tasks. 2) Prioritize using the Eisenhower Matrix (urgent vs important). 3) Set specific time blocks for different subjects. Would you like help creating a study schedule?",
        "I can help you with that! Here's a practical approach: Start by tracking how you currently spend your time for a few days. Then identify time-wasters and replace them with focused study sessions. Want to try the Pomodoro Technique? It's great for time management!",
        "Time management starts with knowing your priorities. What are your top 3 academic goals this week? Once we identify those, we can create a realistic plan to achieve them without burning out.",
      ],
      general: [
        "Thank you for sharing that with me. I'm here to support you through your learning journey. Can you tell me more about what's on your mind?",
        "I appreciate you reaching out. Remember, taking care of your mental health is just as important as academic success. How can I best support you today?",
        "That's a great question. Let's explore this together and find strategies that work best for you. What would be most helpful right now?",
      ],
    };

    const categoryResponses = responses[category || 'general'] || responses.general;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputValue, selectedTopic || 'general'),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    
    if (chatId === 'current') {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi there! 👋 I'm your Wellness & Study Support assistant. Select a topic and share what's on your mind - I'm here to listen and help!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else {
      const chat = chatHistory.find(c => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
        setSelectedTopic(chat.topic);
      }
    }
  };

  const handleDeleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat('current');
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi there! 👋 I'm your Wellness & Study Support assistant. Select a topic and share what's on your mind - I'm here to listen and help!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      const fileMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `📎 Shared file: ${fileName}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fileMessage]);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Thank you for sharing "${fileName}". I'm here to support you. How can I help you with this?`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi there! 👋 I'm your Wellness & Study Support assistant. Select a topic and share what's on your mind - I'm here to listen and help!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    // Use consistent format to avoid hydration mismatch
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <MainLayout noPadding={true}>
      <div className={styles.container}>
        {/* Chat Wrapper */}
        <div className={styles.chatWrapper}>
          {/* Topic Selection Buttons */}
          <div className={styles.topicButtons}>
            {topics.map((topic) => (
              <button
                key={topic.id}
                className={`${styles.topicButton} ${selectedTopic === topic.id ? styles.active : ''}`}
                onClick={() => handleTopicSelect(topic.id)}
                title={topic.description}
                style={{
                  backgroundColor: selectedTopic === topic.id ? topic.color : 'white',
                  borderColor: selectedTopic === topic.id ? topic.color : '#e5e7eb',
                  color: selectedTopic === topic.id ? 'white' : '#374151',
                }}
              >
                <span className={styles.topicIcon}>{topic.icon}</span>
                <span className={styles.topicName}>{topic.name}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>💬</div>
                <h2 className={styles.emptyTitle}>Wellness & Study Support</h2>
                <p className={styles.emptyText}>How can I support you today?</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${styles[message.role]}`}
                  >
                    <div className={styles.messageAvatar}>
                      {message.role === 'user' ? '👤' : '💬'}
                    </div>
                    <div className={styles.messageContent}>
                      <div className={styles.messageText}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className={`${styles.message} ${styles.assistant}`}>
                    <div className={styles.messageAvatar}>💬</div>
                    <div className={styles.messageContent}>
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <button
              onClick={handleFileUpload}
              className={styles.uploadButton}
              title="Upload file"
            >
              📎
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share what's on your mind..."
              className={styles.input}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={styles.sendButton}
            >
              ↑
            </Button>
          </div>
        </div>

        {/* History Sidebar */}
        <div className={styles.historySidebar}>
          <div className={styles.historyHeader}>
            <h3 className={styles.historyTitle}>Chat History</h3>
          </div>
          <div className={styles.historyList}>
            <div
              className={`${styles.historyItem} ${selectedChat === 'current' ? styles.active : ''}`}
              onClick={() => handleChatSelect('current')}
            >
              <div className={styles.historyItemContent}>
                <div className={styles.historyItemTitle}>Current Chat</div>
                <div className={styles.historyItemTime}>Now</div>
              </div>
            </div>
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`${styles.historyItem} ${selectedChat === chat.id ? styles.active : ''}`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className={styles.historyItemContent}>
                  <div className={styles.historyItemTitle}>{chat.title}</div>
                  <div className={styles.historyItemTime}>{formatTime(chat.timestamp)}</div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  title="Delete chat"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

