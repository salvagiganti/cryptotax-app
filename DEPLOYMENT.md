# CryptoTax Deployment Guide

This guide will help you deploy the CryptoTax application to production using Vercel as the primary deployment platform.

## 🚀 Quick Start (Vercel)

### Prerequisites
- [Vercel account](https://vercel.com)
- [Supabase account](https://supabase.com)
- [Resend account](https://resend.com) (for emails)
- Domain name (optional)

### 1. Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Deploy to Vercel

1. **Connect Repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the CryptoTax project

2. **Configure Build Settings:**
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

## 🗄️ Database Setup (Supabase)

### 1. Create Production Database

1. **Create New Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization
   - Enter project name: `cryptotax-production`
   - Set database password (save securely)
   - Select region closest to your users
   - Click "Create new project"

2. **Run Database Migrations:**
   ```sql
   -- Copy and paste these migrations in Supabase SQL Editor
   
   -- 1. Create profiles table
   CREATE TYPE subscription_tier_enum AS ENUM ('free', 'pro', 'enterprise');
   CREATE TYPE subscription_status_enum AS ENUM ('active', 'canceled', 'expired');
   
   CREATE TABLE public.profiles (
     id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
     full_name text,
     avatar_url text,
     subscription_tier subscription_tier_enum DEFAULT 'free'::public.subscription_tier_enum NOT NULL,
     subscription_status subscription_status_enum DEFAULT 'active'::public.subscription_status_enum NOT NULL,
     created_at timestamp with time zone DEFAULT now() NOT NULL,
     updated_at timestamp with time zone DEFAULT now() NOT NULL
   );
   
   -- 2. Create transactions table
   CREATE TYPE transaction_type_enum AS ENUM ('buy', 'sell', 'trade', 'income', 'expense', 'stake', 'unstake');
   
   CREATE TABLE public.transactions (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
     date timestamp with time zone DEFAULT now() NOT NULL,
     type transaction_type_enum NOT NULL,
     crypto_amount decimal NOT NULL,
     crypto_currency text NOT NULL,
     fiat_amount decimal NOT NULL,
     fiat_currency text DEFAULT 'EUR' NOT NULL,
     exchange text,
     notes text,
     created_at timestamp with time zone DEFAULT now() NOT NULL,
     updated_at timestamp with time zone DEFAULT now() NOT NULL
   );
   
   -- 3. Create tax_reports table
   CREATE TYPE report_status_enum AS ENUM ('draft', 'processing', 'completed', 'failed');
   
   CREATE TABLE public.tax_reports (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
     year integer NOT NULL,
     status report_status_enum DEFAULT 'draft'::public.report_status_enum NOT NULL,
     total_gains decimal,
     total_losses decimal,
     pdf_url text,
     created_at timestamp with time zone DEFAULT now() NOT NULL,
     completed_at timestamp with time zone,
     CONSTRAINT unique_user_year UNIQUE (user_id, year)
   );
   
   -- 4. Enable RLS
   ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.tax_reports ENABLE ROW LEVEL SECURITY;
   
   -- 5. Create RLS Policies
   -- Profiles
   CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
   
   -- Transactions
   CREATE POLICY "Users can view their own transactions." ON public.transactions FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can create their own transactions." ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update their own transactions." ON public.transactions FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete their own transactions." ON public.transactions FOR DELETE USING (auth.uid() = user_id);
   
   -- Tax Reports
   CREATE POLICY "Users can view their own tax reports." ON public.tax_reports FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can create their own tax reports." ON public.tax_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update their own tax reports." ON public.tax_reports FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete their own tax reports." ON public.tax_reports FOR DELETE USING (auth.uid() = user_id);
   
   -- 6. Create indexes
   CREATE INDEX transactions_user_id_idx ON public.transactions (user_id);
   CREATE INDEX transactions_date_idx ON public.transactions (date);
   CREATE INDEX tax_reports_user_id_idx ON public.tax_reports (user_id);
   CREATE INDEX tax_reports_year_idx ON public.tax_reports (year);
   ```

3. **Get Database Credentials:**
   - Go to Settings → API
   - Copy the following values:
     - Project URL
     - anon/public key
     - service_role key (keep secret!)

## 🔧 Environment Variables

### 1. Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key

# Optional: Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### 2. Environment Variable Sources

- **Supabase**: Get from Supabase project settings
- **Resend**: Create API key at [resend.com/api-keys](https://resend.com/api-keys)
- **Sentry**: Create project at [sentry.io](https://sentry.io) (optional)

## 📧 Email Setup (Resend)

### 1. Configure Resend

1. **Create Resend Account:**
   - Go to [resend.com](https://resend.com)
   - Sign up for an account
   - Verify your email

2. **Add Domain (Optional):**
   - Go to Domains section
   - Add your custom domain
   - Configure DNS records as instructed

3. **Create API Key:**
   - Go to API Keys section
   - Create new API key
   - Copy the key (starts with `re_`)
   - Add to Vercel environment variables

## 🌐 Domain Setup (Optional)

### 1. Custom Domain

1. **In Vercel:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Configure DNS as instructed

2. **Update Environment Variables:**
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain

## ✅ Post-Deployment Verification

### 1. Test Core Functionality

- [ ] **Landing Page**: Visit your domain, check all sections
- [ ] **Authentication**: Test signup, login, logout
- [ ] **Dashboard**: Verify dashboard loads and navigation works
- [ ] **Transactions**: Test adding, editing, deleting transactions
- [ ] **Reports**: Test report generation
- [ ] **Settings**: Verify all settings tabs work
- [ ] **Mobile**: Test on mobile devices
- [ ] **Performance**: Check page load speeds

### 2. Database Verification

- [ ] **User Registration**: Create test user account
- [ ] **Data Persistence**: Add transactions, verify they save
- [ ] **Security**: Verify users can only see their own data
- [ ] **Backup**: Confirm automatic backups are enabled

### 3. Email Verification

- [ ] **Welcome Email**: Test user registration email
- [ ] **Password Reset**: Test forgot password flow
- [ ] **Report Ready**: Test report completion email

## 🔄 Deployment Checklist

### Pre-Deployment
- [ ] Code committed and pushed to repository
- [ ] All tests passing locally
- [ ] Environment variables prepared
- [ ] Database migrations ready
- [ ] Email service configured
- [ ] Domain ready (if custom)

### Deployment
- [ ] Repository connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] Build successful
- [ ] Database migrations executed
- [ ] DNS configured (if custom domain)

### Post-Deployment
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Database operations work
- [ ] Email functionality works
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable
- [ ] Error monitoring active (if Sentry)

## 🚨 Rollback Procedure

If issues occur after deployment:

### 1. Quick Rollback (Vercel)
1. Go to Vercel dashboard
2. Navigate to your project
3. Go to "Deployments" tab
4. Find the last working deployment
5. Click "..." → "Promote to Production"

### 2. Database Rollback
1. Go to Supabase dashboard
2. Navigate to "Backups" section
3. Restore from previous backup if needed

### 3. Environment Variables
1. Revert environment variables in Vercel
2. Redeploy the application

## 📊 Monitoring & Maintenance

### 1. Set Up Monitoring
- **Vercel Analytics**: Enable in project settings
- **Sentry**: Configure error tracking
- **Uptime Monitoring**: Use services like UptimeRobot
- **Database Monitoring**: Monitor Supabase metrics

### 2. Regular Maintenance
- **Weekly**: Check error logs, user feedback
- **Monthly**: Review performance metrics, update dependencies
- **Quarterly**: Security audit, backup verification

## 🆘 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure migrations ran successfully

3. **Email Not Working**
   - Verify Resend API key
   - Check domain configuration
   - Test with simple email first

4. **Authentication Issues**
   - Check Supabase auth settings
   - Verify redirect URLs
   - Check environment variables

### Getting Help
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## 📝 Production Notes

### Known Limitations
- Free tier limitations apply to Supabase and Resend
- Some features require paid plans for production use
- Rate limiting is in-memory (consider Redis for scaling)

### Future Enhancements
- Add Redis for rate limiting
- Implement advanced caching
- Add more exchange integrations
- Implement real-time notifications
- Add advanced analytics

### Security Considerations
- All user data is protected with RLS
- API keys are environment-specific
- HTTPS enforced by Vercel
- Regular security updates recommended

---

**Deployment completed successfully!** 🎉

Your CryptoTax application should now be live and ready for users.

**Production URL**: `https://your-domain.vercel.app`

For support or questions, refer to the documentation or create an issue in the repository.
