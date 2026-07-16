import express from 'express';
import {renderSignUp, createRegistration} from '../controllers/users.js';
import upload from '../Middleware/image.js';
const router  = express.Router();



















//routes
router.get('/login', async (req, res) => {
    res.render('forms/login')
})

router.get('/signup',renderSignUp)
router.post('/signup',upload.single("profile_image"), createRegistration)

router.get('/item',(req,res) => {
    res.render('forms/item')
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