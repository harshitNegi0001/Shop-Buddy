import jwt from 'jsonwebtoken';
import returnRes from '../utiles/response.js';

export const checkUser = async (req, res, next) => {
    const userToken = req.cookies.userToken;
    if (userToken) {
        try {
            const decodeToken = await jwt.verify(userToken,process.env.SECRET);
            req.id=decodeToken.id;
            req.role=decodeToken.role;
            next();
        } catch (err) {
            // console.log(err);
            return returnRes(res, 500, { message: 'Invalid Token or Server Error' });
        }
    }
    else {
        return returnRes(res, 409, { message: 'Please login first' });
    }
}