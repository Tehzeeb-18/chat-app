# 🆓 Use Supabase (Free Forever)

## Vercel Postgres Not Available?

No problem! Use **Supabase** - it's completely free with generous limits:
- 500 MB database storage
- Unlimited API requests
- 2 GB bandwidth/month
- No credit card required

---

## 🎯 Set Up Supabase (5 minutes)

### Step 1: Create Supabase Account

1. Go to: https://supabase.com
2. Click **Start your project**
3. Sign up with GitHub (easiest) or email
4. Verify your email if needed

---

### Step 2: Create New Project

1. Click **New Project**
2. Choose your organization (or create one)
3. Fill in:
   - **Name:** `chat-app`
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to you (e.g., `East US (North Virginia)`)
4. Click **Create new project**
5. Wait 2-3 minutes for database to provision

---

### Step 3: Get Database Connection String

1. In your Supabase project, click **Settings** (gear icon in sidebar)
2. Click **Database** in the left menu
3. Scroll down to **Connection string**
4. Select **Connection pooling** tab
5. Copy the **URI** (it looks like this):

```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

6. **Important:** Replace `[YOUR-PASSWORD]` with the database password you created in Step 2

---

### Step 4: Add to Vercel Environment Variables

1. Go to: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables

2. Find `DATABASE_URL` and click **Edit**

3. Replace the value with your Supabase connection string

4. Make sure it's set for: Production, Preview, Development

5. Click **Save**

---

### Step 5: Deploy

```powershell
cd C:\Users\DeLL\Documents\chat-app
vercel --prod --cwd chat-app
```

---

### Step 6: Create Database Tables

```powershell
cd chat-app
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## 🎉 Done!

Your app will be live at: **https://chat-app-ollq.vercel.app**

---

## Supabase Connection String Format

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Example:**
```
postgresql://postgres.abcdefghijklmnop:MySecurePassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important Notes:**
- Use **Connection pooling** URI (port 6543), not direct connection
- Replace `[YOUR-PASSWORD]` with your actual password
- No spaces in the connection string
- If password has special characters, URL-encode them

---

## Vercel Blob Storage

You still need Vercel Blob for file uploads:

1. Go to: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click **Storage** tab
3. Click **Create Database** → **Blob**
4. Name: `chat-app-files`
5. Click **Create**

This is free on Vercel (1 GB storage, 100 GB bandwidth/month).

---

## Complete Setup Checklist

- [ ] Create Supabase account
- [ ] Create Supabase project
- [ ] Get connection string (Connection pooling URI)
- [ ] Replace `[YOUR-PASSWORD]` with actual password
- [ ] Update `DATABASE_URL` in Vercel
- [ ] Create Vercel Blob storage
- [ ] Deploy: `vercel --prod --cwd chat-app`
- [ ] Run: `npx prisma db push`

---

## Why Supabase?

✅ **Free forever** (no credit card required)
✅ **500 MB database** (plenty for chat app)
✅ **Unlimited API requests**
✅ **Built on PostgreSQL** (same as Vercel Postgres)
✅ **Connection pooling** (works with serverless)
✅ **Dashboard** to view your data
✅ **Automatic backups**

---

## Quick Commands

```powershell
# After setting up Supabase and updating DATABASE_URL in Vercel:

cd C:\Users\DeLL\Documents\chat-app

# Deploy
vercel --prod --cwd chat-app

# Set up database
cd chat-app
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## Troubleshooting

### Error: "Can't reach database server"
- Make sure you're using **Connection pooling** URI (port 6543)
- Check that you replaced `[YOUR-PASSWORD]` with actual password
- Verify no spaces in connection string

### Error: "Invalid connection string"
- Must start with `postgresql://`
- Use connection pooling URI, not direct connection
- URL-encode special characters in password

### Can't find connection string
- Go to Supabase project → Settings → Database
- Scroll to "Connection string" section
- Select **Connection pooling** tab (not Session mode)

---

## 🚀 Ready to Deploy!

1. **Create Supabase project** (5 minutes)
2. **Get connection string** (1 minute)
3. **Update Vercel DATABASE_URL** (1 minute)
4. **Create Vercel Blob** (1 minute)
5. **Deploy** (3 minutes)

Total: ~11 minutes to go live with free database! 🎉
