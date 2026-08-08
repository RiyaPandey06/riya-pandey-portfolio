import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  X,
  Menu,
  Award,
  FileText,
  Network,
  KeyRound,
  Boxes,
  BarChart3,
  Link2,
  Atom,
  Coffee,
  Zap,
  Wind,
  Hexagon,
  FlaskConical,
  Leaf,
  Flame,
  Smile,
  LineChart,
  GitBranch,
  PlayCircle,
  Box,
  Rocket,
} from "lucide-react";

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const C = {
  void: "#0A0A0A",
  panel: "#161616",
  panel2: "#1D1D1D",
  red: "#E50914",
  redDeep: "#7A0A10",
  ink: "#F2F1EC",
  dim: "#9A9A93",
  gold: "#D9B24C",
};

const LINKS = {
  linkedin: "https://www.linkedin.com/in/riya-pandey-5661b2412",
  github: "https://github.com/RiyaPandey06",
  email: "riyapandey061108@gmail.com",
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=riyapandey061108@gmail.com&su=" +
    encodeURIComponent("Portfolio Inquiry"),
  certVaultofCodes:
    "https://drive.google.com/file/d/1zDwaa1GXEMA-khIQoTc1XsJYd2_vJ6N_/view?usp=drive_link",
  certCodeAlpha:
    "https://drive.google.com/file/d/1PjSLAylTN9foC-TLM-HtYx7Z92vCYhHb/view?usp=drive_link",
  certFolder:
    "https://drive.google.com/drive/folders/13_xRviFoTna1KldRTpu9P5gnkPzSamgI?usp=drive_link",
};

const SECTIONS = [
  { id: "hero", label: "Riya Pandey" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

/* ---------------- Panel reveal ("door" concept, simplified — flat sliding curtain, same everywhere) ---------------- */
function Curtain({ side, open }) {
  const isLeft = side === "left";
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [isLeft ? "left" : "right"]: 0,
        width: "51%",
        background: `linear-gradient(${isLeft ? "120deg" : "240deg"}, ${C.panel2}, ${C.panel} 55%, ${C.void})`,
        borderRight: isLeft ? `1px solid #262626` : "none",
        borderLeft: isLeft ? "none" : `1px solid #262626`,
        transform: open ? `translateX(${isLeft ? "-102%" : "102%"})` : "translateX(0)",
        transition: "transform 1000ms cubic-bezier(.76,0,.2,1)",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [isLeft ? "right" : "left"]: 0,
          width: 2,
          background: C.red,
          boxShadow: open ? "none" : `0 0 18px 3px ${C.red}`,
          opacity: open ? 0 : 0.85,
          transition: "opacity 400ms ease",
        }}
      />
    </div>
  );
}

function Reveal({ id, label, index, children }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setOpen(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: C.void,
        overflow: "hidden",
        borderTop: `1px solid #1c1c1c`,
      }}
      className="reveal-section flex items-center justify-center px-6 py-24"
    >
      <div
        style={{
          maxWidth: 1080,
          width: "100%",
          transition: "opacity 800ms ease 300ms, transform 800ms ease 300ms",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(26px)",
        }}
      >
        <SectionEyebrow index={index} label={label} />
        {children}
      </div>
      <Curtain side="left" open={open} />
      <Curtain side="right" open={open} />
    </section>
  );
}

function SectionEyebrow({ index, label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.red, fontSize: 15, letterSpacing: "0.28em" }}>
        EP {String(index).padStart(2, "0")}
      </span>
      <span style={{ height: 1, width: 48, background: "#333" }} />
      <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.dim, fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function H2({ children }) {
  return (
    <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.ink, fontSize: "clamp(34px, 6vw, 64px)", letterSpacing: "0.02em", lineHeight: 1.02, marginBottom: 24 }}>
      {children}
    </h2>
  );
}

function Tag({ children }) {
  return (
    <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: C.ink, background: "#232323", border: "1px solid #333", borderRadius: 3, padding: "5px 10px", display: "inline-block" }}>
      {children}
    </span>
  );
}

