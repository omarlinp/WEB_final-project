import {Pool} from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificate = fs.readFileSync(path.join(__dirname,'../../bin','byuicse-psql-cert.pem'))


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        ca: certificate,
        rejectUnauthorized: true,
        checkServerIdentity:() => {return undefined;}
    }
});

export const query = (text, params) => pool.query(text, params);