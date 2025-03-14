import mongoose, { Schema, model } from 'mongoose';

// Comment Schema
const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "signup", required: true },
    createdAt: { type: Date, default: Date.now }
});

// Updated Inspiration Schema with Embedded Comments
const InspirationSchema = new Schema({
    title: { type: String, required: true, trim: true, unique: true }, 
    description: { type: String, trim: true },
    image: { type: String },
    comments: [CommentSchema] // Embed comments directly in the inspiration post
}, { timestamps: true });

// Prevent OverwriteModelError
const Inspiration = mongoose.models.addinspiration || model('addinspiration', InspirationSchema);

export { Inspiration };
