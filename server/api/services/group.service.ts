import { Auth, User, Class, Group} from "../models";
import moment from "moment";
import jwt from "jsonwebtoken";

export class GroupService {
         async createGroup(token: any, students: any, groupName: String, classId: String){
           try {
             //verify token and decode user data
             let userVerify: any = jwt.verify( token.split(' ')[1],process.env.JWT_KEY);
             let user: any = await User.findById({ _id: userVerify._id });
             
             let members=[];
             for(let i in students){
                let user_member: any = await User.findById({ _id: students[i]});
                let user_obj={
                    member_id: user_member._id,
                    member_full_name: user_member.full_name,
                    member_email: user_member.email,
                    member_profile_pic: user_member.profile_pic,
                };
                members.push(user_obj);
             }

             if (user.role === 'facilitator' || user.role === 'super-admin') {
                let groupCreate = await Group.create(
                    {groupName: groupName},
                    {members: members},
                    {class: classId}
                );
                
                // save the groupId in Classes table
                let classGroup: any = await Class.findById({_id: classId});
                let updatedGroups = classGroup.groups;
                updatedGroups.push(groupCreate._id);

                let updatedClass = await Class.findByIdAndUpdate(
                    {_id: classId},
                    {groups: updatedGroups}
                );

                // save the groupId in Users table
                for(let i in students){
                   let user_member: any = await User.findById({ _id: students[i]});
                   let updatedUserGroups = user_member.groups;
                   updatedUserGroups.push(groupCreate._id);

                   let updatedUseer = await User.findByIdAndUpdate(
                       {id_: students[i]},
                       {groups: updatedUserGroups},
                   );
                }
                return;
             } else {
               throw new Error('401 - Access denied');
             }
           } catch (err) {
             //catch unexpected errors
             throw new Error(err);
           }
         }

         async getGroups(token: any, classId: any){
            try {
              //verify token and decode user data
              let userVerify: any = jwt.verify( token.split(' ')[1],process.env.JWT_KEY);
              let user: any = await User.findById({ _id: userVerify._id });
 
              if (user.role === 'facilitator' || user.role === 'super-admin') {
                let classGroups: any = await Group.find({classId: classId});
                return { result: classGroups };
              } else {
                let myGroups=[];
                let userGroups = user.groups;
                for(let i in userGroups){
                    let user_group: any = await Group.findById({_id: userGroups[i]});
                    let groupObj={
                        group_id: user_group._id,
                        group_name: user_group.groupName,
                        group_members: user_group.members,
                    };
                    myGroups.push(groupObj);
                }
                return { result: myGroups };
              }
            } catch (err) {
              //catch unexpected errors
              throw new Error(err);
            }
          }

          async editGroup(token: any, students: any, groupName: String, groupId: String){
            try {
              //verify token and decode user data
              let userVerify: any = jwt.verify( token.split(' ')[1],process.env.JWT_KEY);
              let user: any = await User.findById({ _id: userVerify._id });
 
              if (user.role === 'facilitator' || user.role === 'super-admin') {
                
                let members=[];
                for(let i in students){
                   let user_member: any = await User.findById({ _id: students[i]});
                   let user_obj={
                       member_id: user_member._id,
                       member_full_name: user_member.full_name,
                       member_email: user_member.email,
                       member_profile_pic: user_member.profile_pic,
                   };
                   members.push(user_obj);
                }

                  let editGroup: any = await Group.findById(
                      {_id: groupId},
                      {
                        $set: {
                          groupName: groupName,
                          students: members,
                        },
                      }
                      );
              } else {
                throw new Error('401 - Access denied');
              }
            } catch (err) {
              //catch unexpected errors
              throw new Error(err);
            }
          }
}
  
  