import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
},
    { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

