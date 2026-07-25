import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, Terminal, ExternalLink, Star, GitFork,
  Download, ChevronRight, X, Cpu, Lock, Radio, ArrowUpRight, Instagram, Binary, User, Car, Award
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";

/* =========================================================================
   CONFIG 
   ========================================================================= */
const CONFIG = {
  name: "Calvin John Asogaran Pillay",
  handle: "calvin.pillay",
  title: "Computer Science Student",
  subtitle: "Systems · AI Agents · Network Security",
  tagline:
    "I build offline AI assistants, packet sniffers, and data structure libraries — mostly at 2am, mostly with too much sandwiches.",
  githubUsername: "ScholarSphinx",
  email: "calvinpillay99@gmail.com",
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  social: {
    github: "https://github.com/ScholarSphinx",
    linkedin: "https://www.linkedin.com/in/calvin-pillay-654002256",
    instagram: "https://www.instagram.com/pilcal22",
  },
  location: "Durban, South Africa",
  dob: "2004-08-19", // 19/08/2004 — used to render DOB + a live, self-updating age
  avatarUrl: `${import.meta.env.BASE_URL}images/avatar.jpg`,
  playgroundUrl: "", // TODO: once you deploy the 3D driving portfolio (calvin-portfolio-3d.zip), paste its live URL here
  about: {
    heading: "Hey, I'm Calvin",
    role: "Computer Science student · Builder of systems · Lifelong problem-solver",
    paragraphs: [
      "I'm a Computer Science student who genuinely loves the process of figuring things out — whether that's tracing a bug down to a single misplaced byte, designing a cleaner data structure, or working out why a network packet didn't arrive the way it should have. I'm not satisfied with something working; I want to understand why it works.",
      "That curiosity shows up across everything I build: a multi-agent offline AI assistant, low-level network security tooling, and data structure libraries written from the ground up in C++ and Java. I care about writing code that's efficient, well-reasoned, and built to be understood — not just to run.",
      "Outside of code, music is a constant. There's a similar kind of problem-solving in it — structure, timing, and the patience to get small details right — and it's shaped how I approach everything else: methodically, and with an ear for when something's off.",
      "I'm looking to bring that same rigor, curiosity, and attention to detail to a team that builds things people actually rely on.",
    ],
  },
  experience: [
    {
      role: "Front Desk Assistant",
      org: "DNS Music",
      period: "January 2021",
      points: [
        "Managed inventory and stock records with accuracy.",
        "Supported administrative operations and maintenance coordination",
      ],
    },
    {
      role: "Prefect",
      org: "Glenwood High School",
      period: "2022",
      points: [
        "Selected as a school prefect, taking on a leadership and mentorship role within the student body.",
        "Modelled discipline and responsibility while supporting staff with the running of school events and day-to-day duties.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's Pass",
      institution: "Glenwood High School",
      period: "2018 - 2022",
      details: "Distinction and Merit in Information Technology.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/education/glenwood-matric-certificate.jpg` },
      ],
    },
    {
      degree: "BSc Computer Science and Information Technology",
      institution: "University of Kwa-Zulu Natal",
      period: "2023 — 2026",
      details: "Computer Systems, Advanced Programming with Data Structures, Theory of Computation",
    },
  ],
  // Academic honours & competition results — displayed under Education, with
  // certification-style badges. Images live in their own folder, separate
  // from /images/certs/. Ordered chronologically (oldest first).
  academicHonours: [
    {
      title: "Top Speaker — Helen Joseph Oratory Challenge",
      issuer: "Helen Joseph Oratory Challenge",
      date: "11 March 2020",
      description: "Awarded top speaker at the Helen Joseph Oratory Challenge.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/helen-joseph-top-speaker.jpeg` },
      ],
    },
    {
      title: "Youth Day Derby — Silver",
      issuer: "SA Debating",
      date: "2020",
      description: "Silver medal, average score of 73.75 speaker points.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/youth-day-derby-silver.jpeg` },
      ],
    },
    {
      title: "Provisional Round (National Round) — Public Speaking, 90 A++",
      issuer: "Interschools Public Speaking League SA",
      date: "2020",
      description: "Scored 90 A++ in both the Unprepared and Prepared Public Speaking categories.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/provisional-unprepared.jpeg`, label: "Unprepared" },
        { src: `${import.meta.env.BASE_URL}images/academic-honours/provisional-prepared.jpeg`, label: "Prepared" },
      ],
    },
    {
      title: "Landsfinaal (National Round) — Unprepared Public Speaking, 1st Place",
      issuer: "Interschools Public Speaking League SA",
      date: "2020",
      description: "First place in the national final round of Unprepared Public Speaking.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/landsfinaal-1st-place.jpeg` },
      ],
    },
    {
      title: "Information Technology National Olympiad",
      issuer: "S.A. Computer Olympiad",
      date: "2020",
      description: "Completion of Round 1 and Round 2.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/it-national-olympiad.jpeg` },
      ],
    },
    {
      title: "Computer Talent Search",
      issuer: "Standard Bank",
      date: "2021",
      description: "Gold ranking (Top 7% in SA).",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/computer-talent-search.jpg` },
      ],
    },
    {
      title: "Best Speaker Award",
      issuer: "QueensBurgh Girls High School (QGHS) MUN",
      date: "23 September 2021",
      description: "Best speaker award at the QGHS Model United Nations conference.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/qghs-mun-best-speaker-1.jpeg`, label: "Award 1" },
        { src: `${import.meta.env.BASE_URL}images/academic-honours/qghs-mun-best-speaker-2.jpeg`, label: "Award 2" },
      ],
    },
    {
      title: "Durban Coastal Debating League Champion (Senior Division)",
      issuer: "DCDL",
      date: "2022",
      description: "Champion of the Senior Division.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/dcdl-champion.jpeg` },
      ],
    },
    {
      title: "SA Mathematics Team Competition — Top 100",
      issuer: "AMESA / ASSA",
      date: "2022",
      description: "Ranked in the national Top 100.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/amesa-top100.jpeg` },
      ],
    },
    {
      title: "Best Delegation",
      issuer: "UKZN Model United Nations (UKZNDC)",
      date: "2024",
      description: "Awarded Best Delegation at UKZN MUN.",
      images: [
        { src: `${import.meta.env.BASE_URL}images/academic-honours/ukzn-mun-best-delegation.jpeg` },
      ],
    },
  ],
  certifications: [
    {
      name: "Youth Leadership Course",
      issuer: "Toastmasters International",
      date: "2021",
      description: "Completed Toastmasters International's Youth Leadership Course.",
      image: `${import.meta.env.BASE_URL}images/certs/toastmasters-youth-leadership.jpg`,
    },
    {
      name: "Certificate of Service Honours (131 Hours)",
      issuer: "Durban Youth Council (DYC)",
      date: "2021",
      description: "Recognised for 131 hours of community service with the Durban Youth Council as the Deputy Director of Education.",
      image: `${import.meta.env.BASE_URL}images/certs/durban-youth-council-service.jpeg`,
    },
    {
      name: "Generative AI Mastermind",
      issuer: "OutSkill",
      date: "2025",
      description: "Usage on AI for workflows, automation and everyday usage through efficient prompting.",
      image: `${import.meta.env.BASE_URL}images/certs/cert-3.jpg`,
    },
  ],
  techStack: [
    { name: "Python", color: "#3776ab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", color: "#f1e05a", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", color: "#61dafb", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "C++", color: "#f34b7d", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C#", color: "#68217a", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "Java", color: "#b07219", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Assembly", color: "#6e6e6e", icon: "binary" },
    { name: "HTML", color: "#e34c26", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", color: "#563d7c", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Git", color: "#f05032", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", color: "#2496ed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Linux", color: "#f5c211", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  ],
  skills: [
    { subject: "Systems / C++", value: 88 },
    { subject: "Python / AI", value: 92 },
    { subject: "Networking", value: 80 },
    { subject: "Java / OOP", value: 90 },
    { subject: "Security", value: 75 },
    { subject: "Frontend", value: 70 },
  ],
  featuredRepos: [
    "Checkers",
    "Comp315-Project",
    "Data-Structure-Implementations-Library",
    "Gravity-Simulation",
    "ISTN-Group-Project",
    "ISTN3SI-Project",
  ],
};

const BOOT_LINES = [
  "> initializing portfolio_os v3.3.0 ...",
  "> loading identity module ... OK",
  `> access level: OMEGA — welcome, ${CONFIG.name.split(" ")[0]}`,
  "> mounting /projects /skills /resume ...",
  "> establishing uplink to github.com ...",
  "> ready.",
];

const LANG_COLORS = {
  Python: "#3776ab", JavaScript: "#f1e05a", TypeScript: "#3178c6",
  "C++": "#f34b7d", C: "#555555", Java: "#b07219", HTML: "#e34c26",
  CSS: "#563d7c", Shell: "#89e051", Rust: "#dea584", Go: "#00ADD8",
  "C#": "#178600", default: "#a855f7",
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Only real mice/trackpads get the custom cursor — touch devices have no
// cursor to replace, and narrow-but-desktop windows should still get it, so
// this checks pointer capability rather than viewport width.
function useHasFinePointer() {
  const [fine, setFine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const fn = (e) => setFine(e.matches);
    setFine(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return fine;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

// Narrow/phone-sized viewports stack sections taller (more wrapped text,
// more vertical scroll distance for the same amount of "page"), so the same
// pixel-based scroll multipliers used for the desktop parallax layers drag
// those background elements much further off-screen on a phone. This hook
// lets background layers dial their own motion down on small screens only —
// desktop (isMobile === false) always keeps its original, unchanged motion.
const MOBILE_BREAKPOINT = 768;
const MOBILE_PARALLAX_DAMP = 0.35;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

// Scroll-linked background layers (grid, blur glows, floating shapes) live in
// a viewport-pinned, overflow-hidden container. Their translateY grows
// without bound as the page gets scrolled, so on a long page they eventually
// drift past the container's edge and get clipped away for good. Wrapping the
// travel into a fixed, symmetric range makes them loop forever instead —
// the "jump" at the wrap point happens well outside the visible box, so it's
// never actually seen.
function wrapTravel(offset, period) {
  if (!period) return 0;
  const wrapped = ((offset % period) + period) % period; // [0, period)
  return wrapped - period / 2; // (-period/2, period/2)
}

// Copies text to the clipboard, with a fallback for browsers/contexts where
// the async Clipboard API isn't available (e.g. non-HTTPS previews).
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/* =========================================================================
   Boot sequence overlay
   ========================================================================= */
function BootSequence({ onDone, skip }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    if (skip) { onDone(); return; }
    let i = 0;
    const timer = setInterval(() => {
      setLines((prev) => [...prev, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        setTimeout(onDone, 550);
      }
    }, 260);
    return () => clearInterval(timer);
  }, [skip, onDone]);

  if (skip) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: "#07070c",
        color: "#c084fc", fontFamily: "'JetBrains Mono', monospace",
        padding: "40px", fontSize: "14px", display: "flex",
        flexDirection: "column", justifyContent: "center",
        transition: "opacity 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
        {lines.map((l, idx) => (
          <div key={idx} style={{ marginBottom: 6, opacity: 0.9 }}>{l}</div>
        ))}
        <span style={{ animation: "blink 1s step-end infinite" }}>█</span>
      </div>
    </div>
  );
}

/* =========================================================================
   Command palette / terminal nav — the signature feature
   ========================================================================= */
function buildSkillsTable() {
  const maxLabel = Math.max(...CONFIG.skills.map((s) => s.subject.length));
  const rows = CONFIG.skills.map((s) => {
    const barLen = Math.round(s.value / 5); // scale to a 20-cell bar
    const bar = "█".repeat(barLen) + "░".repeat(20 - barLen);
    return `${s.subject.padEnd(maxLabel)}  ${bar}  ${s.value}%`;
  });
  const rule = "-".repeat(maxLabel + 30);
  return ["SKILLS", rule, ...rows].join("\n");
}

function buildResumeText() {
  const eduLines = CONFIG.education
    .map((e) => `  - ${e.degree}, ${e.institution} (${e.period})`)
    .join("\n");
  const honourLines = CONFIG.academicHonours
    .map((h) => `  - ${h.title} — ${h.issuer} (${h.date})`)
    .join("\n");
  const expLines = CONFIG.experience
    .map((e) => `  - ${e.role}, ${e.org} (${e.period})`)
    .join("\n");
  const certLines = CONFIG.certifications
    .map((c) => `  - ${c.name} — ${c.issuer} (${c.date})`)
    .join("\n");
  const skillLines = CONFIG.skills
    .map((s) => `  - ${s.subject}: ${s.value}%`)
    .join("\n");
  return [
    `${CONFIG.name}`,
    `${CONFIG.title} — ${CONFIG.subtitle}`,
    `${CONFIG.location} · ${CONFIG.email}`,
    "",
    "EDUCATION",
    eduLines,
    "",
    "ACADEMIC HONOURS",
    honourLines,
    "",
    "EXPERIENCE",
    expLines,
    "",
    "CERTIFICATIONS",
    certLines,
    "",
    "SKILLS",
    skillLines,
  ].join("\n");
}

/* =========================================================================
   Snake — retro mini-game launched from the terminal via the `snake` command
   ========================================================================= */
function SnakeGame({ onExit }) {
  const cell = 16;
  const cols = 18;
  const rows = 14;
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const randomFood = (occupied) => {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } while (occupied.some((seg) => seg.x === pos.x && seg.y === pos.y));
    return pos;
  };

  const resetGame = () => {
    const startX = Math.floor(cols / 2);
    const startY = Math.floor(rows / 2);
    const snake = [{ x: startX, y: startY }, { x: startX - 1, y: startY }, { x: startX - 2, y: startY }];
    stateRef.current = { snake, dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 }, food: randomFood(snake) };
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => { resetGame(); }, []);

  // Controls — arrow keys or WASD. Reversing directly into the snake's own
  // body is ignored rather than ending the game immediately.
  useEffect(() => {
    const dirMap = {
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
    };
    const onKey = (e) => {
      const s = stateRef.current;
      if (!s) return;
      const nd = dirMap[e.key];
      if (nd) {
        e.preventDefault();
        if (!(nd.x === -s.dir.x && nd.y === -s.dir.y)) s.nextDir = nd;
      } else if (e.key === "Enter" && gameOver) {
        resetGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameOver]);

  // Game loop — fixed-tick movement, redraws every frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = cols * cell;
    canvas.height = rows * cell;
    const ctx = canvas.getContext("2d");
    const tickMs = 110;
    let last = 0;
    let raf;

    const step = () => {
      const s = stateRef.current;
      if (!s || gameOver) return;
      s.dir = s.nextDir;
      const head = s.snake[0];
      const next = { x: head.x + s.dir.x, y: head.y + s.dir.y };
      if (next.x < 0 || next.x >= cols || next.y < 0 || next.y >= rows) { setGameOver(true); return; }
      if (s.snake.some((seg) => seg.x === next.x && seg.y === next.y)) { setGameOver(true); return; }
      s.snake.unshift(next);
      if (next.x === s.food.x && next.y === s.food.y) {
        setScore((sc) => {
          const nextScore = sc + 1;
          setBest((b) => Math.max(b, nextScore));
          return nextScore;
        });
        s.food = randomFood(s.snake);
      } else {
        s.snake.pop();
      }
    };

    const draw = () => {
      ctx.fillStyle = "#0b0b14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(168,85,247,0.07)";
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath(); ctx.moveTo(x * cell, 0); ctx.lineTo(x * cell, rows * cell); ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * cell); ctx.lineTo(cols * cell, y * cell); ctx.stroke();
      }
      const s = stateRef.current;
      if (!s) return;
      ctx.shadowColor = "#fbbf24"; ctx.shadowBlur = 8; ctx.fillStyle = "#fbbf24";
      ctx.fillRect(s.food.x * cell + 2, s.food.y * cell + 2, cell - 4, cell - 4);
      ctx.shadowBlur = 0;
      s.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#22d3ee" : "#a855f7";
        ctx.shadowColor = i === 0 ? "#22d3ee" : "transparent";
        ctx.shadowBlur = i === 0 ? 8 : 0;
        ctx.fillRect(seg.x * cell + 1, seg.y * cell + 1, cell - 2, cell - 2);
      });
      ctx.shadowBlur = 0;
      if (gameOver) {
        ctx.fillStyle = "rgba(4,4,8,0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#e4e4f0";
        ctx.textAlign = "center";
        ctx.font = "13px 'JetBrains Mono', monospace";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText("press enter to retry", canvas.width / 2, canvas.height / 2 + 10);
        ctx.textAlign = "left";
      }
    };

    const loop = (ts) => {
      if (!last) last = ts;
      if (ts - last > tickMs) { last = ts; step(); }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameOver]);

  return (
    <div style={{ padding: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", width: cols * cell,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#9c9cb0",
      }}>
        <span>score: {score}</span>
        <span>best: {best}</span>
        <button
          onClick={onExit}
          style={{
            background: "none", border: "none", color: "#5a5a6e", cursor: "pointer",
            fontFamily: "inherit", fontSize: 12, padding: 0,
          }}
        >
          esc to exit
        </button>
      </div>
      <canvas ref={canvasRef} style={{ borderRadius: 6, border: "1px solid rgba(168,85,247,0.3)" }} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a5a6e" }}>
        arrow keys / wasd to move
      </div>
    </div>
  );
}

