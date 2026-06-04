import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { title, description, price } = body;

    const course = await Course.create({
        title: title,
        description: description,
        price: price
    });

    return Response.json(course);
}

export async function GET() {
    try {
        await connectDB();

        const courses = await Course.find();

        return Response.json(courses);
    }
    catch (error) { }
}

