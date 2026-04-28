# Reaction Challenge Pro

## Capstone — CIS 486 | Andrew McElvey

### App Idea

A full-stack upgrade of my existing Reaction Challenge mini-app. Refactored into a clean MVC architecture with JWT authentication, Mongoose, a polished Bootstrap 5 UI, leaderboard search, and deployed to GCP with CI/CD.

### User Stories

- **As a** player, **I want to** test my reaction time and play the game without needing an account, **so that** I can enjoy the game casually.
- **As a** player, **I want to** register with a gamertag and log in, **so that** my scores are saved and appear on the leaderboard.
- **As a** player, **I want to** submit or skip saving my score after each game, **so that** I only add scores I'm proud of.
- **As a** player, **I want to** delete my own scores from the leaderboard, **so that** I can manage my entries.
- **As a** player, **I want to** search the leaderboard by player name, **so that** I can find specific players.

### Features

- User registration and login with JWT authentication
- Reaction-time game with score submission popup
- Global leaderboard with real-time search filtering
- Users can delete their own scores
- Responsive Bootstrap 5 UI
- Deployed to GCP with Nginx + PM2
- CI/CD via GitHub Actions

### Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES6 modules) |
| Framework | Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Frontend | HTML / CSS / JS / Bootstrap 5 |
| Deployment | GCP, Nginx, PM2 |
| CI/CD | GitHub Actions |
| Dev Deployment | Render |

### Capability Boxes (70 pts)

| # | Box | Pts | Issue |
|---|-----|-----|-------|
| 1 | Architecture | 10 | [#1](https://github.com/andrewmcelvey2/cis-486-capstone/issues/1) |
| 2 | Authentication | 10 | [#2](https://github.com/andrewmcelvey2/cis-486-capstone/issues/2) |
| 3 | Database | 10 | [#3](https://github.com/andrewmcelvey2/cis-486-capstone/issues/3) |
| 4 | UI/UX | 10 | [#4](https://github.com/andrewmcelvey2/cis-486-capstone/issues/4) |
| 5 | Deployment | 10 | [#5](https://github.com/andrewmcelvey2/cis-486-capstone/issues/5) |
| 6 | Database Navigation | 10 | [#6](https://github.com/andrewmcelvey2/cis-486-capstone/issues/6) |
| 7 | Debug and Test | 10 | [#7](https://github.com/andrewmcelvey2/cis-486-capstone/issues/7) |

### Milestones

| Milestone | Target | Link |
|-----------|--------|------|
| Proposal & Repo Setup | April 2 | [View](https://github.com/andrewmcelvey2/cis-486-capstone/milestone/1) |
| Architecture + Auth + Database | April 14 | [View](https://github.com/andrewmcelvey2/cis-486-capstone/milestone/2) |
| UI / UX Overhaul | April 23 | [View](https://github.com/andrewmcelvey2/cis-486-capstone/milestone/3) |
| Deployment + Clean-up | April 30 | [View](https://github.com/andrewmcelvey2/cis-486-capstone/milestone/4) |

### Access

- **Repo:** [cis-486-capstone](https://github.com/andrewmcelvey2/cis-486-capstone)
- **Collaborator:** [@barrycumbie](https://gist.github.com/barrycumbie)
- **Production:** [machine.barrycumbie.com](http://machine.barrycumbie.com)
- **Dev:** [reaction-challenge-pro.onrender.com](https://reaction-challenge-pro.onrender.com)
- **GCP SSH:** Configured with `student-key`