function CommandTerminal({ open, setOpen, onNavigate, onDrive }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "type 'help' to list commands",
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [game, setGame] = useState(null); // null | "snake"
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  const closeTerminal = () => {
    setOpen(false);
    setGame(null);
  };

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // "matrix" command — brief rain-of-code overlay drawn on a canvas layered
  // over the terminal's history pane, auto-dismissing after ~2.2s.
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const fontSize = 14;
    const columns = Math.max(1, Math.floor(width / fontSize));
    const drops = Array(columns).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテト日Ω∑λ".split("");

    let frameId;
    const draw = () => {
      ctx.fillStyle = "rgba(11,11,20,0.15)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.94 ? "#e4e4f0" : "#22d3ee";
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
      frameId = requestAnimationFrame(draw);
    };
    draw();

    const stopTimer = setTimeout(() => setMatrixActive(false), 2200);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(stopTimer);
    };
  }, [matrixActive]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    let out = "";
    if (!cmd) return;
    if (cmd === "help") {
      out = "commands: goto [home|about|skills|experience|education|certifications|projects|resume|contact], whoami, resume, cat resume, skills, matrix, snake, drive, sudo hire calvin, clear, exit";
    } else if (cmd === "whoami") {
      out = `${CONFIG.name} — ${CONFIG.title} — access_level: OMEGA`;
    } else if (cmd.startsWith("goto ")) {
      const target = cmd.replace("goto ", "").trim();
      if (["home", "about", "skills", "experience", "education", "projects", "resume", "contact"].includes(target)) {
        onNavigate(target);
        out = `navigating to #${target} ...`;
      } else {
        out = `unknown destination: ${target}`;
      }
    } else if (cmd === "resume") {
      onNavigate("resume");
      out = "opening resume ...";
    } else if (cmd === "cat resume") {
      out = buildResumeText();
    } else if (cmd === "skills") {
      out = buildSkillsTable();
    } else if (cmd === "matrix") {
      out = "wake up, calvin...";
      setMatrixActive(true);
    } else if (cmd === "snake") {
      out = "launching snake — arrow keys / wasd to move, esc to exit";
      setGame("snake");
    } else if (cmd === "drive") {
      out = "starting engine ...";
      closeTerminal();
      onDrive();
    } else if (cmd === "sudo hire calvin") {
      out = "permission granted. initiating outreach protocol — check the contact section.";
    } else if (cmd === "ls") {
      out = "home  about  skills  experience  education  projects  resume  contact";
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      closeTerminal();
      return;
    } else {
      out = `command not found: ${cmd} — try 'help'`;
    }
    setHistory((h) => [...h, `$ ${raw}`, out]);
    setInput("");
  };

  useEffect(() => {
    const handler = (e) => {
      if (game) {
        if (e.key === "Escape") setGame(null);
        return;
      }
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen, game]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command terminal"
        style={{
          position: "fixed", bottom: 22, right: 22, zIndex: 60,
          width: 52, height: 52, borderRadius: 12,
          background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.5)",
          color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 0 20px rgba(168,85,247,0.25)",
        }}
      >
        <Terminal size={22} />
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 90,
            background: "rgba(4,4,8,0.75)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: "12vh",
          }}
          onClick={closeTerminal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(640px, 90vw)", background: "#0b0b14",
              border: "1px solid rgba(168,85,247,0.4)", borderRadius: 10,
              boxShadow: "0 0 40px rgba(168,85,247,0.2)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              overflow: "hidden",
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", borderBottom: "1px solid rgba(168,85,247,0.25)",
              color: "#7c7c8a",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Terminal size={14} /> calvin@portfolio:~
              </span>
              <X size={16} style={{ cursor: "pointer" }} onClick={closeTerminal} />
            </div>
            {game === "snake" ? (
              <SnakeGame onExit={() => setGame(null)} />
            ) : (
              <>
                <div style={{ position: "relative", minHeight: matrixActive ? 160 : undefined }}>
                  <div style={{ maxHeight: 260, overflowY: "auto", padding: "12px 14px" }}>
                    {history.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          color: h.startsWith("$") ? "#e4e4f0" : "#a855f7",
                          marginBottom: 4, whiteSpace: "pre-wrap", lineHeight: 1.6,
                        }}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                  {matrixActive && (
                    <canvas
                      ref={canvasRef}
                      aria-hidden="true"
                      style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}
                    />
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderTop: "1px solid rgba(168,85,247,0.25)" }}>
                  <span style={{ color: "#22d3ee", marginRight: 8 }}>$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && run(input)}
                    placeholder="type a command..."
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      color: "#e4e4f0", fontFamily: "inherit", fontSize: 13,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================================
   Parallax background layers
   ========================================================================= */
