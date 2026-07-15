import { query } from './db.js';

export async function getAllUsers() {
    try {
        const sql = 'SELECT * FROM users';
        const result = await query(sql);
        return result.rows;
    } catch (error) {
        console.error('failed to retrieve data', error.message);
        throw error;
    }
}
export async function createUser(object) {
    const {first_name,last_name,phone,email,profile_image,google_id,password} = object;
    const values = [first_name,last_name,phone,email,profile_image,google_id,password];
    const sql = `INSERT INTO users (first_name,last_name,phone,email,profile_image,google_id,password)
                VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
    let result = await query(sql,values);
    return result.rows[0];

}
