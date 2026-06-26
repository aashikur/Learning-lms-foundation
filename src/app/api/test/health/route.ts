import { connectDB } from "@/lib/db";


export async function GET(req: Request) {
    try {
        await connectDB();

        // some logic here 
        const res = "response from GET /api/test/health";
        return Response.json({ message: res }, { status: 200 });

    } catch (error) {
        console.error('Error in GET /api/test/health:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}