# 🚨 QUICK FIX: Clear Your Cookies Now!

## The Problem
You got a "494: REQUEST_HEADER_TOO_LARGE" error because profile images were stored in your session cookie.

## The Solution (DONE ✅)
I've fixed the code - profile images are no longer stored in cookies. The fix is deployed!

## What YOU Need to Do (Takes 30 seconds)

### Clear Your Cookies:

**Method 1: Browser DevTools (Easiest)**
1. Press `F12` to open DevTools
2. Click the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Cookies** in the left sidebar
4. Click on your site URL
5. Click "Clear All" or delete all cookies
6. Close DevTools
7. Refresh the page (F5)
8. Login again

**Method 2: Incognito Mode (Fastest)**
1. Open a new incognito/private window
2. Go to https://chat-app-ollq.vercel.app
3. Login
4. Everything should work!

**Method 3: Clear Browser Data**
1. Open browser settings
2. Clear browsing data
3. Select "Cookies and site data"
4. Clear
5. Go back to the site and login

## Why This Happened
- Profile pictures are stored as base64 (large data)
- Old code stored them in JWT cookies
- Cookies are sent with EVERY request
- Headers got too large → 494 error

## Why It's Fixed Now
- JWT now only stores: email, name, ID (tiny data)
- Profile pictures fetched from database (not in cookies)
- Headers stay small forever
- No more 494 errors!

## After Clearing Cookies
✅ Login will work  
✅ Profile pictures will display  
✅ All features working  
✅ No more errors  

---

**Just clear cookies once and you're good to go!** 🎉
