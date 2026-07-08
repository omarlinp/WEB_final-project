import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//starting dotenv
dotenv.config()

//server configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;


// setup Express server
const app = express()

//set the view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'src/views'));


//express configuration

//routes
app.get('/', (req, res) =>{
    res.render('index')
})
app.get('/login',(req,res) => {
    res.render('forms/login')
})
app.get('/signup',(req,res) => {
    res.render('forms/registration')
})
app.get('/about',(req,res) => {
    res.render('about')
})
app.get('/admin',(req,res) => {
    res.render('admin/admin')
})
app.get('/profile',(req,res) => {
    res.render('profile')
})




// start the server
app.listen(PORT, async() =>{
    console.log(`server running on HTTP://localhost:${PORT}`);
});