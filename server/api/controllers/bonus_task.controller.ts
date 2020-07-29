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
          let title = req.body.title;
          let description = req.body.description;

          //call createBonusTask to BonusTask service function
          await bonusTaskService.createBonusTask(authorization, classId,title, description)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task created successfully",
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
          let classId:any = req.body.classId;

          //call getBonusTasks to BonusTask service function
          await bonusTaskService.getBonusTasks(authorization, classId)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Tasks fetched successfully",
                announcements: response,
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
          let description = req.body.description;

          //call editBonusTask to BonusTask service function
          await bonusTaskService.editBonusTask(authorization, bonusTaskId, title, description)
            .then((response) => {
              return res.status(200).json({
                message: "Bonus Task Edited successfully",
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

          //call deleteBonusTask to BonusTask service function
          await bonusTaskService.assignUserBonusTask(authorization, studentId)
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
          // Image Data from the request
          let img_data:any = fs.readFileSync(req['file'].path)

          let img:String = Buffer.from(img_data, 'binary').toString('base64');

            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let bonusTaskId = req.body.bonusTaskId;

          //call deleteBonusTask to BonusTask service function
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
}