function ParallaxBackdrop({ scrollY, reducedMotion, isMobile }) {
  const factor = reducedMotion ? 0 : (isMobile ? MOBILE_PARALLAX_DAMP : 1);
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 800));
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const period = Math.max(vh, 400) * 2.4;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.12), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(34,211,238,0.10), transparent 50%), #07070c",
      }} />
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          // Shift the tiling's phase (wrapped every 48px) instead of moving the
          // element itself — the pattern repeats infinitely, so this drifts
          // forever without ever running out, no matter how long the page gets.
          backgroundPosition: `0 ${(scrollY * 0.08 * factor) % 48}px`,
        }}
      />
      <div
        style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          top: -120, left: "10%", background: "rgba(168,85,247,0.18)", filter: "blur(120px)",
          transform: `translateY(${wrapTravel(scrollY * 0.22 * factor, period)}px)`,
        }}
      />
      <div
        style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          top: "60%", right: "8%", background: "rgba(34,211,238,0.14)", filter: "blur(120px)",
          transform: `translateY(${wrapTravel(scrollY * -0.15 * factor, period)}px)`,
        }}
      />
    </div>
  );
}

/* =========================================================================
   Geometric parallax shapes — the "true parallax" layer. Each shape moves
   at its own speed and rotation relative to scroll, so depth is visible.
   ========================================================================= */
function GeometricParallax({ scrollY, reducedMotion, isMobile }) {
  const f = reducedMotion ? 0 : (isMobile ? MOBILE_PARALLAX_DAMP : 1);
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 800));
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const period = Math.max(vh, 400) * 2.4;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Hexagon outline — slow drift, top right, near depth */}
      <svg
        width="220" height="220" viewBox="0 0 100 100"
        style={{
          position: "absolute", top: "8%", right: "6%",
          transform: `translateY(${wrapTravel(scrollY * 0.35 * f, period)}px) rotate(${scrollY * 0.12 * f}deg)`,
          opacity: 0.5,
        }}
      >
        <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" fill="none" stroke="#a855f7" strokeWidth="0.8" />
      </svg>

      {/* Square outline — fastest layer, mid-left, rotates opposite direction */}
      <svg
        width="140" height="140" viewBox="0 0 100 100"
        style={{
          position: "absolute", top: "38%", left: "4%",
          transform: `translateY(${wrapTravel(scrollY * -0.55 * f, period)}px) rotate(${scrollY * -0.2 * f}deg)`,
          opacity: 0.4,
        }}
      >
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
      </svg>

      {/* Triangle outline — slowest, deep background, bottom right */}
      <svg
        width="260" height="260" viewBox="0 0 100 100"
        style={{
          position: "absolute", bottom: "4%", right: "12%",
          transform: `translateY(${wrapTravel(scrollY * 0.18 * f, period)}px) rotate(${scrollY * 0.06 * f}deg)`,
          opacity: 0.3,
        }}
      >
        <polygon points="50,6 94,90 6,90" fill="none" stroke="#c084fc" strokeWidth="0.7" />
      </svg>

      {/* Small filled diamond — fast, upper middle, gives a sense of near-field motion */}
      <svg
        width="60" height="60" viewBox="0 0 100 100"
        style={{
          position: "absolute", top: "22%", left: "48%",
          transform: `translateY(${wrapTravel(scrollY * 0.7 * f, period)}px) rotate(${45 + scrollY * 0.25 * f}deg)`,
          opacity: 0.35,
        }}
      >
        <rect x="20" y="20" width="60" height="60" fill="#a855f7" />
      </svg>

      {/* Circle ring — counter-rotating, lower left */}
      <svg
        width="180" height="180" viewBox="0 0 100 100"
        style={{
          position: "absolute", bottom: "20%", left: "16%",
          transform: `translateY(${wrapTravel(scrollY * -0.28 * f, period)}px) rotate(${scrollY * -0.1 * f}deg)`,
          opacity: 0.3,
        }}
      >
        <circle cx="50" cy="50" r="42" fill="none" stroke="#22d3ee" strokeWidth="0.6" strokeDasharray="4 3" />
      </svg>

      {/* Small hexagon — extra density lower on the loop, opposite drift */}
      <svg
        width="110" height="110" viewBox="0 0 100 100"
        style={{
          position: "absolute", bottom: "10%", left: "26%",
          transform: `translateY(${wrapTravel(scrollY * -0.42 * f, period)}px) rotate(${scrollY * -0.16 * f}deg)`,
          opacity: 0.35,
        }}
      >
        <polygon points="50,6 90,26 90,74 50,94 10,74 10,26" fill="none" stroke="#fbbf24" strokeWidth="0.7" />
      </svg>

      {/* Dashed ring — extra density upper left, slow opposite-phase drift */}
      <svg
        width="150" height="150" viewBox="0 0 100 100"
        style={{
          position: "absolute", top: "16%", left: "10%",
          transform: `translateY(${wrapTravel(scrollY * 0.48 * f, period)}px) rotate(${scrollY * 0.2 * f}deg)`,
          opacity: 0.28,
        }}
      >
        <circle cx="50" cy="50" r="38" fill="none" stroke="#c084fc" strokeWidth="0.6" strokeDasharray="2 5" />
      </svg>

      <NeonDolphin scrollY={scrollY} f={f} />
    </div>
  );
}

