/* ============================================================
   Magic 8 Ball — all devices, no dependencies
   ============================================================ */

const fortunes = [
  { text: "It is certain", type: "positive" },
  { text: "It is decidedly so", type: "positive" },
  { text: "Without a doubt", type: "positive" },
  { text: "Yes definitely", type: "positive" },
  { text: "You may rely on it", type: "positive" },
  { text: "As I see it, yes", type: "positive" },
  { text: "Most likely", type: "positive" },
  { text: "Outlook good", type: "positive" },
  { text: "Yes", type: "positive" },
  { text: "Signs point to yes", type: "positive" },
  { text: "Absolutely", type: "positive" },
  { text: "Indeed", type: "positive" },
  { text: "Positively", type: "positive" },
  { text: "Undoubtedly", type: "positive" },
  { text: "Certainly", type: "positive" },
  { text: "No question about it", type: "positive" },
  { text: "Right away", type: "positive" },
  { text: "You bet", type: "positive" },
  { text: "Beyond a shadow of a doubt", type: "positive" },
  { text: "The stars say yes", type: "positive" },
  { text: "Fortune smiles upon you", type: "positive" },
  { text: "The path is clear", type: "positive" },
  { text: "Success is near", type: "positive" },
  { text: "The answer is yes", type: "positive" },
  { text: "All signs agree", type: "positive" },
  { text: "The universe says yes", type: "positive" },
  { text: "It shall be", type: "positive" },
  { text: "Victory is yours", type: "positive" },
  { text: "Go for it", type: "positive" },
  { text: "The fates concur", type: "positive" },
  { text: "Reply hazy, try again", type: "neutral" },
  { text: "Ask again later", type: "neutral" },
  { text: "Better not tell you now", type: "neutral" },
  { text: "Cannot predict now", type: "neutral" },
  { text: "Concentrate and ask again", type: "neutral" },
  { text: "The mists are thick", type: "neutral" },
  { text: "The oracle is silent", type: "neutral" },
  { text: "Patience, seeker", type: "neutral" },
  { text: "The answer lies within", type: "neutral" },
  { text: "Seek elsewhere for now", type: "neutral" },
  { text: "The crystal ball is cloudy", type: "neutral" },
  { text: "Time will tell", type: "neutral" },
  { text: "The spirits are restless", type: "neutral" },
  { text: "Not yet revealed", type: "neutral" },
  { text: "The stars are misaligned", type: "neutral" },
  { text: "Wait and see", type: "neutral" },
  { text: "The answer drifts just out of reach", type: "neutral" },
  { text: "Look deeper", type: "neutral" },
  { text: "The winds are uncertain", type: "neutral" },
  { text: "Perhaps, perhaps not", type: "neutral" },
  { text: "The future is fluid", type: "neutral" },
  { text: "Ask the moon tonight", type: "neutral" },
  { text: "Don't count on it", type: "negative" },
  { text: "My reply is no", type: "negative" },
  { text: "My sources say no", type: "negative" },
  { text: "Outlook not so good", type: "negative" },
  { text: "Very doubtful", type: "negative" },
  { text: "No", type: "negative" },
  { text: "Absolutely not", type: "negative" },
  { text: "The answer is no", type: "negative" },
  { text: "Not a chance", type: "negative" },
  { text: "I wouldn't bet on it", type: "negative" },
  { text: "The stars say no", type: "negative" },
  { text: "Fortune frowns upon this", type: "negative" },
  { text: "The path is blocked", type: "negative" },
  { text: "Do not pursue this", type: "negative" },
  { text: "It is not meant to be", type: "negative" },
  { text: "The fates say otherwise", type: "negative" },
  { text: "Turn back", type: "negative" },
  { text: "The oracle shakes its head", type: "negative" },
  { text: "No luck awaits", type: "negative" },
  { text: "The crystal is dark", type: "negative" },
  { text: "Beware this path", type: "negative" },
  { text: "The spirits refuse", type: "negative" },
  { text: "Not in this lifetime", type: "negative" },
  { text: "The universe says no", type: "negative" },
  { text: "All signs point away", type: "negative" },
  { text: "It shall not be", type: "negative" },
  { text: "Defeat is certain", type: "negative" },
  { text: "Abandon this quest", type: "negative" },
  { text: "The answer is never", type: "negative" },
  { text: "This is a curious question", type: "neutral" },
  { text: "Ask a different question", type: "neutral" },
  { text: "I sense confusion", type: "neutral" },
  { text: "The ball is thinking", type: "neutral" },
  { text: "Interesting question", type: "neutral" },
  { text: "Let me consult the spirits", type: "neutral" },
  { text: "The answer is maybe", type: "neutral" },
  { text: "Yes and also no", type: "neutral" },
  { text: "The ball is undecided", type: "neutral" },
  { text: "Only time will reveal the truth", type: "neutral" },
  { text: "The answer is blowing in the wind", type: "neutral" },
  { text: "Signs point in all directions", type: "neutral" },
  { text: "The oracle shrugs", type: "neutral" },
  { text: "Yes, but not yet", type: "neutral" },
  { text: "No, but perhaps later", type: "neutral" },
  { text: "Definitely maybe", type: "neutral" },
  { text: "The ball needs more time", type: "neutral" },
  { text: "Ask again with more conviction", type: "neutral" },
  { text: "The spirits whisper yes", type: "positive" },
  { text: "A golden future awaits", type: "positive" },
  { text: "The answer is written in the stars", type: "positive" },
  { text: "Yes, with great certainty", type: "positive" },
  { text: "The ball is pleased", type: "positive" },
  { text: "A resounding yes", type: "positive" },
  { text: "The answer is clear", type: "positive" },
  { text: "Yes, the time is now", type: "positive" },
  { text: "The ball has spoken", type: "positive" },
  { text: "A thousand times yes", type: "positive" },
  { text: "The answer is a firm no", type: "negative" },
  { text: "The ball says never", type: "negative" },
  { text: "Not in a million years", type: "negative" },
  { text: "The answer is a thunderous no", type: "negative" },
  { text: "The ball refuses", type: "negative" },
  { text: "Absolutely, positively no", type: "negative" },
  { text: "The answer is lost to the void", type: "neutral" },
  { text: "The ball is meditating", type: "neutral" },
  { text: "Seek your own answer", type: "neutral" },
  { text: "The question itself is the answer", type: "neutral" },
  { text: "Yes, no, maybe, so", type: "neutral" },
  { text: "The ball is on a break", type: "neutral" },
  { text: "Ask a simpler question", type: "neutral" },
  { text: "The answer is 42", type: "neutral" },
  { text: "Error 404: answer not found", type: "neutral" },
  { text: "The ball ran out of answers", type: "neutral" },
  { text: "Rebooting the oracle", type: "neutral" },
  { text: "Have you tried turning it off and on", type: "neutral" },
  { text: "The ball is questioning your question", type: "neutral" },
  { text: "That is not a yes-or-no question", type: "neutral" },
  { text: "The ball is confused", type: "neutral" },
  { text: "Try asking nicely", type: "neutral" },
  { text: "The ball needs coffee", type: "neutral" },
  { text: "The spirits are on vacation", type: "neutral" },
  { text: "Ask again when the moon is full", type: "neutral" },
  { text: "The ball is feeling sarcastic today", type: "neutral" },
  { text: "Oh, absolutely, totally, yes", type: "positive" },
  { text: "You already know the answer", type: "neutral" },
  { text: "The ball senses great danger", type: "negative" },
  { text: "The ball senses great fortune", type: "positive" },
  { text: "The ball is crying", type: "negative" },
  { text: "The ball is laughing", type: "positive" },
  { text: "The ball is sleeping", type: "neutral" },
  { text: "The ball is dancing", type: "positive" },
  { text: "The ball is judging you", type: "neutral" },
  { text: "The ball believes in you", type: "positive" },
  { text: "The ball has lost faith", type: "negative" },
  { text: "The ball is proud of you", type: "positive" },
  { text: "The ball is disappointed", type: "negative" },
  { text: "The ball thinks you are worthy", type: "positive" },
  { text: "The ball thinks you need to reflect", type: "neutral" },
  { text: "The ball says trust yourself", type: "positive" },
  { text: "The ball says let it go", type: "neutral" },
  { text: "The ball says hold on tight", type: "positive" },
  { text: "The ball says release your grip", type: "neutral" },
  { text: "The ball says the journey begins", type: "positive" },
  { text: "The ball says the end is near", type: "negative" },
  { text: "The ball says a new chapter awaits", type: "positive" },
  { text: "The ball says close this chapter", type: "neutral" },
  { text: "The ball says love is the answer", type: "positive" },
  { text: "The ball says money is the root", type: "negative" },
  { text: "The ball says patience is a virtue", type: "neutral" },
  { text: "The ball says seize the day", type: "positive" },
  { text: "The ball says wait for the right moment", type: "neutral" },
  { text: "The ball says now or never", type: "positive" },
  { text: "The ball says slow and steady", type: "neutral" },
  { text: "The ball says fortune favors the bold", type: "positive" },
  { text: "The ball says look before you leap", type: "neutral" },
  { text: "The ball says the best is yet to come", type: "positive" },
  { text: "The ball says this too shall pass", type: "neutral" },
  { text: "The ball says every cloud has a silver lining", type: "positive" },
  { text: "The ball says not all that glitters is gold", type: "negative" }
];

