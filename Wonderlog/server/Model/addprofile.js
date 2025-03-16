import {Schema} from 'mongoose';
import {model} from 'mongoose';
const profileSchema=new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    bio: { type: String },
    image: { type: String }, // Store Base64 encoded image
});
const profile=model('addProfile',profileSchema)
export {profile}


