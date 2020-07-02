import { Request, Response, NextFunction } from "express"
import { UserService } from "../services"
import fs = require("fs")

// User Service Instance
const userService = new UserService()

export class UserController {

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
            let img_data = fs.readFileSync(req['file'].path)

            // Fetch Authorization header
            let {
                headers: { authorization },
            } = req

            // Call the profilePictureUpdate function from the service
            await userService
                .profilePictureUpdate(img_data, authorization)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "User has been updated profile successfully!",
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