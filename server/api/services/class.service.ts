import { User, Class, Team, Task, Card } from "../models";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const sgMail = require("@sendgrid/mail");
const VIDEO_API_KEY = process.env.VIDEO_API_KEY || "46824144";
const VIDEO_API_SECRET =
  process.env.VIDEO_API_SECRET || "464d6e05c895d1c5d04d08f9c8be19ee32c1d480";
// var OpenTok = require("opentok"),
//   opentok = new OpenTok(VIDEO_API_KEY, VIDEO_API_SECRET);

// Set the Key from the environment
sgMail.setApiKey(
  "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"
);

export class ClassService {
         /**
          * This function defines the business logic behind the creation of a class
          * @param token
          */
         async createClass(token: any, name: string) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             let user: any = await User.findById({ _id: userVerify._id });

             // check if the user has the correct permissions to create a class
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // create a class -> save the user id as the class_creator

               //generate a class code
               let class_code = await this.generateClassCode();

               let jagrik_class = await Class.create({
                 class_creator: user._id,
                 name: name,
                 members: [user._id],
                 class_code,
               });

               // save class id in user profile
               let user_profile = await User.findByIdAndUpdate(
                 { _id: user._id },
                 { $addToSet: { classes: jagrik_class._id } },
                 { new: true }
               );

               return { class: jagrik_class };
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         // student created class
         async studentCreateClass(token: any, className: string) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             let user: any = await User.findById({ _id: userVerify._id });

             // check if user is student
             if (user.role != 'facilitator' || user.role != 'super-admin') {
               // create a class -> save the user id as the class_creator_student and change class_creator_is_student to true

               //generate a class code
               let class_code = await this.generateClassCode();

               let jagrik_class = await Class.create({
                 class_creator: null,
                 name: className,
                 class_creator_is_student: true,
                 class_creator_student: user._id,
                 members: [user._id],
                 class_code,
               });

               // save class id in user profile
               let user_profile = await User.findByIdAndUpdate(
                 { _id: user._id },
                 { $addToSet: { classes: jagrik_class._id } },
                 { new: true }
               );

               return { class: jagrik_class };
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         //file upload function
         async classFileUpload(file_obj: any, classId: String, token: any) {
           try {
             //verify token and decode user data
             let user: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             // check if the user has the correct permissions to create a class
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               //find user in db
               await Class.findByIdAndUpdate(
                 { _id: classId },
                 //save image to user obj in db
                 {
                   $addToSet: {
                     files: {
                       _title: file_obj['title'],
                       _description: file_obj['description'],
                       _img: file_obj['img'],
                       _upload_file: file_obj['upload_file'],
                     },
                   },
                 },
                 { new: true }
               ).catch((err) => {
                 throw new Error(err);
               });

               return 'File Successfully Uploaded!';
             }
           } catch (err) {
             // Catch unexpected errors
             console.log('err: ', err);
             throw new Error(err);
           }
         }

         //generate a unique class code
         async generateClassCode() {
           //generate a 6 character class code
           let class_code = nanoid(6);

           //check if it's unique
           let class_code_unique = await Class.findOne({ class_code }).then(
             (class_code) => {
               return class_code ? false : true;
             }
           );
           //if not unique, recursively keep generating codes until one of them is unique
           if (!class_code_unique) {
             return this.generateClassCode();
           }

           //return the unique class code
           return class_code;
         }

         async inviteToClass(
           token: any,
           studentEmails: [String],
           classId: String
         ) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             let user: any = await User.findById({ _id: userVerify._id });

             // check if the user has the correct permissions to create a class
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // add emails to invited member list for class
               await Class.findByIdAndUpdate(
                 { _id: classId },
                 { $addToSet: { invited_members: studentEmails } }
               );

