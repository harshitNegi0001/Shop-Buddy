import formidable from "formidable";
import cloudinary from "cloudinary";
import db from '../../utiles/db.js';
import returnRes from '../../utiles/response.js';
import calculateRating from "../../utiles/calculateRatings.js";

class Product {
    addProduct = async (req, res) => {
        const form = formidable({});
        const sellerId = req.id;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return returnRes(res, 400, { message: err.message });

            }
            else {
                let name = fields.name?.[0] || "";
                const brand = fields.brand[0];
                const category = fields.category[0];
                const stock = fields.stock[0];
                const price = fields.price[0];
                const discount = fields.discount[0];
                const description = fields.description[0];
                const image = files.image;
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                });
                try {
                    const images = [];
                    for (const img of image) {
                        const result = await cloudinary.uploader.upload(img.filepath, { folder: 'products' });
                        images.push(result.secure_url);
                    }


                    if (image) {

                        await db.query("INSERT INTO products (name , brand , price,category,stock,discount,description,images,seller_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9)", [name, brand, price, category, stock, discount, description, images, sellerId]);
                        return returnRes(res, 200, { message: "product added" })
                    } else {
                        return returnRes(res, 400, { message: "Image Upload Failed" });
                    }
                }
                catch (err) {

                    return returnRes(res, 500, { message: "Internal Server Error" });

                }
            }
        });

    }

    getProducts = async (req, res) => {
        let { searchValue, parPage, currPage, discount, sellerId } = req.query;

        try {

            const searchItem = searchValue ? `%${searchValue}%` : '%';
            parPage = parseInt(parPage)
            currPage = parseInt(currPage)
            sellerId = sellerId ? parseInt(sellerId) : null;
            if (discount) {

                const result = await db.query("SELECT * FROM product_detail WHERE ((name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND discount > 0 AND ($4::int IS NULL OR seller_id = $4::int) )ORDER BY id DESC OFFSET $2 LIMIT $3 ", [searchItem, (parPage * (currPage - 1)), parPage, sellerId]);
                const totalItems = await db.query("SELECT * FROM product_detail WHERE (name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND discount > 0 AND ($2::int IS NULL OR seller_id = $2::int)", [searchItem, sellerId]);
                const prodRatings = result.rows.map(p => calculateRating(p.comments));

                return returnRes(res, 200, { message: "successful", products: result.rows, totalItems: totalItems.rowCount, ratings: prodRatings });

            }
            else {

                const result = await db.query("SELECT * FROM product_detail WHERE ((name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND ($4::int IS NULL OR seller_id = $4::int)) ORDER BY id DESC  OFFSET $2 LIMIT $3 ", [searchItem, (parPage * (currPage - 1)), parPage, sellerId]);
                const totalItems = await db.query("SELECT * FROM product_detail WHERE (name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND ($2::int IS NULL OR seller_id = $2::int)", [searchItem, sellerId]);

                const prodRatings = result.rows.map(p => calculateRating(p.comments));
                return returnRes(res, 200, { message: "successful", products: result.rows, totalItems: totalItems.rowCount, ratings: prodRatings });

            }
        }
        catch (err) {
            console.log(err);
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
    }
    addToCart = async (req, res) => {
        const role = req.role;
        if (role === 'customer') {
            const id = req.id;
            const { prodId } = req.body;

            try {
                const isAlready = await db.query('SELECT * FROM add_to_cart WHERE customer_id =$1 AND product_id = $2', [id, prodId]);
                if (isAlready.rows.length == 0) {
                    await db.query('INSERT INTO add_to_cart (product_id,customer_id) values ($1,$2)', [prodId, id])
                }
                return returnRes(res, 200, { message: "Success" });

            } catch (err) {
                console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed to access." })
        }
    }
    getProductDetail = async (req, res) => {
        const { productId } = req.query;
        try {
            const result = await db.query("SELECT * FROM product_detail WHERE id = $1", [productId]);
            const ratingObj = calculateRating(result.rows[0].comments);
            let lastestRatings = []
            for (const cmnt of result.rows[0].comments.slice().reverse()) {

                if (lastestRatings.length >= 3) {
                    break;
                }
                else {
                    if (cmnt.comment) {
                        lastestRatings.push(cmnt);
                    }
                }
            }

            const custIds = lastestRatings.map(c => c.customer_id);

            const userDetail = await db.query('SELECT id,name,image FROM customers WHERE id= ANY( $1) ORDER BY array_position($1, id)', [custIds]);

            for (let i = 0; i < lastestRatings.length; i++) {
                lastestRatings[i] = { ...lastestRatings[i], userDetail: userDetail.rows[i] }
            }
            if (result.rows.length > 0) {
                return returnRes(res, 200, { message: "successful", prodDetail: result.rows[0], rating: ratingObj, topRating: lastestRatings });
            }
            else {
                return returnRes(res, 400, { message: "No Product found" });
            }
        }
        catch (err) {
            console.log(err)
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
    }
    rateProd = async (req, res) => {
        const role = req.role;
        // if(role==='customer'){
        const id = 1;
        const { prodId, comment } = req.body;
        try {

            const oldCom = await db.query('SELECT comments FROM products WHERE id = $1', [prodId]);

            const isAlready = oldCom.rows[0].comments.find(i => i.customer_id == id)
            if (!isAlready) {
                const updatedCom = [...oldCom.rows[0].comments, comment];
                await db.query("UPDATE products SET comments = $1 WHERE id = $2", [updatedCom, prodId]);
            }
            else {
                const filteredCom = oldCom.rows[0].comments.filter(c => c.customer_id != id);
                const updatedCom = [...filteredCom, comment];
                await db.query("UPDATE products SET comments = $1 WHERE id = $2", [updatedCom, prodId]);
            }


            return returnRes(res, 200, { message: "Success" });
        } catch (err) {
            console.log(err);
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
        // }
        // else{
        //     return returnRes(res,403,{message:"You are not allowed to access"});
        // }
    }
    editProduct = async (req, res) => {
        const form = formidable({});

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return returnRes(res, 400, { message: err.message });

            }
            else {
                let name = fields.name?.[0] || "";
                const brand = fields.brand[0];
                const category = fields.category[0];
                const stock = fields.stock[0];
                const price = fields.price[0];
                const discount = fields.discount[0];
                const description = fields.description[0];
                const id = fields.id[0];
                let image = files.image || [];
                if (!Array.isArray(image)) {
                    image = [image];
                }

                let oldImage = fields["oldImage"] || [];
                if (!Array.isArray(oldImage)) {
                    oldImage = [oldImage];
                }
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                });
                try {

                    for (const img of image) {
                        const result = await cloudinary.uploader.upload(img.filepath, { folder: 'products' });
                        oldImage.push(result.secure_url);
                    }


                    if (oldImage) {
                        await db.query("UPDATE products SET name=$1 , brand=$2 , price=$3,category=$4,stock=$5,discount=$6,description=$7,images=$8 WHERE id =$9  ", [name, brand, price, category, stock, discount, description, oldImage, id]);
                        return returnRes(res, 200, { message: "product added" });
                    } else {
                        return returnRes(res, 400, { message: "Image Upload Failed" });
                    }
                }
                catch (err) {
                    console.log(err)
                    return returnRes(res, 500, { message: "Internal Server Error" });

                }
            }
        });
    }
    getOfferHighlight = async (req, res) => {
        try {
            const result = await db.query("SELECT * FROM offer_highlight ORDER BY id DESC LIMIT 4 ");
            return returnRes(res, 200, { message: "Success", highlight: result.rows });
        } catch (err) {
            // console.log(err);
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
    }

    getMyCart = async (req, res) => {
        const role = req.role;
        if (role === 'customer') {
            const id = req.id;
            try {
                const cartProd = await db.query('SELECT c.id as cart_id,p.* FROM add_to_cart AS c JOIN products AS p ON p.id = c.product_id WHERE customer_id = $1 ORDER BY cart_id DESC', [id]);
                return returnRes(res, 200, { message: "Success", cartProd: cartProd.rows });
            } catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed to access" });
        }
    }
    deleteFromCart = async (req, res) => {
        const role = req.role;
        if (role === 'customer') {
            const id = req.id;

            try {
                const { cart_id } = req.body;
                await db.query("DELETE FROM add_to_cart WHERE id =$1", [cart_id]);
                return returnRes(res, 200, { message: "Success" });

            } catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal server error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }
}

export default new Product();