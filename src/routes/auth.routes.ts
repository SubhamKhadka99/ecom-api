//! routing for auth
import express from 'express';
import {register,login} from '../controllers/auth.controller'

const router = express.Router()

//* register 
router.post("/",register);

//* Login
router.get("/",login)