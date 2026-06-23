import { connectDB } from "@/lib/db";
import { Contact } from "@/models/contact.model";



// 1. Get all contacts with pagination and search filtering
export async function GET(req: Request) {
    try {
        await connectDB();

        const searchParams = new URL(req.url).searchParams;
        const search = searchParams.get("search") || "";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};

        // Multi-field search mapping name, email, and message body
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { message: { $regex: search, $options: "i" } }
            ];
        }

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));
        const skip = (page - 1) * limit;

        const [totalContacts, totalCount] = await Promise.all([
            Contact.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Contact.countDocuments(query)
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
            data: totalContacts
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return Response.json({
            success: false,
            meta: { api_version: "v2" },
            message: "An error occurred while fetching contact data."
        }, { status: 500 });
    }
}