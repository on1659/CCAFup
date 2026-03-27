CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'ko',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (subscribe form is public)
CREATE POLICY "Allow anonymous insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Only service_role can read/update/delete
CREATE POLICY "Service role full access" ON subscribers
  USING (auth.role() = 'service_role');
