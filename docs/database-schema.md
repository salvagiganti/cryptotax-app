### Datenbankschema (Supabase / Postgres)

Diese Dokumentation beschreibt die Tabellenstruktur und RLS-Policies für die Anwendung. Die Tabellen liegen im Schema `public`. Benutzeridentifikation erfolgt über `auth.uid()` (Supabase). Alle Tabellen sind standardmäßig durch RLS geschützt, und Nutzer können ausschließlich auf ihre eigenen Daten zugreifen.

Hinweise:
- Zeitstempel verwenden `timestamptz` mit `DEFAULT now()`.
- Fremdschlüssel löschen verknüpfte Daten per `ON DELETE CASCADE`, wo sinnvoll.
- Enums werden im Schema `public` angelegt.

---

### 1) profiles (Erweiterung von auth.users)

- Zweck: Profilerweiterung für Benutzer aus `auth.users` (1:1)

Spalten

| Spalte | Typ | Details |
|---|---|---|
| id | uuid | PK, FK → `auth.users(id)`, `ON DELETE CASCADE` |
| full_name | text | |
| avatar_url | text | NULL erlaubt |
| subscription_tier | subscription_tier | enum: `free` | `pro` | `enterprise` |
| subscription_status | subscription_status | enum: `active` | `canceled` | `expired` |
| created_at | timestamptz | DEFAULT `now()` |
| updated_at | timestamptz | DEFAULT `now()` (per Trigger aktualisiert) |

SQL (Erstellung)

```sql
-- Enums
CREATE TYPE public.subscription_tier AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'expired');

-- Tabelle
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name text NOT NULL,
  avatar_url text,
  subscription_tier public.subscription_tier NOT NULL DEFAULT 'free',
  subscription_status public.subscription_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger zum automatischen Aktualisieren von updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS-Policies (nur eigene Daten)
CREATE POLICY profiles_select_own
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY profiles_insert_self
  ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY profiles_update_own
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY profiles_delete_own
  ON public.profiles FOR DELETE
  USING (id = auth.uid());
```

---

### 2) transactions

- Zweck: Speicherung von Krypto-Transaktionen eines Benutzers

Spalten

| Spalte | Typ | Details |
|---|---|---|
| id | uuid | PK (z. B. `gen_random_uuid()`/`uuid_generate_v4()`) |
| user_id | uuid | FK → `public.profiles(id)`, `ON DELETE CASCADE` |
| date | timestamptz | Transaktionszeitpunkt |
| type | transaction_type | enum: `buy` | `sell` | `trade` | `income` | `expense` |
| crypto_amount | numeric | Menge (präzise Dezimalzahl) |
| crypto_currency | text | z. B. `BTC` |
| fiat_amount | numeric | Gegenwert in Fiat |
| fiat_currency | text | DEFAULT `'EUR'` |
| exchange | text | Börse/Plattform |
| notes | text | NULL erlaubt |
| created_at | timestamptz | DEFAULT `now()` |

SQL (Erstellung)

```sql
-- Enum für Transaktionstypen
CREATE TYPE public.transaction_type AS ENUM ('buy', 'sell', 'trade', 'income', 'expense');

CREATE TABLE public.transactions (
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

-- RLS aktivieren
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS-Policies (nur eigene Daten)
CREATE POLICY transactions_select_own
  ON public.transactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY transactions_insert_own
  ON public.transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY transactions_update_own
  ON public.transactions FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY transactions_delete_own
  ON public.transactions FOR DELETE
  USING (user_id = auth.uid());
```

---

### 3) tax_reports

- Zweck: Steuerberichte pro Nutzer und Jahr

Spalten

| Spalte | Typ | Details |
|---|---|---|
| id | uuid | PK (z. B. `gen_random_uuid()`/`uuid_generate_v4()`) |
| user_id | uuid | FK → `public.profiles(id)`, `ON DELETE CASCADE` |
| year | integer | Steuerjahr |
| status | report_status | enum: `draft` | `processing` | `completed` | `failed` |
| total_gains | numeric | NULL erlaubt |
| total_losses | numeric | NULL erlaubt |
| pdf_url | text | NULL erlaubt |
| created_at | timestamptz | DEFAULT `now()` |
| completed_at | timestamptz | NULL erlaubt |

SQL (Erstellung)

```sql
-- Enum für Report-Status
CREATE TYPE public.report_status AS ENUM ('draft', 'processing', 'completed', 'failed');

CREATE TABLE public.tax_reports (
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

-- (Optional) Eindeutigkeit pro Nutzer und Jahr
CREATE UNIQUE INDEX IF NOT EXISTS tax_reports_user_year_idx
  ON public.tax_reports (user_id, year);

-- RLS aktivieren
ALTER TABLE public.tax_reports ENABLE ROW LEVEL SECURITY;

-- RLS-Policies (nur eigene Daten)
CREATE POLICY tax_reports_select_own
  ON public.tax_reports FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY tax_reports_insert_own
  ON public.tax_reports FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY tax_reports_update_own
  ON public.tax_reports FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY tax_reports_delete_own
  ON public.tax_reports FOR DELETE
  USING (user_id = auth.uid());
```

---

### Zusätzliche Hinweise

- Für `gen_random_uuid()` wird in Postgres die Erweiterung `pgcrypto` benötigt:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```
- Alternativ kann `uuid-ossp` verwendet werden (`uuid_generate_v4()`), falls präferiert:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
- In Supabase werden RLS-Policies nur bei aktivierter RLS ausgewertet. Stelle sicher, dass keine `PERMISSIVE` Policies unerwünscht sind.


