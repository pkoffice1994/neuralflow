-- ═══════════════════════════════════════════════
-- NeuralFlow — Supabase SQL Setup
-- Supabase Dashboard → SQL Editor mein run karo
-- ═══════════════════════════════════════════════

-- 1. contact_leads table (aapke existing code se match)
CREATE TABLE IF NOT EXISTS contact_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT,
  email      TEXT NOT NULL,
  company    TEXT,
  interest   TEXT,
  message    TEXT,
  status     TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_leads_updated_at
  BEFORE UPDATE ON contact_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Row Level Security
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Public (anon) can INSERT — form submissions
CREATE POLICY "Public can insert leads"
  ON contact_leads FOR INSERT TO anon WITH CHECK (true);

-- Only logged-in admin can read/update/delete
CREATE POLICY "Admin can select leads"
  ON contact_leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin can update leads"
  ON contact_leads FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin can delete leads"
  ON contact_leads FOR DELETE TO authenticated USING (true);
