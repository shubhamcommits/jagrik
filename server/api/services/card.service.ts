import { Card } from '../models/card.model'
import { Readable } from 'stream'

export class CardService {

    /**
     * This function is responsible for creating the lists of the cards
     * @param cards 
     */
    async initCards(cards: Array<any>) {

        return new Promise((resolve) => {

            // Create readable stream from the array list of cards
            const readableStream = Readable.from(cards)

            // Turn on the stream and repeat the process to create cards
            readableStream.on('data', async (card) => {
                await Card.create(card)
            })

            // Resolve promise with success
            resolve('Cards created!')
        })
    }

}