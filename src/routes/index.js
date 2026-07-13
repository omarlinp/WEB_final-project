import express from 'express';

const router  = express.Router();

//routes
router.get('/login',(req,res) => {
    res.render('forms/login')
})
router.get('/signup',(req,res) => {
    res.render('forms/registration')
})
router.get('/about',(req,res) => {
    res.render('about')
})
router.get('/admin',(req,res) => {
    res.render('admin/admin')
})
router.get('/profile',(req,res) => {
    res.render('profile')
})


export default router;