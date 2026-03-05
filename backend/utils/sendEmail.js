// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     console.log("EMAIL_USER:", process.env.EMAIL_USER);
//     console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       },
//        tls: {
//         rejectUnauthorized: false // 🔥 fixes self-signed cert error
//       }
//     });

//     await transporter.sendMail({
//       from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text
//     });

//     console.log("✅ Email sent successfully");
//   } catch (error) {
//     console.error("❌ Email error:", error.message);
//     throw error;
//   }
// };

// export default sendEmail;



// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     await sgMail.send({
//       to,
//       from: "writetompact@gmail.com",
//       subject,
//       text,
//     });

//     console.log("✅ Email sent successfully");
//   } catch (error) {
//     console.error("❌ SendGrid error:", error.response?.body || error.message);
//     throw error;
//   }
// };

// export default sendEmail;



import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  try {

    const otp = text.match(/\d+/)?.[0] || "";

    const htmlContent = `
<div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px 0;">
  <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

    <div style="background:#111827; padding:20px; text-align:center;">
      <h1 style="color:#facc15; margin:0;">MPACT</h1>
    </div>

    <div style="padding:30px; text-align:center;">
      <h2 style="color:#111827; margin-bottom:10px;">
        Email Verification
      </h2>

      <p style="color:#4b5563; font-size:16px;">
        Use the verification code below to complete your signup.
      </p>

      <div style="
        font-size:32px;
        letter-spacing:6px;
        font-weight:bold;
        color:#111827;
        background:#facc15;
        padding:15px 25px;
        display:inline-block;
        border-radius:6px;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p style="color:#6b7280; font-size:14px;">
        This code will expire in <b>10 minutes</b>.
      </p>

      <p style="color:#9ca3af; font-size:12px; margin-top:20px;">
        If you didn’t request this email, you can safely ignore it.
      </p>
    </div>

    <div style="background:#f9fafb; padding:15px; text-align:center;">
      <p style="font-size:12px; color:#9ca3af;">
        © ${new Date().getFullYear()} MPACT. All rights reserved.
      </p>
    </div>

  </div>
</div>
`;

    await sgMail.send({
      to,
      from: "writetompact@gmail.com",
      subject,
      text: `Your OTP is ${otp}`,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ SendGrid error:", error.response?.body || error.message);
    throw error;
  }
};

export default sendEmail;