const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require('path')
const { SENDER_EMAIL, RECEIVER_EMAIL, APP_PASSWORD } = process.env;

const sendMail = async (name, email, subject, message) => {
  let template = await fs.promises.readFile(path.join(__dirname, "template/email.html"), "utf8");

  template = template.replace(/&lt/g, "<");
  template = template.replace(/&gt/g, ">");
  template = template.replace("[name]", name);
  template = template.replace("[email]", email);
  template = template.replace("[subject]", subject);
  template = template.replace("[message]", message);

  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to your email provider
      host: "smtp.gmail.com",
      //   port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL, // Your Gmail address from .env file
        pass: APP_PASSWORD, // Your Gmail password or app password from .env file
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: email, // Sender address
      to: RECEIVER_EMAIL, // List of receivers
      subject: `Portfolio Mail Received - ${name}`, // Subject line
      //   text: message, // Plain text body
      // Alternatively, you can send an HTML body:
      html: template,
    });

    return { success: true, info };
  } catch (error) {
    // Avoid throwing, return error info to handle it gracefully in the app

    return {
      success: false,
      message: "Email not sent",
      error: error.message || error,
    };
  }
};

module.exports = sendMail;
