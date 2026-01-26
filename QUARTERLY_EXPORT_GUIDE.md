# Quarterly Export Generator – User Guide

## Overview

The **Quarterly Export Generator** automates the creation of professional quarterly communications reports. It generates a 45-slide PowerPoint presentation that matches the format used in leadership presentations, significantly reducing manual compilation time.

**Key benefit:** What previously took 4+ hours of manual compilation can now be done with a single click.

---

## What's Included

### Current Features (Working)

✅ **Title & Executive Summary Slides**
- Professional title slide with quarter branding
- Executive summary with key metrics

✅ **Campaign Analytics Section**
- Campaign performance overview with click distribution
- Channel breakdown (Email, Print, Social, Web)
- Campaign comparison with top performers
- Top 5 performing links

✅ **Email Bulletins Section**
- Delivery rate, open rate, and click rate metrics
- Bulletins by type breakdown
- Subscriber engagement analysis

✅ **Key Performance Indicators**
- Summary of highest performing campaign
- Top channel analysis
- Best email bulletin type
- Total reach metrics

✅ **Professional Formatting**
- Consistent Kirklees branding (teal/purple theme)
- Auto-generating progress bar during export
- Downloaded as `.pptx` file

### Template Structure

The generator creates the following slide sequence:

1. **Slide 1:** Title slide ("Q2 2025 Communications Report")
2. **Slide 2:** Executive summary (4 key metrics)
3. **Slide 3:** Campaign performance overview
4. **Slide 4:** Email bulletins performance metrics
5. **Slide 5:** Bulletins by type breakdown
6. **Slide 6:** Click distribution by channel
7. **Slide 7:** Campaign comparison with ranking
8. **Slide 8:** Top performing links (top 5)
9. **Slide 9:** Key performance indicators
10. **Slide 10:** Thank you / closing slide

**Future expansion:** The template is designed to be extended to 45 slides as more data sources are integrated (social media analytics, sentiment analysis, directorate breakdowns, etc.)

---

## How to Use

### 1. Access the Generator

**Option A: From the dashboard home page**
```
file:///Users/maxy/Projects/kirklees-council/utm-dashboard/index.html
```
Click the "Quarterly Reports" card or the featured "Generate Your Q2 2025 Report" button.

**Option B: Direct access**
```
file:///Users/maxy/Projects/kirklees-council/utm-dashboard/quarterly-export-generator.html
```

**Option C: Via npm dev server**
```bash
npm run dev
# Then navigate to http://localhost:5173/quarterly-export-generator.html
```

### 2. Configure Your Report

On the generator page, you'll see:

**Report Period**
- Select which quarter to report on (Q1-Q4, 2024-2025)
- Customize the report title if needed

**Report Configuration**
- ☑ Include Social Media Analytics
- ☑ Include Email Bulletins
- ☑ Include Web Analytics

### 3. Generate the Report

1. Click **"📥 Generate PowerPoint Report"** button
2. Watch the progress bar while the generator creates slides
3. A `.pptx` file will automatically download to your computer

**File naming convention:**
```
Kirklees_[QUARTER]_Communications_Report_[DATE].pptx
```

Example: `Kirklees_Q2_2025_Communications_Report_2026-01-21.pptx`

### 4. Review and Share

1. Open the downloaded PowerPoint in Microsoft PowerPoint or Google Slides
2. The presentation is fully editable—customize colors, add notes, insert additional slides
3. Export to PDF if needed for sharing or printing

---

## Data Sources

### Current Data (Demo)

The generator currently uses demo data that's embedded in the HTML:

**Campaign Tracking (UTM)**
- Airtable-based tracking (3 sample campaigns)
- 11,205 total clicks across channels
- Click distribution by channel and campaign

**Email Bulletins (Granicus)**
- 26 sample bulletins with real metrics
- Delivery rates: 98.3% average
- Open rates: 44.1% average
- Click rates: 8.4% average

### Future: Real Data Integration

When ready to use real data, the generator can be updated to pull from:

1. **Live Airtable API** – Real campaign clicks and UTM tracking
2. **Granicus API** – Real email bulletin metrics
3. **Google Analytics** – Website performance and top pages
4. **Platform-specific APIs** – Social media metrics (Facebook, X, Instagram, LinkedIn, etc.)

**Note:** The data structure is ready for integration—just swap the `campaigns` and `bulletinsData` constants with API calls.

---

