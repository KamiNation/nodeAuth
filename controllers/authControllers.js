import User from "../models/User.js"
import jwt from "jsonwebtoken"


// handle errors 
const handleErrors = (err) => {
    console.log("err.message, err.code =>", err.message, err.code);
    let errors = { email: '', password: '' }

    // when we get an email that already exists, we get an error code
    // 11000. Now, we use the below code to inform the user that the email
    // already exists 
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    };

    return errors
}


 const maxAge = 3 * 24 * 60 * 60

    const createToken = (id) => {
        // take the user id 
        return jwt.sign({
            id
        },
            'secret',
            {
                expiresIn: maxAge
            }
        );
    }



export const getHttpSignUp = (req, res) => {
    res.render("signup")
}

export const getHttpLogin = (req, res) => {
    res.render("login")
}


export const postHttpSignUp = async (req, res) => {
    const { email, password } = req.body;

    // creating new user
    // install npm i jsonwebtoken
    // we create the jwt after creating our new user successfully,
    // so we can send it back to the browser in a cookie, to login the user
    // and any subsequent request we get to the server it is been sent back
    // with the cookie and verify it

    // 
    try {

        const newUser = await User.create({
            email,
            password
        });

        // created a token using the id from the newUser with
        // the createToken function
        const token = createToken(newUser._id);

        //  Then we place this token in a cookie and send it as part of the response
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(201).json({ newUser: newUser._id })


    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).send({ errors })
    }
}

export const postHttpLogin = async (req, res) => {
    const { email, password } = req.body;

    res.send("user login")
}