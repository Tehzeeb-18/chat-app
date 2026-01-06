# 🚀 Deploy with Supabase (Free)

## Quick Setup Guide

### 1. Create Supabase Database (5 min)

**Go to:** https://supabase.com

1. Sign up (free, no credit card)
2. Create new project:
   - Name: `chat-app`
   - Password: (create and save it!)
   - Region: East US
3. Wait for provisioning (~2 min)

---

### 2. Get Connection String (1 min)

In Supabase:
1. Settings → Database
2. Connection string → **Connection pooling** tab
3. Copy the URI
4. Replace `[YOUR-PASSWORD]` with your actual password

**Example:**
```
postgresql://postgres.abcdefgh:MyPassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

### 3. Update Vercel (2 min)

**Go to:** https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables

1. Find `DATABASE_URL` → Click **Edit**
2. Paste your Supabase connection string
3. Save

**Also create Vercel Blob:**
1. Go to Storage tab
2. Create Database → Blob
3. Name: `chat-app-files`

---

### 4. Deploy (3 min)

```powershell
cd C:\Users\DeLL\Documents\chat-app
vercel --prod --cwd chat-app
```

---

### 5. Create Tables (1 min)

```powershell
cd chat-app
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## ✅ Done!

Your app is live at: **https://chat-app-ollq.vercel.app**

---

## What You Get (Free)

**Supabase:**
- 500 MB database
- Unlimited requests
- 2 GB bandwidth/month
- PostgreSQL database

**Vercel Blob:**
- 1 GB file storage
- 100 GB bandwidth/month
- CDN distribution

**Vercel Hosting:**
- Unlimited deployments
- Automatic HTTPS
- Global CDN

---

## Important Notes

✅ Use **Connection pooling** URI (port 6543)
✅ Replace `[YOUR-PASSWORD]` in connection string
✅ Use `--cwd chat-app` flag when deploying
✅ Create Vercel Blob for file uploads

---

## Quick Links

- **Supabase:** https://supabase.com
- **Vercel Settings:** https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings
- **Environment Variables:** https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables
- **Storage:** https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/storage

---

## All Commands

```powershell
# After setting up Supabase and updating DATABASE_URL:

cd C:\Users\DeLL\Documents\chat-app

# Deploy
vercel --prod --cwd chat-app

# Set up database
cd chat-app
vercel env pull .env.local
npx prisma generate
npx prisma db push

# Test locally (optional)
npm run dev
```

---

## Time Required

- Supabase setup: 5 minutes
- Vercel config: 2 minutes
- Deploy: 3 minutes
- Database setup: 1 minute

**Total: ~11 minutes** 🚀
