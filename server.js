import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './src/routes/index.js';
import {renderItems} from './src/controllers/item.js'


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

app.get('/', async (req, res) =>{
    res.render('index')
})
app.use('/users', userRouter)


// start the server
app.listen(PORT, async() =>{
    console.log(`server running on HTTP://localhost:${PORT}`);
});