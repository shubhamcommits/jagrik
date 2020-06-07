import express from 'express'
import { AuthController } from '../controllers'

// Auth Controller with all the functions
const auth = new AuthController()

// Routes List
const routes = express.Router()

/**
 * POST - Signs In the user and generate a new token
 * @var { body: { user: { email, password, device_id } } }
 */
routes.post('/sign-in', auth.signIn)

/**
 * POST - Signs Up the user and creates a new account
 * @var { body: { user: { first_name, last_name, email, password, role, device_id }
 */
routes.post('/sign-up', auth.signUp)

/**
 * POST - Signs Out the current loggedIn User
 * @var { body: { userId } }
 * */
routes.post('/sign-out', auth.signOut)

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as authRoutes }