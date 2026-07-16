//importing the model functions for the items
import {getAllItems,createItem} from '../models/items.js';

export async function renderItems (req, res, next) {
 try {
    const items = await getAllItems();
    console.log(items);
    res.render('index',{items})

    
 } catch (error) {
    console.error('failed to retrieve data', error.message)
    throw error;
 }
}
export async function createproduct(req,res,next) {
   try {
      const item = {
         ...req.body,
         images: req.files ? req.files.map(file => file.filename):[]
      };
      console.log(item)

      const items = await createItem(item);
      console.log(items);
      res.status(200).json({ success: true, items });

   } catch (error) {
      console.error('failed to retrieve data', error.message)
      throw error;
 }
}
