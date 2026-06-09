const dimensions = {
  problem: {
    left: "E",
    right: "B",
    title: "问题取向",
    leftName: "探索型",
    rightName: "建构型",
    leftDesc: "容易被未解释现象、边缘材料和新问题吸引，能在不确定中推进。",
    rightDesc: "擅长把问题纳入结构、模型和谱系，让研究变得清晰且可积累。"
  },
  method: {
    left: "C",
    right: "D",
    title: "方法取向",
    leftName: "概念型",
    rightName: "证据型",
    leftDesc: "重视概念辨析、理论转译和解释框架，常用思想结构推动研究。",
    rightDesc: "重视材料、数据、案例、档案或实验，习惯用证据形成说服力。"
  },
  rhythm: {
    left: "S",
    right: "N",
    title: "工作节奏",
    leftName: "沉潜型",
    rightName: "交互型",
    leftDesc: "需要独立阅读、慢写和长时间推演，思想常在安静中成形。",
    rightDesc: "在讨论、会议、合作和反馈中被激活，适合开放式推进。"
  },
  expression: {
    left: "A",
    right: "H",
    title: "学术表达",
    leftName: "锋利型",
    rightName: "综合型",
    leftDesc: "喜欢明确论点、挑战旧说和制造辨识度，文章往往有破题感。",
    rightDesc: "擅长处理复杂性、整合多方观点和提供细腻解释，强调理解力。"
  }
};

const questions = [
  { dim: "problem", pole: "left", text: "我喜欢研究还没有被充分解释的新现象。" },
  { dim: "problem", pole: "right", text: "我更愿意先梳理清楚一个领域的主要脉络。" },
  { dim: "problem", pole: "left", text: "看到反常案例或新材料，我会想到新的选题。" },
  { dim: "problem", pole: "right", text: "我会优先选择能和已有文献对话的题目。" },
  { dim: "problem", pole: "left", text: "选题刚开始不够清楚时，我也愿意先探索。" },
  { dim: "problem", pole: "right", text: "题目能拆成几个清楚的问题，我会更容易推进。" },
  { dim: "problem", pole: "left", text: "比起完善成熟议题，我更想提出新的问题。" },
  { dim: "problem", pole: "right", text: "我喜欢为研究对象建立分类、阶段或分析框架。" },
  { dim: "problem", pole: "left", text: "不同学科的观点常常会给我新的研究想法。" },

  { dim: "method", pole: "left", text: "写论文时，我通常先确定一个核心概念或理论问题。" },
  { dim: "method", pole: "right", text: "我更习惯从材料、数据或文本中提炼论点。" },
  { dim: "method", pole: "left", text: "一个好的概念能帮助我重新理解很多材料。" },
  { dim: "method", pole: "right", text: "如果证据不扎实，我会对结论没有把握。" },
  { dim: "method", pole: "left", text: "我喜欢给现象下定义、分概念或提出新说法。" },
  { dim: "method", pole: "right", text: "我会认真核对材料来源、样本范围和证据可靠性。" },
  { dim: "method", pole: "left", text: "读理论文章经常能帮我找到研究问题。" },
  { dim: "method", pole: "right", text: "做档案、访谈、数据或文本分析时，我更容易进入状态。" },
  { dim: "method", pole: "left", text: "我希望论文的主要贡献是提出一个新的解释框架。" },

  { dim: "rhythm", pole: "left", text: "我需要比较完整的独处时间，才能专心研究和写作。" },
  { dim: "rhythm", pole: "right", text: "和别人讨论后，我的想法通常会更清楚。" },
  { dim: "rhythm", pole: "left", text: "想法还不成熟时，我不太愿意过早展示。" },
  { dim: "rhythm", pole: "right", text: "把半成品拿出来听意见，通常能帮我继续推进。" },
  { dim: "rhythm", pole: "left", text: "我的重要想法常常来自长时间的独立思考。" },
  { dim: "rhythm", pole: "right", text: "会议、合作节点或外部反馈会明显推动我的进度。" },
  { dim: "rhythm", pole: "left", text: "频繁沟通会打断我的思路，让我难以保持专注。" },
  { dim: "rhythm", pole: "right", text: "有稳定的讨论对象，会明显提高我的研究效率。" },
  { dim: "rhythm", pole: "left", text: "我通常要先自己想清楚，再进入合作或交流。" },

  { dim: "expression", pole: "left", text: "我希望论文有一个清楚、有力度的核心观点。" },
  { dim: "expression", pole: "right", text: "我更想把问题的复杂性讲清楚，而不是简单下结论。" },
  { dim: "expression", pole: "left", text: "我喜欢直接指出已有研究的问题或不足。" },
  { dim: "expression", pole: "right", text: "我更愿意说明不同研究之间的联系，而不是强调对立。" },
  { dim: "expression", pole: "left", text: "写作时，我会努力提出能推动讨论的判断。" },
  { dim: "expression", pole: "right", text: "不同观点都有道理时，我会尽量保留它们的成立条件。" },
  { dim: "expression", pole: "left", text: "如果文章没有明确观点，我会觉得贡献不够突出。" },
  { dim: "expression", pole: "right", text: "如果表达太绝对，我会担心忽略了重要细节。" },
  { dim: "expression", pole: "left", text: "我适合写立场明确、论证有冲击力的文章。" }
];

const typeNames = {
  ECSA: "孤独概念探险家",
  ECSH: "深描型理论漫游者",
  ECNA: "议题发明者",
  ECNH: "跨界解释者",
  EDSA: "材料破局者",
  EDSH: "田野潜航者",
  EDNA: "实证突围者",
  EDNH: "情境漫游者",
  BCSA: "体系建筑师",
  BCSH: "谱系整理者",
  BCNA: "框架倡议者",
  BCNH: "概念整合者",
  BDSA: "证据工程师",
  BDSH: "稳健阐释者",
  BDNA: "协作破题者",
  BDNH: "团队整合者"
};

