import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser";

const app = express();



// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser());


// view engine
app.set("view engine", "ejs");


// database connection
const dbUri = 'mongodb://localhost:27017/nodeAuth'

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.get('/', (req, res) => res.render("home"));

app.get("/smoothies", (req, res) => res.render('smoothies'));


// cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true')

//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, {
//         maxAge: 1000 * 60 * 60 * 24,
//         secure: true,
//         httpOnly: true
//     })

//     res.send('you got the cookies!');
// })

// app.get('/read-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true')

//     // install the cookie parsers package
//     const cookies = req.cookies;

//     console.log(cookies)

//     res.json(cookies);
// })

app.use(authRoutes)