/* ---------------- Hero background: particle network canvas (techy / 3D-feeling) ---------------- */
function NetworkCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, particles;

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const count = Math.max(28, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    init();

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(229,9,20,${0.16 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = "rgba(242,241,236,0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ---------------- Floating 3D code-card stack ---------------- */
function FloatingCards() {
  const snippets = [
    { t: "const model = train(data)", c: "#E50914" },
    { t: "<Component />", c: "#61dafb" },
    { t: "SELECT * FROM users", c: "#D9B24C" },
  ];
  return (
    <div className="floating-cards" style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", perspective: 1000 }}>
      {snippets.map((s, i) => (
        <div
          key={i}
          style={{
            width: 220,
            padding: "14px 16px",
            marginBottom: 16,
            background: "rgba(22,22,22,.75)",
            border: `1px solid ${s.c}55`,
            borderRadius: 8,
            fontFamily: "ui-monospace, monospace",
            fontSize: 12.5,
            color: C.ink,
            backdropFilter: "blur(6px)",
            transform: `rotateY(-18deg) rotateX(6deg) translateZ(0) translateX(${i * 10}px)`,
            boxShadow: "0 20px 40px rgba(0,0,0,.5)",
            animation: `floatY 4.5s ease-in-out ${i * 0.4}s infinite`,
          }}
        >
          <span style={{ color: s.c }}>▸</span> {s.t}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Tech badge — plain black box, red text, full name, matches site's core palette ---------------- */
function TechIcon({ name }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        minWidth: 130,
        height: 76,
        padding: "0 18px",
        background: C.void,
        border: `1px solid ${hover ? C.red : C.red + "55"}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "default",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover ? `0 14px 28px rgba(0,0,0,.55), 0 0 0 1px ${C.red}33` : "none",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
      }}
    >
      <span style={{ color: C.red, fontSize: 14, fontWeight: 700, letterSpacing: "0.02em" }}>{name}</span>
    </div>
  );
}

/* ---------------- Row: horizontally scrollable icon row with staggered reveal ---------------- */
function Row({ title, items }) {
  const scroller = useRef(null);
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollBy = (dir) => scroller.current && scroller.current.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <div className="mb-14" ref={rowRef}>
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.ink, fontSize: 22, letterSpacing: "0.04em" }}>{title}</h3>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-1)} aria-label={`Scroll ${title} left`} style={navBtnStyle}>‹</button>
          <button onClick={() => scrollBy(1)} aria-label={`Scroll ${title} right`} style={navBtnStyle}>›</button>
        </div>
      </div>
      <div ref={scroller} style={{ display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 8 }} className="hide-scrollbar">
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              scrollSnapAlign: "start",
              flex: "0 0 auto",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 500ms ease ${i * 50}ms, transform 500ms ease ${i * 50}ms`,
            }}
          >
            <TechIcon name={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

const navBtnStyle = { width: 30, height: 30, borderRadius: 4, border: "1px solid #333", background: "#1a1a1a", color: C.ink, fontSize: 18, cursor: "pointer", lineHeight: 1 };

/* ---------------- Education card (own box, animated reveal) ---------------- */
function EduCard({ title, sub, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        background: C.panel,
        border: `1px solid #262626`,
        borderTop: `3px solid ${C.red}`,
        borderRadius: 8,
        padding: "20px 18px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(.96)",
        transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ color: C.dim, fontSize: 13 }}>{sub}</div>
    </div>
  );
}

/* ---------------- Project card ---------------- */
function ProjectCard({ project, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(project)}
      style={{
        width: 300,
        minHeight: 178,
        background: `linear-gradient(160deg, ${C.panel2}, ${C.panel})`,
        border: `1px solid ${hover ? C.red : "#2a2a2a"}`,
        borderRadius: 8,
        padding: 22,
        cursor: "pointer",
        transform: hover ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hover ? "0 18px 40px rgba(0,0,0,.55)" : "none",
        transition: "all 260ms ease",
      }}
      className="project-card"
    >
      <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: C.red, letterSpacing: "0.14em", marginBottom: 8 }}>FEATURED TITLE</div>
      <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26, color: C.ink, marginBottom: 8 }}>{project.title}</div>
      <p style={{ color: C.dim, fontSize: 13.5, lineHeight: 1.55 }}>{project.tagline}</p>
      <div style={{ marginTop: 14, color: C.dim, fontSize: 12 }}>
        {hover ? "Click for details ▸" : project.stack.slice(0, 3).join(" · ")}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.78)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.panel, border: "1px solid #2a2a2a", borderRadius: 8, maxWidth: 560, width: "100%", padding: 32, position: "relative" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: C.dim, cursor: "pointer" }}>
          <X size={20} />
        </button>
        <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 34, color: C.ink, marginBottom: 10 }}>{project.title}</div>
        <ul style={{ color: C.dim, fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
          {project.points.map((p, i) => <li key={i} style={{ marginBottom: 6 }}>— {p}</li>)}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
          {project.stack.map((s, i) => <Tag key={i}>{s}</Tag>)}
        </div>
        <div className="flex gap-3">
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" style={linkBtnStyle}><Github size={15} /> GitHub</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, background: "#1F1F1F", border: "1px solid #333" }}><ExternalLink size={15} /> Live demo</a>}
        </div>
      </div>
    </div>
  );
}

