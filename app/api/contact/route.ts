import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getNotificationEmailTemplate, getAutoReplyEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
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
      email,
      phone,
      weddingDate,
      weddingLocation,
      referralSource,
      serviceType,
      photoBudget,
    } = formData;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const myEmail = process.env.MY_EMAIL || "rod16zedo@gmail.com";

    // Notification to you
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

      await resend.emails.send({
        from: "Rod16 Photography <contact@rod16photo.com>",  // Use verified domain or onboarding@resend.dev
        to: [myEmail],
        subject: "New Contact Form Submission - Rod16 Photography",
        html: notificationHtml,
        replyTo: email,
      });
      notificationSent = true;
      console.log("Notification sent to", myEmail);
    } catch (err: any) {
      console.error("Notification failed:", err);
    }

    // Auto-reply to client
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

      await resend.emails.send({
        from: "Rod16 Photography <contact@rod16photo.com>",
        to: [email],
        subject: "Thank you for contacting Rod16 Photography!",
        html: autoReplyHtml,
      });
      autoReplySent = true;
      console.log("Auto-reply sent to", email);
    } catch (err: any) {
      console.error("Auto-reply failed:", err);
    }

    if (notificationSent) {
      return NextResponse.json({
        success: true,
        notificationSent,
        autoReplySent,
        message: autoReplySent ? "Message sent successfully" : "Message received, but auto-reply failed",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to send emails" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}