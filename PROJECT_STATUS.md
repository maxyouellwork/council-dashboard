# Kirklees UTM Dashboard - Project Status

**Last Updated:** 21 January 2026

## Executive Summary

Building a unified link tracking and campaign analytics system for Kirklees Council Communications team to eliminate manual quarterly reporting compilation across fragmented systems (Granicus, Orlo, Vuleio, Google Analytics, print).

**Current Status:** Prototype Phase - Core dashboards built, ready for leadership demo

---

## Problem Statement

**Current pain point:** Communications team manually compiles campaign data every quarter from 4+ different systems:
- **Granicus** (email marketing) - tracks opens/clicks
- **Orlo** (social media) - separate platform
- **Vuleio** (press releases) - separate platform
- **Print/Web short URLs** - manual/dispersed tracking
- **Google Analytics** - siloed UTM data

This manual compilation takes significant time and prevents real-time tracking of campaign performance.

**Solution:** Unified dashboard where officers create short links with UTM tracking, automatic click logging via Cloudflare Worker, and integrated reporting across all channels.

---

## What We've Built

### 1. **Cloudflare Worker: utm-redirector** ✅
- **Status:** Production-ready
- **Purpose:** Handles `kirklees.link/r/{code}` redirects
- **Functionality:**
  - Looks up short code in Airtable
  - **Automatically increments click counter** (fire-and-forget with ctx.waitUntil)
  - Redirects to final URL with UTM parameters
  - Read-only access to Airtable (no tampering)
- **Result:** Clicks are now automatically tracked, no manual entry needed

### 2. **Email Bulletins Dashboard** ✅
- **File:** `email-bulletins-dashboard.html`
- **Data Source:** Real 12-month Granicus export (120+ bulletins)
- **Shows:**
  - KPIs: Total bulletins, recipients, avg delivery rate
  - Timeline chart of bulletins sent over time
  - Breakdown by bulletin type (Weekly News, Read Kirklees, Staying Healthy, etc.)
  - Searchable/filterable table of all campaigns
  - Full historical visibility (Jan 2025 - Jan 2026)
- **Key Insight:** Shows council is already managing consistent, large-scale email campaigns (~17.6k recipients weekly)

### 3. **Campaign UTM Dashboard** ✅
- **File:** `campaign-utm-dashboard.html`
- **Status:** Demo data (realistic, ready to swap with real data)
- **Shows:**
  - 3 sample campaigns: Dewsbury Regeneration, Our Council, Connecting Kirklees
  - Total clicks per campaign
  - Clicks by channel (Email, Print, Social, Web)
  - Clicks by source/medium (granular UTM breakdown)
  - Referrer analysis (device, email client, QR scans)
  - Individual short link performance
- **Wow Factor:** Demonstrates unified tracking across channels in one view
- **Demo Data:** 11,205 total clicks across 3 campaigns with realistic distribution

### 4. **Admin Link Creation Form** ✅
- **File:** `utm-admin.html`
- **Purpose:** Create tracked short links with UTM parameters
- **Features:**
  - Form: Base URL, Campaign, Source, Medium, Content, Channel, Owner, Notes
  - Auto-generates short code or manual entry
  - QR code generation + download
  - Saves to Airtable with auto-increment click counter
  - No manual click tracking needed (Worker does it)

### 5. **Campaign Results View** ✅
- **File:** `campaign-results.html`
- **Purpose:** View single campaign performance + 5-week trend
- **Shows:**
  - Snapshot KPIs (sent, delivered, open rate, click rate)
  - 5-week trend chart showing engagement over time
  - Top links from campaign with click counts

---

## Data Architecture

### Airtable Tables
- **UTMLinks** (primary)
  - Code, BaseURL, FinalURL, Campaign, Source, Medium, Content, Channel, Owner, Notes, ShortURL, Clicks, Active, Date
  - Worker automatically increments `Clicks` on each redirect

- **GranicusBulletins** (optional, for batch imports)
  - Name, SentAt, Delivered, OpenRate, ClickRate, etc.
  - Currently: Manual PDF import via `granicus-import.html`

- **GranicusLinks** (optional, for batch imports)
  - URL, UniqueClicks, TotalClicks, Bulletin (linked record)

