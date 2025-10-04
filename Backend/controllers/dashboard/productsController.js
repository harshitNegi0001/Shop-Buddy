import formidable from "formidable";
import cloudinary from "cloudinary";
import db from '../../utiles/db.js';
import returnRes from '../../utiles/response.js';

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
        const { searchValue, parPage, currPage, discount, sellerId } = req.query;

        try {
            const searchItem = searchValue ? `%${searchValue}%` : '%';
            if (discount) {

                const result = await db.query("SELECT * FROM product_detail WHERE ((name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND discount > 0 AND ($4::int IS NULL OR seller_id = $4::int) )ORDER BY id DESC OFFSET $2 LIMIT $3 ", [searchItem, (parPage * (currPage - 1)), parPage, sellerId]);
                const totalItems = await db.query("SELECT * FROM product_detail WHERE (name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND discount > 0 AND ($2::int IS NULL OR seller_id = $2::int)", [searchItem, sellerId]);

                if (result.rows.length > 0) {
                    return returnRes(res, 200, { message: "successful", products: result.rows, totalItems: totalItems.rowCount });
                }
                else {
                    return returnRes(res, 404, { message: "No record found" });
                }
            }
            else {

                const result = await db.query("SELECT * FROM product_detail WHERE ((name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND ($4::int IS NULL OR seller_id = $4::int)) ORDER BY id DESC  OFFSET $2 LIMIT $3 ", [searchItem, (parPage * (currPage - 1)), parPage, sellerId]);
                const totalItems = await db.query("SELECT * FROM product_detail WHERE (name ILIKE $1 OR brand ILIKE $1 OR category_name ILIKE $1) AND ($2::int IS NULL OR seller_id = $2::int)", [searchItem, sellerId]);
                if (result.rows.length > 0) {
                    return returnRes(res, 200, { message: "successful", products: result.rows, totalItems: totalItems.rowCount });
                }
                else {
                    return returnRes(res, 404, { message: "No record found" })
                }
            }
        }
        catch (err) {
            console.log(err);
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
    }

    getProductDetail = async (req, res) => {
        const { productId } = req.query;
        try {
            const result = await db.query("SELECT * FROM product_detail WHERE id = $1", [productId]);
            if (result.rows.length > 0) {
                return returnRes(res, 200, { message: "successful", prodDetail: result.rows[0] });
            }
            else {
                return returnRes(res, 400, { message: "No Product found" });
            }
        }
        catch (err) {
            return returnRes(res, 500, { message: "Internal Server Error" });
        }
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
}

export default new Product();