import express, { Request } from 'express'
import { UserController } from '../controllers'
import multer from 'multer';

// Multer Middleware
const upload = multer({
  dest: '../../uploads',
  filename: (req: Request, file: any, cb: any) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${req.headers.authorization}-${Date.now()}.${ext}`)
  },
})

// User Controller with all the functions
const userController = new UserController()

// Routes List
const routes = express.Router()

/**
 * GET - Get's current user's profile
 * @var { headers: { authorization } }
 */
routes.get('/', userController.get)

/**
 * PUT - Edits the current user's profile
 * @var { headers: { authorization }, body: { user } }
 */
routes.put('/', userController.editProfile)

/**
 * POST - Update the profile picture of the user in the database
 * @var {profile_picture: <img_file>}
 *
 * use multer as the middleware to extract the photo and rest of body
 */
routes.post( '/profile-picture', upload.single('profile_picture'), userController.profilePictureUpdate)

/**
 * POST - Assigns a random task to the user
 * @var { headers: { authorization }, body: { card_theme } }
 */
routes.post('/assign-card', userController.assignRandomCard);

routes.get('/team', userController.getTeam);

routes.post(
  '/task-doc-upload',
  upload.single('supporting_doc'),
  userController.taskSupportingDocUpload
);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as userRoutes }