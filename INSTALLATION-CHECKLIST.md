# Installation Checklist

Use this checklist to ensure proper setup of your chat application.

## ☑️ Pre-Installation

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] PostgreSQL installed (or cloud database ready)
- [ ] Git installed
- [ ] Code editor installed (VS Code recommended)
- [ ] Stable internet connection

## ☑️ Project Setup

### 1. Dependencies Installation
```bash
cd chat-app
npm install
```
- [ ] All dependencies installed successfully
- [ ] No error messages
- [ ] `node_modules` folder created

### 2. Environment Configuration
```bash
cp .env.example .env
```
- [ ] `.env` file created
- [ ] `DATABASE_URL` configured
- [ ] `NEXTAUTH_URL` set to `http://localhost:3000`
- [ ] `NEXTAUTH_SECRET` generated (use: `openssl rand -base64 32`)
- [ ] Google OAuth credentials added (optional)

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```
- [ ] Prisma Client generated
- [ ] Database schema pushed
- [ ] No migration errors
- [ ] Tables created successfully

### 4. Verify Installation
```bash
npm run dev
```
- [ ] Development server starts
- [ ] No compilation errors
- [ ] Can access http://localhost:3000
- [ ] Login page loads correctly

## ☑️ Feature Testing

### Authentication
- [ ] Can access `/register` page
- [ ] Can create new account
- [ ] Receives validation errors for invalid input
- [ ] Can access `/login` page
- [ ] Can login with credentials
- [ ] Google OAuth button visible (if configured)
- [ ] Redirects to `/chat` after login
- [ ] Can logout successfully

### Chat Interface
- [ ] Sidebar loads correctly
- [ ] Empty state shows when no conversations
- [ ] Theme toggle works (dark/light mode)
- [ ] Search bar is functional
- [ ] Responsive on mobile view

### Messaging (Requires 2+ Users)
- [ ] Can create conversation
- [ ] Can send message
- [ ] Message appears in chat
- [ ] Timestamp displays correctly
- [ ] Emoji picker opens
- [ ] Can insert emoji
- [ ] Typing indicator works
- [ ] Read receipts show

### Real-time Features
- [ ] Socket.IO connects (check browser console)
- [ ] Messages appear in real-time
- [ ] Typing indicator updates in real-time
- [ ] Online status updates

## ☑️ Code Quality

### TypeScript
- [ ] No TypeScript errors
- [ ] All types properly defined
- [ ] No `any` types (except where necessary)

### Linting
```bash
npm run lint
```
- [ ] No ESLint errors
- [ ] Code follows style guide

### Build
```bash
npm run build
```
- [ ] Build completes successfully
- [ ] No build errors
- [ ] `.next` folder created

## ☑️ Database Verification

### Using Prisma Studio
```bash
npx prisma studio
```
- [ ] Prisma Studio opens (http://localhost:5555)
- [ ] Can see all tables
- [ ] User table has data
- [ ] Can view/edit records

### Manual Verification
- [ ] Users table exists
- [ ] Conversations table exists
- [ ] Messages table exists
- [ ] Accounts table exists
- [ ] Sessions table exists

## ☑️ Documentation Review

- [ ] Read README.md
- [ ] Read SETUP.md
- [ ] Understand project structure
- [ ] Know where to find components
- [ ] Understand API routes
- [ ] Familiar with database schema

## ☑️ Optional Configurations

### Google OAuth
- [ ] Google Cloud project created
- [ ] OAuth credentials generated
- [ ] Authorized redirect URIs configured
- [ ] Client ID and Secret in `.env`
- [ ] Google sign-in tested

### Custom Domain (Production)
- [ ] Domain purchased
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] NEXTAUTH_URL updated

## ☑️ Deployment Preparation

### Code Repository
- [ ] Git repository initialized
- [ ] `.gitignore` configured
- [ ] Initial commit made
- [ ] Pushed to GitHub/GitLab

### Environment Variables
- [ ] All required variables documented
- [ ] Production values prepared
- [ ] Secrets secured (not in code)

### Database
- [ ] Production database created
- [ ] Connection string obtained
- [ ] Database accessible from deployment platform

### Vercel Setup
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables added
- [ ] Build settings configured

## ☑️ Post-Deployment

### Verification
- [ ] Production site accessible
- [ ] HTTPS working
- [ ] Can register new user
- [ ] Can login
- [ ] Can send messages
- [ ] Real-time features work
- [ ] No console errors

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Uptime monitoring active
- [ ] Database backups enabled

## ☑️ Performance

### Lighthouse Audit
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 80

### Load Testing
- [ ] Tested with multiple users
- [ ] No performance degradation
- [ ] Database queries optimized
- [ ] No memory leaks

## 🚨 Troubleshooting

### If Installation Fails

#### Network Issues
```bash
npm cache clean --force
npm install --verbose
```

#### Database Connection
- Check PostgreSQL is running
- Verify connection string
- Test connection manually
- Check firewall settings

#### Build Errors
- Clear `.next` folder
- Delete `node_modules`
- Reinstall dependencies
- Check Node.js version

#### Socket.IO Issues
- Check port 3000 is available
- Verify NEXT_PUBLIC_SOCKET_URL
- Check browser console
- Test with different browser

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md
   - SETUP.md
   - QUICK-REFERENCE.md

2. **Review Logs**
   - Terminal output
   - Browser console
   - Prisma logs
   - Network tab

3. **Common Solutions**
   - Restart dev server
   - Clear cache
   - Reinstall dependencies
   - Check environment variables

4. **Search Issues**
   - GitHub issues
   - Stack Overflow
   - Next.js docs
   - Prisma docs

## ✅ Success Criteria

You're ready to proceed when:
- ✅ All dependencies installed
- ✅ Database connected and migrated
- ✅ Development server running
- ✅ Can register and login
- ✅ Can send messages
- ✅ Real-time features working
- ✅ No console errors
- ✅ Responsive design working

## 🎉 Congratulations!

If all items are checked, your chat application is successfully installed and ready for development or deployment!

---

**Next Steps:**
1. Customize the design
2. Add more features
3. Deploy to production
4. Share with users

**Happy Coding! 🚀**
