//sample query to create admin

// insert into admins(name,email,password)
// values ('Harshit Singh Negi','negiharshitsingh919@gamil.com','$2a$12$wqhbuP7JxA2YxV6Wruh/uuKHhEflqV4TWi0w0k2a4Od5OKje/bBQe');
import db from '../utiles/db.js';
import bcrypt from 'bcrypt';
import returnRes from '../utiles/response.js';
import { createToken } from '../utiles/createToken.js';

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

  getUser = async (req,res)=>{
    const {role,id} =req;
    try {
      if(role==='admin'){
        const user = await db.query('SELECT * FROM admins WHERE id = $1',[id]);
        return returnRes(res,200,{userInfo:user});
      }
      else{
        console.log("seller info");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default new AuthController();
