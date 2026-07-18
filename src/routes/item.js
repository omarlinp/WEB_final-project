import express from 'express';
import {renderItemDetails,createproduct,RenderUpdateItem,UpdateItems,deleteItems} from '../controllers/item.js';
import upload from '../Middleware/image.js';

const router  = express.Router();

router.get('/new',(req,res) => {
    res.render('forms/item')
})
router.get('/details',renderItemDetails)
router.get('/update',RenderUpdateItem)
router.put('/update',upload.single("images"),UpdateItems);
router.get('/delete',deleteItems);
router.post('/item',upload.single("images"), createproduct);

export default router;