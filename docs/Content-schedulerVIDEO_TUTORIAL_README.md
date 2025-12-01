# Content Scheduler — Short Video Walkthrough

This README contains a concise, employer-focused video script and recording checklist you can use to present the Content Scheduler project. It's optimized for a ~2 minute highlight video suitable for hiring managers and technical screeners.

---

## Title / Opening (0:00–0:10)
- On-screen: Title card with project name, your name, GitHub repo link, and a screenshot of the app.
- Narration: "Hi — I’m [Your Name]. This is Content Scheduler, a full‑stack content planning app that demonstrates scheduling UX, analytics, and production-ready patterns."

## One-line Summary + Tech Stack (0:10–0:30)
- On-screen: Small badges or short list: React, Tailwind CSS, Node/Express, MongoDB.
- Narration: "Built with React + Tailwind on the frontend, Node/Express and MongoDB on the backend. Key features: scheduler, calendar, analytics, templates, and demo-data protection."

## Live Demo — Core Flows (0:30–1:25)
1. Scheduler Flow (0:30–0:50)
   - On-screen: Open Scheduler route; fill title, platform, scheduled time; save.
   - Narration: "Create a post with title, platform, category, tags, and schedule time. Use templates or set recurring posts. Saved posts are persisted through the API."

2. Calendar (0:50–1:00)
   - On-screen: Switch to Calendar → Month view → click a date.
   - Narration: "Calendar gives month/week/day views and responsive cells for mobile. Click a day to view scheduled posts."

3. Analytics & Dashboard (1:00–1:10)
   - On-screen: Open Analytics; highlight one metric card and one chart.
   - Narration: "Analytics tracks views, clicks and engagement per post, surfacing trends and top performers."

4. Demo Data Protection (1:10–1:25)
   - On-screen: Attempt to delete a protected sample post and show the guard message.
   - Narration: "Sample data is protected so the demo stays intact — you can add and delete new content, but demo samples are preserved."

## Quick Code Highlights (1:25–1:40)
- On-screen: Show file tree and open these files briefly:
  - `frontend/src/App.jsx` — top-level layout and routes
  - `frontend/src/components/Calendar.jsx` — calendar grid and responsive behavior
  - `frontend/src/components/NavBar.jsx` — header + demo banner
  - `backend/models/Post.js` — analytics fields and `isDemoData` flag
- Narration: "`App.jsx` orchestrates layout and routes; `Calendar.jsx` manages the responsive grid; `Post` model includes analytics fields and demo protection logic."

## How to Run Locally (1:40–1:55)
- On-screen: Terminal with commands typed and run.
- Commands to display/copy:
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```
- Narration: "Install dependencies for both frontend and backend and run them in parallel. Make sure `.env` contains your MongoDB URI or use the provided `mongodb-init` demo scripts."

## Closing & CTA (1:55–2:00)
- On-screen: End card with GitHub repo link, live demo link (if available), your email or portfolio link.
- Narration: "Thanks for watching — the repo and live demo are in the README. I’d be happy to walk through any part of the code in a live interview."

---

## Recording & Editing Checklist (Quick)
- Keep total length ~2 minutes; stay tightly focused.
- Record in 720p or 1080p with terminal font ≥14px.
- Record voice in a quiet room; aim for short takes (10–30s) for each section.
- Use zooms and pointer highlights for UI and code lines you reference.
- Pause after running commands so viewers can read them; present commands as overlays.
- Add captions and a lower-third with your name and GitHub link.
- Export MP4; add a 3–5s title card and 5s closing contact card.

---

## Additional Tips for Interviewers
- Emphasize decisions: why Tailwind for rapid UI, why MongoDB for flexible modeling, and why simple REST endpoints for portability.
- Mention production considerations: demo data protection, validation to avoid cast errors, and simple analytics counters.
- Offer to dive deeper: routing, model design, or deployment details during interviews.

---

## Optional: 5–8 Minute Deep-Dive Structure (if requested)
- Expand each demo step with code walkthrough (4–5 minutes) and deeper discussion of design choices and trade-offs (1–2 minutes). If you want this, I can generate a shot-by-shot storyboard.

---

If you want this README in a different filename or format (PDF), tell me and I’ll generate it for download.