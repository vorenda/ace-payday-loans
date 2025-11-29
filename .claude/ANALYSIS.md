# Claude Code Service Website Generator - System Analysis

## Overview

This document provides a comprehensive analysis of the `.claude` folder configuration that powers an automated service website generation system. The system uses Claude Code's multi-agent orchestration to create SEO-optimized service business websites.

---

## Main Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `CLAUDE.md` | Master orchestrator instructions | 15-step workflow, agent coordination, Anti-Doorway architecture |
| `settings.local.json` | Permissions configuration | Bash commands, MCP tools, Playwright permissions |

---

## Agent Files (`/agents/`)

| Agent | Purpose | Model | Key Responsibilities |
|-------|---------|-------|---------------------|
| `business-researcher.md` | Research specific businesses | - | Scrape website, gather reviews, verify qualifications, create business profile |
| `city-page-generator.md` | Generate Anti-Doorway city pages | - | Local facts integration, state compliance, real branch photos, local area codes |
| `database-agent.md` | Database infrastructure setup | - | Local PostgreSQL (Docker), Digital Ocean production, Prisma ORM, API routes |
| `design-generator.md` | Create HTML/CSS/JS designs | - | Service-focused layouts, trust signals, CTAs, click-to-call |
| `location-generator.md` | Discover service area locations | - | Find 20-50+ cities, gather local facts (landmarks, highways, exits, area codes) |
| `nextjs-builder.md` | Build complete NextJS website | - | State Silo architecture, pillar pages, state pages, city pages, schema markup |
| `payload-cms.md` | Content management setup | - | Payload CMS installation, collections (Services, Locations, CityPages), admin panel |
| `playwright-tester.md` | Visual testing & validation | - | Test all pages, validate Anti-Doorway content, check schema, verify local phones |
| `service-schema-creator.md` | Research & create service schemas | - | Service list discovery, JSON schema creation, pillar page structure |
| `state-compliance-researcher.md` | YMYL compliance research | - | State lending laws, rate caps, consumer protections, required disclaimers |
| `coder` | Implementation specialist | - | Write code to fulfill specific todo items |
| `tester` | Visual testing specialist | - | Verify implementations with Playwright MCP |
| `stuck` | Human escalation | - | Ask user questions when problems occur |

---

## Key Architectural Concepts

### 1. Anti-Doorway SEO Strategy

**Problem**: Google penalizes "doorway pages" - thin content pages that just swap city names.

**Solution**: Each city page contains **hard local facts**:
- Landmarks (Reunion Tower, Zilker Park)
- Highways (I-35E, US-75)
- Major exits (Exit 428A)
- Neighboring towns
- County name
- Local area codes (NOT 1-800 numbers)

### 2. State Silo URL Architecture

Hierarchical URL structure for maximum SEO authority:

```
/                                    → Homepage
/services/                           → Service index
/services/[service-slug]             → Service pillar pages (national targeting)
/locations/                          → State index
/locations/[state]/                  → State pages
/locations/[state]/[city]/           → City pages (Anti-Doorway)
```

### 3. YMYL Compliance

For "Your Money Your Life" niches (lending, medical, legal):
- State-specific regulations research
- Rate caps and fee limits
- Consumer protection information
- Required disclaimers
- Cited regulatory sources (E-E-A-T)

### 4. Internal Linking Strategy

- City pages link **UP** to service pillar pages
- Service pillars link **DOWN** to state and city pages
- State pages bridge between pillars and cities
- Prevents keyword cannibalization

---

## 15-Step Workflow

| Step | Action | Agent Used |
|------|--------|------------|
| 0 | Collect user inputs | Orchestrator |
| 1 | Business research (if name provided) | `business-researcher` |
| 2 | Design generation (if needed) | `design-generator` |
| 3 | Location discovery with local facts | `location-generator` |
| 4 | Service schema creation | `service-schema-creator` |
| 5 | Database setup | `database-agent` |
| 6 | Payload CMS setup | `payload-cms` |
| 7 | State compliance research (YMYL only) | `state-compliance-researcher` |
| 8 | Service pillar content | Orchestrator |
| 9 | City page strategy | Orchestrator |
| 10 | Parallel city page generation | Multiple `city-page-generator` |
| 11 | Import data to Payload CMS | Orchestrator |
| 12 | NextJS site build | `nextjs-builder` |
| 13 | Playwright testing | `playwright-tester` |
| 14 | GitHub deployment | Orchestrator |
| 15 | Final report | Orchestrator |

