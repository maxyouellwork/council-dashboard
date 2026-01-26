# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kirklees Communications Analytics Hub** is an internal link tracking and analytics system for Kirklees Council. It provides:
- UTM link creation and management (via `utm-admin.html`)
- Campaign performance analytics and reporting (via `utm-dashboard.html`, `utm-summary.html`, `campaign-utm-dashboard.html`)
- QR code generation for print materials
- Email campaign tracking (via Granicus integration)
- Quarterly report generation

Data is stored in **Airtable** (Base ID: `app5iqmIuu0sOTocu`) with real-time API access from the frontend.

## Live URLs

- **Production**: https://wip.maxyouell.co.uk/council-dashboard/
- **Direct Pages URL**: https://council-dashboard.pages.dev/
- **GitHub**: https://github.com/maxyouellwork/council-dashboard

**Authentication** (Basic Auth):
- Username: `kirklees`
- Password: `comms2026`

## Technology Stack

- **Frontend**: Vanilla HTML5 + JavaScript (no framework)
- **Charting**: Chart.js (CDN)
- **QR Codes**: qrcode@1.5.1 library
- **Data**: Airtable API (direct client-side calls)
- **Build**: Vite
- **Hosting**: Cloudflare Pages
- **Routing**: Cloudflare Worker (`wip-router`)
- **Auth**: Basic Auth via Worker + Pages Functions middleware

## Project Structure

```
utm-dashboard/
├── index.html                    # Hub/landing page linking all dashboards
├── utm-admin.html                # Link creation form with QR generation
├── utm-dashboard.html            # Full analytics dashboard with filters
├── utm-summary.html              # Executive summary (30-day snapshot)
├── campaign-utm-dashboard.html   # Campaign-focused tracking view
├── campaign-results.html         # Single campaign results view
├── email-bulletins-dashboard.html # Email bulletin analytics
├── quarterly-export-generator.html # PowerPoint report generator
├── granicus-dashboard.html       # Granicus email platform analytics
├── granicus-import.html          # Bulk Granicus data import
│
├── config.js                     # API keys (NOT committed - in .gitignore)
├── config.example.js             # Template for config.js
│
├── functions/
│   └── _middleware.js            # Cloudflare Pages auth middleware
│
├── wip-router/                   # Cloudflare Worker for path routing
│   ├── wrangler.toml
│   └── src/index.js
│
├── scripts/
│   └── build.js                  # Build script with env var injection
│
├── vite.config.js                # Vite config for multi-page build
├── package.json
└── dist/                         # Built output (not committed)
```

## Development Commands

```bash
# Install dependencies
npm install

# Local development server (hot reload)
npm run dev

# Build for production (uses config.js)
npm run build:local

# Build for CI/CD (uses environment variables)
npm run build

# Preview production build
npm run preview
```

## Configuration

### Local Development

1. Copy `config.example.js` to `config.js`
2. Add your Airtable API key:
```javascript
window.CONFIG = {
  AIRTABLE_API_KEY: "your-key-here",
  AIRTABLE_BASE_ID: "app5iqmIuu0sOTocu"
};
```

### Production (Cloudflare)

Environment variables are set in Cloudflare Pages:
- `AIRTABLE_API_KEY` - Airtable Personal Access Token

## Deployment

### Deploying Updates

```bash
# 1. Build the project
npm run build:local

# 2. Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name council-dashboard --branch main

# 3. If worker routing changed, also deploy the worker
cd wip-router && wrangler deploy
```

### Architecture

```
User Request
     │
     ▼
┌─────────────────────────────────┐
│  wip.maxyouell.co.uk/*          │
│  (Cloudflare Worker: wip-router)│
│  - Basic Auth check             │
│  - Routes /council-dashboard/*  │
│    to Pages project             │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│  council-dashboard.pages.dev    │
│  (Cloudflare Pages)             │
│  - _middleware.js (Basic Auth)  │
│  - Static HTML files            │
│  - config.js (API keys)         │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│  Airtable API                   │
│  - UTMLinks table               │
│  - GranicusBulletins table      │
│  - GranicusLinks table          │
└─────────────────────────────────┘
```

### Worker Routing (wip-router)

The `wip-router` Worker handles:
1. Basic authentication for all requests
2. Redirects `/council-dashboard` → `/council-dashboard/` (trailing slash for relative links)
3. Proxies requests to the Pages project
4. Serves an index page at `wip.maxyouell.co.uk/`

To add more projects to `wip.maxyouell.co.uk`:
```javascript
// In wip-router/src/index.js
const routes = {
  '/council-dashboard': 'https://council-dashboard.pages.dev',
  '/new-project': 'https://new-project.pages.dev',
};
```

### DNS Configuration

`wip.maxyouell.co.uk` requires a DNS record in Cloudflare:
- Type: AAAA
- Name: wip
- Content: `100::`
- Proxy: Enabled (orange cloud)

## Airtable Schema

### UTMLinks Table
| Field | Type | Description |
|-------|------|-------------|
| Code | Text | Short code for URL |
| BaseURL | URL | Original destination URL |
| FinalURL | URL | Full URL with UTM params |
| Campaign | Text | utm_campaign value |
| Source | Text | utm_source value |
| Medium | Text | utm_medium value |
| Content | Text | utm_content value |
| Channel | Select | High-level channel (Email, Social, etc.) |
| Owner | Text | Who created the link |
| Notes | Text | Additional notes |
| ShortURL | URL | kirklees.link short URL |
| Clicks | Number | Click count |
| Active | Checkbox | Is link active |
| Date | Date | Creation date |

### GranicusBulletins Table
Email bulletin metadata imported from Granicus reports.

### GranicusLinks Table
Individual link performance from email bulletins.

## Changing Authentication

### Update Password

1. Update `wip-router/src/index.js`:
```javascript
const validUser = env.AUTH_USER || 'newuser';
const validPass = env.AUTH_PASS || 'newpassword';
```

2. Update `functions/_middleware.js`:
```javascript
const AUTH_USER = env.AUTH_USER || 'newuser';
const AUTH_PASS = env.AUTH_PASS || 'newpassword';
```

3. Redeploy both:
```bash
cd wip-router && wrangler deploy
cd .. && npm run build:local && wrangler pages deploy dist --project-name council-dashboard
```

Or set environment variables in Cloudflare dashboard for `AUTH_USER` and `AUTH_PASS`.

## Troubleshooting

### Links not working / 404 errors
- Ensure URLs include `/council-dashboard/` prefix
- Check trailing slash: `/council-dashboard/` not `/council-dashboard`

### Auth not working
- Clear browser cache/cookies
- Check both Worker and Pages middleware are deployed

### API errors
- Verify `config.js` exists and has valid API key
- Check Airtable API key hasn't expired

### DNS issues
- Flush local DNS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- Wait 1-2 minutes for propagation

## Git Workflow

```bash
# Make changes, then:
git add -A
git commit -m "Description of changes"
git push origin main

# Then deploy (not automatic):
npm run build:local
wrangler pages deploy dist --project-name council-dashboard
```

Note: GitHub repo does NOT contain API keys. The `config.js` file is in `.gitignore`.
