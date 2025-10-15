export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  TRADE = 'trade',
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  crypto_amount: number;
  crypto_currency: string;
  fiat_amount: number;
  fiat_currency: string;
  exchange: string;
  notes?: string;
  created_at: Date;
}

export interface TransactionFormData {
  type: TransactionType;
  crypto_currency: string;
  crypto_amount: number;
  fiat_amount: number;
  fiat_currency: string;
  date: Date;
  exchange: string;
  notes?: string;
}

export interface TransactionFilters {
  dateFrom?: Date;
  dateTo?: Date;
  type?: TransactionType;
  crypto_currency?: string;
}

export const COMMON_CRYPTOS = [
  'BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE', 'SUSHI', 'MATIC', 'SOL',
  'AVAX', 'FTM', 'NEAR', 'ATOM', 'ALGO', 'XTZ', 'FIL', 'VET', 'THETA', 'ICP'
] as const;

export type CommonCrypto = typeof COMMON_CRYPTOS[number];