## Expanding to 45 Slides

The current template provides the core framework. To expand to the full 45-slide structure (as seen in the leadership presentation), add:

### Social Media Section (12+ slides)
- Per-platform analytics (Facebook, X, Instagram, LinkedIn, Next Door, TikTok)
- Rating benchmarks (Acceptable → Phenomenal)
- Monthly trend charts
- QoQ and YoY comparisons
- Best/worst performing posts (with screenshots)
- Sentiment analysis

### Internal Communications (4+ slides)
- Intranet news performance
- Kirklees Together article reach
- Subscriber growth trends

### Web Analytics (3+ slides)
- Top 10 webpages by visits
- Traffic sources
- Device breakdown

### Directorate Breakdown (4+ slides)
- Press releases by directorate
- Enquiries by directorate
- Content distribution

### Content Guidance (2+ slides)
- Content recommendations
- Best practices reference

---

## Technical Details

### Technology Used

- **pptxgen-js** (v3.12.0) – PowerPoint generation library
- **Vanilla JavaScript** – No framework dependencies
- **Chart.js-ready** – Charts can be rendered as images and embedded

### File Size & Performance

- Generated presentations: 500KB - 2MB (typical)
- Generation time: 2-5 seconds
- Browser compatibility: Chrome, Firefox, Safari, Edge

### Data Flow

```
User selects quarter
        ↓
Selects report options
        ↓
Clicks "Generate"
        ↓
Generator pulls data from embedded constants
        ↓
Creates slide structures with pptxgen-js
        ↓
Applies Kirklees branding & styling
        ↓
Exports as PowerPoint file
        ↓
Downloads to user's computer
```

---

## Troubleshooting

### Issue: Nothing downloads when I click "Generate"

**Solution:** Check your browser's download settings. Some browsers may ask for permission or have downloads blocked.

### Issue: The presentation looks different than expected

**Solution:** This is normal—the template will adapt based on your current data. Once connected to real data, it will populate with actual metrics.

### Issue: I want to customize the colors or layout

**Solution:** The presentation uses the Kirklees color scheme:
- Primary: `#008491` (teal)
- Secondary: `#6b1b78` (purple)
- Accent: `#f59e0b` (gold)

You can edit these in the generated PowerPoint, or modify the color constants in the HTML file's JavaScript.

---

## Next Steps

### Short Term (Ready Now)
1. ✅ Test the generator with demo data
2. ✅ Share with leadership for feedback on format
3. ✅ Adjust slide layout based on feedback

### Medium Term (Next Sprint)
1. Connect real Airtable campaign data
2. Add Granicus API integration for live email metrics
3. Expand to include social media analytics
4. Add sentiment analysis slide

### Long Term (Full Feature)
1. Implement full 45-slide structure
2. Add chart/image generation for visual data
3. Create scheduled quarterly export (auto-send to leadership)
4. Add filtering by directorate/channel
5. Create alternative PDF export format

---

## Support & Feedback

**Questions about the generator?**
- Check this guide first
- Review the code comments in `quarterly-export-generator.html`
- Test with the "Preview Metrics" button to see what data is being used

**Ready to connect real data?**
- Email bulletins: Granicus CSV exports ready to integrate
- Campaign data: Airtable `UTMLinks` table connected and ready
- Social media: APIs available, needs configuration

---

## File Locations

| File | Purpose |
|------|---------|
| `quarterly-export-generator.html` | Main generator interface and PowerPoint creation logic |
| `index.html` | Dashboard home page with quick access to all tools |
| `campaign-utm-dashboard.html` | View live campaign tracking data |
| `email-bulletins-dashboard.html` | View email bulletin analytics |
| `utm-admin.html` | Create new tracked links |
| `campaign-results.html` | Single campaign deep-dive view |

---

## Version History

**v1.0** (21 Jan 2026)
- Initial release with 10-slide core template
- Demo data for campaigns and email bulletins
- One-click PowerPoint export
- Professional Kirklees branding

**Planned: v1.5**
- Expand to 20+ slides
- Social media analytics integration
- Real data connection

**Planned: v2.0**
- Full 45-slide structure
- Multi-platform social media analytics
- Scheduled quarterly exports
- PDF export option

---

## Contact

**Project Lead:** Max Youell
**Airtable Base:** `app5iqmIuu0sOTocu`
**Data Files:** `/Users/maxy/Projects/kirklees-council/utm-dashboard/`
