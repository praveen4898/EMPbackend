const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]
if(token){
    const decoded=jwt.verify(token,"masai")
    if(decoded){
       req.body.userID=decoded.userID
       req.body.author=decoded.author
        next()
    }
    else{
        res.send({"msg":"You are not authorised"})
    }
}
else{
    res.send({"msg":"You are not authorised"})
}
}


module.exports={
    auth
}





// const jwt=require("jsonwebtoken")

// const auth=(req,res,next)=>{
//  const token=req.headers.authorization?.split(" ")[1]
//     jwt.verify(token,"masai",(err,decoded)=>{
//         if(decoded){
//             console.log("decoded")
//             res.send({"msg":"authenticated"})
        
//         }
//         else{
//             res.send({"msg":"you are not authorised"})
//         }
        
//     })
// }

// module.exports={
//     auth
// }