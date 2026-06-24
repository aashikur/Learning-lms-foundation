import { connectDB } from "@/lib/db";
import { VerifiedSMS } from "@/models/verified-sms.model";




export async function GET(req: Request) {
    try {
        await connectDB();

        const searchParams = new URL(req.url).searchParams;

        const search = searchParams.get("search") || "";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};

        if (search) {
            query.$or = [
                { tnxId: { $regex: search, $options: "i" } },
                { provider: { $regex: search, $options: "i" } }
            ]
        }

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));

        const skip = (page - 1) * limit;

        const [totalSMS, totalCount] = await Promise.all([
            VerifiedSMS.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            VerifiedSMS.countDocuments(query)
        ])

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
            data: totalSMS
        })
    }
    catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            meta: { api_version: "v2" },
            message: "An error occurred while fetching verified SMS data."
        }, { status: 500 });
    }
}
