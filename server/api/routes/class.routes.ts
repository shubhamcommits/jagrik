import express from "express";
import { ClassController } from "../controllers";

// Auth Controller with all the functions
const classController = new ClassController();

// Routes List
const routes = express.Router();

/**
 * POST - Creates a new jagrik class
 * @var { headers: { authorization } }
 */
routes.post("/", classController.createClass);

/**
 * GET - Get class details based on classId(query paramater)
 * @var { query: { classId } }
 */
routes.get("/", classController.getClassDetails);

/**
 * DELETE - Delete a class
 * @var { params: { classId }, headers: { authorization } }
 */
routes.delete("/:classId", classController.deleteClass);

/**
 * GET - Get all classes a user is in
 * @var { headers: { authorization } }
 */
routes.post("/user", classController.getUserClasses);

/**
 * POST - Invites users to class
 * @var { headers: { authorization }, body: {studentEmails, classId} }
 */
routes.post("/invite-to-class", classController.inviteToClass);

/**
 * POST - Allow user to join class
 * @var { headers: { authorization }, body: {classId} }
 */
routes.post("/join-class", classController.joinClass);

routes.post("/create-teams", classController.createTeam);

routes.post("/get-teams", classController.getTeams);

routes.get("/get-team-members", classController.getTeamMembers);

routes.get("/get-completed-team-tasks", classController.getCompletedTeamTasks);

routes.get('/get-classes-without-facilitator', classController.getClassesWithoutFacilitator);

routes.post('/join-class-without-facilitator', classController.joinClassWithoutFacilitator);

routes.post('/student-create-class', classController.studentCreateClass);

routes.get("/get-team-member-task-status", classController.getTeamMemberStatus);


/**
 * POST - create a sessionId and save it in the class db
 * @var {headers: {authorization}, body: {classId}}
 */
routes.post("/create-session", classController.createSession);

/**
 * POST - allow a student to join the sessionId in the class db
 * @var {headers: {authorization}, body: {classId}}
 */
routes.post("/join-session", classController.joinSession);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as classRoutes };
