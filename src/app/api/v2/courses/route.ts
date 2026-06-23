import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";

// ==========================================
// POST: Create a New Course
// ==========================================
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, price } = body;

    const course = await Course.create({ title, description, price });

    return Response.json({
      success: true,
      meta: { api_version: "v2" },
      data: course
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return Response.json({
      success: false,
      meta: { api_version: "v2" },
      message: "Failed to create course."
    }, { status: 500 });
  }
}

// ==========================================
// GET: Fetch Paginated & Searchable Courses
// ==========================================
export async function GET(req: Request) {
  try {
    await connectDB();

    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") || "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Clean One-line Sanitization
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    const [courses, totalCount] = await Promise.all([
      Course.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
      success: true,
      meta: { api_version: "v2" },
      pagination: {
        total_Items: totalCount,
        limit: limit,
        current_Page: page,
        total_Pages: totalPages,
        next_Page: page < totalPages ? page + 1 : null,
        previous_Page: page > 1 ? page - 1 : null
      },
      data: courses
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return Response.json({
      success: false,
      meta: { api_version: "v2" },
      message: "An error occurred while fetching course data."
    }, { status: 500 });
  }
}