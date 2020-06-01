import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

// Create Authentication Service instance
const authService = new AuthService();

export class AuthController {

    async signIn(req: Request, res: Response, next: NextFunction){
        try {

            // Fetch the data variables from the request
            let { body: { user } } = req;

            // Call the signIn function from the service
            let signIn = await authService.signIn(user.email, user.password)
            
            // Process with the response
            .then(()=>{
                return res.status(200).json({
                    message: 'User has been signedIn!',
                    
                })
            })

            // Catch the errors from the service
            .catch((err)=>{
                return res.status(400).json({
                    message: 'Bad Request, kindly trace the error stack for more details!',
                    error: new Error(err)
                })
            })


        } catch(err){
            return res.status(500).json({
                message: 'Internal Server Error!',
                error: new Error(err)
            })
        }
    }
}