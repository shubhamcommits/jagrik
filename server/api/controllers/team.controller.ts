import { Request, Response, NextFunction } from "express"
import { TeamService } from "../services"

// User Service Instance
const teamService = new TeamService()

export class TeamController {

    /**
     * This function is responsible for assigning a random task to user
     * @param req 
     * @param res 
     * @param next 
     */
    async assignRandomCard(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the headers and user data from the request
            let {
                body: {
                    card_theme, week, teamId
                },
            } = req


            // Call assign random task to user service function
            await teamService.assignRandomSelfCard(card_theme, week, teamId)

                // Proceed with the status 200 response
                .then((response) => {
                    return res.status(200).json({
                        message: "Team has been assigned with a random card!",
                        team: response.team,
                        card: response.card
                    })
                })

                // Catch the errors from the service function
                .catch((err) => {
                    return res.status(400).json({
                        message:
                            "Bad Request, kindly trace the error stack for more details!",
                        error: new Error(
                            err ||
                            "Bad Request, kindly trace the error stack for more details!"
                        ),
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
                error: new Error(err || "Internal Server Error!"),
            })
        }
    }


}
