import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { title, description, price } = body;

        const course = await Course.create({
            title: title,
            description: description,
            price: price
        });

        return Response.json({
            status: 'success',
            course: course
        });
    }
    catch (error) {
        console.error('Error creating course:', error);
        return new Response('Failed to create course', { status: 500 });
    }
}


export async function GET(request: Request) {
    try {
        await connectDB();

        // const courses = await Course.find();

        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") as string) || 1;
        const limit = parseInt(searchParams.get("limit") as string) || 10;

        // Ensure page and limit are at least 1
        const sanitizedPage = Math.max(1, page);
        const sanitizedLimit = Math.max(1, limit);

        const query: Record<string, any> = {}
        if (search) {
            query.handle = { $regex: search, $options: "i" };
        }

        // 3. Calculate the number of documents to skip
        const skip = (sanitizedPage - 1) * sanitizedLimit;

        // 4. Execute database operations in parallel for better performance
        const [courses, totalCourses] = await Promise.all([
            Course.find(query)
                .skip(skip)
                .limit(sanitizedLimit)
                .lean(), // .lean() converts Mongoose docs to plain JS objects for speed
            Course.countDocuments(query) // Counts total matching items without pagination
        ]);

        const totalPages = Math.ceil(totalCourses / sanitizedLimit)

        return Response.json(
            {
                success: true,
                data: courses,
                meta: {
                    totalItems: totalCourses,
                    totalPages: totalPages,
                    currentPage: sanitizedPage,
                    itemsPerPage: sanitizedLimit,
                    hasNextPage: sanitizedPage < totalPages,
                    hasPrevPage: sanitizedPage > 1
                }
            }
        );
}
    catch (error) {
    console.error('Error fetching courses:', error);
    return new Response('Failed to fetch courses', { status: 500 });
}
}

