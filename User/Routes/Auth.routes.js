import { Router } from "express";
import { Create , Delete } from "../Controllers/Auth.controllers.js";
import { checkadmin } from "../Middlewares/Allmiddlewares.js";


const router = Router();

router.post('/create' , checkadmin , Create);
router.post('/delete' , checkadmin ,  Delete);

export default router