import { User, Class } from '../models'
import jwt from 'jsonwebtoken'

export class ClassService {

  /**
   * This function defines the business logic behind the creation of a class
   * @param token 
   */
  async createClass(token: any) {
    try {

      // verify token and decode user data
      let user: any = jwt.verify(token.split(' ')[1], process.env.JWT_KEY)

      // check if the user has the correct permissions to create a class
      if (user.role === 'facilitator' || user.role === 'super-admin') {

        // create a class -> save the user id as the class_creator
        let jagrik_class = await Class.create({ class_creator: user._id })

        // save class id in user profile
        let user_profile = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { classes: jagrik_class._id } },
          { new: true }
        )

        return { class: jagrik_class }

      } else {
        throw new Error('401 - Access denied')
      }

    } catch (err) {

      // Catch unexpected errors
      throw new Error(err)
    }
  }

  /**
   * This function is responsible for defining the business logic behind fetching a class detail
   * @param classId
   */
  async getClassDetails(classId: String) {
    try {

      // Fetch the class by id
      let jagrik_class = await Class.findById({ _id: classId })

      // Return class
      return jagrik_class

    } catch (err) {

      // Catch unexpected errors
      throw new Error(err)
    }
  }

  /**
   * This function is responsible for defining the business logic behind deleting a class
   * @param token 
   * @param classId
   */
  async deleteClass(token: any, classId: String) {
    try {

      // verify token and decode user data
      var user: any = jwt.verify(token.split(' ')[1], process.env.JWT_KEY)

      // check if User has the privileges to delete a class
      if (user.role !== 'facilitator' && user.role !== 'super-admin') {
        throw new Error('401 - Access Denied')
      }

      // delete the class in db
      let jagrik_class = await Class.findByIdAndDelete({ _id: classId })

      // delete all references to class in user lists
      let user_classes = await User.updateMany(
        { _id: user._id },
        { $pullAll: { classes: [classId] } }
      )

      // Return deleted class
      return jagrik_class

    } catch (err) {

      // Catch unexpected errors
      throw new Error(err)
    }
  }

  /**
   * This function is responsible for defining the business logic behind fetching currently loggedIn user's class list
   * @param token 
   */
  async getUserClasses(token: any) {
    try {

      // verify token and decode user data
      var userAuth: any = jwt.verify(token.split(' ')[1], process.env.JWT_KEY)

      // fetch the user from the database
      let user: any = await User.findById({ _id: userAuth._id })

      // convert the user
      user = user.toJSON()

      // return classes list
      return user.classes

    } catch (err) {

      // Catch unexpected errors
      throw new Error(err)
    }
  }
}
