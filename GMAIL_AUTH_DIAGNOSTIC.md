# Gmail Authentication Failure - Diagnostic Guide

## Error: "Email authentication failed. Please contact the administrator."

This error occurs when Gmail rejects the authentication credentials. Since it was working before, something has changed. Follow these steps to identify and fix the issue.

## Quick Diagnostic Checklist

### 1. Check Netlify Environment Variables ⚠️ **MOST COMMON**

**The environment variables might have been cleared or changed:**

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Verify these variables exist and are correct:
   - `EMAIL_USER` - Should be your full Gmail address (e.g., `your-email@gmail.com`)
   - `EMAIL_PASS` - Should be a 16-character Gmail App Password (no spaces)
   - `EMAIL_TO` (optional) - Recipient email

**Common Issues:**
- Variables were accidentally deleted
- Variables have extra spaces or quotes
- Variables were changed during a site rebuild
- Variables are set for wrong environment (production vs. deploy preview)

**Fix:**
- Re-enter the values exactly (no quotes, no spaces)
- After updating, **redeploy your site** (Deploys → Trigger deploy)

### 2. Gmail App Password Expired or Revoked ⚠️ **VERY COMMON**

**Gmail App Passwords can expire or be revoked if:**
- You changed your Google account password
- You disabled and re-enabled 2-Factor Authentication
- You revoked the app password from Google Account settings
- Google security detected suspicious activity

**How to Check and Fix:**

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Check if your app password still exists
5. If it's missing or you're unsure, **generate a new one:**
   - Click **App passwords**
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter "Netlify Contact Form" as the name
   - Click **Generate**
   - Copy the 16-character password (no spaces)
6. Update `EMAIL_PASS` in Netlify with the new password
7. **Redeploy your site**

### 3. 2-Factor Authentication Disabled

**Gmail App Passwords require 2FA to be enabled:**

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Verify it's **ON** (not OFF)
4. If it's OFF, enable it and then generate a new App Password

### 4. Gmail Account Security Changes

**Google may have:**
- Locked your account due to suspicious activity
- Changed security policies
- Blocked access from certain IPs/locations

**Check:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Check for any security alerts
3. Review **Recent security activity**
4. If account is locked, follow Google's recovery process

### 5. Gmail Rate Limiting

**If you're sending too many emails, Gmail may temporarily block you:**

- Gmail free accounts: ~500 emails/day
- Gmail Workspace: Higher limits

**Check Netlify Function Logs:**
1. Go to Netlify Dashboard → **Functions** → `contact`
2. Check **Logs** for rate limit errors
3. If you see rate limit errors, wait 24 hours or upgrade to Gmail Workspace

### 6. Network/Firewall Issues

**Netlify functions might be blocked from accessing Gmail:**

- Check Netlify Function logs for connection errors
- Verify Gmail SMTP servers are accessible (smtp.gmail.com:587 or 465)

## How to Get Detailed Error Information

### Option 1: Check Netlify Function Logs

1. Go to Netlify Dashboard
2. Navigate to **Functions** tab
3. Click on `contact` function
4. Go to **Logs** section
5. Look for error messages that show:
   - Error codes (EAUTH, 535, etc.)
   - Specific error messages
   - Stack traces

### Option 2: Test Locally

Test the function locally to see detailed errors:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file with your credentials
echo "EMAIL_USER=your-email@gmail.com" > .env
echo "EMAIL_PASS=your-16-char-app-password" >> .env

# Run locally
npx netlify dev
```

Then submit the form and check the terminal for detailed error messages.

### Option 3: Check Browser Console

1. Open your website
2. Open Browser Developer Tools (F12)
3. Go to **Console** tab
4. Submit the contact form
5. Look for error responses that might include `details` field with more information

## Common Error Codes and Meanings

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `EAUTH` | Authentication failed | Regenerate Gmail App Password |
| `535` | Invalid credentials | Check EMAIL_USER and EMAIL_PASS |
| `ECONNREFUSED` | Cannot connect to Gmail | Check network/firewall |
| `ENOTFOUND` | Gmail server not found | DNS/network issue |
| `ETIMEDOUT` | Connection timeout | Gmail servers may be down |
| `429` | Rate limit exceeded | Wait 24 hours or upgrade account |

## Step-by-Step Recovery Process

### Step 1: Verify Environment Variables
```bash
# In Netlify Dashboard, check:
EMAIL_USER=your-email@gmail.com  # No quotes, no spaces
EMAIL_PASS=abcdefghijklmnop      # 16 characters, no spaces
```

### Step 2: Generate New Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Generate new password for "Mail"
3. Copy the 16-character password
4. Update in Netlify
5. Redeploy site

### Step 3: Test Connection
Use the improved error handling to see specific error messages in Netlify logs.

### Step 4: Alternative Solutions

If Gmail continues to fail, consider:

1. **Use a different email service:**
   - SendGrid (free tier: 100 emails/day)
   - Mailgun (free tier: 5,000 emails/month)
   - AWS SES (very cheap, pay per email)
   - Resend (modern, developer-friendly)

2. **Use Gmail Workspace:**
   - More reliable than free Gmail
   - Higher sending limits
   - Better for production

## Prevention Tips

1. **Document your App Password:**
   - Save it securely (password manager)
   - Note when it was created
   - Set a reminder to regenerate every 6-12 months

2. **Monitor Netlify Logs:**
   - Check function logs regularly
   - Set up alerts for authentication failures

3. **Use Environment-Specific Variables:**
   - Set different variables for production vs. preview
   - Test in preview before deploying to production

4. **Consider Email Service Providers:**
   - More reliable than Gmail SMTP
   - Better error handling
   - Higher sending limits
   - Better deliverability

## Still Not Working?

If none of the above fixes work:

1. **Check Netlify Status:** https://status.netlify.com
2. **Check Gmail Status:** https://www.google.com/appsstatus
3. **Contact Support:**
   - Share Netlify function logs
   - Share error messages from browser console
   - Share what you've tried

## Quick Test Script

You can test Gmail authentication directly using Node.js:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Verification failed:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});
```

Run this to test if your credentials work outside of Netlify.
