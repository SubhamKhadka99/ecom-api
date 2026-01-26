//! routing for user
import express from 'express';
import { getAll, getById} from '../controllers/user.controller'
//! creating express router instance 
const router = express.Router()
//* get all users

router.get("/",getAll);

//* get by id

router.get("/:id", getById);

export default router;