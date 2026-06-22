"use server"

import { transporter } from "@/lib/mail/mailer";
import fs from "fs";
import path from "path";



// no use : test email sending function : order recived
export const sendPaymentEmail = async (order: any) => {

    const filePath = path.join(
        process.cwd(),
        "src/templates/email/paymentSuccess.html"
    );

    let template = fs.readFileSync(filePath, "utf-8");

    template = template
        .replace("{{userId}}", order.userId)
        .replace("{{amount}}", order.amount)
        .replace("{{tnxId}}", order.tnxId);

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Payment Received",
        html: template
    });
};




// For testing purpose only
export const sendEmail = async () => {
    try {

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: `${process.env.ADMIN_EMAIL}, mdmsujon852@gmail.com, cpm.hridoy@gmail.com`,
            subject: "Test Email",
            text: "This is a plain text,  test email from Learning LMS.",
            html: "<p>This is a <strong>html test email</strong> from Learning LMS.</p>"
        });
        console.log("Email sent successfully!");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
}




// first Test mail 
export const sendTestEmail = async (subject: string, text: string) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        text: text,
    });
};




// Contact form email
export const sendContactEmail = async (data: { name: string, email: string, message: string }) => {
    const res = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: `${process.env.ADMIN_EMAIL}, ${process.env.ADMIN_EMAIL2}, ${process.env.ADMIN_EMAIL3}, ${process.env.ADMIN_EMAIL4}, ${process.env.ADMIN_EMAIL5}`,
        subject: `New Contact Form Submission from ${data.name}`,
        html: `<p><strong>Name:</strong> ${data.name}</p>
               <p><strong>Email:</strong> ${data.email}</p>
               <p><strong>Message:</strong> ${data.message}</p>`
    })
}


// payment email
export const sendOrderInvoiceEmail = async (order: {
    userId: string;
    courseId: string;
    tnxId: string;
    senderNumber: string;
    mobileOperator: string;
}) => {
    const res = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: `${process.env.ADMIN_EMAIL}, ${process.env.ADMIN_EMAIL2}, ${process.env.ADMIN_EMAIL3}, ${process.env.ADMIN_EMAIL4}, ${process.env.ADMIN_EMAIL5}`,
        subject: `New Order Received from User ${order.tnxId}`,
        html: `
      <h2>New Enrollment Order Placed</h2>
      <p><strong>User ID:</strong> ${order.userId}</p>
      <p><strong>Course ID:</strong> ${order.courseId}</p>
      <p><strong>Transaction ID:</strong> ${order.tnxId}</p>
      <p><strong>Method:</strong> ${order.mobileOperator}</p>
      <p><strong>Sender No:</strong> ${order.senderNumber}</p>
    `,
    })
}