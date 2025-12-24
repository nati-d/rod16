import * as fs from "fs";
import * as path from "path";

export interface EmailTemplateData {
  name: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  weddingLocation?: string;
  referralSource?: string;
  serviceType?: string;
  photoBudget?: string;
}

/**
 * Replace template variables with actual data
 */
function replaceTemplateVariables(template: string, data: EmailTemplateData): string {
  let html = template;
  
  // Replace all template variables
  html = html.replace(/\{\{name\}\}/g, data.name || "");
  html = html.replace(/\{\{email\}\}/g, data.email || "");
  html = html.replace(/\{\{phone\}\}/g, data.phone || "Not specified");
  html = html.replace(/\{\{weddingDate\}\}/g, data.weddingDate || "Not specified");
  html = html.replace(/\{\{weddingLocation\}\}/g, data.weddingLocation || "Not specified");
  html = html.replace(/\{\{referralSource\}\}/g, data.referralSource || "Not specified");
  html = html.replace(/\{\{serviceType\}\}/g, data.serviceType || "Not specified");
  html = html.replace(/\{\{photoBudget\}\}/g, data.photoBudget || "Not specified");
  
  return html;
}

/**
 * Get notification email template (sent to photographer)
 */
export function getNotificationEmailTemplate(data: EmailTemplateData): string {
  const templatePath = path.join(process.cwd(), "templates", "notification-email.html");
  
  try {
    const template = fs.readFileSync(templatePath, "utf-8");
    return replaceTemplateVariables(template, data);
  } catch (error) {
    console.error("Error reading notification email template:", error);
    // Fallback to simple HTML if template file is not found
    return getFallbackNotificationTemplate(data);
  }
}

/**
 * Get auto-reply email template (sent to user)
 */
export function getAutoReplyEmailTemplate(data: EmailTemplateData): string {
  const templatePath = path.join(process.cwd(), "templates", "auto-reply-email.html");
  
  try {
    const template = fs.readFileSync(templatePath, "utf-8");
    return replaceTemplateVariables(template, data);
  } catch (error) {
    console.error("Error reading auto-reply email template:", error);
    // Fallback to simple HTML if template file is not found
    return getFallbackAutoReplyTemplate(data);
  }
}

/**
 * Fallback notification template if file is not found
 */
function getFallbackNotificationTemplate(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #faf9f6; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
        h2 { color: #2F3D3F; }
        .field { margin: 15px 0; padding: 10px; border-bottom: 1px solid #e5e5e5; }
        .label { font-weight: bold; color: #2F3D3F; text-transform: uppercase; font-size: 12px; }
        .value { color: #242525; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Contact Form Submission</h2>
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.name}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.email}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.phone || "Not specified"}</div>
        </div>
        <div class="field">
          <div class="label">Wedding Date:</div>
          <div class="value">${data.weddingDate || "Not specified"}</div>
        </div>
        <div class="field">
          <div class="label">Location:</div>
          <div class="value">${data.weddingLocation || "Not specified"}</div>
        </div>
        <div class="field">
          <div class="label">How did you hear about us:</div>
          <div class="value">${data.referralSource || "Not specified"}</div>
        </div>
        <div class="field">
          <div class="label">Service Type:</div>
          <div class="value">${data.serviceType || "Not specified"}</div>
        </div>
        <div class="field">
          <div class="label">What do you feel when you see my works on this site:</div>
          <div class="value">${data.photoBudget || "Not specified"}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Fallback auto-reply template if file is not found
 */
function getFallbackAutoReplyTemplate(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #faf9f6; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
        h2 { color: #2F3D3F; }
        p { color: #242525; line-height: 1.8; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Thank you for contacting Rod16 Photography!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out! I'm excited to learn more about your story and vision for your special day.</p>
        <p>I aim to respond within 24 business hours. If you don't hear from me within that time, please check your spam folder or reach out directly at rod16zedo@gmail.com.</p>
        <p>Looking forward to connecting with you!</p>
        <p>Best regards,<br>Rod16 Photography</p>
      </div>
    </body>
    </html>
  `;
}

