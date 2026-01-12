# Forgot Password Feature Setup

## ✅ What's Already Done

All the code for forgot password, reset password, and delete account features is complete and deployed:

- ✅ Login page has "Forgot password?" link
- ✅ Forgot password page at `/forgot-password`
- ✅ Reset password page at `/reset-password`
- ✅ Delete account feature in profile page
- ✅ All API routes created and working
- ✅ Database schema updated with `resetToken` and `resetTokenExpiry` fields

## 🔧 What You Need to Do

### Step 1: Run Database Migration

The database needs to be updated with the new fields. Run this command:

```bash
cd chat-app
npx prisma db push
```

This will add the `resetToken` and `resetTokenExpiry` columns to your User table.

### Step 2: Verify on Vercel

After the migration, the features should work:

1. Go to https://chat-app-ollq.vercel.app/login
2. You should see "Forgot password?" link on the left
3. You should see "Sign up" link on the right
4. Click "Forgot password?" to test the flow

### Step 3: Clear Browser Cache (If Needed)

If you still see the old version:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Or clear browser cache
3. Or try in incognito/private mode

## 📧 Email Setup (Optional)

Currently, the forgot password feature logs the reset link to the console. To send actual emails:

1. Choose an email service (SendGrid, Mailgun, AWS SES, etc.)
2. Add email credentials to Vercel environment variables
3. Update `/api/auth/forgot-password/route.ts` to send emails

## 🧪 Testing the Features

### Test Forgot Password:
1. Go to `/forgot-password`
2. Enter your email
3. Check server logs for the reset link (or email if configured)
4. Click the link to reset password

### Test Delete Account:
1. Go to `/profile`
2. Scroll to "Danger Zone"
3. Click "Delete Account"
4. Enter your password to confirm

## 🔍 Troubleshooting

**If features aren't showing:**
- Clear browser cache
- Check Vercel deployment logs
- Verify database migration ran successfully
- Try accessing directly: https://chat-app-ollq.vercel.app/forgot-password

**If you get database errors:**
- Run `npx prisma db push` to update the schema
- Check that DATABASE_URL is correct in Vercel

## ✨ All Features Available

- ✅ Email/password authentication
- ✅ User registration
- ✅ Forgot password
- ✅ Reset password
- ✅ Delete account
- ✅ Profile picture upload
- ✅ Real-time messaging
- ✅ Unread message badges
- ✅ File sharing
- ✅ Mobile responsive
