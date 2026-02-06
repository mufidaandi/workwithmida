import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    if (
      !process.env.SMTP_USER ||
      process.env.SMTP_USER === "your-email@gmail.com"
    ) {
      console.log("Contact form submission (SMTP not configured):", {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Message received (email delivery pending SMTP configuration)",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send notification email to Muhamida
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Website] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #FDFCFB; border-radius: 16px; overflow: hidden; border: 1px solid #E8E3DE;">
          <div style="background: linear-gradient(135deg, #624F3E, #4A3A2C); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Message from Your Website</h1>
          </div>
          <div style="padding: 30px;">
            <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #F5F1ED;">
              <p style="margin: 0 0 8px; color: #624F3E; font-weight: 600; font-size: 14px;">From</p>
              <p style="margin: 0; color: #2E2E2E; font-size: 16px;">${name} (${email})</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #F5F1ED;">
              <p style="margin: 0 0 8px; color: #624F3E; font-weight: 600; font-size: 14px;">Subject</p>
              <p style="margin: 0; color: #2E2E2E; font-size: 16px;">${subject}</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #F5F1ED;">
              <p style="margin: 0 0 8px; color: #624F3E; font-weight: 600; font-size: 14px;">Message</p>
              <p style="margin: 0; color: #2E2E2E; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #9A8A75; font-size: 12px;">
            Sent from workwithmida.com
          </div>
        </div>
      `,
    });

    // Send confirmation email to the sender
    await transporter.sendMail({
      from: `"Mida @ workwithmida" <${process.env.SMTP_USER}>`,
      replyTo: "hello@workwithmida.com",
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #FDFCFB; border-radius: 16px; overflow: hidden; border: 1px solid #E8E3DE;">
          <div style="background: linear-gradient(135deg, #624F3E, #4A3A2C); padding: 40px; text-align: center;">
            <h1 style="color: #FDFCFB; margin: 0; font-size: 28px; font-family: Georgia, serif;">Muhamida</h1>
            <p style="color: #FAF7F5; margin: 8px 0 0; font-size: 14px;">Virtual Assistant</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #342820; margin: 0 0 16px; font-size: 22px; font-family: Georgia, serif;">Hi ${name},</h2>
            <p style="color: #2E2E2E; line-height: 1.6; margin: 0 0 16px; font-size: 16px;">
              Thank you for reaching out! I've received your message and will get back to you within 24 hours.
            </p>
            <p style="color: #2E2E2E; line-height: 1.6; margin: 0 0 24px; font-size: 16px;">
              In the meantime, feel free to check out my <a href="https://workwithmida.com#portfolio" style="color: #624F3E; text-decoration: none; font-weight: 600;">portfolio</a> or learn more about my <a href="https://workwithmida.com#services" style="color: #624F3E; text-decoration: none; font-weight: 600;">services</a>.
            </p>
            
            <div style="background: #FFF9F7; border-left: 4px solid #E89B8E; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 8px; color: #624F3E; font-weight: 600; font-size: 14px;">Your Message</p>
              <p style="margin: 0 0 12px; color: #342820; font-size: 15px; font-weight: 600;">${subject}</p>
              <p style="margin: 0; color: #2E2E2E; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #2E2E2E; line-height: 1.6; margin: 24px 0 0; font-size: 16px;">
              Looking forward to connecting with you!
            </p>
            <p style="color: #342820; margin: 16px 0 0; font-size: 16px; font-family: 'Brush Script MT', cursive;">
              — Mida
            </p>
          </div>
          <div style="padding: 24px; text-align: center; border-top: 1px solid #F5F1ED;">
            <p style="margin: 0 0 8px; color: #9A8A75; font-size: 12px;">
              <strong>Muhamida</strong> • Virtual Assistant
            </p>
            <p style="margin: 0; color: #9A8A75; font-size: 12px;">
              Davao City, Philippines • hello@workwithmida.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
