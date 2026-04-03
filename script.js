// script.js

// -------------------- بيانات المراحل مع الصور الحقيقية --------------------
const levelsData = [
  { id: 1, question: "إذا سبقت السلحفاة صاحب المركز الثاني، ففي أي مركز ستكون؟", options: ["الأول", "الثاني", "الثالث", "الرابع"], correct: 1, image: "https://i.ibb.co/TDXqdZgF/level01-cheetah-race.jpg" },
  { id: 2, question: "إذا أطفأت شمعتين من أصل 3 في غرفة مغلقة، كم شمعة يتبقى؟", options: ["1", "2", "3", "ولا واحدة"], correct: 2, image: "https://i.ibb.co/LdRzGptw/level02-candles.jpg" },
  { id: 3, question: "كم مرة تتطابق عقارب الساعة في اليوم الواحد (24 ساعة)؟", options: ["22", "24", "12", "مرة واحدة"], correct: 0, image: "https://i.ibb.co/wNVfJBHL/level03-clock.jpg" },
  { id: 4, question: "صورة يدين مرفوعتين أمامك.. كم إصبع تراه في الصورة؟", options: ["10", "20", "8", "12"], correct: 0, image: "https://i.ibb.co/1YddzFC2/level04-hands.jpg" },
  { id: 5, question: "قال رجل: هذا ابن أبي وليس أخي. فمن يكون الرجل في الصورة؟", options: ["أبوه", "هو نفسه", "ابنه", "عمه"], correct: 1, image: "https://i.ibb.co/4ZrcTrKg/level05-family-portrait.jpg" },
  { id: 6, question: "سيارة كهربائية تسير شمالاً والرياح جنوباً، إلى أي اتجاه يذهب الدخان؟", options: ["شمال", "جنوب", "لا يوجد دخان", "غرب"], correct: 2, image: "https://i.ibb.co/rK51WFdP/level06-electric-train.jpg" },
  { id: 7, question: "طاولة عليها 5 تفاحات، أخذت أنت 3 تفاحات، كم تفاحة معك الآن؟", options: ["2", "3", "5", "ولا واحدة"], correct: 1, image: "https://i.ibb.co/zT9TR8Wh/level07-apples.jpg" },
  { id: 8, question: "ممر فيه 4 أبواب مغلقة، إذا فتحت الباب الثالث، كم باباً يظل مغلقاً؟", options: ["3", "2", "1", "4"], correct: 0, image: "https://i.ibb.co/RGTVwTSc/level08-doors.jpg" },
  { id: 9, question: "أيهما أثقل: كيلو من الحديد أم كيلو من القطن؟", options: ["الحديد", "القطن", "متساويان", "حسب الميزان"], correct: 2, image: "https://i.ibb.co/8DMD9xxM/level09-balance-scale.jpg" },
  { id: 10, question: "كنت في المركز الأخير في سباق وتجاوزت الشخص الذي أمامك مباشرة، ما مركزك الآن؟", options: ["الأول", "الأخير", "قبل الأخير", "الثاني"], correct: 2, image: "https://i.ibb.co/C55nwSTw/level10-runners.jpg" },
  { id: 11, question: "ديك يقف على قمة بيت مائل، إذا باض بيضة أين ستسقط؟", options: ["يمين", "يسار", "للأسفل", "الديك لا يبيض"], correct: 3, image: "https://i.ibb.co/wZTtS1Fb/level11-rooster.jpg" },
  { id: 12, question: "ما هو الشيء الذي له عين واحدة ولكنه لا يرى أبداً؟", options: ["البومة", "الإبرة", "الإعصار", "الخفاش"], correct: 1, image: "https://i.ibb.co/93gTfJmx/level12-forest-night.jpg" },
  { id: 13, question: "تحطمت طائرة على الحدود بين دولتين، أين يتم دفن الناجين؟", options: ["الدولة أ", "الدولة ب", "منطقة محايدة", "لا يدفنون"], correct: 3, image: "https://i.ibb.co/2bqDfSQ/level13-airplane-crash.jpg" },
  { id: 14, question: "سائق حافلة يسير عكس السير ولم توقفه الشرطة، لماذا؟", options: ["الشرطة نائمة", "لأنه يمشي مشياً", "معه واسطة", "الحافلة سريعة"], correct: 1, image: "https://i.ibb.co/SDS0PrPn/level14-bus.jpg" },
  { id: 15, question: "أي شهر من شهور السنة يحتوي على 28 يوماً؟", options: ["فبراير فقط", "كل 4 سنوات", "كل الشهور", "ديسمبر"], correct: 2, image: "https://i.ibb.co/1GpWgGJy/level15-february.jpg" }
];

// متغيرات اللعبة
let currentLevelIndex = 0;        // 0-index
let hearts = 3;
let playerName = "";
let gameActive = true;             // منع النقر المتعدد أثناء التأثيرات

// عناصر DOM
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const winOverlay = document.getElementById('winOverlay');
const playerNameInput = document.getElementById('playerNameInput');
const startBtn = document.getElementById('startGameBtn');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const heartsContainer = document.getElementById('heartsContainer');
const levelCounterSpan = document.getElementById('levelCounter');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const levelImage = document.getElementById('levelImage');
const feedbackMsg = document.getElementById('feedbackMsg');
const restartFromGameOverBtn = document.getElementById('restartFromGameOverBtn');
const restartFromWinBtn = document.getElementById('restartFromWinBtn');

// مساعد: تحديث عرض القلوب
function updateHeartsUI() {
  let heartsHtml = "";
  for (let i = 0; i < hearts; i++) heartsHtml += "❤️ ";
  for (let i = hearts; i < 3; i++) heartsHtml += "🖤 ";
  heartsContainer.innerHTML = heartsHtml.trim();
}

