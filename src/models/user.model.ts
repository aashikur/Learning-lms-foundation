import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    photoURL: String,

    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    handle : { type: String, unique: true, sparse: true }
},
    { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema);