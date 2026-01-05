import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getNotificationEmailTemplate, getAutoReplyEmailTemplate } from "@/lib/email-templates";

// Initialize Resend - handle missing API key gracefully
let resend: Resend | null = null;
try {
  const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (apiKey) {
    resend = new Resend(apiKey);
  }
} catch (error) {
  // Silently handle initialization error
}

export async function POST(req: Request) {
  try {
    // Validate environment variables first
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please contact the administrator.",
          notificationSent: false,
          autoReplySent: false,
          notificationError: "NEXT_PUBLIC_RESEND_API_KEY environment variable is missing",
          autoReplyError: null,
        },
        { status: 500 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service initialization failed. Please contact the administrator.",
          notificationSent: false,
          autoReplySent: false,
          notificationError: "Failed to initialize email service",
          autoReplyError: null,
        },
        { status: 500 }
      );
    }
    // Parse form data
    let formData;
    try {
      formData = await req.json();
    } catch (parseError: any) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    const {
      name,
      email: rawEmail,
      phone,
      weddingDate,
      weddingLocation,
      referralSource,
      serviceType,
      photoBudget,
    } = formData;

    // Trim and validate email
    const email = rawEmail?.trim();
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and phone" },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const myEmail = process.env.NEXT_PUBLIC_MY_EMAIL || "rod16zedo@gmail.com";

    // === SEND NOTIFICATION TO YOU ===
    let notificationSent = false;
    let notificationError: string | null = null;
    try {
      let notificationHtml: string;
      try {
        notificationHtml = getNotificationEmailTemplate({
          name,
          email,
          phone,
          weddingDate,
          weddingLocation,
          referralSource,
          serviceType,
          photoBudget,
        });
      } catch (templateError: any) {
        notificationError = `Template generation failed: ${templateError.message}`;
        throw templateError;
      }

      const { data, error } = await resend.emails.send({
        from: "Rod16 Photography <contact@rod16photo.com>",
        to: [myEmail],
        subject: "New Contact Form Submission - Rod16 Photography",
        html: notificationHtml,
        replyTo: email,
      });

      if (error) {
        notificationError = error.message || JSON.stringify(error);
      } else {
        notificationSent = true;
      }
    } catch (err: any) {
      notificationError = err.message || "Unknown error occurred";
    }

    // === SEND AUTO-REPLY TO CLIENT ===
    let autoReplySent = false;
    let autoReplyError: string | null = null;
    try {
      let autoReplyHtml: string;
      try {
        autoReplyHtml = getAutoReplyEmailTemplate({
          name,
          email,
          phone,
          weddingDate,
          weddingLocation,
          referralSource,
          serviceType,
          photoBudget,
        });
      } catch (templateError: any) {
        autoReplyError = `Template generation failed: ${templateError.message}`;
        throw templateError;
      }

      const { data, error } = await resend.emails.send({
        from: "Rod16 Photography <contact@rod16photo.com>",
        to: [email],
        subject: "Thank you for contacting Rod16 Photography!",
        html: autoReplyHtml,
      });

      if (error) {
        autoReplyError = error.message || JSON.stringify(error);
      } else {
        autoReplySent = true;
      }
    } catch (err: any) {
      autoReplyError = err.message || "Unknown error occurred";
    }

    // Final response with detailed status
    if (notificationSent) {
      return NextResponse.json({
        success: true,
        notificationSent,
        autoReplySent,
        notificationError: notificationError,
        autoReplyError: autoReplyError,
        targetEmail: email,
        message: autoReplySent
          ? "Message sent successfully! Check your inbox."
          : "Your message was received, but auto-reply failed (check logs).",
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to send notification email",
          notificationSent: false,
          autoReplySent: false,
          notificationError: notificationError || "Notification email failed to send",
          autoReplyError: autoReplyError,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Always return JSON, never HTML
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
        notificationSent: false,
        autoReplySent: false,
        notificationError: error.message || "Unexpected error occurred",
        autoReplyError: null,
      },
      { status: 500 }
    );
  }
}

// Ensure this is a dynamic route (not statically generated)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';