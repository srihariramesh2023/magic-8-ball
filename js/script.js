/* ============================================================
   Magic 8 Ball — responsive, shake-enabled
   ============================================================ */

let fortunes = [];
let shakeCount = parseInt(localStorage.getItem('magic8ball_shakes') || '0', 10);
let isShaking = false;
let audioCtx = null;
let history = JSON.parse(localStorage.getItem('magic8ball_history') || '[]');

// Shake detection state
let lastAccel = { x: 0, y: 0, z: 0 };
let lastShakeTime = 0;
let shakeCooldown = 1200; // ms between shakes
let shakeThreshold = 18;  // acceleration delta to trigger

// DOM refs
const ball = document.getElementById('ball');
const shakeBtn = document.getElementById('shakeBtn');
const answerEl = document.getElementById('answer');
const bubblesContainer = document.getElementById('bubbles');
const shakeCountEl = document.getElementById('shakeCount');
const historyList = document.getElementById('historyList');
const toast = document.getElementById('toast');

// ----- Load fortunes -----
async function loadFortunes() {
  try {
    const resp = await fetch('js/fortunes.json');
    fortunes = await resp.json();
  } catch (e) {
    fortunes = [
      { text: "It is certain", type: "positive" },
      { text: "Yes definitely", type: "positive" },
      { text: "Without a doubt", type: "positive" },
      { text: "Reply hazy, try again", type: "neutral" },
      { text: "Ask again later", type: "neutral" },
      { text: "Cannot predict now", type: "neutral" },
      { text: "Don't count on it", type: "negative" },
      { text: "My reply is no", type: "negative" },
      { text: "My sources say no", type: "negative" },
      { text: "Very doubtful", type: "negative" }
    ];
  }
}

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
    const duration = 0.6;
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
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(80, now + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(100, now + duration);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.12, now);
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
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
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
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.8);
    });
  } catch (e) {}
}

// ----- Bubbles -----
function createBubbles() {
  bubblesContainer.innerHTML = '';
  const count = 8 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 3 + Math.random() * 7;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = (10 + Math.random() * 80) + '%';
    bubble.style.bottom = (Math.random() * 20) + '%';
    bubble.style.setProperty('--duration', (2 + Math.random() * 3) + 's');
    bubble.style.setProperty('--delay', (Math.random() * 2) + 's');
    bubblesContainer.appendChild(bubble);
  }
}

// ----- Toast -----
let toastTimeout;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
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
const pickAnswer = () => {
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
};

// ----- Core: Shake -----
async function shake() {
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

  await new Promise(resolve => setTimeout(resolve, 800));

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
}

// ----- Shake detection (works on mobile + laptops with accelerometers) -----
function setupMotion() {
  // Check if DeviceMotionEvent is available
  if (typeof DeviceMotionEvent === 'undefined') return;

  // iOS 13+ requires permission request
  const needsPermission = typeof DeviceMotionEvent.requestPermission === 'function';

  const enableMotion = () => {
    window.addEventListener('devicemotion', handleMotion);
  };

  if (needsPermission) {
    // Show a subtle prompt on first tap (iOS requires user gesture)
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
    // Android / desktop — just enable directly
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

  lastAccel = {
    x: acc.x || 0,
    y: acc.y || 0,
    z: acc.z || 0
  };

  const now = Date.now();
  if (total > shakeThreshold && now - lastShakeTime > shakeCooldown) {
    lastShakeTime = now;
    shake();
  }
}

// ----- Parallax (desktop only) -----
function setupParallax() {
  if (window.matchMedia('(pointer: coarse)'.matches) return; // skip on touch devices

  document.addEventListener('mousemove', (e) => {
    if (isShaking) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    ball.style.transform = `rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
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
function init() {
  loadFortunes();
  setupParallax();
  setupMotion();
  shakeCountEl.textContent = shakeCount;
  createBubbles();
  renderHistory();

  if (shakeCount === 0) {
    setTimeout(() => showToast('Click the ball or press Spacebar'), 1000);
  }
}

init();
