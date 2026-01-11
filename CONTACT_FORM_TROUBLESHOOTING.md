# Contact Form Error Troubleshooting Guide

## Error: "Failed to send message. Please try again later."

This error can occur for several reasons. Follow these steps to diagnose and fix the issue:

## Step 1: Check Environment Variables in Netlify

**This is the most common cause!**

1. Go to your Netlify Dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Verify these variables are set:
   - `EMAIL_USER` - Your Gmail address (e.g., `your-email@gmail.com`)
   - `EMAIL_PASS` - Your Gmail App Password (NOT your regular password)
   - `EMAIL_TO` (optional) - Recipient email (defaults to EMAIL_USER if not set)

4. **After adding/updating environment variables, you MUST redeploy your site!**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

## Step 2: Verify Gmail App Password Setup

Gmail requires an **App Password** (not your regular password) for SMTP authentication:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Use this 16-character password (no spaces) as `EMAIL_PASS`

**Important:** 
- App passwords are 16 characters, no spaces
- If you change your Google password, you may need to regenerate the app password
- App passwords can expire or be revoked

## Step 3: Check Netlify Function Logs

1. Go to Netlify Dashboard → **Functions** tab
2. Click on the `contact` function
3. Check the **Logs** section for detailed error messages
4. Look for specific errors like:
   - "Email configuration is missing" → Environment variables not set
   - "Invalid login" → Wrong EMAIL_USER or EMAIL_PASS
   - "ECONNREFUSED" → Network/connection issue
   - "ETIMEDOUT" → Connection timeout

## Step 4: Test the Function Locally

Test the Netlify function locally to see detailed errors:

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Create a .env file in the project root with your credentials
echo "EMAIL_USER=your-email@gmail.com" > .env
echo "EMAIL_PASS=your-app-password" >> .env
echo "EMAIL_TO=recipient@example.com" >> .env

# Run Netlify dev server
npx netlify dev
```

This will start both the frontend and functions locally. Check the terminal for detailed error messages.

## Step 5: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Submit the form again
4. Look for error messages that show:
   - Response status code
   - Error details from the server

The improved error handling will now show more specific error messages.

## Step 6: Verify Function Deployment

1. Check that `netlify/functions/contact.ts` exists
2. Verify `netlify.toml` has the correct redirect:
   ```toml
   [[redirects]]
   from = "/api/contact"
   to = "/.netlify/functions/contact"
   status = 200
   ```
3. Ensure the function is built during deployment (check build logs)

## Common Error Messages and Solutions

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Email service is not configured" | Missing EMAIL_USER or EMAIL_PASS | Add environment variables in Netlify and redeploy |
| "Email authentication failed" | Wrong credentials or expired app password | Regenerate Gmail app password and update EMAIL_PASS |
| "Cannot connect to email server" | Network/firewall issue | Check internet connection, try again later |
| "Connection timeout" | Gmail SMTP server timeout | Wait a few minutes and try again |
| "Server error occurred" | Generic server error | Check Netlify function logs for details |

## Quick Fix Checklist

- [ ] Environment variables set in Netlify (EMAIL_USER, EMAIL_PASS)
- [ ] Site redeployed after adding environment variables
- [ ] Using Gmail App Password (not regular password)
- [ ] 2-Factor Authentication enabled on Google Account
- [ ] Checked Netlify function logs for specific errors
- [ ] Tested function locally with `netlify dev`
- [ ] Checked browser console for detailed error messages

## Still Not Working?

1. **Check Netlify Status**: Visit [status.netlify.com](https://status.netlify.com) to see if there are any service issues
2. **Try Alternative Email Service**: Consider using services like SendGrid, Mailgun, or AWS SES instead of Gmail SMTP
3. **Check Rate Limits**: Gmail has rate limits. If you're sending many emails, you might hit limits
4. **Review Security Settings**: Some Google accounts have additional security restrictions that might block app passwords

## Testing After Fix

After applying fixes:
1. Clear your browser cache
2. Submit the form again
3. Check the browser console for any new error messages
4. Verify the email was received (check spam folder too)
