# 🗄️ Production Database Setup for Vercel

## Quick Setup with Supabase (5 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in with GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Fill in:
   - **Name**: `chat-app-production`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., US East)
3. Click **"Create new project"** (takes ~2 minutes)

### Step 3: Get Connection String
1. Once project is ready, go to **Settings** (gear icon)
2. Click **"Database"** in the sidebar
3. Scroll to **"Connection string"**
4. Select **"Connection pooling"** tab (IMPORTANT!)
5. Copy the **URI** format
6. Replace `[YOUR-PASSWORD]` with your database password

**Example:**
```
postgresql://postgres.abcdefgh:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Step 4: Add to Vercel
1. Go to https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click **"Settings"** → **"Environment Variables"**
3. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Supabase connection string (with password filled in)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **"Save"**

### Step 5: Update Prisma Schema
Your `prisma/schema.prisma` needs to change from SQLite to PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 6: Push Changes & Deploy
```bash
# Update schema
cd chat-app

# Commit the schema change
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push origin main
```

### Step 7: Run Database Migrations
After Vercel deploys:

```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push
```

---

## Alternative: Vercel Postgres (Even Easier!)

### Step 1: Create Database in Vercel
1. Go to your project: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Click **"Continue"**
6. Database name: `chat-app-db`
7. Click **"Create"**

### Step 2: Connect to Project
1. Vercel will ask which projects to connect
2. Select **"chat-app-ollq"**
3. Click **"Connect"**

### Step 3: Done!
- `DATABASE_URL` is automatically added to your environment variables
- No manual configuration needed
- Automatically available in all environments

### Step 4: Update Schema & Deploy
Same as Supabase steps 5-7 above.

---

## Environment Variables Summary

After setting up database, your Vercel environment variables should have:

```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_URL=https://chat-app-ollq.vercel.app
NEXTAUTH_SECRET=<generate-this-next>
```

### Generate NEXTAUTH_SECRET
Run in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and add it as `NEXTAUTH_SECRET` in Vercel.

---

## Troubleshooting

### Error: "Can't reach database server"
- Make sure you used **"Connection pooling"** URL (not direct connection)
- Check password is correct (no special characters causing issues)
- Verify database is in "Active" state

### Error: "Invalid connection string"
- Format must be: `postgresql://user:password@host:port/database`
- No spaces or line breaks
- Password must be URL-encoded if it has special characters

### Error: "Prisma Client not generated"
- Run `npx prisma generate` locally
- Make sure `postinstall` script is in package.json:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

---

## Next Steps

1. ✅ Set up production database (Supabase or Vercel Postgres)
2. ✅ Add `DATABASE_URL` to Vercel environment variables
3. ✅ Update `prisma/schema.prisma` to use PostgreSQL
4. ✅ Generate `NEXTAUTH_SECRET` and add to Vercel
5. ✅ Push changes to GitHub
6. ✅ Run `npx prisma db push` to create tables
7. ✅ Test your deployed app!

**Your app will be live at:** https://chat-app-ollq.vercel.app

---

**Need help?** The Supabase and Vercel communities are very responsive!