let shakeCount = parseInt(localStorage.getItem('magic8ball_shakes') || '0', 10);
let isShaking = false;
let audioCtx = null;
let history = JSON.parse(localStorage.getItem('magic8ball_history') || '[]');

let lastAccel = { x: 0, y: 0, z: 0 };
let lastShakeTime = 0;

const ball = document.getElementById('ball');
const shakeBtn = document.getElementById('shakeBtn');
const answerEl = document.getElementById('answer');
const bubblesContainer = document.getElementById('bubbles');
const shakeCountEl = document.getElementById('shakeCount');
const historyList = document.getElementById('historyList');
const toast = document.getElementById('toast');

// ----- Audio -----
function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playShakeSound() {
  try {
    const ctx = getAudioCtx();
    const duration = 0.5;
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 1.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(80, now + duration);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {}
}

function playBubbleSound() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

function playRevealSound() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.7);
    });
  } catch (e) {}
}

// ----- Bubbles -----
function createBubbles() {
  bubblesContainer.innerHTML = '';
  const count = 6 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 2 + Math.random() * 5;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = (10 + Math.random() * 80) + '%';
    bubble.style.bottom = (Math.random() * 15) + '%';
    bubble.style.setProperty('--duration', (2 + Math.random() * 2.5) + 's');
    bubble.style.setProperty('--delay', (Math.random() * 1.5) + 's');
    bubblesContainer.appendChild(bubble);
  }
}

