import express from 'express';
const router  = express.Router();

router.get('/admin',(req,res) => {
    res.render('admin/admin')
})

export default router;