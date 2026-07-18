import express from 'express';
import {renderItemDetails,createproduct,RenderUpdateItem,renderCreateItemForm,UpdateItems,deleteItems} from '../controllers/item.js';
import upload from '../Middleware/image.js';

const router  = express.Router();

router.get('/new',renderCreateItemForm)
router.get('/details',renderItemDetails)
router.get('/update',RenderUpdateItem)
router.put('/update',upload.single("images"),UpdateItems);
router.get('/delete',deleteItems);
router.post('/item',upload.single("images"), createproduct);

export default router;