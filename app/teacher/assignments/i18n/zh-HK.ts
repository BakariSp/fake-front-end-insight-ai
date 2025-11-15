// 繁體中文（香港）語言包
export const zhHK = {
  // TopBar
  topBar: {
    back: '返回',
    titlePlaceholder: '作業標題',
    subject: '科目',
    topicLabel: '主題標籤',
    topicPlaceholder: '選擇標籤',
    topicCount: (count: number) => `${count} 個標籤`,
    deadline: '截止時間',
    totalPoints: '總分',
    preview: '預覽',
    saveDraft: '儲存草稿',
    publish: '發佈作業',
  },
  
  // TaskLibrary
  taskLibrary: {
    title: '任務庫',
    subtitle: '拖拽或點擊新增任務',
    tip: '點擊任務卡片快速新增',
  },
  
  // Canvas
  canvas: {
    title: '任務列表',
    taskCount: (count: number) => `${count} 個任務`,
    conflictCount: (count: number) => `${count} 個衝突`,
    globalSettings: '全域設定',
    import: '匯入任務',
    emptyTitle: '尚未新增任務',
    emptyDesc1: '從左側任務庫中選擇任務類型',
    emptyDesc2: '或者點擊下方按鈕匯入已有題目',
  },
  
  // Inspector
  inspector: {
    title: '任務屬性',
    tabBasic: '基本資訊',
    tabSubmission: '提交方式',
    tabAdvanced: '進階選項',
    taskTitle: '任務標題',
    taskTitlePlaceholder: '輸入任務標題',
    instructions: '說明',
    instructionsPlaceholder: '輸入任務說明和要求',
    points: '分值',
    answerType: '答案類型',
    shortAnswer: '短答案',
    longAnswer: '長答案',
    minLength: '最小字數',
    maxLength: '最大字數',
    topicLabel: '主題標籤',
    addCustomTopic: '輸入自訂標籤，按回車新增',
    addButton: '➕ 新增',
    quickSelect: '快速選擇：',
    submissionMethods: '提交方式（可多選）',
    allowResubmit: '允許重新提交',
    resubmitLimit: '重交次數限制',
    visibility: '可見範圍',
  },
  
  // RubricEditor
  rubric: {
    templateLabel: '評分標準範本',
    noTemplate: '無評分標準（自由批改）',
    expand: '展開評分維度',
    collapse: '收起評分維度',
    addDimension: '➕ 新增維度',
    dimensionName: '維度名稱',
    weight: '權重',
    edit: '編輯',
    delete: '刪除',
    description: '簡短描述',
    promptLabel: 'AI 評分提示詞',
    promptPlaceholder: '輸入詳細的 AI 評分提示，幫助 AI 更準確地評估這個維度...',
    totalWeight: '總權重：',
    weightWarning: '⚠️ 權重總和應為 100%',
    aiInfo: 'AI 將根據評分維度、權重和提示詞進行智能評分，您可以隨時調整結果',
  },
  
  // GlobalSettings
  globalSettings: {
    title: '全域設定',
    subtitle: '這些設定將應用到所有任務',
    gradingMode: '批改模式',
    gradingModeDesc: '選擇作業的批改方式',
    autoGrading: '自動批改',
    assistGrading: 'AI 輔助批改',
    manualGrading: '人工批改',
    submissionSettings: '提交設定',
    submissionSettingsDesc: '設定作業提交的規則',
    allowLate: '允許遲交',
    latePolicy: '遲交扣分策略',
    noPenalty: '不扣分',
    penalty10: '扣除 10%',
    penalty20: '扣除 20%',
    confirm: '確定',
  },
  
  // Submission Methods
  submissionMethods: {
    typein: '文字輸入',
    handwriting: '手寫',
    image: '圖片上傳',
    audio: '錄音',
    video: '錄影',
    file: '檔案上傳',
  },
  
  // Messages
  messages: {
    draftSaved: '草稿已儲存！',
    published: '作業已發佈！',
    titleRequired: '請填寫作業標題',
    taskRequired: '請至少新增一個任務',
    minOneDimension: '至少需要保留一個評分維度',
  }
};

