import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";


// Get course by id
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await context.params;
        const course = await Course.findById(id);

        if (!course) {
            return Response.json({ message: "Course not found" }, { status: 404 });
        }

        return Response.json(course);
    }
    catch (error) {
        return Response.json({ message: "Error fetching course", error }, { status: 500 });
    }
}


// Edit course by id - Patch request
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await context.params;
        const course = await Course.findById(id);

        if (!course) {
            return Response.json({ message: "Course not found" }, { status: 404 });
        }

        const body = await req.json();


        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )

        return Response.json({
            message: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        return Response.json({ message: "Error updating course", error }, { status: 500 });
    }
}


// Delete course by id 
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await context.params;
        const course = await Course.findById(id);

        if(!course) {
            return Response.json({ message: "Course not found" }, { status: 404 });
        }

       const deletedCourse = await Course.findByIdAndDelete(id);

        return Response.json({ success: true, message: "Course deleted successfully", deletedCourse });
    } 
    catch (error) {}
}