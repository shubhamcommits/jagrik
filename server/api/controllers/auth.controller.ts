import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

// Create Authentication Service instance
const authService = new AuthService();

export class AuthController {

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the data variables from the request
            let { body: { user } } = req;

            // Call the signIn function from the service
            user = await authService.signIn(user.email, user.password)

                // Process with the status 200 response
                .then(() => {
                    return res.status(200).json({
                        message: 'User has been signed in successfully!',
                        user: user
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message: 'Bad Request, kindly trace the error stack for more details!',
                        error: new Error(err)
                    })
                })


        } catch (err) {
            return res.status(500).json({
                message: 'Internal Server Error!',
                error: new Error(err)
            })
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the data variables from the request
            let { body: { user } } = req;

            // Call the signUp function from the service
            user = await authService.signUp(user.first_name, user.last_name, user.email, user.password)

                // Process with the status 200 response
                .then(() => {
                    return res.status(200).json({
                        message: 'User has been signed up successfully!',
                        user: user
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message: 'Bad Request, kindly trace the error stack for more details!',
                        error: new Error(err)
                    })
                })


        } catch (err) {
            return res.status(500).json({
                message: 'Internal Server Error!',
                error: new Error(err)
            })
        }
    }

    async signOut(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the userId from the server's cache
            let userId = req['userId'];

            // Call the sign out service function
            let user = await authService.signOut(userId)

                // Process with the status 200 response
                .then(() => {
                    return res.status(200).json({
                        message: 'User has been signed out successfully!',
                        user: user
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message: 'Bad Request, kindly trace the error stack for more details!',
                        error: new Error(err)
                    })
                })

        } catch (err) {
            return res.status(500).json({
                message: 'Internal Server Error!',
                error: new Error(err)
            })
        }
    }
}