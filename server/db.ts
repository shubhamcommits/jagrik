import mongoose from 'mongoose'
import { cards, tasks } from './api/utils/data'
import { CardService, TaskService } from './api/services'

// Cards Service
const cardService = new CardService()

// Tasks Service
const taskService = new TaskService()

// Get Mongoose to use global promise library to avoid error messages
mongoose.Promise = global.Promise

// Set up mongoose connection
var dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/jagrik'

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

// Connect mongoose to db
mongoose.connect(dbURL, options).catch((err) => {
  // Catch the Error on Production
  console.log('mongoose error: ', err)
  dbURL = 'mongodb://127.0.0.1:27017/jagrik'
  mongoose.connect(dbURL, options)
})

// Log Mongoose connection status changes:
mongoose.connection.on('connected', () => {
  
  // eslint-disable-next-line no-console
  console.log(`  🗄  Mongoose connection is open on\n\t${dbURL}`)

  // List the collections
  mongoose.connection.db.listCollections().toArray(async function (err, collectionNames) {
    if (err) {
      console.log(err)
      return
    }

    // Find the index from the list of collections
    let index = collectionNames.findIndex((collection) => collection.name === 'cards')
    if (index === -1) {

      // Call service to initialise the cards
      await cardService.initCards(cards)

      // Console the Sucess initialisation
      console.log(`   Cards Initialised Successfully!`)
    } else {
      console.log(`   Skipping cards initialisation, already exists.`)
    }

    // Find the index from the list of collections
    let taskIndex = collectionNames.findIndex((collection) => collection.name === 'tasks')
    if (taskIndex === -1) {

      // Call service to initialise the cards
      // await taskService.initTasks(tasks)

      // Console the Sucess initialisation
      console.log(`   Tasks Initialised Successfully!`)
    } else {
      console.log(`   Skipping tasks initialisation, already exists.`)
    }

  })
})

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Mongoose connection had an error:\n${err}`)
})

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose disconnected.')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log('Mongoose disconnected due to app termination processs.')
    process.exit(0)
  })
})
