import { z } from "zod";

export enum TaxCalculationMethod {
  FIFO = 'fifo',
  LIFO = 'lifo',
  AVERAGE_COST = 'average_cost',
}

export enum TaxYearStart {
  JANUARY_1 = 'january_1',
  APRIL_1 = 'april_1',
}

export enum ExchangeType {
  BINANCE = 'binance',
  COINBASE = 'coinbase',
  KRAKEN = 'kraken',
  BITPANDA = 'bitpanda',
}

export enum Blockchain {
  BITCOIN = 'bitcoin',
  ETHEREUM = 'ethereum',
  SOLANA = 'solana',
  POLYGON = 'polygon',
  BSC = 'bsc',
  AVALANCHE = 'avalanche',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
}

export enum WalletType {
  HARDWARE = 'hardware',
  SOFTWARE = 'software',
}

export enum HardwareWallet {
  LEDGER = 'ledger',
  TREZOR = 'trezor',
  BITBOX = 'bitbox',
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
}

export const TaxSettingsSchema = z.object({
  tax_residency_country: z.string().min(1, 'Country is required'),
  calculation_method: z.nativeEnum(TaxCalculationMethod),
  tax_year_start: z.nativeEnum(TaxYearStart),
  include_options: z.object({
    staking_rewards: z.boolean(),
    airdrops: z.boolean(),
    hard_forks: z.boolean(),
  }),
});

export type TaxSettings = z.infer<typeof TaxSettingsSchema>;

export const DEFAULT_TAX_SETTINGS: TaxSettings = {
  tax_residency_country: 'DE',
  calculation_method: TaxCalculationMethod.FIFO,
  tax_year_start: TaxYearStart.JANUARY_1,
  include_options: {
    staking_rewards: false,
    airdrops: false,
    hard_forks: false,
  },
};

export interface APIConnection {
  id: string;
  exchange: ExchangeType;
  api_key: string;
  api_secret?: string;
  is_connected: boolean;
  connected_at?: Date;
  last_sync?: Date;
}

export interface WalletConnection {
  id: string;
  user_id: string;
  address: string;
  blockchain: Blockchain;
  label?: string;
  wallet_type: WalletType;
  hardware_wallet?: HardwareWallet;
  is_connected: boolean;
  connected_at?: Date;
  last_sync?: Date;
  auto_sync: boolean;
}

export interface SettingsFormData {
  profile: {
    full_name: string;
  };
  tax: TaxSettings;
  api_connections: APIConnection[];
}

export const COUNTRIES = [
  { code: 'DE', name: 'Germany' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AT', name: 'Austria' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'JP', name: 'Japan' },
] as const;

export const EXCHANGE_INFO = {
  [ExchangeType.BINANCE]: {
    name: 'Binance',
    description: 'Connect your Binance account to import trading history',
    website: 'https://binance.com',
  },
  [ExchangeType.COINBASE]: {
    name: 'Coinbase',
    description: 'Connect your Coinbase account to import trading history',
    website: 'https://coinbase.com',
  },
  [ExchangeType.KRAKEN]: {
    name: 'Kraken',
    description: 'Connect your Kraken account to import trading history',
    website: 'https://kraken.com',
  },
  [ExchangeType.BITPANDA]: {
    name: 'Bitpanda',
    description: 'Connect your Bitpanda account to import trading history',
    website: 'https://bitpanda.com',
  },
} as const;

export const BLOCKCHAIN_INFO = {
  [Blockchain.BITCOIN]: {
    name: 'Bitcoin',
    symbol: 'BTC',
    explorer: 'https://blockstream.info',
  },
  [Blockchain.ETHEREUM]: {
    name: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
  },
  [Blockchain.SOLANA]: {
    name: 'Solana',
    symbol: 'SOL',
    explorer: 'https://explorer.solana.com',
  },
  [Blockchain.POLYGON]: {
    name: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
  },
  [Blockchain.BSC]: {
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    explorer: 'https://bscscan.com',
  },
  [Blockchain.AVALANCHE]: {
    name: 'Avalanche',
    symbol: 'AVAX',
    explorer: 'https://snowtrace.io',
  },
  [Blockchain.ARBITRUM]: {
    name: 'Arbitrum',
    symbol: 'ETH',
    explorer: 'https://arbiscan.io',
  },
  [Blockchain.OPTIMISM]: {
    name: 'Optimism',
    symbol: 'ETH',
    explorer: 'https://optimistic.etherscan.io',
  },
} as const;

export const HARDWARE_WALLET_INFO = {
  [HardwareWallet.LEDGER]: {
    name: 'Ledger',
    description: 'Connect via USB',
    website: 'https://ledger.com',
  },
  [HardwareWallet.TREZOR]: {
    name: 'Trezor',
    description: 'Connect via USB',
    website: 'https://trezor.io',
  },
  [HardwareWallet.BITBOX]: {
    name: 'BitBox',
    description: 'Connect via USB',
    website: 'https://shiftcrypto.ch',
  },
} as const;
