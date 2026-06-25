import { config } from "@/config";


export async function CreateOrder(payload: { userId: string; courseId: string; amount: number }) {

    if (!payload.userId || !payload.courseId || !payload.amount ) {
        throw new Error("User ID, Course ID, and Amount are required");
    }


    const res = await fetch(`${config.baseURL}/api/v2/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    });

    const data = await res.json();
    return data;
}