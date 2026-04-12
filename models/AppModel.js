/**
 * MODEL — AppModel.js
 * Single source of truth for all app data, state, and config.
 * No DOM access. No side effects. Pure data.
 */

const AppModel = {

  // ── BIRTHDAY CONFIG ──────────────────────────────────────────────
  birthday: {
    name: 'Muhit',
    age: 20,
    title: 'HAPPY BIRTHDAY',
    subtitleLine1: 'WELCOME TO THE PITS, OLD TIMER',
    subtitleLine2: "YOU'VE COMPLETED 20 LAPS AROUND THE SUN",
    footerText: 'MADE WITH \u25A0 PIXELS \u25A0 AND \u25A0 PURE \u25A0 LOVE',
    footerSub: '&copy; BIRTHDAY INC. \u2014 HAPPY 20TH MUHIT',
  },

  // ── LETTER ───────────────────────────────────────────────────────
  letter: {
    header: '\u25A0 TRANSMISSION INCOMING \u25A0',
    paragraphs: [
      { text: 'Dear ', highlight: 'Lil Bro', rest: ',' },
      {
        text:
          "Sorry man, I am really shit at writing these things\n" +
          'so bear with me \u2014 but here it is.',
      },
      { red: '20th birthday, old man.', prefix: 'Happy ' },
      {
        text:
          "Twenty years on this planet and you're still\n" +
          "somehow going. That's actually impressive ngl.",
      },
      {
        text:
          "This past few years been a hard for you probably\n" +
          'appreciate you more than I probably ever say.\n' +
          'So consider this pixel art birthday card my\n',
        highlight: 'heartfelt letter',
        rest: " \u2014 don't judge the medium lol. Make big money in future",
      },
      {
        text:
          'Hope this year brings you everything you want \u2014\n' +
          'good races, good vibes, and no boring laps.',
      },
      { text: 'Now stop reading and ', red: 'open the box.' },
    ],
    sign:
      '\u2014 Your mate who couldn\u2019t afford a real gift\nbut spent way too long making this instead \u25A0',
  },

  // ── YOUTUBE ──────────────────────────────────────────────────────
  youtube: {
    videoId: 'PMYXhKvZbk8',
    url: 'https://www.youtube.com/watch?v=PMYXhKvZbk8',
    thumbnailUrl: 'https://img.youtube.com/vi/PMYXhKvZbk8/hqdefault.jpg',
    sorryMessage:
      '\u25A0 YOUR GIFT IS BELOW \u25A0\n\n(SORRY... NO MONEY RN LOL)\nBUT HEY \u2014 THIS SLAPS HARDER\nTHAN ANY PRESENT ANYWAY',
  },

  // ── GAME LINK ────────────────────────────────────────────────────
  game: {
    href: 'duck-hunt-custom.html',
    headline:
      '\u25A0 ONE MORE THING \u25A0\n\nI ALSO MADE YOU A GAME.\nNOT MUCH \u2014 A BIT JANKY \u2014\nBUT HAVE FUN WITH IT :)',
    subNote: '[ duck hunt w/ hand tracking \u2014 yes really ]',
    btnLabel: '\u25BA PLAY THE GAME',
  },

  // ── PIXEL CAR (colour map + rows) ────────────────────────────────
  pixelCar: {
    colorMap: {
      t: 'transparent',
      r: '#e8001d',
      R: '#ff1e00',
      b: '#111',
      s: '#ccc',
      S: '#999',
      y: '#ffd700',
      w: '#fff',
    },
    rows: [
      'tttttRtttttttttttttttttttttttttttttttttttttttttt',
      'ttttrRRRRrttttttttttttttttttttttttttttttttttttt',
      'tttRRRRRRRRtttsssssssssssssssssssssssssssssstt',
      'ttRRRRbbRRRRtsssRRRRRRRRRRRRRRRRRRRRRRRRssst',
      'tRRRRRbbbRRRRRRwwwwwwwwwwwwwwwwwwwwwwwwRRRt',
      'tRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRt',
      'tbbRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRbbt',
      'tybbybbtttttttttttttttttttttttttttttttttybbyt',
    ],
  },

  // ── MINI POP-CARS ────────────────────────────────────────────────
  popCars: [
    { color: '#e8001d', offsetX: -30, rotation: '-30deg' },
    { color: '#0066ff', offsetX: 0,   rotation: '10deg'  },
    { color: '#00cc44', offsetX: 30,  rotation: '40deg'  },
  ],

  // Mini car pixel grid (shared shape, colour injected at runtime)
  miniCarGrid: [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 2, 1, 2, 1, 1],
    [0, 3, 0, 0, 0, 3, 0],
  ],

  // ── STARS ────────────────────────────────────────────────────────
  stars: {
    count: 40,
  },

  // ── CONFETTI ─────────────────────────────────────────────────────
  confetti: {
    count: 50,
    colors: ['#ff1e00', '#ffd700', '#fff', '#00ccff', '#ff69b4', '#00ff88'],
  },

  // ── SPARKLES ─────────────────────────────────────────────────────
  sparkles: {
    count: 12,
    colors: ['#ffd700', '#ff1e00', '#fff', '#00ccff'],
  },

  // ── APP STATE (mutable at runtime via controller) ─────────────────
  state: {
    giftOpened: false,
  },
};

export default AppModel;
