import express from 'express';
import userRoutes from './users.js'
import itemRoutes from './item.js'
import adminRoutes from './admin.js'
import {renderItems} from '../controllers/item.js'
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