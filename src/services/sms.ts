import { transporter } from "@/lib/mailer";
import fs from "fs";
import path from "path";

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
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Payment Received",
        html: template
    });
};