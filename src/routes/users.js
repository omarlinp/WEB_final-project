import express from 'express';
import {renderSignUp, createRegistration, loginUser} from '../controllers/users.js';
import upload from '../Middleware/image.js';

const router  = express.Router();
router.get('/login', async (req, res) => {
    res.render('forms/login')
})
router.post('/login', loginUser)

router.get('/profile',(req,res) => {
    res.render('profile')
})

router.get('/signup',renderSignUp)
router.post('/signup',upload.single("profile_image"), createRegistration)

export default router;