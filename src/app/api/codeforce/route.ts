import { connectDB } from "@/lib/db";
import { Codeforce } from "@/models/Codeforce";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { handle } = await req.json();

    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return Response.json({ error: "Invalid handle" }, { status: 400 });
    }

    const user = data.result[0];

    const saved = await Codeforce.findOneAndUpdate(
      { handle: user.handle },
      {
        handle: user.handle,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || "unrated",
        country: user.country || "unknown",
        avatar: user.avatar,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    return Response.json(saved);
  } catch (error) {
    return Response.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const users = await Codeforce.find().sort({ rating: -1 });
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}



export async function DELETE(req: Request) {
  await connectDB();

  try {
    const { handle } = await req.json();

    const deleted = await Codeforce.findOneAndDelete({ handle });

    if (!deleted) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}