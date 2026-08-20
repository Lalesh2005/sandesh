import jwt from "jsonwebtoken";

export const authMiddleware =async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        if(!authHeader){
            return res.status(400).json({
                success:false,
                message:"Access Denied. No Token Provided"
            });
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(400).json({
                success:true,
                message:"Invalid Token format"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export default authMiddleware;