/* =========================================================================
   Neon blue dolphin — swims a full loop around the edge of the viewport as
   the page is scrolled: across the top, down the right side, back along
   the bottom, and up the left side. Reversing scroll direction turns the
   dolphin around mid-swim rather than just retracing pixels. The loop's
   lanes are computed from the live viewport size so the dolphin never
   crosses the centered JARVIS globe (it stays outside the globe's radius
   at all times) — it's a background layer, so it also always renders
   beneath actual page content regardless of where it wanders.
   ========================================================================= */
function NeonDolphin({ scrollY, f }) {
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track real scroll direction (not just position) so the dolphin only
  // turns around when the person actually reverses their scrolling.
  const [direction, setDirection] = useState(1); // 1 = scrolling down, -1 = scrolling up
  const prevScrollRef = useRef(scrollY);
  useEffect(() => {
    const delta = scrollY - prevScrollRef.current;
    if (delta > 0.6) setDirection(1);
    else if (delta < -0.6) setDirection(-1);
    prevScrollRef.current = scrollY;
  }, [scrollY]);

  // Perimeter lanes, kept clear of the JARVIS globe (size 760, radius 0.44
  // of that) and off the very edge of the screen.
  const globeR = 760 * 0.44;
  const cy = viewport.height / 2;
  const topY = Math.max(56, cy - globeR - 40);
  const bottomY = Math.min(viewport.height - 40, cy + globeR + 40);
  const leftX = Math.max(30, viewport.width * 0.05);
  const rightX = Math.min(viewport.width - 30, viewport.width * 0.95);

  const t = (((scrollY * 0.00065 * f) % 4) + 4) % 4;
  const seg = Math.min(3, Math.floor(t));
  const frac = t - seg;

  let x, y, baseAngle;
  if (seg === 0) { x = leftX + frac * (rightX - leftX); y = topY; baseAngle = 0; }
  else if (seg === 1) { x = rightX; y = topY + frac * (bottomY - topY); baseAngle = 90; }
  else if (seg === 2) { x = rightX - frac * (rightX - leftX); y = bottomY; baseAngle = 180; }
  else { x = leftX; y = bottomY - frac * (bottomY - topY); baseAngle = 270; }

  // Facing follows the direction actually being travelled, so scrolling
  // up visibly turns the dolphin around rather than sliding it backward.
  const travelAngle = direction === 1 ? baseAngle : (baseAngle + 180) % 360;
  let faceTransform = "";
  let bobAxis = "y";
  if (travelAngle === 180) faceTransform = "scaleX(-1)";
  else if (travelAngle === 90) { faceTransform = "rotate(90deg)"; bobAxis = "x"; }
  else if (travelAngle === 270) { faceTransform = "rotate(-90deg)"; bobAxis = "x"; }

  const bob = Math.sin(scrollY * 0.02 * f) * 10;
  const bobTransform = bobAxis === "y" ? `translateY(${bob}px)` : `translateX(${bob}px)`;

  return (
    <svg
      width="150"
      height="75"
      viewBox="0 0 200 100"
      style={{
        position: "absolute",
        top: y,
        left: x,
        transform: `translate(-50%, -50%) ${bobTransform} ${faceTransform}`,
        opacity: 0.9,
        filter: "drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 15px rgba(34,211,238,0.7))",
      }}
    >
      {/* Body: beak, melon, back, swept dorsal fin, tapered peduncle, and
          notched tail flukes — one closed, filled path so it reads as a
          solid body rather than a wireframe outline. */}
      <path
        d="M 198,47
           C 193,42 187,38 180,36
           C 176,35 172,34 169,33
           C 162,30 152,29 138,28
           C 133,17 124,6 113,3
           C 107,9 101,18 97,27
           C 80,33 60,41 42,49
           C 33,53 27,55 22,58
           C 15,52 7,47 2,44
           C 8,50 13,54 17,58
           C 11,63 4,69 1,76
           C 8,72 16,68 24,65
           C 39,70 58,75 76,78
           C 91,80 103,79 112,77
           C 127,74 141,69 154,63
           C 165,58 178,54 189,49
           C 193,48 196,47 198,47 Z"
        fill="#38bdf8"
        fillOpacity="0.25"
        stroke="#7dd3fc"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Pectoral fin, swept back beneath the head */}
      <path
        d="M 140,73
           C 133,80 122,86 106,93
           C 114,87 124,80 132,75
           C 135,74 138,73 140,73 Z"
        fill="#38bdf8"
        fillOpacity="0.25"
        stroke="#7dd3fc"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Eye — bright glowing dot, reads better than a dark pupil now that the body is translucent */}
      <circle cx="180" cy="39" r="2.2" fill="#7dd3fc" />
    </svg>
  );
}
/* =========================================================================
   JARVIS-style holographic globe — a dense wireframe sphere of latitude/
   meridian lines, scattered data-point nodes, and a warm core glow,
   centered in the viewport and rotating as the page is scrolled.
   ========================================================================= */
