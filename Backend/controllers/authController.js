
import formidable from "formidable";
import cloudinary from "cloudinary";
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
        const user = await db.query('SELECT * FROM admins WHERE id = $1', [id]);
        return returnRes(res, 200, { userInfo: user.rows[0] });
      }
      else if (role === 'seller') {
        const user = await db.query('SELECT * FROM seller_info WHERE s_id = $1', [id]);
        const userDetail = {
          s_id: user.rows[0].s_id,
          s_name: user.rows[0].s_name,
          s_email: user.rows[0].s_email,
          s_role: user.rows[0].s_role,
          s_status: user.rows[0].s_status,
          s_payment: user.rows[0].s_payment,
          s_image: user.rows[0].s_image,
          shop_info: user.rows[0].shop_info
        };

        return returnRes(res, 200, { userInfo: userDetail });
      }
      else if (role === 'customer') {
        const user = await db.query("SELECT id,name,image,address,email,phone_no FROM customers WHERE id =$1", [id]);
        if (user.rows.length > 0) {
          return returnRes(res, 200, { message: "Success", userId: user.rows[0].id, userInfo: user.rows[0], userRole: 'customer' })
        }
        else {
          return returnRes(res, 400, { message: "Something went wrong" });

        }
      }
      else {
        return returnRes(res, 404, { userInfo: null, message: 'user not found' });
      }
    } catch (err) {
      return returnRes(res, 400, { message: err.message });
    }
  }

  //seller registeration start
  sellerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    //check dublicate email
    try {

      const searchEmail = await db.query("SELECT * FROM seller_info WHERE s_email = $1", [email]);
      if (searchEmail.rows.length > 0) {
        return returnRes(res, 409, { message: "This email is already registered" });
      }
      const hasedPass = await bcrypt.hash(password, 10);
      const result = await db.query("INSERT INTO seller_info(s_name,s_email,s_pass) VALUES ($1,$2,$3) RETURNING s_id,s_role", [name, email, hasedPass]);
      const seller = result.rows[0];
      await db.query("INSERT INTO seller_customer (myId) VALUES ($1)", [seller.s_id]);
      const token = await createToken({
        id: seller.s_id,
        role: seller.s_role
      });
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
      return returnRes(res, 201, { message: "Registered Successful", token: token });

    }
    catch (err) {
      return returnRes(res, 400, { message: err.message });
    }
  }

  //seller login start
  sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const searchEmail = await db.query('SELECT * FROM seller_info WHERE s_email = $1', [email]);
      if (searchEmail.rows.length < 1) {
        return returnRes(res, 401, { message: "Wrong Email Or Password" });
      }
      const result = await bcrypt.compare(password, searchEmail.rows[0].s_pass);
      if (result) {
        const token = await createToken({
          id: searchEmail.rows[0].s_id,
          role: searchEmail.rows[0].s_role
        })
        res.cookie('accessToken', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return returnRes(res, 200, { message: `Welcome back ${searchEmail.rows[0].s_name}`, token: token });
      }
      return returnRes(res, 401, { message: "Wrong Email Or Password" });
    }
    catch (err) {
      return returnRes(res, 400, { message: err.message });
    }
  }

  //add shop detatil
  addShop = async (req, res) => {
    const { shop_info } = req.body;
    const id = req.id;
    if (req.role === 'seller') {
      try {
        const result = await db.query("UPDATE seller_info SET shop_info = $1 WHERE s_id = $2 RETURNING *", [shop_info, id]);
        if (result.rows.length > 0) {
          return returnRes(res, 200, { message: "Success", userInfo: result.rows[0] })
        }
        else {
          return returnRes(res, 400, { message: "Something went wrong" });
        }
      }
      catch (err) {
        console.log(err);
        return returnRes(res, 500, { message: "Internal Server Error" });
      }
    }
    else {
      return returnRes(res, 409, { message: "Only seller can add and edit shop" });
    }

  }

  updateProfile = async (req, res) => {
    const id = req.id;
    const role = req.role;
    const form = formidable({});
    console.log(id);

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true
    });
    if (role === 'seller') {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return returnRes(res, 400, { message: err.message });

        }
        else {
          const image = files.image?.[0];
          try {
            const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile' });
            if (result) {
              const profileImg = await db.query("UPDATE seller_info SET s_image = $1 WHERE s_id = $2 RETURNING s_image", [result.secure_url, id]);
              return returnRes(res, 200, { message: "Success", image: profileImg.rows[0].s_image });
            }
            else {
              return returnRes(res, 400, { message: "Profile update failed" });
            }
          }
          catch (error) {
            return returnRes(res, 500, { message: "Internal Server Error" });
          }
        }
      })
    }
    else if (role === 'admin') {
      form.parse(req, async (err, fields, files) => {
        const image = files.image?.[0];
        try {
          const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile' });
          if (result) {
            const profileImg = await db.query("UPDATE admins SET image = $1 WHERE id =  $2 RETURNING image", [result.secure_url, id]);
            return returnRes(res, 200, { message: "success", image: profileImg.rows[0].image });
          }
          else {
            return returnRes(res, 400, { message: "Profile update failed" });
          }
        }
        catch (error) {
          return returnRes(res, 500, { message: "Internal Server Error" });
        }
      })
    }
  }
  customerLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.query("SELECT * FROM customers WHERE email=$1", [email]);
      if (user.rows.length > 0) {

        const check_pass = await bcrypt.compare(password, user.rows[0].password);
        if (check_pass) {
          const token = await createToken({
            id: user.rows[0].id,
            role: 'customer'
          })
          res.cookie('accessToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });
          res.cookie('isAuth',true,{
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          })
          return returnRes(res, 200, { message: "Welcome back" ,token:token,userInfo:user.rows[0]});
        }
        else {
          return returnRes(res, 400, { message: "Wrong Email or Password" });
        }
      }
      else {
        return returnRes(res, 400, { message: "Wrong Email or Password" });
      }

    } catch (err) {
      return returnRes(res, 500, { message: "Internal Server Error" });
    }
  }
  logout = async (req, res) => {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      expires: new Date(0),
    })
    res.cookie('isAuth', false, {
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      expires: new Date(0),
    })
    return returnRes(res,200,{message:"Successfully Logout"});
  }

  editCustomerInfo = async (req,res)=>{
    const role = req.role;
    
    if(role==='customer'){
      try {
        const id = req.id;
        const {editedDetail} = req.body;
        const result = await db.query("UPDATE customers SET name = $1 , email= $2 , phone_no =$3, address =$4 WHERE id = $5 RETURNING *",[editedDetail.name,editedDetail.email,editedDetail.phone,editedDetail.address,id]);
        if(result.rows.length>0){
          return returnRes(res,200,{message:"Success",userInfo:result.rows[0]});
        }
        else{
          return returnRes(res,404,{message:"Something went wrong"});
        }
      } catch (err) {
        console.log(err)
        return returnRes(res,500,{message:"Internal Server Error"});
      }
    }
    else{
      return returnRes(res,403,{message:"You are not allowed"});
    }
  }

}

export default new AuthController();
