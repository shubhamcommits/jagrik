import { Auth, User } from "../models";
var jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect email or password." });
      }
      return done(null, user, { message: "Logged In Successfully" });
    });
  })
);

export class AuthService {
  async signIn(req, res) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info,
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        } // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1d" });
        return res.json({ user, token });
      });
    })(req, res);
  }

  async signUp(req, res) {
    console.log("req.body: ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newUserModel = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      full_name: "" + req.body.first_name + "" + req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("newUserModel: ", newUserModel);
    newUserModel.password = bcrypt.hashSync(newUserModel.password, 10);
    User.create(newUserModel, (err, user) => {
      if (err) {
        console.log("err: ", err);
        res.send("" + err);
      } else {
        console.log(user);
        const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1d" });
        return res.json({ user, token });
      }
    });
  }
}
