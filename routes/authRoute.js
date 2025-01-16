import { Router } from "express";


import  { 
    getHttpLogin, 
    getHttpSignUp, 
    postHttpLogin, 
    postHttpSignUp } from "../controllers/authControllers.js";


const router = Router();


router.get("/signup", getHttpSignUp)
router.get("/login", getHttpLogin)
router.post("/signup", postHttpSignUp)
router.post("/login", postHttpLogin)

export default router