import { Auth, User, Class, Announcement } from "../models";
import moment from "moment";
import jwt from "jsonwebtoken";

export class AnnouncementService {
    
    async createAnnouncement(token: any, classId: String, title: String, description: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let checkAssociationInClass: any = await Class.find({class_creator: user._id},{_id: classId});
                
                if(checkAssociationInClass!=null){
                    let jagrik_class_announcement = await Announcement.create({
                        announcement_class: classId,
                        title: title,
                        description: description
                      });
                      return;
                }else{
                    throw new Error("401 - Access denied");  
                }
            }else{
                throw new Error("401 - Access denied");  
            }
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

      async getAnnouncements(token: any, classId: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_announcements: any = await Announcement.find({announcement_class: classId});
                      return class_announcements;
            }else{
                throw new Error("401 - Access denied");  
            }
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

      async editAnnouncement(token: any, announcementId: String, title: String, description: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_announcement_edit = await Announcement.findByIdAndUpdate(
                    { _id: announcementId },
                    { $set: {title: title, description: description} },
                    { new: true }
                )
                return;
            }else{
                throw new Error("401 - Access denied");  
            }
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

      async deleteAnnouncement(token: any, announcementId: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_announcement_edit = await Announcement.findByIdAndDelete({_id: announcementId});
                return;
            }else{
                throw new Error("401 - Access denied");  
            }
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

}