function seededRand(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function JarvisHologram({ scrollY, reducedMotion, isMobile }) {
  const f = reducedMotion ? 0 : (isMobile ? MOBILE_PARALLAX_DAMP : 1);
  const rotation = scrollY * 0.14 * f;
  const counterRotation = -scrollY * 0.09 * f;
  const size = 760;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.44;

  // Latitude rings — flattened ellipses at varying vertical offsets, like
  // horizontal cross-sections of a sphere.
  const latitudes = [-0.82, -0.6, -0.34, 0, 0.34, 0.6, 0.82].map((t) => {
    const dy = t * R;
    const rx = Math.sqrt(Math.max(R * R - dy * dy, 0));
    return { cy: cy + dy, rx, ry: rx * 0.32 };
  });

  // Meridian rings — tall narrow ellipses rotated around the vertical axis.
  const meridianAngles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];

  // Scattered "data point" nodes across the sphere face, deterministic so
  // they don't jump around on every scroll-triggered re-render.
  const nodes = Array.from({ length: 46 }, (_, i) => {
    const a = seededRand(i * 3.1) * Math.PI * 2;
    const r = Math.sqrt(seededRand(i * 7.7 + 1)) * R;
    const bright = seededRand(i * 11.3 + 2) > 0.82;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.5, bright };
  });

  // Short chaotic circuit-like line fragments layered across the globe face.
  const fragments = Array.from({ length: 34 }, (_, i) => {
    const a = seededRand(i * 5.3) * Math.PI * 2;
    const r = Math.sqrt(seededRand(i * 9.1 + 4)) * R;
    const x1 = cx + Math.cos(a) * r;
    const y1 = cy + Math.sin(a) * r * 0.5;
    const len = 14 + seededRand(i * 4.4 + 6) * 34;
    const dir = seededRand(i * 6.6 + 8) * Math.PI * 2;
    const x2 = x1 + Math.cos(dir) * len;
    const y2 = y1 + Math.sin(dir) * len * 0.5;
    return { x1, y1, x2, y2 };
  });

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", opacity: 0.22 }}>
        <defs>
          <radialGradient id="jarvis-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={R * 0.5} fill="url(#jarvis-glow)" />

        {/* primary rotating group: latitude rings + fragments + nodes */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fbbf24" strokeWidth="1.1" />
          {latitudes.map((l, i) => (
            <ellipse key={i} cx={cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.55" />
          ))}
          {fragments.map((line, i) => (
            <line
              key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="#fbbf24" strokeWidth="0.6" opacity={0.3 + seededRand(i) * 0.35}
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={i} cx={n.x} cy={n.y} r={n.bright ? 2 : 1}
              fill={n.bright ? "#fde68a" : "#fbbf24"} opacity={n.bright ? 0.9 : 0.5}
            />
          ))}
        </g>

        {/* meridian group — counter-rotates for cross-hatched depth */}
        <g style={{ transform: `rotate(${counterRotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          {meridianAngles.map((deg, i) => (
            <ellipse
              key={i} cx={cx} cy={cy} rx={R * 0.22} ry={R}
              fill="none" stroke="#fde68a" strokeWidth="0.4" opacity="0.3"
              transform={`rotate(${deg} ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r={R * 0.62} fill="none" stroke="#fde68a" strokeWidth="0.5" strokeDasharray="1 6" opacity="0.5" />
        </g>

        {/* innermost core — rotates fastest, tightest orbit */}
        <g style={{ transform: `rotate(${rotation * 2.2}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={R * 0.14} fill="none" stroke="#fbbf24" strokeWidth="0.9" />
          <circle cx={cx} cy={cy} r={R * 0.08} fill="none" stroke="#fde68a" strokeWidth="0.6" strokeDasharray="2 3" />
        </g>
      </svg>
    </div>
  );
}

/* =========================================================================
   Section shell
   ========================================================================= */
function Section({ id, label, children, style }) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, padding: "110px 24px", ...style }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        {label && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#a855f7",
            letterSpacing: 2, marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ width: 24, height: 1, background: "#a855f7" }} />
            {label}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* =========================================================================
   GitHub-powered projects section
   ========================================================================= */
function ProjectsSection() {
  const [repos, setRepos] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [uRes, ...repoResults] = await Promise.all([
          fetch(`https://api.github.com/users/${CONFIG.githubUsername}`),
          ...CONFIG.featuredRepos.map((name) =>
            fetch(`https://api.github.com/repos/${CONFIG.githubUsername}/${name}`)
          ),
        ]);
        if (!uRes.ok) throw new Error("fetch failed");
        const u = await uRes.json();

        // Pull all 6 pinned repos, in the exact order they're pinned on GitHub.
        const pinned = (
          await Promise.all(
            repoResults.map((res) => (res.ok ? res.json() : null))
          )
        ).filter(Boolean);
        if (pinned.length === 0) throw new Error("fetch failed");

        if (!cancelled) {
          setProfile(u);
          setRepos(pinned);
        }
      } catch (e) {
        if (!cancelled) setError(true);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <Section id="projects" label="06 / repositories">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,40px)", color: "#e4e4f0", margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
          Live from GitHub
        </h2>
        {profile && (
          <div style={{ display: "flex", gap: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#8b8ba0" }}>
            <span><Star size={13} style={{ display: "inline", marginRight: 4, verticalAlign: -2 }} />{repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0} stars</span>
            <span>{profile.public_repos} repos</span>
            <span>{profile.followers} followers</span>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", color: "#f87171", fontSize: 13,
          padding: 16, border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8,
          background: "rgba(248,113,113,0.06)",
        }}>
          &gt; uplink failed. GitHub API unreachable or rate-limited — update CONFIG.githubUsername and refresh.
        </div>
      )}

      {!error && !repos && (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a855f7", fontSize: 13 }}>
          &gt; fetching repositories<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
        </div>
      )}

      {repos && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", padding: "22px", borderRadius: 12, textDecoration: "none",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(168,85,247,0.18)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "#e4e4f0", fontWeight: 600 }}>
                  {repo.name}
                </span>
                <ExternalLink size={14} color="#8b8ba0" />
              </div>
              <p style={{ color: "#9c9cb0", fontSize: 13, lineHeight: 1.6, margin: "10px 0 18px", minHeight: 40 }}>
                {repo.description || "No description provided."}
              </p>
              <div style={{ display: "flex", gap: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0", alignItems: "center" }}>
                {repo.language && (
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: LANG_COLORS[repo.language] || LANG_COLORS.default,
                    }} />
                    {repo.language}
                  </span>
                )}
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} />{repo.stargazers_count}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><GitFork size={12} />{repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <a
          href={CONFIG.social.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#22d3ee",
            textDecoration: "none", border: "1px solid rgba(34,211,238,0.3)",
            padding: "10px 20px", borderRadius: 8,
          }}
        >
          view full repository list <ArrowUpRight size={14} />
        </a>
      </div>
    </Section>
  );
}

/* =========================================================================
   Skills radar
   ========================================================================= */
function SkillsSection() {
  return (
    <Section id="skills" label="01 / capabilities">
      <h2 style={{ fontSize: "clamp(28px,4vw,40px)", color: "#e4e4f0", margin: "0 0 40px", fontFamily: "'Space Grotesk', sans-serif" }}>
        Stack radar
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }}>
        <div style={{ height: 340, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={CONFIG.skills} outerRadius="75%">
              <PolarGrid stroke="rgba(168,85,247,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#9c9cb0", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#9c9cb0", lineHeight: 2 }}>
          <p style={{ color: "#e4e4f0", marginBottom: 16 }}>&gt; current focus areas:</p>
          {CONFIG.skills.map((s) => (
            <div key={s.subject} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span>{s.subject}</span>
              <span style={{ color: "#22d3ee" }}>{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* =========================================================================
   Email link — opens the default mail client (mailto:) as before, and also
   copies the address to the clipboard, with a brief "copied" confirmation.
   ========================================================================= */
function EmailLink({ children, style, ...rest }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    copyText(CONFIG.email)
      .then(() => {
        setCopied(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <a
      href={`mailto:${CONFIG.email}`}
      onClick={handleClick}
      style={{ position: "relative", ...style }}
      {...rest}
    >
      {children}
      {copied && (
        <span
          role="status"
          style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
            transform: "translateX(-50%)", background: "#0b0b14",
            border: "1px solid rgba(34,211,238,0.5)", color: "#22d3ee",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            padding: "4px 9px", borderRadius: 6, whiteSpace: "nowrap",
            pointerEvents: "none", boxShadow: "0 0 12px rgba(34,211,238,0.3)",
          }}
        >
          copied to clipboard
        </span>
      )}
    </a>
  );
}

/* =========================================================================
   Connect row (social icons) + tech stack row — icon chips with real links
   ========================================================================= */
function ConnectAndStack() {
  const socials = [
    { icon: Github, href: CONFIG.social.github, label: "GitHub" },
    { icon: Linkedin, href: CONFIG.social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: CONFIG.social.instagram, label: "Instagram" },
    { icon: Mail, href: `mailto:${CONFIG.email}`, label: "Email" },
  ];
  return (
    <div style={{ marginTop: 44 }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0",
        letterSpacing: 1.5, marginBottom: 14,
      }}>
        connect with me
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 34, flexWrap: "wrap" }}>
        {socials.map(({ icon: Icon, href, label }) => {
          const chipStyle = {
            width: 44, height: 44, borderRadius: 10, display: "flex",
            alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(168,85,247,0.3)", color: "#e4e4f0",
            textDecoration: "none",
          };
          if (label === "Email") {
            return (
              <EmailLink key={label} aria-label={label} title={label} style={chipStyle}>
                <Icon size={18} />
              </EmailLink>
            );
          }
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              style={chipStyle}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0",
        letterSpacing: 1.5, marginBottom: 14,
      }}>
        languages I speak in code
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {CONFIG.techStack.map(({ name, color, logo, icon }) => (
          <span
            key={name}
            style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "8px 14px", borderRadius: 8,
              background: `${color}1A`, border: `1px solid ${color}55`,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#e4e4f0",
            }}
          >
            {logo ? (
              <img src={logo} alt="" aria-hidden="true" width={16} height={16} style={{ display: "block" }} />
            ) : icon === "binary" ? (
              <Binary size={16} color={color} />
            ) : (
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            )}
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   DOB / age helpers — age is derived from CONFIG.dob against "now", so it
   always reflects the current date with no manual updates required.
   ========================================================================= */
function formatDob(dobString) {
  const d = new Date(dobString);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

/* =========================================================================
   About section — terminal-card style, deliberately placed mid-page
   ========================================================================= */
function AboutSection() {
  return (
    <Section id="about" label="02 / about me">
      <div style={{
        border: "1px solid rgba(168,85,247,0.28)", borderRadius: 16, padding: "clamp(28px,4vw,48px)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(140px, 200px) 1fr",
          gap: "clamp(24px,4vw,44px)", alignItems: "start",
        }}>
          {/* Photo slot */}
          <div>
            <div style={{
              width: "100%", aspectRatio: "1 / 1", borderRadius: "50%", overflow: "hidden",
              border: CONFIG.avatarUrl ? "1px solid rgba(168,85,247,0.4)" : "1px dashed rgba(168,85,247,0.45)",
              background: "rgba(168,85,247,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {CONFIG.avatarUrl ? (
                <img src={CONFIG.avatarUrl} alt={CONFIG.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <User size={40} color="#7c7c8a" />
              )}
            </div>
            {!CONFIG.avatarUrl && (
              <p style={{
                textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#6a6a7e", marginTop: 10, lineHeight: 1.5,
              }}>
                set CONFIG.avatarUrl
              </p>
            )}
          </div>

          {/* Bio copy */}
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(20px,3vw,26px)",
              color: "#22d3ee", fontWeight: 600, margin: "0 0 6px",
            }}>
              👋 {CONFIG.about.heading}
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#a855f7",
              fontStyle: "italic", margin: "0 0 26px",
            }}>
              {CONFIG.about.role}
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: "#8b8ba0",
              margin: "0 0 22px", display: "flex", gap: 14, flexWrap: "wrap",
            }}>
              <span>🎂 DOB: <span style={{ color: "#22d3ee" }}>{formatDob(CONFIG.dob)}</span></span>
              <span>· Age: <span style={{ color: "#22d3ee" }}>{calculateAge(CONFIG.dob)}</span></span>
            </p>
            {CONFIG.about.paragraphs.map((p, i) => (
              <p key={i} style={{ color: "#c2c2d4", fontSize: 15, lineHeight: 1.85, margin: "0 0 18px" }}>
                {p}
              </p>
            ))}

            <ConnectAndStack />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================================
   Timeline entry — shared row style for Experience and Education
   ========================================================================= */
function TimelineEntry({ title, org, period, images, children, isLast }) {
  return (
    <div style={{ display: "flex", gap: 22, paddingBottom: isLast ? 0 : 30 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#a855f7", flexShrink: 0 }} />
        {!isLast && <span style={{ flex: 1, width: 1, background: "rgba(168,85,247,0.25)", marginTop: 4 }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 6 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "#e4e4f0", fontWeight: 600 }}>
            {title}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0" }}>
              {period}
            </span>
            {images && images.length > 0 && <BadgeGroup images={images} title={title} />}
          </div>
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#a855f7", margin: "0 0 10px" }}>
          {org}
        </p>
        {children}
      </div>
    </div>
  );
}

/* =========================================================================
   Experience section
   ========================================================================= */
function ExperienceSection() {
  return (
    <Section id="experience" label="03 / experience">
      <h2 style={{ fontSize: "clamp(28px,4vw,40px)", color: "#e4e4f0", margin: "0 0 40px", fontFamily: "'Space Grotesk', sans-serif" }}>
        Where I've worked
      </h2>
      <div>
        {CONFIG.experience.map((job, i) => (
          <TimelineEntry
            key={i} title={job.role} org={job.org} period={job.period}
            isLast={i === CONFIG.experience.length - 1}
          >
            <ul style={{ margin: 0, paddingLeft: 18, color: "#c2c2d4", fontSize: 14, lineHeight: 1.8 }}>
              {job.points.map((pt, j) => <li key={j}>{pt}</li>)}
            </ul>
          </TimelineEntry>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================================
   Shared badge-preview building blocks — used by both Academic Honours
   entries (which may show 1 or 2 badges) and Certification entries.
   ========================================================================= */
function BadgePreviewIcon({ image, label, entryTitle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={() => window.open(image, "_blank", "noopener,noreferrer")}
        aria-label={`Open ${label ? `${entryTitle} — ${label}` : entryTitle} certificate image`}
        title={`View ${label ? `${entryTitle} — ${label}` : entryTitle} certificate`}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 34, height: 34, borderRadius: 8, flexShrink: 0, cursor: "pointer",
          border: `1px solid rgba(34,211,238,${hovered ? 0.7 : 0.35})`,
          background: hovered ? "rgba(34,211,238,0.14)" : "rgba(34,211,238,0.06)",
          color: "#22d3ee", transition: "border-color 0.15s ease, background 0.15s ease",
        }}
      >
        <Award size={16} />
      </button>
      {label && (
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#8b8ba0",
          marginTop: 4, whiteSpace: "nowrap",
        }}>
          {label}
        </span>
      )}
      {hovered && (
        <div
          role="presentation"
          style={{
            position: "absolute", bottom: "calc(100% + 10px)", right: 0, width: 220,
            borderRadius: 10, overflow: "hidden", zIndex: 20, pointerEvents: "none",
            border: "1px solid rgba(34,211,238,0.4)", background: "#0d0d16",
            boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
          }}
        >
          <img
            src={image}
            alt={`${label ? `${entryTitle} — ${label}` : entryTitle} certificate preview`}
            style={{ width: "100%", height: 140, objectFit: "cover", display: "block", background: "#1a1a24" }}
          />
          <div style={{
            padding: "8px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "#9c9cb0", borderTop: "1px solid rgba(34,211,238,0.2)",
          }}>
            click to open full image
          </div>
        </div>
      )}
    </div>
  );
}

function BadgeGroup({ images, title }) {
  if (!images || images.length === 0) return null;
  const multi = images.length > 1;
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      {images.map((img, i) => (
        <BadgePreviewIcon
          key={i}
          image={img.src}
          label={multi ? (img.label || `Badge ${i + 1}`) : undefined}
          entryTitle={title}
        />
      ))}
    </div>
  );
}

/* =========================================================================
   Education section — degrees, then Academic Honours (chronological,
   badge-preview enabled, images in their own /images/academic-honours/ folder)
   ========================================================================= */
function AcademicHonourEntry({ title, issuer, date, description, images, isLast }) {
  return (
    <div style={{ display: "flex", gap: 22, paddingBottom: isLast ? 0 : 30 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22d3ee", flexShrink: 0 }} />
        {!isLast && <span style={{ flex: 1, width: 1, background: "rgba(34,211,238,0.25)", marginTop: 4 }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "#e4e4f0", fontWeight: 600 }}>
              {title}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0" }}>
              {date}
            </span>
          </div>
          <BadgeGroup images={images} title={title} />
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#22d3ee", margin: "0 0 10px" }}>
          {issuer}
        </p>
        <p style={{ margin: 0, color: "#c2c2d4", fontSize: 14, lineHeight: 1.8 }}>{description}</p>
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <Section id="education" label="04 / education">
      <h2 style={{ fontSize: "clamp(28px,4vw,40px)", color: "#e4e4f0", margin: "0 0 40px", fontFamily: "'Space Grotesk', sans-serif" }}>
        Education and Academic Honours
      </h2>
      <div style={{ marginBottom: 56 }}>
        {CONFIG.education.map((ed, i) => (
          <TimelineEntry
            key={i} title={ed.degree} org={ed.institution} period={ed.period}
            images={ed.images}
            isLast={i === CONFIG.education.length - 1}
          >
            <p style={{ margin: 0, color: "#c2c2d4", fontSize: 14, lineHeight: 1.8 }}>{ed.details}</p>
          </TimelineEntry>
        ))}
      </div>

      <h3 style={{
        fontSize: "clamp(18px,2.4vw,22px)", color: "#e4e4f0", margin: "0 0 10px",
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
      }}>
        Academic Honours
      </h3>
      <p style={{ color: "#9c9cb0", fontSize: 14, margin: "0 0 32px", maxWidth: 560 }}>
        Listed chronologically. Hover a badge for a preview of the certificate — click it to open the full image in a new tab.
      </p>
      <div>
        {CONFIG.academicHonours.map((h, i) => (
          <AcademicHonourEntry
            key={i}
            title={h.title}
            issuer={h.issuer}
            date={h.date}
            description={h.description}
            images={h.images}
            isLast={i === CONFIG.academicHonours.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}

/* =========================================================================
   Certifications — hover-to-preview badge, click to open the full image
   ========================================================================= */
function CertificationEntry({ title, issuer, date, description, image, isLast }) {
  return (
    <div style={{ display: "flex", gap: 22, paddingBottom: isLast ? 0 : 30 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22d3ee", flexShrink: 0 }} />
        {!isLast && <span style={{ flex: 1, width: 1, background: "rgba(34,211,238,0.25)", marginTop: 4 }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "#e4e4f0", fontWeight: 600 }}>
              {title}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8b8ba0" }}>
              {date}
            </span>
          </div>
          <BadgeGroup images={[{ src: image }]} title={title} />
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#22d3ee", margin: "0 0 10px" }}>
          {issuer}
        </p>
        <p style={{ margin: 0, color: "#c2c2d4", fontSize: 14, lineHeight: 1.8 }}>{description}</p>
      </div>
    </div>
  );
}

function CertificationsSection() {
  return (
    <Section id="certifications" label="05 / certifications">
      <h2 style={{ fontSize: "clamp(28px,4vw,40px)", color: "#e4e4f0", margin: "0 0 12px", fontFamily: "'Space Grotesk', sans-serif" }}>
        Certifications
      </h2>
      <p style={{ color: "#9c9cb0", fontSize: 14, margin: "0 0 40px", maxWidth: 560 }}>
        Hover the badge beside each entry for a preview of the certificate — click it to open the full image in a new tab.
      </p>
      <div>
        {CONFIG.certifications.map((cert, i) => (
          <CertificationEntry
            key={i}
            title={cert.name}
            issuer={cert.issuer}
            date={cert.date}
            description={cert.description}
            image={cert.image}
            isLast={i === CONFIG.certifications.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}

/* =========================================================================
   Resume section
   ========================================================================= */
function ResumeSection() {
  return (
    <Section id="resume" label="07 / dossier">
      <div style={{
        border: "1px solid rgba(168,85,247,0.25)", borderRadius: 14, padding: "40px",
        background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 24,
      }}>
        <div>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", color: "#e4e4f0", margin: "0 0 10px", fontFamily: "'Space Grotesk', sans-serif" }}>
            Full dossier available
          </h2>
          <p style={{ color: "#9c9cb0", fontSize: 14, margin: 0, maxWidth: 460 }}>
            Education, project history, and technical clearance level — packaged as a PDF.
          </p>
        </div>
        <a
          href={CONFIG.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Calvin_Pillay_Resume.pdf"
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "14px 26px",
            borderRadius: 10, background: "#a855f7", color: "#0b0b14", fontWeight: 600,
            textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          <Download size={16} /> download resume
        </a>
      </div>
    </Section>
  );
}

/* =========================================================================
   Playground CTA — bottom-of-page button linking to the full interactive
   3D driving portfolio (a separate deployed project, not embedded here). deploy calvin-portfolio-3d.zip, then set CONFIG.playgroundUrl
   ========================================================================= */
function PlaygroundCTA() {
  const ready = CONFIG.playgroundUrl && CONFIG.playgroundUrl !== "";
  return (
    <div id="playground-cta" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px 80px" }}>
      <a
        href={ready ? CONFIG.playgroundUrl : undefined}
        target={ready ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={(e) => { if (!ready) e.preventDefault(); }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "16px 30px", borderRadius: 12,
          background: ready ? "linear-gradient(90deg, #a855f7, #22d3ee)" : "rgba(255,255,255,0.03)",
          border: ready ? "none" : "1px dashed rgba(168,85,247,0.4)",
          color: ready ? "#07070c" : "#8b8ba0",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600,
          textDecoration: "none", cursor: ready ? "pointer" : "default",
        }}
      >
        <Car size={20} />
        {ready ? "take my portfolio for a drive" : "3D driving portfolio — coming soon"}
      </a>
      {!ready && (
        <p style={{
          marginTop: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a5a6e",
        }}>
          Work in Progress
        </p>
      )}
    </div>
  );
}

/* =========================================================================
   Contact section
   ========================================================================= */
function ContactSection() {
  return (
    <Section id="contact" label="09 / connect" style={{ paddingBottom: 60 }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,5vw,48px)", color: "#e4e4f0", margin: "0 0 16px", fontFamily: "'Space Grotesk', sans-serif" }}>
          Let's build something.
        </h2>
        <p style={{ color: "#9c9cb0", fontSize: 15, maxWidth: 480, margin: "0 auto 36px" }}>
          Open to internships, collaborations, and interesting systems problems.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <EmailLink style={socialBtn}><Mail size={16} /> email</EmailLink>
          <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" style={socialBtn}><Github size={16} /> github</a>
          <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" style={socialBtn}><Linkedin size={16} /> linkedin</a>
        </div>
        <p style={{ marginTop: 60, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#5a5a6e" }}>
          press "/" to open the terminal · {CONFIG.location}
        </p>
      </div>
    </Section>
  );
}

const socialBtn = {
  display: "flex", alignItems: "center", gap: 8, padding: "12px 22px",
  border: "1px solid rgba(168,85,247,0.3)", borderRadius: 10, color: "#e4e4f0",
  textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
};

/* =========================================================================
   Hero
   ========================================================================= */
/* =========================================================================
   System monitor — subtle retro readout in the Hero section, simulating
   portfolio_os's CPU load, memory heap, and active thread count.
   ========================================================================= */
function SystemMonitor({ reducedMotion }) {
  const memCap = 3.2; // simulated heap ceiling, GB
  const [cpu, setCpu] = useState(28);
  const [mem, setMem] = useState(1.3);
  const [threads, setThreads] = useState(6);
  const [uptime, setUptime] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setCpu((c) => clamp(c + (Math.random() - 0.5) * 14, 6, 94));
      setMem((m) => clamp(m + (Math.random() - 0.5) * 0.18, 0.6, memCap - 0.1));
      setThreads((th) => (Math.random() > 0.8 ? clamp(th + (Math.random() > 0.5 ? 1 : -1), 3, 14) : th));
    }, 1400);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setUptime(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [reducedMotion]);

  const fmtUptime = (s) => {
    const hh = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  const memPct = (mem / memCap) * 100;
  const Bar = ({ pct, color }) => (
    <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{
        width: `${pct}%`, height: "100%", background: color,
        boxShadow: `0 0 6px ${color}`, transition: "width 0.6s ease",
      }} />
    </div>
  );

  return (
    <div style={{
      marginTop: 36, maxWidth: 340, border: "1px solid rgba(34,211,238,0.25)",
      borderRadius: 10, background: "rgba(11,11,20,0.55)", backdropFilter: "blur(6px)",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "#9c9cb0",
      padding: "12px 14px", boxShadow: "0 0 22px rgba(34,211,238,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, color: "#22d3ee" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Cpu size={12} /> portfolio_os — system monitor
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
        <span style={{ width: 44 }}>CPU</span>
        <Bar pct={cpu} color="#a855f7" />
        <span style={{ width: 34, textAlign: "right" }}>{Math.round(cpu)}%</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
        <span style={{ width: 44 }}>MEM</span>
        <Bar pct={memPct} color="#22d3ee" />
        <span style={{ width: 34, textAlign: "right" }}>{Math.round(memPct)}%</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span>heap: {mem.toFixed(1)}GB / {memCap.toFixed(1)}GB</span>
        <span>threads: {threads} active</span>
      </div>
      <div style={{ marginTop: 6, color: "#5a5a6e" }}>
        uptime {fmtUptime(uptime)}
      </div>
    </div>
  );
}

function Hero({ scrollY, reducedMotion }) {
  const factor = reducedMotion ? 0 : 1;
  const [statusLine, setStatusLine] = useState(0);
  const statuses = ["ONLINE", "AWAITING INPUT", "SYSTEMS NOMINAL"];

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setStatusLine((s) => (s + 1) % statuses.length), 2600);
    return () => clearInterval(t);
  }, [reducedMotion]);

  return (
    <Section id="home" style={{ minHeight: "94vh", display: "flex", alignItems: "center", paddingTop: 60 }}>
      <div style={{ transform: `translateY(${scrollY * -0.12 * factor}px)`, opacity: Math.max(1 - scrollY / 500, 0) }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, color: "#22d3ee", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 20,
          padding: "6px 14px", marginBottom: 28,
        }}>
          <Radio size={12} /> {statuses[statusLine]}
        </div>
        <h1 style={{
          fontSize: "clamp(40px, 7vw, 84px)", lineHeight: 1.02, margin: "0 0 20px",
          color: "#f2f2f7", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        }}>
          {CONFIG.name}
        </h1>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(15px,2vw,19px)",
          color: "#a855f7", margin: "0 0 22px",
        }}>
          {CONFIG.title} · {CONFIG.subtitle}
        </p>
        <p style={{ color: "#9c9cb0", fontSize: 16, maxWidth: 560, lineHeight: 1.7, margin: "0 0 40px" }}>
          {CONFIG.tagline}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#projects" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: 10,
            background: "#a855f7", color: "#0b0b14", fontWeight: 600, textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
          }}>
            view projects <ChevronRight size={16} />
          </a>
          <a href="#contact" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: 10,
            border: "1px solid rgba(168,85,247,0.4)", color: "#e4e4f0", textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
          }}>
            get in touch
          </a>
          <a
            href={CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 48, height: 48, borderRadius: 10,
              border: "1px solid rgba(168,85,247,0.4)", color: "#e4e4f0", textDecoration: "none",
            }}
          >
            <Github size={18} />
          </a>
          <a
            href={CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Calvin_Pillay_Resume.pdf"
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: 10,
              border: "1px solid rgba(34,211,238,0.4)", color: "#22d3ee", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            }}
          >
            <Download size={16} /> download CV
          </a>
        </div>
        <SystemMonitor reducedMotion={reducedMotion} />
      </div>
    </Section>
  );
}

/* =========================================================================
   Nav
   ========================================================================= */
/* =========================================================================
   Scroll progress indicator — thin bar pinned to the very top of the
   viewport, filling left-to-right as the page is scrolled.
   ========================================================================= */
/* =========================================================================
   Custom cursor — a stylized arrow (tip-anchored, like a real pointer) with
   a soft trailing glow, only shown on devices with a real mouse/trackpad
   (see useHasFinePointer). Grows and glows brighter over links, buttons,
   and badge-preview icons; pulses briefly on click.

   Perf notes: the arrow itself tracks the mouse every frame directly via
   ref.style.transform (translate only — no layout, no React re-render).
   The trailing glow's lerp animation only runs while it's still catching
   up; once it's within half a pixel of the pointer the rAF loop stops
   scheduling itself entirely, so nothing spins in the background while the
   mouse is idle. Hover/click state changes (which do re-render) only
   animate transform + opacity, never width/height/box-shadow, so there's
   no layout thrash while moving.
   ========================================================================= */
function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const rafRef = useRef(null);
  const animatingRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [pulses, setPulses] = useState([]);

  // Arrow tracks the mouse 1:1 (no lag — feels responsive, not clunky).
  // The soft glow behind it eases toward the same point for a sense of trail.
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    const animateTrail = () => {
      const dx = mouseX - trailX;
      const dy = mouseY - trailY;
      trailX += dx * 0.22;
      trailY += dy * 0.22;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
      }
      if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
        rafRef.current = requestAnimationFrame(animateTrail);
      } else {
        animatingRef.current = false;
      }
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (!animatingRef.current) {
        animatingRef.current = true;
        rafRef.current = requestAnimationFrame(animateTrail);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const interactive = "a, button, input, textarea, select, [role='button']";
    const onOver = (e) => { if (e.target.closest && e.target.closest(interactive)) setHovering(true); };
    const onOut = (e) => { if (e.target.closest && e.target.closest(interactive)) setHovering(false); };
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      setClicking(true);
      const id = `${Date.now()}-${Math.random()}`;
      setPulses((p) => [...p, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setPulses((p) => p.filter((pl) => pl.id !== id)), 500);
    };
    const onUp = () => setClicking(false);
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const scale = clicking ? 0.85 : hovering ? 1.25 : 1;

  return (
    <>
      {/* Trailing glow — eases toward the pointer, gives a sense of motion */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, width: 12, height: 12, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.55), transparent 70%)",
          pointerEvents: "none", zIndex: 9997, willChange: "transform",
          opacity: hovering ? 0.9 : 0.5, transition: "opacity 0.2s ease",
        }}
      />

      {/* Click ripples — brief, self-removing */}
      {pulses.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: "fixed", top: p.y, left: p.x, width: 26, height: 26,
            marginLeft: -13, marginTop: -13, borderRadius: "50%",
            border: "1.5px solid #22d3ee", pointerEvents: "none", zIndex: 9998,
            animation: "cursorPulse 0.5s ease-out forwards",
          }}
        />
      ))}

      {/* Arrow pointer — tip is the actual hotspot, exactly where a real cursor's is */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, willChange: "transform" }}
      >
        <svg
          width="17" height="27" viewBox="0 0 17 27"
          style={{
            display: "block", overflow: "visible",
            transform: `scale(${scale})`, transformOrigin: "0 0",
            transition: "transform 0.15s ease, filter 0.18s ease",
            filter: hovering
              ? "drop-shadow(0 0 7px rgba(34,211,238,0.95)) drop-shadow(0 0 13px rgba(168,85,247,0.55))"
              : "drop-shadow(0 0 4px rgba(34,211,238,0.65))",
          }}
        >
          <path
            d="M0 0L0 22L5.5 17L9.5 26L13 24.5L9 15.3L16.5 15.3Z"
            fill="url(#cursorGradient)"
            stroke="#0b0b14"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {hovering && (
            <circle
              cx="1" cy="1" r="15" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4"
              style={{ transformOrigin: "1px 1px", animation: "cursorRingPulse 1.4s ease-in-out infinite" }}
            />
          )}
          <defs>
            <linearGradient id="cursorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollable = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100,
        background: "rgba(255,255,255,0.04)", pointerEvents: "none",
      }}
    >
      <div style={{
        height: "100%", width: `${progress}%`,
        background: "linear-gradient(90deg, #a855f7, #22d3ee)",
        boxShadow: "0 0 8px rgba(34,211,238,0.6)",
        transition: "width 0.08s linear",
      }} />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    ["home", "home"], ["about", "about"], ["skills", "skills"],
    ["experience", "experience"], ["education", "education"],
    ["certifications", "certifications"], ["projects", "projects"],
    ["resume", "resume"], ["contact", "contact"],
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 28px", background: scrolled ? "rgba(7,7,12,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(168,85,247,0.15)" : "1px solid transparent",
      transition: "all 0.25s ease",
    }}>
      <a href="#home" style={{
        fontFamily: "'JetBrains Mono', monospace", color: "#e4e4f0", textDecoration: "none",
        fontSize: 14, display: "flex", alignItems: "center", gap: 8,
      }}>
        <Cpu size={16} color="#a855f7" /> {CONFIG.handle}
      </a>
      <div style={{ display: "flex", gap: 26 }}>
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="nav-link" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#9c9cb0",
            textDecoration: "none",
          }}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* =========================================================================
   Root
   ========================================================================= */
export default function Portfolio() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const hasFinePointer = useHasFinePointer();
  const showCustomCursor = hasFinePointer && !reducedMotion;
  const [booted, setBooted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  const handleDrive = useCallback(() => {
    if (CONFIG.playgroundUrl) {
      window.open(CONFIG.playgroundUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate("playground-cta");
    }
  }, [navigate]);

  return (
    <div style={{ background: "#07070c", minHeight: "100vh", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(168,85,247,0.4); color: #fff; }
        a { transition: opacity 0.15s ease, border-color 0.15s ease; }
        a:hover { opacity: 0.8; }
        .nav-link { transition: color 0.2s ease, text-shadow 0.2s ease, opacity 0.2s ease; }
        .nav-link:hover {
          color: #22d3ee !important;
          opacity: 1 !important;
          text-shadow: 0 0 6px rgba(34,211,238,0.85), 0 0 18px rgba(34,211,238,0.5);
        }
        @media (max-width: 640px) {
          #about > div > div { grid-template-columns: 1fr !important; }
          #about > div > div > div:first-child { width: 140px; margin: 0 auto 20px; }
        }
      `}</style>

      {!booted && <BootSequence onDone={() => setBooted(true)} skip={reducedMotion} />}

      <ParallaxBackdrop scrollY={scrollY} reducedMotion={reducedMotion} isMobile={isMobile} />
      <JarvisHologram scrollY={scrollY} reducedMotion={reducedMotion} isMobile={isMobile} />
      <GeometricParallax scrollY={scrollY} reducedMotion={reducedMotion} isMobile={isMobile} />
      {showCustomCursor && (
        <style>{`
          * { cursor: none !important; }
          @keyframes cursorPulse {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes cursorRingPulse {
            0%, 100% { transform: scale(0.9); opacity: 0.25; }
            50% { transform: scale(1.15); opacity: 0.55; }
          }
        `}</style>
      )}
      {showCustomCursor && <CustomCursor />}
      <ScrollProgress />
      <Nav />
      <Hero scrollY={scrollY} reducedMotion={reducedMotion} />
      <SkillsSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <ProjectsSection />
      <ResumeSection />
      <PlaygroundCTA />
      <ContactSection />

      <CommandTerminal open={termOpen} setOpen={setTermOpen} onNavigate={navigate} onDrive={handleDrive} />
    </div>
  );
}