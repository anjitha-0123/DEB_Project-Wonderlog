
import mongoose, { Schema, model } from 'mongoose';

const InspirationSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    comments: [{ 
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "signup", required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Prevent OverwriteModelError
const postmodel = mongoose.models.addinspiration || model('addinspiration', InspirationSchema);

export { postmodel };






