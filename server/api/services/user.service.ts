import { User, Card, Task, Team, Class } from "../models";
import jwt from "jsonwebtoken";
import { Readable } from 'stream'

export class UserService {


    async get(token: any) {
        let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);

        user = await User.findOne(({
            _id: user._id
        })).populate('teams')

        return {
            user: user
        }
    }

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

    async profilePictureUpdate(img_data: String, token: any) {
        try {
            console.log("token: ", token);
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});
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

    async taskSupportingDocUpload(img_data: any[], token: any, taskId: String, teamId: String, description: any) {
        try {
            //verify token and decode user data
            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user:any = await User.findById({_id: userVerify._id});

            let taskSelected: any = await Task.findOne({ _id: taskId });            

            let taskCategory = taskSelected.category;

            let updated_tasks=[];
            
            if (taskCategory == 'self') {
                //find user in db
                console.log("self",user.tasks);

                for(let i in user.tasks){
                    
                    console.log(user.tasks[i]._card);
                    console.log(taskSelected._card);

                    if (JSON.stringify(user.tasks[i]._card) === JSON.stringify(taskSelected._card)){
                        user.tasks[i]._task = taskId;
                        // user.tasks[i].description = description;
                        user.tasks[i].supporting_doc = img_data[0];
                        user.tasks[i].supporting_docs = img_data;
                        user.tasks[i].ques_review = JSON.parse(description);
                        user.tasks[i].status = 'complete';
                        console.log("Matched");
                    }
                    updated_tasks.push(user.tasks[i]);  
                }

                if(updated_tasks.length!=0){
                    await User.findByIdAndUpdate(
                        { _id: user._id },
                        { tasks: updated_tasks },
                    ).catch((err) => {
                        throw new Error(err);
                    });     
                }
                // https://docs.mongodb.com/manual/reference/operator/update/positional/
            } else {
                let team:any = await Team.findById({_id: teamId});                
                
                for(let i in team.tasks){

                    if (JSON.stringify(team.tasks[i]._card) === JSON.stringify(taskSelected._card)){
                        team.tasks[i]._task = taskId;
                        // team.tasks[i].description = description;
                        team.tasks[i].supporting_doc = img_data[0];
                        team.tasks[i].supporting_docs = img_data;
                        team.tasks[i].ques_review = JSON.parse(description);
                        team.tasks[i].status = 'complete';
                    }
                    updated_tasks.push(team.tasks[i]);  
                }
                if(updated_tasks.length!=0){
                    await Team.findByIdAndUpdate(
                        { _id: teamId},
                        { tasks: updated_tasks},
                    ).catch((err) => {
                        throw new Error(err);
                    });
                }
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
                week: week,
                type: 'general'
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

    async assignWildCard(token: any) {
        try {
            let user: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            // Find the list of cards
            let team: any = await Team.findOne({ _id: user.teams[0]._id });
            let card = await Card.findOne({ theme: 'child rights' });

            let task = {
                _card: card.id,
                status: 'to do',
                type: 'wild'
            }

            // check if task exist or not
            let taskExistForWeek = await Team.findOne({
                _id: user.teams[0],
                tasks: { $elemMatch: { type: 'wild' } },
            });

            if (!taskExistForWeek) {
                // Find the team
                let team: any = await Team.findOneAndUpdate(
                    { _id: user.teams[0] },
                    { $push: { tasks: task } },
                    { new: true }
                );

                // List of all users
                let userIds = team.team_members;

                // Create readable stream from the array list of userIds
                const readableStream = Readable.from(userIds);

                // Turn on the stream and repeat the process to update the users
                readableStream.on('data', async (userId) => {
                    await User.findByIdAndUpdate(
                        { _id: userId },
                        { $push: { tasks: task } },
                        { new: true }
                    );
                });

                return {
                    team: team
                };
            } else {
                // Catch unexpected errors
                throw new Error('Card has already been assigned to the week!');
            }
        } catch (err) {
            // Catch unexpected errors
            throw new Error(err);
        }

        
    }

    async wildTaskSupportingDocUpload(img_data: String, token: any, taskId: String, experience_description: String, description: String, title: String) {
        try {
            //verify token and decode user data

            let userVerify: any = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
            let user: any = await User.findById({ _id: userVerify._id });

            let wildTask = []

            user.wild_tasks.forEach(element => {

                if (element.status === 'to do') {
                    element._task = taskId
                    element.description = description
                    element.title = title
                    element.wild_task_description = experience_description
                    element.status = 'complete'
                    element.supporting_doc = img_data
                }
                    wildTask.push(element)
                
            });

            user = await User.findByIdAndUpdate({ _id: userVerify._id }, { wild_tasks: wildTask });
            return { user: user, message: 'Docs Uploaded'};
        } catch (err) {
            //catch unexpected errors
            throw new Error(err);
        }
    }
}