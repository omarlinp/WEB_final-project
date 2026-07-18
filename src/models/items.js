import { query } from './db.js';


export async function getAllItems() {
    try {
        const sql = `SELECT * FROM items`;
        const result = await query(sql);
        return result.rows;

    } catch (error) {
        console.error('failed to retrieve data', error.message);
        throw error;
    }
}
export async function getOneItem(id) {
    const sql = `SELECT * FROM items WHERE id = $1;`;
    const result = await query(sql,[id]);
    return result.rows[0];
}
export async function getItemsByUser(id) {
    const sql = `SELECT * FROM items
                WHERE user_id = $1
                ORDER BY created_date ASC;`
    const result = await query(sql,[id]);
    return result.rows;
}
export async function createItem(object) {
    const {user_id,name,price,description, image_path} = object;
    const values = [user_id,name,price,description,image_path];
    const sql = `INSERT INTO items (user_id, name, price,description,image_path) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    let result = await query(sql, values);

    return result.rows[0];

}

export async function updateItem(object) {
    const {id,name,price,description,image_path} = object;
    const values = [id,name,price,description,image_path];
    const sql  =  `UPDATE items SET
        name = $2,
        price = $3,
        description = $4,
        image_path = $5
        WHERE id = $1
        RETURNING *;
    `;
    const result = await query(sql,values);
    return result.rows[0];

}

export async function deleteItem(id) {
    const sql = `DELETE FROM items WHERE id = $1 RETURNING id, image_path;`;
    const result = await query(sql,[id]);
    return result.rows[0];


}