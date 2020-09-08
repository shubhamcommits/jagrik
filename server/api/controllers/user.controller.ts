import { Request, Response, NextFunction } from "express"
import { UserService } from "../services"
import fs = require("fs")

// User Service Instance
const userService = new UserService()

export class UserController {

    /**
     * This function is responsible for fetching the user data
     * @param req 
     * @param res 
     * @param next 
     */
    async get(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {
                headers: { authorization }
            } = req


            // Call the get user service function
            await userService.get(authorization)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User profile has been fetched!",
                        user: response.user,
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    /**
     * This function is responsible for changing the user profile data
     * @param req 
     * @param res 
     * @param next 
     */
    async editProfile(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {
                headers: { authorization },
                body: {
                    user
                },
            } = req


            // Call the edit user service function
            user = await userService.editProfile(authorization, user)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User profile has been updated!",
                        user: response,
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    /**
     * This function is responsible for changing the user profile picture
     * @param { headers: { authorization }, file }req 
     * @param res 
     * @param next 
     */
    async profilePictureUpdate(req: Request, res: Response, next: NextFunction) {
        try {

            // Image Data from the request
            let img_data:any = fs.readFileSync(req['file'].path)

           let img:String = new Buffer(img_data, 'binary').toString('base64');

            // Fetch Authorization header
            let {
                headers: { authorization },
            } = req

            // Call the profilePictureUpdate function from the service
            await userService
              .profilePictureUpdate(img, authorization)

              // Proceed with the status 200 response
              .then((response) => {
                return res.status(200).json({
                  message: 'User has been updated profile successfully!',
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
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    /**
     * This function is responsible for fetching the team in which a user is there  
     * @param req 
     * @param res 
     * @param next 
     */
    async getTeam(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {
                headers: { authorization }
            } = req


            // fetch user team 
            await userService.getUserTeam(authorization)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User\'s team has been fetched successfully!",
                        // team: response.team
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }    

    /**
     * This function is responsible for assigning a random task to user
     * @param req 
     * @param res 
     * @param next 
     */
    async assignRandomCard(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {
                headers: { authorization },
                body: {
                    card_theme, week
                },
            } = req


            // Call assign random task to user service function
            await userService.assignRandomSelfCard(card_theme, week, authorization)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User has been assigned with a random card!",
                        user: response.user,
                        card: response.card
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    async taskSupportingDocUpload(req: Request, res: Response, next: NextFunction) {
        try {

            // Image Data from the request
            let img_data:any = fs.readFileSync(req['file'].path)

           let img:String = Buffer.from(img_data, 'binary').toString('base64');

            // Fetch Authorization header
            let authorization = req.headers.authorization;
            let taskId = req.body.taskId;
            let description = req.body.description;
            let experience_description = req.body.experience_description
            let teamId = req.body.teamId

            // Call the profilePictureUpdate function from the service
            await userService
                .taskSupportingDocUpload(img, authorization, taskId, experience_description, teamId, description)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User has successfully uploaded supporting document for the task!",
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    async assignWildCard(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {headers: { authorization }} = req


            // Call assign random task to user service function
            await userService.assignWildCard(authorization)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User has been assigned with a wild card!",
                        user: response.user,
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }

    async uploadWildCardDoc(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let img_data: any = fs.readFileSync(req['file'].path)

            let img: String = Buffer.from(img_data, 'binary').toString('base64');

            // Fetch Authorization header
            let authorization = req.headers.authorization;
            let taskId = req.body.taskId;
            let description = req.body.description;
            let title = req.body.title;
            let experience_description = req.body.experience_description


            // Call assign random task to user service function
            await userService.wildTaskSupportingDocUpload(img, authorization, taskId, experience_description, description, title)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: response.message,
                        user: response.user,
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }
}