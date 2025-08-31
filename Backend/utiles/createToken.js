import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const createToken = async(data)=>{
    const token = await jwt.sign(data,process.env.SECRET,{expiresIn:'7d'});
    return token;
}