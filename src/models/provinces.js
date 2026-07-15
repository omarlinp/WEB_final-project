import { query } from './db.js';

export async function getAllProvinces() {
    try{
        const sql = 'SELECT name FROM provinces';
        const result = await query(sql);
        return result.rows;
    }catch(error){
        console.error('failed to retrieve data', error.message)
        throw error;
    }
}
