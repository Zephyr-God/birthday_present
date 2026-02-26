let activeDragWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

let zIndexCounter = 100;

function bringToFront(win) {
  zIndexCounter++;
  win.style.zIndex = zIndexCounter;
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("fade-out");

    // Remove from DOM after fade
    setTimeout(() => {
      loader.remove();
    }, 1000);

  }, 6000); // 5 seconds
});




// Global focus: whichever window you click/hold comes to the top
document.addEventListener('mousedown', (e) => {
  const win = e.target.closest('.window');
  if (!win) return;
  if (win.dataset && win.dataset.minimized === 'true') return;
  bringToFront(win);
});

document.addEventListener('pointerdown', (e) => {
  const win = e.target.closest('.window');
  if (!win) return;
  if (win.dataset && win.dataset.minimized === 'true') return;
  bringToFront(win);
});




const fileManagerFolders = [
  { name: "Love Letters", icon: '💌', bgColor: '#ff4d6d' },
  { name: "Specials", icon: '📸', bgColor: '#ff85a2' },
  { name: "Our Playlist", icon: '🎵', bgColor: '#4caf50' },
  { name: "Date Ideas", icon: '📅', bgColor: '#9c27b0' },
  { name: "Birthday Wishes", icon: '🎂', bgColor: '#ff9800' },
  { name: "Love Quotes", icon: '📝', bgColor: '#ffb3c6' },
  { name: "Notes For You", icon: '✨', bgColor: '#00bcd4' }
];

const playlistSongs = [
  {
    title: "Make You Mine",
    artist: "PUBLIC",
    src: "assets/music/make-you-mine.mp3",
    cover: "assets/covers/make-you-mine.jpg",
    duration: "3:52"
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "assets/music/i-wanna-be-yours.mp3",
    cover: "assets/covers/i-wanna-be-yours.jpg",
    duration: "3:03"
  },
  {
    title: "Dooron Dooron",
    artist: "Arijit Singh",
    src: "assets/music/dooron-dooron.mp3",
    cover: "assets/covers/dooron-dooron.jpg",
    duration: "4:12"
  }
];

const loveQuotes = [
  "In a sea of people, my eyes will always search for you.",
  "You are my today and all of my tomorrows.",
  "Every love story is beautiful, but ours is my favorite.",
  "I still keep falling for you, every single day.",
  "With you, I feel at home.",
  "Loving you feels less like falling and more like finding.",
  "In a world always rushing for something, you are my calm and peace.",
  "I don't need perfect days, as long as i get them with with you, my love.",
  "You are my favourite person, the person i want to return to every day.",
  "I'm just really glad i get to be your boyfriend and be with you."
];

const LOVE_QUOTES_STORAGE_KEY = 'love_quotes_list';

function getLoveQuotesFromStorage() {
  try {
    const saved = localStorage.getItem(LOVE_QUOTES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const cleaned = parsed
          .map(q => (typeof q === 'string' ? q : ''))
          .filter(q => q.trim().length);
        if (cleaned.length) return cleaned;
      }
    }
  } catch (e) {
    // ignore
  }
  return Array.isArray(loveQuotes) && loveQuotes.length ? [...loveQuotes] : ["You are my favorite place to be."];
}

function setLoveQuotesToStorage(nextQuotes) {
  const safe = Array.isArray(nextQuotes)
    ? nextQuotes.map(q => (typeof q === 'string' ? q : '')).filter(q => q.trim().length)
    : [];
  try {
    localStorage.setItem(LOVE_QUOTES_STORAGE_KEY, JSON.stringify(safe.length ? safe : ["You are my favorite place to be."]));
  } catch (e) {
    // ignore
  }
  return getLoveQuotesFromStorage();
}

function addLoveQuoteToStorage(text) {
  const current = getLoveQuotesFromStorage();
  current.push(typeof text === 'string' && text.trim().length ? text.trim() : 'New quote...');
  setLoveQuotesToStorage(current);
  return current.length - 1;
}

function updateLoveQuoteInStorage(index, text) {
  const current = getLoveQuotesFromStorage();
  const i = Number(index);
  if (!Number.isFinite(i) || i < 0 || i >= current.length) return current;
  const t = typeof text === 'string' ? text.trim() : '';
  if (!t.length) return current;
  current[i] = t;
  return setLoveQuotesToStorage(current);
}

