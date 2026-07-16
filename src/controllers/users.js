import {getAllUsers,createUser,updateUser,deleteUser} from '../models/users.js';


export async function renderSignUp(req, res, next) {
    try {
        res.render('forms/registration', { title: 'Sign Up' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function createRegistration(req,res,next) {
    try {
        const signup =  await createUser(req.body);
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