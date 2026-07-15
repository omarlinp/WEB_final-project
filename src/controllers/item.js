//importing the model functions for the items
import {getAllItems} from '../models/items.js';

export async function renderItems (req, res, next) {
 try {
    const items = await getAllItems();
    console.log(items);

    
 } catch (error) {
    console.error('failed to retrieve data', error.message)
    throw error;
 }
}
