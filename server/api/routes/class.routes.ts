import express from 'express'
import { ClassController } from '../controllers'

// Auth Controller with all the functions
const classController = new ClassController()

// Routes List
const routes = express.Router()

/**
 * POST - Creates a new jagrik class
 * @var { headers: { authorization } }
 */
routes.post('/', classController.createClass)

/**
 * GET - Get class details based on classId(query paramater)
 * @var { query: { classId } }
 */
routes.get('/', classController.getClassDetails)

/**
 * DELETE - Delete a class
 * @var { params: { classId }, headers: { authorization } }
 */
routes.delete('/:classId', classController.deleteClass)

/**
 * GET - Get all classes a user is in
 * @var { headers: { authorization } }
 */
routes.get('/user', classController.getUserClasses)

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as classRoutes }