---

## Required User Inputs

1. **Service Niche**: What service business (Plumber, Electrician, Title Loans, etc.)
2. **Service Area**: Main city/region to target
3. **Jina API Key**: Required for web scraping and research
4. **Business Name** (optional): For personalization
5. **HTML/CSS/JS Design** (optional): Custom design or auto-generate

---

## Settings Configuration

The `settings.local.json` configures permissions for:

### Allowed Bash Commands
- Docker operations (`docker ps`, `docker run`, `docker mcp secret set`)
- Node.js (`node --version`, `npm init`, `npm install`, `npm run build`)
- Prisma (`npx prisma init`, `npx prisma migrate`, `npx prisma generate`)
- PostgreSQL (`PGPASSWORD=postgres123 psql`)
- Git (`git init`, `git add`)
- NextJS (`npx create-next-app@latest`)

### MCP Tools
- Playwright browser operations (navigate, click, close, screenshot, snapshot, fill_form)

---

## Database Schema (Prisma)

Tables created by `database-agent`:

| Table | Purpose |
|-------|---------|
| `ContactForm` | General contact form submissions |
| `QuoteRequest` | Service quote requests |
| `CallbackRequest` | Callback request scheduling |
| `PageView` | Analytics page views |
| `EmailSubscriber` | Newsletter subscriptions |

---

## City Page JSON Structure

Each city page generated contains:

```json
{
  "slug": "dallas-tx",
  "city": "Dallas",
  "state": "TX",
  "stateFull": "Texas",
  "seo": {
    "title": "...",
    "description": "...",
    "keywords": []
  },
  "heroSection": {
    "headline": "...",
    "subheadline": "...",
    "heroImage": "...",
    "ctaText": "...",
    "ctaPhone": "..."
  },
  "localProofSection": {
    "landmarks": [],
    "highways": [],
    "exits": [],
    "neighboringTowns": []
  },
  "stateComplianceSection": {
    "legalStatus": "...",
    "regulations": {},
    "consumerProtections": [],
    "disclaimer": "..."
  },
  "productLinkSection": {
    "services": [],
    "internalLinks": []
  },
  "localReviewsSection": {
    "reviews": []
  },
  "napSection": {
    "name": "...",
    "address": "...",
    "phone": "...",
    "areaCode": "..."
  },
  "nearbyLocationsSection": {
    "cities": []
  },
  "faqSection": {
    "faqs": []
  },
  "schemaMarkup": {
    "financialService": {},
    "breadcrumbList": {}
  }
}
```

---

## Key Differentiators

### What Makes This System Unique

1. **Anti-Doorway Content**: Real local facts, not generic city-name swapping
2. **State Silo Architecture**: Proper URL hierarchy for SEO
3. **YMYL Compliance**: State-specific legal research for regulated industries
4. **Local Phone Numbers**: Area codes match the city (no 1-800 numbers)
5. **Real Branch Photos**: Jina AI searches for actual storefront images
6. **Parallel Generation**: Multiple agents create city pages simultaneously
7. **Full Testing**: Playwright validates all pages before deployment

---

## File Output Structure

```
/project-directory/
├── .claude/
│   ├── CLAUDE.md
│   ├── settings.local.json
│   └── agents/
│       └── [11 agent files]
├── business-profile.json (if business name provided)
├── design/
│   └── index.html (design files)
├── locations.json (with local facts)
├── service-schema-template.json
├── service-pillar-schema.json
├── state-compliance/
│   ├── index.json
│   └── [STATE].json (per state)
├── city-pages/
│   └── [city-state].json (per city)
└── [NextJS project files]
```

---

## Usage

To use this system:

1. Navigate to the project directory
2. Start Claude Code
3. Say: "Make me a service website for [NICHE] in [AREA]"
4. Provide Jina API key when prompted
5. Optionally provide business name and/or custom design
6. Wait for orchestrator to complete all 15 steps

---

*Analysis generated for future reference.*
