// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text
//   });
// };

// export default sendEmail;


import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
       tls: {
        rejectUnauthorized: false // 🔥 fixes self-signed cert error
      }
    });

    await transporter.sendMail({
      from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

export default sendEmail;



