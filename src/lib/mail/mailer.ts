import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({

    secure: true,
    host: "smtp.gmail.com",
    port: 465,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

