import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getNotificationEmailTemplate, getAutoReplyEmailTemplate } from "@/lib/email-templates";

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
      const notificationHtml = getNotificationEmailTemplate({
        name,
        email,
        phone,
        weddingDate,
        weddingLocation,
        referralSource,
        serviceType,
        photoBudget,
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: myEmail,
        subject: "New Contact Form Submission - Rod16 Photography",
        html: notificationHtml,
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
      const autoReplyHtml = getAutoReplyEmailTemplate({
        name,
        email,
        phone,
        weddingDate,
        weddingLocation,
        referralSource,
        serviceType,
        photoBudget,
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thank you for contacting Rod16 Photography!",
        html: autoReplyHtml,
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