const typeIntroCopy = {
  ECSA: "你像一位带着概念工具独自进入未知地带的探险者，擅长从尚未命名的问题里提炼新的解释范畴。你的学术辨识度来自问题敏感、理论直觉和鲜明判断。",
  ECSH: "你习惯在复杂现象中缓慢游走，用理论语言捕捉细微差异。你不急于给出单一结论，更擅长把经验、概念与情境编织成有厚度的解释。",
  ECNA: "你容易被新议题、新连接和新命名点燃，常常在讨论与碰撞中找到研究入口。你适合发明问题，也适合把模糊直觉推进成可讨论的学术议题。",
  ECNH: "你像跨学科地图上的解释者，能在不同材料、理论和社群之间建立连接。你的优势不是把问题压扁，而是在多重视角之间生成新的理解框架。",
  EDSA: "你对材料中的异常信号很敏锐，适合从档案、数据、文本或田野里找到突破口。你能把证据链推向清晰论点，让新发现变成有冲击力的学术判断。",
  EDSH: "你适合长时间潜入材料与情境，在细读和观察中让问题自然浮现。你的研究往往不靠高声宣告，而靠扎实材料和复杂解释慢慢建立说服力。",
  EDNA: "你在反馈和协作中推进实证问题，能把新材料、新数据或新案例迅速组织成研究突破。你适合开放式项目，也擅长把经验发现转化为可验证的论点。",
  EDNH: "你像在现场和关系网络中移动的观察者，善于从具体情境里看见问题的多层结构。你的学术风格强调经验敏感、互动反馈和综合解释。",
  BCSA: "你擅长把一个领域搭成可理解、可推演的结构。你的论文通常有清晰框架和强论点，适合提出体系化模型，也适合为复杂材料建立秩序。",
  BCSH: "你擅长梳理脉络、整理谱系和解释概念之间的细微关系。你的学术贡献常常体现在把已有讨论讲清楚、讲稳，并从中提出更成熟的理解。",
  BCNA: "你适合把分散讨论组织成可以被共同使用的框架，并在合作或交流中推动它成形。你的影响力来自结构感、倡议能力和清晰的问题组织方式。",
  BCNH: "你擅长在多个概念、传统和研究路径之间做整合。你不满足于单点突破，更倾向于建立能容纳复杂关系的解释框架。",
  BDSA: "你重视证据链、方法秩序和论证强度，适合把复杂材料加工成一套清楚的证明结构。你的学术辨识度来自可靠、精密和有力度的判断。",
  BDSH: "你适合在稳定框架中进行审慎解释，能把材料、论据和限定条件处理得很稳。你的文章往往不追求惊险，而追求可信、周密和经得起复核。",
  BDNA: "你适合在团队协作中把证据、任务和论点组织起来，推动项目从混乱走向清晰。你能发现关键卡点，也能把分散力量转化为共同突破。",
  BDNH: "你像团队里的整合型解释者，善于协调材料、框架、节奏和不同成员的判断。你的价值在于让复杂项目保持秩序，并形成稳健的共同成果。"
};

const embeddedPersonaImages = window.PERSONA_IMAGES || {};
const typeImageMap = Object.fromEntries(
  Object.keys(typeNames).map((code) => [code, embeddedPersonaImages[code] || `assets/personas/${code}.png`])
);

const reportCopy = {
  strengths: {
    title: "优势",
    tag: "优",
    text: {
      E: "能发现尚未被命名的问题，适合开辟新议题。",
      B: "能把复杂领域组织成可推进的结构，适合长期积累。",
      C: "能提出有解释力的概念，适合理论密度高的写作。",
      D: "能建立稳固证据链，适合材料、数据和案例驱动的研究。",
      S: "能进行高强度独立思考，适合深读、慢写和长周期项目。",
      N: "能在反馈中快速迭代，适合合作项目和跨学科团队。",
      A: "论点鲜明，容易形成辨识度和讨论度。",
      H: "解释细腻，能处理复杂关系并降低过度简化。"
    }
  },
  blind: {
    title: "盲区",
    tag: "盲",
    text: {
      E: "容易高估新问题的成熟度，需要定期检查研究边界。",
      B: "容易过度追求结构完整，错过问题中的意外生长。",
      C: "容易让概念先行，需要避免证据只为理论服务。",
      D: "容易被材料牵制，需要主动提炼更清楚的论点。",
      S: "容易延迟反馈，可能在闭门推进中放大卡点。",
      N: "容易被外部节奏牵引，需要给核心思考留出静默时间。",
      A: "容易把论证写得过紧，需要为反例和限定留下空间。",
      H: "容易削弱中心论点，需要在复杂性中保留明确贡献。"
    }
  },
  writing: {
    title: "写作策略",
    tag: "写",
    text: {
      E: "先写出问题张力，再补足文献定位。",
      B: "先搭建文章结构，再检查是否还有真正的新问题。",
      C: "先定义核心概念，再为每个概念绑定关键证据。",
      D: "先列证据链，再压缩出一句可被引用的核心论断。",
      S: "设置少量但固定的外部检查点，避免无限期打磨。",
      N: "把讨论反馈整理成写作清单，避免想法越聊越散。",
      A: "保留锋利开头，同时在结尾补充条件和限度。",
      H: "先给读者一个明确主张，再展开多层解释。"
    }
  },
  cooperation: {
    title: "合作建议",
    tag: "合",
    text: {
      E: "适合搭配能帮你收束问题边界的人。",
      B: "适合搭配能带来新材料、新直觉和跨界刺激的人。",
      C: "适合搭配材料敏感、验证意识强的合作者。",
      D: "适合搭配擅长概念提炼和理论表达的合作者。",
      S: "合作中应提前约定反馈节点和独立工作时段。",
      N: "合作中应记录决策，避免每次讨论都重新打开问题。",
      A: "适合让综合型合作者检查论证的公平性。",
      H: "适合让锋利型合作者帮助提炼文章的突破句。"
    }
  },
  career: {
    title: "职业阶段建议",
    tag: "阶",
    text: {
      E: "早期要控制选题数量，中后期可形成个人议题群。",
      B: "早期要避免只做整理，中后期可发展为领域框架提供者。",
      C: "早期要训练材料落点，中后期可建立稳定理论标签。",
      D: "早期要训练论点提炼，中后期可积累高可信度资料库。",
      S: "早期要主动建立反馈网络，中后期适合深水区研究。",
      N: "早期要锚定个人主线，中后期适合主持合作项目。",
      A: "早期要学会控制锋芒，中后期可成为清晰议题的发起者。",
      H: "早期要练习中心句，中后期适合做综合判断和领域评论。"
    }
  }
};

