import { Router } from "express";
import { Assign } from "../Controllers/Task.controllers.js";
import { checkadmin } from "../Middleware/allMiddlewares.js";

const router = Router();

router.post("/assign", checkadmin ,Assign);

export default router;