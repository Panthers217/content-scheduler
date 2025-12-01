# Video Recording Action List — Content Scheduler Demo

This is your step-by-step action guide for recording the Content Scheduler demo video. Follow each action in sequence to showcase the full-stack features that will impress employers.

---

## Pre-Recording Setup
- [ ] Clear browser cache and open app in a fresh tab
- [ ] Set browser zoom to 100%
- [ ] Close unnecessary tabs and applications
- [ ] Open VS Code with project files ready
- [ ] Start both backend and frontend servers
- [ ] Test audio levels with a 5-second test recording
- [ ] Have screen recording software ready (OBS, QuickTime, etc.)

---

## Recording Actions (Follow in Order)

### Section 1: Opening & Tech Stack (0:00–0:30)
- [ ] **Action 1.1:** Show title card slide with project name and your name
- [ ] **Action 1.2:** Navigate to app homepage (show the gradient background and navbar)
- [ ] **Action 1.3:** Pause on the demo banner at the top (shows portfolio intent)
- [ ] **Action 1.4:** Hover over navigation items (Scheduler, Dashboard, Calendar, Analytics, Team)

**What to say:** "Full-stack app with React, Tailwind, Node/Express, and MongoDB."

---

### Section 2: Scheduler — Create a Post (0:30–0:50)
- [ ] **Action 2.1:** Click "Scheduler" in the navbar
- [ ] **Action 2.2:** Scroll to show the entire form
- [ ] **Action 2.3:** Fill in the title: "Q4 Product Launch Announcement"
- [ ] **Action 2.4:** Select platform: "Twitter"
- [ ] **Action 2.5:** Type content: "Excited to announce our new product features!"
- [ ] **Action 2.6:** Select category: "Marketing"
- [ ] **Action 2.7:** Add tags: "product, launch, Q4"
- [ ] **Action 2.8:** Click the date picker and select a future date
- [ ] **Action 2.9:** Set time to 10:00 AM
- [ ] **Action 2.10:** Click "Schedule Post" button
- [ ] **Action 2.11:** Show success message/notification
- [ ] **Action 2.12:** Scroll down to see the new post in the posts list

**What to highlight:** "Form validation, date picker, real-time API calls to backend."

---

### Section 3: Template Feature (0:50–1:00)
- [ ] **Action 3.1:** Click "Load from Template" or template dropdown (if available)
- [ ] **Action 3.2:** Show template being populated into the form
- [ ] **Action 3.3:** Point out how templates speed up content creation

**What to highlight:** "Reusable templates for efficiency — practical feature for content teams."

---

### Section 4: Calendar View (1:00–1:15)
- [ ] **Action 4.1:** Click "Calendar" in the navbar
- [ ] **Action 4.2:** Show the month view with posts displayed as colored dots/badges
- [ ] **Action 4.3:** Click on a date that has scheduled posts
- [ ] **Action 4.4:** Show the modal/panel with post details for that day
- [ ] **Action 4.5:** Switch to "Week" view
- [ ] **Action 4.6:** Switch to "Day" view
- [ ] **Action 4.7:** Navigate forward and backward using the arrow buttons

**What to highlight:** "Responsive calendar with multiple view modes — built from scratch with React state management."

---

### Section 5: Analytics Dashboard (1:15–1:30)
- [ ] **Action 5.1:** Click "Analytics" in the navbar
- [ ] **Action 5.2:** Show metric cards (Total Posts, Views, Clicks, Engagement Rate)
- [ ] **Action 5.3:** Scroll to performance chart
- [ ] **Action 5.4:** Point to platform breakdown (pie chart or bar chart)
- [ ] **Action 5.5:** Show category performance section
- [ ] **Action 5.6:** Click on a top-performing post to highlight it

**What to highlight:** "Real-time analytics with MongoDB aggregation, data visualization, and performance tracking."

---

### Section 6: Dashboard Overview (1:30–1:40)
- [ ] **Action 6.1:** Click "Dashboard" in the navbar
- [ ] **Action 6.2:** Show upcoming posts section
- [ ] **Action 6.3:** Show recent activity/status indicators
- [ ] **Action 6.4:** Hover over post status badges (scheduled, published, draft)
- [ ] **Action 6.5:** Show any charts or summary widgets

**What to highlight:** "Central hub with status tracking and quick actions."

---

### Section 7: Team Management (1:40–1:50)
- [ ] **Action 7.1:** Click "Team" in the navbar
- [ ] **Action 7.2:** Show team member cards with roles and avatars
- [ ] **Action 7.3:** Click "Add Member" button
- [ ] **Action 7.4:** Fill in name: "Jane Smith"
- [ ] **Action 7.5:** Select role: "Content Creator"
- [ ] **Action 7.6:** Add email: "jane@example.com"
- [ ] **Action 7.7:** Click "Add Member"
- [ ] **Action 7.8:** Show new member in the list

**What to highlight:** "CRUD operations, form handling, and team collaboration features."

---

### Section 8: Demo Data Protection (1:50–2:05)
- [ ] **Action 8.1:** Navigate to a post list view (Dashboard or Scheduler)
- [ ] **Action 8.2:** Identify a post with the demo badge/indicator (usually has 💡 or "Demo" label)
- [ ] **Action 8.3:** Click "Delete" on a demo post
- [ ] **Action 8.4:** Show the protection message: "This is demo data and cannot be deleted"
- [ ] **Action 8.5:** Navigate to Team page
- [ ] **Action 8.6:** Try to delete a demo team member
- [ ] **Action 8.7:** Show the same protection behavior

