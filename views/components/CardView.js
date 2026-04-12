/**
 * VIEWS — views/components/CardView.js
 * Builds and returns DOM nodes. No logic. No state mutation.
 * Every function receives data from the Model and returns HTML strings or elements.
 */

// ── CHECKERED FLAG ────────────────────────────────────────────────────────────
export function buildFlag() {
  const wrapper = document.createElement('div');
  wrapper.className = 'pixel-flag';
  // 4×4 alternating black/white
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const cell = document.createElement('span');
      cell.className = (row + col) % 2 === 0 ? 'f-w' : 'f-b';
      wrapper.appendChild(cell);
    }
  }
  return wrapper;
}

// ── HERO / TITLE BLOCK ────────────────────────────────────────────────────────
export function buildHero(birthday) {
  const frag = document.createDocumentFragment();

  // Title row
  const row = document.createElement('div');
  row.className = 'title-row';
  row.appendChild(buildFlag());
  const title = document.createElement('div');
  title.className = 'main-title';
  title.textContent = birthday.title;
  row.appendChild(title);
  row.appendChild(buildFlag());
  frag.appendChild(row);

  // Age badge
  const badge = document.createElement('div');
  badge.className = 'age-badge';
  badge.textContent = String(birthday.age);
  frag.appendChild(badge);

  // Subtitle
  const sub = document.createElement('div');
  sub.className = 'subtitle';
  sub.innerHTML = `${birthday.subtitleLine1}<br>${birthday.subtitleLine2}`;
  frag.appendChild(sub);

  return frag;
}

// ── ANIMATED TRACK ────────────────────────────────────────────────────────────
export function buildTrack(lineCount = 3) {
  const track = document.createElement('div');
  track.className = 'track';
  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'track-line';
    track.appendChild(line);
  }
  return track;
}

// ── PIXEL CAR CONTAINER ───────────────────────────────────────────────────────
export function buildCarContainer() {
  const wrap = document.createElement('div');
  wrap.className = 'car-container';
  const car = document.createElement('div');
  car.className = 'pixel-car';
  car.id = 'pixelCar';
  wrap.appendChild(car);
  return wrap;
}

// ── PIXEL CAR ROWS (filled by controller) ────────────────────────────────────
export function buildPixelCarRows(rows, colorMap) {
  const frag = document.createDocumentFragment();
  rows.forEach(rowStr => {
    const rowEl = document.createElement('div');
    rowEl.className = 'pixel-row';
    [...rowStr].forEach(ch => {
      const px = document.createElement('span');
      px.className = 'px';
      px.style.background = colorMap[ch] || 'transparent';
      rowEl.appendChild(px);
    });
    frag.appendChild(rowEl);
  });
  return frag;
}

// ── LETTER ────────────────────────────────────────────────────────────────────
export function buildLetter(letter) {
  const section = document.createElement('div');
  section.className = 'letter-section';

  const header = document.createElement('div');
  header.className = 'letter-header';
  header.textContent = letter.header;
  section.appendChild(header);

  const body = document.createElement('div');
  body.className = 'letter-body';

  letter.paragraphs.forEach((p, i) => {
    if (i > 0) { body.appendChild(document.createElement('br')); body.appendChild(document.createElement('br')); }

    if (p.prefix) body.appendChild(document.createTextNode(p.prefix));

    if (p.highlight && !p.text) {
      // pure highlight line
      const span = document.createElement('span');
      span.className = 'highlight';
      span.textContent = p.highlight;
      body.appendChild(span);
      if (p.rest) body.appendChild(document.createTextNode(p.rest));
    } else if (p.red && !p.text) {
      const span = document.createElement('span');
      span.className = 'red';
      span.textContent = p.red;
      body.appendChild(span);
    } else {
      // plain text, possibly with inline highlight/red
      const lines = (p.text || '').split('\n');
      lines.forEach((line, li) => {
        if (li > 0) body.appendChild(document.createElement('br'));
        body.appendChild(document.createTextNode(line));
      });
      if (p.highlight) {
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = p.highlight;
        body.appendChild(span);
        if (p.rest) body.appendChild(document.createTextNode(p.rest));
      }
      if (p.red) {
        const span = document.createElement('span');
        span.className = 'red';
        span.textContent = p.red;
        body.appendChild(span);
      }
    }
  });

  section.appendChild(body);

  const sign = document.createElement('div');
  sign.className = 'letter-sign';
  sign.innerHTML = letter.sign.replace(/\n/g, '<br>');
  section.appendChild(sign);

  return section;
}

// ── GIFT BOX ──────────────────────────────────────────────────────────────────
export function buildGiftBox() {
  const section = document.createElement('div');
  section.className = 'gift-section';

  const label = document.createElement('div');
  label.className = 'gift-label';
  label.innerHTML = 'CLICK THE GIFT BOX<br>TO OPEN YOUR PRESENT...';
  section.appendChild(label);

  const box = document.createElement('div');
  box.className = 'gift-box';
  box.id = 'giftBox';
  box.innerHTML = `
    <div class="bow-left"></div>
    <div class="bow-right"></div>
    <div class="bow-center"></div>
    <div class="gift-lid"></div>
    <div class="gift-body"></div>
    <div class="pop-cars" id="popCars"></div>
  `;
  section.appendChild(box);

  return section;
}

