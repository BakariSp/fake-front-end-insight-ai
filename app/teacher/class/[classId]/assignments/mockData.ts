// 教师端班级作业Mock数据

import {
  ClassAssignment,
  StudentSubmission,
  ClassAnalytics,
  AssignmentStatus,
  QuestionType,
} from './types';

// Mock 班级作业列表
export const mockClassAssignments: ClassAssignment[] = [
  // Draft 草稿
  {
    id: 'assignment-draft-001',
    title: '第三单元语文综合测试',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含古诗词鉴赏、现代文阅读和作文',
    dueDate: '2025-11-25 23:59',
    totalPoints: 100,
    status: 'draft',
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
  
  // Published but not due 已发布未到期
  {
    id: 'assignment-published-001',
    title: '期中复习：现代文阅读理解',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含现代文阅读、语言运用等内容',
    dueDate: '2025-11-18 23:59',
    publishDate: '2025-11-10 08:00',
    totalPoints: 80,
    status: 'published',
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
  
  // Published, passed due, and graded by AI 已发布已过期已AI评分
  {
    id: 'assignment-graded-001',
    title: '第二单元综合测试：文言文与古诗词',
    subject: '语文',
    classId: 'class-001',
    className: '高一（3）班',
    description: '包含文言文阅读、古诗词鉴赏和语言运用',
    dueDate: '2025-11-08 23:59',
    publishDate: '2025-11-01 08:00',
    totalPoints: 100,
    status: 'graded',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        order: 1,
        content: '下列句子中"之"字的用法与其他三项不同的是',
        points: 5,
        options: [
          'A. 何陋之有',
          'B. 送孟浩然之广陵',
          'C. 吾欲之南海',
          'D. 辍耕之垄上'
        ],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        type: 'choice',
        order: 2,
        content: '下列对《赤壁赋》的理解，不正确的一项是',
        points: 5,
        options: [
          'A. 文章借景抒情，表达了作者的人生感悟',
          'B. "江上之清风，与山间之明月"体现了作者超脱的心境',
          'C. 文章通篇充满了悲观消极的情绪',
          'D. 作者最终达到了物我两忘的境界'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        order: 3,
        content: '《琵琶行》中，"{{1}}，{{2}}"两句运用了比喻的修辞手法，描写了琵琶的声音。',
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
            correctAnswers: ['小弦切切如私语'],
            points: 5,
          }
        ],
      },
      {
        id: 'q4',
        type: 'essay',
        order: 4,
        content: '请赏析《静女》一诗中"爱而不见，搔首踟蹰"两句的表现手法和思想感情。（不少于150字）',
        points: 20,
        rubric: '分析手法准确、理解情感到位、表达流畅',
        keywords: ['表现手法', '动作描写', '人物情感', '等待焦急'],
      },
      {
        id: 'q5',
        type: 'essay',
        order: 5,
        content: '阅读下面的文言文，回答问题：（文言文材料省略）\n\n1. 解释下列加点词的含义\n2. 翻译画线句子\n3. 概括文章的主要内容',
        points: 30,
        rubric: '理解准确、翻译通顺、分析合理',
        keywords: ['文言实词', '句子翻译', '内容概括'],
      },
      {
        id: 'q6',
        type: 'essay',
        order: 6,
        content: '请以"传统文化的魅力"为主题，结合本单元所学内容，谈谈你的认识和感受。（不少于300字）',
        points: 30,
        rubric: '观点明确、论述充分、结合实例、语言流畅',
        keywords: ['传统文化', '个人认识', '学习感悟'],
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
        aiComment: '回答正确！',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正确！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如私语', isCorrect: true }
        ],
        aiScore: 10,
        aiComment: '两处填空都正确！',
      },
      {
        questionId: 'q4',
        answer: '这两句诗运用了动作描写和心理描写的手法。"爱而不见"写出了约会对象未如约而至的情况，"搔首踟蹰"通过动作描写，生动地表现了主人公等待心上人时焦急、期盼而又不知所措的复杂心情。这种细腻的描写让读者能够感同身受，体会到恋爱中的甜蜜与焦虑。',
        aiScore: 17,
        aiComment: '分析较为准确，能够识别主要表现手法，对情感的理解也比较到位。但可以进一步分析"搔首踟蹰"中动作的象征意义。',
      },
      {
        questionId: 'q5',
        answer: '1. 词语解释：（具体答案省略）\n2. 句子翻译：（具体翻译省略）\n3. 本文主要讲述了一个关于诚信的故事，强调了诚实守信在古代社会中的重要性。',
        aiScore: 24,
        aiComment: '文言实词解释基本准确，翻译较为通顺，但个别地方不够准确。内容概括抓住了主旨。',
      },
      {
        questionId: 'q6',
        answer: '通过本单元的学习，我深深感受到了中国传统文化的独特魅力。无论是《诗经》中的纯真情感，还是《楚辞》中的浪漫想象，都体现了古人丰富的精神世界。特别是学习《琵琶行》后，我被白居易细腻的描写和深刻的同情心所打动。传统文化不仅是历史的积淀，更是民族精神的体现。我们应该在学习中不断汲取传统文化的营养，让这些宝贵的文化遗产在新时代焕发新的光彩。作为新时代的青年，我们有责任传承和发扬优秀的传统文化，让更多人了解和欣赏中华文化之美。',
        aiScore: 24,
        aiComment: '观点明确，能够结合具体作品谈感受。论述较为充分，语言流畅。但可以更深入地分析传统文化对现代社会的意义。',
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
        aiComment: '回答正确！',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正确！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如私语', isCorrect: true }
        ],
        aiScore: 10,
        aiComment: '两处填空都正确！',
      },
      {
        questionId: 'q4',
        answer: '这两句诗巧妙地运用了动作描写和心理描写相结合的表现手法。"爱而不见"既是客观事实的陈述，又暗含了主人公的失望；"搔首踟蹰"则通过具体可感的动作，将内心的焦急、期盼、不安等复杂情感外化，使得抽象的心理状态具象化。"搔首"这一无意识的动作，恰到好处地表现了等待时的烦躁；"踟蹰"则展现了既想离去又不舍离去的矛盾心理。整体来看，这两句诗以简洁的语言，生动地刻画了恋爱中少年特有的青涩与真挚，具有很强的艺术感染力。',
        aiScore: 20,
        aiComment: '分析非常到位！能够准确识别表现手法，深入理解动作的象征意义，对情感的把握也很细腻。表达流畅，逻辑清晰。',
      },
      {
        questionId: 'q5',
        answer: '1. 词语解释准确全面\n2. 翻译通顺达意\n3. 概括准确完整',
        aiScore: 28,
        aiComment: '文言文理解能力强，词语解释准确，翻译通顺，内容概括全面。',
      },
      {
        questionId: 'q6',
        answer: '本单元的学习让我对传统文化有了更深的认识。传统文化的魅力首先体现在其深厚的历史底蕴上。从《诗经》到唐诗宋词，每一部经典都承载着特定时代的文化记忆和审美追求。其次，传统文化展现了中华民族独特的思维方式和价值观念。比如《静女》中含蓄委婉的情感表达，体现了中国人特有的审美情趣；《赤壁赋》中物我两忘的哲学思考，则反映了道家思想对文人的深远影响。此外，传统文化的魅力还在于其强大的生命力和适应性。古典诗词中的意象、典故至今仍活跃在现代文学创作中，成为我们表达情感、思考人生的重要素材。作为新时代的学生，我们应该以开放包容的心态学习传统文化，在继承中创新，让传统文化在当代社会中继续发挥其独特的价值和作用。',
        aiScore: 24,
        aiComment: '论述充分，结构清晰，能够从多个角度分析传统文化的魅力。结合具体作品的例子恰当，表达流畅。观点有深度。',
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
        aiComment: '答案错误。正确答案是A。',
      },
      {
        questionId: 'q2',
        answer: 2,
        aiScore: 5,
        isCorrect: true,
        aiComment: '回答正确！',
      },
      {
        questionId: 'q3',
        answer: [
          { blankId: 'blank-1', answer: '大弦嘈嘈如急雨', isCorrect: true },
          { blankId: 'blank-2', answer: '小弦切切如细雨', isCorrect: false }
        ],
        aiScore: 5,
        aiComment: '第一空正确，第二空有误。正确答案是"小弦切切如私语"。',
      },
      {
        questionId: 'q4',
        answer: '这两句诗写了一个人在等待的情景。"爱而不见"是说他喜欢的人没有出现，"搔首踟蹰"是说他很着急，不停地抓头，来回走动。这表现了他等待时的心情很焦急。',
        aiScore: 12,
        aiComment: '能够理解诗句的基本含义和情感，但分析不够深入。应该进一步分析表现手法（动作描写、心理描写）的作用，以及动作背后的深层含义。语言表达也比较简单。',
      },
      {
        questionId: 'q5',
        answer: '词语解释和翻译基本正确，但有些地方理解不够准确。内容概括过于简单。',
        aiScore: 18,
        aiComment: '文言文理解能力有待提高，部分实词理解不够准确，翻译不够通顺。',
      },
      {
        questionId: 'q6',
        answer: '我觉得传统文化很重要。我们学习了很多古诗词，比如《诗经》、《琵琶行》等。这些诗词都很美，让我们了解了古代的生活和文化。传统文化是我们的宝贵财富，我们应该好好学习和传承。我会继续努力学习传统文化，让它发扬光大。',
        aiScore: 18,
        aiComment: '观点正确但论述不够充分，缺乏深入分析。举例比较表面，没有具体说明传统文化的魅力体现在哪些方面。语言表达比较简单，缺少个人深刻的认识和感悟。字数也略显不足。',
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

// 获取指定作业的学生提交数据
export function getSubmissionsByAssignmentId(assignmentId: string): StudentSubmission[] {
  return mockStudentSubmissions.filter(s => s.assignmentId === assignmentId);
}

// 获取指定作业的分析数据
export function getAnalyticsByAssignmentId(assignmentId: string): ClassAnalytics | undefined {
  if (assignmentId === 'assignment-graded-001') {
    return mockClassAnalytics;
  }
  return undefined;
}

