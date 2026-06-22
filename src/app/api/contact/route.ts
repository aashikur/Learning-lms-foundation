import { connectDB } from "@/lib/db";
import { Contact } from "@/models/contact.model";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, message } = body;

        const newContact = await Contact.create({
            name: name,
            email: email,
            message: message
        });

        return Response.json({
            status: 'success',
            contact: newContact
        });


    } catch (error) { console.log(error); }
}



export async function GET() {
    try {
        await connectDB();
        const contacts = await Contact.find().sort({ createdAt: -1 });

        return Response.json({
            status: 'success',
            contacts: contacts
        });
    } catch (error) { console.log(error); }
}