### Cloudflare Worker
- **utm-redirector:** Handles all short link redirects
- **Storage:** Updates click counts in Airtable automatically
- **Authentication:** X-AUTH-TOKEN header (GovDelivery API format)

---

## Key Metrics from Real Data (Email Bulletins)

**12-Month Period:** Jan 2025 - Jan 2026

| Metric | Value |
|--------|-------|
| Total Bulletins | 120+ |
| Total Recipients | 200k+ |
| Average Delivery Rate | 98.6% |
| Consistent Weekly News | ~17.6k recipients |
| Average Open Rate | 44% |
| Average Click Rate | Varies 5-12% (depends on content) |

**Insight for Leadership:** You're already running consistent, large-scale email campaigns. Adding unified short link tracking shows what actually drives engagement.

---

## Demo Campaign Data (UTM Dashboard)

**Three Sample Campaigns:**

1. **Dewsbury Regeneration**
   - Total Clicks: 3,245
   - Top Channel: Email (1,200 clicks, 37%)
   - Top Link: "Cabinet approves regeneration proposal" (1,200 clicks)

2. **Our Council**
   - Total Clicks: 5,120
   - Top Channel: Email (2,100 clicks, 41%)
   - Top Link: "Weekly Council News" (2,100 clicks)

3. **Connecting Kirklees**
   - Total Clicks: 2,840
   - Top Channel: Email (950 clicks, 33%)
   - Top Link: "Transport & Roadworks Update" (950 clicks)

**Combined:** 11,205 clicks across realistic channel/device distribution

---

## Files in Repository

```
utm-dashboard/
├── CLAUDE.md (project guidance doc)
├── PROJECT_STATUS.md (THIS FILE)
├── package.json
├── .wrangler/
│
├── utm-admin.html (✅ Link creation form)
├── utm-dashboard.html (✅ Click analytics dashboard)
├── utm-summary.html (✅ Executive snapshot)
├── campaign-results.html (✅ Campaign snapshot + trend)
├── email-bulletins-dashboard.html (✅ 12-month email analytics)
├── campaign-utm-dashboard.html (✅ UTM tracking demo)
│
├── granicus-dashboard.html (existing - email analytics)
├── granicus-import.html (existing - batch import tool)
│
└── kirklees_news_bulletins_sample/ (demo data)
    └── bulletin_analytics_details_20260121145839.csv (120+ bulletins, real data)
```

---

## Next Steps (Ordered by Priority)

### Phase 1: Leadership Demo (Next)
- [ ] Get previous evaluation PowerPoint from leadership
- [ ] Understand exact reporting format/metrics they want
- [ ] Build **Quarterly Export Function** (PowerPoint or PDF template)
  - Shows: Top campaigns, channel comparison, trends, time saved
  - Automatically pulls from dashboards
- [ ] Demo both dashboards + export to communications leadership
- [ ] Get feedback/buy-in

### Phase 2: Real Data Integration
- [ ] Integrate real Granicus data (120+ bulletins already exported)
- [ ] Create demo short links for 3-5 real recent campaigns
- [ ] Show unified dashboard with real email + short link data
- [ ] Test with pilot group of comms officers

### Phase 3: API Integration (If Leadership Approves)
- [ ] Granicus API integration (replace PDF imports with auto-sync)
- [ ] Orlo API integration (if available)
- [ ] Vuleio API integration (if available)
- [ ] Google Analytics integration (for comparison)

### Phase 4: Scale & Operationalize
- [ ] Train team on creating tracked links
- [ ] Define campaign naming standards
- [ ] Set up weekly/quarterly automated reports
- [ ] Document workflows

---

## Technology Stack

| Component | Technology | Status |
|-----------|-----------|--------|
| Short URL Redirect | Cloudflare Worker | ✅ Production |
| Click Tracking | Cloudflare Worker + Airtable API | ✅ Production |
| Data Storage | Airtable | ✅ Production |
| Dashboards | HTML5 + Chart.js (vanilla) | ✅ Built |
| Build Tool | Vite | ✅ Setup |
| Deployment | Static hosting ready | ✅ Ready |
| Authentication | Airtable API Key + GovDelivery X-AUTH-TOKEN | ✅ Configured |

---

## What's NOT Done (But Planned)

