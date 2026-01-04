import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getNotificationEmailTemplate, getAutoReplyEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
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

    const myEmail = process.env.MY_EMAIL || "rod16zedo@gmail.com";

    // === SEND NOTIFICATION TO YOU ===
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

      const { data, error } = await resend.emails.send({
        from: "Rod16 Photography <onboarding@resend.dev>",
        to: [myEmail],
        subject: "New Contact Form Submission - Rod16 Photography",
        html: notificationHtml,
        replyTo: email,
      });

      if (error) {
        console.error("❌ Notification FAILED:", error);
      } else {
        console.log("✅ Notification sent successfully to:", myEmail);
        console.log("Resend email ID:", data.id);
        notificationSent = true;
      }
    } catch (err: any) {
      console.error("❌ Notification THROW ERROR:", err);
    }

    // === SEND AUTO-REPLY TO CLIENT ===
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

      const { data, error } = await resend.emails.send({
        from: "Rod16 Photography <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting Rod16 Photography!",
        html: autoReplyHtml,
      });

      if (error) {
        console.error("❌ AUTO-REPLY FAILED:", error);
        console.error("Target email was:", email);
      } else {
        console.log("✅ Auto-reply sent successfully to:", email);
        console.log("Resend email ID:", data.id);
        autoReplySent = true;
      }
    } catch (err: any) {
      console.error("❌ AUTO-REPLY THROW ERROR:", err);
      console.error("Target email was:", email);
    }

    // Final response
    if (notificationSent) {
      return NextResponse.json({
        success: true,
        notificationSent,
        autoReplySent,
        message: autoReplySent
          ? "Message sent successfully! Check your inbox."
          : "Your message was received, but auto-reply failed (check logs).",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to send notification email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("💥 Unexpected server error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}