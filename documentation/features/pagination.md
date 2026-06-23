
```markdown
# API Documentation: Paginated Resource Collection

A standardized, production-ready response template for all collection-based `GET` requests featuring offset pagination and search filtering.

## Endpoints
`GET /api/v2/payments`

### Query Parameters
| Parameter | Type      | Default | Description                                                                |
| :-------- | :-------- | :------ | :------------------------------------------------------------------------- |
| `search`  | `string`  | `""`    | Case-insensitive query against searchable fields (e.g., `tnxId`, `senderNumber`). |
| `page`    | `integer` | `1`     | Target page number. Evaluates to `1` if less than 1.                       |
| `limit`   | `integer` | `20`    | Max documents to return per page.                                          |

---

## Response Structure (`200 OK`)

```json
{
    "success": true,
    "meta": {
        "api_version": "v2"
    },
    "pagination": {
        "total_Items": 4,
        "limit": 20,
        "current_Page": 1,
        "total_Pages": 1,
        "next_Page": null,
        "previous_Page": null
    },
    "data": []
}

import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";

export async function GET(req: Request) {

    try {
        await connectDB();

        const searchParams = new URL(req.url).searchParams;

        const search = searchParams.get("search") || "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};

        if (search) {
            query.$or = [
                { tnxId: { $regex: search, $options: "i" } },
                { senderNumber: { $regex: search, $options: "i" } }
            ];
        }

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));

        const skip = (page - 1) * limit;

        const [paymentOrders, totalCount] = await Promise.all([
            await PaymentOrder.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            PaymentOrder.countDocuments(query)
        ])
        const totalPages = Math.ceil(totalCount / limit);

        return Response.json({
            success: true,
            meta: {
                api_version: "v2",
            },
            pagination: {
                total_Items: totalCount,
                limit: limit,
                current_Page: page,
                total_Pages: totalPages,
                next_Page: page < totalPages ? page + 1 : null,
                previous_Page: page > 1 ? page - 1 : null
            },
            data: paymentOrders

        })


    } catch (error) {
        console.error("Error fetching payment orders:", error);
        return Response.json(
            {
                success: false,
                message: "Failed to fetch payment orders"
            }
        );

    }
}

/*
if needed, you can expand the search query to include multiple fields. For example: 
if (search) {
  query.$or = [
    { handle: { $regex: search, $options: "i" } },
    { email: { $regex: search, $options: "i" } }
  ];
}
*/