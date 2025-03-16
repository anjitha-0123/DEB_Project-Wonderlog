import {Schema} from 'mongoose';
import {model} from 'mongoose';
const UserSchema=new Schema({
    username:{type:String,required:true,unique:true},
    phonenumber:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true},
    bookmarks: [{ type:Schema.Types.ObjectId, ref: "addinspiration" }] 
});
const User=model('signup',UserSchema)
export {User}