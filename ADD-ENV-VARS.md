# ⚠️ Missing Environment Variables

## Your Deployment is Failing

You have 2 out of 4 required environment variables. You need to add:

### ✅ Already Set:
- `DATABASE_URL` ✓
- `NEXTAUTH_URL` ✓

### ❌ Missing:
- `NEXTAUTH_SECRET` (Required for authentication)
- `BLOB_READ_WRITE_TOKEN` (Required for file uploads)

---

## How to Fix

### Option 1: Add via Command Line (Fastest)

```powershell
cd C:\Users\DeLL\Documents\chat-app

# Add NEXTAUTH_SECRET
vercel env add NEXTAUTH_SECRET
# When prompted, paste: 8f7e6d5c4b3a2918f7e6d5c4b3a29180
# Select: Production, Preview, Development (press space to select, enter to confirm)
```

### Option 2: Add via Vercel Dashboard

1. Go to: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables

2. Click **Add New**

3. Add this variable:
   ```
   Key: NEXTAUTH_SECRET
   Value: 8f7e6d5c4b3a2918f7e6d5c4b3a29180
   Environments: Production, Preview, Development (select all)
   ```

4. Click **Save**

---

## About BLOB_READ_WRITE_TOKEN

This is automatically added when you create Vercel Blob storage:

1. Go to: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click **Storage** tab
3. Click **Create Database** → Select **Blob**
4. Choose a name (e.g., "chat-app-files")
5. Click **Create**

Vercel will automatically add `BLOB_READ_WRITE_TOKEN` to your environment variables.

---

## After Adding Variables

Redeploy:

```powershell
vercel --prod
```

Or just push a new commit (triggers auto-deploy):

```powershell
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

---

## Quick Fix Commands

```powershell
cd C:\Users\DeLL\Documents\chat-app

# Add NEXTAUTH_SECRET
vercel env add NEXTAUTH_SECRET
# Paste: 8f7e6d5c4b3a2918f7e6d5c4b3a29180
# Select all environments

# Redeploy
vercel --prod
```

That's it! Your deployment should succeed after adding `NEXTAUTH_SECRET`.
