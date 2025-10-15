-- Enum
CREATE TYPE public.transaction_type AS ENUM ('buy', 'sell', 'trade', 'income', 'expense');

-- Table: transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  type public.transaction_type NOT NULL,
  crypto_amount numeric NOT NULL,
  crypto_currency text NOT NULL,
  fiat_amount numeric NOT NULL,
  fiat_currency text NOT NULL DEFAULT 'EUR',
  exchange text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes (example: search by user/date)
CREATE INDEX IF NOT EXISTS idx_transactions_user_date
  ON public.transactions (user_id, date DESC);

-- RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS transactions_select_own ON public.transactions;
CREATE POLICY transactions_select_own
  ON public.transactions FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS transactions_insert_own ON public.transactions;
CREATE POLICY transactions_insert_own
  ON public.transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS transactions_update_own ON public.transactions;
CREATE POLICY transactions_update_own
  ON public.transactions FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS transactions_delete_own ON public.transactions;
CREATE POLICY transactions_delete_own
  ON public.transactions FOR DELETE
  USING (user_id = auth.uid());


