import express from "express";
import { TaskController } from "../controllers";

// Task Controller with all the functions
const taskController = new TaskController();

// Routes List
const routes = express.Router();

routes.get('/', taskController.fetchTasks)

routes.get('/all-team-task', taskController.fetchTasksByTeamId);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as taskRoutes }