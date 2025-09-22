import nodemailer from 'nodemailer'
import { prisma } from './prisma'

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// Email templates
const emailTemplates = {
  'inquiry-confirmation': {
    subject: 'Thank you for your inquiry - Audio Video Events',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Audio Video Events</h1>
          <p style="color: white; margin: 10px 0 0 0;">We Make Memories</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hello ${data.name}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for your inquiry about our <strong>${data.serviceType}</strong> services. 
            We've received your request and our team will contact you within 2 hours.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">Inquiry Details</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Inquiry ID:</strong> ${data.inquiryId}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Service:</strong> ${data.serviceType}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Status:</strong> Under Review</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            In the meantime, feel free to explore our portfolio and services on our website. 
            If you have any urgent questions, please call us at <strong>+91 98765 43210</strong>.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/services" 
               style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Our Services
            </a>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af;">
          <p style="margin: 0;">Audio Video Events | Jaipur, Rajasthan</p>
          <p style="margin: 5px 0 0 0;">Phone: +91 98765 43210 | Email: info@avevent.com</p>
        </div>
      </div>
    `
  },
  
  'admin-notification': {
    subject: 'New Inquiry Received',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Inquiry Alert</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #ef4444;">New ${data.inquiry.serviceType} Inquiry</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #4b5563;">${data.inquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Email:</td>
                <td style="padding: 8px 0; color: #4b5563;">${data.inquiry.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Phone:</td>
                <td style="padding: 8px 0; color: #4b5563;">${data.inquiry.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Service:</td>
                <td style="padding: 8px 0; color: #4b5563;">${data.inquiry.serviceType}</td>
              </tr>
              ${data.inquiry.eventDate ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Event Date:</td>
                <td style="padding: 8px 0; color: #4b5563;">${new Date(data.inquiry.eventDate).toLocaleDateString()}</td>
              </tr>
              ` : ''}
              ${data.inquiry.message ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1f2937; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #4b5563;">${data.inquiry.message}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="http://localhost:3000/admin/inquiries/${data.inquiry.id}" 
               style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
        </div>
      </div>
    `
  },
  
  'booking-confirmation': {
    subject: 'Booking Confirmed - Audio Video Events',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
          <p style="color: white; margin: 10px 0 0 0;">Your event is secured with us</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hello ${data.clientName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Great news! Your booking for <strong>${data.eventName}</strong> has been confirmed. 
            We're excited to make your event memorable!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #1f2937; width: 140px;">Booking ID:</td>
                <td style="padding: 5px 0; color: #4b5563;">${data.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #1f2937;">Event Date:</td>
                <td style="padding: 5px 0; color: #4b5563;">${data.eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #1f2937;">Venue:</td>
                <td style="padding: 5px 0; color: #4b5563;">${data.venue}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #1f2937;">Total Amount:</td>
                <td style="padding: 5px 0; color: #4b5563; font-weight: bold;">₹${data.totalAmount}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Our team will contact you 48 hours before your event to confirm all arrangements. 
            If you have any questions, please don't hesitate to reach out.
          </p>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af;">
          <p style="margin: 0;">Audio Video Events | Jaipur, Rajasthan</p>
          <p style="margin: 5px 0 0 0;">Phone: +91 98765 43210 | Email: info@avevent.com</p>
        </div>
      </div>
    `
  }
}

interface SendEmailOptions {
  to: string
  subject?: string
  template: keyof typeof emailTemplates
  data: any
}

export async function sendEmail({ to, subject, template, data }: SendEmailOptions) {
  try {
    const templateConfig = emailTemplates[template]
    if (!templateConfig) {
      throw new Error(`Template '${template}' not found`)
    }

    const emailSubject = subject || templateConfig.subject
    const htmlContent = templateConfig.html(data)

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: emailSubject,
      html: htmlContent,
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
    
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Function to get email template from database (if needed)
export async function getEmailTemplate(templateName: string) {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { name: templateName, isActive: true }
    })
    return template
  } catch (error) {
    console.error('Error fetching email template:', error)
    return null
  }
}

// Function to send bulk emails
export async function sendBulkEmails(emails: SendEmailOptions[]) {
  const results = []
  
  for (const emailConfig of emails) {
    const result = await sendEmail(emailConfig)
    results.push({ ...emailConfig, result })
    
    // Add small delay to avoid overwhelming the email server
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return results
}

// Function to verify email configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    return { success: true, message: 'Email configuration is valid' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}