import express from 'express';
const router  = express.Router();

router.get('/login', async (req, res) => {
    res.render('forms/login')
})

router.get('/profile',(req,res) => {
    res.render('profile')
})

router.get('/signup',renderSignUp)
router.post('/signup',upload.single("profile_image"), createRegistration)

export default router;