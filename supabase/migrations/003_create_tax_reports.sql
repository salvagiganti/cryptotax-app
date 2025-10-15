-- Enum
CREATE TYPE public.report_status AS ENUM ('draft', 'processing', 'completed', 'failed');

-- Table: tax_reports
CREATE TABLE IF NOT EXISTS public.tax_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  year integer NOT NULL,
  status public.report_status NOT NULL DEFAULT 'draft',
  total_gains numeric,
  total_losses numeric,
  pdf_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Unique per (user_id, year)
CREATE UNIQUE INDEX IF NOT EXISTS tax_reports_user_year_idx
  ON public.tax_reports (user_id, year);

-- RLS
ALTER TABLE public.tax_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tax_reports_select_own ON public.tax_reports;
CREATE POLICY tax_reports_select_own
  ON public.tax_reports FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS tax_reports_insert_own ON public.tax_reports;
CREATE POLICY tax_reports_insert_own
  ON public.tax_reports FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS tax_reports_update_own ON public.tax_reports;
CREATE POLICY tax_reports_update_own
  ON public.tax_reports FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS tax_reports_delete_own ON public.tax_reports;
CREATE POLICY tax_reports_delete_own
  ON public.tax_reports FOR DELETE
  USING (user_id = auth.uid());


