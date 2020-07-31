import { Request, Response, NextFunction } from "express"
import { BonusTaskService } from "../services"
import fs = require("fs")

// User Service Instance
const bonusTaskService = new BonusTaskService()

export class BonusTaskController {

    async createBonusTask(req: Request, res: Response, next: NextFunction) {
        try {

            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let classId = req.body.classId;
          let students = req.body.students;
          let title = req.body.title;
          let description = req.body.description;

          //call createBonusTask to BonusTask service function
          await bonusTaskService
            .createBonusTask(
              authorization,
              classId,
              title,
              description,
              students
            )
            .then((response) => {
              return res.status(200).json({
                message: 'Bonus Task created successfully',
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async getBonusTasks(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let classId = req.body.classId;

          //call getBonusTasks to BonusTask service function
          await bonusTaskService.getBonusTasks(authorization, classId)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Tasks fetched successfully",
                result: response.result,
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async editBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let bonusTaskId = req.body.bonusTaskId;
          let title = req.body.title;
          let students = req.body.students;
          let description = req.body.description;

          //call editBonusTask to BonusTask service function
          await bonusTaskService
            .editBonusTask(
              authorization,
              bonusTaskId,
              title,
              description,
              students
            )
            .then((response) => {
              return res.status(200).json({
                message: 'Bonus Task Edited successfully',
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async deleteBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let bonusTaskId:any = req.body.bonusTaskId;

          //call deleteBonusTask to BonusTask service function
          await bonusTaskService.deleteBonusTask(authorization, bonusTaskId)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task Deleted successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async assignUserBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let studentId:any = req.body.studentId;
          let taskIdAgainstBonusTask:any = req.body.taskId;

          //call assignUserBonusTask to BonusTask service function
          await bonusTaskService.assignUserBonusTask(authorization, studentId, taskIdAgainstBonusTask)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task Assigned successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async StudentSubmitBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
          console.log("reached");
          // Image Data from the request
          let img_data:any = fs.readFileSync(req['file'].path)

          let img:String = Buffer.from(img_data, 'binary').toString('base64');

            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let bonusTaskId = req.body.bonusTaskId;

          //call StudentSubmitBonusTask to BonusTask service function
          await bonusTaskService.StudentSubmitBonusTask(authorization, bonusTaskId, img)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task Submitted successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async cancelAssignedBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let studentId = req.body.studentId;

          //call cancelAssignedBonusTask to BonusTask service function
          await bonusTaskService.cancelAssignedBonusTask(authorization, studentId)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task Cancelled successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async getSelfSubmittedBonusTask(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;

          //call getSelfSubmittedBonusTask to BonusTask service function
          await bonusTaskService.getSelfSubmittedBonusTask(authorization)
            .then((response) => {
              return res.status(200).json({
                message: "Submitted Bonus Tasks Fetched successfully",
                submittedTasks: response.submittedTasks,
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
