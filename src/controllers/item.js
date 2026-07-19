//importing the model functions for the items
import {getAllItems,createItem,getOneItem,updateItem,deleteItem} from '../models/items.js';
import {GetUserById} from '../models/users.js';
import fs from 'fs/promises';
import path from 'path';

function ensureLoggedIn(req, res) {
   if (!req.session?.isLoggedIn || !req.session?.userId) {
      res.redirect('/users/login');
      return false;
   }
   return true;
}

export async function renderItems (req, res, next) {
   try {
    const items = await getAllItems();

    const shortItems = items.map(item => ({
      ...item,
      description: item.description.length > 100 ?
                     item.description.slice(0,100) + "..."
                     :item.description
    }))
    res.render('index',{shortItems})

    
 } catch (error) {
    console.error('failed to retrieve data', error.message)
    throw error;
 }
}
export async function renderItemDetails(req,res,next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
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
      next(error);
   }
}
export async function renderCreateItemForm(req, res, next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
   res.render('forms/item')
}
export async function createproduct(req,res,next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
   try {
      const item = {
         ...req.body,
         image_path: req.file?.filename,
         user_id:req.session.userId
      };

      const items = await createItem(item);
      console.log(items);
      res.redirect('/users/profile');

   } catch (error) {
      console.error('failed to retrieve data', error.message)
      throw error;
 }
}
export async function RenderUpdateItem(req,res,next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
   const id = Number(req.query.item_id);
   try {
      const itemData = await getOneItem(id);
      console.log(itemData);
      res.render('forms/itemUpdate',{item:itemData});
   } catch (error) {
      next(error);
   }
}
export async function UpdateItems(req, res, next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
   try {
      const id = Number(req.body.id);
      if (!Number.isFinite(id)) {
         return res.status(400).json({ success: false, message: 'Invalid item id' });
      }

      const existingItem = await getOneItem(id);
      if (!existingItem) {
         return res.status(404).json({ success: false, message: 'Item not found' });
      }

      const item = {
         ...req.body,
         id,
         image_path: req.file?.filename || existingItem.image_path
      };
      const updatedItem = await updateItem(item)
      res.status(200).json({ success: true, item: updatedItem })
   } catch (error) {
      next(error);
   }
}
export async function deleteItems(req, res, next) {
   if (!ensureLoggedIn(req, res)) {
      return;
   }
   try {
      const id = Number(req.query.item_id);

      const result = await deleteItem(id);
      if (!result) {
         return res.status(404).json({ success: false, message: 'Item not found' });
      }

      if (result.image_path) {
         const safeFileName = path.basename(result.image_path);
         const imageFullPath = path.join(process.cwd(), 'public', 'img', safeFileName);
         try {
            await fs.unlink(imageFullPath);
         } catch (err) {
            if (err.code !== 'ENOENT') {
               console.error('Image deletion failed:', err.message);
            }
         }
      }

      return res.redirect('/users/profile?id=1&is_admin=false');
   } catch (error) {
      next(error);
   }
}