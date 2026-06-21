export const sendAdminSMS = async (order: any) => {
    try {
        const url = new URL("https://sms-provider.com/send");

        url.searchParams.set("apiKey", process.env.SMS_API_KEY as string);
        url.searchParams.set("to", process.env.ADMIN_PHONE as string);
        url.searchParams.set(
            "message",
            `New Payment: ${order.amount} TK | TXN: ${order.tnxId}`
        );

        const res = await fetch(url.toString(), {
            method: "GET"
        });

        if (!res.ok) {
            throw new Error("SMS sending failed");
        }

        return await res.text();

    } catch (error) {
        console.error("SMS Error:", error);
    }
};