import { Router } from "express";
import { Create , Delete } from "../Controllers/Auth.controllers.js";
import { checkadmin } from "../AllMiddlewares.js";

const router = Router();

router.post('/create' , checkadmin , Create);
router.get('/delete' , checkadmin ,  Delete);

export default router