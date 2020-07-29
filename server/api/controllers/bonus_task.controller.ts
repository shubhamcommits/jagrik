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
          let classId:any = req.query.classId;

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
          let bonusTaskId:any = req.query.bonusTaskId;

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
}