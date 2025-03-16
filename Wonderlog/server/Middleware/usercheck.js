const usercheck=(req,res,next)=>{
    if(req.userrole=="user")
    {
        next();
    }
    else{
        res.status(500).send("Unautherised Access")
    }  
}
export {usercheck}