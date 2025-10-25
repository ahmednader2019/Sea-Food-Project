import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('Email configuration is missing!');
    console.error('EMAIL_USER:', emailUser ? 'Set' : 'NOT SET');
    console.error('EMAIL_PASS:', emailPass ? 'Set' : 'NOT SET');
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in .env file');
  }

  console.log('Creating email transporter with user:', emailUser);

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Add debug options
    debug: true,
    logger: true,
  });
};

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const transporter = createTransporter();
    const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;

    console.log('Preparing to send email to:', emailTo);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: `New Contact Form Submission from ${formData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0c2a3f; border-bottom: 2px solid #0c2a3f; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Full Name:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Phone Number:</strong> ${formData.phone}</p>
          <p style="margin: 10px 0;"><strong style="color: #0c2a3f;">Email:</strong> ${formData.email}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #0c2a3f; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0c2a3f; border-radius: 4px;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>This email was sent from the Arabian Gulf Seafood contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })} (Saudi Arabia Time)</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Full Name: ${formData.name}
Phone Number: ${formData.phone}
Email: ${formData.email}

Message:
${formData.message}

---
This email was sent from the Arabian Gulf Seafood contact form.
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })} (Saudi Arabia Time)
    `,
  };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! Message ID:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes('Invalid login')) {
        throw new Error('Email authentication failed. Please check your EMAIL_USER and EMAIL_PASS in .env file');
      } else if (error.message.includes('ECONNREFUSED')) {
        throw new Error('Cannot connect to email server. Please check your internet connection');
      } else {
        throw new Error(`Email sending failed: ${error.message}`);
      }
    }
    throw error;
  }
};
