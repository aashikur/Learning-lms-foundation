import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { join } from "path";


export async function GET(req: Request) {
    try {
        await connectDB();

        const header = ["courseId", "courseName", "courseDescription", "coursePrice", "category", "instructor", "isPublished", "createdAt"];

        const courses = await Course.find();
        const row = courses.map(course => [
            course._id,
            course.title,
            course.description,
            course.price,
            course.category,
            course.instructor,
            course.isPublished,
            course.createdAt
        ]);


        const csvContent = [header.join(","), ...row.map(r => r.join(","))].join("\n");


        return new Response(csvContent, {
            headers: {
                "content-type": "text/csv",
                "content-disposition": "attachment; filename=courses.csv"
            }
        });
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