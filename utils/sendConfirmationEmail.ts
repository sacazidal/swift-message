import nodemailer from "nodemailer";

export async function sendConfirmationEmail(
  email: string,
  code: string,
  username: string
) {
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
    subject: "Подтверждение регистрации",
    html: `
    <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Подтверждение регистрации</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Inter", serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        text-align: center;
        padding: 30px 20px;
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: #ffffff;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .content h2 {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .content p {
        font-size: 18px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .code {
        display: inline-block;
        padding: 15px 30px;
        background-color: #007bff;
        color: #ffffff;
        font-size: 28px;
        font-weight: bold;
        border-radius: 8px;
        margin: 20px 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #777777;
        border-top: 1px solid #eeeeee;
        margin-top: 20px;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
      }
      .footer a:hover {
        text-decoration: underline;
      }
      .icon {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container animation">
      <div class="header">
        <img
          src="https://img.icons8.com/color/96/000000/verified-account.png"
          alt="Verified Icon"
          class="icon"
        />
        <h1>Добро пожаловать!</h1>
      </div>
      <div class="content">
        <h2>Привет, ${username}!</h2>
        <p>
          Мы рады, что вы решили присоединиться к нашему сообществу! 🎉 Чтобы
          начать пользоваться всеми возможностями, подтвердите свою регистрацию,
          введя код ниже:
        </p>
        <div class="code">${code}</div>
        <p>
          Этот код действует в течение 5 минут. Если вы не запрашивали
          регистрацию, просто проигнорируйте это письмо — возможно, кто-то
          ошибся адресом.
        </p>
        <p>Спасибо за доверие! Мы уверены, что вам у нас понравится. 😊</p>
      </div>
      <div class="footer">
        <p>
          С уважением,<br />Команда
          <a href="https://next-social-lac.vercel.app/">Next Social Network</a>
        </p>
      </div>
    </div>
  </body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
