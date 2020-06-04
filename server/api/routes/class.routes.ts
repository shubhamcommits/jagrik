import express from "express";
import { ClassController } from "../controllers";

// Auth Controller with all the functions
const classController = new ClassController();

// Routes List
const routes = express.Router();

// POST - Create a jagrik class
routes.post("/create-class", classController.createClass);

// GET - Get class details based on id
routes.get("/get-class-details", classController.getClassDetails);

// POST - Delete a class based on id
routes.post("/delete-class", classController.deleteClass);

// GET - Get all classes a user is in
routes.get("/get-user-classes", classController.getUserClasses);
/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as classRoutes };
