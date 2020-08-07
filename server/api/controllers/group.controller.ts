import { Request, Response, NextFunction } from "express"
import { GroupService } from "../services"
import fs = require("fs")

// User Service Instance
const groupService = new GroupService()

export class GroupController {

    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {

            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let students = req.body.students;
          let groupName = req.body.name;
          let classId = req.body.classId;

          //call createGroup to groupService service function
          await groupService.createGroup(authorization, students, groupName, classId)
            .then((response) => {
              return res.status(200).json({
                message: 'Group created successfully',
              });
            });
        } catch (err) {
          return res.status(500).json({
            message: "Internal Server Error!",
            error: new Error(err || " Internal Server Error"),
          });
        }
      }

      async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let classId = req.query.classId;

          //call getGroups to groupService service function
          await groupService.getGroups(authorization, classId)
            .then((response) => {
              return res.status(200).json({
                message: "User Groups fetched successfully",
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

      async editGroup(req: Request, res: Response, next: NextFunction) {
        try {
            //fetch authorization from header of request
          let authorization = req.headers.authorization;
          let students = req.body.students;
          let groupName = req.body.name;
          let groupId = req.body.groupId

          //call editGroup to groupService service function
          await groupService
            .editGroup(authorization,students,groupName,groupId)
            .then((response) => {
              return res.status(200).json({
                message: 'Group Edited successfully',
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

