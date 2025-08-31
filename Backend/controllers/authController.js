//sample query to create admin

// insert into admins(name,email,password)
// values ('Harshit Singh Negi','negiharshitsingh919@gamil.com','$2a$12$wqhbuP7JxA2YxV6Wruh/uuKHhEflqV4TWi0w0k2a4Od5OKje/bBQe');
import db from '../utiles/db.js';
import bcrypt from 'bcrypt';
import returnRes from '../utiles/response.js';
import { createToken } from '../utiles/createToken.js';
// import pool from '../utiles/db.js';

class AuthController {
  adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      // db.connect();
      const result = await db.query('SELECT * FROM admins WHERE email = $1', [email]);
      if (result.rows.length === 0) {
        console.log("no user found");
        return returnRes(res, 401, { message: "Wrong Email or Password" });
      }
      const admin = result.rows[0];
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = await createToken({
          id: admin.id,
          role: admin.role
        });
        res.cookie('accessToken', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        return returnRes(res, 200, {
          message: "Login Successful",
          token: token
        });
      }
      return returnRes(res, 401, { message: "Wrong Email or Password" });
    }
    catch (err) {
      return returnRes(res, 500, {
        message: err.message
      });
    }
  }
  //end admin-login method

  getUser = async (req, res) => {
    const { role, id } = req;
    try {
      if (role === 'admin') {
        const user = await db.query('SELECT * FROM admins WHERE id = $1',[id]);
        return returnRes(res, 200, { userInfo: user.rows[0] });
      }
      else if(role==='seller') {
        const user = await db.query('SELECT * FROM seller_info WHERE s_id = $1',[id]);
        const userDetail = {
          s_id:user.rows[0].s_id,
          s_name:user.rows[0].s_name,
          s_email:user.rows[0].s_email,
          s_role:user.rows[0].s_role,
          s_status:user.rows[0].s_status,
          s_payment:user.rows[0].s_payment,
          s_image:user.rows[0].s_image
        };

        return returnRes(res,200,{userInfo:userDetail})
      }
      else{
        return returnRes(res,400,{userInfo:null,message:'user not found'})
      }
    } catch (err) {
      return returnRes(res,400,{message:err.message});
    }
  }

  //seller registeration start
  sellerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    //check dublicate email
    try {

      const searchEmail = await db.query("SELECT * FROM seller_info WHERE s_email = $1", [email]);
      if (searchEmail.rows.length>0) {
        return returnRes(res, 409, { message: "This email is already registered" });
      }
      const hasedPass =await bcrypt.hash(password,10);
      const result = await db.query("INSERT INTO seller_info(s_name,s_email,s_pass) VALUES ($1,$2,$3) RETURNING s_id,s_role",[name,email,hasedPass]);
      const seller = result.rows[0];
      await db.query("INSERT INTO seller_customer (myId) VALUES ($1)",[seller.s_id]);
      const token = await createToken({
        id:seller.s_id,
        role:seller.s_role
      });
      res.cookie('accessToken',token,{
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
      return returnRes(res,201,{message:"Registered Successful",token:token});
      
    }
    catch(err){
      return returnRes(res,400,{message:err.message});
    }
  }

  //seller login start
  sellerLogin = async(req,res)=>{
    const {email,password} = req.body;

    try{
      const searchEmail = await db.query('SELECT * FROM seller_info WHERE s_email = $1',[email]);
      if(searchEmail.rows.length<1){
        return returnRes(res,401,{message:"Wrong Email Or Password"});
      }
      const result = await bcrypt.compare(password,searchEmail.rows[0].s_pass);
      if(result){
        const token = await createToken({
          id:searchEmail.rows[0].s_id,
          role:searchEmail.rows[0].s_role
        })
        res.cookie('accessToken',token,{
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return returnRes(res,200,{message:`Welcome back ${searchEmail.rows[0].s_name}`,token:token});
      }
      return returnRes(res,401,{message:"Wrong Email Or Password"});
    }
    catch(err){
      return returnRes(res,400,{message:err.message});
    }
  }

}

export default new AuthController();
