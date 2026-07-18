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
                ORDER BY created_date, img.id ASC;`
    const result = await query(sql,[id]);
    return result.rows;
}
export async function createItem(object) {
    const {user_id,province_id,name,price,description, images = []} = object;
    const values = [user_id,province_id,name,price,description];
    const sql = `INSERT INTO items (user_id, name, price,description,image_path) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    let result = await query(sql, values);

    return result.rows[0];

}

export async function updateItem(object) {
    const {id,province_id,name,price,description} = object;
    const values = [itemId,provinceId,name,price,description];
    const sql  =  `UPDATE item SET
        province_id = $2,
        name = $3,
        price = $4,
        description = $5
        WHERE id = $1
        RETURNING *;
    `;
    const result = await query(sql,values);
    return result.rows[0];

}

export async function deleteItem(id) {
    const sql = `DELETE * FROM items WHERE id = $1 RETURNING id;`;
    const result = await query(sql,values);
    return result;


}