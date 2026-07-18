import express from 'express';
import {renderItemDetails,createproduct} from '../controllers/item.js';
import upload from '../Middleware/image.js';

const router  = express.Router();

router.get('/new',(req,res) => {
    res.render('forms/item')
})
router.get('/details',renderItemDetails)

router.post('/item',upload.single("images"), createproduct);

export default router;