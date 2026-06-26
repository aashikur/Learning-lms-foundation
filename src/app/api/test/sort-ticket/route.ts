import { connectDB } from "@/lib/db";


export async function POST(req: Request) {
    try {
        await connectDB();

        // some logic here 
        const res = "response from POST /api/test/sort-ticket";

    // DB operation => delte pathch edit moidfy 

        return Response.json({ message: res }, { status: 200 });

    } catch (error) {
        console.error('Error in POST /api/test/sort-ticket:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

interface TicketResponse {
    ticket_id: string;
    case_type: string;
    severity: string;
    department: string;
    agent_summary: string;
    human_review_required: boolean;
    confidence: number;
}
/**
 * 
 * 
 * 3. Response Schema
Your service must return JSON in the following shape:
{
"ticket_id": "T-001",
"case_type": "wrong_transfer",
"severity": "high",
"department": "dispute_resolution",
"agent_summary": "Customer reports sending 5000 BDT to a wrong number and requests recovery.",
"human_review_required": true,
"confidence": 0.85
}
 * 
 */