❌ **Quarterly Export Function** - Need leadership PowerPoint first to match their format
❌ **Granicus API Integration** - API endpoints unclear, currently using manual PDF import
❌ **Orlo Integration** - Not yet attempted
❌ **Vuleio Integration** - Not yet attempted
❌ **Google Analytics Integration** - Not yet attempted
❌ **Automated Reports** - Need export format first
❌ **Real Campaign Links** - Still using demo data in UTM dashboard
❌ **Team Training Materials** - Will create after leadership approval

---

## Key Business Requirements

**From User (Max):**
1. ✅ **Easy for officers to use** - Simple link creation form
2. ✅ **Unified view of all tracking** - One dashboard, not multiple systems
3. ✅ **Real-time click tracking** - No manual entry (Worker does it)
4. ✅ **Show quarterly results** - Dashboards + export report
5. ✅ **Unified data model** - UTM parameters standardized
6. ✅ **Read-only Granicus** - No tampering (for audit compliance)
7. ⏳ **Filter out bin reminders** - From Granicus bulk sends (can add when needed)

---

## Known Limitations & Gotchas

1. **GovDelivery API:** Tried multiple endpoint formats, unclear if bulletins listing endpoint is accessible. Currently using manual PDF export + parsing.

2. **Airtable API Rate Limits:** Large bases with 1000+ records may slow down. Could migrate to D1 if needed.

3. **Campaign Naming:** No enforcement of naming standards - relies on team consistency. Consider dropdown/templates later.

4. **Demo vs Real Data:** UTM dashboard currently shows demo data. Need to:
   - Create real short links for real campaigns
   - Collect real click data
   - Replace demo with actual tracking

5. **Export Format:** Waiting on leadership PowerPoint to see exact format they want (slides, PDF, Excel, etc.)

---

## How to Access / Test

**Email Bulletins Dashboard:**
- `file:///Users/maxy/Projects/kirklees-council/utm-dashboard/email-bulletins-dashboard.html`
- Or: `npm run dev` then `http://localhost:5173/email-bulletins-dashboard.html`

**Campaign UTM Dashboard:**
- `file:///Users/maxy/Projects/kirklees-council/utm-dashboard/campaign-utm-dashboard.html`
- Or: `npm run dev` then `http://localhost:5173/campaign-utm-dashboard.html`

**Admin Form (Link Creation):**
- `utm-admin.html` (same paths as above)

---

## Questions for Leadership / Next Session

1. What's the exact format of your current quarterly evaluation reports? (PowerPoint? PDF? Excel?)
2. What metrics matter most? (Clicks? Open rates? Campaign ROI?)
3. How do you currently track which campaigns are "successful"?
4. Would you want officers to create short links for ALL campaigns, or just certain types?
5. What's the current time spent on manual Q evaluation compilation? (To calculate ROI)

---

## Contact & References

- **Project Owner:** Max Youell (Kirklees Council Communications)
- **Airtable Base:** `app5iqmIuu0sOTocu` (UTMLinks table)
- **GovDelivery Account:** UKKIRKLEES
- **Cloudflare Worker:** `utm-redirector` (ID: 7b76910885c147dcb030f30212e9e582)
- **API Token Stored:** GovDelivery X-AUTH-TOKEN (see CLAUDE.md for storage location)

---

## Success Metrics

✅ **Phase 1 (Prototype):**
- Email bulletins dashboard working with real data ✅
- Campaign UTM dashboard working with demo data ✅
- Short link creation form working ✅
- Worker redirect service production-ready ✅

⏳ **Phase 2 (Demo):**
- Quarterly export function built
- Leadership approves approach
- Pilot group uses system

📊 **Phase 3 (Launch):**
- 80% of team using for new campaigns
- 30+ campaigns tracked with short links
- Q evaluation time reduced from 4 hours to 30 minutes

---

## Notes for Future Sessions

When this conversation gets compacted:
- Everything in this file is up-to-date as of 21 Jan 2026
- Both dashboards are working and visible in browser
- Demo data is realistic but needs to be replaced with real data
- **BLOCKER:** Need leadership PowerPoint to build export function
- GovDelivery API is unclear - may need support ticket
- Next priority: Get export format from leadership, then build quarterly report generator
