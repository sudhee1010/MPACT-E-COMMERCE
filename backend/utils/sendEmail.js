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



import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  try {
    await sgMail.send({
      to,
      from: "writetompact@gmail.com", // must match verified sender
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ SendGrid error:", error.response?.body || error.message);
    throw error;
  }
};

export default sendEmail;