const validationSchema = {
  version: "0.2.0",
  scale: "1-5 Likert",
  feedbackScale: "1-7",
  dimensions: {
    problem: "问题取向",
    method: "方法取向",
    rhythm: "工作节奏",
    expression: "学术表达"
  },
  notes: "题目已标注 id、维度、方向、权重和反向题标记；反馈数据会先保存在本机浏览器，再按配置提交到远程收集接口。"
};

questions.forEach((question, index) => {
  question.id = `Q${String(index + 1).padStart(2, "0")}`;
  question.weight = 1;
  question.reverse = question.pole === "right";
});

const questionContexts = {
  problem: {
    eyebrow: "Dimension 01 / E-B",
    title: "你更关注什么问题？",
    subtitle: "看你更倾向发现新问题，还是梳理已有领域。"
  },
  method: {
    eyebrow: "Dimension 02 / C-D",
    title: "你更依赖哪种研究方法？",
    subtitle: "看你更倾向概念和理论，还是材料和证据。"
  },
  rhythm: {
    eyebrow: "Dimension 03 / S-N",
    title: "你更适合怎样推进研究？",
    subtitle: "看你更需要独立思考，还是通过交流推进。"
  },
  expression: {
    eyebrow: "Dimension 04 / A-H",
    title: "你更习惯怎样表达观点？",
    subtitle: "看你更倾向鲜明判断，还是综合解释。"
  }
};

const scaleLabels = ["非常不同意", "比较不同意", "不确定", "比较同意", "非常同意"];

let answers = new Array(questions.length).fill(null);
let latestResult = null;
let currentQuestionIndex = 0;
let latestPosterBlob = null;
const feedbackStorageKey = "academicCompassFeedback.v1";
const pendingFeedbackStorageKey = "academicCompassPendingFeedback.v1";
const playClickStorageKey = "academicCompassPlayClicks.v1";
const playEventStorageKey = "academicCompassPlayEvents.v1";
const emailSignupStorageKey = "academicCompassEmailSignups.v1";
const feedbackSubmitConfig = {
  endpoint: window.ACADEMIC_COMPASS_FEEDBACK_ENDPOINT || "",
  mode: window.ACADEMIC_COMPASS_FEEDBACK_MODE || "cors",
  method: "POST",
  adapter: window.ACADEMIC_COMPASS_FEEDBACK_ADAPTER || "google-sheets"
};

const quizForm = document.querySelector("#quizForm");
const answeredCount = document.querySelector("#answeredCount");
const totalCount = document.querySelector("#totalCount");
const progressFill = document.querySelector("#progressFill");
const testEyebrow = document.querySelector("#testEyebrow");
const testTitle = document.querySelector("#testTitle");
const testSubtitle = document.querySelector("#testSubtitle");
const prevQuestionBtn = document.querySelector("#prevQuestionBtn");
const nextQuestionBtn = document.querySelector("#nextQuestionBtn");
const typeCodeEl = document.querySelector("#typeCode");
const typeNameEl = document.querySelector("#typeName");
const typeIntroEl = document.querySelector("#typeIntro");
const resultPersonaImage = document.querySelector("#resultPersonaImage");
const scoreGrid = document.querySelector("#scoreGrid");
const analysisGrid = document.querySelector("#analysisGrid");
const reportGrid = document.querySelector("#reportGrid");
const radarCanvas = document.querySelector("#radarCanvas");
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackMessage = document.querySelector("#feedbackMessage");
const saveResultBtn = document.querySelector("#saveResultBtn");
const shareResultBtn = document.querySelector("#shareResultBtn");
const viewAllStylesBtn = document.querySelector("#viewAllStylesBtn");
const enterZqBtn = document.querySelector("#enterZqBtn");
const afterSaveActions = document.querySelector("#afterSaveActions");
const strengthDescription = document.querySelector("#strengthDescription");
const weaknessDescription = document.querySelector("#weaknessDescription");
const emailForm = document.querySelector("#emailForm");
const emailInput = document.querySelector("#emailInput");
const emailMessage = document.querySelector("#emailMessage");
const styleGallery = document.querySelector("#styleGallery");
const shareModal = document.querySelector("#shareModal");
const shareCopyText = document.querySelector("#shareCopyText");
const shareBackdrop = document.querySelector("#shareBackdrop");
const shareCloseBtn = document.querySelector("#shareCloseBtn");
const confirmShareBtn = document.querySelector("#confirmShareBtn");

function init() {
  totalCount.textContent = String(questions.length);
  renderStyleGallery();
  renderCurrentQuestion();
  bindNavigation();
  updateProgress();
  renderEmptyState();
  retryPendingFeedback();
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  document.querySelector("#startTestBtn").addEventListener("click", () => showView("test"));
  prevQuestionBtn.addEventListener("click", goToPreviousQuestion);
  nextQuestionBtn.addEventListener("click", goToNextQuestion);
  feedbackForm.addEventListener("submit", saveFeedback);
  saveResultBtn.addEventListener("click", saveResultImage);
  shareResultBtn.addEventListener("click", openShareModal);
  viewAllStylesBtn?.addEventListener("click", () => showView("styles"));
  emailForm.addEventListener("submit", saveEmailSignup);
  enterZqBtn.addEventListener("click", () => window.open("https://www.zhangqiaokeyan.com/", "_blank"));
  shareBackdrop.addEventListener("click", closeShareModal);
  shareCloseBtn.addEventListener("click", closeShareModal);
  confirmShareBtn.addEventListener("click", shareResultImage);
  bindPlayButtons();
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewId === "result") drawRadar(latestResult);
}

