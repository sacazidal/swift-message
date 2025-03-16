import nodemailer from "nodemailer";
export async function sendRecoveryCode(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Восстановление пароля",
    text: `Ваш код для восстановления пароля: ${code}`,
  };

  await transporter.sendMail(mailOptions);
}
