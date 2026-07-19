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
export async function GetUser(login) {
    const sql = `SELECT * FROM users WHERE email =$1 OR username = $2;`;
    let result = await query(sql, [login, login]);
    return result.rows[0];
}
export async function GetUserById(id) {
    const sql = `SELECT * FROM users WHERE id =$1;`;
    let result = await query(sql, [id]);
    return result.rows[0];
}
export async function createUser(object) {
    const {first_name,last_name,phone,email,profile_image,google_id,password,username} = object;
    const values = [first_name,last_name,phone,email,profile_image,google_id,password,username];
    const sql = `INSERT INTO users (first_name,last_name,phone,email,profile_image,google_id,password,username)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,is_admin`;
    let result = await query(sql,values);
    return result.rows[0];

}
export async function updateUser(object) {
    const {first_name,last_name,phone,email,profile_image,google_id,password,id} = object;
    const values = [first_name,last_name,phone,email,profile_image,google_id,password,id];
    const sql = `UPDATE users SET 
    first_name = $1,
    last_name = $2,
    phone = $3,
    email = $4,
    profile_image = $5,
    google_id = $6,
    password = $7
    WHERE id = $8`;
    let result = await query(sql,values);
    return result.rows[0];
}
export async function deleteUser(object) {
    const {id} = object;
    const values = [id]
    const sql = `DELETE FROM users WHERE id = $1;`;
    let result = await query(sql,values);
    return result;
}