function renderCurrentQuestion() {
  const question = questions[currentQuestionIndex];
  const context = questionContexts[question.dim];
  testEyebrow.textContent = context.eyebrow;
  testTitle.textContent = context.title;
  testSubtitle.textContent = context.subtitle;
  quizForm.innerHTML = "";

  const card = document.createElement("article");
  card.className = "question-card single-question-card";
  card.dataset.questionId = question.id;
  card.dataset.dimension = question.dim;
  card.dataset.pole = question.pole;

  const title = document.createElement("p");
  title.className = "question-title";
  title.innerHTML = `<span class="question-number">${currentQuestionIndex + 1}</span><span>${question.text}</span>`;

  const scale = document.createElement("div");
  scale.className = "scale paged-scale";
  scale.setAttribute("aria-label", "1 到 5 分");

  for (let value = 1; value <= 5; value += 1) {
    const id = `q${currentQuestionIndex}_${value}`;
    const option = document.createElement("div");
    option.className = "scale-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${currentQuestionIndex}`;
    input.id = id;
    input.value = String(value);
    input.checked = answers[currentQuestionIndex] === value;
    input.addEventListener("change", () => {
      answers[currentQuestionIndex] = value;
      updateProgress();
    });

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = value;

    const text = document.createElement("span");
    text.textContent = scaleLabels[value - 1];

    option.append(input, label, text);
    scale.append(option);
  }

  card.append(title, scale);
  quizForm.append(card);
  updateProgress();
}

function updateProgress() {
  const count = answers.filter(Boolean).length;
  answeredCount.textContent = String(currentQuestionIndex + 1);
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  nextQuestionBtn.innerHTML = currentQuestionIndex === questions.length - 1
    ? `<span aria-hidden="true">✓</span>生成结果`
    : `<span aria-hidden="true">→</span>下一题`;
}

function goToPreviousQuestion() {
  if (currentQuestionIndex === 0) {
    showView("home");
    return;
  }
  currentQuestionIndex -= 1;
  renderCurrentQuestion();
}

function goToNextQuestion() {
  if (answers[currentQuestionIndex] === null) {
    alert("请先选择一个赞同程度。");
    return;
  }
  if (currentQuestionIndex === questions.length - 1) {
    finishQuiz();
    return;
  }
  currentQuestionIndex += 1;
  renderCurrentQuestion();
}

function resetQuiz() {
  answers = new Array(questions.length).fill(null);
  currentQuestionIndex = 0;
  renderCurrentQuestion();
  feedbackForm.reset();
  feedbackMessage.textContent = "";
  latestResult = null;
  updateProgress();
  renderEmptyState();
}

function finishQuiz() {
  const missingIndex = answers.findIndex((answer) => answer === null);
  if (missingIndex !== -1) {
    currentQuestionIndex = missingIndex;
    renderCurrentQuestion();
    showView("test");
    alert(`还有第 ${missingIndex + 1} 题没有作答。`);
    return;
  }

  latestResult = calculateResult();
  renderResult(latestResult);
  showView("result");
}

function calculateResult() {
  const raw = {};
  Object.keys(dimensions).forEach((key) => {
    raw[key] = { left: 0, right: 0, count: 0 };
  });

  questions.forEach((question, index) => {
    const value = answers[index];
    const target = raw[question.dim];
    const weightedValue = value * question.weight;
    const weightedOpposite = (6 - value) * question.weight;
    target.count += 1;
    if (question.pole === "left") {
      target.left += weightedValue;
      target.right += weightedOpposite;
    } else {
      target.right += weightedValue;
      target.left += weightedOpposite;
    }
  });

  const scores = {};
  let code = "";

  Object.entries(raw).forEach(([key, value]) => {
    const total = value.left + value.right;
    const leftPercent = Math.round((value.left / total) * 100);
    const rightPercent = 100 - leftPercent;
    const dim = dimensions[key];
    const dominant = leftPercent >= rightPercent ? dim.left : dim.right;
    const margin = Math.abs(leftPercent - rightPercent);
    code += dominant;
    scores[key] = { leftPercent, rightPercent, dominant, margin };
  });

  return {
    code,
    name: typeNames[code],
    scores,
    confidence: calculateConfidence(scores),
    answeredAt: new Date().toISOString(),
    schemaVersion: validationSchema.version,
    answerSnapshot: questions.map((question, index) => ({
      id: question.id,
      dim: question.dim,
      pole: question.pole,
      reverse: question.reverse,
      weight: question.weight,
      value: answers[index]
    }))
  };
}

function calculateConfidence(scores) {
  const margins = Object.values(scores).map((score) => score.margin);
  const averageMargin = margins.reduce((sum, margin) => sum + margin, 0) / margins.length;
  if (averageMargin >= 34) return { label: "高", averageMargin: Math.round(averageMargin) };
  if (averageMargin >= 18) return { label: "中", averageMargin: Math.round(averageMargin) };
  return { label: "低", averageMargin: Math.round(averageMargin) };
}

function renderEmptyState() {
  typeCodeEl.textContent = "----";
  typeNameEl.textContent = "完成测试后生成";
  typeIntroEl.textContent = "你的学术风格画像会在这里呈现。";
  resultPersonaImage.removeAttribute("src");
  resultPersonaImage.hidden = true;
  scoreGrid.innerHTML = "";
  analysisGrid.innerHTML = "";
  reportGrid.innerHTML = "";
  strengthDescription.textContent = "完成测试后生成。";
  weaknessDescription.textContent = "完成测试后生成。";
  feedbackMessage.textContent = "";
  afterSaveActions.hidden = false;
  latestPosterBlob = null;
  drawRadar(null);
}

function renderResult(result) {
  typeCodeEl.textContent = result.code;
  typeNameEl.textContent = result.name;
  typeIntroEl.textContent = makeIntro(result);
  resultPersonaImage.src = typeImageMap[result.code];
  resultPersonaImage.alt = `${result.code} ${result.name}`;
  resultPersonaImage.hidden = false;
  renderScoreGrid(result);
  renderAnalysis(result);
  renderReport(result);
  renderStrengthWeakness(result);
  feedbackForm.reset();
  feedbackMessage.textContent = "";
  afterSaveActions.hidden = false;
  latestPosterBlob = null;
  drawRadar(result);
}

