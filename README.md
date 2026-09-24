# My Portfolio

A personal portfolio website built with **React** (frontend) and **Express on Node.js** (backend API for the contact form).

The site is organised around four areas of expertise, each with its own page:

| Page                             | URL                     |
| -------------------------------- | ----------------------- |
| Home (overview, education, contact) | `/`                  |
| Web Development                  | `/web-development`      |
| IT Operations                    | `/it-operations`        |
| Business & Data Analytics        | `/data-analytics`       |
| Data Entry & Administration      | `/data-administration`  |
| Photography & Videography        | `/photo-video`          |

Each area page has: an introduction, "What I do", skills & tools, relevant coursework (from the Information Technology Solutions program), projects, and a call to action.

The Photography & Videography page is different: a filterable photo gallery with a full-screen viewer, plus a video section (YouTube, Vimeo or your own video files).

This README explains how the project is set up, how to run it, how to customise it, and how to deploy it.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Project structure](#project-structure)
3. [How it works](#how-it-works)
4. [Getting started](#getting-started)
5. [Available scripts](#available-scripts)
6. [Customising the content](#customising-the-content)
7. [Setting up the contact form email](#setting-up-the-contact-form-email)
8. [Environment variables](#environment-variables)
9. [Deployment](#deployment)
10. [Next steps / ideas](#next-steps--ideas)

---

## Tech stack

| Part     | Technology                     | Why                                                             |
| -------- | ------------------------------ | --------------------------------------------------------------- |
| Frontend | React 19 + TypeScript          | Component-based UI; TypeScript catches mistakes early           |
| Routing  | React Router                   | Separate URL for each area page, without full page reloads      |
| Build    | Vite                           | Fast dev server with instant reload; optimised production build |
| Styling  | Tailwind CSS v4                | Utility classes, so no separate CSS files to maintain            |
| Backend  | Node.js 22 + Express 5         | Small REST API that handles contact-form submissions            |
| Email    | Nodemailer                     | Sends contact messages to your inbox over SMTP                  |
| Hosting  | Vercel                         | Hosts the site and runs `client/api/` as serverless functions   |
| Security | Helmet, CORS, rate limiting, honeypot | Safe HTTP headers, restricts who can call the API, blocks spam |
| Dev tool | concurrently                   | Runs client and server with one command                         |

> **Note:** Express *is* a Node.js framework. Node.js runs JavaScript on the server, and Express makes building an API on it easier.

---

## Project structure

```
My-Portfolio/
├── package.json            # Root scripts: run client + server together
├── README.md               # This file
│
├── client/                 # React website (what visitors see)
│   ├── index.html          # HTML entry point: page title, meta description, fonts
│   ├── vite.config.ts      # Vite config + dev proxy (/api → http://localhost:5000)
│   ├── .env.example        # Template for client env vars
│   ├── api/                # ⭐ Backend code deployed by Vercel as serverless functions
│   │   ├── contact.js      # POST /api/contact: rate limit, spam check, validation
│   │   └── _lib/mailer.js  # Sends the email with Nodemailer ("_" = not a URL)
│   ├── vercel.json         # Sends every URL to index.html so page links work on Vercel
│   ├── public/             # Static files served as-is (favicon, resume.pdf, images)
│   │   ├── photography/    # Your resized photos (made by `npm run photos`)
│   │   └── _redirects      # Same as vercel.json, for Netlify
│   └── src/
│       ├── main.tsx        # Mounts the React app (wrapped in the router)
│       ├── App.tsx         # Routes: "/" + one route per focus area + 404
│       ├── index.css       # Tailwind import + global styles
│       ├── data/
│       │   └── portfolio.ts   # ⭐ ALL your content: profile, focus areas, education, jobs
│       ├── pages/
│       │   ├── Home.tsx          # Hero → expertise cards → about → education → experience → contact
│       │   ├── FocusAreaPage.tsx # ONE template used by all four area pages
│       │   ├── CreativePage.tsx  # Photography & Videography page
│       │   └── NotFound.tsx      # 404 page
│       └── components/
│           ├── Layout.tsx     # Navbar + page + footer; handles scroll on page change
│           ├── Navbar.tsx     # Links to each area page (highlighted when active)
│           ├── Hero.tsx       # Intro: name, role, area chips, buttons, social links
│           ├── FocusAreas.tsx # Home page cards linking to each area page
│           ├── About.tsx
│           ├── Education.tsx
│           ├── Experience.tsx # Work history timeline
│           ├── ProjectCard.tsx
│           ├── Gallery.tsx    # Photo grid + category filters + full-screen viewer
│           ├── VideoCard.tsx  # YouTube / Vimeo / self-hosted video player
│           ├── CreativeTeaser.tsx # "Beyond IT" preview on the home page
│           ├── Contact.tsx    # Contact form → POST /api/contact
│           ├── Footer.tsx
│           ├── Section.tsx    # Shared wrapper for consistent section styling
│           └── accents.ts     # Colour theme per area (sky, emerald, violet, amber)
│
└── server/                 # Express server for LOCAL development
    ├── .env.example        # Template for server env vars (copy to .env)
    └── src/
        ├── index.js        # Starts the server on PORT (default 5000)
        └── app.js          # Express app: security middleware, mounts client/api/contact.js
```

---

## How it works

```
 Browser                      Vite dev server (5173)           Express API (5000)
 ───────                      ──────────────────────           ──────────────────
 Loads the React site  ─────► serves client/src
 Submits contact form  ─────► /api/contact is proxied  ──────► client/api/contact.js
                                                               ├─ rate limit (5 per 15 min)
                                                               ├─ honeypot spam check
                                                               ├─ validate name/email/message
                                                               └─ _lib/mailer.js → your inbox
 Shows success/error   ◄───────────────────────────────────── JSON response
```

- **Pages:** React Router maps each URL to a page. The four area pages all use the same `FocusAreaPage` template, and the content for each comes from its entry in `focusAreas` in `portfolio.ts`. Adding a fifth area is just adding another entry to that list; the route, navbar link and home page card are created automatically.
- **One copy of the backend code.** The contact form's backend lives in `client/api/contact.js`. On the live site, Vercel runs it as a serverless function at `/api/contact`. Locally, the Express server mounts the exact same file, so what you test is what gets deployed.
- **In development** the React app calls `/api/contact`. Vite's proxy (in `vite.config.ts`) forwards it to Express on port 5000.
- **In production** the site and `/api/contact` are served from the same Vercel domain, so no API URL or CORS setup is needed.
- **Safety:** if the email settings are missing on the live site, the form shows an error instead of pretending the message was sent. (Locally, messages are just printed in the terminal.)

### API endpoints

| Method | Path           | Description                                         |
| ------ | -------------- | --------------------------------------------------- |
| GET    | `/api/health`  | Health check, returns `{ "status": "ok" }`           |
| POST   | `/api/contact` | Body: `{ name, email, message }` → `{ ok: true }` or `{ error }` |

---

## Getting started

### Prerequisites

- **Node.js 22 or newer**: check with `node -v`
- **npm**: comes with Node

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

This installs the root, `client/` and `server/` dependencies.

### 2. (Optional) Configure the server

```bash
cp server/.env.example server/.env
```

You can skip this at first. Without SMTP settings, contact-form messages are **printed in the server terminal** instead of emailed, which is fine for development.

### 3. Run both apps

```bash
npm run dev
```

- Website: <http://localhost:5173>
- API: <http://localhost:5000/api/health>

Edits to the client reload the browser instantly. Edits to the server restart it automatically.

---

## Available scripts

Run from the **project root**:

| Command               | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm run install:all` | Install dependencies for root, client and server    |
| `npm run dev`         | Run client + server together in development         |
| `npm run build`       | Build the client for production into `client/dist/` |
| `npm start`           | Start the server in production mode                 |

Inside `client/`: `npm run dev`, `npm run build`, `npm run preview` (preview the production build), `npm run lint`.
Inside `server/`: `npm run dev` (auto-restart on changes), `npm start`.

---

## Customising the content

Almost everything you need to change is in **one file**: [`client/src/data/portfolio.ts`](client/src/data/portfolio.ts).

| What                           | Where                                                   |
| ------------------------------ | ------------------------------------------------------- |
| Name, role, tagline, email, socials | `profile` in `portfolio.ts`                        |
| About paragraphs               | `about` in `portfolio.ts`                               |
| Education                      | `education` in `portfolio.ts`                           |
| Area pages (summary, what I do, skills, coursework, projects) | each entry in `focusAreas` in `portfolio.ts` |
| Area colour                    | `accent` on the area: `sky`, `emerald`, `violet` or `amber` (see `accents.ts`) |
| Projects                       | `projects` inside each focus area (`liveUrl`/`repoUrl` are optional) |
| Work experience                | `experience` in `portfolio.ts`                          |

> Search `portfolio.ts` for **`TODO`** to find every placeholder that still needs your real details.

### Animations

All animations are built with plain CSS and small React components, with no animation library, and they're switched off automatically for visitors who have "reduce motion" turned on in their device settings.

| Animation | Where | How to adjust |
| --- | --- | --- |
| Opening animation (hero items slide up in turn) | `components/Hero.tsx` | Change the `delay(ms)` values |
| Rotating "I work in ___" line | `components/RotatingRole.tsx` | Speeds at the top of the file; words come from the page titles |
| Drifting colour glows | `components/Hero.tsx` (background) | Colours/sizes on the glow `div`s; speed in `index.css` (`--animate-drift`) |
| Data network (dots + lines, follows the mouse) | `components/NetworkCanvas.tsx` | `LINK_DISTANCE`, `MOUSE_DISTANCE`, dot count in `resize()` |
| Scrolling tools strip | `components/SkillsMarquee.tsx` | Tools list: `toolbelt` in `portfolio.ts`; speed: `--animate-marquee` in `index.css` |
| Number counters | `components/Stats.tsx` | Numbers: `stats` in `portfolio.ts`; speed: `DURATION` |
| Card spotlight + 3D tilt | `components/FocusAreas.tsx` | `MAX_TILT` |
| Sections fade in on scroll (all pages) | `components/Reveal.tsx`, used by `Section.tsx` | Duration/distance classes in `Reveal.tsx` |
| Scroll progress bar | `components/Navbar.tsx` | Gradient colours on the bar `div` |

**Inner pages** (the four area pages + Photo & Video) use a separate, quieter set of effects:

| Animation | Where | How to adjust |
| --- | --- | --- |
| Header: title words rise in, underline draws, grid drifts, light sweeps the bottom edge | `components/PageHeader.tsx` | Speeds: `--animate-rise`, `--animate-grid-pan`, `--animate-sweep` in `index.css` |
| Section headings wipe in, accent bar draws across | `components/Section.tsx` (`variant="draw"`) | Duration classes in the `draw` branch |
| "What I do" slide in / skills pop in / coursework wipe in / projects come into focus | `Stagger.tsx` + `staggerStyles.ts`, used in `pages/FocusAreaPage.tsx` | Effects in `staggerStyles.ts`; spacing via `staggerDelay(index, step, start)` |
| Photos "develop" from grey and soft to full colour | `components/Gallery.tsx` (`GalleryItem`) | `duration-1200` and the starting classes |
| Light circling the call-to-action box border | `components/CtaBox.tsx` | Speed: `--animate-border-spin` in `index.css` |

### Adding photos and videos

**Photos**
No cropping is needed: the gallery keeps every photo's original shape (portrait, landscape or square). Only the first three photos, which are previewed on the home page, are shown cropped to portrait 3:4, so put portrait shots first.

1. Copy your full-size photos (`.jpg`, `.png`, `.webp`, `.tif` or `.avif`) into **`client/photo-originals/`**. This folder is not committed to Git.
2. From the `client` folder, run:
   ```bash
   npm run photos
   ```
   This makes web-ready `.webp` copies in `client/public/photography/`, at most 1600px on the longest side, without changing their shape. It prints each new size, e.g. `1200x1600  2.3 MB -> 248 KB`. Photos already converted are skipped.
3. List each photo in `creative.photos` in `portfolio.ts`, using the width and height the script printed:
   ```ts
   { src: '/photography/IMG_1234.webp', width: 1200, height: 1600, alt: 'Describe the photo', category: 'Cityscapes', caption: 'Short caption' },
   ```
   The filter buttons are created automatically from the `category` values.

> iPhone **.HEIC** photos aren't supported by the script. Export them as JPEG first (on iPhone: Settings → Camera → Formats → Most Compatible, or export from the Photos app).

**Videos**: add entries to `creative.videos`. Hosting on **YouTube or Vimeo is recommended**, since video files are large and those services handle streaming:
```ts
{ title: 'Showreel 2026', description: 'Highlights from recent shoots.', youtubeId: 'abc123XYZ' },  // youtube.com/watch?v=abc123XYZ
{ title: 'Event recap', vimeoId: '123456789' },                                                    // vimeo.com/123456789
{ title: 'Short film', src: '/videos/short-film.mp4', poster: '/videos/short-film.jpg' },          // file in client/public/videos/
```
The Videography section is hidden on the live site until at least one video is added.
| Resume                         | Put your PDF at `client/public/resume.pdf`              |
| Browser tab title & SEO description | `client/index.html`                                |
| Favicon (the "YN" initials)    | `client/public/favicon.svg`                             |
| Colours / fonts                | Tailwind classes in components (accent colour is `sky-*`), font in `index.css` |
| Add/remove/reorder sections    | `client/src/App.tsx`                                    |

---

## Setting up the contact form email

1. Copy `server/.env.example` to `server/.env`.
2. Fill in the SMTP values. Example for **Gmail**:
   1. Turn on 2-Step Verification for your Google account.
   2. Create an **App Password**: Google Account → Security → App passwords.
   3. Set:
      ```env
      SMTP_HOST=smtp.gmail.com
      SMTP_PORT=465
      SMTP_USER=you@gmail.com
      SMTP_PASS=your-16-character-app-password
      CONTACT_TO_EMAIL=you@gmail.com
      ```
3. Restart the server and send a test message from the site.

Other providers (Outlook, Zoho, or services like Resend, Brevo or SendGrid) work the same way with their SMTP details.

> ⚠️ Never commit `.env`. It's already listed in `.gitignore`.

---

## Environment variables

The same email settings are used in two places:

- **Locally:** in `server/.env` (never committed).
- **On the live site:** in Vercel → your project → **Settings → Environment Variables**.

| Variable           | Required  | Default                 | Description                                   |
| ------------------ | --------- | ----------------------- | --------------------------------------------- |
| `SMTP_HOST`        | For email | –                       | SMTP server host, e.g. `smtp.gmail.com`       |
| `SMTP_PORT`        | No        | `587`                   | `465` = SSL, `587` = STARTTLS                  |
| `SMTP_USER`        | For email | –                       | SMTP username (usually your email)            |
| `SMTP_PASS`        | For email | –                       | SMTP password / Gmail App Password            |
| `CONTACT_TO_EMAIL` | No        | `SMTP_USER`             | Where contact messages are delivered          |
| `PORT`             | No        | `5000`                  | Local Express server only                     |
| `CLIENT_ORIGIN`    | No        | `http://localhost:5173` | Local Express server only: allowed site(s)    |

---

## Deployment

Everything (the website **and** the contact form backend) is hosted on **Vercel**, free tier.

### First deploy

1. On [Vercel](https://vercel.com): **Add New → Project** → import the GitHub repo.
2. Settings:
   - **Root Directory:** `client` ⚠️ important: the repo contains both `client` and `server`, and Vercel should only build `client`.
   - **Framework preset:** Vite (auto-detected). Leave the build/output/install commands on their defaults.
3. **Environment Variables:** add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `CONTACT_TO_EMAIL` (see the table above). Without them the site works, but the contact form shows an error.
4. Deploy.

`client/vercel.json` makes page URLs like `/it-operations` work when opened directly or refreshed, while leaving `/api/...` for the backend. (On Netlify, `client/public/_redirects` does the page part, but the `api/` functions are Vercel-specific.)

### Updating the live site

Every `git push` to `main` redeploys automatically.

> **Changed an environment variable?** Vercel only applies it to *new* deployments. Go to **Deployments → ⋯ → Redeploy** on the latest one.

### Deployment checklist

- [ ] Replaced every `TODO` placeholder in `portfolio.ts`
- [ ] Added `client/public/resume.pdf` (without your phone number)
- [ ] Root Directory set to `client` in Vercel
- [ ] SMTP environment variables set in Vercel, redeployed, and a test message received

---

## Next steps / ideas

- Add project screenshots (put images in `client/public/projects/` and add an `image` field to projects)
- Dark/light mode toggle
- Scroll animations (e.g. Framer Motion)
- A blog section
- Analytics (Vercel Analytics, Plausible)
- Tests (Vitest for the client, Supertest for the API)
