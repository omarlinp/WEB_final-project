import express from 'express';
import {renderItems} from '../controllers/item.js'
const router  = express.Router();




router.get('/item',(req,res) => {
    res.render('forms/item')
})
export default router;