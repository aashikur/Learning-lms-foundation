import { sendTestEmail } from "@/services/mail.service";


export async function GET() {
    try {
        await sendTestEmail("Test Email", "Hello from VectorFit Mail System!");

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