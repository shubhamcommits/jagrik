import { Auth, User, Class, BonusTask} from "../models";
import moment from "moment";
import jwt from "jsonwebtoken";

export class BonusTaskService {
    
    async createBonusTask(token: any, classId: String, title: String, description: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let checkAssociationInClass: any = await Class.find({class_creator: user._id},{_id: classId});
                
                if(checkAssociationInClass!=null){
                    let jagrik_class_bonus_task = await BonusTask.create({
                        task_class: classId,
                        title: title,
                        description: description,
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

      async getBonusTasks(token: any, classId: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_bonus_tasks: any = await BonusTask.find({task_class: classId});
                let result=[];
                for(let i in class_bonus_tasks){
                    let bonus_task_creator:any = User.findById({_id: class_bonus_tasks[i].created_by})
                    let add ={
                    announcement_classId: class_bonus_tasks[i].announcement_class,
                    title: class_bonus_tasks[i].title,
                    description: class_bonus_tasks[i].description,
                    created_on: class_bonus_tasks[i].  created_date,
                    created_by_full_name: bonus_task_creator.full_name,
                    created_by_email: bonus_task_creator.email,
                    created_by_profile_pic: bonus_task_creator.profile_pic,
                }
                result.push(add);
                }
                return result;
            }else{
                throw new Error("401 - Access denied");  
            }
    
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
      }

      async editBonusTask(token: any, bonusTaskId: String, title: String, description: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_bonus_task_edit = await BonusTask.findByIdAndUpdate(
                    { _id: bonusTaskId },
                    { $set: {title: title, description: description,created_by:user._id} },
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

      async deleteBonusTask(token: any, bonusTaskId: String) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
           
            if(user.role === "facilitator" || user.role === "super-admin"){
                // check if user is associated with the classId
                let class_bonus_task_edit = await BonusTask.findByIdAndDelete({_id: bonusTaskId});
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
