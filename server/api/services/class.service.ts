import { User, Class, Team } from "../models";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const sgMail = require("@sendgrid/mail");

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
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to create a class
      if (user.role === "facilitator" || user.role === "super-admin") {
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
        throw new Error("401 - Access denied");
      }
    } catch (err) {
      // Catch unexpected errors
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

  async inviteToClass(token: any, studentEmails: [String], classId: String) {
    try {
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to create a class
      if (user.role === "facilitator" || user.role === "super-admin") {
        // add emails to invited member list for class
        await Class.findByIdAndUpdate(
          { _id: classId },
          { $addToSet: { invited_members: studentEmails } }
        );

        //create class join URL
        let JOIN_URL =
          process.env.URL +
          "/#/authentication/sign-up?classId=" +
          classId +
          "&email=" +
          studentEmails[0] +
          "&role=student";
        // draft an email to the students
        const msg = {
          to: studentEmails,
          from: "advityasood@gmail.com",
          subject: "Join your Jagrik Class!",
          text:
            "Hi, your Jagrik Class is waiting for you to join them! Click on the link to join! " +
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
            return "Emails sent successfully!";
          })
          .catch((error: any) => {
            console.log("error: ", error);
            throw new Error(error);
          });
      } else {
        throw new Error("401 - Access denied");
      }
    } catch (err) {
      console.log("err: ", err);
      throw new Error("400 - Bad Request");
    }
  }

  /**
   * This function is responsible for fetching the classId by class code
   * @param class_code 
   */
  async findClassIdByCode(class_code: String){
    try {
      // Fetch the class by id
      let jagrik_class = await Class.findOne({ class_code: class_code })
      .select('_id')

      // Return class
      return jagrik_class._id;

    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async joinClass(classId: String, token: any, isClassCodeInvite?: boolean) {
    try {
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to join a class
      await Class.findById({ _id: classId })
        .then((jagrik_class) => {
          
          // Disabling this as we have to allow the users to join the class via a code as well(which is public)
          if (!jagrik_class["invited_members"].includes(user.email) && !isClassCodeInvite) {
            throw new Error("Email not registered with this class");
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

      return "Successfully joined class!";
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
        "members",
        "first_name last_name role email"
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
      var user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if User has the privileges to delete a class
      if (user.role !== "facilitator" && user.role !== "super-admin") {
        throw new Error("401 - Access Denied");
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
      var userAuth: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

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

  async createTeam(token: any, classId: String, user_team_detail:any) {
    try {
      
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to create a team
      if (user.role === "facilitator" || user.role === "super-admin") {
        // check if class exists
        let class_exist: any = await Class.findById({ _id: classId })
  
        if(class_exist){
          // user_team_detail.forEach(async user_team => {
            for(let i in user_team_detail){
            // If team_name already exists under a team_creator then append in team_member list
            let team_exist = await Team.find({team_name: user_team_detail[i].team_name},{team_creator: user._id})
            let jagrik_class_team
            
            if(team_exist.length!=0){
              jagrik_class_team = await Team.findByIdAndUpdate(
                {_id: team_exist[0]._id},
                {$addToSet: { team_members: user_team_detail[i].user_id }},
                { new: true }
              );
            }else{
              // create team -> save the user id as the team_creator
              jagrik_class_team = await Team.create({
                team_creator: user._id,
                team_name: user_team_detail[i].team_name,
                team_members: user_team_detail[i].user_id
              });
            }
            // save team id in user profile
            await User.findByIdAndUpdate(
              { _id: user_team_detail[i].user_id },
              { teams: jagrik_class_team._id },
              { new: true }
            );
          };
        }else{
          throw new Error("401 - Class Not Found");
        }
        return;
      } else {
        throw new Error("401 - Access denied");
      }
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async getTeams(token: any, classId: String) {
    try {
   
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
      
      // finding class_creator id from class table
      let user_class: any = await Class.findById({_id: classId})
      let class_creator = user_class.class_creator;

      // find teams using class_creator as team_creator

      let teams: any = await Team.find({team_creator: class_creator})
      
      console.log(teams);

      return teams;

    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async getTeamMembers(token: any, teamId: String) {
    try {
   
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
    
      // find the userIds corresponding to the team
      let team: any = await Team.findById({_id: teamId});
      let userIds = team.team_members
      // declare empty team_members array
      let team_members=[];
      // loop through userIds to find user details and then push into team_members array
      
      for(let i in userIds){
        let member: any = await User.findById({_id: userIds[i]});
        let team_mate={
          first_name: member.first_name,
          last_name: member.last_name,
          email: member.email
        }
        team_members.push(team_mate)
      }

      console.log(team_members);

      return team_members;  

    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

}
