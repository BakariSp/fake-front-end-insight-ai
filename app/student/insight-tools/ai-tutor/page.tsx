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

interface TutoringMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  placeholder: string;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  mode: string;
  messages: Message[];
}

export default function AITutorPage() {
  const [selectedMode, setSelectedMode] = useState<string>('homework');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>('current');
  const [chatSessions, setChatSessions] = useState<Record<string, Message[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock chat history with messages
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { 
      id: '1', 
      title: 'Math Homework Help', 
      timestamp: new Date('2025-10-20 14:30'), 
      mode: 'homework',
      messages: [
        { id: '1-1', role: 'user', content: 'Can you help me solve this equation: 2x + 5 = 15?', timestamp: new Date('2025-10-20 14:30') },
        { id: '1-2', role: 'assistant', content: "Of course! Let's solve this step by step:\n\n2x + 5 = 15\n\nStep 1: Subtract 5 from both sides\n2x = 10\n\nStep 2: Divide both sides by 2\nx = 5\n\nSo x = 5! Would you like to try a similar problem?", timestamp: new Date('2025-10-20 14:31') },
        { id: '1-3', role: 'user', content: 'Yes please!', timestamp: new Date('2025-10-20 14:32') },
        { id: '1-4', role: 'assistant', content: "Great! Try this one: 3x - 7 = 14\n\nTake your time and show me your work!", timestamp: new Date('2025-10-20 14:32') },
      ]
    },
    { 
      id: '2', 
      title: 'Understanding Functions', 
      timestamp: new Date('2025-10-19 16:45'), 
      mode: 'concept',
      messages: [
        { id: '2-1', role: 'user', content: 'What is a function in math?', timestamp: new Date('2025-10-19 16:45') },
        { id: '2-2', role: 'assistant', content: "A function is like a machine that takes an input and gives you an output! Think of it like a vending machine:\n\n- You put in money (input)\n- The machine processes it\n- You get a snack (output)\n\nIn math, we write it as f(x) = y, where:\n- x is the input\n- f is the function (the rule)\n- y is the output\n\nFor example: f(x) = 2x + 1\nIf x = 3, then f(3) = 2(3) + 1 = 7\n\nDoes this make sense?", timestamp: new Date('2025-10-19 16:46') },
      ]
    },
    { 
      id: '3', 
      title: 'Algebra Practice Problems', 
      timestamp: new Date('2025-10-19 10:20'), 
      mode: 'practice',
      messages: [
        { id: '3-1', role: 'user', content: 'I need practice problems for algebra', timestamp: new Date('2025-10-19 10:20') },
        { id: '3-2', role: 'assistant', content: "Here are 3 practice problems for you:\n\n1. Solve for x: 4x - 8 = 20\n2. Simplify: 3(x + 2) - 2(x - 1)\n3. Solve: 2x + 3 = x + 10\n\nTake your time and let me know your answers!", timestamp: new Date('2025-10-19 10:21') },
      ]
    },
    { id: '4', title: 'Chemistry Questions', timestamp: new Date('2025-10-18 15:10'), mode: 'ask', messages: [] },
    { id: '5', title: 'English Grammar Help', timestamp: new Date('2025-10-18 09:30'), mode: 'homework', messages: [] },
    { id: '6', title: 'Quadratic Equations Explained', timestamp: new Date('2025-10-17 14:00'), mode: 'concept', messages: [] },
    { id: '7', title: 'Physics Problem Set', timestamp: new Date('2025-10-17 11:15'), mode: 'homework', messages: [] },
    { id: '8', title: 'Fractions Practice', timestamp: new Date('2025-10-16 16:20'), mode: 'practice', messages: [] },
    { id: '9', title: 'History Essay Tips', timestamp: new Date('2025-10-16 13:45'), mode: 'ask', messages: [] },
    { id: '10', title: 'Geometry Proofs', timestamp: new Date('2025-10-15 15:30'), mode: 'concept', messages: [] },
    { id: '11', title: 'Science Lab Report', timestamp: new Date('2025-10-15 10:00'), mode: 'homework', messages: [] },
    { id: '12', title: 'Trigonometry Practice', timestamp: new Date('2025-10-14 14:25'), mode: 'practice', messages: [] },
    { id: '13', title: 'Literature Analysis', timestamp: new Date('2025-10-14 09:15'), mode: 'ask', messages: [] },
    { id: '14', title: 'Calculus Derivatives', timestamp: new Date('2025-10-13 16:40'), mode: 'concept', messages: [] },
    { id: '15', title: 'Biology Homework', timestamp: new Date('2025-10-13 12:30'), mode: 'homework', messages: [] },
  ]);

  const tutoringModes: TutoringMode[] = [
    {
      id: 'homework',
      name: 'Homework',
      icon: '📝',
      description: 'Get help with homework problems',
      placeholder: 'Ask about your homework...',
    },
    {
      id: 'concept',
      name: 'Concepts',
      icon: '💡',
      description: 'Understand difficult concepts',
      placeholder: 'What concept would you like to understand?',
    },
    {
      id: 'practice',
      name: 'Practice',
      icon: '✍️',
      description: 'Get practice problems',
      placeholder: 'Request practice problems...',
    },
    {
      id: 'ask',
      name: 'Q&A',
      icon: '❓',
      description: 'Ask any study question',
      placeholder: 'Ask me anything...',
    },
  ];


  // Mock AI responses based on mode
  const getAIResponse = (userMessage: string, mode: string): string => {
    const responses: Record<string, string[]> = {
      homework: [
        "I'd be happy to help you with your homework! Let's break this problem down step by step. First, let's identify what information we have...",
        "Great question! To solve this problem, we need to think about the key concepts involved. Here's my approach...",
        "Let me guide you through this. Can you tell me what you've tried so far? This will help me understand where you're stuck.",
      ],
      concept: [
        "Let me explain this concept in a simple way. Imagine you have... This is similar to when you...",
        "This is an important concept! Here's how I like to think about it: Think of it like... Does that make sense?",
        "Great topic! Let's break this down into smaller, easier-to-understand parts: 1) First... 2) Then... 3) Finally...",
      ],
      practice: [
        "Here's a practice problem for you:\n\nProblem: Calculate 15% of 80.\n\nTake your time and let me know your answer. I'll provide feedback!",
        "Let's practice! Here's a problem:\n\nIf a train travels 60 km in 45 minutes, what is its speed in km/h?\n\nTry solving it step by step.",
        "Practice problem:\n\nSolve for x: 2x + 5 = 13\n\nShow me your work and I'll check if you're on the right track!",
      ],
      ask: [
        "That's an interesting question! Here's what I know about that topic...",
        "I'm here to help! Let me provide you with a comprehensive answer...",
        "Great curiosity! This relates to several important concepts. Let me explain...",
      ],
    };

    const modeResponses = responses[mode] || responses.ask;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
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
        content: getAIResponse(inputValue, selectedMode),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleModeChange = (modeId: string) => {
    // Save current chat if there are messages
    if (messages.length > 1) { // More than just welcome message
      const currentChatId = selectedChat === 'current' ? Date.now().toString() : selectedChat;
      if (selectedChat === 'current') {
        // Create new chat history entry
        const newChat: ChatHistory = {
          id: currentChatId,
          title: messages[1]?.content.substring(0, 30) + '...' || 'New Chat',
          timestamp: new Date(),
          mode: selectedMode,
          messages: [...messages],
        };
        setChatHistory(prev => [newChat, ...prev]);
      }
      
      // Start fresh chat
      setMessages([]);
      setSelectedChat('current');
    }
    
    setSelectedMode(modeId);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    
    if (chatId === 'current') {
      // Load welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your AI Learning Tutor. Select a mode and ask me anything - I'm here to help you learn!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else {
      // Load chat history
      const chat = chatHistory.find(c => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
        setSelectedMode(chat.mode);
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
        content: "Hello! I'm your AI Learning Tutor. Select a mode and ask me anything - I'm here to help you learn!",
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

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your AI Learning Tutor. Select a mode and ask me anything - I'm here to help you learn!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const currentMode = tutoringModes.find(m => m.id === selectedMode) || tutoringModes[0];

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
          {/* Mode Selection Buttons */}
          <div className={styles.modeButtons}>
            {tutoringModes.map((mode) => (
              <button
                key={mode.id}
                className={`${styles.modeButton} ${selectedMode === mode.id ? styles.active : ''}`}
                onClick={() => handleModeChange(mode.id)}
                title={mode.description}
              >
                <span className={styles.modeIcon}>{mode.icon}</span>
                <span className={styles.modeName}>{mode.name}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🤖</div>
                <h2 className={styles.emptyTitle}>AI Learning Tutor</h2>
                <p className={styles.emptyText}>How can I help you today?</p>
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
              placeholder={currentMode.placeholder}
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

