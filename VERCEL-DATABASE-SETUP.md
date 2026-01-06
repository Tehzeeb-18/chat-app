# Database Setup for Vercel Deployment

## Quick Answer: DATABASE_URL Value

You need a **PostgreSQL database URL** for production. Here are your options:

---

## Option 1: Vercel Postgres (Recommended - Easiest)

**Steps:**
1. Go to your Vercel project dashboard: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click on **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose a name (e.g., "chat-app-db")
5. Select region closest to your users
6. Click **Create**

**Vercel will automatically:**
- Create the database
- Add `DATABASE_URL` to your environment variables
- Connect it to your project

**Format:**
```
postgres://default:xxxxx@xxx-pooler.aws.neon.tech:5432/verceldb
```

**Cost:** Free tier includes 256 MB storage, 60 hours compute time/month

---

## Option 2: Supabase (Recommended - Free Forever)

**Steps:**
1. Go to https://supabase.com
2. Create free account
3. Click **New Project**
4. Choose organization, name, password, region
5. Wait for database to provision (~2 minutes)
6. Go to **Settings** → **Database**
7. Scroll to **Connection String** → Select **Connection Pooling**
8. Copy the URI (mode: Session)

**Format:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Replace `[YOUR-PASSWORD]`** with the database password you set during project creation.

**Cost:** Free tier includes 500 MB database, 2 GB bandwidth/month

---

## Option 3: Neon (Serverless Postgres)

**Steps:**
1. Go to https://neon.tech
2. Sign up for free account
3. Create new project
4. Copy connection string from dashboard

**Format:**
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
```

**Cost:** Free tier includes 512 MB storage, 3 GB data transfer/month

---

## How to Add DATABASE_URL to Vercel

### Method 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables
2. Click **Add New**
3. Key: `DATABASE_URL`
4. Value: Your database connection string (from above)
5. Select all environments (Production, Preview, Development)
6. Click **Save**

### Method 2: Command Line
```bash
cd chat-app
vercel env add DATABASE_URL
# Paste your database URL when prompted
# Select: Production, Preview, Development
```

---

## Complete Environment Variables Needed

Add these to Vercel:

```bash
# 1. Database (from above)
DATABASE_URL="postgresql://..."

# 2. NextAuth Secret (generate new one)
NEXTAUTH_SECRET="generate-at-https://generate-secret.vercel.app/32"

# 3. NextAuth URL (your Vercel domain)
NEXTAUTH_URL="https://chat-app-ollq.vercel.app"
```

---

## After Adding DATABASE_URL

### Step 1: Redeploy
```bash
cd chat-app
vercel --prod
```

### Step 2: Run Database Migrations
After successful deployment:
```bash
# Pull environment variables
vercel env pull .env.local

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

---

## Troubleshooting

### Error: "Can't reach database server"
- Check if your IP is whitelisted (Supabase/Neon)
- Verify connection string is correct
- Ensure you're using connection pooling URL

### Error: "Invalid DATABASE_URL"
- Must start with `postgresql://` or `postgres://`
- No spaces or special characters in URL
- Password must be URL-encoded if it contains special characters

### Error: "SSL connection required"
Add to your DATABASE_URL:
```
?sslmode=require
```

Example:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

---

## My Recommendation

**Use Vercel Postgres** - it's the easiest option:
1. Integrated directly in Vercel dashboard
2. Automatic environment variable setup
3. No additional account needed
4. Same region as your deployment (faster)

Just go to your project → Storage → Create Database → Postgres

Then redeploy with `vercel --prod`
