import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from './src/routes/index.js';



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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', Router)


// start the server
app.listen(PORT, async() =>{
    console.log(`server running on HTTP://localhost:${PORT}`);
});