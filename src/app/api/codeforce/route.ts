import { connectDB } from "@/lib/db";
import { Codeforce } from "@/models/codeforce.model";

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

export async function GET(request: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") as string) || 1;
    const limit = parseInt(searchParams.get("limit") as string) || 10;

    // Ensure page and limit are at least 1
    const sanitizedPage = Math.max(1, page);
    const sanitizedLimit = Math.max(1, limit);

    const query: Record<string, any> = {};
    if (search) {
      query.handle = { $regex: search, $options: "i" };
    }

    const skip = (sanitizedPage - 1) * sanitizedLimit;

    const [users, totalUsers] = await Promise.all([
      Codeforce.find(query)
        .sort({ rating: -1 })
        .skip(skip)
        .limit(sanitizedLimit)
        .lean(),
      Codeforce.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalUsers / sanitizedLimit);

    return Response.json({
      success: true,
      data: users,
      meta: {
        totalItems: totalUsers,
        totalPages: totalPages,
        currentPage: sanitizedPage,
        itemsPerPage: sanitizedLimit,
        hasNextPage: sanitizedPage < totalPages,
        hasPrevPage: sanitizedPage > 1
      }
    });
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