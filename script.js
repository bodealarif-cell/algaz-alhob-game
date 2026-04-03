const levelsData = [
  { id: 1, question: "لو في سلحفاة دخلت السباق وسبقت المركز الثاني ، ففي أي مركز ستكون؟", options: ["الأول", "الثاني", "الثالث", "الرابع"], correct: 1, image: "images/level01.jpg" },
  { id: 2, question: "إذا أطفأت شمعتين من أصل 3 في غرفة مغلقة، كم شمعة يتبقى معك؟", options: ["1", "2", "3", "ولا واحدة"], correct: 2, image: "images/level02.jpg" },
  { id: 3, question: "كم مرة تتطابق عقارب الساعة في اليوم الواحد (24 ساعة)؟", options: ["22", "24", "12", "مرة واحدة"], correct: 0, image: "images/level03.jpg" },
  { id: 4, question: "يا دكتور الحاله دي وصلت من شويه ممكن تشخصها", options: ["كسر في الكعبرة", "نقص في الرسغ", "زيادة سلاميات", "دا بيستهبل"], correct: 3, image: "images/level04.jpg", extraWinMsg: "يعني حد عنده 11 اصبع ههههه" },
  { id: 5, question: "الطفل الي لابس اصفر عنده كام سنه", options: ["10", "8", "مش كتير", "5"], correct: 2, image: "images/level05.jpg" },
  { id: 6, question: "لو القطر الكهربائي الجديد بيمشي بسرعة 368 كيلو متر في الساعه وعكس اتجاه الرياح ومفيش دخان بيطلع منه تتوقع كم سعر كوب الشاي بعد غلاء السكر", options: ["القطر الكهربائي ملهوش دخان", "كوب الشاي زي مهو", "القطر الكهربائي مفهوش شاي", "على حسب كم معلقة سكر"], correct: 1, image: "images/level06.jpg" },
  { id: 7, question: "طاولة عليها 5 تفاحات، أخذت أنت 3 تفاحات، كم تفاحة معك الآن؟", options: ["2", "3", "5", "ولا واحدة"], correct: 1, image: "images/level07.jpg" },
  { id: 8, question: "ممر فيه 4 أبواب مغلقة، ما تفسيرك لقيام ثورة الجياع في مدغشقر؟", options: ["غلاء كيلو البانيه", "مفيش علاقه بين الجياع ومدغشقر", "نابليون بونابرت", "ملييش في السياسه"], correct: 3, image: "images/level08.jpg" },
  { id: 9, question: "أيهما أثقل: كيلو من الحديد أم كيلو من القطن؟", options: ["الحديد", "القطن", "متساويان", "حسب الميزان"], correct: 2, image: "images/level09.jpg" },
  { id: 10, question: "كنت في المركز الأخير في سباق وتجاوزت الشخص الذي أمامك مباشرة، ما مركزك الآن؟", options: ["الأول", "الأخير", "المراغة", "الثاني"], correct: 2, image: "images/level10.jpg" },
  { id: 11, question: "ديك يقف على قمة بيت مائل، إذا باض بيضة أين ستسقط؟", options: ["يمين", "يسار", "للأسفل", "البيض ما يديك"], correct: 3, image: "images/level11.jpg" },
  { id: 12, question: "ما هو الشيء الذي له عين واحدة ولكنه لا يرى أبداً؟", options: ["البومة", "الإبرة", "الإعصار", "الخفاش"], correct: 1, image: "images/level12.jpg" },
  { id: 13, question: "تحطمت طائرة على الحدود بين دولتين، أين يتم دفن الناجين؟", options: ["الدولة أ", "الدولة ب", "منطقة محايدة", "لا يدفنون"], correct: 3, image: "images/level13.jpg" },
  { id: 14, question: "سائق حافلة يسير عكس السير ولم توقفه الشرطة، لماذا؟", options: ["الشرطة نائمة", "لأنه يمشي مشياً", "معه واسطة", "الحافلة سريعة"], correct: 1, image: "images/level14.jpg" },
  { id: 15, question: "أي شهر من شهور السنة يحتوي على 28 يوماً؟", options: ["فبراير فقط", "كل 4 سنوات", "كل الشهور", "ديسمبر"], correct: 2, image: "images/level15.jpg" }
];

