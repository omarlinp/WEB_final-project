import express from 'express';
import { getAllUsers } from '../models/users.js';
import { deleteUser } from '../models/users.js';
import { getAllItems } from '../models/items.js';
const router  = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        const items = await getAllItems();
        res.render('admin/admin', { users, items });
    } catch (error) {
        next(error);
    }
})

router.get('/delete-user', async (req, res, next) => {
    try {
        const id = Number(req.query.id);

        if (!Number.isFinite(id)) {
            return res.status(400).send('Invalid user id');
        }

        if (req.session?.userId === id) {
            return res.status(400).send('You cannot delete your own account from the admin panel');
        }

        const result = await deleteUser({ id });

        if (!result.rowCount) {
            return res.status(404).send('User not found');
        }

        return res.redirect('/admin');
    } catch (error) {
        next(error);
    }
})

export default router;