import db from '../../utiles/db.js';
import returnRes from '../../utiles/response.js';


class Seller{
    getSeller = async(req,res)=>{

        const {parPage,currPage,searchValue,status} = req.query;
        
        try{
            const searchTerm = searchValue?`%${searchValue}%`:'%';
            const sellerStatus = status?`%${status}%`:'%';
            const totalSellers = await db.query("SELECT COUNT(s_id) FROM seller_info WHERE s_name ILIKE $1 AND s_status LIKE $2",[searchTerm,sellerStatus]);
            const result = await db.query("SELECT * FROM seller_info WHERE s_name ILIKE $1 AND s_status LIKE $2 ORDER BY s_id OFFSET $3 LIMIT $4",[searchTerm,sellerStatus,(parPage*(currPage-1)),parPage]);

            if(result.rows.length>0){
                return returnRes(res,200,{message:"fetch successfully",sellers:result.rows,totalSellers:totalSellers.rows[0].count});
            }
            else{
                return returnRes(res,400,{message:"No seller found"})
            }
        }
        catch(err){
            return returnRes(res,500,{message:"Internal Server Error"});
        }
        
    }

    getSellerDetail = async(req,res)=>{
        try{
            const {id} = req.query;
            const result = await db.query("SELECT * FROM seller_info WHERE s_id = $1",[id]);
            if(result.rows.length>0){
                return returnRes(res,200,{message:"seller found",sellerDetail:result.rows[0]});
            }else{
                return returnRes(res,404,{message:"Seller not found"});
            }
        }
        catch(err){
            return returnRes(res,500,{message:"Internal Server Error"});
        }
    }

    setSellerStatus = async(req,res)=>{
        try{ 
            const {status,id} = req.body;
            
            const result = await db.query("UPDATE seller_info SET s_status = $1 WHERE s_id = $2 RETURNING *",[status,id]);
            if(result.rows.length>0){
                return returnRes(res,200,{message:"Successfully Done",sellerDetail:result.rows[0]});
            }
            else{
                return returnRes(res,400,{message:"Something went wrong"});
            }
        }
        catch(err){
            return returnRes(res,500,{message:"Internal Server Error"});
        }
    }
}

export default new Seller();