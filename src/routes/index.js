import express from 'express';
import {renderSignUp, createRegistration} from '../controllers/users.js';
import upload from '../Middleware/image.js';
import {renderItems} from '../controllers/item.js'
import userRoutes from './users.js'
import itemRoutes from './item.js'
import adminRoutes from './admin.js'

const router  = express.Router();

//main routes

router.use('/users',userRoutes)
router.use('/items',itemRoutes)
router.use('/admin',adminRoutes)

router.get('/',renderItems)


router.get('/about',(req,res) => {
    res.render('about')
})




export default router;