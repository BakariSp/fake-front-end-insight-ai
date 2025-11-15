// 教师端班级作业Mock数据

import {
  ClassAssignment,
  StudentSubmission,
  ClassAnalytics,
  AssignmentStatus,
  QuestionType,
} from './types';

// Mock 班级作业列表 - 四个状态示例
export const mockClassAssignments: ClassAssignment[] = [
  // 1. Draft 草稿 - 尚未发布
  {
    id: 'assignment-draft-001',
    title: '第三单元语文综合测试（草稿）',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含古诗词鉴赏、现代文阅读和作文',
    dueDate: '2025-11-25 23:59',
    totalPoints: 100,
    status: 'draft' as const,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        order: 1,
        content: '下列词语中加点字的读音完全正确的一项是',
        points: 5,
        options: [
          'A. 皈(guī)依 奇葩(pā) 纤(qiān)细',
          'B. 剥(bāo)削 着(zháo)急 憎(zēng)恨',
          'C. 拮据(jū) 哺(bǔ)育 矫(jiǎo)健',
          'D. 瞭(liǎo)望 解剖(pōu) 粗犷(guǎng)'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        type: 'fill-blank',
        order: 2,
        content: '请根据上下文填写恰当的词语：生活中处处有美，只要我们用心去{{1}}，就能发现身边的点滴{{2}}。',
        points: 10,
        blanks: [
          {
            id: 'blank-1',
            index: 1,
            correctAnswers: ['观察', '发现', '感受'],
            points: 5,
          },
          {
            id: 'blank-2',
            index: 2,
            correctAnswers: ['美好', '精彩', '温暖'],
            points: 5,
          }
        ],
      },
      {
        id: 'q3',
        type: 'essay',
        order: 3,
        content: '请以"成长的烦恼"为话题，写一篇不少于800字的作文。要求：①立意自定；②文体自选；③题目自拟。',
        points: 60,
        rubric: '内容充实、结构完整、语言流畅、有真情实感',
        keywords: ['成长', '烦恼', '感悟', '真实情感'],
      }
    ],
    stats: {
      totalStudents: 45,
      submitted: 0,
      notSubmitted: 45,
      graded: 0,
    }
  },
  
  // 2. Published 已发布 - 收集中
  {
    id: 'assignment-published-001',
    title: '期中复习：现代文阅读理解',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含现代文阅读、语言运用等内容',
    dueDate: '2025-11-20 23:59',
    publishDate: '2025-11-10 08:00',
    totalPoints: 80,
    status: 'published' as const,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        order: 1,
        content: '下列句子中标点符号使用正确的一项是',
        points: 5,
        options: [
          'A. 他问："你去哪里？"',
          'B. 他问："你去哪里"？',
          'C. 他问"你去哪里？"',
          'D. 他问"你去哪里"？'
        ],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        type: 'fill-blank',
        order: 2,
        content: '《沁园春·长沙》中，"{{1}}"一句体现了诗人的远大抱负。',
        points: 5,
        blanks: [
          {
            id: 'blank-1',
            index: 1,
            correctAnswers: ['问苍茫大地，谁主沉浮', '指点江山，激扬文字'],
            points: 5,
          }
        ],
      },
      {
        id: 'q3',
        type: 'essay',
        order: 3,
        content: '阅读下面的文字，完成题目：（文章省略）\n\n请概括本文的主要内容，并谈谈你的理解。（不少于200字）',
        points: 30,
        rubric: '理解准确、分析深入、表达清楚',
        keywords: ['主题理解', '文本分析', '个人见解'],
      }
    ],
    stats: {
      totalStudents: 45,
      submitted: 28,
      notSubmitted: 17,
      graded: 0,
    }
  },
  
  // 3. Grading 批改中 - 已截止，AI正在批改
  {
    id: 'assignment-grading-001',
    title: '第四单元测试：议论文写作',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含议论文阅读理解和写作',
    dueDate: '2025-11-10 23:59',
    publishDate: '2025-11-03 08:00',
    totalPoints: 100,
    status: 'grading' as const,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        order: 1,
        content: '下列论证方法使用不当的一项是',
        points: 5,
        options: [
          'A. 举例论证',
          'B. 对比论证',
          'C. 比喻论证',
          'D. 类比论证'
        ],
        correctAnswer: 3,
      },
      {
        id: 'q2',
        type: 'essay',
        order: 2,
        content: '请以"坚持的力量"为题，写一篇议论文。要求：①观点明确；②论据充分；③不少于600字。',
        points: 50,
        rubric: '论点明确、论据充分、论证有力、语言流畅',
        keywords: ['坚持', '毅力', '成功', '论据', '事例'],
      }
    ],
    stats: {
      totalStudents: 45,
      submitted: 42,
      notSubmitted: 3,
      graded: 25,  // 部分已批改
      avgScore: 76.8,
      maxScore: 92,
      minScore: 58,
    }
  },
  
  // 4. Graded 已完成 - 全部批改完成
  {
    id: 'assignment-graded-001',
    title: '第二單元綜合測試：文言文與古詩詞',
    subject: '語文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含文言文閱讀、古詩詞鑒賞和語言運用',
    dueDate: '2025-11-08 23:59',
    publishDate: '2025-11-01 08:00',
    totalPoints: 100,
    status: 'graded' as const,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        order: 1,
        content: '下列句子中「之」字的用法與其他三項不同的是',
        points: 5,
        options: [
          'A. 何陋之有',
          'B. 送孟浩然之廣陵',
          'C. 吾欲之南海',
          'D. 輟耕之壟上'
        ],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        type: 'choice',
        order: 2,
        content: '下列對《赤壁賦》的理解，不正確的一項是',
        points: 5,
        options: [
          'A. 文章借景抒情，表達了作者的人生感悟',
          'B. 「江上之清風，與山間之明月」體現了作者超脫的心境',
          'C. 文章通篇充滿了悲觀消極的情緒',
          'D. 作者最終達到了物我兩忘的境界'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        order: 3,
        content: '《琵琶行》中，「{{1}}，{{2}}」兩句運用了比喻的修辭手法，描寫了琵琶的聲音。',
        points: 10,
        blanks: [
          {
            id: 'blank-1',
            index: 1,
            correctAnswers: ['大弦嘈嘈如急雨'],
            points: 5,
          },
          {
            id: 'blank-2',
            index: 2,
            correctAnswers: ['小弦切切如私語'],
            points: 5,
          }
        ],
      },
      {
        id: 'q4',
        type: 'essay',
        order: 4,
        content: '請賞析《靜女》一詩中「愛而不見，搔首踟躕」兩句的表現手法和思想感情。（不少於150字）',
        points: 20,
        rubric: '分析手法準確、理解情感到位、表達流暢',
        keywords: ['表現手法', '動作描寫', '人物情感', '等待焦急'],
      },
      {
        id: 'q5',
        type: 'essay',
        order: 5,
        content: '閱讀下面的文言文，回答問題：（文言文材料省略）\n\n1. 解釋下列加點詞的含義\n2. 翻譯畫線句子\n3. 概括文章的主要內容',
        points: 30,
        rubric: '理解準確、翻譯通順、分析合理',
        keywords: ['文言實詞', '句子翻譯', '內容概括'],
      },
      {
        id: 'q6',
        type: 'essay',
        order: 6,
        content: '請以「傳統文化的魅力」為主題，結合本單元所學內容，談談你的認識和感受。（不少於300字）',
        points: 30,
        rubric: '觀點明確、論述充分、結合實例、語言流暢',
        keywords: ['傳統文化', '個人認識', '學習感悟'],
      }
    ],
    stats: {
      totalStudents: 45,
      submitted: 43,
      notSubmitted: 2,
      graded: 43,
      avgScore: 78.5,
      maxScore: 94,
      minScore: 52,
    }
  }
];

