import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js"

const app = express();



// middleware
app.use(express.static('public'));
app.use(express.json())


// view engine
app.set("view engine", "ejs");


// database connection
const dbUri = 'mongodb://localhost:27017/nodeAuth'

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true, })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.get('/', (req, res) => res.render("home"));

app.get("/smoothies", (req, res) => res.render('smoothies'));


app.use(authRoutes)