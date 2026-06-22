import { sendContactEmail } from "@/services/mail.service";



export async function POST(req: Request) {
    try {

        const body = await req.json();
        const res  = await sendContactEmail(body);

        return Response.json({
            success: true,
            message: { data: res}

        })

    } catch (error) {
        console.error(error);
    }
}