function renderStyleGallery() {
  styleGallery.innerHTML = "";
  Object.entries(typeNames).forEach(([code, name]) => {
    const letters = code.split("");
    const card = document.createElement("article");
    card.className = "style-card";
    card.innerHTML = `
      <img src="${typeImageMap[code]}" alt="${code} ${name}">
      <div class="style-card-body">
        <div class="style-card-head">
          <span class="type-code">${code}</span>
          <h2>${name}</h2>
        </div>
        <p>${typeIntroCopy[code]}</p>
        <div class="style-tags">
          ${letters.map((letter) => `<span>${getLetterName(letter)}</span>`).join("")}
        </div>
      </div>
    `;
    styleGallery.append(card);
  });
}

function renderStrengthWeakness(result) {
  const letters = result.code.split("");
  strengthDescription.textContent = letters.map((letter) => reportCopy.strengths.text[letter]).join(" ");
  weaknessDescription.textContent = letters.map((letter) => reportCopy.blind.text[letter]).join(" ");
}

function makeIntro(result) {
  return typeIntroCopy[result.code] || `你通过${getMainPath(result.code.split(""))}来建立自己的学术辨识度。`;
}

function getLetterName(letter) {
  for (const dim of Object.values(dimensions)) {
    if (dim.left === letter) return dim.leftName;
    if (dim.right === letter) return dim.rightName;
  }
  return letter;
}

function getMainPath(letters) {
  const paths = [];
  if (letters.includes("E")) paths.push("发现新问题");
  if (letters.includes("B")) paths.push("搭建稳定框架");
  if (letters.includes("C")) paths.push("提炼概念");
  if (letters.includes("D")) paths.push("组织证据");
  if (letters.includes("A")) paths.push("提出鲜明论点");
  if (letters.includes("H")) paths.push("呈现复杂解释");
  return paths.slice(0, 3).join("、");
}

