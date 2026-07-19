import express from 'express';
import {renderSignUp,renderProfile,renderUserUpdateForm, createRegistration, loginUser,updateAccount} from '../controllers/users.js';
import upload from '../Middleware/image.js';

const router  = express.Router();
router.get('/login', async (req, res) => {
    res.render('forms/login')
});
router.post('/login', loginUser);

router.get('/profile',renderProfile);
router.get('/update',renderUserUpdateForm);

router.get('/signup',renderSignUp);
router.post('/signup',upload.single("profile_image"), createRegistration);
router.put('/update',upload.single("profile_image"),updateAccount);

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }

        res.clearCookie('connect.sid');
        res.redirect('/users/login');
    });
});

export default router;