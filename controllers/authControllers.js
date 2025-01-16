import User from "../models/User.js"


export const getHttpSignUp = (req, res) => {
    res.render("signup working")
}

export const getHttpLogin = (req, res) => {
    res.render("login working")
}


export const postHttpSignUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Email or Password empty")
    }

    // creating new user
    try {

        const newUser = await User.create({
            email,
            password
        });

        res.status(201).json(newUser)


    } catch (error) {
        console.error(error);
        res.status(400).send("error, user not created")
    }

    res.send("new signup")
}

export const postHttpLogin = async (req, res) => {
    const { email, password } = req.body;

    res.send("user login")
}