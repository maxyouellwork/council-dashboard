# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kirklees UTM Studio Dashboard** is an internal link tracking and analytics system for Kirklees Council. It provides:
- UTM link creation and management (via `utm-admin.html`)
- Campaign performance analytics and reporting (via `utm-dashboard.html` and `utm-summary.html`)
- QR code generation for print materials
- Email campaign tracking (via Granicus integration)

Data is stored in **Airtable** (Base ID: `app5iqmIuu0sOTocu`, Table: `UTMLinks`) with real-time API access from the frontend.

## Technology Stack

- **Frontend**: Vanilla HTML5 + JavaScript (no framework)
- **Charting**: Chart.js (CDN)
- **QR Codes**: qrcode@1.5.1 library
- **Data**: Airtable API (direct client-side calls)
- **Build**: Vite
- **Deployment**: Cloudflare-ready (`.wrangler` config present)

## Project Structure

```
utm-dashboard/
├── utm-admin.html          # Link creation form (512 lines)
├── utm-dashboard.html      # Main analytics dashboard (928 lines)
├── utm-summary.html        # Executive summary view (727 lines)
├── granicus-dashboard.html # Email campaign analytics (1195 lines)
├── granicus-import.html    # Bulk Granicus data import (1019 lines)
├── images/                 # Static assets
├── package.json            # npm scripts (dev, build, preview)
└── .wrangler/              # Cloudflare Workers config
```

## Common Development Commands

```bash
# Local development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

After running `npm run dev`, the dashboard is accessible at `http://localhost:5173` (Vite default).

## Architecture & Key Concepts

### Single-File Page Architecture
Each HTML file is a complete, self-contained application with inline JavaScript and CSS. No separate build step is required to run—HTML files work directly.

### Data Flow

1. **Admin creates link** (utm-admin.html)
   - Form builds final URL with UTM parameters (campaign, source, medium, content)
   - Generates short code
   - Creates QR code
   - Saves to Airtable

2. **User clicks link** → Redirects with UTM parameters to analytics platforms

3. **Dashboards visualize** (utm-dashboard.html, utm-summary.html)
   - Fetch all records from Airtable API
   - Apply client-side filters (campaign, channel, date range, status)
   - Calculate KPIs and render charts

### Airtable Integration

- **API Key**: Embedded in HTML (intentionally public for internal staff use)
- **Fields**: Code, BaseURL, FinalURL, Campaign, Source, Medium, Content, Channel, Owner, Notes, ShortURL, Clicks, Active, Date
- **Direct API calls** from frontend (no backend proxy)

### UI/UX Patterns

- **Design System**: CSS custom properties (--bg, --card, --accent, etc.)
- **Responsive**: Mobile-first with flexbox layout
- **Consistent styling**: Rounded cards, shadows, gradient backgrounds across all pages

## Important Files & Line References

- **utm-dashboard.html**: Main dashboard with filters, KPIs, charts, and link table
  - Filters section: Apply campaign, channel, date range, and link status filters
  - Charts rendered with Chart.js

- **utm-admin.html**: Link creation interface
  - Form validation for UTM parameters
  - QR code generation and display
  - Airtable save functionality

- **utm-summary.html**: Executive snapshot focused on 30-day metrics
  - Simplified UI compared to full dashboard

- **granicus-dashboard.html**: Email platform analytics
- **granicus-import.html**: Bulk data import for Granicus campaign data

## Testing & Quality

Currently no automated tests are configured. Manual testing of:
- Airtable API connectivity and data retrieval
- Chart rendering with various data sets
- Form validation and link creation
- QR code generation accuracy
- Responsive design on mobile/tablet

## Deployment Notes

- Static hosting ready (any CDN, Vercel, Netlify, GitHub Pages)
- Optional Cloudflare Workers integration (for short link resolution at `kirklees.link`)
- HTML files are self-contained; no server-side rendering required
- Airtable API key must remain accessible in frontend code (intentional for internal use)

## Development Tips

- **Local testing without Airtable**: Modify JavaScript to use mock data instead of API calls
- **Chart.js options**: Refer to Chart.js documentation for customization
- **CSS updates**: Use CSS custom properties (root `--*` variables) for consistent theming
- **QR code generation**: Uses qrcode library; configure size and error correction in `generateQRCode()` function
