-- opencode.agentlabs.cc/beta signup persistence.
-- Run this once against the Supabase project referenced by
-- SUPABASE_PROJECT_URL / SUPABASE_API_KEY (same project used by the
-- vibebrowser_waitlist table — see scripts/create-supabase-waitlist-table.sql
-- for the sibling pattern this mirrors).
--
-- Apply via the Supabase SQL editor, or:
--   psql "$SUPABASE_DB_URL" -f supabase/migrations/20260711000000_create_opencode_beta_signups.sql

CREATE TABLE IF NOT EXISTS opencode_beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  ip VARCHAR(64),
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- 'pending' | 'enrolled'
  enrolled_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_opencode_beta_signups_email ON opencode_beta_signups(email);
CREATE INDEX IF NOT EXISTS idx_opencode_beta_signups_status ON opencode_beta_signups(status);
CREATE INDEX IF NOT EXISTS idx_opencode_beta_signups_created_at ON opencode_beta_signups(created_at);

ALTER TABLE opencode_beta_signups ENABLE ROW LEVEL SECURITY;

-- The signup route runs with SUPABASE_API_KEY (same key as the rest of
-- this app — see actions/waitlist-supabase.ts). It needs to INSERT new
-- rows and later UPDATE the status/enrolled_at of the row it just
-- inserted once Google Group auto-enroll completes. No public SELECT
-- policy is granted, so tester emails stay unreadable by anon/public
-- clients; admin tooling should use the Supabase service_role key, which
-- bypasses RLS entirely.

CREATE POLICY "Allow public inserts" ON opencode_beta_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow status updates" ON opencode_beta_signups
  FOR UPDATE USING (true) WITH CHECK (true);
