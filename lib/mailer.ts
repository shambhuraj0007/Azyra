import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER || "";
const pass = process.env.SMTP_PASS || "";
const from = process.env.EMAIL_FROM || "AZYRA Verification <noreply@azyra.io>";

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
});

export async function sendVerificationCode(email: string, otp: string) {
  const isSmtpConfigured = Boolean(user && pass && !pass.includes("your_app_password"));

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #07090e; color: #f1f5f9; margin: 0; padding: 40px 20px; }
          .container { max-width: 500px; margin: 0 auto; background: #0c101f; border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 24px; padding: 40px 30px; text-align: center; }
          .logo { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 8px; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #a5b4fc; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 24px; }
          .heading { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          .text { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
          .otp-box { font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; background: #070911; border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 16px; padding: 18px 24px; display: inline-block; margin-bottom: 28px; }
          .footer { font-size: 12px; color: #64748b; border-t: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">AZYRA 🚀</div>
          <div class="badge">Account Verification</div>
          <div class="heading">Verify Your Email Address</div>
          <div class="text">Use the 6-digit verification code below to complete your AZYRA account registration.</div>
          <div class="otp-box">${otp}</div>
          <div class="text">This code will expire in 10 minutes. If you did not request this email, please ignore it.</div>
          <div class="footer">&copy; ${new Date().getFullYear()} AZYRA Inc. Growth Ecosystem.</div>
        </div>
      </body>
    </html>
  `;

  if (!isSmtpConfigured) {
    console.log(`\n==================================================`);
    console.log(`✉️ [AZYRA NODEMAILER SIMULATOR] Email verification requested for: ${email}`);
    console.log(`🔑 Verification Code (OTP): [ ${otp} ]`);
    console.log(`==================================================\n`);
    return {
      sent: true,
      simulated: true,
      message: "SMTP password not set in .env. OTP logged to terminal for quick testing!",
    };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to: email,
      subject: `[AZYRA] Your Account Verification Code: ${otp}`,
      html: htmlTemplate,
    });
    console.log(`✅ Nodemailer email sent to ${email}: ${info.messageId}`);
    return { sent: true, simulated: false, messageId: info.messageId };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`❌ Nodemailer Error sending email to ${email}:`, errorMsg);
    return { sent: false, simulated: false, error: errorMsg };
  }
}
