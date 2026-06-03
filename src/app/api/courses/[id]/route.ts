import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";


export async function GET(req: Request, context: { params: { id: string } }) {
    await connectDB();

    const { id } = await context.params;

    const course = await Course.findById(id);

    return Response.json(course);
}