function resetLoveQuotesStorage() {
  try {
    localStorage.removeItem(LOVE_QUOTES_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  return getLoveQuotesFromStorage();
}

window.LoveQuotes = {
  get: getLoveQuotesFromStorage,
  set: setLoveQuotesToStorage,
  add: addLoveQuoteToStorage,
  update: updateLoveQuoteInStorage,
  reset: resetLoveQuotesStorage
};

const notesForYou = `Once you asked me, "why do you love me".. well here are some reasons-\n1. Because your smile feels like sunrise.\n2. Because your laugh sounds like peace.\n3. Because silence is easy with you.\n4. Because you listen without judging.\n5. Because you see the good in everything.\n6. Because you make life feel lighter.\n7. Because your eyes hold stories.\n8. Because you believe in people.\n9. Because you feel like calm in chaos.\n10. Because you’re real in a fake world.\n11. Because you make moments unforgettable.\n12. Because you’re stronger than you think.\n13. Because you’re gentle without even trying.\n14. Because you make me feel seen.\n15. Because you actually laugh at my jokes.\n16. Because you feel like comfort.\n17. Because you inspire me to be better.\n18. Because you care in small ways.\n19. Because you remember details others forget.\n20. Because you notice the little things.\n21. Because you make me forget everything bad.\n22. Because your heart feels deeply.\n23. Because you’re calm and chaos both in one.\n24. Because you’re a mystery I never solve.\n25. Because you’re naturally beautiful.\n26. Because your presence feels like home.\n27. Because you excite me and calm me.\n28. Because you’re kind even when unnoticed.\n29. Because you embrace differences.\n30. Because you teach patience.\n31. Because you forgive easily.\n32. Because you love bravely.\n33. Because I never get tired of you.\n34. Because you’re soft yet unbreakable.\n35. Because you understand without words.\n36. Because you believe in hope.\n37. Because your voice feels familiar.\n38. Because you make ordinary things special.\n39. Because you show up when it matters.\n40. Because you bring clarity in confusion.\n41. Because you make sadness feel less heavy.\n42. Because you feel like déjà vu.\n43. Because you see through my silence.\n44. Because you make effort without showing it.\n45. Because you give everything meaning.\n46. Because you’re honest even when it hurts.\n47. Because you make the world softer.\n48. Because you feel like a safe place.\n49. Because you carry warmth in your words.\n50. Because you make me want to be better.\n51. Because you’re rare.\n52. Because you’re thoughtful in ways people overlook.\n53. Because you care more than you admit.\n54. Because you make life feel less empty.\n55. Because your happiness feels contagious.\n56. Because you’re brave with your heart.\n57. Because you make me feel enough.
58. Because you notice my mood without asking.
59. Because you listen like you truly want to understand.
60. Because you feel like poetry.
61. Because you light up my quiet life.
62. Because you bring peace without trying.
63. Because you’re unpredictable in the best way.
64. Because you see beauty in flaws.
65. Because you make goodbyes harder.
66. Because you make hell feel survivable.
67. Because you make mornings worth waking up to.
68. Because you find joy in small things.
69. Because you treat people gently and kindly.
70. Because you’re honest about your fears.
71. Because you grow even when it hurts.
72. Because you choose kindness.
73. Because you make me feel understood.
74. Because you’re patient with broken people.
75. Because you carry pain quietly.
76. Because you never give up easily.
77. Because you’re the calm after storms.
78. Because you’re the storm sometimes.
79. Because you make memories feel alive.
80. Because you value loyalty.
81. Because you make me feel wanted.
82. Because you make me feel safe with you.
83. Because you’re unique in ways you don’t see.
84. Because you shine without trying.
85. Because you make reality feel like a fever dreams.
86. Because you make time move slower.
87. Because you notice the things I try to hide.
88. Because you make me feel lucky.
89. Because you don’t fake your feelings.
90. Because you give love without expectations.
91. Because you make fear feel smaller.
92. Because you feel like a warm memory.
93. Because you make loneliness disappear.
94. Because you’re effortless.
95. Because you choose love even when it hurts.
96. Because you speak with sincerity.
97. Because you feel like soft sunlight.
98. Because you make silence comfortable.
99. Because you changed me in ways you’ll never know.
100. Because you made me believe even i deserve love.`;

const notesForMe = 'Whatever note you want to give me';

const NOTES_FOR_YOU_STORAGE_KEY = 'notes_for_you_content';
const NOTES_FOR_ME_STORAGE_KEY = 'notes_for_me_content';

function getNotesHtmlFromStorage(tab) {
  const key = tab === 'forMe' ? NOTES_FOR_ME_STORAGE_KEY : NOTES_FOR_YOU_STORAGE_KEY;
  const fallback = tab === 'forMe' ? notesForMe : notesForYou;
  try {
    const saved = localStorage.getItem(key);
    return (saved && saved.trim().length) ? saved : fallback;
  } catch (e) {
    // ignore
  }
  return fallback;
}

function setNotesHtmlToStorage(tab, html) {
  const key = tab === 'forMe' ? NOTES_FOR_ME_STORAGE_KEY : NOTES_FOR_YOU_STORAGE_KEY;
  const fallback = tab === 'forMe' ? notesForMe : notesForYou;
  const safe = (typeof html === 'string' && html.trim().length) ? html : fallback;
  try {
    localStorage.setItem(key, safe);
  } catch (e) {
    // ignore
  }
  return getNotesHtmlFromStorage(tab);
}

function addNotesHtmlToStorage(tab, htmlToAppend) {
  const current = getNotesHtmlFromStorage(tab);
  const addition = (typeof htmlToAppend === 'string' && htmlToAppend.trim().length) ? htmlToAppend : '';
  if (!addition.length) return current;
  const next = (current && current.trim().length) ? (current + "\n" + addition) : addition;
  return setNotesHtmlToStorage(tab, next);
}

function resetNotesStorage(tab) {
  const key = tab === 'forMe' ? NOTES_FOR_ME_STORAGE_KEY : NOTES_FOR_YOU_STORAGE_KEY;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // ignore
  }
  return getNotesHtmlFromStorage(tab);
}

window.Notes = {
  getForYou: () => getNotesHtmlFromStorage('forYou'),
  setForYou: (html) => setNotesHtmlToStorage('forYou', html),
  addForYou: (html) => addNotesHtmlToStorage('forYou', html),
  resetForYou: () => resetNotesStorage('forYou'),
  getForMe: () => getNotesHtmlFromStorage('forMe'),
  setForMe: (html) => setNotesHtmlToStorage('forMe', html),
  addForMe: (html) => addNotesHtmlToStorage('forMe', html),
  resetForMe: () => resetNotesStorage('forMe')
};


const dateIdeas = [
  {
    emoji: "💖",
    title: "Late Night Walks",
    plan: `
      A late night walk somewhere far from our hourses,
      where we talk about everything and nothing.
      About our life, dreams, random thoughts, 
      and things maybe we never texted.
      No destination. No rush. Just us and the falling night
    `
  },
  {
    emoji: "💘",
    title: "Late Night Drives",
    plan: `
      A quiet drive with soft music,
      no destination in mind, going where the road takes 
      us,
      talking about dreams and love,
      stopping somewhere peaceful,
      and watching the city lights together.
    `
  },
  {
    emoji: "💝",
    title: "Movie Nights That Turn Into Talking Nights",
    plan: `
      We start with a movie, 
      we pause it way too many times.
      We end up talking more than the movie itself.
      And somehow, that becomes the best part of our 
      night.
    `
  },
  {
    emoji: "☕",
    title: "Cafe Dates",
    plan: `
      Trying different cafes of our cities, 
      judging coffee like experts 
      (even though we’re not)
      sharing desserts, stealing sips 
      from each other’s cups, and
      and sitting across the table just…
      existing together
    `
  },
  {
    emoji: "🌧️",
    title: "Rainy Dates",
    plan: `
      Riding on the bike, 
      going around the city, 
      finding a high spot, standing together,
      watching the rain fall. 
      letting the world slow down for a while.
    `
  }
];




let currentSongIndex = 0;
const audio = new Audio();

// Demo video lists for folder windows (replace with your own files later)
const myBabyyVideos = [
  'assets/My Babyy/1.mp4',
  'assets/My Babyy/2.mp4',
  'assets/My Babyy/3.mp4',
  'assets/My Babyy/4.mp4',
  'assets/My Babyy/5.mp4',
  'assets/My Babyy/6.mp4',,
  'assets/My Babyy/7.mp4',
  'assets/My Babyy/8.mp4',
  'assets/My Babyy/9.mp4',,
  'assets/My Babyy/10.mp4'
];

const meVideos = [
  'assets/Me/me1.mp4',
  'assets/Me/me2.mp4',
  'assets/Me/me3.mp4',
  'assets/Me/me4.mp4',
];




// Use the same folder definitions for both desktop and file manager
const folders = fileManagerFolders.map(folder => folder.name);
folders.push('File Manager'); // Add File Manager to the list

const desktop = document.getElementById('desktop');
const startMenu = document.getElementById('startMenu');
const taskApps = document.getElementById('taskApps');
const startBtn = document.getElementById('startBtn');
const desktopIcons = document.getElementById('desktopIcons');
const taskTime = document.getElementById('taskTime');
const overlay = document.getElementById('overlay');
const taskbar = document.getElementById('taskbar');
const appsGrid = document.getElementById("appsGrid");
const MOBILE_VIEWPORT_MAX = 900;
let activeDragPointerId = null;

startMenu.style.display = "none";

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_VIEWPORT_MAX}px)`).matches;
}

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function fitWindowToViewport(win, options = {}) {
  if (!win || !win.classList || !win.classList.contains('window')) return;
  if (win.classList.contains('my-heart-window')) return;

  const isMobile = isMobileViewport();
  const margin = isMobile ? 8 : 0;
  const taskbarHeight = taskbar ? taskbar.offsetHeight : 56;
  const maxWidth = Math.max(240, window.innerWidth - margin * 2);
  const maxHeight = Math.max(220, window.innerHeight - taskbarHeight - margin * 2);

  if (isMobile) {
    win.style.maxWidth = `${maxWidth}px`;
    win.style.maxHeight = `${maxHeight}px`;

    const beforeRect = win.getBoundingClientRect();
    if (beforeRect.width > maxWidth) win.style.width = `${maxWidth}px`;
    if (beforeRect.height > maxHeight) win.style.height = `${maxHeight}px`;
  }

  const rect = win.getBoundingClientRect();
  let left = Number.parseFloat(win.style.left);
  let top = Number.parseFloat(win.style.top);

  if (!Number.isFinite(left)) left = rect.left;
  if (!Number.isFinite(top)) top = rect.top;

  if (options.centerOnMobile && isMobile) {
    left = (window.innerWidth - rect.width) / 2;
    top = (window.innerHeight - taskbarHeight - rect.height) / 2;
  }

  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - taskbarHeight - rect.height - margin);

  left = clampValue(left, margin, maxLeft);
  top = clampValue(top, margin, maxTop);

  win.style.left = `${left}px`;
  win.style.top = `${top}px`;
}

function fitAllWindowsToViewport() {
  document.querySelectorAll('.window').forEach(win => fitWindowToViewport(win));
}

function installWindowViewportSync() {
  if (!desktop || typeof MutationObserver === 'undefined') return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!node || node.nodeType !== 1) return;

        const newWindows = [];
        if (node.classList && node.classList.contains('window')) {
          newWindows.push(node);
        }
        if (typeof node.querySelectorAll === 'function') {
          newWindows.push(...node.querySelectorAll('.window'));
        }

        newWindows.forEach((win) => {
          requestAnimationFrame(() => fitWindowToViewport(win, { centerOnMobile: true }));
        });
      });
    });
  });

  observer.observe(desktop, { childList: true });
  window.addEventListener('resize', fitAllWindowsToViewport);
  window.addEventListener('orientationchange', fitAllWindowsToViewport);
}

installWindowViewportSync();



startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (startMenu.style.display === 'block') {
    closeStartMenu();
  } else {
    openStartMenu();
  }
});

function openStartMenu() {
  startMenu.style.display = 'block';
  startMenu.classList.add('open');
  document.body.classList.add('start-open');
}

function closeStartMenu() {
  if (startMenu.style.display !== 'none') {
    startMenu.style.display = 'none';
    startMenu.classList.remove('open');
    document.body.classList.remove('start-open');
  }
}



folders.forEach(name => {
  if (name === 'File Manager') {
    const app = document.createElement("div");
    app.className = "app";
    app.onclick = (e) => {
      e.stopPropagation();
      closeStartMenu();
      setTimeout(() => openWindow(name), 10);
    };

    const icon = document.createElement("div");
    icon.className = "app-icon";
    icon.textContent = '📁';

    const label = document.createElement("span");
    label.textContent = name;

    app.appendChild(icon);
    app.appendChild(label);
    appsGrid.appendChild(app);
  } else {
    // Find the folder in fileManagerFolders to get its icon
    const folder = fileManagerFolders.find(f => f.name === name);
    if (folder) {
      const app = document.createElement("div");
      app.className = "app";
      app.onclick = (e) => {
        e.stopPropagation();
        closeStartMenu();
        setTimeout(() => openWindow(name), 10);
      };

      const icon = document.createElement("div");
      icon.className = "app-icon";
      icon.textContent = folder.icon;
      icon.style.color = folder.bgColor;

      const label = document.createElement("span");
      label.textContent = name;

      app.appendChild(icon);
      app.appendChild(label);
      appsGrid.appendChild(app);
    }
  }
});


//folders.forEach(name => {
//  const item = document.createElement('div');
//  item.className = 'start-item';
//  item.textContent = name;
//  item.onclick = () => openWindow(name);
//  startMenu.appendChild(item);
//});

// Create desktop icons
folders.forEach(name => {
  if (name === 'File Manager') {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon';
    icon.innerHTML = `
      <div class="icon">📁</div>
      <span>${name}</span>
    `;
    icon.onclick = () => openWindow(name);
    desktopIcons.appendChild(icon);
  } else {
    // Find the folder in fileManagerFolders to get its icon and color
    const folder = fileManagerFolders.find(f => f.name === name);
    if (folder) {
      const icon = document.createElement('div');
      icon.className = 'desktop-icon';
      icon.innerHTML = `
        <div class="icon" style="color: ${folder.bgColor}">${folder.icon}</div>
        <span>${name}</span>
      `;
      icon.onclick = () => openWindow(name);
      desktopIcons.appendChild(icon);
    }
  }
});


function setupWindowControls(win) {
  const closeBtn = win.querySelector('.close-btn');
  const minimizeBtn = win.querySelector('.minimize-btn');

  // CLOSE
  if (closeBtn) {
    closeBtn.onclick = () => {
      win.remove();
    };
  }

  // MINIMIZE
  if (minimizeBtn) {
    minimizeBtn.onclick = () => {
      win.classList.remove('show');
      win.classList.add('minimized');
      win.dataset.minimized = "true";
    };
  }
}




function makeWindowDraggable(win) {
  const header = win.querySelector('.window-header');

  if (!header) return;

  header.addEventListener('mousedown', (e) => {
    const rect = win.getBoundingClientRect();
    activeDragWindow = win;
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    activeDragPointerId = null;
    win.classList.add('dragging');
    bringToFront(win);
  });
}



function openWindow(title, fromFileManager = false) {
  try {
    closeStartMenu();

    console.log("NEW openWindow called with:", title, "fromFileManager:", fromFileManager);
    console.log("openWindow called with:", title);

    // ✅ FILE MANAGER SPECIAL CASE
    if (title.trim() === "File Manager") {
      openFileManager();
      return;
    }
   
    if (title === 'Our Playlist') {
      openPlaylist();
      return;
    }

    if (title === 'Specials') {
      openSpecialsWindow();
      return;
    }

    if (title === "Love Letters") {
      openLoveLettersWindow();
      return;
    }

    if (title === "My Heart") {
      console.log("Opening My Heart");
      openMyHeart();
      return;
    }

    if (title === "Date Ideas") {
      openDateIdeas();
      return;
    }

    if (title === "Birthday Wishes") {
      openBirthdayWishes();
      return;
    }

    if (title === "Love Quotes") {
      openLoveQuotes();
      return;
    }

    if (title === "Notes For You") {
      openNotesForYou();
      return;
    }

    



    const win = document.createElement('div');
    win.className = 'window';
    win.dataset.title = title;

    win.style.top = '120px';
    win.style.left = '120px';
    win.style.position = 'absolute';
    win.dataset.minimized = "false";
    
    // If opened from file manager, ensure it appears above
    if (fromFileManager) {
      bringToFront(win);
    }


    const header = document.createElement('div');
    header.className = 'window-header';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;

    const minimizeBtn = document.createElement('span');
    minimizeBtn.textContent = '➖';
    minimizeBtn.className = 'minimize-btn';
    
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '✕';
    closeBtn.className = 'close-btn';

    closeBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation(); // 🔥 stop window mousedown
    });

    closeBtn.addEventListener('click', () => {
      win.classList.add('closing');
      setTimeout(() => {
        win.remove();
        [...taskApps.children].forEach(t => {
          if (t.textContent === title) t.remove();
        });
      }, 180);
    });


    minimizeBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation(); // 🔥 stop window mousedown
    });

    minimizeBtn.addEventListener('click', () => {
      win.classList.add('minimized');
      win.classList.remove('show');
      win.dataset.minimized = "true";
    });



    header.appendChild(titleSpan);
    header.appendChild(minimizeBtn);
    header.appendChild(closeBtn);

    // drag start
    header.addEventListener('mousedown', (e) => {
      activeDragWindow = win;
      dragOffsetX = e.clientX - win.offsetLeft;
      dragOffsetY = e.clientY - win.offsetTop;
    });

    const body = document.createElement('div');
    body.className = 'window-body';
    body.textContent = `Demo content for "${title}"`;

    win.appendChild(header);
    win.appendChild(body);
    desktop.appendChild(win);
    requestAnimationFrame(() => {
      win.classList.add('show');
    });

    function openBirthdayWishes() {
      const win = document.createElement('div');
      win.className = 'window birthday-wishes-window';
      win.dataset.title = 'Birthday Wishes';
      win.dataset.minimized = 'false';

      win.style.position = 'fixed';
      win.style.width = '75vw';
      win.style.height = '75vh';
      win.style.left = '12.5vw';
      win.style.top = '12.5vh';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      bringToFront(win);

      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>Birthday Wishes</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      const body = document.createElement('div');
      body.className = 'birthday-wishes-body';
      body.innerHTML = `
        <div class="birthday-wishes-sidebar">
          <button class="birthday-wishes-msg-btn active" data-msg="0">Message 1</button>
          <button class="birthday-wishes-msg-btn" data-msg="1">Message 2</button>
        </div>

        <div class="birthday-wishes-card">
          <div class="birthday-wishes-text"></div>
        </div>
      `;

      win.append(header, body);
      desktop.appendChild(win);
      requestAnimationFrame(() => win.classList.add('show'));

      setupWindowControls(win);
      makeWindowDraggable(win);

      const wishes = [
        `
          <p>Happiest Birthday my love❤️</p>
          <p>I don’t think you realize how quietly and immensely important you’ve become to my life. Loving you isn't like a rushed or overwhelming feeling.. it feels natural, like something that fits exactly where it’s supposed to be inside my heart.</p>
          <p>You have this way of understanding without demanding explanations, of caring without making it loud and announcing to the world... Being with you feels peaceful, and that peace means more to me than anything dramatic ever could.</p>
          <p>On your birthday, I just want you to know how deeply valued you are.. not just for what you do, but for who you are to me, to everyone. Your presence, your warmth, your way of being… it all matters to me more than I can ever fully describe through words.</p>
          <p>I’m really grateful that I get to love you, and even more grateful that I get to walk beside you.. growing, learning, and choosing each other every day.</p>
          <p>I hope this year is more gentle with you, kind to your heart, and full of moments that remind you just how special you truly are.</p>
          <p>Happy Birthday, my love.</p>
          <p>Always yours.💕</p>
        `,
        `
          <p>Happy Birthday, my favorite person 💗</p>
          <p>Another year older, another year more wonderful, another year prettier. I hope this year brings you new experiences, gentle growth, and moments that make you smile for no reason but feel like forever.</p>
          <p>And whenever things feel heavy, I hope you remember this: You’re not alone. You’re loved. I'm always here for you. You matter, more deeply than you think.</p>
          <p>Happyy Birthday, my baby.</p>
          <p>Always yours💝</p>
        `
      ];

      const textEl = body.querySelector('.birthday-wishes-text');
      const msgBtns = body.querySelectorAll('.birthday-wishes-msg-btn');

      let activeMsg = 0;
      const renderWish = () => {
        if (textEl) textEl.innerHTML = wishes[activeMsg] || '';
      };

      msgBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.msg);
          if (!Number.isFinite(idx)) return;
          activeMsg = idx;
          msgBtns.forEach(b => b.classList.toggle('active', b === btn));
          renderWish();
        });
      });

      renderWish();

      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Birthday Wishes';
      win._taskItem = taskItem;
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          bringToFront(win);
          win.style.display = 'flex';
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      const closeBtn = win.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (win._taskItem && win._taskItem.parentNode) win._taskItem.remove();
        });
      }
    }

    function openNotesForYou() {
      const win = document.createElement('div');
      win.className = 'window notes-window';
      win.dataset.title = 'Notes For You';
      win.dataset.minimized = 'false';

      win.style.position = 'fixed';
      win.style.width = '700px';
      win.style.height = '520px';
      const centerX = (window.innerWidth - 700) / 2;
      const centerY = (window.innerHeight - 520) / 2;
      win.style.left = Math.max(0, centerX) + 'px';
      win.style.top = Math.max(0, centerY) + 'px';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      bringToFront(win);

      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>Notes For You</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      const body = document.createElement('div');
      body.className = 'notes-body';
      body.innerHTML = `
        <div class="notes-tabs">
          <button class="notes-tab active" data-tab="forYou">Notes for you</button>
          <button class="notes-tab" data-tab="forMe">Notes for me</button>
        </div>

        <div class="notes-toolbar">
          <button class="notes-edit-btn">Edit</button>
        </div>

        <div class="notes-content" role="region" aria-label="Notes content"></div>
      `;

      const footer = document.createElement('div');
      footer.className = 'notes-footer';
      footer.textContent = 'Little notes, big feelings';

      win.append(header, body, footer);
      desktop.appendChild(win);
      requestAnimationFrame(() => win.classList.add('show'));

      setupWindowControls(win);
      makeWindowDraggable(win);

      const tabButtons = body.querySelectorAll('.notes-tab');
      const editBtn = body.querySelector('.notes-edit-btn');
      const contentEl = body.querySelector('.notes-content');

      let activeTab = 'forYou';
      let isEditing = false;

      const render = () => {
        if (!contentEl) return;
        contentEl.innerHTML = getNotesHtmlFromStorage(activeTab);
        contentEl.setAttribute('contenteditable', isEditing ? 'true' : 'false');
        contentEl.classList.toggle('editing', isEditing);
        if (editBtn) editBtn.textContent = isEditing ? 'Save' : 'Edit';
      };

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (isEditing) return;
          const tab = btn.dataset.tab;
          if (!tab || tab === activeTab) return;
          activeTab = tab;
          tabButtons.forEach(b => b.classList.toggle('active', b === btn));
          render();
        });
      });

      if (editBtn) {
        editBtn.addEventListener('click', () => {
          if (!contentEl) return;
          if (!isEditing) {
            isEditing = true;
            render();
            contentEl.focus();
          } else {
            isEditing = false;
            setNotesHtmlToStorage(activeTab, contentEl.innerHTML);
            render();
          }
        });
      }

      

      render();

      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Notes For You';
      win._taskItem = taskItem;
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          bringToFront(win);
          win.style.display = 'flex';
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      const closeBtn = win.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (win._taskItem && win._taskItem.parentNode) win._taskItem.remove();
        });
      }
    }

    function openLoveQuotes() {
      const win = document.createElement('div');
      win.className = 'window love-quotes-window';
      win.dataset.title = 'Love Quotes';
      win.dataset.minimized = 'false';

      win.style.position = 'fixed';
      win.style.width = '660px';
      win.style.height = '520px';
      const centerX = (window.innerWidth - 660) / 2;
      const centerY = (window.innerHeight - 520) / 2;
      win.style.left = Math.max(0, centerX) + 'px';
      win.style.top = Math.max(0, centerY) + 'px';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      bringToFront(win);

      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>Love Quotes</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      const body = document.createElement('div');
      body.className = 'love-quotes-body';
      body.innerHTML = `
        <div class="love-quotes-title">Love Quotes</div>
        <div class="love-quotes-subtitle">Words that capture the essence of our love</div>

        <div class="love-quotes-board" role="region" aria-label="Selected love quote">
          <div class="love-quotes-board-text"></div>
        </div>

        <div class="love-quotes-controls">
          <button class="love-quotes-btn prev">Previous</button>
          <button class="love-quotes-btn next">Next</button>
          <button class="love-quotes-btn love-quotes-add">Add Quote</button>
          <button class="love-quotes-btn love-quotes-edit">Edit</button>
        </div>

        <div class="love-quotes-list" role="list"></div>
      `;

      win.append(header, body);
      desktop.appendChild(win);
      requestAnimationFrame(() => win.classList.add('show'));

      setupWindowControls(win);
      makeWindowDraggable(win);

      const boardText = body.querySelector('.love-quotes-board-text');
      const listEl = body.querySelector('.love-quotes-list');
      const prevBtn = body.querySelector('.love-quotes-btn.prev');
      const nextBtn = body.querySelector('.love-quotes-btn.next');
      const addBtn = body.querySelector('.love-quotes-add');
      const editBtn = body.querySelector('.love-quotes-edit');

      let quotes = [];
      let activeIndex = 0;
      let isEditing = false;

      const setEditing = (next) => {
        isEditing = next;
        if (boardText) {
          boardText.setAttribute('contenteditable', isEditing ? 'true' : 'false');
          boardText.classList.toggle('editing', isEditing);
          if (isEditing) boardText.focus();
        }
        if (editBtn) editBtn.textContent = isEditing ? 'Save' : 'Edit';
      };

      const render = () => {
        if (!quotes.length) {
          quotes = ["You are my favorite place to be."];
          window.LoveQuotes.set(quotes);
        }
        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= quotes.length) activeIndex = quotes.length - 1;

        if (boardText) boardText.textContent = quotes[activeIndex] || '';

        if (!isEditing && boardText) {
          boardText.setAttribute('contenteditable', 'false');
          boardText.classList.remove('editing');
        }

        if (editBtn && !isEditing) editBtn.textContent = 'Edit';

        if (listEl) {
          listEl.innerHTML = '';
          quotes.forEach((q, idx) => {
            const item = document.createElement('div');
            item.className = 'love-quotes-item' + (idx === activeIndex ? ' active' : '');
            item.textContent = q;
            item.onclick = () => {
              if (isEditing) return;
              activeIndex = idx;
              render();
            };
            listEl.appendChild(item);
          });
        }
      };

      if (prevBtn) {
        prevBtn.onclick = () => {
          if (!quotes.length) return;
          if (isEditing) return;
          activeIndex = (activeIndex - 1 + quotes.length) % quotes.length;
          render();
        };
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          if (!quotes.length) return;
          if (isEditing) return;
          activeIndex = (activeIndex + 1) % quotes.length;
          render();
        };
      }

      if (addBtn) {
        addBtn.onclick = () => {
          if (isEditing) return;
          activeIndex = window.LoveQuotes.add('New quote...');
          quotes = window.LoveQuotes.get();
          render();
          setEditing(true);
        };
      }

      if (editBtn) {
        editBtn.onclick = () => {
          if (!boardText) return;

          if (!isEditing) {
            setEditing(true);
            return;
          }

          const updated = (boardText.textContent || '').trim();
          if (!updated.length) {
            setEditing(false);
            render();
            return;
          }

          quotes[activeIndex] = updated;
          window.LoveQuotes.update(activeIndex, updated);
          quotes = window.LoveQuotes.get();
          setEditing(false);
          render();
        };
      }

      quotes = window.LoveQuotes.get();

      render();

      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Love Quotes';
      win._taskItem = taskItem;
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          bringToFront(win);
          win.style.display = 'flex';
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      const closeBtn = win.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (win._taskItem && win._taskItem.parentNode) win._taskItem.remove();
        });
      }
    }

    function openSpecialsWindow() {
      const win = document.createElement('div');
      win.className = 'window specials-window';
      win.dataset.title = 'Specials';

      // size and position
      win.style.width = '480px';
      win.style.height = '360px';
      win.style.position = 'fixed';
      const centerX = (window.innerWidth - 480) / 2;
      const centerY = (window.innerHeight - 360) / 2;
      win.style.left = Math.max(0, centerX) + 'px';
      win.style.top = Math.max(0, centerY) + 'px';
      win.dataset.minimized = 'false';
      bringToFront(win);

      // make inner layout flex column so footer stays at bottom
      win.style.display = 'flex';
      win.style.flexDirection = 'column';

      // header
      const header = document.createElement('div');
      header.className = 'window-header specials-header';
      header.innerHTML = `
        <span class="specials-title">Specials</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-actions')) return;
        activeDragWindow = win;
        const rect = win.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        win.style.zIndex = ++zIndexCounter;
        e.preventDefault();
      });

      const minimizeBtn = header.querySelector('.minimize-btn');
      const closeBtn = header.querySelector('.close-btn');

      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (taskItem && taskItem.parentNode) taskItem.remove();
        win.remove();
      });

      // body with 3 folders
      const body = document.createElement('div');
      body.className = 'window-body specials-body';
      body.innerHTML = `
        <div class="specials-grid">
          <div class="special-folder" data-special-folder="My Babyy">
            <div class="folder-icon">📁</div>
            <span class="folder-name">My Babyy</span>
          </div>
          <div class="special-folder" data-special-folder="Me">
            <div class="folder-icon">📁</div>
            <span class="folder-name">Me</span>
          </div>
          <div class="special-folder" data-special-folder="My Heart">
            <div class="folder-icon">📁</div>
            <span class="folder-name">My Heart</span>
          </div>
        </div>
      `;

      // footer
      const footer = document.createElement('div');
      footer.className = 'specials-footer';
      footer.textContent = 'Made for you with my heart';

      win.append(header, body, footer);
      desktop.appendChild(win);

      requestAnimationFrame(() => {
        win.classList.add('show');
      });

      // click handlers for inner folders
      const babyyFolder = body.querySelector('[data-special-folder="My Babyy"]');
      const meFolder = body.querySelector('[data-special-folder="Me"]');
      const heartFolder = body.querySelector('[data-special-folder="My Heart"]');

      if (babyyFolder) {
        babyyFolder.addEventListener('click', (e) => {
          e.stopPropagation();
          openVideoFolderWindow('My Babyy');
        });
      }

      if (meFolder) {
        meFolder.addEventListener('click', (e) => {
          e.stopPropagation();
          openVideoFolderWindow('Me');
        });
      }

      if (heartFolder) {
        heartFolder.addEventListener('click', (e) => {
          e.stopPropagation();
          openMyHeart();
        });
      }

      // taskbar item
      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Specials';
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      win.addEventListener('mousedown', () => {
        if (win.dataset.minimized === 'true') return;
        bringToFront(win);
      });
    }

    function openVideoFolderWindow(title) {
      const win = document.createElement('div');
      win.className = 'window video-folder-window';
      win.dataset.title = title;

      // size/position
      win.style.position = 'fixed';
      win.style.width = '75vw';
      win.style.height = '75vh';
      win.style.left = '12.5vw';
      win.style.top = '12.5vh';
      win.dataset.minimized = 'false';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      win.style.zIndex = ++zIndexCounter;
      win.dataset.minimized = 'false';
      bringToFront(win);

      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>${title}</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-actions')) return;
        activeDragWindow = win;
        const rect = win.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        win.style.zIndex = ++zIndexCounter;
        e.preventDefault();
      });

      const minimizeBtn = header.querySelector('.minimize-btn');
      const closeBtn = header.querySelector('.close-btn');

      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (taskItem && taskItem.parentNode) taskItem.remove();
        win.remove();
      });

      const body = document.createElement('div');
      body.className = 'window-body';

      // render videos for this folder
      const videos = title === 'My Babyy' ? myBabyyVideos : (title === 'Me' ? meVideos : []);
      if (!videos || videos.length === 0) {
        body.innerHTML = `<div style="padding:8px;color:#7b3fa0;">No videos found. Place files in <code>assets/${title}</code> and reload.</div>`;
      } else {
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        grid.style.gap = '12px';

        videos.forEach((src) => {
          const card = document.createElement('div');
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          card.style.gap = '6px';

          const video = document.createElement('video');
          video.src = src;
          video.controls = true;
          video.style.width = '100%';
          video.style.borderRadius = '8px';
          video.style.background = '#000';

          const caption = document.createElement('div');
          caption.style.fontSize = '12px';
          caption.style.color = '#7b3fa0';
          caption.style.wordBreak = 'break-all';
          caption.textContent = (src || '').split('/').pop();

          card.append(video, caption);
          grid.appendChild(card);
        });

        body.innerHTML = '';
        body.appendChild(grid);
      }

      win.append(header, body);
      desktop.appendChild(win);

      requestAnimationFrame(() => {
        win.classList.add('show');
      });

      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = title;
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      win.addEventListener('mousedown', () => {
        if (win.dataset.minimized === 'true') return;
        bringToFront(win);
      });
    }

    //My Heart

    function openMyHeart() {
      console.log("openMyHeart() started");
      const win = document.createElement("div");
      win.classList.add('my-heart-window');
      win.style.position = "fixed";
      win.style.left = "0";
      win.style.top = "0";
      win.style.width = "100vw";
      win.style.height = "100vh";
      win.style.transform = "none";
      bringToFront(win);



      const header = document.createElement("div");
      header.className = "window-header heart-header";
      header.innerHTML = `
        <span>My Heart ❤️</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      const closeBtn = header.querySelector('.close-btn');
      const minimizeBtn = header.querySelector('.minimize-btn');

      closeBtn.addEventListener('click', () => {
        win.remove();
      });


      minimizeBtn.addEventListener('click', () => {
        win.classList.add('minimized');
        win.style.display = 'none';
      });



      win.addEventListener('mousedown', () => {
        win.style.zIndex = ++zIndexCounter;
      });


      const content = document.createElement("div");
      content.className = "window-content heart-content";

      content.style.height = "calc(100vh - 48px)";
      content.style.padding = "0";
      content.style.overflow = "hidden";
      
      // Embed your project
      const iframe = document.createElement("iframe");
      iframe.src = "her-birthday-main/her-birthday-main/index.html";
      iframe.className = "my-heart-iframe";
      iframe.setAttribute("frameborder", "0");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";

      content.appendChild(iframe);

      win.append(header, content);
      desktop.appendChild(win);
      requestAnimationFrame(() => {
        win.classList.add("show");
      });

      win.addEventListener('mousedown', () => {
        if (win.dataset.minimized === 'true') return;
        bringToFront(win);
      });

      setupWindowControls(win);
    }






    function openLoveLettersWindow() {
      const win = document.createElement('div');
      win.className = 'window love-letters-window';
      win.dataset.title = 'Love Letters';

      // size & position
      // size & position (approximately 3/4 of the screen)
      win.style.position = 'fixed';
      win.style.width = '75vw';
      win.style.height = '75vh';
      win.style.left = '12.5vw';
      win.style.top = '12.5vh';
      win.dataset.minimized = 'false';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      win.style.zIndex = ++zIndexCounter;

      // header
      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>Love Letters</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-actions')) return;
        activeDragWindow = win;
        const rect = win.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        win.style.zIndex = ++zIndexCounter;
        e.preventDefault();
      });

      const minimizeBtn = header.querySelector('.minimize-btn');
      const closeBtn = header.querySelector('.close-btn');

      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
         win.dataset.minimized = 'true';
        }
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (taskItem && taskItem.parentNode) taskItem.remove();
        win.remove();
      });

      // body: letters list + content area
      const body = document.createElement('div');
      body.className = 'window-body';
      body.style.display = 'flex';
      body.style.flex = '1 1 auto';
      body.style.minHeight = '0';
      body.style.gap = '12px';

      const sidebar = document.createElement('div');
      sidebar.className = 'll-sidebar';
      sidebar.style.width = '40%';
      sidebar.style.borderRight = '1px solid rgba(0,0,0,0.05)';
      sidebar.style.paddingRight = '8px';
      sidebar.style.display = 'flex';
      sidebar.style.flexDirection = 'column';
      sidebar.style.gap = '6px';

      const contentArea = document.createElement('div');
      contentArea.className = 'll-content-area';
      contentArea.style.flex = '1';
      contentArea.style.minHeight = '0';
      contentArea.style.paddingLeft = '4px';
      contentArea.style.overflowY = 'auto';        // scrollable for long letters
      contentArea.style.WebkitOverflowScrolling = 'touch';
      //contentArea.style.whiteSpace = 'pre-wrap';
      contentArea.style.fontSize = '15px';         // larger font for easier reading
      contentArea.style.lineHeight = '1.7';        // nicer line spacing
      contentArea.style.color = '#5a365c';

      const letters = [
        {
          title: 'Letter 1 - Just For You',
          body: `
            <p>My little babyy,</p>
            <p>Y'know i don’t actually remember the exact moment I fell for you becuz i fell deeper with every moment.. and i think that’s my favourite part..</p>
            <p>It wasn’t all dramatic. It wasn’t sudden like a bolt. It wasn’t fireworks. It was quiet... the kind of silence that feels safe to heart.. somewhere between talking to you late at night, laughing over the smallest things, worrying about the things i never though I'd worry about and realizing how naturally you fit into my life, you became important to me.</p>
            <p>Loving you feels like the calm winds. It feels steady and peaceful. It feels like something I don’t need to prove or explain.. it just is and is mine. You make ordinary days feel lighter and hard days worth seeing through... and somehow, just knowing you’re there, waiting for me, loving me, makes everything feel less heavy.</p>
            <p>I love youu my baby, not in a loud way, not in a way that asks for perfection... but in a way that stays, understands, chooses you every day and pushes through every obstacle together.</p>
            <p>Happy birthday, my love. I’m really grateful I get to walk through life with you. 🤍</p>
            <p>Always yours.</p>
          `
        },
        {
          title: 'Letter 2 - What Loving You Feels Like',
          body: `
            <p>My loving baby,</p>
            <p>Loving you feels like breathing easier and my relaxer. It feels like being understood by another soul without always having to explain my heart out. It feels like comfort... the kind that doesn’t demand anything in return.. the kind that just exists.</p>
            <p>I love the way you care, the way you think, the way you always keep trying show affection in your own quiet and subtle ways. I love how you make space for me in your life... for my thoughts, my moods, my silences and for my love.</p>
            <p>You don’t try to change me. You don’t rush me. You just accept me the way i am.. and make me want to be a better man, honestly that means more to me than I can ever explain with mere words.</p>
            <p>On your birthday, I just want you to know this.. You are deeply loved, genuinely appreciated, and endlessly cherished and always remembered by me.. and I’m really proud and happy to call you mine and just mine.</p>
            <p>Happy birthday, my love. Here’s to many more years of loving you, growing with you, and just being there for you, always.</p>
            <p>Forever yours.💖</p>
          `
        },
        {
          title: 'Letter 3 - A Promise Without Pressure',
          body: `
            <p>My cutie babyy,</p>
            <p>I don’t want to make big promises that sound too grand and heavy.. Instead, I want to promise you simple things.. the kind that matters.</p>
            <p>I promise you honesty, even when it’s uncomfortable to bear. I promise effort, even on days when it’s hard. I promise patience, understanding, respect and loyalty.. always. I promise to choose you over everyone else, not because I have to, but because I want to, each and every single day..</p>
            <p>Happy birthday, my love Janya💝.</p>
            <p>I hope this year gives you peace, growth, and a million reasons to smile. And I hope I get to be part of many of those moments. 🤍</p>
          `
        }
      ];

      letters.forEach((letter, index) => {
        const item = document.createElement('div');
        item.textContent = letter.title;
        item.style.fontSize = '13px';
        item.style.padding = '6px 8px';
        item.style.borderRadius = '6px';
        item.style.cursor = 'pointer';
        item.style.color = '#7b3fa0';

        item.addEventListener('click', () => {
          contentArea.innerHTML = letter.body;
          [...sidebar.children].forEach(c => c.style.background = 'transparent');
          item.style.background = 'rgba(255, 200, 230, 0.35)';
        });

        if (index === 0) {
          // auto-select first
          contentArea.innerHTML = letter.body;
          item.style.background = 'rgba(255, 200, 230, 0.35)';
        }

        sidebar.appendChild(item);
      });

      body.append(sidebar, contentArea);
    
      // footer
      const footer = document.createElement('div');
      footer.className = 'love-letters-footer';
      footer.textContent = 'Made with ❤️ for you';
    
      win.append(header, body, footer);
      desktop.appendChild(win);

      requestAnimationFrame(() => {
        win.classList.add('show');
      });

      // taskbar item for Love Letters
      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Love Letters';
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      win.addEventListener('mousedown', () => {
        if (win.dataset.minimized === 'true') return;
        win.style.zIndex = ++zIndexCounter;
      });
    }






    
    

    function openDateIdeas() {
      const win = document.createElement('div');
      win.className = 'window date-ideas-window';
      win.dataset.title = 'Date Ideas';

      // size & position
      win.style.width = '640px';
      win.style.height = '420px';
      win.style.position = 'fixed';
      const centerX = (window.innerWidth - 520) / 2;
      const centerY = (window.innerHeight - 380) / 2;
      win.style.left = Math.max(0, centerX) + 'px';
      win.style.top = Math.max(0, centerY) + 'px';
      win.dataset.minimized = 'false';
      win.style.display = 'flex';
      win.style.flexDirection = 'column';
      win.style.zIndex = ++zIndexCounter;

      // header with minimize and close
      const header = document.createElement('div');
      header.className = 'window-header';
      header.innerHTML = `
        <span>Date Ideas</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-actions')) return;
        activeDragWindow = win;
        const rect = win.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        win.style.zIndex = ++zIndexCounter;
        e.preventDefault();
      });

      const minimizeBtn = header.querySelector('.minimize-btn');
      const closeBtn = header.querySelector('.close-btn');

      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (taskItem && taskItem.parentNode) taskItem.remove();
        win.remove();
      });

      // body: header row + tiles + content area
      const body = document.createElement('div');
      body.className = 'window-body';
      body.style.display = 'flex';
      body.style.flexDirection = 'column';
      body.style.flex = '1 1 auto';
      body.style.gap = '10px';

      // top row: "Date Ideas" + heart button
      const topRow = document.createElement('div');
      topRow.style.display = 'flex';
      topRow.style.alignItems = 'center';
      topRow.style.justifyContent = 'center';
      topRow.style.gap = '10px';

      const titleLabel = document.createElement('span');
      titleLabel.className = 'date-ideas-title';
      titleLabel.innerHTML = 'Date Ideas <span>❤</span>';
      titleLabel.style.fontWeight = '700';
      titleLabel.style.fontSize = '20px';
      titleLabel.style.color = '#7b255b';

      topRow.append(titleLabel);

      // tiles list + content area
      const middle = document.createElement('div');
      middle.style.display = 'flex';
      middle.style.flex = '1 1 auto';
      middle.style.gap = '10px';

      const tiles = document.createElement('div');
      tiles.style.width = '40%';
      tiles.style.display = 'flex';
      tiles.style.flexDirection = 'column';
      tiles.style.gap = '6px';

      const detail = document.createElement('div');
      detail.style.flex = '1';
      detail.style.borderRadius = '14px';
      detail.style.background = 'linear-gradient(135deg, #fff0f6, #ffeaf5)';
      detail.style.padding = '14px 16px';
      detail.style.overflowY = 'auto';
      detail.style.whiteSpace = 'pre-wrap';
      detail.style.fontSize = '13px';
      detail.style.color = '#5a365c';

      dateIdeas.forEach((idea, index) => {
        const card = document.createElement('div');
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.gap = '6px';
        card.style.padding = '4px 6px';
        card.style.borderRadius = '8px';
        card.style.cursor = 'pointer';
        card.style.background = '#ffeaf8';

        const emojiSpan = document.createElement('div');
        emojiSpan.textContent = idea.emoji;
        emojiSpan.style.fontSize = '18px';

        const titleSpan = document.createElement('div');
        titleSpan.textContent = idea.title;
        titleSpan.style.fontSize = '12px';
        titleSpan.style.fontWeight = '600';
        titleSpan.style.color = '#7b255b';

      

        card.append(emojiSpan, titleSpan);

        card.addEventListener('click', () => {
          detail.textContent = idea.plan;
          [...tiles.children].forEach(c => c.style.background = '#ffeaf8');
          card.style.background = '#ffd6ef';
        });

        if (index === 0) {
          detail.textContent = idea.plan;
          card.style.background = '#ffd6ef';
        }

        detail.classList.remove('animate-fade-in', 'idea-detail-animated');
        void detail.offsetWidth; // force reflow
        detail.classList.add('animate-fade-in', 'idea-detail-animated');
        tiles.appendChild(card);
      });

      middle.append(tiles, detail);

      body.append(topRow, middle);

      // footer
      const footer = document.createElement('div');
      footer.style.padding = '6px 10px';
      footer.style.fontSize = '12px';
      footer.style.color = '#7b3fa0';
      footer.style.textAlign = 'right';
      footer.style.borderTop = '1px solid rgba(255,192,203,0.6)';
      footer.textContent = 'Little plans, big memories 💗';


      // Fade body in on mount
      body.classList.add('animate-fade-in');
      // Prepare detail area to animate on updates
      detail.classList.add('idea-detail-animated');






      win.append(header, body, footer);
      desktop.appendChild(win);

      requestAnimationFrame(() => {
        win.classList.add('show');
      });

      // taskbar item
      const taskItem = document.createElement('div');
      taskItem.className = 'task-app';
      taskItem.textContent = 'Date Ideas';
      taskItem.onclick = () => {
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = ++zIndexCounter;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };
      taskApps.appendChild(taskItem);

      win.addEventListener('mousedown', () => {
        if (win.dataset.minimized === 'true') return;
        win.style.zIndex = ++zIndexCounter;
      });
    }












    //File Manager

    function openFileManager() {

      console.log("openFileManager started");

      const win = document.createElement('div');
      win.className = 'window';
      win.dataset.title = 'File Manager';

  // center the window with larger dimensions
      // Set window size
      win.style.width = '800px';
      win.style.height = '600px';
      
      // Position in the center of the screen
      win.style.position = 'fixed';
      win.style.left = 'calc(50% - 400px)';
      win.style.top = 'calc(50% - 300px)';
      
      // Ensure the window is fully visible
      win.style.maxHeight = 'calc(100vh - 40px)';
      win.style.overflow = 'auto';
      
      // Styling
      win.style.borderRadius = '8px';
      win.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      win.style.zIndex = zIndexCounter++;

  // header
      const header = document.createElement('div');
      header.className = 'window-header fm-header';
      header.innerHTML = `
      <span class="fm-window-title">File Manager</span>
      <div class="window-actions">
        <span class="minimize-btn">➖</span>
        <span class="close-btn">✕</span>
      </div>
   `;
      
      const subHeader = document.createElement('div');
      subHeader.className = 'fm-subheader';

      subHeader.innerHTML = `
        <div class="fm-left">
          <div class="fm-big-icon">📁</div>
          <span class="fm-title">Our Files</span>
        </div>
      `;




      const minimizeBtn = header.querySelector('.minimize-btn');
      const closeBtn = header.querySelector('.close-btn');

      minimizeBtn.onclick = () => {
        win.classList.remove('show');
        win.dataset.minimized = "true";
      };

      closeBtn.onclick = () => win.remove();


  // drag start
      header.addEventListener('mousedown', (e) => {
        activeDragWindow = win;
        dragOffsetX = e.clientX - win.offsetLeft;
        dragOffsetY = e.clientY - win.offsetTop;
        bringToFront(win);
      });


  // body
      const body = document.createElement('div');
      body.className = 'window-body file-manager-body';

      const grid = document.createElement('div');
      grid.className = 'file-grid';

      fileManagerFolders.forEach(folder => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.title = folder.name;

        const iconBox = document.createElement('div');
        iconBox.className = 'file-icon-box';
        iconBox.style.backgroundColor = folder.bgColor;
        iconBox.textContent = folder.icon;
        
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = folder.name;
        
        item.appendChild(iconBox);
        item.appendChild(fileName);
        item.onclick = (e) => {
          e.stopPropagation();
          openWindow(folder.name, true);
        };
        grid.appendChild(item);
      });

      body.appendChild(grid);

      const footer = document.createElement('div');
      footer.className = 'fm-footer';

      footer.innerHTML = `
        <div class="status-bar">
          <span class="status-item">${fileManagerFolders.length} items</span>
          <span class="status-separator">|</span>
          <span class="status-item">Made with ❤️ for you</span>
        </div>
      `;


      win.appendChild(header);
      win.appendChild(body);
      win.append(header, subHeader, body, footer);
      desktop.appendChild(win);
      console.log("File Manager appended to desktop");
      win.style.zIndex = ++zIndexCounter;

      requestAnimationFrame(() => {
        win.classList.add('show');
      });
      
      

  // close button
      header.querySelector('.close-btn').onclick = () => win.remove();
    } 
 


    //Playlist
    function openPlaylist() {
      const win = document.createElement('div');
      win.className = 'window playlist-window';
      win.dataset.title = 'Our Playlist';

  // Set window size and position
      win.style.width = '360px';
      win.style.height = '540px';
      win.style.position = 'fixed';
      
      // Center the window
      const centerX = (window.innerWidth - 360) / 2;
      const centerY = (window.innerHeight - 540) / 2;
      
      win.style.left = Math.max(0, centerX) + 'px';
      win.style.top = Math.max(0, centerY) + 'px';

  /* ========= HEADER (same pattern as File Manager) ========= */
      const header = document.createElement('div');
      header.className = 'window-header playlist-header';
      header.innerHTML = `
        <span class="playlist-window-title">Our Playlist</span>
        <div class="window-actions">
          <span class="minimize-btn">➖</span>
          <span class="close-btn">✕</span>
        </div>
      `;

      header.addEventListener('mousedown', (e) => {
        // Only start drag on the header, not on buttons
        if (e.target === header || e.target.classList.contains('playlist-window-title')) {
          activeDragWindow = win;
          win.classList.add('dragging');
          const rect = win.getBoundingClientRect();
          dragOffsetX = e.clientX - rect.left;
          dragOffsetY = e.clientY - rect.top;
          // Bring to front when dragging
          win.style.zIndex = zIndexCounter++;
          e.stopPropagation();
          e.preventDefault(); // Prevent text selection
        }
      });


  /* ========= CONTENT ========= */
      const content = document.createElement('div');
      content.className = 'playlist-content';

      content.innerHTML = `
        <div class="playlist-main">
          <div class="playlist-top">
            <div class="album-art-wrap">
              <img class="album-art" src="${playlistSongs[0].cover}">
              <div class="cover-heart">❤</div>
            </div>

            <div class="song-info">
              <h3>${playlistSongs[0].title}</h3>
              <p>${playlistSongs[0].artist}</p>
            </div>
            <div class="like-btn">❤</div>
          </div>

          <div class="progress">
            <span class="current-time">0:00</span>
            <input class="progress-bar" type="range" value="0" min="0" max="0">
            <span class="total-time">0:00</span>
          </div>

          <div class="controls">
            <button class="prev-btn">⏮</button>
            <button class="play-btn">▶</button>
            <button class="next-btn">⏭</button>
          </div>

          <div class="playlist-list playlist-drawer">
            <h4 class="playlist-title">
              🎵 Songs That Remind Me of Us
              <span class="playlist-count">${playlistSongs.length} songs</span>
            </h4>

            <div class="tracks"></div>
          </div>
        </div>

        <button class="playlist-toggle">⬆ Show Playlist</button>


      `;
      
      

      const tracksContainer = content.querySelector('.tracks');

      playlistSongs.forEach((song, index) => {
        const track = document.createElement('div');
        track.className = 'track' + (index === currentSongIndex ? ' active' : '');

        track.innerHTML = `
          <div class="track-left">
            <img src="${song.cover}" />
            <span>${song.title}</span>
          </div>
          <span class="track-time">${song.duration}</span>
        `;

        track.onclick = () => {
          loadSong(index);
          audio.play();
        };

        tracksContainer.appendChild(track);
      });



      





  /* ========= ASSEMBLE ========= */
      win.append(header, content);
      desktop.appendChild(win);
      bringToFront(win);
      
      requestAnimationFrame(() => {
        win.classList.add('show');
      });





      const playBtn = content.querySelector(".play-btn");
      const prevBtn = content.querySelector(".prev-btn");
      const nextBtn = content.querySelector(".next-btn");
      const toggleBtn = content.querySelector(".playlist-toggle");
      const listBox = content.querySelector(".playlist-list");
      const progressBar = content.querySelector('.progress-bar');
      const currentTimeEl = content.querySelector('.current-time');
      const totalTimeEl = content.querySelector('.total-time');
      const likeBtn = content.querySelector('.like-btn');

      const formatTime = (seconds) => {
        if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
      };


      function updatePlayButton() {
        playBtn.textContent = audio.paused ? "▶" : "⏸";
      }



      playBtn.onclick = () => {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
        updatePlayButton();
      };


      


      prevBtn.onclick = () => {
        loadSong((currentSongIndex - 1 + playlistSongs.length) % playlistSongs.length);
      };

      nextBtn.onclick = () => {
        loadSong((currentSongIndex + 1) % playlistSongs.length);
      };

      toggleBtn.onclick = () => {
        listBox.classList.toggle('open');
        const open = listBox.classList.contains('open');
        toggleBtn.textContent = open ? '⬇ Hide Playlist' : '⬆ Show Playlist';
      };
      toggleBtn.dataset.bound = '1';

      // Keep progress bar in sync with audio
      audio.onloadedmetadata = () => {
        if (progressBar) {
          progressBar.max = Math.floor(audio.duration || 0);
          progressBar.value = Math.floor(audio.currentTime || 0);
        }
        if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration || 0);
      };

      audio.ontimeupdate = () => {
        if (!progressBar) return;
        if (!progressBar.matches(':active')) {
          progressBar.value = Math.floor(audio.currentTime || 0);
        }
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime || 0);
      };

      if (progressBar) {
        progressBar.addEventListener('input', () => {
          if (currentTimeEl) currentTimeEl.textContent = formatTime(Number(progressBar.value));
        });

        progressBar.addEventListener('change', () => {
          audio.currentTime = Number(progressBar.value) || 0;
        });
      }

      if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = likeBtn.getBoundingClientRect();

          for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-pop';
            heart.textContent = '❤';

            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            const angle = (Math.PI * 2 * i) / 10;
            const radius = 24 + Math.random() * 18;
            const hx = Math.cos(angle) * radius;
            const hy = Math.sin(angle) * radius - (30 + Math.random() * 35);

            heart.style.setProperty('--hx', `${hx}px`);
            heart.style.setProperty('--hy', `${hy}px`);

            document.body.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
          }

          likeBtn.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
            { duration: 260, easing: 'ease-out' }
          );
        });
      }
      
      setupPlaylistWindowControls(win);
      setupPlaylistToggle(win);
      loadSong(0);
      audio.play();
      updatePlayButton();



      audio.addEventListener("play", updatePlayButton);
      audio.addEventListener("pause", updatePlayButton);

    }
    


    

    
    function loadSong(index) {
      currentSongIndex = index;
      const song = playlistSongs[index];

      audio.src = song.src;
      audio.play();

      const win = document.querySelector(".playlist-window");
      win.querySelector(".album-art").src = song.cover;
      win.querySelector(".song-info h3").textContent = song.title;
      win.querySelector(".song-info p").textContent = song.artist;
      const totalTimeEl = win.querySelector('.total-time');
      const currentTimeEl = win.querySelector('.current-time');
      const progressBar = win.querySelector('.progress-bar');

      if (currentTimeEl) currentTimeEl.textContent = '0:00';
      if (progressBar) {
        progressBar.value = 0;
        progressBar.max = 0;
      }
      if (totalTimeEl) totalTimeEl.textContent = song.duration;

      document.querySelectorAll(".track").forEach((t, i) => {
        t.classList.toggle("active", i === index);
      });
    }

    // close nd minimize
    function setupPlaylistWindowControls(win) {
      const closeBtn = win.querySelector('.close-btn');
      const minimizeBtn = win.querySelector('.minimize-btn');
      const header = win.querySelector('.window-header');

      closeBtn.onclick = (e) => {
        e.stopPropagation();
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (err) {
          // ignore
        }

        if (win._taskItem && win._taskItem.parentNode) {
          win._taskItem.remove();
        }
        win.remove();
      };

      minimizeBtn.onclick = (e) => {
        e.stopPropagation();
        if (win.dataset.minimized === 'true') {
          win.classList.remove('minimized');
          win.classList.add('show');
          win.dataset.minimized = 'false';
          win.style.zIndex = zIndexCounter++;
        } else {
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = 'true';
        }
      };

      // Clicking anywhere on the header brings window to front
      header.addEventListener('click', (e) => {
        if (e.target === header || e.target.classList.contains('playlist-window-title')) {
          bringToFront(win);
        }
      });
    }


    // playlist toggle logic
    function setupPlaylistToggle(win) {
      try {
        const toggleBtn = win.querySelector(".playlist-toggle");
        const list = win.querySelector(".playlist-list");

        if (toggleBtn && list) {
          if (!toggleBtn.dataset.bound) {
            toggleBtn.onclick = () => {
              const open = list.classList.toggle('open');
              toggleBtn.textContent = open ? "⬇ Hide Playlist" : "⬆ Show Playlist";
            };
            toggleBtn.dataset.bound = '1';
          }
        }

        // taskbar tab
        const taskItem = document.createElement('div');
        taskItem.className = 'task-app';
        taskItem.textContent = 'Our Playlist';
        win._taskItem = taskItem;

        taskItem.onclick = () => {
          try {
            if (win.dataset.minimized === "true") {
              // RESTORE
              win.classList.remove('minimized');
              win.dataset.minimized = "false";
              win.style.display = 'block';
              requestAnimationFrame(() => {
                win.classList.add('show');
              });
              bringToFront(win);
            } else {
              // MINIMIZE
              win.classList.add('minimized');
              win.classList.remove('show');
              win.dataset.minimized = "true";
            }
          } catch (err) {
            console.error('Error in task item click handler:', err);
          }
        };

        // Add task item to taskbar
        if (taskApps) {
          taskApps.appendChild(taskItem);
        }

        // Handle window focus on mousedown
        const handleMousedown = (e) => {
          try {
            if (win.dataset.minimized === "true") {
              win.classList.remove('minimized');
              win.dataset.minimized = "false";
              requestAnimationFrame(() => {
                win.classList.add('show');
              });
            }
            bringToFront(win);
          } catch (err) {
            console.error('Error in mousedown handler:', err);
          }
        };

        win.addEventListener('mousedown', handleMousedown);

        // Cleanup function
        return () => {
          win.removeEventListener('mousedown', handleMousedown);
        };
      } catch (err) {
        console.error('Error in setupPlaylistToggle:', err);
      }
    }


    // taskbar tab
    const taskItem = document.createElement('div');
    taskItem.className = 'task-app';
    taskItem.textContent = title;

    // Handle task item click to toggle window state
    taskItem.onclick = () => {
      try {
        if (win.dataset.minimized === "true") {
          // RESTORE
          win.classList.remove('minimized');
          win.dataset.minimized = "false";
          win.style.zIndex = ++zIndexCounter;

          requestAnimationFrame(() => {
            win.classList.add('show');
          });
        } else {
          // MINIMIZE
          win.classList.add('minimized');
          win.classList.remove('show');
          win.dataset.minimized = "true";
        }
      } catch (err) {
        console.error("Error toggling window state:", err);
      }
    };

    // Add task item to taskbar
    taskApps.appendChild(taskItem);

    // Handle window focus on mousedown
    win.addEventListener('mousedown', () => {
      try {
        if (win.dataset.minimized === "true") {
          win.classList.remove('minimized');
          win.dataset.minimized = "false";
          requestAnimationFrame(() => {
            win.classList.add('show');
          });
        }
        bringToFront(win);
      } catch (err) {
        console.error("Error focusing window:", err);
      }
    });

    // focus on click
    win.addEventListener('mousedown', () => {
      try {
        if (win.dataset.minimized === "true") {
          win.classList.remove('minimized');
          win.dataset.minimized = "false";
          requestAnimationFrame(() => {
            win.classList.add('show');
          });
        }
        bringToFront(win);
      } catch (err) {
        console.error('Error in mousedown handler:', err);
      }
    });
  } catch (err) {
    console.error('Error in setupPlaylistToggle:', err);
  }
}

