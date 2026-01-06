# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- PostgreSQL database (Supabase/Railway/Neon)

### Step-by-Step

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Set Up Database**
   
   **Option A: Supabase (Recommended)**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Go to Settings > Database
   - Copy connection string (use "Connection pooling" for production)
   
   **Option B: Railway**
   - Go to [railway.app](https://railway.app)
   - Create new project > Add PostgreSQL
   - Copy DATABASE_URL from variables
   
   **Option C: Neon**
   - Go to [neon.tech](https://neon.tech)
   - Create new project
   - Copy connection string

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

4. **Add Environment Variables**
   
   In Vercel dashboard, add these variables:
   
   ```env
   DATABASE_URL=your-database-connection-string
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
   GOOGLE_CLIENT_ID=your-google-client-id (optional)
   GOOGLE_CLIENT_SECRET=your-google-client-secret (optional)
   NEXT_PUBLIC_SOCKET_URL=https://your-app.vercel.app
   ```

5. **Run Database Migrations**
   
   After first deployment, run migrations:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Link project
   vercel link
   
   # Run migrations
   vercel env pull .env.local
   npx prisma generate
   npx prisma db push
   ```

6. **Redeploy**
   
   Trigger a new deployment to apply changes:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push
   ```

## Alternative Deployment Options

### Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add PostgreSQL service
4. Add environment variables
5. Deploy

### Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Add PostgreSQL database
5. Configure environment variables
6. Deploy

### DigitalOcean App Platform

1. Go to DigitalOcean
2. Create new App
3. Connect GitHub repository
4. Add managed PostgreSQL database
5. Configure environment variables
6. Deploy

## Socket.IO Configuration for Production

### Important Notes

- Vercel has limitations with WebSocket connections
- For production Socket.IO, consider:
  1. **Separate Socket.IO server** on Railway/Render
  2. **Use Pusher** instead of Socket.IO
  3. **Use Ably** for real-time features

### Option 1: Separate Socket.IO Server

Create a separate Node.js server for Socket.IO:

```javascript
// server.js
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  // Your socket logic here
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT);
```

Deploy this to Railway/Render and update `NEXT_PUBLIC_SOCKET_URL`.

### Option 2: Use Pusher (Recommended for Vercel)

1. Sign up at [pusher.com](https://pusher.com)
2. Create new Channels app
3. Install Pusher:
   ```bash
   npm install pusher pusher-js
   ```
4. Replace Socket.IO implementation with Pusher

### Option 3: Use Ably

1. Sign up at [ably.com](https://ably.com)
2. Get API key
3. Install Ably:
   ```bash
   npm install ably
   ```
4. Replace Socket.IO with Ably

## Post-Deployment Checklist

- [ ] Database is accessible
- [ ] Environment variables are set
- [ ] Database migrations ran successfully
- [ ] Authentication works (email + Google)
- [ ] Real-time messaging works
- [ ] Dark/light mode toggle works
- [ ] Responsive design on mobile
- [ ] SSL certificate is active (HTTPS)
- [ ] Custom domain configured (optional)

## Monitoring & Maintenance

### Recommended Tools

- **Vercel Analytics**: Built-in analytics
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Uptime Robot**: Uptime monitoring

### Database Backups

- Enable automated backups on your database provider
- Test restore process regularly
- Keep backups for at least 30 days

### Performance Optimization

1. **Enable caching**:
   ```typescript
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

2. **Optimize images**:
   - Use Next.js Image component
   - Enable image optimization in Vercel

3. **Database optimization**:
   - Add indexes to frequently queried fields
   - Use connection pooling
   - Monitor slow queries

4. **CDN**:
   - Vercel automatically uses CDN
   - Consider Cloudflare for additional caching

## Scaling Considerations

### When to Scale

- More than 1000 concurrent users
- Database queries taking > 100ms
- High CPU/memory usage
- Frequent timeouts

### Scaling Strategies

1. **Database**:
   - Upgrade to larger instance
   - Add read replicas
   - Implement caching (Redis)

2. **Application**:
   - Vercel auto-scales
   - Consider serverless functions for heavy operations

3. **Real-time**:
   - Use managed service (Pusher/Ably)
   - Implement message queues (Redis/RabbitMQ)

## Security Best Practices

- [ ] Use HTTPS only
- [ ] Enable CORS properly
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable database SSL
- [ ] Implement CSP headers
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Troubleshooting

### Build Fails

- Check build logs in Vercel
- Verify all dependencies are in package.json
- Ensure TypeScript has no errors
- Check environment variables

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database is accessible from Vercel
- Enable SSL if required
- Check connection limits

### Real-time Not Working

- Verify Socket.IO server is running
- Check CORS configuration
- Verify NEXT_PUBLIC_SOCKET_URL
- Check browser console for errors

### Authentication Issues

- Verify NEXTAUTH_URL matches deployment URL
- Check NEXTAUTH_SECRET is set
- Verify Google OAuth redirect URIs
- Check session configuration

## Cost Estimation

### Free Tier (Hobby Projects)

- Vercel: Free (100GB bandwidth)
- Supabase: Free (500MB database, 2GB bandwidth)
- Total: $0/month

### Production (Small Business)

- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Pusher: $49/month (for real-time)
- Total: ~$94/month

### Enterprise

- Custom pricing based on usage
- Dedicated infrastructure
- SLA guarantees
- Priority support

## Support

For deployment issues:
1. Check Vercel documentation
2. Review database provider docs
3. Check Next.js deployment guide
4. Contact support if needed
