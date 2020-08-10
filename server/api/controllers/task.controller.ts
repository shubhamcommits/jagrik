import { Request, Response, NextFunction } from "express"
import { TaskService } from "../services"
import { cards } from "../utils/data"

// Task Service Instance
const taskService = new TaskService()

export class TaskController {
         /**
          * This function is responsible for fetching all tasks related to a cardId
          * @param req
          * @param res
          * @param next
          */
         async fetchTasks(req: Request, res: Response, next: NextFunction) {
           try {
             // Fetch the headers and user data from the request
             let {
               query: { cardId },
             } = req;

             // Call fetch all tasks for a paricular card
             await taskService
               .getTasks(cardId)

               // Proceed with the status 200 response
               .then((response) => {
                 return res.status(200).json({
                   message: 'All tasks for a particular card has been fetched',
                   card: response.card,
                   tasks: response.tasks,
                 });
               })

               // Catch the errors from the service function
               .catch((err) => {
                 return res.status(400).json({
                   message:
                     'Bad Request, kindly trace the error stack for more details!',
                   error: new Error(
                     err ||
                       'Bad Request, kindly trace the error stack for more details!'
                   ),
                 });
               });
           } catch (err) {
             return res.status(500).json({
               message: 'Internal Server Error!',
               error: new Error(err || 'Internal Server Error!'),
             });
           }
         }

         /**
          * This function is responsible for fetching all tasks related to a teamId
          * @param req
          * @param res
          * @param next
          */
         async fetchTasksByTeamId(req: Request, res: Response, next: NextFunction) {
           try {
             // Fetch the headers and user data from the request
             let {
               query: { teamId },
             } = req;

             // Call fetch all tasks for a paricular card
             await taskService
               .getTasksByTeamId(teamId)

               // Proceed with the status 200 response
                 .then((response) => {
                 return res.status(200).json({
                   message: 'All tasks for a particular card has been fetched',
                   tasks: response,
                 });
               })

               // Catch the errors from the service function
               .catch((err) => {
                 return res.status(400).json({
                   message:
                     'Bad Request, kindly trace the error stack for more details!',
                   error: new Error(
                     err ||
                       'Bad Request, kindly trace the error stack for more details!'
                   ),
                 });
               });
           } catch (err) {
             return res.status(500).json({
               message: 'Internal Server Error!',
               error: new Error(err || 'Internal Server Error!'),
             });
           }
         }
       }