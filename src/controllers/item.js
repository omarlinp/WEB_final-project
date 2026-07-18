//importing the model functions for the items
import {getAllItems,createItem,getOneItem} from '../models/items.js';
import {GetUserById} from '../models/users.js';

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
      const itemData = await getOneItem(id)
      console.log(itemData);
      const userData = await GetUserById(itemData.user_id)
      console.log(userData);
      res.render('product-detail',{
         item: itemData,
         user: userData
      })
      
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
