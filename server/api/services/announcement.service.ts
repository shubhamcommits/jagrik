import { Auth, User, Class, Announcement } from "../models";
import moment from "moment";
import jwt from "jsonwebtoken";

export class AnnouncementService {
    
    async createAnnouncement(token: any, classId: String, title: String, description: String, announcement_doc: String) {
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
                        description: description,
                        announcement_doc: announcement_doc,
                        created_by: user._id
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
           
            // check if user is associated with the classId
            let class_announcements: any = await Announcement.find({announcement_class: classId});
            let result=[];
            for(let i in class_announcements){
                await User.findOne({ _id: class_announcements[i].created_by }, function (err, docs) {
                    let add = {}
                    if (err || docs == null) {
                        console.log(err)
                        add = {
                            announcementId: class_announcements[i]._id,
                            announcement_classId: class_announcements[i].announcement_class,
                            title: class_announcements[i].title,
                            description: class_announcements[i].description,
                            announcement_doc: class_announcements[i].announcement_doc,
                            created_on: class_announcements[i].created_date
                        }
                    }
                    else {
                        
                        add = {
                            announcementId: class_announcements[i]._id,
                            announcement_classId: class_announcements[i].announcement_class,
                            title: class_announcements[i].title,
                            description: class_announcements[i].description,
                            announcement_doc: class_announcements[i].announcement_doc,
                            created_on: class_announcements[i].created_date,
                            created_by_full_name: docs['full_name'],
                            created_by_email: docs['email'],
                            created_by_profile_pic: docs['profile_pic'],
                        }
                    }
                   
                    result.push(add);
                }); 
               
                
            }
            return result;
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

      async editAnnouncement(token: any, announcementId: String, title: String, description: String, announcement_doc:String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_announcement_edit = await Announcement.findByIdAndUpdate(
                    { _id: announcementId },
                    { $set: {title: title, description: description, announcement_doc: announcement_doc, created_by:user._id} },
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
