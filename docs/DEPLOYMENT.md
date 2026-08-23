# DEPLOYMENT.md
# Deployment Guide

## 🚀 Overview

| Service | Provider | URL |
|---------|----------|-----|
| **Frontend** | Vercel | vercel.com |
| **Database** | Supabase | supabase.com |
| **Storage** | Supabase | (included) |
| **Auth** | Supabase | (included) |

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `.env.local` has all required variables
- [ ] `npm run build` passes without errors
- [ ] Supabase project is set up
- [ ] Database tables created
- [ ] RLS policies configured
- [ ] Admin user created in Supabase Auth

---

## 🔧 Step 1: GitHub Setup

### Initialize Git
```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: portfolio project setup"
```

### Create GitHub Repository
1. Go to github.com/new
2. Name: `portfolio`
3. Keep it **private** (recommended)
4. Don't initialize with README
5. Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Supabase Setup

### Create Project
1. Go to supabase.com
2. Click "New Project"
3. Name: `portfolio`
4. Database password: (save this!)
5. Region: Select closest to you
6. Click "Create new project"

### Get API Keys
1. Go to Settings → API
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Create Tables
1. Go to SQL Editor
2. Paste the SQL from `DATABASE.md`
3. Click "Run"

### Create Admin User
1. Go to Authentication → Users
2. Click "Add user"
3. Email: `admin@yourdomain.com`
4. Password: (choose strong password)
5. Click "Create user"

---

## ⚙️ Step 3: Vercel Setup

### Connect Repository
1. Go to vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select your `portfolio` repository
5. Click "Import"

### Configure Build Settings
```
Framework Preset: Next.js
Build Command: (leave default)
Output Directory: (leave default)
Install Command: (leave default)
```

### Add Environment Variables
Click "Environment Variables" and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> ⚠️ **Important:** Add these to all environments (Production, Preview, Development)

### Deploy
1. Click "Deploy"
2. Wait for build to complete (~1-2 minutes)
3. Click "Visit" to see your site!

---

## 🔐 Step 4: Auth Setup

### Enable Email Auth
1. Go to Supabase → Authentication → Providers
2. Email should be enabled by default
3. Confirm email: **Disable** (for easier testing)
4. Click "Save"

### Test Login
1. Go to `https://yourapp.vercel.app/login`
2. Enter admin email and password
3. Should redirect to dashboard

---

## 📁 Step 5: Storage Setup

### Create Bucket
1. Go to Supabase → Storage
2. Click "New Bucket"
3. Name: `images`
4. Public: **Yes** (for portfolio images)
5. Click "Create Bucket"

### Set Policies
```sql
-- Allow public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated delete
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

---

## 🌐 Step 6: Custom Domain (Optional)

### Add Domain in Vercel
1. Go to your project → Settings → Domains
2. Enter your domain: `yourdomain.com`
3. Click "Add"

### Configure DNS
Add these DNS records at your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate
- Vercel auto-provisions SSL
- Wait ~5 minutes for propagation
- Your site is now live at `https://yourdomain.com`!

---

## 🔄 Step 7: Continuous Deployment

### Automatic Deploys
- Every push to `main` → Production deploy
- Every push to other branches → Preview deploy
- Every PR → Preview deploy with comment

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check for type errors
npm run build

# Check for lint errors
npm run lint

# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Import path errors
```

### Supabase Connection Issues
```bash
# Verify env vars
cat .env.local

# Test connection
npm run dev
# Open browser console, check for errors
```

### Images Not Loading
```bash
# Check Supabase Storage
1. Go to Storage → images
2. Verify bucket exists and is public
3. Check file URL is correct
```

### Auth Not Working
```bash
# Check Supabase Auth
1. Go to Authentication → Users
2. Verify user exists
3. Check email confirmed status
```

---

## 📊 Environment Variables

### Required
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Optional (for future features)
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (for contact form)
RESEND_API_KEY=re_xxxxxxxxxx
```

---

## 🔒 Security Notes

1. **Never commit `.env.local`** — it's in `.gitignore`
2. **Use environment variables** in Vercel dashboard
3. **RLS is enabled** — data is protected at database level
4. **Admin auth required** — for all write operations
5. **HTTPS enforced** — Vercel auto-redirects HTTP → HTTPS

---

## 📈 Post-Deployment

### Verify Everything Works
- [ ] Homepage loads correctly
- [ ] Cursor effect works
- [ ] Projects page shows data
- [ ] Blog page shows data
- [ ] Contact form submits
- [ ] Admin login works
- [ ] Admin CRUD works
- [ ] Images upload correctly
- [ ] Mobile responsive
- [ ] SEO meta tags present

### Share Your Portfolio!
```
https://yourdomain.com
https://yourdomain.com/admin
```

---

*Last Updated: August 2026*