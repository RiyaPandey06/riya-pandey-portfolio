# Riya Pandey — Portfolio

A personal developer portfolio built as a "streaming platform" for my work — Netflix-style browsing rows for skills and projects, with cinematic curtain-reveal transitions between sections as you scroll.


**Live demo:(https://riya-pandey-portfolio.vercel.app/)

---

## Tech Stack

- **React 18** — component structure and state
- **Vite 5** — dev server and build tool
- **Tailwind CSS v4** — styling
- **lucide-react** — icon set

No backend, no database — fully static, single-page site.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version recommended)
- npm (comes bundled with Node.js)

### Installation

```bash
# Clone or download this repo, then move into it
cd riya-portfolio

# Install dependencies
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads automatically whenever you save a file.

### Build for production

```bash
npm run build
```

This generates an optimized, production-ready site inside the `dist/` folder.

### Preview the production build locally

```bash
npm run preview
```

---

## Project Structure

```
riya-portfolio/
├── index.html          # HTML entry point (Vite injects the app here)
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite + Tailwind plugin config
├── src/
│   ├── main.jsx          # React entry point, mounts <App />
│   ├── App.jsx            # Renders the Portfolio component
│   ├── Portfolio.jsx      # The entire site — all sections, content, animations
│   └── index.css          # Tailwind import + base styles
└── README.md
```

Everything — hero, about, skills rows, experience "episodes," project cards, certifications, and contact — lives inside `src/Portfolio.jsx` as a single component tree. Content like links, section labels, skills, and project details are defined as data objects near the top and bottom of that file, so most edits (text, links, dates) don't require touching any layout code.

---

## Customizing

| To change... | Edit... |
|---|---|
| Name, tagline, hero text | `src/Portfolio.jsx` → hero `<section id="hero">` |
| Email, GitHub, LinkedIn, certificate links | `src/Portfolio.jsx` → `LINKS` object near the top |
| Skills / tech stack rows | `src/Portfolio.jsx` → `skillRows` data |
| Work experience | `src/Portfolio.jsx` → `experience` data |
| Projects | `src/Portfolio.jsx` → `projects` data |
| Certifications | `src/Portfolio.jsx` → `certifications` data |
| Colors / theme | `src/Portfolio.jsx` → `C` (color tokens) object near the top |

After editing, save the file — the dev server (`npm run dev`) reloads instantly.

---

## Deployment

This is a static site, so any static host works. Easiest options:

**Netlify (drag-and-drop, fastest)**
1. `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page — done, live in seconds

**Vercel**
1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite and deploys on every push

**GitHub Pages**
1. `npm run build`
2. Deploy the `dist/` folder using the [gh-pages](https://www.npmjs.com/package/gh-pages) package or GitHub Actions

---

## Troubleshooting

**Tailwind styles not applying / `@layer base` errors:**
PostCSS searches upward through parent folders for config files. If you have an old `tailwind.config.js` or `postcss.config.js` sitting in a parent directory (e.g. your user folder), it can conflict with this project's Tailwind v4 setup. Check for and remove/rename any stray config files outside this project folder.

**Blank page or default Vite starter page instead of the portfolio:**
Make sure you're running the server from *this* project folder, and that `src/App.jsx` imports and renders `Portfolio.jsx`.

**Port 5173 already in use:**
Vite will automatically try the next available port (5174, etc.) — check the terminal output for the actual URL.

---

## Author

**Riya Pandey**
B.Tech Computer Science & Engineering, PSIT Kanpur
📧 riyapandey061108@gmail.com

---

## License

This project is personal portfolio code. Feel free to reference the structure for your own portfolio, but please don't reuse the content/copy as-is.
