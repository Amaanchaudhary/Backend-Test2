import { Router } from "express";
import { Assign , FetchAndSort, fetch, taskCompleted, update} from "../Controllers/Task.controllers.js";
import { checkadmin } from "../Middleware/allMiddlewares.js";

const router = Router();

router.post("/assign", checkadmin ,Assign);
router.get("/update", checkadmin , update);
router.get("/fetch", fetch);
router.get("/task-completed", taskCompleted);
router.get("/fetch-and-sort", FetchAndSort);

export default router;