const linkBtnStyle = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.ink, background: C.red, padding: "10px 18px", borderRadius: 4, textDecoration: "none", fontWeight: 600 };

/* ---------------- Data ---------------- */
const lucide = (Comp, color) => ({ kind: "lucide", Comp, color });
const mono = (bg, fg, text) => ({ kind: "mono", bg, fg, text });
const grad = (gradient, fg, text) => ({ kind: "mono", gradient, fg, text });

const skillRows = [
  {
    title: "Languages",
    items: [
      { name: "Java", icon: lucide(Coffee, "#ED8B00") },
      { name: "Python", icon: grad("linear-gradient(135deg,#3776AB 50%,#FFD43B 50%)", "#fff", "PY") },
      { name: "C", icon: mono("#659AD2", "#fff", "C") },
      { name: "JavaScript", icon: mono("#F7DF1E", "#000", "JS") },
      { name: "TypeScript", icon: mono("#3178C6", "#fff", "TS") },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: lucide(Atom, "#61DAFB") },
      { name: "Next.js", icon: mono("#000", "#fff", "N") },
      { name: "Vite", icon: lucide(Zap, "#646CFF") },
      { name: "HTML5", icon: mono("#E34F26", "#fff", "5") },
      { name: "CSS3", icon: mono("#1572B6", "#fff", "3") },
      { name: "Tailwind CSS", icon: lucide(Wind, "#38BDF8") },
      { name: "Bootstrap", icon: mono("#7952B3", "#fff", "B") },
      { name: "Framer Motion", icon: mono("#000", "#fff", "F") },
    ],
  },
  {
    title: "State & Data",
    items: [
      { name: "Redux", icon: lucide(Atom, "#764ABC") },
      { name: "Zustand", icon: lucide(Boxes, "#6B4423") },
      { name: "TanStack Query", icon: lucide(BarChart3, "#FF4154") },
      { name: "Axios", icon: mono("#5A29E4", "#fff", "A") },
      { name: "Recharts", icon: lucide(BarChart3, "#22B5BF") },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js", icon: lucide(Hexagon, "#339933") },
      { name: "Express.js", icon: mono("#000", "#fff", "ex") },
      { name: "FastAPI", icon: lucide(Zap, "#009688") },
      { name: "Flask", icon: lucide(FlaskConical, "#111") },
      { name: "REST API", icon: lucide(Network, "#E50914") },
      { name: "JWT", icon: mono("#000", "#FB015B", "JWT") },
      { name: "OAuth2", icon: lucide(KeyRound, "#EB5424") },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", icon: lucide(Leaf, "#47A248") },
      { name: "MySQL", icon: mono("#4479A1", "#fff", "SQL") },
    ],
  },
  {
    title: "AI / Machine Learning",
    items: [
      { name: "scikit-learn", icon: mono("#F7931E", "#fff", "SK") },
      { name: "PyTorch", icon: lucide(Flame, "#EE4C2C") },
      { name: "Hugging Face", icon: lucide(Smile, "#FFB300") },
      { name: "LangChain", icon: lucide(Link2, "#1C7C54") },
      { name: "pandas", icon: mono("#150458", "#fff", "pd") },
      { name: "NumPy", icon: mono("#4DABCF", "#fff", "np") },
      { name: "Matplotlib", icon: lucide(LineChart, "#11557C") },
    ],
  },
  {
    title: "Tools & DevOps",
    items: [
      { name: "Git", icon: lucide(GitBranch, "#F05032") },
      { name: "GitHub", icon: lucide(Github, "#111") },
      { name: "GitHub Actions", icon: lucide(PlayCircle, "#2088FF") },
      { name: "Docker", icon: lucide(Box, "#2496ED") },
      { name: "Vercel", icon: mono("#000", "#fff", "▲") },
      { name: "Netlify", icon: mono("#00C7B7", "#fff", "N") },
      { name: "Postman", icon: lucide(Rocket, "#FF6C37") },
    ],
  },
];

