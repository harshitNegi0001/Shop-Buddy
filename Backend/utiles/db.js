import PG from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = PG;

const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:parseInt(process.env.DB_PORT),
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
        

});

export default pool;