function renderScoreGrid(result) {
  scoreGrid.innerHTML = "";
  Object.entries(dimensions).forEach(([key, dim]) => {
    const score = result.scores[key];
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <strong>${dim.left} ${score.leftPercent}%</strong>
      <div class="score-bar"><span style="width:${score.leftPercent}%"></span></div>
      <strong>${score.rightPercent}% ${dim.right}</strong>
    `;
    scoreGrid.append(row);
  });
}

function renderAnalysis(result) {
  analysisGrid.innerHTML = "";
  Object.entries(dimensions).forEach(([key, dim]) => {
    const score = result.scores[key];
    const isLeft = score.dominant === dim.left;
    const title = `${dim.title}：${isLeft ? dim.leftName : dim.rightName}`;
    const desc = isLeft ? dim.leftDesc : dim.rightDesc;
    const card = document.createElement("article");
    card.className = "analysis-card";
    card.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    analysisGrid.append(card);
  });
}

function renderReport(result) {
  reportGrid.innerHTML = "";
  const letters = result.code.split("");

  Object.values(reportCopy).forEach((section) => {
    const items = letters.map((letter) => section.text[letter]);
    const card = document.createElement("article");
    card.className = "report-card";
    card.innerHTML = `
      <div class="report-tag">${section.tag}</div>
      <h2>${section.title}</h2>
      <p>${items.join(" ")}</p>
    `;
    reportGrid.append(card);
  });
}

async function saveFeedback(event) {
  event.preventDefault();
  if (!latestResult) {
    feedbackMessage.textContent = "请先完成测试，再保存反馈。";
    return;
  }

  const feedback = buildFeedbackPayload();
  const submitButton = feedbackForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  feedbackMessage.textContent = "正在保存反馈...";

  const feedbackItems = loadFeedback();
  feedbackItems.push(feedback);
  localStorage.setItem(feedbackStorageKey, JSON.stringify(feedbackItems));

  const submitResult = await submitFeedbackToRemote(feedback);
  updateStoredFeedbackStatus(feedback.id, submitResult);

  if (!submitResult.ok && submitResult.reason !== "missing-endpoint") {
    queuePendingFeedback(feedback);
  }

  submitButton.disabled = false;
  feedbackMessage.textContent = submitResult.ok ? "反馈已提交。" : "反馈已保存。";
  alert("谢谢你的反馈！");
}

async function saveEmailSignup(event) {
  event.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;

  const signup = {
    eventName: "academic_compass_email_signup",
    id: `EM-${Date.now()}`,
    createdAt: new Date().toISOString(),
    email,
    typeCode: latestResult?.code || "",
    typeName: latestResult?.name || "",
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    language: navigator.language,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  };

  const signups = loadEmailSignups();
  signups.push(signup);
  localStorage.setItem(emailSignupStorageKey, JSON.stringify(signups));

  const submitButton = emailForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  emailMessage.textContent = "正在提交...";
  await submitFlatPayloadToRemote(signup);
  submitButton.disabled = false;
  emailMessage.textContent = "提交成功";
  emailForm.reset();
  alert("提交成功");
}

function loadEmailSignups() {
  try {
    return JSON.parse(localStorage.getItem(emailSignupStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function buildFeedbackPayload() {
  return {
    id: `FB-${Date.now()}`,
    createdAt: new Date().toISOString(),
    source: {
      pageUrl: window.location.href,
      referrer: document.referrer || "",
      userAgent: navigator.userAgent,
      language: navigator.language,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    },
    schemaVersion: validationSchema.version,
    result: latestResult,
    selfFit: new FormData(feedbackForm).get("selfFit"),
    submitStatus: "local-saved"
  };
}

async function submitFeedbackToRemote(feedback) {
  return submitFlatPayloadToRemote(buildRemoteFeedbackPayload(feedback));
}

async function submitFlatPayloadToRemote(payload) {
  const endpoint = feedbackSubmitConfig.endpoint.trim();
  if (!endpoint) {
    return { ok: false, reason: "missing-endpoint", submittedAt: null };
  }

  try {
    const noCors = feedbackSubmitConfig.mode === "no-cors";
    const response = await fetch(endpoint, {
      method: feedbackSubmitConfig.method,
      mode: noCors ? "no-cors" : "cors",
      headers: noCors ? { "Content-Type": "text/plain;charset=utf-8" } : { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (noCors || response.ok) {
      return { ok: true, reason: "submitted", submittedAt: new Date().toISOString() };
    }

    return { ok: false, reason: `http-${response.status}`, submittedAt: null };
  } catch (error) {
    return { ok: false, reason: error.name || "network-error", submittedAt: null };
  }
}

function buildRemoteFeedbackPayload(feedback) {
  const flatPayload = buildFlatFeedbackPayload(feedback);
  if (["google-sheets", "hiflow", "flat"].includes(feedbackSubmitConfig.adapter)) return flatPayload;
  return feedback;
}

function buildFlatFeedbackPayload(feedback) {
  const scores = feedback.result.scores;
  const answerColumns = Object.fromEntries(
    feedback.result.answerSnapshot.map((answer) => [answer.id, answer.value])
  );
  const answerMetaColumns = Object.fromEntries(
    feedback.result.answerSnapshot.map((answer) => [`${answer.id}_meta`, `${answer.dim}/${answer.pole}`])
  );

  return {
    eventName: "academic_compass_feedback",
    feedbackId: feedback.id,
    createdAt: feedback.createdAt,
    selfFit: feedback.selfFit,
    typeCode: feedback.result.code,
    typeName: feedback.result.name,
    confidenceLabel: feedback.result.confidence.label,
    confidenceAverageMargin: feedback.result.confidence.averageMargin,
    problemDimension: dimensions.problem.title,
    problemDominant: scores.problem.dominant,
    problemDominantName: scores.problem.dominant === dimensions.problem.left ? dimensions.problem.leftName : dimensions.problem.rightName,
    problemLeftPercent: scores.problem.leftPercent,
    problemRightPercent: scores.problem.rightPercent,
    methodDimension: dimensions.method.title,
    methodDominant: scores.method.dominant,
    methodDominantName: scores.method.dominant === dimensions.method.left ? dimensions.method.leftName : dimensions.method.rightName,
    methodLeftPercent: scores.method.leftPercent,
    methodRightPercent: scores.method.rightPercent,
    rhythmDimension: dimensions.rhythm.title,
    rhythmDominant: scores.rhythm.dominant,
    rhythmDominantName: scores.rhythm.dominant === dimensions.rhythm.left ? dimensions.rhythm.leftName : dimensions.rhythm.rightName,
    rhythmLeftPercent: scores.rhythm.leftPercent,
    rhythmRightPercent: scores.rhythm.rightPercent,
    expressionDimension: dimensions.expression.title,
    expressionDominant: scores.expression.dominant,
    expressionDominantName: scores.expression.dominant === dimensions.expression.left ? dimensions.expression.leftName : dimensions.expression.rightName,
    expressionLeftPercent: scores.expression.leftPercent,
    expressionRightPercent: scores.expression.rightPercent,
    ...answerColumns,
    ...answerMetaColumns,
    pageUrl: feedback.source.pageUrl,
    referrer: feedback.source.referrer,
    userAgent: feedback.source.userAgent,
    language: feedback.source.language,
    viewport: feedback.source.viewport,
    timezone: feedback.source.timezone,
    schemaVersion: feedback.schemaVersion,
    answersJson: JSON.stringify(feedback.result.answerSnapshot),
    resultJson: JSON.stringify(feedback.result)
  };
}

function updateStoredFeedbackStatus(id, submitResult) {
  const feedbackItems = loadFeedback().map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      submitStatus: submitResult.ok ? "remote-submitted" : "local-saved",
      submitReason: submitResult.reason,
      submittedAt: submitResult.submittedAt
    };
  });
  localStorage.setItem(feedbackStorageKey, JSON.stringify(feedbackItems));
}

function queuePendingFeedback(feedback) {
  const pending = loadPendingFeedback();
  const nextPending = pending.filter((item) => item.id !== feedback.id);
  nextPending.push(feedback);
  localStorage.setItem(pendingFeedbackStorageKey, JSON.stringify(nextPending));
}

async function retryPendingFeedback() {
  if (!feedbackSubmitConfig.endpoint.trim()) return;
  const pending = loadPendingFeedback();
  if (!pending.length) return;

  const remaining = [];
  for (const feedback of pending) {
    const submitResult = await submitFeedbackToRemote(feedback);
    updateStoredFeedbackStatus(feedback.id, submitResult);
    if (!submitResult.ok) remaining.push(feedback);
  }
  localStorage.setItem(pendingFeedbackStorageKey, JSON.stringify(remaining));
}

function loadPendingFeedback() {
  try {
    return JSON.parse(localStorage.getItem(pendingFeedbackStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function loadFeedback() {
  try {
    return JSON.parse(localStorage.getItem(feedbackStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

async function saveResultImage() {
  if (!latestResult) {
    alert("请先完成测试。");
    return;
  }

  latestPosterBlob = await createResultPosterBlob(latestResult);
  const url = URL.createObjectURL(latestPosterBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `学术罗盘-${latestResult.code}-${latestResult.name}.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
  afterSaveActions.hidden = false;
}

function openShareModal() {
  if (!latestResult) {
    alert("请先完成测试。");
    return;
  }

  shareCopyText.textContent = `我的学术风格是${latestResult.name}，来测测你的吧`;
  shareModal.hidden = false;
}

function closeShareModal() {
  shareModal.hidden = true;
}

async function shareResultImage() {
  if (!latestResult) {
    alert("请先完成测试。");
    return;
  }

  const shareText = `我的学术风格是${latestResult.name}，来测测你的吧`;
  const shareUrl = window.location.href;

  try {
    if (!latestPosterBlob) {
      latestPosterBlob = await createResultPosterBlob(latestResult);
    }

    const file = new File([latestPosterBlob], `学术罗盘-${latestResult.code}.png`, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "学术罗盘",
        text: shareText,
        url: shareUrl,
        files: [file]
      });
      closeShareModal();
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: "学术罗盘",
        text: shareText,
        url: shareUrl
      });
      closeShareModal();
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }

  const fallbackText = `${shareText} ${shareUrl}`;
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(fallbackText);
    closeShareModal();
    alert("分享文案已复制，可粘贴发送给朋友。");
    return;
  }

  window.prompt("复制分享文案", fallbackText);
  closeShareModal();
}

