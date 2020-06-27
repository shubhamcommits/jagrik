import { Auth, User } from '../models'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export class AuthService {

  /**
   * This function defines the business logic behind signing in a user
   * @param email 
   * @param password 
   * @param device - optional
   */
  async signIn(email: string, password: string, device?: any) {
    try {
      let fetchUser;
      return await User.findOne({email:email})

        // if user exists, update Auth db, return renewed JWT
        .then(async (user) => {
          // user exists
          if (user) {
            fetchUser=user;
            let authFailed = false;
            // Check password
             await bcrypt.compare(password,fetchUser.password)
            .then(async (result) => {
              console.log(result);
              if(!result){
                authFailed = true;
              }else{
                User.findByIdAndUpdate({ _id: fetchUser._id }, { active: true })
              }
            })

            if(authFailed){
              return;
            }
            // update JWT expiration
            const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
              expiresIn: "1d",
            })

            // Update the authentication logs
            await Auth.findOneAndUpdate(
              { _user: user._id },
              {
                last_login: moment().format(),
                device: device || {},
                is_logged_in: true,
                token: token,
              }
            )

            // Return the token
            return { user, token }
          }
        })

        // Else throw an error
        .catch((error) => {
          return error
        })

    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * This function defines the business logic behind signing in a user
   * @param first_name 
   * @param last_name 
   * @param email 
   * @param password 
   * @param role 
   * @param device - optional
   */
  async signUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    device?: any
  ) {
    
    let newUser;
    // bcrypt the password
    try{
      await bcrypt.hash(password,10)
      .then(async (hash) =>{
      // create a user obj to put in the User db
        newUser = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hash,
          active: true,
          full_name: (first_name + '' + last_name).toLowerCase(),
          role: role,
        }
        console.log("The Data is:",newUser);
      });
    }catch(error) {
      throw new Error(error)
    }

    console.log(newUser);

    // check if user already exists
    try {

      // inserting the user obj into the User db and creating a log of it through the Auth model
      return await User.findOne({ email: email })
        .then((user) => {
          if (user) {
            throw new Error('Email already in use')
          }
          return null;
        })
        .then(() => {
          return User.create(newUser)
        })

        // generate a jwt token & create a log entry of user entry
        .then(async (user) => {
          const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
            expiresIn: '1d',
          })

          // New Authentication logs object
          let newAuthUser = {
            token: token,
            device: device || {},
            _user: user,
          }

          // Create new authentication logs
          await Auth.create(newAuthUser)

          // Return the token
          return { user, token }
        })

        // return token to user
        .then((token) => {
          return token
        })

        .catch((err) => {
          throw new Error(err)
        })

    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * This function defines the business logic behind the signining out the user
   * @param userId 
   */
  async signOut(userId: string) {

    // find user by id, and set as inactive, update auth db is_logged_in to false
    try {
      return await User.findByIdAndUpdate({ _id: userId }, { active: false })
        .then(async (user) => {

          // if user exists, then also update the auth db
          if (user) {

            // Update the auth logs
            await Auth.findOneAndUpdate(
              { _user: userId },
              { is_logged_in: false },
              { new: true }
            )
          }

          return 'signed out'
        })

        // throw any errors up to the user
        .catch((error) => {
          throw new Error(error)
        })
    } catch (error) {
      throw new Error(error)
    }
  }
}