// Drag logic




  // Update time function 
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  taskTime.textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);


taskbar.onclick = (e) => {
  e.stopPropagation();
};


// Close start menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('#startMenu') && !e.target.closest('#startBtn')) {
    closeStartMenu();
  }
});

// Prevent taskbar clicks from closing the menu
taskbar.addEventListener('click', (e) => {
  e.stopPropagation();
});

function focusWindow(win) {
  // remove active state from all windows
  document.querySelectorAll('.window').forEach(w => {
    w.classList.remove('active');
  });

  // remove active state from all taskbar tabs
  document.querySelectorAll('.task-app').forEach(t => {
    t.classList.remove('active');
  });

  // activate this window
  win.classList.add('active');
  win.style.zIndex = ++zIndexCounter;

  // activate its taskbar tab
  const title = win.querySelector('.window-header span').textContent;
  [...taskApps.children].forEach(tab => {
    if (tab.textContent === title) {
      tab.classList.add('active');
    }
  });
}

// Drag logic for mouse + touch via Pointer Events
document.addEventListener('pointerdown', (e) => {
  const header = e.target.closest('.window-header');
  if (!header) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  if (e.target.closest('.window-actions, .close-btn, .minimize-btn, button, input, textarea, select, iframe')) return;

  const win = header.closest('.window');
  if (!win || win.dataset.minimized === 'true' || win.classList.contains('my-heart-window')) return;

  const rect = win.getBoundingClientRect();
  activeDragWindow = win;
  activeDragPointerId = e.pointerId;
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  win.classList.add('dragging');
  bringToFront(win);

  if (typeof header.setPointerCapture === 'function') {
    try {
      header.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore if capture is unsupported for this pointer
    }
  }

  e.preventDefault();
}, { passive: false });

document.addEventListener('pointermove', (e) => {
  if (!activeDragWindow) return;
  if (activeDragPointerId !== null && e.pointerId !== activeDragPointerId) return;

  let x = e.clientX - dragOffsetX;
  let y = e.clientY - dragOffsetY;

  const rect = activeDragWindow.getBoundingClientRect();
  const margin = isMobileViewport() ? 8 : 0;
  const taskbarHeight = taskbar ? taskbar.offsetHeight : 56;

  const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxY = Math.max(margin, window.innerHeight - taskbarHeight - rect.height - margin);

  x = clampValue(x, margin, maxX);
  y = clampValue(y, margin, maxY);

  activeDragWindow.style.left = `${x}px`;
  activeDragWindow.style.top = `${y}px`;

  e.preventDefault();
}, { passive: false });

function stopActiveDrag() {
  if (activeDragWindow) {
    activeDragWindow.classList.remove('dragging');
  }
  activeDragWindow = null;
  activeDragPointerId = null;
}

document.addEventListener('pointerup', stopActiveDrag);
document.addEventListener('pointercancel', stopActiveDrag);

