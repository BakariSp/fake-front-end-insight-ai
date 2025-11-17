'use client';

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@layout/MainLayout';
import { Button } from '@ui';
import styles from './aiTutor.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIRole {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  subject: string;
  description: string;
  systemPrompt: string;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  roleId: string;
  messages: Message[];
}

export default function AITutorPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>('current');
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Role Templates for HKDSE
  const aiRoles: AIRole[] = [
    {
      id: 'general',
      name: '通用学习导师',
      nameEn: 'General Tutor',
      icon: '🎓',
      subject: '全科',
      description: '友善耐心的通用导师，适合任何科目问题',
      systemPrompt: '你是一位友善耐心的学习导师，可以帮助学生解答各种学科问题。',
    },
    {
      id: 'math',
      name: '数学导师',
      nameEn: 'Math Tutor',
      icon: '🔢',
      subject: 'Mathematics',
      description: '擅长步骤式讲解，强调数学逻辑与解题方法',
      systemPrompt: '你是一位专业的HKDSE数学导师，擅长用清晰的步骤讲解数学问题。使用步骤式分解，强调数学概念和公式的应用。',
    },
    {
      id: 'english',
      name: '英语导师',
      nameEn: 'English Tutor',
      icon: '📝',
      subject: 'English',
      description: '注重语法、写作技巧、阅读理解分析',
      systemPrompt: 'You are an experienced HKDSE English tutor. Focus on grammar, vocabulary, writing techniques, and reading comprehension strategies.',
    },
    {
      id: 'chinese',
      name: '中文导师',
      nameEn: 'Chinese Tutor',
      icon: '📖',
      subject: '中文',
      description: '专注文言文、写作、阅读理解与修辞手法',
      systemPrompt: '你是一位专业的中文导师，专注于文言文、写作技巧、阅读理解和修辞手法的教学。',
    },
    {
      id: 'science',
      name: '科学导师',
      nameEn: 'Science Tutor',
      icon: '🧪',
      subject: 'Science',
      description: '用实验与生活例子解释科学概念',
      systemPrompt: '你是一位科学导师，擅长用实验和生活例子解释物理、化学、生物等科学概念。',
    },
    {
      id: 'humanities',
      name: '文科导师',
      nameEn: 'Humanities Tutor',
      icon: '🏛️',
      subject: 'Humanities',
      description: '强调概念理解、案例分析、答题结构',
      systemPrompt: '你是一位文科导师，专注于历史、地理、经济等科目，强调概念理解、案例分析和答题结构。',
    },
    {
      id: 'exam',
      name: '考试策略导师',
      nameEn: 'Exam Strategy',
      icon: '🎯',
      subject: '应试技巧',
      description: '专注HKDSE答题技巧、时间管理、考试策略',
      systemPrompt: '你是HKDSE应试专家，专注于帮助学生提升考试表现，分析答题技巧、时间管理和Past Paper解题思路。',
    },
  ];

  // Mock chat history with role IDs
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { 
      id: '1', 
      title: 'How to solve quadratic equations?', 
      timestamp: new Date('2025-11-16 14:30'), 
      roleId: 'math',
      messages: [
        { id: '1-1', role: 'user', content: 'Can you help me solve this equation: 2x + 5 = 15?', timestamp: new Date('2025-11-16 14:30') },
        { id: '1-2', role: 'assistant', content: "Of course! Let's solve this step by step:\n\n2x + 5 = 15\n\nStep 1: Subtract 5 from both sides\n2x = 10\n\nStep 2: Divide both sides by 2\nx = 5\n\nSo x = 5! Would you like to try a similar problem?", timestamp: new Date('2025-11-16 14:31') },
      ]
    },
    { 
      id: '2', 
      title: 'English essay writing tips', 
      timestamp: new Date('2025-11-15 16:45'), 
      roleId: 'english',
      messages: [
        { id: '2-1', role: 'user', content: 'How can I improve my essay writing?', timestamp: new Date('2025-11-15 16:45') },
        { id: '2-2', role: 'assistant', content: "Here are some key tips for better essay writing:\n\n1. Start with a clear thesis statement\n2. Use topic sentences for each paragraph\n3. Support your arguments with examples\n4. Use transition words to connect ideas\n5. Conclude by summarizing your main points\n\nWould you like me to elaborate on any of these?", timestamp: new Date('2025-11-15 16:46') },
      ]
    },
    { 
      id: '3', 
      title: '文言文理解问题', 
      timestamp: new Date('2025-11-14 10:20'), 
      roleId: 'chinese',
      messages: []
    },
    { id: '4', title: 'Chemistry atomic structure', timestamp: new Date('2025-11-13 15:10'), roleId: 'science', messages: [] },
    { id: '5', title: 'HKDSE考试技巧', timestamp: new Date('2025-11-12 09:30'), roleId: 'exam', messages: [] },
  ]);


  // Mock AI responses based on role
  const getAIResponse = (userMessage: string, roleId: string): string => {
    const role = aiRoles.find(r => r.id === roleId);
    const responses: Record<string, string[]> = {
      general: [
        "I'd be happy to help you with that! Let me break it down for you...",
        "Great question! Let me explain this clearly...",
        "Let me guide you through this step by step...",
      ],
      math: [
        "Let's solve this step by step:\n\nStep 1: First, we need to...\nStep 2: Then, we can...\nStep 3: Finally...",
        "Great math question! Let me show you the approach:\n\n1) Identify what we know\n2) Apply the formula\n3) Solve for the unknown",
        "I'll help you understand this mathematically. The key concept here is...",
      ],
      english: [
        "Let me help you with that. Here's a clear explanation:\n\n- First point: ...\n- Second point: ...\n- Key takeaway: ...",
        "Good question! In English, we need to consider the grammar rules and context...",
        "Let me break down this concept for you with some examples...",
      ],
      chinese: [
        "让我用简单的方式解释这个概念...\n\n首先，我们需要理解...\n其次...\n最后...",
        "很好的问题！在中文里，这个概念是...",
        "让我们一起分析这段文字的含义...",
      ],
      science: [
        "Let me explain this scientific concept with an example:\n\nImagine you have... This is similar to...",
        "Great science question! The key principle here is... Think of it like this experiment...",
        "Let's explore this concept. In nature, we can observe...",
      ],
      humanities: [
        "Let me provide a comprehensive analysis:\n\n1. Context: ...\n2. Key factors: ...\n3. Impact: ...",
        "Good question! To understand this, we need to consider the historical/economic context...",
        "Let's break down this concept with a real-world example...",
      ],
      exam: [
        "Here's a useful exam strategy:\n\n✓ Time management: ...\n✓ Question analysis: ...\n✓ Answer structure: ...",
        "For HKDSE, remember these tips: 1) Read the question carefully, 2) Plan your answer, 3) Check your work",
        "Let me share an effective approach for this type of question...",
      ],
    };

    const roleResponses = responses[roleId] || responses.general;
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
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
        content: getAIResponse(inputValue, selectedRoleId),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewChat = () => {
    // Save current chat if there are messages
    if (messages.length > 1 && selectedChat === 'current') {
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: messages[1]?.content.substring(0, 40) + '...' || 'New Chat',
        timestamp: new Date(),
        roleId: selectedRoleId,
        messages: [...messages],
      };
      setChatHistory(prev => [newChat, ...prev]);
    }
    
    // Start fresh chat
    setMessages([]);
    setSelectedChat('current');
    setSelectedRoleId('general');
  };

  const handleRoleChange = (roleId: string) => {
    setSelectedRoleId(roleId);
    setShowRoleSelector(false);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    
    if (chatId === 'current') {
      // Start new chat
      setMessages([]);
      setSelectedRoleId('general');
    } else {
      // Load chat history
      const chat = chatHistory.find(c => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
        setSelectedRoleId(chat.roleId);
      }
    }
  };

  const handleDeleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat('current');
      setMessages([]);
      setSelectedRoleId('general');
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      // Mock file upload message
      const fileMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `📎 Uploaded file: ${fileName}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fileMessage]);
      
      // Mock AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I've received your file "${fileName}". I can help you analyze it or answer questions about it. What would you like to know?`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentRole = aiRoles.find(r => r.id === selectedRoleId) || aiRoles[0];

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
    <MainLayout showRightSidebar={false} noPadding={true}>
      <div className={styles.container}>
        {/* Chat Interface */}
        <div className={styles.chatWrapper}>
          {/* Current Role Indicator */}
          <div className={styles.roleIndicator}>
            <button 
              className={styles.roleSelector}
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              title="Change AI tutor role"
            >
              <span className={styles.roleIcon}>{currentRole.icon}</span>
              <span className={styles.roleName}>{currentRole.name}</span>
              <span className={styles.roleSubject}>({currentRole.subject})</span>
              <span className={styles.dropdownIcon}>▼</span>
            </button>
            
            {showRoleSelector && (
              <div className={styles.roleDropdown}>
                {aiRoles.map((role) => (
                  <button
                    key={role.id}
                    className={`${styles.roleOption} ${selectedRoleId === role.id ? styles.active : ''}`}
                    onClick={() => handleRoleChange(role.id)}
                  >
                    <span className={styles.roleOptionIcon}>{role.icon}</span>
                    <div className={styles.roleOptionInfo}>
                      <div className={styles.roleOptionName}>{role.name}</div>
                      <div className={styles.roleOptionDesc}>{role.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>{currentRole.icon}</div>
                <h2 className={styles.emptyTitle}>AI Learning Tutor</h2>
                <p className={styles.emptyText}>How can I help you today?</p>
                <p className={styles.emptyRole}>Currently: {currentRole.name}</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${styles[message.role]}`}
                  >
                    <div className={styles.messageAvatar}>
                      {message.role === 'user' ? '👤' : '🤖'}
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
                    <div className={styles.messageAvatar}>🤖</div>
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
              placeholder="Ask AI Learning Tutor..."
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
          <button className={styles.newChatButton} onClick={handleNewChat}>
            <span className={styles.newChatIcon}>+</span>
            <div className={styles.newChatText}>
              <div className={styles.newChatTitle}>New Chat</div>
              <div className={styles.newChatSubtitle}>Start a new conversation again</div>
            </div>
          </button>
          <div className={styles.historyList}>
            {chatHistory.map((chat) => {
              const chatRole = aiRoles.find(r => r.id === chat.roleId);
              return (
                <div
                  key={chat.id}
                  className={`${styles.historyItem} ${selectedChat === chat.id ? styles.active : ''}`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <span className={styles.historyRoleIcon}>{chatRole?.icon || '🎓'}</span>
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
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