// ----- Toast -----
let toastTimeout;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ----- History -----
function renderHistory() {
  historyList.innerHTML = '';
  const recent = history.slice(-5).reverse();
  recent.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.text} <span class="type-badge ${item.type}">${item.type}</span>`;
    historyList.appendChild(li);
  });
}

function addToHistory(answer) {
  history.push({ text: answer.text, type: answer.type });
  if (history.length > 20) history = history.slice(-20);
  localStorage.setItem('magic8ball_history', JSON.stringify(history));
  renderHistory();
}

// ----- Pick answer -----
function pickAnswer() {
  const r = Math.random();
  let pool;
  if (r < 0.4) {
    pool = fortunes.filter(f => f.type === 'positive');
  } else if (r < 0.7) {
    pool = fortunes.filter(f => f.type === 'neutral');
  } else {
    pool = fortunes.filter(f => f.type === 'negative');
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// ----- Core: Shake -----
function shake() {
  if (isShaking) return;
  isShaking = true;

  answerEl.classList.remove('visible');
  answerEl.textContent = '...';
  answerEl.setAttribute('data-length', 'short');

  ball.classList.add('shaking');
  playShakeSound();
  createBubbles();

  const popInterval = setInterval(() => {
    if (Math.random() > 0.5) playBubbleSound();
  }, 150);

  const answer = pickAnswer();

  setTimeout(() => {
    ball.classList.remove('shaking');
    clearInterval(popInterval);

    answerEl.textContent = answer.text;
    const len = answer.text.length;
    let lengthClass = 'long';
    if (len <= 10) lengthClass = 'short';
    else if (len <= 18) lengthClass = 'medium';
    answerEl.setAttribute('data-length', lengthClass);

    setTimeout(() => {
      answerEl.classList.add('visible');
    }, 50);

    playRevealSound();

    shakeCount++;
    localStorage.setItem('magic8ball_shakes', shakeCount);
    shakeCountEl.textContent = shakeCount;

    addToHistory(answer);

    ball.style.transform = '';
    isShaking = false;
  }, 750);
}

// ----- Shake detection -----
function setupMotion() {
  if (typeof DeviceMotionEvent === 'undefined') return;

  const needsPermission = typeof DeviceMotionEvent.requestPermission === 'function';

  const enableMotion = () => {
    window.addEventListener('devicemotion', handleMotion);
  };

  if (needsPermission) {
    document.body.addEventListener('click', () => {
      DeviceMotionEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            enableMotion();
            showToast('Shake your device to reveal fortunes!');
          }
        })
        .catch(() => {});
    }, { once: true });
  } else {
    enableMotion();
  }
}

function handleMotion(e) {
  const acc = e.accelerationIncludingGravity || e.acceleration;
  if (!acc || acc.x === null) return;

  const dx = Math.abs((acc.x || 0) - lastAccel.x);
  const dy = Math.abs((acc.y || 0) - lastAccel.y);
  const dz = Math.abs((acc.z || 0) - lastAccel.z);
  const total = dx + dy + dz;

  lastAccel = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };

  const now = Date.now();
  if (total > 18 && now - lastShakeTime > 1200) {
    lastShakeTime = now;
    shake();
  }
}

// ----- Parallax (desktop only) -----
function setupParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    if (isShaking) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    ball.style.transform = `rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
  });
}

// ----- Event listeners -----
shakeBtn.addEventListener('click', () => {
  getAudioCtx();
  shake();
});

ball.addEventListener('click', () => {
  getAudioCtx();
  shake();
});

ball.addEventListener('touchstart', () => {
  getAudioCtx();
}, { once: true });

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    getAudioCtx();
    shake();
  }
});

// ----- Init -----
shakeCountEl.textContent = shakeCount;
createBubbles();
renderHistory();

if (shakeCount === 0) {
  setTimeout(() => showToast('Click the ball or press Spacebar'), 800);
}

setupParallax();
setupMotion();
