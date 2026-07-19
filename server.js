import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from './src/routes/index.js';
import session from 'express-session';



//starting dotenv
dotenv.config()

//server configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;


// setup Express server
const app = express()

// Render runs behind a reverse proxy. Trust it so secure cookies are set correctly.
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

//set the view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'src/views'));


//express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

//set express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === 'production',
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}))

app.use('/', Router)



// start the server
app.listen(PORT, async() =>{
    console.log(`server running on HTTP://localhost:${PORT}`);
});