// Mock 学生提交数据（用于已评分的作业）
export const mockStudentSubmissions: StudentSubmission[] = [
  {
    id: 'sub-001',
    studentId: 'stu-001',
    studentName: '张小明',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    assignmentId: 'assignment-graded-001',
    submitTime: '2025-11-08 20:30',
    status: 'graded',
    aiScore: 85,
    answers: [
      {
        questionId: 'q1',
        answer: 0,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正確！',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正確！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如私語', isCorrect: true }
        ],
        aiScore: 10,
        aiComment: '兩處填空都正確！',
      },
      {
        questionId: 'q4',
        answer: '這兩句詩運用了動作描寫和心理描寫的手法。「愛而不見」寫出了約會對象未如約而至的情況，「搔首踟躕」通過動作描寫，生動地表現了主人公等待心上人時焦急、期盼而又不知所措的複雜心情。這種細膩的描寫讓讀者能夠感同身受，體會到戀愛中的甜蜜與焦慮。',
        aiScore: 17,
        aiComment: '分析較為準確，能夠識別主要表現手法，對情感的理解也比較到位。但可以進一步分析「搔首踟躕」中動作的象徵意義。',
      },
      {
        questionId: 'q5',
        answer: '1. 詞語解釋：（具體答案省略）\n2. 句子翻譯：（具體翻譯省略）\n3. 本文主要講述了一個關於誠信的故事，強調了誠實守信在古代社會中的重要性。',
        aiScore: 24,
        aiComment: '文言實詞解釋基本準確，翻譯較為通順，但個別地方不夠準確。內容概括抓住了主旨。',
      },
      {
        questionId: 'q6',
        answer: '通過本單元的學習，我深深感受到了中國傳統文化的獨特魅力。無論是《詩經》中的純真情感，還是《楚辭》中的浪漫想像，都體現了古人豐富的精神世界。特別是學習《琵琶行》後，我被白居易細膩的描寫和深刻的同情心所打動。傳統文化不僅是歷史的積澱，更是民族精神的體現。我們應該在學習中不斷汲取傳統文化的營養，讓這些寶貴的文化遺產在新時代煥發新的光彩。作為新時代的青年，我們有責任傳承和發揚優秀的傳統文化，讓更多人了解和欣賞中華文化之美。',
        aiScore: 24,
        aiComment: '觀點明確，能夠結合具體作品談感受。論述較為充分，語言流暢。但可以更深入地分析傳統文化對現代社會的意義。',
      }
    ],
    totalScore: 85,
  },
  {
    id: 'sub-002',
    studentId: 'stu-002',
    studentName: '李小红',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
    assignmentId: 'assignment-graded-001',
    submitTime: '2025-11-08 22:15',
    status: 'graded',
    aiScore: 92,
    answers: [
      {
        questionId: 'q1',
        answer: 0,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正確！',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正確！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如私語', isCorrect: true }
        ],
        aiScore: 10,
        aiComment: '兩處填空都正確！',
      },
      {
        questionId: 'q4',
        answer: '這兩句詩巧妙地運用了動作描寫和心理描寫相結合的表現手法。「愛而不見」既是客觀事實的陳述，又暗含了主人公的失望；「搔首踟躕」則通過具體可感的動作，將內心的焦急、期盼、不安等複雜情感外化，使得抽象的心理狀態具象化。「搔首」這一無意識的動作，恰到好處地表現了等待時的煩躁；「踟躕」則展現了既想離去又不捨離去的矛盾心理。整體來看，這兩句詩以簡潔的語言，生動地刻畫了戀愛中少年特有的青澀與真摯，具有很強的藝術感染力。',
        aiScore: 20,
        aiComment: '分析非常到位！能夠準確識別表現手法，深入理解動作的象徵意義，對情感的把握也很細膩。表達流暢，邏輯清晰。',
      },
      {
        questionId: 'q5',
        answer: '1. 詞語解釋準確全面\n2. 翻譯通順達意\n3. 概括準確完整',
        aiScore: 28,
        aiComment: '文言文理解能力強，詞語解釋準確，翻譯通順，內容概括全面。',
      },
      {
        questionId: 'q6',
        answer: '本單元的學習讓我對傳統文化有了更深的認識。傳統文化的魅力首先體現在其深厚的歷史底蘊上。從《詩經》到唐詩宋詞，每一部經典都承載着特定時代的文化記憶和審美追求。其次，傳統文化展現了中華民族獨特的思維方式和價值觀念。比如《靜女》中含蓄委婉的情感表達，體現了中國人特有的審美情趣；《赤壁賦》中物我兩忘的哲學思考，則反映了道家思想對文人的深遠影響。此外，傳統文化的魅力還在於其強大的生命力和適應性。古典詩詞中的意象、典故至今仍活躍在現代文學創作中，成為我們表達情感、思考人生的重要素材。作為新時代的學生，我們應該以開放包容的心態學習傳統文化，在繼承中創新，讓傳統文化在當代社會中繼續發揮其獨特的價值和作用。',
        aiScore: 24,
        aiComment: '論述充分，結構清晰，能夠從多個角度分析傳統文化的魅力。結合具體作品的例子恰當，表達流暢。觀點有深度。',
      }
    ],
    totalScore: 92,
  },
  {
    id: 'sub-003',
    studentId: 'stu-003',
    studentName: '王大伟',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
    assignmentId: 'assignment-graded-001',
    submitTime: '2025-11-08 23:45',
    status: 'graded',
    aiScore: 68,
    answers: [
      {
        questionId: 'q1',
        answer: 1,
        aiScore: 0,
        isCorrect: false,
        aiComment: '答案錯誤。正確答案是A。',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正確！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如細雨', isCorrect: false }
        ],
        aiScore: 5,
        aiComment: '第一空正確，第二空有誤。正確答案是「小弦切切如私語」。',
      },
      {
        questionId: 'q4',
        answer: '這兩句詩寫了一個人在等待的情景。「愛而不見」是說他喜歡的人沒有出現，「搔首踟躕」是說他很着急，不停地抓頭，來回走動。這表現了他等待時的心情很焦急。',
        aiScore: 12,
        aiComment: '能夠理解詩句的基本含義和情感，但分析不夠深入。應該進一步分析表現手法（動作描寫、心理描寫）的作用，以及動作背後的深層含義。語言表達也比較簡單。',
      },
      {
        questionId: 'q5',
        answer: '詞語解釋和翻譯基本正確，但有些地方理解不夠準確。內容概括過於簡單。',
        aiScore: 18,
        aiComment: '文言文理解能力有待提高，部分實詞理解不夠準確，翻譯不夠通順。',
      },
      {
        questionId: 'q6',
        answer: '我覺得傳統文化很重要。我們學習了很多古詩詞，比如《詩經》、《琵琶行》等。這些詩詞都很美，讓我們了解了古代的生活和文化。傳統文化是我們的寶貴財富，我們應該好好學習和傳承。我會繼續努力學習傳統文化，讓它發揚光大。',
        aiScore: 18,
        aiComment: '觀點正確但論述不夠充分，缺乏深入分析。舉例比較表面，沒有具體說明傳統文化的魅力體現在哪些方面。語言表達比較簡單，缺少個人深刻的認識和感悟。字數也略顯不足。',
      }
    ],
    totalScore: 68,
  },
  // 再添加几个学生数据...
  {
    id: 'sub-004',
    studentId: 'stu-004',
    studentName: '赵小芳',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
    assignmentId: 'assignment-graded-001',
    submitTime: '2025-11-08 19:20',
    status: 'graded',
    aiScore: 81,
    answers: [
      { questionId: 'q1', answer: 0, aiScore: 5, isCorrect: true },
      { questionId: 'q2', answer: 2, aiScore: 5, isCorrect: true },
      { questionId: 'q3', answer: [
        { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
        { blankId: 'blank-2', answer: '小弦切切如私语', isCorrect: true }
      ], aiScore: 10 },
      { questionId: 'q4', answer: '运用动作描写...', aiScore: 16 },
      { questionId: 'q5', answer: '较好的答案', aiScore: 22 },
      { questionId: 'q6', answer: '充分的论述...', aiScore: 23 },
    ],
    totalScore: 81,
  },
  {
    id: 'sub-005',
    studentId: 'stu-005',
    studentName: '刘强',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liu',
    assignmentId: 'assignment-graded-001',
    submitTime: '2025-11-08 21:50',
    status: 'graded',
    aiScore: 75,
    answers: [
      { questionId: 'q1', answer: 0, aiScore: 5, isCorrect: true },
      { questionId: 'q2', answer: 1, aiScore: 0, isCorrect: false },
      { questionId: 'q3', answer: [
        { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
        { blankId: 'blank-2', answer: '小弦切切如私语', isCorrect: true }
      ], aiScore: 10 },
      { questionId: 'q4', answer: '基本分析...', aiScore: 14 },
      { questionId: 'q5', answer: '中等答案', aiScore: 21 },
      { questionId: 'q6', answer: '一般论述...', aiScore: 25 },
    ],
    totalScore: 75,
  },
];

// Mock 班级分析数据
export const mockClassAnalytics: ClassAnalytics = {
  assignmentId: 'assignment-graded-001',
  classId: 'class-001',
  
  // 分数分布
  scoreDistribution: [
    { range: '90-100', count: 8, percentage: 18.6 },
    { range: '80-89', count: 15, percentage: 34.9 },
    { range: '70-79', count: 12, percentage: 27.9 },
    { range: '60-69', count: 6, percentage: 14.0 },
    { range: '0-59', count: 2, percentage: 4.6 },
  ],
  
  // 题目难度分析
  questionDifficulty: [
    {
      questionId: 'q1',
      questionTitle: '选择题：文言虚词"之"的用法',
      correctRate: 86.0,
      avgScore: 4.3,
      difficulty: 'easy',
      commonMistakes: ['混淆了"之"作为代词和动词的用法'],
    },
    {
      questionId: 'q2',
      questionTitle: '选择题：《赤壁赋》理解',
      correctRate: 79.1,
      avgScore: 4.0,
      difficulty: 'easy',
      commonMistakes: ['对文章主旨把握不准确'],
    },
    {
      questionId: 'q3',
      questionTitle: '填空题：《琵琶行》名句默写',
      correctRate: 72.1,
      avgScore: 7.2,
      difficulty: 'medium',
      commonMistakes: ['第二句"私语"写成"细语"或"密语"'],
    },
    {
      questionId: 'q4',
      questionTitle: '诗歌鉴赏：《静女》赏析',
      correctRate: 65.1,
      avgScore: 13.0,
      difficulty: 'medium',
      commonMistakes: [
        '表现手法识别不准确',
        '对"搔首踟蹰"的理解停留在表面',
        '缺少对情感的深入分析'
      ],
    },
    {
      questionId: 'q5',
      questionTitle: '文言文综合题',
      correctRate: 58.1,
      avgScore: 17.4,
      difficulty: 'hard',
      commonMistakes: [
        '实词解释不够准确',
        '句子翻译不够通顺',
        '内容概括不够全面'
      ],
    },
    {
      questionId: 'q6',
      questionTitle: '论述题：传统文化的魅力',
      correctRate: 60.5,
      avgScore: 18.1,
      difficulty: 'hard',
      commonMistakes: [
        '论述不够深入，停留在表面',
        '缺少具体例子支撑',
        '个人感悟不够真实深刻',
        '字数不足'
      ],
    },
  ],
  
  // 薄弱知识点
  weakPoints: [
    {
      id: 'weak-001',
      topic: '文言文翻译',
      description: '学生在文言文句子翻译时，普遍存在不能准确把握句式特点、实词含义理解不到位的问题',
      affectedStudents: 28,
      percentage: 65.1,
      relatedQuestions: ['q5'],
      suggestions: [
        '加强文言实词的积累和运用',
        '注重特殊句式的识别和翻译方法',
        '多做翻译练习，注重字字落实',
        '培养根据上下文推断词义的能力'
      ],
    },
    {
      id: 'weak-002',
      topic: '诗歌鉴赏表现手法分析',
      description: '部分学生不能准确识别和分析诗歌中的表现手法，分析流于表面，缺乏深度',
      affectedStudents: 22,
      percentage: 51.2,
      relatedQuestions: ['q4'],
      suggestions: [
        '系统梳理常见的表现手法（修辞、描写方法、表达方式等）',
        '通过经典诗歌示例加强手法识别训练',
        '注重分析手法的表达效果，而不是简单识别',
        '培养结合诗歌内容和情感的综合分析能力'
      ],
    },
    {
      id: 'weak-003',
      topic: '论述题的深度与广度',
      description: '在论述题中，学生普遍存在论述不够深入、缺少具体例子、个人感悟不够真实的问题',
      affectedStudents: 25,
      percentage: 58.1,
      relatedQuestions: ['q6'],
      suggestions: [
        '引导学生从多角度分析问题',
        '强调具体例子的重要性，避免空洞说教',
        '鼓励学生表达真实想法和感受',
        '提供优秀范文，学习论述的方法和技巧'
      ],
    },
  ],
  
  // 优秀表现
  strengths: [
    '选择题整体正确率较高，基础知识掌握较好',
    '名句默写准确率高，背诵功底扎实',
    '大部分学生能够理解文言文的基本含义',
    '学生的语言表达能力整体较好，书面表达规范'
  ],
  
  // 成绩趋势（可选，用于对比多次作业）
  scoreTrend: {
    labels: ['第一次', '第二次', '第三次', '第四次', '本次'],
    data: [72.3, 75.8, 74.2, 76.5, 78.5],
  },
};

// 获取指定作业的Mock数据
export function getAssignmentById(id: string): ClassAssignment | undefined {
  return mockClassAssignments.find(a => a.id === id);
}

// Mock data for published assignment (not yet due)
const mockPublishedSubmissions: StudentSubmission[] = [
  {
    id: 'sub-pub-001',
    studentId: 'stu-001',
    studentName: '张小明',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    assignmentId: 'assignment-published-001',
    submitTime: '2025-11-12 14:30',
    status: 'submitted',
    answers: [],
  },
  {
    id: 'sub-pub-002',
    studentId: 'stu-002',
    studentName: '李小红',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
    assignmentId: 'assignment-published-001',
    submitTime: '2025-11-12 16:20',
    status: 'submitted',
    answers: [],
  },
  // Add more students who haven't submitted yet (total 45, 28 submitted)
  ...Array.from({ length: 26 }, (_, i) => ({
    id: `sub-pub-${i + 3}`,
    studentId: `stu-${i + 3}`,
    studentName: `学生${i + 3}`,
    studentAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Student${i + 3}`,
    assignmentId: 'assignment-published-001',
    submitTime: i < 24 ? `2025-11-12 ${10 + i}:${20 + i}` : undefined,
    status: (i < 24 ? 'submitted' : 'not_submitted') as 'submitted' | 'not_submitted',
    answers: [],
  })),
];

// 获取指定作业的学生提交数据
export function getSubmissionsByAssignmentId(assignmentId: string): StudentSubmission[] {
  if (assignmentId === 'assignment-published-001') {
    return mockPublishedSubmissions;
  }
  return mockStudentSubmissions.filter(s => s.assignmentId === assignmentId);
}

// 获取指定作业的分析数据
export function getAnalyticsByAssignmentId(assignmentId: string): ClassAnalytics | undefined {
  if (assignmentId === 'assignment-graded-001') {
    return mockClassAnalytics;
  }
  return undefined;
}

