import formidable from "formidable";
import cloudinary from "cloudinary";
import db from '../../utiles/db.js';
import returnRes from '../../utiles/response.js';
class Category {

    //add category start
    addCategory = async (req, res) => {
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return returnRes(res, 400, { message: "Something went wrong" });
            }
            else {
                let name = fields.name?.[0] || "";
                const image = files.image?.[0];
                name = name.trim();
                const slug = name.split(' ').join('-');
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                });
                try {
                    const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories'});
                    if (result) {
                        const category = await db.query("INSERT INTO category (name,image,slug) values($1,$2,$3) RETURNING*", [name, result.secure_url, slug]);
                        return returnRes(res, 200, { category, message: "Category Added Successfully" })
                    } else {
                        return returnRes(res, 400, { message: "Image Upload Failed" });
                    }
                }
                catch (err) {
                    return returnRes(res, 500, { message: "Internal Server Error" });
                }
            }
        })
    }
    //End
    //get category start
    getCategory =async(req,res)=>{
        
        try{
            const {searchValue,parPage,currPage} = req.body;
            const searchTerm = searchValue ? `%${searchValue}%` : '%';
            const totalResult = await db.query("SELECT COUNT(id)  FROM category WHERE slug ILIKE $1 ",[searchTerm]);
            
            const result = await db.query("SELECT * FROM category WHERE slug ILIKE $1 ORDER BY id OFFSET $2 LIMIT $3 ",[searchTerm,(parPage*(currPage-1)),parPage]);
            if(result.rows.length>0){
                const response = result.rows;
                
                return returnRes(res,200,{message:"successful",response:response,totalResult:totalResult.rows[0].count});
            }
            return returnRes(res,404,{message:"No records found",totalResult:totalResult.rows[0].count});
        }
        catch(err){
            console.log(err);
            return returnRes(res,500,{message:"Internal Server Error"});
        }
    }
    getCategories = async(req,res) =>{
        try{
            const result =await db.query("SELECT id,name FROM category");
            if(result.rows.length>0){
                return returnRes(res,200,{message:"Fetch categories successfully",categories:result.rows});

            }
            else{
                return returnRes(res,404,{message:"No records found"});
            }
        }
        catch(err){
            
            return returnRes(res,500,{message:"Internal Server Error"});
        }
    }
}

export default new Category();