import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "signup", required: true, index: true },
    logs: [{
        category: { type: String, required: true, trim: true }, 
        title: { type: String, required: true, trim: true }, 
        description: { type: String, trim: true },
        targetdate: { type: Date },  // Changed to Date type
        image: String
    }]
});

const AddLog = model('addlog', logSchema);




export { AddLog };





















