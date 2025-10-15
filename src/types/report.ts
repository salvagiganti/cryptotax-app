export enum ReportStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ReportType {
  ANNUAL_SUMMARY = 'annual_summary',
  DETAILED_TRANSACTION_LOG = 'detailed_transaction_log',
}

export interface TaxReport {
  id: string;
  user_id: string;
  year: number;
  status: ReportStatus;
  total_gains?: number;
  total_losses?: number;
  pdf_url?: string;
  created_at: Date;
  completed_at?: Date;
}

export interface ReportFormData {
  year: number;
  report_type: ReportType;
  include_options: {
    staking_rewards: boolean;
    airdrops: boolean;
    defi_transactions: boolean;
  };
}

export interface ReportCalculation {
  total_gains: number;
  total_losses: number;
  net_gain_loss: number;
  transaction_count: number;
  taxable_events: number;
  details: {
    buy_transactions: number;
    sell_transactions: number;
    trade_transactions: number;
    income_transactions: number;
    expense_transactions: number;
  };
}

export interface ReportFilters {
  year?: number;
  status?: ReportStatus;
}

export const REPORT_YEARS = Array.from(
  { length: 6 },
  (_, i) => new Date().getFullYear() - i
);
