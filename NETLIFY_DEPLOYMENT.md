# Netlify Deployment Guide for Arabian Gulf Seafood

## Overview
Your project is now configured to deploy to Netlify with serverless functions handling the contact form emails.

## What Changed?

1. **Created Netlify Function**: `netlify/functions/contact.ts` - handles email sending
2. **Added Configuration**: `netlify.toml` - configures build and redirects
3. **Updated Build Script**: Build now only compiles the frontend
4. **Added Dependencies**: `@netlify/functions` and `netlify-cli`

## Deployment Steps

### 1. Push to GitHub (if not already done)

```bash
git add .
git commit -m "Configure for Netlify deployment with serverless functions"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Via Netlify Dashboard (Recommended)

1. Go to [netlify.com](https://netlify.com) and log in
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`
5. Click "Deploy site"

#### Option B: Via Netlify CLI

```bash
# Login to Netlify
npx netlify login

# Initialize site
npx netlify init

# Deploy
npx netlify deploy --prod
```

### 3. Configure Environment Variables

**CRITICAL**: You MUST add these environment variables in Netlify:

1. Go to your site in Netlify Dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

```
EMAIL_USER=ahmed@arabian-gulfs.com
EMAIL_PASS=qddxnuuvgsdqfoes
EMAIL_TO=ahmed@arabian-gulfs.com

VITE_APP_ID=proj_abc123def456
VITE_APP_TITLE=Arabian Gulfs
VITE_APP_LOGO=assets/favicon.png
VITE_ANALYTICS_ENDPOINT=https://umami.dev.ops.butterfly-effect.dev
VITE_ANALYTICS_WEBSITE_ID=analytics_proj_abc123def456
```

**Important**:
- Without `EMAIL_USER` and `EMAIL_PASS`, the contact form will NOT work
- Keep `EMAIL_PASS` secure - this is your Gmail app password
- After adding environment variables, you need to **redeploy** your site

### 4. Test Your Deployment

After deployment completes:

1. Visit your site URL (e.g., `https://your-site.netlify.app`)
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email inbox for the message

### 5. Custom Domain (Optional)

To use your own domain (e.g., arabian-gulfs.com):

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Follow Netlify's DNS configuration instructions

## Local Development with Netlify Functions

To test Netlify Functions locally:

```bash
# Install Netlify CLI globally (optional)
npm install -g netlify-cli

# Run both Vite and Netlify Functions locally
npx netlify dev
```

This will:
- Start Vite dev server
- Run Netlify Functions locally
- Proxy `/api/contact` to `/.netlify/functions/contact`

## Troubleshooting

### Contact form not working after deployment

1. **Check environment variables**: Make sure all `EMAIL_*` variables are set in Netlify
2. **Check function logs**: Go to **Functions** tab in Netlify Dashboard to see errors
3. **Redeploy**: After adding environment variables, trigger a new deployment

### Build failing

1. **Check build logs** in Netlify Dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node version (should be 18+)

### Emails not sending

1. **Gmail App Password**: Make sure you're using an app-specific password, not your regular Gmail password
2. **Enable 2FA**: Gmail app passwords require 2-factor authentication to be enabled
3. **Check spam folder**: Test emails might go to spam initially

## How It Works

### Architecture

```
User submits form
    ↓
Frontend (React/Vite) sends POST to /api/contact
    ↓
Netlify redirects to /.netlify/functions/contact
    ↓
Serverless function runs contact.ts
    ↓
Nodemailer sends email via Gmail SMTP
    ↓
Success response sent back to frontend
```

### Key Files

- `netlify/functions/contact.ts` - Serverless function handling emails
- `netlify.toml` - Netlify configuration
- `dist/public/` - Built frontend files
- `.env` - Local environment variables (NOT deployed)

## Alternative Hosting Options

If you prefer traditional Node.js hosting instead of serverless:

### Render.com (Recommended for full-stack)
- Supports Express servers natively
- Free tier available
- Use `npm run build:full` and `npm start`

### Railway.app
- Easy deployment
- Supports full-stack apps
- One-click deploy from GitHub

### Heroku
- Classic PaaS platform
- More complex setup
- Paid plans required now

### VPS (DigitalOcean, Linode, etc.)
- Full control
- Requires more setup
- Best for production with high traffic

For these alternatives, you would use the Express server in `server/index.ts` instead of Netlify Functions.

## Support

If you encounter issues:
1. Check Netlify function logs
2. Verify environment variables are set correctly
3. Test email credentials locally first with `pnpm run dev:all`
