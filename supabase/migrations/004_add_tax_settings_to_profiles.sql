-- Add tax_settings column to profiles for storing tax configuration
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tax_settings jsonb NOT NULL DEFAULT jsonb_build_object(
  'tax_residency_country', 'DE',
  'calculation_method', 'fifo',
  'tax_year_start', 'january_1',
  'include_options', jsonb_build_object(
    'staking_rewards', false,
    'airdrops', false,
    'hard_forks', false
  )
);

-- Ensure existing rows receive the default tax settings structure
UPDATE public.profiles
SET tax_settings = COALESCE(
  tax_settings,
  jsonb_build_object(
    'tax_residency_country', 'DE',
    'calculation_method', 'fifo',
    'tax_year_start', 'january_1',
    'include_options', jsonb_build_object(
      'staking_rewards', false,
      'airdrops', false,
      'hard_forks', false
    )
  )
);

-- RLS adjustments to make sure users can continue managing their own profiles
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
CREATE POLICY profiles_select_own
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

DROP POLICY IF EXISTS profiles_insert_self ON public.profiles;
CREATE POLICY profiles_insert_self
  ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS profiles_delete_own ON public.profiles;
CREATE POLICY profiles_delete_own
  ON public.profiles FOR DELETE
  USING (id = auth.uid());
