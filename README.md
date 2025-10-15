# CryptoTax

A modern cryptocurrency tax calculation platform built with Next.js 14, designed specifically for German tax compliance. Automatically calculate your crypto taxes using FIFO/LIFO methods and generate Finanzamt-ready reports.

## Features

- 🔐 **Secure Authentication** - Supabase-powered auth with email/password
- 📊 **Transaction Management** - Import from exchanges or add manually
- 💰 **Tax Calculations** - FIFO, LIFO, and Average Cost methods
- 📈 **German Tax Compliant** - Following German tax regulations
- 📋 **Report Generation** - PDF reports ready for your tax advisor
- 🔗 **Exchange Integration** - Connect Binance, Coinbase, Kraken, Bitpanda
- 💳 **Wallet Support** - Hardware and software wallet connections
- 📧 **Email Notifications** - Welcome emails and report alerts
- 🛡️ **Rate Limiting** - Protection against abuse
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cryptotax.git
   cd cryptotax
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment variables** (see Environment Variables section below)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Optional: Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Getting Your Supabase Keys

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings → API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret!)

### Getting Your Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Go to API Keys section
3. Create a new API key
4. Copy the key to your `.env.local`

## Database Setup

### Supabase Setup

1. **Create a new Supabase project**
2. **Run the migration files** in the `supabase/migrations/` directory:
   ```sql
   -- Run these in your Supabase SQL editor
   -- 001_create_profiles.sql
   -- 002_create_transactions.sql
   -- 003_create_tax_reports.sql
   ```

3. **Enable Row Level Security (RLS)** - The migration files include RLS policies

4. **Set up authentication** in Supabase:
   - Go to Authentication → Settings
   - Enable email confirmations (optional)
   - Configure email templates

### Database Schema

The application uses three main tables:

- **`profiles`** - User profile information
- **`transactions`** - Cryptocurrency transactions
- **`tax_reports`** - Generated tax reports

See `docs/database-schema.md` for detailed schema information.

## Development

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── actions/           # Server Actions
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components
│   ├── sections/          # Landing page sections
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility libraries
│   ├── email/             # Email templates and sending
│   └── supabase/          # Supabase client configurations
└── types/                 # TypeScript type definitions
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Database
npm run db:reset     # Reset database (if using Supabase CLI)
npm run db:migrate   # Run migrations (if using Supabase CLI)
```

### Adding New Features

1. **Components**: Add to `src/components/`
2. **Pages**: Add to `src/app/`
3. **Types**: Add to `src/types/`
4. **Utilities**: Add to `src/lib/`
5. **Server Actions**: Add to `src/app/actions/`

### Code Style

- Use TypeScript strict mode
- Follow Next.js 14 App Router patterns
- Use Server Components by default
- Use Client Components only when needed
- Follow shadcn/ui component patterns

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
RESEND_API_KEY=your_production_resend_api_key
```

## API Reference

### Server Actions

#### Authentication
- `signUp(email, password)` - Create new user account
- `signIn(email, password)` - Sign in user
- `signOut()` - Sign out user
- `getUser()` - Get current user

#### Transactions
- `createTransaction(data)` - Add new transaction
- `updateTransaction(id, data)` - Update transaction
- `deleteTransaction(id)` - Delete transaction
- `getTransactions(filters?)` - Get user transactions

#### Reports
- `generateReport(year, options)` - Generate tax report
- `getReports()` - Get user reports
- `downloadReport(id, format)` - Download report

#### Settings
- `updateProfile(userId, data)` - Update user profile
- `updateTaxSettings(userId, data)` - Update tax settings
- `connectExchange(userId, exchange, credentials)` - Connect exchange
- `addWallet(userId, address, blockchain, label)` - Add wallet

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All user data is protected with Row Level Security (RLS)
- API routes are rate-limited
- Authentication is handled by Supabase
- Sensitive operations require user authentication
- Input validation using Zod schemas

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@cryptotax.app
- 📚 Documentation: [docs.cryptotax.app](https://docs.cryptotax.app)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/cryptotax/issues)

## Roadmap

- [ ] CSV import for transactions
- [ ] More exchange integrations
- [ ] Advanced tax calculations
- [ ] Multi-currency support
- [ ] Tax advisor dashboard
- [ ] Mobile app
- [ ] API for third-party integrations

---

Built with ❤️ for the crypto community