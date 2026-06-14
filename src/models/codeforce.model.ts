import mongoose from 'mongoose';

const CodeforceSchema = new mongoose.Schema({
    handle: {type : String, required: true, unique: true},
    rating: Number,
    maxRating: Number,
    rank: String,
    country: String,
    avatar: String,
    lastUpdate: Date,

})

export const Codeforce =  mongoose.models.Codeforce || mongoose.model('Codeforce', CodeforceSchema);