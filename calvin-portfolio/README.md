# Calvin's Portfolio (React site)

This is `Portfolio.jsx` turned into a real, runnable project. It's the
site with the terminal boot sequence, JARVIS hologram, GitHub projects,
and the "take my portfolio for a drive" button — separate from the 3D
driving portfolio (`calvin-portfolio-3d`), which is its own project
deployed on its own URL.

## File structure

```
calvin-portfolio/
├── index.html          ← Vite's entry HTML (just mounts the app)
├── package.json
├── vite.config.js
├── .gitignore
├── public/              ← anything in here is served as-is at the site root
│   ├── resume.pdf        ← ADD YOUR REAL RESUME HERE
│   └── images/
│       └── avatar.jpg    ← ADD YOUR REAL PHOTO HERE
└── src/
    ├── main.jsx         ← mounts <Portfolio /> into the page
    └── Portfolio.jsx    ← the whole site (everything we've built)
```

## Adding your resume so the download button works

1. Drop your real resume PDF into `public/resume.pdf` (exact name matters —
   it's what `CONFIG.resumeUrl: "/resume.pdf"` in `Portfolio.jsx` points to).
2. That's it. Both "download CV" buttons already have a `download`
   attribute set, so clicking them saves the file instead of just
   opening a tab.

**Why it has to be in `public/`, not just any URL:** browsers only
honor the `download` attribute reliably for same-origin files. If
`resumeUrl` points at some other domain (Google Drive, Dropbox, etc.),
most browsers ignore `download` and just open it in a viewer/tab
instead of actually downloading it. Keeping it in `public/` and serving
it from your own domain is what makes the download attribute work like
you'd expect.

## Adding your photo

1. Drop your photo into `public/images/avatar.jpg`.
2. Open `src/Portfolio.jsx`, find the `CONFIG` object near the top, and change:
   ```js
   avatarUrl: "",
   ```
   to:
   ```js
   avatarUrl: "/images/avatar.jpg",
   ```
   (Leaving it blank is what shows the dashed placeholder circle — that's
   intentional, so the site never shows a broken image if you forget this step.)

## Running it

```bash
npm install
npm run dev
```
Then open the local URL Vite prints (usually `http://localhost:5173`).

## Building and deploying

```bash
npm run build
```
Outputs a static `dist/` folder — deploy it to Vercel, Netlify, GitHub
Pages, or anywhere that serves static files. Vercel is the least fuss:
import the GitHub repo at vercel.com/new and it auto-detects Vite.

## Linking the two portfolios together

They're two separate projects, deployed separately, connected only by
a URL — not nested inside each other:

```
calvin-portfolio (this project)         calvin-portfolio-3d (the Folio 2025 fork)
        │                                          │
        │  CONFIG.playgroundUrl ──────────────────▶│  (once deployed, e.g. Vercel)
        │  points at wherever you deploy it         │
```

Once `calvin-portfolio-3d` is deployed and you have its live URL, open
`Portfolio.jsx`, find `CONFIG.playgroundUrl` near the top, and paste
the URL in. The "take my portfolio for a drive" button at the bottom
of the page will then open it in a new tab.
