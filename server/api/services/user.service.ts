import { User, Card, Task, Team } from "../models";
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

    async taskSupportingDocUpload(img_data: Buffer, token: any, taskId: String, experience_description: String, teamId: String) {
        try {
            console.log("token: ", token);
            //verify token and decode user data
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

            let taskSelected: any = await Task.find({ _id: taskId });

            let taskCategory = taskSelected.category

            if (taskCategory == 'Individual') {
                //find user in db
                await User.updateOne(
                    { _id: user._id, "task._task": taskId },
                    { $set: { "task.$.supporting_doc": img_data, "task.$.experience_description": experience_description, "task.$.status": 'completed' } },
                ).catch((err) => {
                    throw new Error(err);
                });
                // https://docs.mongodb.com/manual/reference/operator/update/positional/
            } else {
                await Team.updateOne(
                    { _id: teamId, "task._task": taskId },
                    { $set: { "task.$.supporting_doc": img_data, "task.$.experience_description": experience_description, "task.$.submitted_by": user.first_name, "task.$.status": 'completed' } },
                ).catch((err) => {
                    throw new Error(err);
                });
            }
            return "Doc Uploaded!";
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
    }

    async getUserTeam(token: any) {

        // Write here

    }

    /**
     * This function is responsible for assigning a random task
     * @param card_theme 
     * @param week
     * @param token 
     */
    async assignRandomSelfCard(card_theme: any, week: any, token: any) {
        try {

            // Find the list of cards
            let cards = await Card.find({
                theme: card_theme
            })

            // Map the list of card Ids
            let cardIds = cards.map((card) => {
                return card._id
            })

            // Random card Index
            let randomCardIndex = Math.floor((Math.random() * cardIds.length))

            // Random card
            let task = {
                _card: cardIds[randomCardIndex],
                week: week
            }

            // verify token and decode user data
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY)

            let taskExistForWeek = await User.findOne({
                _id: user._id,
                'tasks': { $elemMatch: { week: week } }
            })

            // Find user in db and update the data
            if (!taskExistForWeek) {
                user = await User.findByIdAndUpdate(
                    { _id: user._id },
                    { $push: { tasks: task } },
                    { new: true }
                )
                // Return with user and the task
                return {
                    card: cards[randomCardIndex],
                    user: user
                }
            } else {

                // Catch unexpected errors
                throw new Error('Card has already been assigned to the user!')
            }


        } catch (err) {

            // Catch unexpected errors
            throw new Error(err)
        }

    }

}