const wrongPhrases = [
  "😂 ههههه غلطان يا فالح!", "🤦‍♂️ لا لا لا يا زميل", "🧠 تفكر نفسك أينشتاين؟", "❌ غلط غلط غلط", "😭 راجع مدرسة ابتدائي", "🤣 معقول؟؟", "💩 إجابة فاشلة"
];
const correctPhrases = [
  "🎉 أحسنت!", "⚡ ذكي!", "👏 صح لسانك", "🧠 برافو عليك", "🏆 عبقري!", "✨ ممتاز!"
];

let currentLevelIndex = 0;
let hearts = 3;
let playerName = "";
let gameActive = true;
let timerInterval = null;
let currentTime = 15;
let waitingForNext = false;

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
const timerDisplay = document.getElementById('timerDisplay');
const restartFromGameOverBtn = document.getElementById('restartFromGameOverBtn');
const restartFromWinBtn = document.getElementById('restartFromWinBtn');
const winStats = document.getElementById('winStats');

let audioCtx = null;
function playTick() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.1;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
    oscillator.stop(audioCtx.currentTime + 0.2);
  } catch(e) { console.log("صوت غير مدعوم"); }
}

function vibrate(duration = 100) {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(duration);
  }
}

function updateHeartsUI() {
  let html = "";
  for (let i = 0; i < hearts; i++) html += "❤️ ";
  for (let i = hearts; i < 3; i++) html += "🖤 ";
  heartsContainer.innerHTML = html.trim();
}

function showRandomWrongMessage() {
  const randomMsg = wrongPhrases[Math.floor(Math.random() * wrongPhrases.length)];
  feedbackMsg.innerHTML = `<span class="text-red-400">❌ ${randomMsg}</span>`;
  setTimeout(() => { if (gameActive && !waitingForNext) feedbackMsg.innerHTML = ''; }, 1500);
}

function showCorrectMessage(extra = "") {
  const randomMsg = correctPhrases[Math.floor(Math.random() * correctPhrases.length)];
  feedbackMsg.innerHTML = `<span class="text-green-400">✅ ${randomMsg} ${extra}</span>`;
  setTimeout(() => { if (gameActive) feedbackMsg.innerHTML = ''; }, 1200);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimerForCurrentLevel() {
  if (timerInterval) stopTimer();
  currentTime = 15;
  timerDisplay.innerText = currentTime;
  timerDisplay.classList.remove('timer-danger');
  
  timerInterval = setInterval(() => {
    if (!gameActive || waitingForNext) return;
    if (currentTime <= 0) {
      stopTimer();
      handleTimeout();
    } else {
      currentTime--;
      timerDisplay.innerText = currentTime;
      playTick();
      vibrate(30);
      if (currentTime <= 3) {
        timerDisplay.classList.add('timer-danger');
        if (currentTime <= 3) vibrate(60);
        document.body.classList.add('shake-effect');
        setTimeout(() => document.body.classList.remove('shake-effect'), 200);
      } else {
        timerDisplay.classList.remove('timer-danger');
      }
    }
  }, 1000);
}

function handleTimeout() {
  if (!gameActive || waitingForNext) return;
  hearts--;
  updateHeartsUI();
  showRandomWrongMessage();
  vibrate(200);
  const qDiv = document.getElementById('questionText');
  if (qDiv) qDiv.classList.add('shake-effect');
  setTimeout(() => qDiv?.classList.remove('shake-effect'), 500);
  
  if (hearts <= 0) {
    gameActive = false;
    stopTimer();
    gameOverOverlay.classList.remove('hidden');
  } else {
    waitingForNext = true;
    stopTimer();
    setTimeout(() => {
      waitingForNext = false;
      if (gameActive && hearts > 0) {
        loadLevel();
      }
    }, 1500);
  }
}

function loadLevel() {
  if (!gameActive) return;
  const level = levelsData[currentLevelIndex];
  if (!level) return;
  
  levelCounterSpan.innerText = currentLevelIndex + 1;
  questionText.innerText = level.question;
  levelImage.src = level.image;
  optionsContainer.innerHTML = '';
  level.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = 'option-btn w-full text-white text-right md:text-center px-3 py-2';
    btn.setAttribute('data-opt-index', idx);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!gameActive || waitingForNext) return;
      handleAnswer(idx, btn);
    });
    optionsContainer.appendChild(btn);
  });
  
  startTimerForCurrentLevel();
  const card = document.querySelector('#gameScreen .glass-card');
  if (card) {
    card.classList.add('level-transition');
    setTimeout(() => card.classList.remove('level-transition'), 300);
  }
}

