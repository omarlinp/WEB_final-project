import { query } from './db.js';

export async function getAllUsers() {
    try {
        const sql = 'SELECT * FROM provinces;';
        const result = await query(sql);
        return result.rows;
    } catch (error) {
        console.error('failed to retrieve users', error.message);
        throw error;
    }
}