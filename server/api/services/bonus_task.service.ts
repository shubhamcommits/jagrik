import { Auth, User, Class, BonusTask} from "../models";
import moment from "moment";
import jwt from "jsonwebtoken";

export class BonusTaskService {
         async createBonusTask(
           token: any,
           classId: String,
           title: String,
           description: String,
           students: any
         ) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if user is associated with the classId
               let checkAssociationInClass: any = await Class.find(
                 { class_creator: user._id },
                 { _id: classId }
               );

               if (checkAssociationInClass != null) {
                 let jagrik_class_bonus_task = await BonusTask.create({
                   task_class: classId,
                   title: title,
                   students: students,
                   description: description,
                   created_by: user._id,
                 });

                 return;
               } else {
                 throw new Error('401 - Access denied');
               }
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async getBonusTasks(token: any, classId: String) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role !== 'facilitator' && !user.show_bonus_task) {
               return null;
             }

             // check if user is associated with the classId
             let class_bonus_tasks: any = await BonusTask.find({
               task_class: classId,
             });

             let result = [];
             for (let i in class_bonus_tasks) {
               let bonus_task_creator: any = User.findById({
                 _id: class_bonus_tasks[i].created_by,
               });
               let add = {
                 bonus_task_id: class_bonus_tasks[i]._id,
                 classId: class_bonus_tasks[i].task_class,
                 title: class_bonus_tasks[i].title,
                 description: class_bonus_tasks[i].description,
                 created_on: class_bonus_tasks[i].created_date,
                 created_by_full_name: bonus_task_creator.full_name,
                 created_by_email: bonus_task_creator.email,
                 created_by_profile_pic: bonus_task_creator.profile_pic,
               };
               result.push(add);
             }
             // console.log(result);
             return { result: result };
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async editBonusTask(
           token: any,
           bonusTaskId: String,
           title: String,
           description: String,
           students: any
         ) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if user is associated with the classId
               let class_bonus_task_edit = await BonusTask.findByIdAndUpdate(
                 { _id: bonusTaskId },
                 {
                   $set: {
                     title: title,
                     description: description,
                     created_by: user._id,
                     students: students,
                   },
                 },
                 { new: true }
               );
               return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async deleteBonusTask(token: any, bonusTaskId: String) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if user is associated with the classId
               let class_bonus_task_edit = await BonusTask.findByIdAndDelete({
                 _id: bonusTaskId,
               });
               return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async assignUserBonusTask(
           token: any,
           studentId: String,
           taskIdAgainstBonusTask: String
         ) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               let student: any = await User.findById({ _id: studentId });
               // check if user is associated with the classId
               let student_tasks = student.tasks;
               let updated_student_tasks = [];
               for (let i in student_tasks) {
                 if (student_tasks[i]._task == taskIdAgainstBonusTask) {
                   student_tasks[i].bonus_task = true;
                   student_tasks[i].bonus_task_assigned_on = moment().format();
                 }
                 updated_student_tasks.push(student_tasks[i]);
               }

               let assign_user_bonus_tasks = await User.findByIdAndUpdate(
                 { _id: studentId },
                 {
                   $set: {
                     taskIdAgainstBonusTask: taskIdAgainstBonusTask,
                     show_bonus_task: true,
                     tasks: updated_student_tasks,
                   },
                 }
               );
               return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async StudentSubmitBonusTask(
           token: any,
           bonusTaskId: String,
           supporting_doc: String
         ) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             // check if user has permission to submit bonus tasks
             let permission = user.show_bonus_task;
             if (permission) {
               let bonusTask: any = await BonusTask.findById({
                 _id: bonusTaskId,
               });
               let bonusTaskSubmitted = {
                 bonus_task_id: bonusTaskId,
                 bonus_task_title: bonusTask.title,
                 bonus_task_description: bonusTask.description,
                 supporting_doc: supporting_doc,
                 submitted_date: moment().format(),
                 taskIdAgainstBonusTask: user.taskIdAgainstBonusTask,
                 status: 'Complete',
               };
               let user_bonus_tasks = user.bonus_tasks;
               user_bonus_tasks.push(bonusTaskSubmitted);
               let update_user_bonus_tasks = await User.findByIdAndUpdate(
                 { _id: user._id },
                 {
                   $set: {
                     bonus_tasks: user_bonus_tasks,
                     show_bonus_task: false,
                     taskIdAgainstBonusTask: null,
                   },
                 },
                 { new: true }
               );
               return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async cancelAssignedBonusTask(token: any, studentId: String) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               let student: any = await User.findById({ _id: studentId });
               let failToSubmitBonusTask = {
                 status: 'Incomplete',
                 taskIdAgainstBonusTask: student.taskIdAgainstBonusTask,
               };
               let student_bonus_tasks = student.bonus_tasks;
               student_bonus_tasks.push(failToSubmitBonusTask);
               let update_user_bonus_tasks = await User.findByIdAndUpdate(
                 { _id: studentId },
                 {
                   $set: {
                     bonus_tasks: student_bonus_tasks,
                     show_bonus_task: false,
                     taskIdAgainstBonusTask: null,
                   },
                 },
                 { new: true }
               );
               return;
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async getSelfSubmittedBonusTask(token: any) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             return { submittedTasks: user.bonus_tasks };
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }
       }
