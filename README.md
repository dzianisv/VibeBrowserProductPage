# VibeBrowser Landing Page

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/dzianisvs-projects/v0-vibe-browser-features)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/U159q48np85)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/dzianisvs-projects/v0-vibe-browser-features](https://vercel.com/dzianisvs-projects/v0-vibe-browser-features)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/U159q48np85](https://v0.dev/chat/projects/U159q48np85)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Database Schema

### Table: `vibebrowser_waitlist`

```sql
CREATE TABLE vibebrowser_waitlist (
  -- Primary fields
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  tier            VARCHAR(10) DEFAULT 'free',        -- 'free' or 'pro'
  source          VARCHAR(50) DEFAULT 'website',     -- signup source (website, api, etc.)
  metadata        JSONB DEFAULT '{}',                -- flexible JSON for extra data
  confirmed       BOOLEAN DEFAULT false,             -- email confirmation status
  
  -- Timestamps
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Referral tracking
  referral_source VARCHAR(100),   -- linkedin, google, twitter, direct, etc.
  utm_source      VARCHAR(100),   -- UTM source parameter
  utm_medium      VARCHAR(100),   -- UTM medium (social, email, cpc, etc.)
  utm_campaign    VARCHAR(100),   -- UTM campaign name
  landing_page    VARCHAR(500)    -- page path where user signed up
);
```

### Indexes

| Index | Column | Purpose |
|-------|--------|---------|
| `idx_vibebrowser_waitlist_email` | `email` | Fast email lookups/dedup |
| `idx_vibebrowser_waitlist_created_at` | `created_at` | Sort by signup date |
| `idx_vibebrowser_waitlist_tier` | `tier` | Filter by plan tier |
| `idx_vibebrowser_waitlist_referral_source` | `referral_source` | Analytics queries |
| `idx_vibebrowser_waitlist_utm_source` | `utm_source` | UTM analytics |

### Row Level Security (RLS)

| Policy | Action | Rule |
|--------|--------|------|
| Allow public inserts | INSERT | Anyone can insert |
| Allow authenticated reads | SELECT | Only authenticated users can read |

### Triggers

- **`update_vibebrowser_waitlist_updated_at`** - Auto-updates `updated_at` on row update

### Sample Data

```json
{
  "id": "2b6de9ed-72c8-4821-8028-65214b7f478d",
  "email": "user@example.com",
  "tier": "pro",
  "source": "website",
  "metadata": {},
  "confirmed": false,
  "created_at": "2026-01-14T02:21:56.134Z",
  "updated_at": "2026-01-14T02:21:56.134Z",
  "referral_source": "linkedin",
  "utm_source": "linkedin",
  "utm_medium": "social",
  "utm_campaign": "launch",
  "landing_page": "/"
}
```

## Git LFS

Git LFS is enabled for video files.
