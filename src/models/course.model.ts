import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, lowercase: true },
    thumbnail: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FnddXTJxo5dUpCmDDK9cTfUANcBz13e2hU-tVQrfSA&s=10' },
    category: { type: String, required: true, index: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    isPublished: { type: Boolean, default: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);