const experience = [
  {
    role: "Web Developer Intern",
    org: "VaultofCodes",
    date: "June 2026 – July 2026",
    points: [
      "Designed and shipped Editkaro.in end-to-end — a client-facing portfolio site for a video editing & social media agency — translating brand goals into a polished, responsive experience in HTML, CSS and JavaScript.",
      "Closed the loop between visitors and the business: built newsletter and inquiry forms that write straight into Google Sheets via Apps Script, then deployed the whole site live on GitHub Pages.",
    ],
    cert: LINKS.certVaultofCodes,
  },
];

const projects = [
  {
    title: "CommerceHub",
    tagline: "A SaaS-grade admin dashboard that makes managing a storefront feel effortless.",
    points: [
      "Full role-based admin dashboard — search, filters, sorting and live analytics over the DummyJSON API — built to feel like production software, not a demo.",
      "Tuned for speed: Zustand and TanStack Query for state and caching, React.memo/useMemo/useCallback and lazy loading to keep interactions instant.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
    github: "https://github.com/RiyaPandey06/CommerceHub",
    demo: "https://commercehub-mm9h.vercel.app/",
  },
  {
    title: "AI App Generator",
    tagline: "A compiler that reads plain English and hands back a working app blueprint.",
    points: [
      "Turns natural-language requirements into structured app configurations through intent extraction, schema generation, validation and targeted auto-repair.",
      "Cross-layer validation framework that catches schema inconsistencies, repairs invalid configs, and renders an executable UI preview — proven across 20 test scenarios.",
    ],
    stack: ["JavaScript", "Schema Validation", "Rule-based Pipeline"],
    github: "https://github.com/RiyaPandey06/AI-APP-GENERATOR",
    demo: null,
  },
  {
    title: "AI Compiler",
    tagline: "Prompt in, runnable application out — a deterministic generation pipeline.",
    points: [
      "Converts natural-language prompts into structured, executable app configurations via intent extraction, architecture generation, schema validation and automated repair.",
      "Modular pipeline with cross-layer validation, error recovery and evaluation metrics, rendering the final result live through JSON-driven UI generation.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "JSON", "Python HTTP Server"],
    github: "https://github.com/RiyaPandey06/AI-COMPILER",
    demo: "https://aicompiler.vercel.app/",
  },
];

const certifications = [
  { t: "HackerRank Software Engineer Certification", s: "HackerRank" },
  { t: "HTML5: The Language", s: "Infosys Springboard" },
  { t: "CSS3", s: "Infosys Springboard" },
  { t: "JavaScript", s: "Infosys Springboard" },
  { t: "Twitter Bootstrap", s: "Infosys Springboard" },
  { t: "Python for Data Science", s: "Infosys Springboard" },
  { t: "Programming Fundamentals using Python (Part 1 & 2)", s: "Infosys Springboard" },
  { t: "Resilience", s: "Nestlé E-Learning" },
];

/* ---------------- Root ---------------- */
export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [introDone, setIntroDone] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    // "R" zoom plays immediately (visual only); the tap prompt appears once
    // it settles. Sound is gated behind that tap — browsers block audio
    // before any user interaction, so this guarantees it actually plays.
    const t1 = setTimeout(() => setShowPrompt(true), 1300);
    return () => clearTimeout(t1);
  }, []);

  const enterSite = useCallback(() => {
    if (introClosing) return;
    setIntroClosing(true);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      [220, 164].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.32);
        gain.gain.setValueAtTime(0.001, now + i * 0.32);
        gain.gain.exponentialRampToValueAtTime(0.25, now + i * 0.32 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.32 + 0.4);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.32);
        osc.stop(now + i * 0.32 + 0.45);
      });
    } catch (e) {
      /* audio unavailable — visuals still proceed */
    }
    setTimeout(() => setIntroDone(true), 650);
    setTimeout(() => setHeroIn(true), 750);
  }, [introClosing]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setScrollPct(Math.min(1, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }, []);

  return (
    <div style={{ background: C.void, color: C.ink, fontFamily: "'Inter', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.red}; outline-offset: 2px; }
        @keyframes introZoom { 0% { transform: scale(.4); opacity: 0; letter-spacing: 0.4em; } 55% { transform: scale(1.06); opacity: 1; } 100% { transform: scale(1); opacity: 1; letter-spacing: 0.05em; } }
        @keyframes pulseGlow { 0%,100% { opacity:.4 } 50% { opacity:.95 } }
        @keyframes floatY { 0%,100% { transform: translateY(0) rotateY(-18deg) rotateX(6deg);} 50% { transform: translateY(-14px) rotateY(-18deg) rotateX(6deg);} }
        @media (max-width: 720px) {
          .floating-cards { display: none; }
          .reveal-section { padding-top: 72px; padding-bottom: 72px; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 1ms !important; animation-duration: 1ms !important; }
        }
      `}</style>

      {!introDone && (
        <div
          onClick={enterSite}
          role="button"
          aria-label="Enter site"
          style={{
            position: "fixed",
            inset: 0,
            background: C.void,
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: introClosing ? 0 : 1,
            transition: "opacity 600ms ease",
          }}
        >
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.red, fontSize: "min(38vw, 220px)", textShadow: `0 0 60px ${C.red}88`, animation: "introZoom 1.4s cubic-bezier(.2,.7,.3,1)" }}>
            R
          </span>
          <span
            style={{
              marginTop: 18,
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              color: C.dim,
              fontSize: 13,
              letterSpacing: "0.35em",
              opacity: showPrompt ? 0.85 : 0,
              transition: "opacity 500ms ease",
              animation: showPrompt ? "pulseGlow 1.6s ease-in-out infinite" : "none",
            }}
          >
            TAP TO ENTER
          </span>
        </div>
      )}

      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${scrollPct * 100}%`, background: C.red, zIndex: 210, transition: "width 100ms linear" }} />

      <div style={{ position: "fixed", top: 18, right: 18, zIndex: 200 }}>
        <button onClick={() => setNavOpen((v) => !v)} aria-label="Open section menu" style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(20,20,20,.85)", border: `1px solid ${C.red}`, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
          {navOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        {navOpen && (
          <div style={{ marginTop: 10, background: "rgba(15,15,15,.95)", border: "1px solid #2a2a2a", borderRadius: 8, padding: 10, minWidth: 190 }}>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => jump(s.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: C.dim, fontSize: 13, padding: "7px 8px", cursor: "pointer", borderRadius: 4 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* HERO — full-bleed animated network canvas + floating 3D code cards */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 6vw", background: `radial-gradient(ellipse at 30% 40%, ${C.redDeep}25, ${C.void} 65%)` }}>
        <NetworkCanvas />
        <FloatingCards />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(18px)", transition: "opacity 800ms ease 200ms, transform 800ms ease 200ms" }}>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: C.red, fontSize: 14, letterSpacing: "0.4em", marginBottom: 16 }}>NOW STREAMING</div>
          <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(48px, 10vw, 110px)", lineHeight: 0.95, letterSpacing: "0.01em" }}>RIYA PANDEY</h1>
          <p style={{ color: C.dim, fontSize: 17, marginTop: 18, lineHeight: 1.6 }}>
            Computer Science undergrad building full-stack apps and AI/ML systems —
            from RAG pipelines to production dashboards.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
            <button onClick={() => jump("about")} style={{ background: C.red, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 4, fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", cursor: "pointer" }}>▶ Play Story</button>
            <a href={LINKS.github} target="_blank" rel="noreferrer" style={{ background: "#1F1F1F", border: "1px solid #333", color: C.ink, padding: "13px 20px", borderRadius: 4, fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><Github size={15} /> GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ background: "#1F1F1F", border: "1px solid #333", color: C.ink, padding: "13px 20px", borderRadius: 4, fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><Linkedin size={15} /> LinkedIn</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "6vw", zIndex: 2, color: C.dim, display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.2em" }}>
          SCROLL <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      <Reveal id="about" label="About" index={1}>
        <H2>The Person Behind the Code</H2>
        <p style={{ color: C.dim, fontSize: 16, lineHeight: 1.75, maxWidth: 680, marginBottom: 34 }}>
          I think in systems — whether that's a React component tree or a model's
          decision boundary. What pulls me in is the middle ground between the two:
          building interfaces people actually enjoy using, then wiring real
          intelligence — RAG pipelines, predictive models — underneath them. Two
          internships in, I've learned that the best code is the kind that ships,
          gets used, and holds up when it matters.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
          <EduCard i={0} title="B.Tech, Computer Science & Engineering" sub="PSIT, Kanpur · 2024–Present · CGPA 8.11" />
          <EduCard i={1} title="Class XII" sub="MDM Senior Secondary School · 75.83%" />
          <EduCard i={2} title="Class X" sub="Pt. Deen Dayal Upadhyaya Sanatan Dharma Vidyalaya · 92.83%" />
        </div>
      </Reveal>

      <Reveal id="skills" label="Skills" index={2}>
        <H2>Browse by Genre</H2>
        {skillRows.map((row, i) => <Row key={i} title={row.title} items={row.items} />)}
      </Reveal>

      <Reveal id="experience" label="Experience" index={3}>
        <H2>Episodes So Far</H2>
        <div className="space-y-6">
          {experience.map((e, i) => (
            <div key={i} style={{ background: `linear-gradient(160deg, ${C.panel2}, ${C.panel})`, border: "1px solid #262626", borderLeft: `4px solid ${C.red}`, borderRadius: 8, padding: 26 }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <div>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26 }}>{e.role}</span>
                  <span style={{ color: C.red, marginLeft: 10, fontSize: 14 }}>{e.org}</span>
                </div>
                <span style={{ color: C.dim, fontSize: 12.5, fontFamily: "ui-monospace, monospace" }}>{e.date}</span>
              </div>
              <ul style={{ color: C.dim, fontSize: 14.5, lineHeight: 1.75, marginBottom: 14 }}>
                {e.points.map((p, j) => <li key={j} style={{ marginBottom: 5 }}>— {p}</li>)}
              </ul>
              <a href={e.cert} target="_blank" rel="noreferrer" style={{ color: C.gold, fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}><Award size={14} /> View certificate</a>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal id="projects" label="Projects" index={4}>
        <H2>Featured Titles</H2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {projects.map((p, i) => <ProjectCard key={i} project={p} onOpen={setActiveProject} />)}
        </div>
      </Reveal>

      <Reveal id="certifications" label="Certifications" index={5}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <H2>Awards & Recognition</H2>
        </div>
        <a href={LINKS.certFolder} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, background: "#1F1F1F", border: `1px solid ${C.gold}66`, color: C.gold, marginBottom: 26 }}>
          <FileText size={15} /> View all certificates
        </a>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 18, marginTop: 22 }}>
          {certifications.map((c, i) => (
            <div key={i} style={{ border: `1px solid ${C.gold}55`, background: "linear-gradient(160deg, #1a1710, #141414)", borderRadius: 8, padding: 24, fontSize: 15, color: C.ink }}>
              <div style={{ color: C.gold, fontSize: 11, letterSpacing: "0.14em", marginBottom: 10 }}>CERTIFIED · {c.s.toUpperCase()}</div>
              {c.t}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal id="contact" label="Contact" index={6}>
        <div style={{ background: `linear-gradient(160deg, ${C.panel2}, ${C.panel})`, border: "1px solid #262626", borderRadius: 14, padding: "48px 40px", textAlign: "center" }}>
          <H2>Continue Watching?</H2>
          <p style={{ color: C.dim, fontSize: 16, marginBottom: 34, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Open to Web Development and AI/ML Engineering roles — reach out any time,
            I reply fast.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={LINKS.gmailCompose} target="_blank" rel="noreferrer" style={linkBtnStyle}><Mail size={15} /> Email me</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, background: "#1F1F1F", border: "1px solid #333" }}><Linkedin size={15} /> LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, background: "#1F1F1F", border: "1px solid #333" }}><Github size={15} /> GitHub</a>
          </div>
          <p style={{ color: "#666", fontSize: 12, marginTop: 40 }}>
            Still building, still learning — always glad to talk code over a coffee.
          </p>
        </div>
      </Reveal>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
