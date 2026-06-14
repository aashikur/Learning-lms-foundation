import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectDB();

        const { uid } = await req.json();

        if(!uid) {
            return new Response("Bad Request: Missing uid", { status: 400 });
        }

        const user = await User.findOne({ uid });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error("Error in me route: ", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}