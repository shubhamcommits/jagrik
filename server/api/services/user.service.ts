import { User, Card, Task } from "../models";
import jwt from "jsonwebtoken";

export class UserService {

    /**
     * This function is responsible for editing a user's profile
     * @param token 
     * @param userData 
     */
    async editProfile(token: any, userData: any) {
        try {

            // Verify token and decode user data
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY)

            // Find the user and update the data
            user = await User.findByIdAndUpdate(
                { _id: user._id },
                { $set: userData },
                { new: true }
            )
                .then(() => {

                    // Return with success
                    return user

                })
                .catch((err) => {
                    throw new Error(err)
                })

        } catch (err) {

            // Catch unexpected errors
            throw new Error(err)
        }
    }

    async profilePictureUpdate(img_data: Buffer, token: any) {
        try {
            console.log("token: ", token);
            //verify token and decode user data
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

            //find user in db
            await User.findByIdAndUpdate(
                { _id: user._id },
                //save image to user obj in db
                { profile_pic: img_data },
                { new: true }
            ).catch((err) => {
                throw new Error(err);
            });

            return "Profile Updated!";
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
    }

    /**
     * This function is responsible for assigning a random task
     * @param card_theme 
     * @param token 
     */
    async assignRandomSelfTask(card_theme: any, token: any) {
        try {

            // Find the list of cards
            let cards = await Card.find({
                theme: card_theme
            }).select('_id')

            // Map the list of card Ids
            cards = cards.map((card) => {
                return card._id
            })

            // Find list of cards
            let tasks = await Task.find({
                _card: { $in: cards }
            })

            // Random task Index
            let randomTaskIndex = Math.floor((Math.random() * tasks.length))

            // Random task
            let task = {
                _task: tasks[randomTaskIndex]._id
            }

            // verify token and decode user data
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY)

            // Find user in db and update the data
            user = await User.findByIdAndUpdate(
                { _id: user._id },
                { $push: { tasks: task } },
                { new: true }
            )

            // Return with user and the task
            return {
                task: task,
                user: user
            }


        } catch (err) {

            // Catch unexpected errors
            throw new Error(err)
        }

    }

}