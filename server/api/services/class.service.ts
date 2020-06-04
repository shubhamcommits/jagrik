import { Auth, User, Class } from "../models";
var jwt = require("jsonwebtoken");

export class ClassService {
  /**
     * 1. Create class
2. Get class details by id
3 delete class by id
4. Get list of all class in which a user is there
5. Edit class details( we’ll add things like avatar, description and etc) - but we can tackle it later too
     */
  // creates a class
  async createClass(token: String) {
    try {
      // verify token and decode user data
      var user = await jwt.verify(token, process.env.JWT_KEY);

      // check if the user has the correct permissions to create a class
      if (user.role === "facilitator" || user.role === "super-admin") {
        // create a class -> save the user id as the class_creator
        let jagrik_class = await Class.create({ class_creator: user._id });
        console.log("jagrik_class: ", jagrik_class);
        //save class id in user profile
        let user_profile = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { classes: jagrik_class._id } },
          { new: true }
        );
      } else {
        throw new Error("401 - Access denied");
      }
    } catch (err) {
      // err
      throw new Error(err);
    }
  }

  // get class details by id
  async getClassDetails(id: String) {
    try {
      let jagrik_class = await Class.findById({ _id: id });
      return jagrik_class;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteClass(token: String, id: String) {
    try {
      //verify token and decode user data
      var user = await jwt.verify(token, process.env.JWT_KEY);
      //check if User has the privileges to delete a class
      if (user.role !== "facilitator" && user.role !== "super-admin") {
        throw new Error("401 - Access Denied");
      }
      // delete the class in db
      let jagrik_class = await Class.findByIdAndDelete({ _id: id });
      // delete all references to class in user lists
      let user_classes = await User.updateMany(
        { _id: user._id },
        { $pullAll: { classes: [id] } }
      );
      return jagrik_class;
    } catch (err) {
      console.log("err: ", err);
      throw new Error(err);
    }
  }

  async getUserClasses(token: String) {
    try {
      // verify token and decode user data
      var userAuth = await jwt.verify(token, process.env.JWT_KEY);
      console.log("userAuth: ", userAuth);

      let user = await User.findById({ _id: userAuth._id });
      user = user.toJSON();
      return user.classes;
    } catch (err) {
      throw new Error(err);
    }
  }
}
