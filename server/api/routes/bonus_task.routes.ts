import express from 'express'
import { BonusTaskController } from "../controllers";

// BonusTask Controller with all the functions
const bonusTaskController = new BonusTaskController();

// Routes List
const routes = express.Router();

routes.post('/create-bonus-task',bonusTaskController.createBonusTask);

routes.get('/get-class-bonus-tasks', bonusTaskController.getBonusTasks);

routes.put('/edit-bonus-task', bonusTaskController.editBonusTask);

routes.delete('/delete-bonus-task', bonusTaskController.deleteBonusTask);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as bonusTaskRoutes }