// ── BOTTOM SECTION (hidden until gift opened) ─────────────────────────────────
export function buildBottomSection(youtube, game) {
  const section = document.createElement('div');
  section.id = 'bottom-section';

  // Divider
  section.appendChild(buildDivider());

  // YouTube block
  const ytSection = document.createElement('div');
  ytSection.className = 'yt-section';

  const sorry = document.createElement('div');
  sorry.className = 'sorry-msg';
  sorry.innerHTML = youtube.sorryMessage.replace(/\n/g, '<br>');
  ytSection.appendChild(sorry);

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'yt-thumb-wrap';
  thumbWrap.innerHTML = `
    <img src="${youtube.thumbnailUrl}" alt="Birthday Song" />
    <div class="yt-play-btn"></div>
  `;
  thumbWrap.addEventListener('click', () => window.open(youtube.url, '_blank'));
  ytSection.appendChild(thumbWrap);

  const ytLink = document.createElement('a');
  ytLink.className = 'yt-open-link';
  ytLink.href = youtube.url;
  ytLink.target = '_blank';
  ytLink.textContent = '\u25BA CLICK TO OPEN ON YOUTUBE';
  ytSection.appendChild(ytLink);

  section.appendChild(ytSection);
  section.appendChild(buildDivider());

  // Game link block
  const gameSec = document.createElement('div');
  gameSec.className = 'game-link-section';

  const headline = document.createElement('div');
  headline.className = 'game-headline';
  headline.innerHTML =
    game.headline.replace(/\n/g, '<br>') +
    `<span class="dim">${game.subNote}</span>`;
  gameSec.appendChild(headline);

  const btn = document.createElement('a');
  btn.className = 'game-btn';
  btn.href = game.href;
  btn.target = '_blank';
  btn.textContent = game.btnLabel;
  gameSec.appendChild(btn);

  section.appendChild(gameSec);

  return section;
}

// ── MINI POP-CAR HTML ─────────────────────────────────────────────────────────
export function buildMiniCarHTML(color, grid) {
  const colorMap = { 0: 'transparent', 1: color, 2: '#fff', 3: '#333' };
  let html = '<div style="display:flex;flex-direction:column">';
  grid.forEach(row => {
    html += '<div style="display:flex">';
    row.forEach(cell => {
      html += `<span style="width:6px;height:6px;background:${colorMap[cell]};display:inline-block"></span>`;
    });
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// ── F1 CURSOR ─────────────────────────────────────────────────────────────────
export function buildCursor() {
  const el = document.createElement('div');
  el.id = 'f1-cursor';
  el.innerHTML = `
    <svg viewBox="0 0 60 28" xmlns="http://www.w3.org/2000/svg">
      <rect x="8"  y="10" width="44" height="10" fill="#e8001d" rx="2"/>
      <polygon points="52,13 60,15 52,17" fill="#e8001d"/>
      <rect x="24" y="7"  width="16" height="8"  fill="#111" rx="2"/>
      <rect x="26" y="8"  width="12" height="5"  fill="#4af" rx="1" opacity="0.7"/>
      <rect x="48" y="17" width="8"  height="3"  fill="#cc0000"/>
      <rect x="4"  y="6"  width="10" height="3"  fill="#cc0000"/>
      <rect x="4"  y="17" width="10" height="3"  fill="#cc0000"/>
      <rect x="10" y="18" width="10" height="10" fill="#222" rx="5"/>
      <rect x="40" y="18" width="10" height="10" fill="#222" rx="5"/>
      <rect x="12" y="20" width="6"  height="6"  fill="#555" rx="3"/>
      <rect x="42" y="20" width="6"  height="6"  fill="#555" rx="3"/>
      <rect x="26" y="5"  width="12" height="3"  fill="#ffd700" rx="1"/>
      <text x="30" y="17" font-family="monospace" font-size="6" fill="#fff" text-anchor="middle" font-weight="bold">1</text>
    </svg>
  `;
  return el;
}

// ── STAR FIELD ────────────────────────────────────────────────────────────────
export function buildStarField(count) {
  const wrap = document.createElement('div');
  wrap.className = 'stars';
  wrap.id = 'stars';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 60}%;
      animation-delay:${Math.random() * 2}s;
      animation-duration:${1 + Math.random() * 2}s
    `;
    wrap.appendChild(s);
  }
  return wrap;
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
export function buildFooter(birthday) {
  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `${birthday.footerText}<br>${birthday.footerSub}`;
  return footer;
}

// ── DIVIDER ───────────────────────────────────────────────────────────────────
export function buildDivider() {
  const d = document.createElement('div');
  d.className = 'pixel-divider';
  return d;
}
