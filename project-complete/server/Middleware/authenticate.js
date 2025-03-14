import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const authenticate=(req,res,next)=>{
    
    
    const cookie=req.headers.cookie;
    console.log(cookie);
    const cookies=cookie.split(';');
    let count=0;
    for(let cookie of cookies){
        const [name,token]=cookie.trim().split('=');
        console.log(name);
        console.log(token);
        if(name=='authTok'){
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        // Attach user data to the request
        req.userid=verified.userId;
        req.UserName = verified.UserName;  // Now accessible in /addComment
        req.userrole = verified.userrole;
           console.log(req.UserName);
           console.log(req.userrole);
           count=1;
           next ();
           break;
    }
    
    }
    if(count==0)
        {

        res.status(401).send("Unautherised Access")
       }
}
export{authenticate}