import { Card, Task } from '../models'
import { Readable } from 'stream'
import { cards } from '../utils/data'

export class TaskService {

    /**
     * This function is responsible for creating the lists of the tasks
     * @param tasks 
     */
    async initTasks(tasks: Array<any>) {

        return new Promise((resolve) => {

            // Create readable stream from the array list of tasks
            const readableStream = Readable.from(tasks)

            // Turn on the stream and repeat the process to create tasks
            readableStream.on('data', async (task) => {

                // Split the term into 3 different objects
                task._card = task.card.split(" ")

                // Set the category of tasks
                task.category = (task.title.split("-")[1] == 'Com') ? 'community': 'self'

                // Find the card on the basis of the theme and dice_number
                let card: any = await Card.findOne({
                    theme: task._card[0] + " " + task._card[1],
                    dice_number: parseInt(task._card[2])
                })

                // Set the _card property
                task._card = card._id

                // Create list of tasks
                await Task.create(task)
            })

            // Resolve promise with success
            resolve('Tasks created!')
        })
    }

    /**
     * This function fetches all the tasks related to a particular cardId
     * @param cardId 
     */
    async getTasks(cardId: any){
        try{

            let card = await Card.findById(cardId)

            let tasks = await Task.find({
                _card: cardId
            })

            return {
                card: card,
                tasks: tasks
            }
            
        } catch(err){
            throw new Error(err)
        }
    }

}