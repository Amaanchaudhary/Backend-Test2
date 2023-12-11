import { Router } from "express";
import TaskRouter from './Task.routes.js'

const router = Router();

router.use("/task" , TaskRouter)

export default router