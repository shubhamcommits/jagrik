import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import * as details from "client-device-ip-details";
import fs = require("fs");
import { MulterRequest } from 'multer';
// Create Authentication Service instance
const authService = new AuthService();

export class AuthController {
  /**
   * This function is responsible for signing in the user
   * @param { body: { user } } req
   * @param res
   * @param next
   */
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the data variables from the request
      let {
        body: { user },
      } = req;

      // Adding user device details
      user.device = details.getDetails(req);

      // Call the signIn function from the service
      user = await authService
        .signIn(user.email, user.password, user.device)

        // Proceed with the status 200 response
        .then((response) => {
          return res.status(200).json({
            message: "User has been signed in successfully!",
            user: response.user,
            token: response.token,
          });
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
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || "Internal Server Error!"),
      });
    }
  }

  /**
   * This function is responsible for signing up the user
   * @param { body: { user } } req
   * @param res
   * @param next
   */
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the data variables from the request
      let {
        body: { user },
      } = req;

      // Adding user device details
      user.device = details.getDetails(req);

      // Adding full_name
      user.full_name = (user.first_name + "" + user.last_name).toLowerCase();

      // Call the signUp function from the service
      user = await authService
        .signUp(user)

        // Proceed with the status 200 response
        .then((response) => {
          return res.status(200).json({
            message: "User has been signed up successfully!",
            token: response.token,
            user: response.user,
          });
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
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || "Internal Server Error!"),
      });
    }
  }

  async profilePictureUpdate(req: MulterRequest, res: Response, next: NextFunction) {
    //  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    
    try {
      let img_data = fs.readFileSync(req.file.path);

      let {
        headers: { authorization },
      } = req;

      // Call the profilePictureUpdate function from the service
      await authService
        .profilePictureUpdate(img_data, authorization)

        // Proceed with the status 200 response
        .then((response) => {
          return res.status(200).json({
            message: "User has been updated profile successfully!",
          });
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
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || "Internal Server Error!"),
      });
    }
  }

  /**
   * This function is responsible for signing out the currently loggedIn user
   * @param { body:{ userId } } req
   * @param res
   * @param next
   */
  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the userId from the server's cache
      //   let userId = req['userId']

      // temporarily assume it's in the request
      let userId = req.body.userId;

      // Call the sign out service function
      let user = await authService
        .signOut(userId)

        // Process with the status 200 response
        .then(() => {
          return res.status(200).json({
            message: "User has been signed out successfully!",
          });
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
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || "Internal Server Error!"),
      });
    }
  }
}
