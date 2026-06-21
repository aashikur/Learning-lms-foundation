import { config } from "@/config";

export async function SMSStatus({ orderId }: { orderId: string }) {
    const res = await fetch(`${config.baseURL}/api/payments/status/${orderId}`);
    /*
    
            const interval = setInterval(async () => {
                const res = await fetch(`${config.baseURL}/api/payments/status/${orderId}`);
                setCount(prevCount => prevCount + 1);
    
                const data = await res.json();
                console.log("Payment status response:", data);
                if (data.status === "PAID") {
                    setPaymentStatus("PAID");
                    clearInterval(interval);
                }
    
                if (data.status === "FAILED") {
                    setPaymentStatus("FAILED");
                    clearInterval(interval);
                }
            }, 3000);
    */

    const data = await res.json();

    return data;
}

export async function DemoSendSMS(payload : any) {
    const res = await fetch(`${config.baseURL}/api/webhooks/sms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return res.json();
}



/*

            tnxId: parsed.tnxId,
            amount: parsed.amount,
            provider: parsed.provider,
            rawText: body.text

*/



export async function VerifedSMS() {
    const res = await fetch(`${config.baseURL}/api/webhooks/sms`);
    const data = await res.json();
    return data;
}