function handleAnswer(selectedIdx, btnElement) {
  if (!gameActive || waitingForNext) return;
  const level = levelsData[currentLevelIndex];
  const isCorrect = (selectedIdx === level.correct);
  
  if (isCorrect) {
    stopTimer();
    let extraMsg = "";
    if (level.extraWinMsg) extraMsg = level.extraWinMsg;
    showCorrectMessage(extraMsg);
    vibrate(50);
    if (currentLevelIndex + 1 < levelsData.length) {
      currentLevelIndex++;
      waitingForNext = true;
      setTimeout(() => {
        waitingForNext = false;
        loadLevel();
      }, 1000);
    } else {
      gameActive = false;
      stopTimer();
      const heartsLost = 3 - hearts;
      const performance = heartsLost === 0 ? "ممتاز 🔥" : (heartsLost <= 1 ? "جيد جداً 🌟" : (heartsLost <= 2 ? "مقبول 🤔" : "صعب الإرضاء 😅"));
      winStats.innerHTML = `أنهيت 15 مرحلة 🎉<br>خسرت ${heartsLost} قلوب 💔<br>مستواك: ${performance}`;
      winOverlay.classList.remove('hidden');
    }
  } else {
    hearts--;
    updateHeartsUI();
    showRandomWrongMessage();
    vibrate(200);
    btnElement.classList.add('shake-effect');
    const qDiv = document.getElementById('questionText');
    if (qDiv) qDiv.classList.add('shake-effect');
    setTimeout(() => {
      btnElement.classList.remove('shake-effect');
      qDiv?.classList.remove('shake-effect');
    }, 500);
    
    if (hearts <= 0) {
      gameActive = false;
      stopTimer();
      gameOverOverlay.classList.remove('hidden');
    } else {
      waitingForNext = true;
      stopTimer();
      setTimeout(() => {
        waitingForNext = false;
        if (gameActive && hearts > 0) {
          loadLevel();
        }
      }, 1500);
    }
  }
}

function fullReset() {
  currentLevelIndex = 0;
  hearts = 3;
  gameActive = true;
  waitingForNext = false;
  if (timerInterval) clearInterval(timerInterval);
  updateHeartsUI();
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadLevel();
}

function startGame() {
  let name = playerNameInput.value.trim();
  if (name === "") name = "العبقري المجهول";
  playerName = name;
  localStorage.setItem('foolPuzzlePlayerName', playerName);
  playerNameDisplay.innerText = playerName;
  
  currentLevelIndex = 0;
  hearts = 3;
  gameActive = true;
  waitingForNext = false;
  updateHeartsUI();
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
  loadLevel();
  
  if (!audioCtx) {
    document.body.addEventListener('click', () => {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }, { once: true });
  }
}

function loadStoredName() {
  const saved = localStorage.getItem('foolPuzzlePlayerName');
  if (saved) playerNameInput.value = saved;
}

startBtn.addEventListener('click', startGame);
restartFromGameOverBtn.addEventListener('click', fullReset);
restartFromWinBtn.addEventListener('click', fullReset);
window.addEventListener('load', () => {
  loadStoredName();
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  winOverlay.classList.add('hidden');
});
