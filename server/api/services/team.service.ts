import { User, Card, Team } from "../models";
import { Readable } from 'stream'
import jwt from "jsonwebtoken";

export class TeamService {

    /**
     * This function is responsible for assigning a random card to team
     * @param card_theme 
     * @param week
     * @param token 
     */
    async assignRandomSelfCard(card_theme: any, week: any, teamId: string) {
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

            // check if task exist or not
            let taskExistForWeek = await Team.findOne({
                _id: teamId,
                'tasks': { $elemMatch: { week: week } }
            })

            if (!taskExistForWeek) {
                // Find the team
                let team: any = await Team.findOneAndUpdate(
                    { _id: teamId },
                    { $push: { tasks: task } },
                    { new: true }
                )

                // List of all users
                let userIds = team.team_members

                // Create readable stream from the array list of userIds
                const readableStream = Readable.from(userIds)

                // Turn on the stream and repeat the process to update the users
                readableStream.on('data', async (userId) => {
                    await User.findByIdAndUpdate(
                        { _id: userId },
                        { $push: { tasks: task } },
                        { new: true }
                    )
                })

                return {
                    team: team,
                    card: cards[randomCardIndex]
                }
            } else {

                // Catch unexpected errors
                throw new Error('Card has already been assigned to the week!')
            }


        } catch (err) {

            // Catch unexpected errors
            throw new Error(err)
        }

    }

    async submitTaskPoints(token: any, teamId: string, teamPoints: String) {
        try {
          // verify token and decode user data
          let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
          let user:any = await User.findById({_id: userVerify._id});
          // check if the user has the correct permissions to create a class
          if (user.role === "facilitator" || user.role === "super-admin") {
            let team: any = Team.find({_id: teamId},{team_creator: user._id});
            if(team){
                await Team.findOneAndUpdate(
                    { _id: teamId},
                    {points: teamPoints}
                );
                return;
            }else{
                throw new Error("401 - Access denied");
            }
          } else {
            throw new Error("401 - Access denied");
          }
        } catch (err) {
          // Catch unexpected errors
          throw new Error(err);
        }
      }
}