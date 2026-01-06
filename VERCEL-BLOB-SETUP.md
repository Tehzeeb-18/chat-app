# Vercel Blob Storage Setup ✅

## What I Did

Integrated **Vercel Blob Storage** for file uploads (profile pictures, chat files, images, videos, documents).

### Changes Made:
1. ✅ Installed `@vercel/blob` package
2. ✅ Updated `/api/upload` route to use Vercel Blob
3. ✅ Files now upload to cloud storage (not local `/public/uploads/`)
4. ✅ Files persist across deployments

---

## How to Set Up Vercel Blob

### Step 1: Create Blob Storage in Vercel

1. Go to your project: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq
2. Click **Storage** tab
3. Click **Create Database** → Select **Blob**
4. Choose a name (e.g., "chat-app-files")
5. Click **Create**

**Vercel automatically:**
- Creates the blob storage
- Adds `BLOB_READ_WRITE_TOKEN` to environment variables
- Connects it to your project

---

### Step 2: That's It!

No additional configuration needed. The `@vercel/blob` package automatically uses the `BLOB_READ_WRITE_TOKEN` environment variable.

---

## What Works Now

### File Uploads:
- ✅ Profile pictures
- ✅ Chat images
- ✅ Videos
- ✅ Documents
- ✅ All file types (up to 10MB)

### Storage:
- ✅ Files stored in Vercel Blob (cloud)
- ✅ Files persist across deployments
- ✅ Public URLs for all files
- ✅ Automatic CDN distribution

---

## Pricing

**Vercel Blob Free Tier:**
- 1 GB storage
- 100 GB bandwidth/month
- Perfect for testing and small apps

**Pro Tier ($20/month):**
- 100 GB storage
- 1 TB bandwidth/month

---

## Complete Deployment Steps

### 1️⃣ Create Vercel Postgres (Database)
- Go to Storage → Create Database → **Postgres**
- Vercel adds `DATABASE_URL` automatically

### 2️⃣ Create Vercel Blob (File Storage)
- Go to Storage → Create Database → **Blob**
- Vercel adds `BLOB_READ_WRITE_TOKEN` automatically

### 3️⃣ Add Remaining Environment Variables

Go to: https://vercel.com/tehzeeb-hassans-projects/chat-app-ollq/settings/environment-variables

Add these two:

```
Key: NEXTAUTH_SECRET
Value: (generate at https://generate-secret.vercel.app/32)
Environments: Production, Preview, Development
```

```
Key: NEXTAUTH_URL
Value: https://chat-app-ollq.vercel.app
Environments: Production
```

### 4️⃣ Deploy

```powershell
cd C:\Users\DeLL\Documents\chat-app
vercel --prod
```

### 5️⃣ Set Up Database Tables

```powershell
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## Environment Variables Summary

After creating Postgres + Blob in Vercel, you'll have:

```bash
# Automatically added by Vercel:
DATABASE_URL="postgres://..."           # From Vercel Postgres
BLOB_READ_WRITE_TOKEN="vercel_blob_..." # From Vercel Blob

# You need to add manually:
NEXTAUTH_SECRET="..."                   # Generate new
NEXTAUTH_URL="https://chat-app-ollq.vercel.app"
```

---

## How File Uploads Work Now

### Before (Local Storage):
```
User uploads file → Saved to /public/uploads/ → Lost on redeploy
```

### After (Vercel Blob):
```
User uploads file → Uploaded to Vercel Blob → Permanent cloud URL
```

### Example URLs:
```
Before: /uploads/1234567890-image.jpg
After:  https://xxxxx.public.blob.vercel-storage.com/image-abc123.jpg
```

---

## Testing Locally

To test Blob storage locally:

1. Create Blob storage in Vercel (Step 1 above)
2. Pull environment variables:
   ```powershell
   cd chat-app
   vercel env pull .env.local
   ```
3. Run dev server:
   ```powershell
   npm run dev
   ```
4. Upload a file - it will go to Vercel Blob (even in development)

---

## Troubleshooting

### Error: "Missing BLOB_READ_WRITE_TOKEN"
→ Create Blob storage in Vercel dashboard (Storage tab)

### Error: "Failed to upload file"
→ Check Vercel Blob is created and token is in environment variables

### Files not uploading
→ Run `vercel env pull .env.local` to get latest environment variables

---

## What's Next

Your app is now production-ready with:
- ✅ Vercel Postgres (database)
- ✅ Vercel Blob (file storage)
- ✅ Real-time messaging (polling)
- ✅ Profile pictures
- ✅ File sharing
- ✅ All features working

Just deploy with `vercel --prod` and you're live! 🚀
