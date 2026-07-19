import {getAllUsers,GetUser,GetUserById,createUser,updateUser,deleteUser} from '../models/users.js';
import {getItemsByUser} from '../models/items.js';
import bcrypt from "bcrypt";

export async function renderSignUp(req, res, next) {
    try {
        res.render('forms/registration', { title: 'Sign Up' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export async function renderProfile(req, res,next) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/users/login');
    }
    try {
        const id = req.session.userId
        if (!id) {
            return res.redirect('/users/login');
        }
        
        const userData = await GetUserById(id);
        const itemsData = await getItemsByUser(id)

        const shortItems = itemsData.map(item => ({
            ...item,
            description: item.description.length > 100 ?
                        item.description.slice(0,100) + "..."
                        :item.description
        }));
        res.render('profile',{
            user:userData,
            items:shortItems
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export async function renderUserUpdateForm(req, res, next) {
    try {
        const userData = await GetUserById(req.session.userId);
        res.render('forms/userUpdate', {user:userData})
         
    } catch (error) {
        next(error)
    }
}
export async function loginUser(req, res, next) {
    try {
        
        const {login , password} = req.body;
        const user = await GetUser(login);
        if (!user){
            return res.status(401).json({success: false, message: "Invalid username/email or password"});
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword){
            return res.status(401).json({success: false, message: "Invalid username/email or password"});
        }
        console.log('the user has been authenticated susscessfully')
        req.session.userId = user.id;
        req.session.isLoggedIn = true;
        req.session.isAdmin = user.is_admin;
        res.json({  success: true, 
                    user: {id: user.id, admin: user.is_admin},
                    redirect: `/users/profile`
                });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export async function createRegistration(req,res,next) {
    try {
        const hashedPassword = await  bcrypt.hash(req.body.password,10)
        const user = {
            ...req.body,
            password: hashedPassword,
            profile_image: req.file ?req.file.filename:null
        };
        
        const signup =  await createUser(user);
        req.session.userId = signup.id;
        req.session.isLoggedIn = true;
        req.session.isAdmin = signup.is_admin;
        res.json({  success: true, 
                    user: {id: signup.id, admin: signup.is_admin},
                    redirect: `/users/profile?id=${signup.id}&is_admin=${signup.is_admin}`
                });

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export async function updateAccount(req, res, next) {
    try {
        const id = Number(req.session.userId);
        console.log(id);
        if (!Number.isFinite(id)) {
         return res.status(400).json({ success: false, message: 'Invalid item id' });
      }
      const existingUser = await GetUserById(id);
      if(!existingUser){
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      let password = existingUser.password;
      if (req.body.password) {
          password = await bcrypt.hash(req.body.password, 10);
      }
      const user = {
        ...req.body,
        password,
        id,
        profile_image: req.file?.filename || existingUser.profile_image
      };
      const updatedUser = await updateUser(user);
      res.redirect(`/users/profile?id=${id}`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error updating account' });
        next(error);
    }
}
export async function deleteAccount(req,res,next) {
    try {
        
    } catch (error) {
        console.log(error)
    }
}