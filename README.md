# Pro Reaction Challenge

## Capstone Proposal — CIS 486

### App Idea

A full-stack upgrade of my existing Reaction Challenge mini-app. I will take the current working app and refactor it into a clean, modern architecture with authentication, Mongoose, a polished UI, leaderboard search and filtering, and proper GCP deployment — all fully documented.

### Target Users

- **Players** — Test reaction time, compete on a leaderboard, track personal scores
- **Admin** — Manage all scores and user records via protected routes

### Features

- User registration and login with protected routes
- Reaction-time game with score submission option
- Global leaderboard with search and filtering
- Admin dashboard for managing records
- Responsive Bootstrap 5 UI
- Deployed to GCP with Nginx + PM2

### Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES6 modules) |
| Framework | Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Auth | express-session + bcrypt |
| Frontend | HTML / CSS / JS / Bootstrap 5 |
| Deployment | GCP, Nginx, PM2 |
| CI/CD | GitHub Actions |

### Milestones

| Milestone | Target |
|-----------|--------|
| Proposal & Repo Setup | April 2 |
| Architecture + Authentication + Database | April 14 |
| UI / UX Overhaul | April 23 |
| Deployment + Clean-up | April 30 |

### Access

- **Repo:** [cis-486-capstone](https://github.com/andrewmcelvey2/cis-486-capstone)
- **Collaborator:** [@barrycumbie](https://gist.github.com/barrycumbie)
- **GCP SSH:** Configured with `student-key` - TBD (Setting up a new, clean VM)
- **Live App:** [machine.barrycumbie.com](https://machine.barrycumbie.com)