               //create class join URL
               let JOIN_URL =
                 process.env.URL +
                 '/#/authentication/sign-up?classId=' +
                 classId +
                 '&email=' +
                 studentEmails[0] +
                 '&role=student';
               // draft an email to the students
               const msg = {
                 to: studentEmails,
                 from: 'vinay.gupta@un.org',
                 subject: 'Join your Jagrik Class!',
                 text:
                   'Hi, your Jagrik Class is waiting for you to join them! Click on the link to join! ' +
                   JOIN_URL,
                 html: `<div>
          <h2>Welcome to your Jagrik Class!</h2>
          <p>You've been invited to join a Jagrik class. Click on the link below and get started!</p> 
          <a href=${JOIN_URL} 
          style='
          background-color: #CE4166; /* Pink Color */
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          -webkit-transition-duration: 0.4s; /* Safari */
          transition-duration: 0.4s;
          cursor: pointer;
          letter-spacing: 2px;'>JOIN CLASS</a>
          </div>`,
               };
               sgMail
                 .sendMultiple(msg)
                 .then(() => {
                   return 'Emails sent successfully!';
                 })
                 .catch((error: any) => {
                   console.log('error: ', error);
                   throw new Error(error);
                 });
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             console.log('err: ', err);
             throw new Error('400 - Bad Request');
           }
         }

         /**
          * This function is responsible for closing class
          * @param class_code
          */
  async closeClass(class_code: String) {
           console.log('====================================');
           console.log(class_code);
           console.log('====================================');
           try {
             // Fetch the class by id
              await Class.findOne({ _id: class_code })
                .then((jagrik_class) => {
                  
                })
                .then(async () => {
                  // join a class -> save the user id as the member
                  let classUpdate = await Class.findByIdAndUpdate(
                    { _id: class_code },
                    {
                      is_open: false,
                    },
                    { new: true }
                  );

                  return;
                });

             // Return class
             return 'Successfully closed class!';
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         /**
          * This function is responsible for fetching the classId by class code
          * @param class_code
          */
         async findClassIdByCode(class_code: String) {
           try {
             // Fetch the class by id
             let jagrik_class = await Class.findOne({
               class_code: class_code,
             }).select('_id');

             // Return class
             return jagrik_class._id;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async joinClass(
           classId: String,
           token: any,
           isClassCodeInvite?: boolean
         ) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             let user: any = await User.findById({ _id: userVerify._id });

             // check if the user has the correct permissions to join a class
             await Class.findById({ _id: classId })
               .then((jagrik_class) => {
                 // Disabling this as we have to allow the users to join the class via a code as well(which is public)
                 if (!jagrik_class['is_open']) {
                   throw new Error(
                     'Class is closed currently you cannot join. Please contact admin.'
                   );
                 } else if (
                   !jagrik_class['invited_members'].includes(user.email) &&
                   !isClassCodeInvite
                 ) {
                   throw new Error('Email not registered with this class');
                 }
                 return;
               })
               .then(async () => {
                 // join a class -> save the user id as the member
                 let classUpdate = await Class.findByIdAndUpdate(
                   { _id: classId },
                   {
                     $addToSet: { members: user._id },
                     $pull: { invited_members: user.email },
                   },
                   { new: true }
                 );

                 return;
               })
               .then(async () => {
                 // save class id in user profile
                 let userUpdate = await User.findByIdAndUpdate(
                   { _id: user._id },
                   { $addToSet: { classes: classId } },
                   { new: true }
                 );

                 return;
               });

             return 'Successfully joined class!';
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }
         /**
          * This function is responsible for defining the business logic behind fetching a class detail
          * @param classId
          */
         async getClassDetails(classId: String) {
           try {
             // Fetch the class by id
             let jagrik_class = await Class.findById({ _id: classId }).populate(
               'members',
               'first_name last_name role email'
             );

             // Return class
             return jagrik_class;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         /**
          * This function is responsible for defining the business logic behind deleting a class
          * @param token
          * @param classId
          */
         async deleteClass(token: any, classId: String) {
           try {
             // verify token and decode user data
             var userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             // check if User has the privileges to delete a class
             if (user.role !== 'facilitator' && user.role !== 'super-admin') {
               throw new Error('401 - Access Denied');
             }

             // delete the class in db
             let jagrik_class = await Class.findByIdAndDelete({ _id: classId });

             // delete all references to class in user lists
             let user_classes = await User.updateMany(
               { _id: user._id },
               { $pullAll: { classes: [classId] } }
             );

             // Return deleted class
             return jagrik_class;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         /**
          * This function is responsible for defining the business logic behind fetching currently loggedIn user's class list
          * @param token
          */
         async getUserClasses(token: any) {
           try {
             // verify token and decode user data
             var userAuth: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             // fetch the user from the database
             let user: any = await User.findById({ _id: userAuth._id });

             // convert the user
             user = user.toJSON();

             // return classes list
             return user.classes;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async createTeam(token: any, classId: String, userId: String) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             // check if the user has the correct permissions to create a team
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if class exists
               let class_exist: any = await Class.findById({ _id: classId });

               if (class_exist) {
                 let class_users_length = class_exist.members.length;
                 let get_all_teams: any = await Team.find({
                   team_creator: user._id,
                 });
                 console.log('The team count is: ', get_all_teams.length);
                 if (get_all_teams.length == 0) {
                   let team_name = 'Team1';
                   let jagrik_class_team = await Team.create({
                     team_creator: user._id,
                     team_name: team_name,
                     team_members: userId,
                   });
                   if (jagrik_class_team) {
                     await User.findByIdAndUpdate(
                       { _id: userId },
                       { teams: jagrik_class_team._id },
                       { new: true }
                     );
                   } else {
                     throw new Error('401 - Team not created');
                   }
                 } else {
                   if (2 * get_all_teams.length + 1 == class_users_length) {
                     // add the user in last team created
                     console.log(class_users_length);
                     let jagrik_class_team = await Team.findByIdAndUpdate(
                       { _id: get_all_teams[get_all_teams.length - 1]._id },
                       { $addToSet: { team_members: userId } },
                       { new: true }
                     );
                     if (jagrik_class_team) {
                       await User.findByIdAndUpdate(
                         { _id: userId },
                         { teams: jagrik_class_team._id },
                         { new: true }
                       );
                     } else {
                       throw new Error('401 - Team not created');
                     }
                   } else {
                     console.log(
                       'The member count is: ',
                       get_all_teams[get_all_teams.length - 1].team_members
                         .length
                     );
                     if (
                       get_all_teams[get_all_teams.length - 1].team_members
                         .length != 2
                     ) {
                       let jagrik_class_team = await Team.findByIdAndUpdate(
                         { _id: get_all_teams[get_all_teams.length - 1]._id },
                         { $addToSet: { team_members: userId } },
                         { new: true }
                       );
                       if (jagrik_class_team) {
                         await User.findByIdAndUpdate(
                           { _id: userId },
                           { teams: jagrik_class_team._id },
                           { new: true }
                         );
                       } else {
                         throw new Error('401 - Team not created');
                       }
                     } else {
                       let team_name = 'Team' + get_all_teams.length + 1;
                       let jagrik_class_team = await Team.create({
                         team_creator: user._id,
                         team_name: team_name,
                         team_members: userId,
                       });
                       if (jagrik_class_team) {
                         await User.findByIdAndUpdate(
                           { _id: userId },
                           { teams: jagrik_class_team._id },
                           { new: true }
                         );
                       } else {
                         throw new Error('401 - Team not created');
                       }
                     }
                   }
                   // console.log("The last team is: ",get_all_teams[get_all_teams.length-1].team_members.length);
                 }
               } else {
                 throw new Error('401 - Class Not Found');
               }
               return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async getTeams(token: any, classId: String) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             // let class_members: any = await User.find(classes: )

             // finding class_creator id from class table
             let user_class: any = await Class.findById({ _id: classId });
             //  let user_class: any = await Class.findById({_id: classId}).populate(
             //    "members",
             //    "first_name last_name teams"
             //  )

             let result = [];
             for (let i in user_class.members) {
               let member: any = await User.findById({
                 _id: user_class.members[i],
               });
               if (member.role == 'facilitator') {
                 continue;
               }

               if (member.teams.length != 0) {
                 let member_team: any = await Team.findById({
                   _id: member.teams[member.teams.length - 1]._id,
                 });
                 let member_class = {
                   user_id: member._id,
                   first_name: member.first_name,
                   last_name: member.last_name,
                   user_profile_pic: member.profile_pic,
                   team_name: member_team.team_name,
                 };
                 result.push(member_class);
               } else {
                 let member_class = {
                   user_id: member._id,
                   first_name: member.first_name,
                   last_name: member.last_name,
                   user_profile_pic: member.profile_pic,
                   team_name: 'No Team',
                 };
                 result.push(member_class);
               }
             }

             return result;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async getTeamMembers(token: any, teamId: String) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             // find the userIds corresponding to the team
             let team: any = await Team.findById({ _id: teamId });
             let userIds = team.team_members;
             // declare empty team_members array
             let team_members = [];
             // loop through userIds to find user details and then push into team_members array

             for (let i in userIds) {
               let member: any = await User.findById({ _id: userIds[i] });
               let team_mate = {
                 first_name: member.first_name,
                 last_name: member.last_name,
                 user_profile_pic: member.profile_pic,
                 email: member.email,
               };
               team_members.push(team_mate);
             }

             return team_members;
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async createSession(token: any, classId: String) {
           try {
             // verify token and decode user data
             let user: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // opentok.createSession(function (err, session) {
               //   if (err) return console.log(err);
               //   token = session.generateToken();
               //   // save the sessionId
               //   Class.findByIdAndUpdate(
               //     { _id: user._id },
               //     { session_id: session.sessionId },
               //     { new: true }
               //   );
               //   return {
               //     api_key: VIDEO_API_KEY,
               //     session_id: session.sessionId,
               //     token,
               //   };
               // });
             }
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async getCompletedTeamTasks(token: any, classId: String) {
           try {
             // verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               let class_exist: any = await Class.findById({ _id: classId });

               if (class_exist) {
                 let result = [];
                 let get_all_teams_of_class: any = await Team.find({
                   team_creator: user._id,
                 });

                 // Traverse over 'get_all_teams_of_class' using loop
                 for (let i in get_all_teams_of_class) {
                   let teamTasks = get_all_teams_of_class[i].tasks;

                   let is_any_team_task_complete = false;
                   let completedTeamTask = null;

                   for (let j in teamTasks) {
                     // Check the status of team tasks(if status is completed then proceed further)
                     if (teamTasks[j].status == 'complete') {
                       is_any_team_task_complete = true;
                       completedTeamTask = teamTasks[j];
                       break;
                     }
                   }

                   if (is_any_team_task_complete == false) {
                     // return, The overall team status is Incomplete
                     result.push({
                       team_id: get_all_teams_of_class[i]._id,
                       team_name: get_all_teams_of_class[i].team_name,
                       team_status: 'Incomplete',
                     });
                     continue;
                   }

                   // Find out all the team members in a particular team and loop over each team member
                   let teamMembers = get_all_teams_of_class[i].team_members;
                   let indTask = [];

                   for (let k in teamMembers) {
                     let self: any = await User.findById({
                       _id: teamMembers[k],
                     });
                     let selfTasks = self.tasks;

                     let is_any_self_task_complete = false;
                     // Check status of each team member task(if status completed then return the team, team members, task status, task completion proofs)
                     for (let n in selfTasks) {
                       if (selfTasks[n].status == 'complete') {
                         is_any_self_task_complete = true;
                         let IndividualTask: any = await Task.findById({
                           _id: selfTasks[n]._task,
                         });

                         let taskIdAgainstBonusTask = selfTasks[n]._task;
                         let self_bonus_tasks = self.bonus_tasks;
                         let bonusTaskStatus;
                         let bonusTaskSupportingDoc;
                         let bonus_task_title;
                         let bonus_task_description;
                         let bonus_task_submitted_date;

                         if (selfTasks[n].bonus_task) {
                           // check in users bonus task array
                           for (let btItr in self_bonus_tasks) {
                             if (
                               self_bonus_tasks[btItr].taskIdAgainstBonusTask ==
                               taskIdAgainstBonusTask
                             ) {
                               bonusTaskStatus = self_bonus_tasks[btItr].status;
                               bonusTaskSupportingDoc =
                                 self_bonus_tasks[btItr].supporting_doc;
                               bonus_task_title =
                                 self_bonus_tasks[btItr].bonus_task_title;
                               bonus_task_description =
                                 self_bonus_tasks[btItr].bonus_task_description;
                               bonus_task_submitted_date =
                                 self_bonus_tasks[btItr].submitted_date;
                             }
                           }
                         }
                         if (selfTasks[n].bonus_task) {
                           indTask.push({
                             user_id: self._id,
                             user_name: self.full_name,
                             user_email: self.email,
                             user_profile: self.profile_pic,
                             user_taskId: selfTasks[n]._task,
                             user_task_title: IndividualTask.title,
                             user_task_description: IndividualTask.description,
                             user_task_points: IndividualTask.points,
                             user_task_type: IndividualTask.type,
                             user_task_supporting_doc:
                               selfTasks[n].supporting_doc,
                             user_task_assigned_bonus_task:
                               selfTasks[n].bonus_task,
                             user_task_assigned_bonus_task_date:
                               selfTasks[n].bonus_task_assigned_on,
                             bonusTaskStatus: bonusTaskStatus,
                             bonusTaskSupportingDoc: bonusTaskSupportingDoc,
                             bonus_task_title: bonus_task_title,
                             bonus_task_description: bonus_task_description,
                             bonus_task_submitted_date: bonus_task_submitted_date,
                           });
                         } else {
                           indTask.push({
                             user_id: self._id,
                             user_name: self.full_name,
                             user_email: self.email,
                             user_profile: self.profile_pic,
                             user_taskId: selfTasks[n]._task,
                             user_task_title: IndividualTask.title,
                             user_task_description: IndividualTask.description,
                             user_task_points: IndividualTask.points,
                             user_task_type: IndividualTask.type,
                             user_task_supporting_doc:
                               selfTasks[n].supporting_doc,
                             user_task_assigned_bonus_task:
                               selfTasks[n].bonus_task,
                           });
                         }

                         break;
                       }
                     }
                     if (is_any_self_task_complete == false) {
                       // return, The overall team status is Incomplete
                       result.push({
                         team_id: get_all_teams_of_class[i]._id,
                         team_name: get_all_teams_of_class[i].team_name,
                         team_status: 'Incomplete',
                       });
                       break;
                     }
                   }

                   if (indTask.length == teamMembers.length) {
                     let TeamTask: any = await Task.findById({
                       _id: completedTeamTask._task,
                     });
                     let CardDetail: any = await Card.findById({
                       _id: TeamTask._card,
                     });
                     result.push({
                       team_id: get_all_teams_of_class[i]._id,
                       team_name: get_all_teams_of_class[i].team_name,
                       team_status: 'complete',
                       team_points: get_all_teams_of_class[i].points,
                       team_members_tasks: indTask,
                       team_taskId: completedTeamTask._task,
                       team_task_title: TeamTask.title,
                       team_task_description: TeamTask.description,
                       team_task_points: TeamTask.points,
                       team_task_type: TeamTask.type,
                       team_task_supporting_doc:
                         completedTeamTask.supporting_doc,
                       team_card_theme: CardDetail.theme,
                       team_card_dice_number: CardDetail.dice_number,
                       team_card_description: CardDetail.description,
                       team_task_week: completedTeamTask.week,
                     });
                   }
                   // no else part since it will be handled by the upper if statement (is_any_self_task_complete==false)
                 }
                 // console.log(result);
                 return result;
               } else {
                 // Class does not exist
                 throw new Error('401 - Access denied');
               }
             } else {
               // Unauthorized user to view status of all the teams
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }

         async getClassesWithoutFacilitator(token: any, userId: String) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if user is associated with any class
               let checkAssociationInClass: any = await Class.find({
                 class_creator: user._id,
               });

               if (checkAssociationInClass != null) {
                 let fetchClassesWithoutFacilitator: any = await Class.find(
                   { class_creator: null },
                   { class_creator_is_student: true }
                 );
                 return fetchClassesWithoutFacilitator;
               } else {
                 let fetchClassesWithoutFacilitator =
                   'All Classes have a facilitator assigned !';
                 return fetchClassesWithoutFacilitator;
               }
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async joinClassWithoutFacilitator(
           token: any,
           userId: String,
           classId: String
         ) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             if (user.role === 'facilitator' || user.role === 'super-admin') {
               // check if the class with classId has no facilitator
               let checkAvailability: any = await Class.findById({
                 _id: classId,
               });
               if (
                 checkAvailability.class_creator == null &&
                 checkAvailability.class_creator_is_student == true
               ) {
                 await Class.findByIdAndUpdate(
                   { _id: classId },
                   { class_creator: user._id },
                   { new: true }
                 ).catch((err) => {
                   throw new Error(err);
                 });
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

         async getTeamMemberStatus(token: any, teamId: String) {
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );
             let user: any = await User.findById({ _id: userVerify._id });
             let team: any = await Team.find({ _id: teamId });
             let team_tasks = team[0].tasks;

             var teamTaskCompleted = 'Incomplete';

             if (team_tasks && team_tasks.length > 0) {
               for (let j in team_tasks) {
                 teamTaskCompleted = team_tasks[j].status;
               }
             }

             let team_members = team[0].team_members;
             let teamMemberTaskStatus = [];

             for (let k in team_members) {
               var self: any = await User.find({ _id: team_members[k] });
               self = self[0];
               let selfTasks = self.tasks;
               let is_any_self_task_complete = false;

               for (let n in selfTasks) {
                 if (selfTasks[n].status == 'complete') {
                   is_any_self_task_complete = true;
                 } else {
                   is_any_self_task_complete = false;
                 }
               }
               teamMemberTaskStatus.push({
                 user_id: self._id,
                 user_name: self.first_name + ' ' + self.last_name,
                 user_email: self.email,
                 user_profile: self.profile_pic,
                 user_individual_task_status: is_any_self_task_complete,
               });
             }
             console.log(teamMemberTaskStatus);
             return {
               teamTask: teamTaskCompleted,
               teamMembers: teamMemberTaskStatus,
             };
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async joinSession(token: any, classId: String) {
           try {
             // verify token and decode user data
             let user: any = jwt.verify(
               token.split(' ')[1],
               process.env.JWT_KEY
             );

             let sessionId = await Class.findById({ _id: classId }).then(
               (jagrik_class) => {
                 //if class exists
                 if (jagrik_class) {
                   //if user a member of the class
                   if (jagrik_class['members'].includes(user)) {
                     return jagrik_class['session_id'];
                   } else {
                     throw new Error('user not in class');
                   }
                 } else {
                   throw new Error('user not in class');
                 }
               }
             );

             // token = opentok.generateToken(sessionId);

             return { api_key: VIDEO_API_KEY, sessionId, token };
           } catch (err) {
             // Catch unexpected errors
             throw new Error(err);
           }
         }
       }
