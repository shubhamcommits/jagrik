import { Request, Response, NextFunction } from "express"
import { TeamService } from "../services"

// User Service Instance
const teamService = new TeamService()

export class TeamController {
         /**
          * This function is responsible for assigning a random task to user
          * @param req
          * @param res
          * @param next
          */
         async assignRandomCard(
           req: Request,
           res: Response,
           next: NextFunction
         ) {
           try {
             // Fetch the headers and user data from the request
             let {
               body: { card_theme, week, teamId, diceNumber},
             } = req;

             // Call assign random task to user service function
             await teamService
               .assignRandomSelfCard(card_theme, week, teamId, diceNumber)

               // Proceed with the status 200 response
               .then((response) => {
                 return res.status(200).json({
                   message: 'Team has been assigned with a random card!',
                   team: response.team,
                   card: response.card,
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

         async submitTaskPoints(
           req: Request,
           res: Response,
           next: NextFunction
         ) {
           try {
             // Fetch the authorization header from the request

             let authorization = req.headers.authorization;
             // let authorization="abcd"
             let teamId = req.body.teamId;
             let taskId = req.body.taskId;
             let teamPoints = req.body.teamPoints;
             let comment = req.body.comment;
             let bonus_point = req.body.bonus_point;

             // Call the service function to get all the classes
             await teamService
               .submitTaskPoints(
                 authorization,
                 teamId,
                 teamPoints,
                 comment,
                 bonus_point,
                 taskId
               )
               .then(() => {
                 return res.status(200).json({
                   message: 'Points successfully allocated to the team !',
                 });
               });
           } catch (err) {
               
             return res.status(500).json({
               message: 'Internal Server Error!',
               error: new Error(err || ' Internal Server Error'),
             });
           }
         }
       /**
        * This function is responsible for rejecting team task
        * @param req
        * @param res
        * @param next
        */
        async rejectTeamTask(
          req: Request,
          res: Response,
          next: NextFunction
        ) {
          try {
            // Fetch the authorization header from the request

            let authorization = req.headers.authorization;
            // let authorization="abcd"
            let teamId = req.body.teamId;
            let taskId = req.body.taskId;
            let teamPoints = req.body.teamPoints;
            let comments = req.body.comment;

            // Call the service function to get all the classes
            await teamService
              .rejectTeamTask(authorization, teamId, teamPoints, comments, taskId)
              .then(() => {
                return res.status(200).json({
                  message: 'Team task rejected',
                });
              });
          } catch (err) {

            return res.status(500).json({
              message: 'Internal Server Error!',
              error: new Error(err || ' Internal Server Error'),
            });
          }
        }

         /**
          * This function is responsible for checking team task status
          * @param req
          * @param res
          * @param next
          */
         async teamTaskStatus(req: Request, res: Response, next: NextFunction) {
           try {
             // Fetch the authorization header from the request

             let authorization = req.headers.authorization;
             // let authorization="abcd"
             let teamId: any = req.query.teamId;
             let type: any = req.query.type;

             // Call the service function to get all the classes
             await teamService
               .teamTaskStatus(authorization, teamId, type)
               .then((response) => {
                 return res.status(200).json({
                   message: 'Points successfully allocated to the team !',
                   response: response,
                 });
               });
           } catch (err) {
               
             return res.status(500).json({
               message: 'Internal Server Error!',
               error: new Error(err || ' Internal Server Error'),
             });
           }
         }
  
          /**
          * This function is responsible for checking team dice status
          * @param req
          * @param res
          * @param next
          */
          async teamDiceStatus(req: Request, res: Response, next: NextFunction) {
            try {
              // Fetch the authorization header from the request

              let authorization = req.headers.authorization;
              // let authorization="abcd"
              let teamId: any = req.query.teamId;

              // Call the service function to get all the classes
              await teamService
                .teamDiceStatus(authorization, teamId)
                .then((response) => {
                  return res.status(200).json({
                    message: 'data fetched successfully!',
                    response: response,
                  });
                });
            } catch (err) {
              return res.status(500).json({
                message: 'Internal Server Error!',
                error: new Error(err || ' Internal Server Error'),
              });
            }
          }
}
