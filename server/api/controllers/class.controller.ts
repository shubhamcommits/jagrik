import { Request, Response, NextFunction } from "express";
import { ClassService } from "../services";

// Create Authentication Service instance
const classService = new ClassService();

export class ClassController {
  /**
   * This function is responsible for creation a class
   * @param { headers: { authorization } }req
   * @param res
   * @param next
   */
  async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the headers from the request
      let {
        headers: { authorization },
        body: {
          class: { name },
        },
      } = req;

      console.log("authorization: ", authorization);

      // Call the create class service function
      await classService.createClass(authorization, name).then((response) => {
        return res.status(200).json({
          message: "User has successfully created a class!",
          class: response.class,
        });
      });
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  async inviteToClass(req: Request, res: Response, next: NextFunction) {
    try {
      //fetch authorization from header of request
      let {
        headers: { authorization },
        body: { studentEmails, classId },
      } = req;
      //call invite to class service function
      await classService
        .inviteToClass(authorization, studentEmails, classId)
        .then((response) => {
          return res.status(200).json({
            message: "User has successfully invited to class!",
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  async joinClass(req: Request, res: Response, next: NextFunction) {
    try {
      // fetch authorization and class to be joined
      let {
        headers: { authorization },
        body: { classId, class_code },
      } = req;

      // Class code invite
      let isClassCodeInvite = false

      // If we find that classId is not present then it must be a class code invite to join
      if(!classId || classId == undefined){
        classId = await classService.findClassIdByCode(class_code);

        // Update the value
        isClassCodeInvite = true
      }

      //call join class service function
      await classService.joinClass(classId, authorization, isClassCodeInvite).then(() => {
        return res.status(200).json({
          message: "User has successfully joined class!",
          class: classId
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  /**
   * This function is responsible for fetching the class details
   * @param { query: { classId } }req
   * @param res
   * @param next
   */
  async getClassDetails(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the classId from the request
      let {
        query: { classId },
      } = req;

      // Call the get class details service function
      await classService
        .getClassDetails(classId.toString())
        .then((class_details) => {
          return res.status(200).json({
            message: "Class has been successfully found!",
            class: class_details,
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  /**
   * This function is responsible for removing a class
   * @param { body: { jagrik_class }, headers: { authorization } } req
   * @param res
   * @param next
   */
  async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the required contents from the request
      let {
        params: { classId },
        headers: { authorization },
      } = req;

      // Call the delete class service function
      await classService
        .deleteClass(authorization, classId)
        .then((class_details) => {
          return res.status(200).json({
            message: "Class has been successfully deleted!",
            class: class_details,
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  /**
   * This function is responisble for fetching the classes list for currently loggedIn user
   * @param { headers: { authorization } } req
   * @param res
   * @param next
   */
  async getUserClasses(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch the authorization header from the request
      let {
        headers: { authorization },
      } = req;

      // Call the service function to get all the classes
      await classService.getUserClasses(authorization).then((classes) => {
        return res.status(200).json({
          message: "Classes have been successfully found!",
          classes: classes,
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  async createTeam(req: Request, res: Response, next: NextFunction) {

    try {
      // Fetch the authorization header from the request

      let authorization = req.headers.authorization;
      let classId = req.body.classId;
      let user_team_detail = req.body.user_team_detail;

      // Call the service function to get all the classes
      await classService.createTeam(authorization,classId, user_team_detail).then(() => {
        return res.status(200).json({
          message: "Teams have been created successfully!"
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  async getTeams(req: Request, res: Response, next: NextFunction) {

    try {
      // Fetch the authorization header from the request

      let authorization = req.headers.authorization;
      // let authorization="abcd"
      let classId = req.body.classId;

      // Call the service function to get all the classes
      await classService.getTeams(authorization, classId).then((teams) => {
        return res.status(200).json({
          message: "Teams have been fetched successfully!",
          teams: teams
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

  async getTeamMembers(req: Request, res: Response, next: NextFunction) {

    try {
      // Fetch the authorization header from the request

      let authorization = req.headers.authorization;
      // let authorization="abcd"
      let teamId = req.body.teamId;
  
      // Call the service function to get all the classes
      await classService.getTeamMembers(authorization, teamId).then(() => {
        return res.status(200).json({
          message: "Teams have been fetched successfully!"
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err || " Internal Server Error"),
      });
    }
  }

}
