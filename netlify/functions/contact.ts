import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData: ContactFormData = JSON.parse(event.body || '{}');
    const { name, phone, email, message } = formData;

    // Validation
    if (!name || !phone || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'All fields are required',
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Invalid email address',
        }),
      };
    }

    // Get environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass) {
      console.error('Email configuration is missing!');
      return {
        statusCode: 503,
        body: JSON.stringify({
          success: false,
          error: 'Email service is not configured. Please contact the administrator.',
        }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0c2a3f; border-bottom: 2px solid #0c2a3f; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Full Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Phone Number:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0c2a3f; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0c2a3f; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>This email was sent from the Arabian Gulfs Seafood contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })} (Saudi Arabia Time)</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Full Name: ${name}
Phone Number: ${phone}
Email: ${email}

Message:
${message}

---
This email was sent from the Arabian Gulfs Seafood contact form.
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })} (Saudi Arabia Time)
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully',
      }),
    };
  } catch (error) {
    console.error('Error in contact function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send message. Please try again later.',
        details: errorMessage,
      }),
    };
  }
};
