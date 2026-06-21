import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({

    secure: true,
    host: "smtp.gmail.com",
    port: 465,

    // service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendTestEmail = async (subject: string, text: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        text: text,
    });
};

