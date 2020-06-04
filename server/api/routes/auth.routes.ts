import express from 'express';
import { AuthController } from '../controllers';

// Auth Controller with all the functions
const auth = new AuthController();

// Routes List
const routes = express.Router();

// POST - Signs In the user and generate a new token
routes.post('/sign-in', auth.signIn);

// POST - Signs Up the user and creates a new account
routes.post('/sign-up', auth.signUp);

// POST - Signs Out the current loggedIn User
routes.post('/sign-out', auth.signOut);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as authRoutes }