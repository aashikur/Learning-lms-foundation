import { config } from "@/config";


export const createContact = async (data:
    { name: string, email: string, message: string }) => {
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
}




export const getContacts = async () => {
    try {
        const res = await fetch(`${config.baseURL}/api/contact`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
}