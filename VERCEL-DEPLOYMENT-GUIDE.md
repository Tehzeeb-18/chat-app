# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### Step 1: Go to Vercel
1. Visit: **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Sign in with your **GitHub account**

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find **"chat-app"** in your repository list
3. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect Next.js. Just verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

#### Required Variables:

```env
# Database (Use Vercel Postgres or other cloud database)
DATABASE_URL=your_production_database_url

# NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_generated_secret_here

# Optional: Google OAuth (if you want to enable it)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### How to Generate NEXTAUTH_SECRET:
Run this in your terminal:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

### Step 5: Set Up Database

#### Option A: Vercel Postgres (Recommended)
1. In your Vercel project dashboard
2. Go to **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Copy the `DATABASE_URL` connection string
6. Add it to Environment Variables

#### Option B: Other Database Providers
- **Supabase**: https://supabase.com (Free tier available)
- **PlanetScale**: https://planetscale.com (Free tier available)
- **Railway**: https://railway.app (Free tier available)
- **Neon**: https://neon.tech (Free tier available)

### Step 6: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your app will be live! 🎉

### Step 7: Run Database Migrations
After first deployment:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
cd chat-app
vercel link
```

4. Run Prisma migrations:
```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## 🔧 Post-Deployment Configuration

### Update NEXTAUTH_URL
1. After deployment, copy your Vercel URL (e.g., `https://chat-app-xyz.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Update `NEXTAUTH_URL` to your actual Vercel URL
4. Redeploy (Deployments → Click "..." → Redeploy)

### Configure Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain

---

## 📋 Environment Variables Checklist

### Required for Production:
- [ ] `DATABASE_URL` - Production database connection string
- [ ] `NEXTAUTH_URL` - Your Vercel app URL
- [ ] `NEXTAUTH_SECRET` - Generated secret (32+ characters)

### Optional:
- [ ] `GOOGLE_CLIENT_ID` - For Google OAuth
- [ ] `GOOGLE_CLIENT_SECRET` - For Google OAuth

---

## 🗄️ Database Setup Options

### Option 1: Vercel Postgres (Easiest)

**Pros:**
- Integrated with Vercel
- Automatic connection
- Free tier available
- No configuration needed

**Steps:**
1. Vercel Dashboard → Storage → Create Database
2. Select Postgres
3. Connection string auto-added to env vars
4. Done!

### Option 2: Supabase (Recommended for Free Tier)

**Pros:**
- Generous free tier
- PostgreSQL database
- Built-in auth (optional)
- Real-time features

**Steps:**
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string (use "Connection Pooling" URL)
5. Add to Vercel env vars as `DATABASE_URL`

**Connection String Format:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### Option 3: PlanetScale

**Pros:**
- MySQL-compatible
- Generous free tier
- Branching for databases
- No migrations needed

**Steps:**
1. Go to https://planetscale.com
2. Create new database
3. Get connection string
4. Add to Vercel env vars

### Option 4: Railway

**Pros:**
- PostgreSQL
- Free tier
- Simple setup
- Good for development

**Steps:**
1. Go to https://railway.app
2. New Project → Provision PostgreSQL
3. Copy connection string
4. Add to Vercel env vars

---

## 🚨 Important Notes

### File Uploads
Vercel has a **serverless** architecture, so uploaded files won't persist between deployments.

**Solutions:**

#### Option A: Use Vercel Blob Storage
```bash
npm install @vercel/blob
```

Update `app/api/upload/route.ts`:
```typescript
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  const blob = await put(file.name, file, {
    access: 'public',
  });
  
  return Response.json({ url: blob.url });
}
```

#### Option B: Use Cloudinary (Recommended)
1. Sign up at https://cloudinary.com (free tier)
2. Install: `npm install cloudinary`
3. Update upload route to use Cloudinary

#### Option C: Use AWS S3
1. Create S3 bucket
2. Install: `npm install @aws-sdk/client-s3`
3. Update upload route

### Database Migrations
Run migrations after every schema change:
```bash
npx prisma db push
```

Or use Prisma Migrate for production:
```bash
npx prisma migrate deploy
```

---

## 🔍 Troubleshooting

### Build Fails
**Error: "Module not found"**
- Solution: Make sure all dependencies are in `package.json`
- Run: `npm install` locally first

**Error: "Prisma Client not generated"**
- Solution: Add to `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Issues
**Error: "Can't reach database"**
- Check `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- For Supabase: Use "Connection Pooling" URL

### Environment Variables Not Working
- Make sure to redeploy after adding env vars
- Check variable names match exactly (case-sensitive)
- No quotes needed in Vercel env vars

### Images Not Loading
- Use Vercel Blob or external storage (Cloudinary, S3)
- Don't rely on `/public/uploads` for production

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Free)
1. Go to Analytics tab in Vercel Dashboard
2. Enable Web Analytics
3. View real-time traffic and performance

### Error Monitoring
Consider adding:
- **Sentry**: https://sentry.io (error tracking)
- **LogRocket**: https://logrocket.com (session replay)

---

## 🎯 Production Checklist

Before going live:

### Security
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Database credentials are secure
- [ ] No sensitive data in code
- [ ] HTTPS enabled (automatic on Vercel)

### Performance
- [ ] Images optimized
- [ ] Database indexed properly
- [ ] Caching configured
- [ ] CDN enabled (automatic on Vercel)

### Features
- [ ] All features tested in production
- [ ] File uploads working (with cloud storage)
- [ ] Database migrations applied
- [ ] Email/OAuth configured (if using)

### Monitoring
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Uptime monitoring (optional)

---

## 🚀 Deployment Commands

### Deploy from CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Redeploy
```bash
vercel --prod --force
```

### View Logs
```bash
vercel logs
```

---

## 🌐 Custom Domain Setup

### Add Domain
1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `chat.yourdomain.com`)
3. Configure DNS:

**For Subdomain (chat.yourdomain.com):**
```
Type: CNAME
Name: chat
Value: cname.vercel-dns.com
```

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

4. Wait for DNS propagation (5-30 minutes)
5. Update `NEXTAUTH_URL` to your custom domain

---

## 💡 Pro Tips

### Automatic Deployments
- Every push to `main` branch auto-deploys
- Pull requests create preview deployments
- Test features before merging

### Preview Deployments
- Each PR gets a unique URL
- Test changes before production
- Share with team for review

### Environment Variables per Environment
- Production: Live app
- Preview: PR deployments
- Development: Local development

### Rollback
If something breaks:
1. Go to Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

---

## 📞 Support

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Twitter: @vercel

### Database Support
- Supabase: https://supabase.com/docs
- PlanetScale: https://planetscale.com/docs
- Railway: https://docs.railway.app

---

## 🎉 You're Done!

Your chat app is now live on Vercel! 🚀

**Next Steps:**
1. Share your app URL with users
2. Monitor performance and errors
3. Add more features
4. Scale as needed

**Your app URL:**
`https://your-app-name.vercel.app`

---

**Need help?** Check the documentation or reach out to the community!

**Happy Deploying! 🎊**
