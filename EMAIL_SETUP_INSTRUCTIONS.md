# Email Configuration Setup Instructions

## Overview
Your contact forms are now configured to send emails using Gmail SMTP via Nodemailer. Both the home page contact form and the Contact Us page form will send emails to `ahmed@arabian-gulfs.com`.

## Setup Steps

### 1. Generate Gmail App Password

You need to create an app-specific password for your Gmail account. Follow these steps:

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Click on "Security" in the left sidebar
   - Scroll down to "How you sign in to Google"
   - Click on "2-Step Verification"
   - Follow the setup instructions

3. **Generate App Password**:
   - Go back to Security settings
   - Click on "2-Step Verification" again
   - Scroll down to the bottom
   - Click on "App passwords"
   - Select "Mail" for the app
   - Select "Other (Custom name)" for the device
   - Enter a name like "Arabian Gulf Seafood Website"
   - Click "Generate"
   - **Copy the 16-digit password** (it will look like: `xxxx xxxx xxxx xxxx`)

### 2. Update Your .env File

Open the `.env` file in the root directory and update the following:

```env
EMAIL_USER=ahmed@arabian-gulfs.com
EMAIL_PASS=your-16-digit-app-password-here  # Replace with the password from step 1
EMAIL_TO=ahmed@arabian-gulfs.com
```

**Important Notes:**
- Remove spaces from the app password when pasting (e.g., `xxxxxxxxxxxxxx` instead of `xxxx xxxx xxxx xxxx`)
- Never commit your `.env` file to git (it's already in .gitignore)
- The `.env.example` file contains template values for reference

### 3. Install Dependencies (if needed)

The required packages are already installed, but if you need to reinstall:

```bash
pnpm install
```

### 4. Build and Run

**For Development:**
```bash
pnpm dev
```

**For Production:**
```bash
pnpm build
pnpm start
```

## How It Works

### Contact Forms
1. **Home Page Form** - Located in the hero section with envelope image
2. **Contact Us Page Form** - Located at `/contact-us` with glassmorphism design

### Email Flow
1. User fills out the contact form (Name, Phone, Email, Message)
2. Form validation runs on the client side
3. Data is sent to `/api/contact` endpoint
4. Server validates the data again
5. Email is sent via Gmail SMTP using Nodemailer
6. User sees success message
7. You receive a formatted email at `ahmed@arabian-gulfs.com`

### Email Format
The email you receive will include:
- **Subject**: "New Contact Form Submission from [Name]"
- **Body**: Formatted HTML with:
  - Full Name
  - Phone Number
  - Email Address
  - Message content
  - Timestamp (Saudi Arabia Time)

## Testing

1. Make sure your `.env` file has the correct Gmail app password
2. Start the development server: `pnpm dev`
3. Navigate to http://localhost:3000
4. Fill out the contact form on either:
   - Home page (scroll to contact section)
   - Contact Us page (http://localhost:3000/contact-us)
5. Submit the form
6. Check your email at `ahmed@arabian-gulfs.com`

## Troubleshooting

### "Email configuration is missing" Error
- Make sure `.env` file exists in the root directory
- Verify `EMAIL_USER` and `EMAIL_PASS` are set correctly
- Restart your server after changing `.env` values

### "Invalid credentials" Error
- Double-check your Gmail app password is correct (16 digits, no spaces)
- Verify 2-Step Verification is enabled on your Google account
- Try regenerating the app password

### Email Not Received
- Check your spam/junk folder
- Verify the Gmail account has not reached sending limits
- Check server console logs for error messages
- Make sure `EMAIL_TO` is set correctly in `.env`

### Form Not Submitting
- Open browser console (F12) to check for errors
- Verify the server is running
- Check that all form fields are filled correctly
- Ensure network connectivity to the server

## Security Notes

- ✅ App passwords are safer than using your main Gmail password
- ✅ `.env` file is excluded from git (in `.gitignore`)
- ✅ Server-side validation prevents malicious submissions
- ✅ Email credentials are stored server-side only
- ⚠️ Never commit the `.env` file to version control
- ⚠️ Never share your app password publicly

## File Changes Made

| File | Changes |
|------|---------|
| `server/emailService.ts` | **NEW** - Email sending service using Nodemailer |
| `server/index.ts` | **UPDATED** - Added `/api/contact` endpoint |
| `client/src/hooks/useContactForm.ts` | **UPDATED** - Calls real API instead of mock |
| `client/src/pages/ContactUs.tsx` | **UPDATED** - Connected form to useContactForm hook |
| `.env` | **CREATED** - Environment variables for email config |
| `.env.example` | **UPDATED** - Added email configuration template |
| `package.json` | **UPDATED** - Added nodemailer dependencies |

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the server console logs for detailed error messages
3. Verify all setup steps were completed correctly
4. Ensure your Gmail account is not blocked or restricted

---

**Setup completed successfully! Your contact forms are now ready to send emails.**
