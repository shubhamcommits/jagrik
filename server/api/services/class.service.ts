import { User, Class } from "../models";
import jwt from "jsonwebtoken";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

export class ClassService {
  /**
   * This function defines the business logic behind the creation of a class
   * @param token
   */
  async createClass(token: any) {
    try {
      // verify token and decode user data
      let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

      // check if the user has the correct permissions to create a class
      if (user.role === "facilitator" || user.role === "super-admin") {
        // create a class -> save the user id as the class_creator
        let jagrik_class = await Class.create({ class_creator: user._id });

        // save class id in user profile
        let user_profile = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { classes: jagrik_class._id } },
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

      // check if the user has the correct permissions to create a class

      // add emails to invited member list for class
      await Class.findByIdAndUpdate(
        { _id: classId },
        { $push: { invited_members: studentEmails } }
      );
      //create class join URL
      let JOIN_URL =
        process.env.URL + "/api/classes/join-class?classId=" + classId;
      // draft an email to the students
      const msg = {
        to: studentEmails,
        from: process.env.SENDGRID_EMAIL || "krrishdholakia@gmail.com",
        subject: "Join your Jagrik Class!",
        text:
          "Hi, your Jagrik Class is waiting for you to join them! Click on the link to join! " +
          JOIN_URL,
        html: `<div style='display: flex; flex-direction: column; width: 100%;  justify-content: center;align-items: center;'><h1>Welcome to your Jagrik Class!</h1><p>You've been invited to join a Jagrik class. Click on the link below and get started!</p> <a href=${JOIN_URL} style='text-decoration: none;color: white;background: black;padding: 1%;border-radius: 5px;'>JOIN CLASS</a></div>`,
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
          return jagrik_class;
        })
        .then(() => {
          // join a class -> save the user id as the member
          Class.findByIdAndUpdate(
            { _id: classId },
            { $push: { members: user._id } }
          );
          return;
        })
        .then(() => {
          // save class id in user profile
          User.findByIdAndUpdate(
            { _id: user._id },
            { $push: { classes: classId } },
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
      let jagrik_class = await Class.findById({ _id: classId });

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
