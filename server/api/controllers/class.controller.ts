import { Request, Response, NextFunction } from 'express'
import { ClassService } from '../services'

// Create Authentication Service instance
const classService = new ClassService()

export class ClassController {

  /**
   * This function is responsible for creation a class
   * @param { headers: { authorization } }req 
   * @param res 
   * @param next 
   */
  async createClass(req: Request, res: Response, next: NextFunction) {
    try {

      // Fetch the headers from the request
      let { headers: { authorization } } = req

      // Call the create class service function
      await classService
        .createClass(authorization)
        .then((response) => {
          return res.status(200).json({
            message: 'User has successfully created a class!',
            class: response.class
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error!',
        error: new Error(err || ' Internal Server Error'),
      })
    }
  }

  /**
   * This function is responsible for fetching the class details
   * @param { query: { classId } }req 
   * @param res 
   * @param next 
   */
  async getClassDetails(req: Request, res: Response, next: NextFunction) {
    try {

      // Fetch the classId from the request
      let { query: { classId } } = req

      // Call the get class details service function
      await classService
        .getClassDetails(classId.toString())
        .then((class_details) => {
          return res.status(200).json({
            message: 'Class has been successfully found!',
            class: class_details,
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error!',
        error: new Error(err || ' Internal Server Error'),
      })
    }
  }

  /**
   * This function is responsible for removing a class
   * @param { body: { jagrik_class }, headers: { authorization } } req 
   * @param res 
   * @param next 
   */
  async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {

      // Fetch the required contents from the request
      let {
        params: { classId },
        headers: { authorization }
      } = req

      // Call the delete class service function
      await classService
        .deleteClass(authorization, classId)
        .then((class_details) => {
          return res.status(200).json({
            message: 'Class has been successfully deleted!',
            class: class_details,
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error!',
        error: new Error(err || ' Internal Server Error'),
      })
    }
  }

  /**
   * This function is responisble for fetching the classes list for currently loggedIn user
   * @param { headers: { authorization } } req 
   * @param res 
   * @param next 
   */
  async getUserClasses(req: Request, res: Response, next: NextFunction) {
    try {

      // Fetch the authorization header from the request
      let { headers: { authorization } } = req

      // Call the service function to get all the classes
      await classService
        .getUserClasses(authorization)
        .then((classes) => {
          return res.status(200).json({
            message: 'Classes have been successfully found!',
            classes: classes,
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error!',
        error: new Error(err || ' Internal Server Error'),
      })
    }
  }
}
