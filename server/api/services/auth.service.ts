import { Auth, User } from "../models";
import moment from "moment";
var jwt = require("jsonwebtoken");
export class AuthService {
  async signIn(email: string, password: string, device_id: string) {
    //check if User exists
    try {
      return await User.findOneAndUpdate({ email, password }, { active: true })
        //if user exists, update Auth db, return renewed JWT
        .then((user) => {
          //user exists
          if (user) {
            //update JWT expiration
            const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
              expiresIn: "1d",
            });
            Auth.findOneAndUpdate(
              { _user: user._id },
              {
                last_login: moment().format(),
                device_id: device_id,
                is_logged_in: true,
                token: token,
              }
            );

            return token;
          }
        })
        //else throw an error
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  }

  async signUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    device_id: string
  ) {
    // create a user obj to put in the User db
    const newUser = {
      first_name,
      last_name,
      email,
      password,
      active: true,
      full_name: first_name + "" + last_name,
      role,
    };

    console.log("newUser: ", newUser);
    //check if user already exists
    try {
      // inserting the user obj into the User db and creating a log of it through the Auth model
      return await User.findOne({ email: email })
        .then((user) => {
          if (user) {
            throw new Error("Email already in use");
          }
          return;
        })
        .then(() => {
          return User.create(newUser);
        })
        //generate a jwt token & create a log entry of user entry
        .then((user) => {
          const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
            expiresIn: "1d",
          });

          let newAuthUser = {
            token,
            device_id,
            _user: user,
          };

          Auth.create(newAuthUser);

          return token;
        })
        // return token to user
        .then((token) => {
          return token;
        })
        .catch((err) => {
          console.log("err: ", err);
          throw new Error(err);
        });
    } catch (error) {
      return error;
    }
  }

  async signOut(userId: string) {
    //find user by id, and set as inactive, update auth db is_logged_in to false
    try {
      return await User.findByIdAndUpdate({ _id: userId }, { active: false })
        .then((user) => {
          console.log("user: ", user);
          //if user exists, then also update the auth db
          if (user) {
            Auth.findOneAndUpdate(
              { _user: userId },
              { is_logged_in: false },
              { new: true }
            );
          }
          return "hello";
        })
        //throw any errors up to the user
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      return error;
    }
  }
}
