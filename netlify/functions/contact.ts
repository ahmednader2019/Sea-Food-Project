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

    // Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Add connection timeout
      connectionTimeout: 10000,
      // Add socket timeout
      socketTimeout: 10000,
    });

    // Verify connection before sending (this will catch auth errors early)
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      const verifyErrorMessage = verifyError instanceof Error ? verifyError.message : 'Unknown verification error';
      
      // Provide specific error messages based on verification failure
      if (verifyErrorMessage.includes('Invalid login') || verifyErrorMessage.includes('535')) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            success: false,
            error: 'Email authentication failed. Please verify your Gmail App Password is correct and not expired.',
            details: 'Invalid credentials or expired app password',
          }),
        };
      } else if (verifyErrorMessage.includes('EAUTH')) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            success: false,
            error: 'Email authentication failed. Please check your Gmail App Password settings.',
            details: 'Authentication error - verify 2FA is enabled and app password is valid',
          }),
        };
      } else if (verifyErrorMessage.includes('ECONNREFUSED') || verifyErrorMessage.includes('ENOTFOUND')) {
        return {
          statusCode: 503,
          body: JSON.stringify({
            success: false,
            error: 'Cannot connect to Gmail servers. Please try again later.',
            details: 'Network connection error',
          }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({
            success: false,
            error: 'Email service verification failed. Please contact the administrator.',
            details: process.env.NODE_ENV === 'development' ? verifyErrorMessage : undefined,
          }),
        };
      }
    }

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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = (error as any)?.code || '';
    
    // Log the full error object for debugging
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Provide more specific error messages based on error codes and messages
    let userFriendlyError = 'Failed to send message. Please try again later.';
    let statusCode = 500;
    
    // Gmail-specific error codes
    if (errorCode === 'EAUTH' || errorMessage.includes('EAUTH') || 
        errorMessage.includes('Invalid login') || 
        errorMessage.includes('535') ||
        errorMessage.includes('authentication failed') ||
        errorMessage.includes('Username and Password not accepted')) {
      statusCode = 401;
      userFriendlyError = 'Email authentication failed. Your Gmail App Password may have expired or been revoked. Please regenerate it in your Google Account settings.';
    } else if (errorCode === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED')) {
      statusCode = 503;
      userFriendlyError = 'Cannot connect to Gmail servers. Please check your internet connection and try again.';
    } else if (errorCode === 'ENOTFOUND' || errorMessage.includes('ENOTFOUND')) {
      statusCode = 503;
      userFriendlyError = 'Gmail server not found. Please check your internet connection and try again.';
    } else if (errorCode === 'ETIMEDOUT' || errorMessage.includes('ETIMEDOUT')) {
      statusCode = 504;
      userFriendlyError = 'Connection timeout. Gmail servers may be temporarily unavailable. Please try again later.';
    } else if (errorMessage.includes('Email configuration is missing')) {
      statusCode = 503;
      userFriendlyError = 'Email service is not configured. Please contact the administrator.';
    } else if (errorMessage.includes('Rate limit') || errorMessage.includes('quota')) {
      statusCode = 429;
      userFriendlyError = 'Email sending limit reached. Please try again later.';
    }

    return {
      statusCode,
      body: JSON.stringify({
        success: false,
        error: userFriendlyError,
        // Include error code and details in development or for debugging
        details: process.env.NODE_ENV === 'development' ? {
          message: errorMessage,
          code: errorCode,
          name: error instanceof Error ? error.name : 'Unknown'
        } : undefined,
      }),
    };
  }
};
