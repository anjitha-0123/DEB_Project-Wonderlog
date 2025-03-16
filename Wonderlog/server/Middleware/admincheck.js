const admincheck=(req,res,next)=>{
    if(req.userrole=="admin")
    {
        next();
    }
    else{
        res.status(500).send("Unautherised Access")
    }   
}
export {admincheck}