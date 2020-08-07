import express from "express";
import { GroupController } from "../controllers";

// Task Controller with all the functions
const groupController = new GroupController();

// Routes List
const routes = express.Router();

routes.post('/create-new-group', groupController.createGroup);

routes.get('/get-class-user-groups', groupController.getGroups);

routes.put('/edit-group', groupController.editGroup);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as taskRoutes }