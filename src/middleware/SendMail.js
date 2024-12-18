const nodemailer = require("nodemailer");
require("dotenv").config();

const { SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD, EMAIL_FROM } = process.env;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = async (to, subject, html) => {
    const mailOption = {
        from: EMAIL_FROM,
        to,
        subject,
        html,
    };
    try {
        const info = await transporter.sendMail(mailOption);
        console.log("email Sent: ", info.messageId);
    } catch (error) {
        console.log("Error Sending email ", error);
    }

};

module.exports = sendMail;