import { sendTestEmail } from "@/lib/mailer";

export async function GET() {
    try {
        await sendTestEmail("Test Email", "Test email");

        return Response.json({
            success: true,
            message: "Email sent"
        });

    } catch (error) {
        console.error(error);

        return Response.json({
            success: false,
            message: "Email failed"
        }, { status: 500 });
    }
}