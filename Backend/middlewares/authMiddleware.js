import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res,next)=>{
    const {accessToken} = req.cookies;
    
    if (!accessToken) {
        return res.status(409).json({message:'Please Login First'})
    } else {
        try {
            const decodeToken = await jwt.verify(accessToken,process.env.SECRET)
            req.id= decodeToken.id;
            req.role = decodeToken.role;
            next();
        } catch (err) {
            return res.status(409).json({message:err.message})
        }
    }
}