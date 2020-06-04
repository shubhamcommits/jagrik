import { Request, Response, NextFunction } from "express";
import { ClassService } from "../services";

// Create Authentication Service instance
const classService = new ClassService();

export class ClassController {
  async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        headers: { authorization },
      } = req;

      await classService.createClass(authorization).then(() => {
        return res.status(200).json({
          message: "User has successfully created a class!",
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err),
      });
    }
  }

  async getClassDetails(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        query: { jagrik_class_id }, // different name since class is a reserved term
      } = req;

      await classService
        .getClassDetails(jagrik_class_id.toString())
        .then((class_details) => {
          return res.status(200).json({
            message: "Class has been successfully found!",
            class_details,
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err),
      });
    }
  }

  async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        body: { jagrik_class }, // different name since class is a reserved term
        headers: { authorization },
      } = req;

      console.log("authorization: ", authorization);
      console.log("jagrik_class: ", jagrik_class);
      await classService
        .deleteClass(authorization, jagrik_class.id)
        .then((class_details) => {
          return res.status(200).json({
            message: "Class has been successfully deleted!",
            class_details,
          });
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err),
      });
    }
  }
  async getUserClasses(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        headers: { authorization }, // different name since class is a reserved term
      } = req;
      console.log("authorization: ", authorization);
      await classService.getUserClasses(authorization).then((classes) => {
        return res.status(200).json({
          message: "Classes have been successfully found!",
          classes,
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: new Error(err),
      });
    }
  }
}
