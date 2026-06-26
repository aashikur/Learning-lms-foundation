import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema ({
    "ticket_id": { type: String, required: true, unique: true },
    "channel": { type: String},
    "locale": { enum: ['en', 'bn'], default: 'en' },
    "message": { type: String, required: true },
});

export const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

