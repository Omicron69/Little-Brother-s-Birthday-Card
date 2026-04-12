/**
 * CONTROLLER — controllers/AppController.js
 * Reads from Model. Calls View builders. Attaches event listeners.
 * Owns all animation logic and state mutations.
 */

import AppModel from '../models/AppModel.js';
import {
  buildCursor,
  buildStarField,
  buildHero,
  buildTrack,
  buildCarContainer,
  buildPixelCarRows,
  buildLetter,
  buildGiftBox,
  buildBottomSection,
  buildMiniCarHTML,
  buildFooter,
} from '../views/components/CardView.js';

// ── INIT ──────────────────────────────────────────────────────────────────────
export function init() {
  setupCursor();
  buildPage();
}

// ── CURSOR ────────────────────────────────────────────────────────────────────
function setupCursor() {
  const cursor = buildCursor();
  document.body.prepend(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => (cursor.style.opacity = '0'));
  document.addEventListener('mouseenter', () => (cursor.style.opacity = '1'));
}

// ── PAGE BUILD ────────────────────────────────────────────────────────────────
function buildPage() {
  const { birthday, letter, youtube, game, pixelCar, stars } = AppModel;

  // Stars
  document.body.prepend(buildStarField(stars.count));

  // Main wrapper
  const card = document.querySelector('.card') || createCardWrapper();
  const content = document.querySelector('.content') || createContentWrapper(card);

  // Hero
  content.appendChild(buildHero(birthday));

  // Track + car
  content.appendChild(buildTrack(3));
  const carWrap = buildCarContainer();
  content.appendChild(carWrap);
  content.appendChild(buildTrack(2));

  // Render pixel car rows
  const carEl = carWrap.querySelector('#pixelCar');
  carEl.appendChild(buildPixelCarRows(pixelCar.rows, pixelCar.colorMap));

  // Letter
  content.appendChild(buildLetter(letter));

  // Gift box
  const giftSection = buildGiftBox();
  const giftBox = giftSection.querySelector('#giftBox');
  giftBox.addEventListener('click', () => handleGiftClick());
  content.appendChild(giftSection);

  // Hidden bottom (revealed on gift open)
  const bottom = buildBottomSection(youtube, game);
  content.appendChild(bottom);

  // Footer
  card.appendChild(buildFooter(birthday));
}

function createCardWrapper() {
  const card = document.createElement('div');
  card.className = 'card';
  document.body.appendChild(card);
  return card;
}

function createContentWrapper(card) {
  const content = document.createElement('div');
  content.className = 'content';
  card.appendChild(content);
  return content;
}

// ── GIFT OPEN ─────────────────────────────────────────────────────────────────
function handleGiftClick() {
  if (AppModel.state.giftOpened) return;
  AppModel.state.giftOpened = true;

  const box = document.getElementById('giftBox');
  box.classList.add('opened');

  spawnPopCars(box);
  spawnSparkles(box);
  spawnConfetti();
  revealBottom();
}

function spawnPopCars(box) {
  const popCarsEl = document.getElementById('popCars');
  AppModel.popCars.forEach(data => {
    const car = document.createElement('div');
    car.className = 'pop-car';
    car.style.setProperty('--rot', data.rotation);
    car.style.left   = (50 + data.offsetX) + 'px';
    car.style.bottom = '0';
    car.innerHTML = buildMiniCarHTML(data.color, AppModel.miniCarGrid);
    popCarsEl.appendChild(car);
  });
}

function spawnSparkles(box) {
  const { count, colors } = AppModel.sparkles;
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.background = colors[i % colors.length];
    sp.style.setProperty('--sx', (Math.random() * 120 - 60) + 'px');
    sp.style.setProperty('--sy', (-40 - Math.random() * 80) + 'px');
    sp.style.left            = (30 + Math.random() * 40) + 'px';
    sp.style.bottom          = '70px';
    sp.style.animationDelay  = (Math.random() * 0.4) + 's';
    box.appendChild(sp);
  }
}

function spawnConfetti() {
  const { count, colors } = AppModel.confetti;
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `
      left: ${10 + Math.random() * 80}vw;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${1.5 + Math.random()}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'}
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

function revealBottom() {
  setTimeout(() => {
    const bottom = document.getElementById('bottom-section');
    bottom.classList.add('visible');
    bottom.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 600);
}
