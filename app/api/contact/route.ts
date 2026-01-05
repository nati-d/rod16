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
  console.error("Failed to initialize Resend:", error);
}

export async function POST(req: Request) {
  try {
    // Validate environment variables first
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      console.error("NEXT_PUBLIC_RESEND_API_KEY is not set");
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
      console.error("Resend client is not initialized");
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
      console.error("Failed to parse request body:", parseError);
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
      console.error("Validation failed: missing required fields", { name, email, phone });
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and phone" },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.log("Processing contact form submission from:", { name, email, phone });

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
        console.error("Failed to generate notification email template:", templateError);
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
        console.error("❌ Notification FAILED:", error);
        notificationError = error.message || JSON.stringify(error);
      } else {
        console.log("✅ Notification sent successfully to:", myEmail);
        console.log("Resend email ID:", data.id);
        notificationSent = true;
      }
    } catch (err: any) {
      console.error("❌ Notification THROW ERROR:", err);
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
        console.error("Failed to generate auto-reply email template:", templateError);
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
        console.error("❌ AUTO-REPLY FAILED:", error);
        console.error("Target email was:", email);
        autoReplyError = error.message || JSON.stringify(error);
      } else {
        console.log("✅ Auto-reply sent successfully to:", email);
        console.log("Resend email ID:", data.id);
        autoReplySent = true;
      }
    } catch (err: any) {
      console.error("❌ AUTO-REPLY THROW ERROR:", err);
      console.error("Target email was:", email);
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
    console.error("💥 Unexpected server error:", error);
    console.error("Error stack:", error.stack);
    
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