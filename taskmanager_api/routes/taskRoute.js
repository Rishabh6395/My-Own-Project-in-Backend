import express from "express";

const router = express.Router();

import {
    createTask,
    getAllTasks,
    singleTask,
    updateTask,
    deleteTask,
} from "../controllers/taskControllers.js"; // Added .js extension for ES modules

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(singleTask).put(updateTask).delete(deleteTask);

export default router;
