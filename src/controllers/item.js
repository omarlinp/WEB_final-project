//importing the model functions for the items
import {getAllItems,createItem,getOneItem} from '../models/items.js';

export async function renderItems (req, res, next) {
 try {
    const items = await getAllItems();
    res.render('index',{items})

    
 } catch (error) {
    console.error('failed to retrieve data', error.message)
    throw error;
 }
}
export async function renderItemDetails(req,res,next) {
   const id = Number(req.query.item_id);
   try {
      const item = await getOneItem(id)
      console.log(item);
      res.render('product-detail',{item})
      
   } catch (error) {
      
   }
}
export async function createproduct(req,res,next) {
   try {
      const item = {
         ...req.body,
         image_path: req.file?.filename
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
