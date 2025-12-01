import jwt from 'jsonwebtoken';
import returnRes from '../utiles/response.js';

export const checkAdmin = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return returnRes(res,409,{ message: 'Please Login First' });
    }
    else {
        try {
            const decodeToken = await jwt.verify(accessToken, process.env.SECRET);
            if (decodeToken.role === 'admin') {
                req.id = decodeToken.id;
                req.role = decodeToken.role;
                next();
            }else{
                return returnRes(res,409,{message:"Authentication failed!\nOnly admin can access"});
            }

        } catch (err) {
            // console.log(err);
            return res.status(409).json({ message: 'Invalid Token or Server error' });
        }
    }
}