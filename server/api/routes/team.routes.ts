import express from "express";
import { TeamController } from "../controllers";

// Team Controller with all the functions
const teamController = new TeamController();

// Routes List
const routes = express.Router();

routes.post('/assign-card', teamController.assignRandomCard);

routes.post('/submit-task-points', teamController.submitTaskPoints);

routes.post('/reject-task', teamController.rejectTeamTask);

routes.get('/team-task-status', teamController.teamTaskStatus);

routes.get('/team-dice-status', teamController.teamDiceStatus);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as teamRoutes }