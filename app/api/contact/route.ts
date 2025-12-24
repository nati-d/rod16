import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Check if environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP credentials:", {
        hasUser: !!process.env.SMTP_USER,
        hasPass: !!process.env.SMTP_PASS,
      });
      return NextResponse.json(
        { 
          success: false, 
          error: "Email service not configured. Please check server settings.",
          details: "SMTP credentials are missing"
        },
        { status: 500 }
      );
    }

    // Parse request body safely
    let formData;
    try {
      formData = await req.json();
    } catch (parseError: any) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid request data",
          details: "Failed to parse request body"
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      weddingDate,
      weddingLocation,
      referralSource,
      serviceType,
      photoBudget,
    } = formData;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields",
          details: "Name, email, and phone are required"
        },
        { status: 400 }
      );
    }

    // Create transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Verify transporter configuration
      await transporter.verify();
      console.log("SMTP server is ready to send emails");
    } catch (transporterError: any) {
      console.error("SMTP configuration error:", transporterError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Email service configuration error",
          details: transporterError.message || "Failed to connect to email server"
        },
        { status: 500 }
      );
    }

    const myEmail = process.env.MY_EMAIL || "rod16zedo@gmail.com";

    // Email to you (the photographer)
    let notificationSent = false;
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: myEmail,
        subject: "New Contact Form Submission - Rod16 Photography",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Wedding Date:</strong> ${weddingDate || "Not specified"}</p>
          <p><strong>Location:</strong> ${weddingLocation || "Not specified"}</p>
          <p><strong>How did you hear about us:</strong> ${referralSource || "Not specified"}</p>
          <p><strong>Service Type:</strong> ${serviceType || "Not specified"}</p>
          <p><strong>What do you feel when you see my works on this site:</strong></p>
          <p>${photoBudget || "Not specified"}</p>
        `,
        replyTo: email,
      });
      notificationSent = true;
      console.log("Notification email sent successfully to", myEmail);
    } catch (notificationError: any) {
      console.error("Failed to send notification email:", notificationError);
      // Continue to try sending auto-reply even if notification fails
    }

    // Auto reply to user
    let autoReplySent = false;
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thank you for contacting Rod16 Photography!",
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! I'm excited to learn more about your story and vision for your special day.</p>
          <p>I aim to respond within 24 business hours. If you don't hear from me within that time, please check your spam folder or reach out directly at rod16zedo@gmail.com.</p>
          <p>Looking forward to connecting with you!</p>
          <p>Best regards,<br>Rod16 Photography</p>
        `,
      });
      autoReplySent = true;
      console.log("Auto-reply email sent successfully to", email);
    } catch (autoReplyError: any) {
      console.error("Failed to send auto-reply email:", autoReplyError);
    }

    // Return success if at least notification was sent
    if (notificationSent) {
      return NextResponse.json({ 
        success: true,
        notificationSent,
        autoReplySent,
        message: autoReplySent 
          ? "Message sent successfully" 
          : "Message received, but auto-reply failed to send"
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to send email",
          details: "Both notification and auto-reply emails failed"
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "An unexpected error occurred",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

