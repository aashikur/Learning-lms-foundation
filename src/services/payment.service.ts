import { config } from "@/config";

export async function CreatePaymentOrder(payload: { userId: string; courseId: string; tnxId?: string; senderNumber?: string; mobileOperator?: string }) {

    if(!payload.userId || !payload.courseId) {
        throw new Error("User ID and Course ID are required");
    }

    const res = await fetch(`${config.baseURL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: payload.userId,
            courseId: payload.courseId,
            tnxId: payload.tnxId,
            senderNumber: payload.senderNumber,
            mobileOperator: payload.mobileOperator
        })
    });
    return res.json();
}

 