// مساعد: تأثير الاهتزاز على البطاقات أو العنصر
function shakeElement(element) {
  if (!element) return;
  element.classList.add('shake-effect');
  setTimeout(() => {
    element.classList.remove('shake-effect');
  }, 500);
}

// إظهار رسالة الخطأ مع اهتزاز
function showWrongFeedback() {
  feedbackMsg.innerHTML = '<span class="text-red-400">❌ إجابة خاطئة! تخسر قلباً ❌</span>';
  setTimeout(() => { if (gameActive) feedbackMsg.innerHTML = ''; }, 1200);
}

// إنهاء اللعبة (Game Over)
function endGame() {
  gameActive = false;
  gameOverOverlay.classList.remove('hidden');
}

// الفوز بإكمال كل المراحل
function winGame() {
  gameActive = false;
  winOverlay.classList.remove('hidden');
}

// إعادة تحميل المرحلة الحالية (عرض السؤال والخيارات والصورة)
function loadLevel() {
  if (!gameActive) return;
  const level = levelsData[currentLevelIndex];
  if (!level) return;
  
  // تحديث العداد
  levelCounterSpan.innerText = currentLevelIndex + 1;
  // السؤال
  questionText.innerText = level.question;
  // الصورة
  levelImage.src = level.image;
  levelImage.alt = `صورة المستوى ${level.id}`;
  // توليد الأزرار
  optionsContainer.innerHTML = '';
  level.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = 'btn-option option-btn w-full text-white text-right md:text-center px-3 py-2 rounded-xl bg-gray-800/70 border border-gray-600 hover:bg-amber-600/30 transition';
    btn.setAttribute('data-opt-index', idx);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!gameActive) return;
      handleAnswer(idx, btn);
    });
    optionsContainer.appendChild(btn);
  });
  
  // إضافة تأثير انتقال بسيط
  const gameCard = document.querySelector('#gameScreen .glass-card');
  if (gameCard) {
    gameCard.classList.add('level-transition');
    setTimeout(() => gameCard.classList.remove('level-transition'), 300);
  }
}

// معالجة الإجابة
function handleAnswer(selectedIdx, buttonElement) {
  if (!gameActive) return;
  const currentLevel = levelsData[currentLevelIndex];
  const isCorrect = (selectedIdx === currentLevel.correct);
  
  if (isCorrect) {
    // إجابة صحيحة
    feedbackMsg.innerHTML = '<span class="text-green-400">✅ إجابة صحيحة! ✅</span>';
    setTimeout(() => { if (gameActive) feedbackMsg.innerHTML = ''; }, 800);
    
    // الانتقال للمرحلة التالية
    if (currentLevelIndex + 1 < levelsData.length) {
      currentLevelIndex++;
      loadLevel();
    } else {
      // وصلنا للمرحلة 15 وأجاب صح → فوز
      winGame();
    }
  } else {
    // إجابة خاطئة
    hearts--;
    updateHeartsUI();
    showWrongFeedback();
    // تأثير الاهتزاز على الزر الذي تم النقر عليه
    shakeElement(buttonElement);
    // اهتزاز بسيط للصورة أو السؤال
    const questionDiv = document.getElementById('questionText');
    if (questionDiv) shakeElement(questionDiv);
    
    if (hearts <= 0) {
      // انتهت القلوب
      updateHeartsUI();
      endGame();
    } else {
      // لا ننتقل للمرحلة التالية، نبقى في نفس المرحلة لكن نعيد عرض نفس السؤال بعد رسالة قصيرة
      // نعطل النقر مؤقتاً لتجنب السبام
      gameActive = false;
      setTimeout(() => {
        if (hearts > 0 && currentLevelIndex < levelsData.length) {
          gameActive = true;
          // إعادة تحميل نفس المرحلة (نفس السؤال)
          loadLevel();
        } else if (hearts <= 0) {
          endGame();
        }
      }, 1300);
    }
  }
}

// إعادة تعيين اللعبة بالكامل من البداية (مع الحفاظ على الاسم)
function fullReset() {
  currentLevelIndex = 0;
  hearts = 3;
  gameActive = true;
  updateHeartsUI();
  // إخفاء أي overlays
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
  // إظهار شاشة اللعب وبدء المرحلة الأولى
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadLevel();
}

// بدء اللعبة من شاشة البداية
function startGame() {
  let name = playerNameInput.value.trim();
  if (name === "") {
    name = "العبقري المجهول";
  }
  playerName = name;
  // حفظ الاسم في localStorage
  localStorage.setItem('foolPuzzlePlayerName', playerName);
  playerNameDisplay.innerText = playerName;
  
  // إعادة ضبط المتغيرات
  currentLevelIndex = 0;
  hearts = 3;
  gameActive = true;
  updateHeartsUI();
  
  // تبديل الشاشات
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
  
  // تحميل أول مرحلة
  loadLevel();
}

// استرجاع الاسم من localStorage عند تحميل الصفحة
function loadStoredName() {
  const saved = localStorage.getItem('foolPuzzlePlayerName');
  if (saved) {
    playerNameInput.value = saved;
  }
}

// إعادة المحاولة من زر Game Over أو Win
function restartGame() {
  fullReset();
}

// الأحداث
startBtn.addEventListener('click', startGame);
restartFromGameOverBtn.addEventListener('click', () => {
  fullReset();
});
restartFromWinBtn.addEventListener('click', () => {
  fullReset();
});

// منع النقر على الأزرار أثناء التأثيرات الثانوية (يتم التعامل مع gameActive)
window.addEventListener('load', () => {
  loadStoredName();
  // التأكد من ظهور شاشة البداية فقط
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
});
