import {getAllUsers,GetUser,createUser,updateUser,deleteUser} from '../models/users.js';
import bcrypt from "bcrypt";

export async function renderSignUp(req, res, next) {
    try {
        res.render('forms/registration', { title: 'Sign Up' });
    } catch (error) {
        console.error(error);
        next(error);
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
        res.json({  success: true, 
                    user: {id: user.id, admin: user.is_admin},
                    redirect: `/users/profile?id=${user.id}&is_admin=${user.is_admin}`
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
        console.log(signup);
        res.send(signup)

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export async function updateAccount(req, res, next) {
    try {
        
    } catch (error) {
        console.log(error)
    }
}
export async function deleteAccount(req,res,next) {
    try {
        
    } catch (error) {
        console.log(error)
    }
}