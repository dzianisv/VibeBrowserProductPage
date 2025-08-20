-- Create waitlist table for VibeBrowser in Supabase
CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(10) DEFAULT 'free',
  source VARCHAR(50) DEFAULT 'website',
  metadata JSONB DEFAULT '{}',
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_email ON vibebrowser_waitlist(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_created_at ON vibebrowser_waitlist(created_at);

-- Create index on tier for filtering
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_tier ON vibebrowser_waitlist(tier);

-- Add RLS (Row Level Security) policies
ALTER TABLE vibebrowser_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for waitlist signups)
CREATE POLICY "Allow public inserts" ON vibebrowser_waitlist
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to read (for admin)
CREATE POLICY "Allow authenticated reads" ON vibebrowser_waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at
CREATE TRIGGER update_vibebrowser_waitlist_updated_at 
  BEFORE UPDATE ON vibebrowser_waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();