async function createResultPosterBlob(result) {
  const width = 1080;
  const heroHeight = 1420;
  const infoHeight = 850;
  const strengthHeight = 500;
  const height = heroHeight + infoHeight + strengthHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const image = await loadImage(typeImageMap[result.code]);

  drawPosterHeroBackground(ctx, width, heroHeight);
  drawRoundedImage(ctx, image, 36, 36, width - 72, (width - 72) * 4 / 3, 34);

  ctx.fillStyle = "#fff7eb";
  ctx.fillRect(0, heroHeight, width, height - heroHeight);
  drawPosterGrid(ctx, 0, heroHeight, width, height - heroHeight);

  const left = 72;
  const top = heroHeight + 70;
  ctx.fillStyle = "#5169db";
  ctx.font = "950 36px Microsoft YaHei, Arial";
  ctx.fillText("你的学术风格是：", left, top);

  ctx.fillStyle = "#e95f58";
  ctx.font = "950 116px Arial, Microsoft YaHei";
  ctx.fillText(result.code, left, top + 132);

  ctx.fillStyle = "#24243a";
  ctx.font = "950 58px Microsoft YaHei, Arial";
  ctx.fillText(result.name, left, top + 202);

  ctx.fillStyle = "#3d4056";
  ctx.font = "800 30px Microsoft YaHei, Arial";
  drawWrappedText(ctx, makeIntro(result), left, top + 262, 620, 46, 3);

  const radar = document.createElement("canvas");
  radar.width = 360;
  radar.height = 360;
  drawRadar(result, radar);
  ctx.drawImage(radar, 680, heroHeight + 68, 300, 300);

  drawPosterScores(ctx, result, left, heroHeight + 470, 450);
  drawPosterAnalysis(ctx, result, 560, heroHeight + 445, 410);

  drawPosterStrengthWeakness(ctx, result, left, heroHeight + infoHeight + 54, width - 144);

  ctx.fillStyle = "#5169db";
  ctx.font = "900 28px Microsoft YaHei, Arial";
  ctx.textAlign = "center";
  ctx.fillText("掌桥科研出品", width / 2, height - 54);
  ctx.textAlign = "left";

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.96));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawContainImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.save();
  ctx.shadowColor = "rgba(13, 8, 16, 0.42)";
  ctx.shadowBlur = 38;
  ctx.shadowOffsetY = 28;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  ctx.restore();
}

function drawRoundedImage(ctx, image, x, y, width, height, radius) {
  ctx.save();
  roundRect(ctx, x, y, width, height, radius, false);
  ctx.clip();
  drawCoverImage(ctx, image, x, y, width, height);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 253, 248, 0.86)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, width, height, radius, false);
  ctx.stroke();
  ctx.restore();
}

function drawPosterHeroBackground(ctx, width, height) {
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#e6ebff");
  base.addColorStop(0.48, "#fff0bd");
  base.addColorStop(0.82, "#ffe4df");
  base.addColorStop(1, "#fff7eb");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.strokeStyle = "rgba(81, 105, 219, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 38) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 38) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPosterGrid(ctx, x, y, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(81, 105, 219, 0.055)";
  ctx.lineWidth = 1;
  for (let gx = x; gx <= x + width; gx += 36) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + height);
    ctx.stroke();
  }
  for (let gy = y; gy <= y + height; gy += 36) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + width, gy);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPosterScores(ctx, result, x, y, width) {
  Object.entries(dimensions).forEach(([key, dim], index) => {
    const score = result.scores[key];
    const rowY = y + index * 56;
    ctx.fillStyle = "#24243a";
    ctx.font = "900 24px Microsoft YaHei, Arial";
    ctx.fillText(dim.title, x, rowY);
    ctx.fillStyle = "rgba(81, 105, 219, 0.16)";
    roundRect(ctx, x + 122, rowY - 20, width - 122, 18, 9, true);
    ctx.fillStyle = "#5169db";
    roundRect(ctx, x + 122, rowY - 20, (width - 122) * (score.leftPercent / 100), 18, 9, true);
    ctx.fillStyle = "#697184";
    ctx.font = "800 20px Microsoft YaHei, Arial";
    ctx.fillText(`${dim.left} ${score.leftPercent}% / ${score.rightPercent}% ${dim.right}`, x + 122, rowY + 26);
  });
}

function drawPosterAnalysis(ctx, result, x, y, width) {
  Object.entries(dimensions).forEach(([key, dim], index) => {
    const score = result.scores[key];
    const isLeft = score.dominant === dim.left;
    const title = `${dim.title}：${isLeft ? dim.leftName : dim.rightName}`;
    const desc = isLeft ? dim.leftDesc : dim.rightDesc;
    const cardY = y + index * 86;
    ctx.fillStyle = "rgba(255, 253, 248, 0.84)";
    roundRect(ctx, x, cardY, width, 70, 10, true);
    ctx.fillStyle = "#24243a";
    ctx.font = "900 22px Microsoft YaHei, Arial";
    ctx.fillText(title, x + 18, cardY + 28);
    ctx.fillStyle = "#697184";
    ctx.font = "700 18px Microsoft YaHei, Arial";
    drawWrappedText(ctx, desc, x + 18, cardY + 52, width - 36, 24, 1);
  });
}

function drawPosterStrengthWeakness(ctx, result, x, y, width) {
  const letters = result.code.split("");
  const strengthText = letters.map((letter) => reportCopy.strengths.text[letter]).join(" ");
  const weaknessText = letters.map((letter) => reportCopy.blind.text[letter]).join(" ");
  drawPosterTextCard(ctx, {
    x,
    y,
    width,
    height: 170,
    tag: "优势",
    title: "你的学术优势",
    text: strengthText,
    tagFill: "#dff5f0",
    tagColor: "#15988f"
  });
  drawPosterTextCard(ctx, {
    x,
    y: y + 205,
    width,
    height: 170,
    tag: "劣势",
    title: "你的潜在劣势",
    text: weaknessText,
    tagFill: "#ffe4df",
    tagColor: "#e95f58"
  });
}

