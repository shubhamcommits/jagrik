import { User, Class } from "../models";
import jwt from "jsonwebtoken";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  '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'
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
        let jagrik_class = await Class.create({
          class_creator: user._id,
          name: name,
          members: [user._id]
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
        )

        //create class join URL
        let JOIN_URL =
          process.env.URL + "/#/authentication/sign-up?classId=" + classId + "&email=" + studentEmails[0] + "&role=student"
        // draft an email to the students
        const msg = {
          to: studentEmails,
          from: process.env.SENDGRID_EMAIL || "advityasood@gmail.com",
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

  async joinClass(classId: String, token: any) {
    try {
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to join a class
      await Class.findById({ _id: classId })
        .then((jagrik_class) => {
          if (!jagrik_class["invited_members"].includes(user.email)) {
            throw new Error("Email not registered with this class");
          }
          return;
        })
        .then( async () => {
          // join a class -> save the user id as the member
          let classUpdate = await Class.findByIdAndUpdate(
            { _id: classId },
            { $addToSet: { members: user._id },
              $pull: { invited_members: user.email } 
            },
            { new: true }
          )

          return;
        })
        .then(async () => {
          // save class id in user profile
          let userUpdate = await User.findByIdAndUpdate(
            { _id: user._id },
            { $addToSet: { classes: classId } },
            { new: true }
          )

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
      let jagrik_class = await Class.findById({ _id: classId })
      .populate('members', 'first_name last_name role email')

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
}
