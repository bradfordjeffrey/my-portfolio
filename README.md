# Jeffrey Bradford Lamptey — Portfolio

My personal portfolio: IT operations, web development, data analytics, data administration, and photography.

**Built with:** React, TypeScript, Vite, Tailwind CSS, Express (Node.js), Nodemailer · hosted on Vercel

## Run locally

```bash
npm run install:all
npm run dev
```

Site: http://localhost:5173

For the contact form to send email locally, copy `server/.env.example` to `server/.env` and fill in the SMTP settings (Gmail needs an [App Password](https://myaccount.google.com/apppasswords)). Without it, messages are printed in the terminal.

## Edit content

All text lives in [`client/src/data/portfolio.ts`](client/src/data/portfolio.ts): profile, experience, education, projects, skills and photos.

**Adding photos:** put the originals in `client/photo-originals/`, run `npm run photos` inside `client/`, then add each one to `creative.photos` in `portfolio.ts`.

## Deploy

Pushing to `main` deploys to Vercel automatically (Root Directory: `client`).

The contact form needs these environment variables set in Vercel: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.
