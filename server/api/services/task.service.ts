import { Card, Task } from '../models'
import { Readable } from 'stream'

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

}