import express from "express";
import { AuthController } from "../controllers";
var multer = require("multer");
const upload = multer({
  dest: "../../uploads",
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.headers.authorization}-${Date.now()}.${ext}`);
  },
});
// Auth Controller with all the functions
const auth = new AuthController();

// Routes List
const routes = express.Router();

/**
 * POST - Signs In the user and generate a new token
 * @var { body: { user: { email, password, device } } }
 */
routes.post("/sign-in", auth.signIn);

/**
 * POST - Signs Up the user and creates a new account
 * @var { body: { user: { first_name, last_name, email, password, role, device }
 */
routes.post("/sign-up", auth.signUp);

/**
 * POST - Signs Out the current loggedIn User
 * @var { body: { userId } }
 * */
routes.post("/sign-out", auth.signOut);

/**
 * POST - Update the profile picture of the user in the database
 * @var {profile_picture: <img_file>}
 *
 * use multer as the middleware to extract the photo and rest of body
 */
routes.post(
  "/profile-picture-update",
  upload.single("profile_picture"),
  auth.profilePictureUpdate
);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as authRoutes };
