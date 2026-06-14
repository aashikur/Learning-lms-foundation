import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { uid, email, name, photoURL } = body;

        // Validation guard clause
        if (!uid || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required identity fields" },
                { status: 400 }
            );
        }

        // Upsert pattern (Find or Create)
        let user = await User.findOne({ uid });

        if (!user) {
            user = await User.create({ uid, email, name, photoURL });
        }

        return NextResponse.json({ success: true, user });
    }
    catch (error) { console.error("Error in sync route:", error); }
}