**What to highlight:** "Production-ready pattern for demo environments — preserves sample data while allowing user experimentation."

---

### Section 9: Responsive Design (2:05–2:20)
- [ ] **Action 9.1:** Resize browser window from desktop to tablet width
- [ ] **Action 9.2:** Show navbar collapsing or adjusting
- [ ] **Action 9.3:** Show calendar grid adjusting to smaller cells
- [ ] **Action 9.4:** Resize to mobile width
- [ ] **Action 9.5:** Navigate through different pages to show mobile responsiveness
- [ ] **Action 9.6:** Expand back to desktop

**What to highlight:** "Mobile-first design with Tailwind breakpoints and custom media queries."

---

### Section 10: Code Walkthrough (2:20–2:50)
- [ ] **Action 10.1:** Switch to VS Code
- [ ] **Action 10.2:** Show project folder structure (frontend, backend, mongodb-init)
- [ ] **Action 10.3:** Open `frontend/src/App.jsx` — point to routing setup
- [ ] **Action 10.4:** Open `frontend/src/components/Calendar.jsx` — show state management
- [ ] **Action 10.5:** Scroll to calendar grid logic and responsive classes
- [ ] **Action 10.6:** Open `frontend/tailwind.config.cjs` — show custom breakpoints
- [ ] **Action 10.7:** Open `backend/server.js` — show Express setup and routes
- [ ] **Action 10.8:** Open `backend/models/Post.js` — highlight schema with analytics fields
- [ ] **Action 10.9:** Point to `isDemoData` flag in the model
- [ ] **Action 10.10:** Open `backend/routes/posts.js` — show demo protection logic in DELETE route

**What to highlight:** "Clean architecture, separation of concerns, reusable components, MongoDB models with validation."

---

### Section 11: Running Locally (2:50–3:05)
- [ ] **Action 11.1:** Open terminal split view (or two terminals)
- [ ] **Action 11.2:** In first terminal, type: `cd backend`
- [ ] **Action 11.3:** Type: `npm install`
- [ ] **Action 11.4:** Type: `npm run dev`
- [ ] **Action 11.5:** Show backend server starting with port number
- [ ] **Action 11.6:** In second terminal, type: `cd frontend`
- [ ] **Action 11.7:** Type: `npm install`
- [ ] **Action 11.8:** Type: `npm run dev`
- [ ] **Action 11.9:** Show frontend dev server starting and opening browser

**What to highlight:** "Simple setup process — documented in README with environment variables."

---

### Section 12: Deployment & Production (3:05–3:15)
- [ ] **Action 12.1:** Show browser with production URL (Netlify/Render)
- [ ] **Action 12.2:** Show app running in production
- [ ] **Action 12.3:** Briefly show Netlify or Render dashboard (optional)
- [ ] **Action 12.4:** Point to deployment configuration files (netlify.toml, render.yaml)

**What to highlight:** "Production deployment with CI/CD, environment management, and live demo."

---

### Section 13: Bonus Features (3:15–3:25)
- [ ] **Action 13.1:** Show bulk upload feature (if implemented)
- [ ] **Action 13.2:** Show recurring posts setup
- [ ] **Action 13.3:** Show post export functionality
- [ ] **Action 13.4:** Show any advanced filtering or search

**What to highlight:** "Extra features that show attention to user experience and real-world use cases."

---

### Section 14: Closing (3:25–3:30)
- [ ] **Action 14.1:** Return to app homepage
- [ ] **Action 14.2:** Show navbar one more time with all routes
- [ ] **Action 14.3:** Display end card with:
  - Your name
  - GitHub repo URL
  - Live demo URL
  - Email or LinkedIn
  - "Available for Full-Stack Developer roles"

**What to say:** "Thanks for watching. Repo and live demo links are available. Happy to discuss any technical details in an interview."

---

## Post-Recording Checklist
- [ ] Review recording for audio quality
- [ ] Check that all actions are visible on screen
- [ ] Trim any dead air or long pauses
- [ ] Add lower-third text with your name and contact info
- [ ] Add timestamps in video description
- [ ] Add captions/subtitles for accessibility
- [ ] Export in 1080p MP4 format
- [ ] Upload to YouTube, Vimeo, or portfolio site
- [ ] Update resume/portfolio with video link

---

## Key Technical Points to Mention

### Frontend
- React with functional components and hooks
- React Router for SPA navigation
- Tailwind CSS with custom configuration
- Responsive design with custom breakpoints
- State management with useState and useEffect
- API integration with axios
- Form validation and error handling

### Backend
- Node.js + Express RESTful API
- MongoDB with Mongoose ODM
- Schema design with validation
- Demo data protection middleware
- Analytics aggregation
- CORS configuration for production
- Environment variable management

### Full-Stack Integration
- API communication patterns
- Error handling across layers
- Data protection and validation
- Production deployment strategy
- Environment-specific configurations

---

## Recording Tips
1. **Practice first:** Do a dry run without recording to get comfortable
2. **Speak slowly:** Technical content needs clear delivery
3. **Use a pointer:** Show mouse clicks and highlight sections
4. **Pause between sections:** Makes editing easier
5. **Show, don't just tell:** Let the UI and code speak
6. **Be enthusiastic:** Show passion for the project
7. **Keep moving:** Don't dwell too long on any one screen

---

Good luck with your recording! This comprehensive demo will showcase your full-stack skills effectively.