function drawPosterTextCard(ctx, card) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 253, 248, 0.9)";
  roundRect(ctx, card.x, card.y, card.width, card.height, 18, true);
  ctx.strokeStyle = "rgba(81, 105, 219, 0.14)";
  ctx.lineWidth = 2;
  roundRect(ctx, card.x, card.y, card.width, card.height, 18, false);
  ctx.stroke();

  ctx.fillStyle = card.tagFill;
  roundRect(ctx, card.x + 24, card.y + 24, 92, 34, 17, true);
  ctx.fillStyle = card.tagColor;
  ctx.font = "900 22px Microsoft YaHei, Arial";
  ctx.fillText(card.tag, card.x + 48, card.y + 49);

  ctx.fillStyle = "#24243a";
  ctx.font = "950 32px Microsoft YaHei, Arial";
  ctx.fillText(card.title, card.x + 136, card.y + 50);
  ctx.fillStyle = "#697184";
  ctx.font = "800 24px Microsoft YaHei, Arial";
  drawWrappedText(ctx, card.text, card.x + 24, card.y + 98, card.width - 48, 36, 2);
  ctx.restore();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  let line = "";
  let lines = 0;
  for (const char of text) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(lines === maxLines - 1 ? `${line}…` : line, x, y);
      lines += 1;
      if (lines >= maxLines) return;
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y);
}

function roundRect(ctx, x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
}

function bindPlayButtons() {
  document.querySelectorAll(".play-start-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const playId = button.dataset.playId;
      const playName = button.closest(".play-card")?.querySelector("h2")?.textContent || playId;
      const counts = loadPlayCounts();
      counts[playId] = (counts[playId] || 0) + 1;
      localStorage.setItem(playClickStorageKey, JSON.stringify(counts));
      savePlayEvent({ playId, playName, count: counts[playId] });
      alert("敬请期待");
    });
  });
}

function loadPlayCounts() {
  try {
    return JSON.parse(localStorage.getItem(playClickStorageKey)) || {};
  } catch (error) {
    return {};
  }
}

function savePlayEvent(event) {
  const events = loadPlayEvents();
  events.push({
    ...event,
    eventName: "extension_play_start_click",
    createdAt: new Date().toISOString(),
    page: "play"
  });
  localStorage.setItem(playEventStorageKey, JSON.stringify(events));
}

function loadPlayEvents() {
  try {
    return JSON.parse(localStorage.getItem(playEventStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function drawRadar(result, targetCanvas = radarCanvas) {
  const ctx = targetCanvas.getContext("2d");
  const width = targetCanvas.width;
  const height = targetCanvas.height;
  const center = width / 2;
  const maxRadius = width * 0.33;
  const labels = ["问题", "方法", "节奏", "表达"];
  const keys = ["problem", "method", "rhythm", "expression"];

  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createRadialGradient(center, center, 10, center, center, width * 0.48);
  bg.addColorStop(0, "#fffdf8");
  bg.addColorStop(0.72, "#f5e9c6");
  bg.addColorStop(1, "rgba(184, 137, 22, 0.16)");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(center, center, width * 0.47, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(32, 36, 42, 0.24)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center, center, width * 0.455, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(32, 36, 42, 0.16)";
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 5; ring += 1) {
    drawPolygon(ctx, center, center, (maxRadius / 5) * ring, labels.length, false);
    ctx.stroke();
  }

  labels.forEach((label, index) => {
    const angle = getAngle(index, labels.length);
    const end = pointOnCircle(center, center, maxRadius, angle);
    const labelPoint = pointOnCircle(center, center, maxRadius + width * 0.095, angle);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.fillStyle = "#20242a";
    ctx.font = `900 ${Math.round(width * 0.044)}px Microsoft YaHei, Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, labelPoint.x, labelPoint.y);
  });

  const values = result
    ? keys.map((key) => {
        const dim = dimensions[key];
        const score = result.scores[key];
        return score.dominant === dim.left ? score.leftPercent : score.rightPercent;
      })
    : [50, 50, 50, 50];

  ctx.beginPath();
  values.forEach((value, index) => {
    const radius = (value / 100) * maxRadius;
    const angle = getAngle(index, values.length);
    const point = pointOnCircle(center, center, radius, angle);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  const fill = ctx.createLinearGradient(center - maxRadius, center - maxRadius, center + maxRadius, center + maxRadius);
  fill.addColorStop(0, result ? "rgba(49, 95, 158, 0.38)" : "rgba(98, 107, 115, 0.14)");
  fill.addColorStop(0.55, result ? "rgba(23, 122, 114, 0.34)" : "rgba(98, 107, 115, 0.16)");
  fill.addColorStop(1, result ? "rgba(199, 83, 66, 0.26)" : "rgba(98, 107, 115, 0.12)");
  ctx.fillStyle = fill;
  ctx.strokeStyle = result ? "#1c6f69" : "#626b73";
  ctx.lineWidth = Math.max(2, width * 0.009);
  ctx.fill();
  ctx.stroke();

  values.forEach((value, index) => {
    const radius = (value / 100) * maxRadius;
    const point = pointOnCircle(center, center, radius, getAngle(index, values.length));
    ctx.beginPath();
    ctx.arc(point.x, point.y, width * 0.017, 0, Math.PI * 2);
    ctx.fillStyle = result ? "#c75342" : "#626b73";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fffdf8";
    ctx.stroke();
  });

  ctx.fillStyle = "#20242a";
  ctx.font = `950 ${Math.round(width * 0.07)}px Microsoft YaHei, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(result ? result.code : "待生成", center, center + 8);
}

function drawPolygon(ctx, cx, cy, radius, sides, fill) {
  ctx.beginPath();
  for (let index = 0; index < sides; index += 1) {
    const point = pointOnCircle(cx, cy, radius, getAngle(index, sides));
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  if (fill) ctx.fill();
}

function getAngle(index, total) {
  return -Math.PI / 2 + (Math.PI * 2 * index) / total;
}

function pointOnCircle(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius
  };
}

init();
