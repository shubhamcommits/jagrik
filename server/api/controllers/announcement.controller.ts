import { Request, Response, NextFunction } from "express"
import { AnnouncementService } from "../services"
import fs = require("fs")

// User Service Instance
const announcementService = new AnnouncementService()

export class AnnouncementController {

    async createAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let classId = req.body.classId;
          let title = req.body.title;
          let description = req.body.description;

          //call createAnnouncement to announcement service function
          await announcementService.createAnnouncement(authorization, classId,title, description)
            .then((response) => {
              return res.status(200).json({
                message: "Announcement has successfully been created",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async getAnnouncements(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let classId = req.body.classId;

          //call getAnnouncements to announcement service function
          await announcementService.getAnnouncements(authorization, classId)
            .then((response) => {
              return res.status(200).json({
                message: "Announcement fetched successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async editAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let announcementId = req.body.announcementId;
          let title = req.body.title;
          let description = req.body.description;

          //call editAnnouncement to announcement service function
          await announcementService.editAnnouncement(authorization, announcementId, title, description)
            .then((response) => {
              return res.status(200).json({
                message: "Announcement Edited successfully",
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async deleteAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let announcementId = req.body.announcementId;

          //call editAnnouncement to announcement service function
          await announcementService.deleteAnnouncement(authorization, announcementId)
            .then((response) => {
              return res.status(200).json({
                message: "Announcement Deleted successfully",
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