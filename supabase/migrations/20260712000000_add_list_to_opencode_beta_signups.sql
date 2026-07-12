-- Adds the `list` column to opencode_beta_signups so a single table can
-- back both the closed-beta signup form and the general "opencode news"
-- newsletter list, disambiguated by which Brevo list a contact went to.
--
-- Idempotent — safe to re-run, and safe to apply even if the base table
-- migration (20260711000000_create_opencode_beta_signups.sql) already ran
-- in production. Written as its own migration rather than editing the
-- original per this repo's convention of never editing an already-applied
-- migration file.
--
-- Apply via the Supabase SQL editor, or:
--   psql "$SUPABASE_DB_URL" -f supabase/migrations/20260712000000_add_list_to_opencode_beta_signups.sql

ALTER TABLE opencode_beta_signups
  ADD COLUMN IF NOT EXISTS list VARCHAR(20) DEFAULT 'beta' NOT NULL; -- 'beta' | 'news'

CREATE INDEX IF NOT EXISTS idx_opencode_beta_signups_list ON opencode_beta_signups(list);
