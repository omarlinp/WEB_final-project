import express from 'express';

const router  = express.Router();




router.get('/item',(req,res) => {
    res.render('forms/item')
})
export default router;