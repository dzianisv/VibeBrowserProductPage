-- Add additional indexes for better performance on the admin dashboard
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at_desc ON waitlist(created_at DESC);

-- Add a view for daily signup stats
CREATE OR REPLACE VIEW daily_signups AS
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as signups_count
FROM waitlist 
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;
