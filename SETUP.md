# Setup Instructions

## Quick Start Guide

### 1. Install Dependencies

Once your network connection is stable, run:

```bash
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL

Install PostgreSQL locally and create a database:

```bash
createdb chatapp
```

Update `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/chatapp?schema=public"
```

#### Option B: Cloud Database (Recommended for Production)

Use a cloud provider like:
- **Supabase** (free tier available)
- **Railway** (free tier available)
- **Neon** (free tier available)

Get your connection string and add it to `.env`.

### 3. Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Generate a secure NextAuth secret:

```bash
openssl rand -base64 32
```

Add it to `.env`:
```env
NEXTAUTH_SECRET="your-generated-secret-here"
```

### 4. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

### 5. (Optional) Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Network Issues During Install

If you encounter `ECONNRESET` errors:

1. Check your internet connection
2. Try using a different network
3. Configure npm proxy if behind corporate firewall:
   ```bash
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080
   ```
4. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

### Database Connection Issues

- Ensure PostgreSQL is running
- Check connection string format
- Verify database exists
- Check firewall settings

### Socket.IO Not Working

- Ensure port 3000 is not blocked
- Check browser console for errors
- Verify Socket.IO client version matches server

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database for Production

Use a managed PostgreSQL service:
- Supabase
- Railway
- Neon
- AWS RDS
- Digital Ocean

### Environment Variables Checklist

- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_URL` (your production domain)
- [ ] `NEXTAUTH_SECRET`
- [ ] `GOOGLE_CLIENT_ID` (optional)
- [ ] `GOOGLE_CLIENT_SECRET` (optional)

## Testing

### Create Test Users

1. Register at `/register`
2. Create multiple accounts with different emails
3. Start conversations between users

### Test Features

- [ ] User registration
- [ ] User login
- [ ] Google OAuth (if configured)
- [ ] Send messages
- [ ] Receive messages in real-time
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Dark/light mode toggle
- [ ] Responsive design on mobile

## Next Steps

After setup, consider:

1. Customizing the color scheme in `tailwind.config.ts`
2. Adding more emoji to `message-input.tsx`
3. Implementing group chats
4. Adding file upload functionality
5. Setting up push notifications
6. Adding message search
7. Implementing user profiles

## Support

If you encounter issues:

1. Check the console for errors
2. Review the README.md
3. Check Prisma logs: `npx prisma studio`
4. Verify all environment variables are set
5. Ensure all dependencies are installed

## Performance Tips

- Use connection pooling for database
- Enable Redis for session storage (production)
- Implement message pagination
- Add database indexes for frequently queried fields
- Use CDN for static assets
- Enable Next.js image optimization
