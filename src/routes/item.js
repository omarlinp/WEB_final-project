import express from 'express';
import {createproduct} from '../controllers/item.js';
import upload from '../Middleware/image.js';

const router  = express.Router();

router.get('/new',(req,res) => {
    res.render('forms/item')
})
router.get('/details',(req,res) => {
    res.render('product-detail')
})

router.post('/item',upload.array("images",10), createproduct);

export default router;