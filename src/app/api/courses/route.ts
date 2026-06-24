import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { title, description, price, category, instructor, thumbnail, isPublished } = body;
        // 2. Simple helper to generate a URL-safe slug from the title
        const generatedSlug = title
            ? title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a hyphen
                .replace(/^-+|-+$/g, '')  // Trim leading/trailing hyphens
            : '';

        // 3. Insert the complete document into MongoDB
        const course = await Course.create({
            title,
            description,
            price,
            category,
            instructor, // Must be a valid User ObjectId string
            slug: generatedSlug,
            thumbnail: thumbnail || undefined, // Fallback to schema default if empty
            isPublished: isPublished ?? false  // Handle boolean check explicitly
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Record<string, any> = {}
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // 3. Calculate the number of documents to skip
        const skip = (sanitizedPage - 1) * sanitizedLimit;

        // 4. Execute database operations in parallel for better performance
        const [courses, totalCourses] = await Promise.all([
            Course.find(query)
                .sort({ createdAt: -1 }) // Optional: sort by creation date descending
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

