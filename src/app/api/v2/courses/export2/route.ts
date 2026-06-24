import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { join } from "path";


export async function GET(req: Request) {
    try {
        await connectDB();
        const searchParams = new URL(req.url).searchParams;
        console.log("searchParams", searchParams.toString());

        const fields = searchParams.get("fields"); // "_id, title.."
        const selectedFields = fields ? fields.split(",") :
            ["_id", "title", "slug", "thumbnail", "description", "price", "category", "instructor", "isPublished", "createdAt"];

        // isPublished filter
        const isPublished = searchParams.get("isPublished");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        if (isPublished) {
            filter.isPublished ={$in: [isPublished === "true"]};
        }

        const courses = await Course.find(filter);



        
        
        const header = selectedFields;

        const row = courses.map(course =>
            selectedFields.map(field => course[field]))

        const csvContent = [header.join(","), ...row.map(r => r.join(","))].join("\n");

        return new Response(csvContent
            // , {
            //     headers: {
            //         "content-type": "text/csv",
            //         "content-disposition": "attachment; filename=courses.csv"
            //     }
            // }
        );


    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}

/*
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, lowercase: true },
    thumbnail: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FnddXTJxo5dUpCmDDK9cTfUANcBz13e2hU-tVQrfSA&s=10' },
    description: { type: String, required: true },
   
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    isPublished: { type: Boolean, default: false },

}, { timestamps: true });

*/