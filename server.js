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

app.get('/', (req, res) =>{
    res.send('hello word');
});
//express configuration


// start the server
app.listen(PORT, async() =>{
    console.log(`server running on HTTP://localhost:${PORT}`);
});