import User, { IUserSchema } from './index'
import GenericError from '../../../errors/GenericError'
import { createToken } from '../../../utils/token'
import UserNotFoundError from '../../../errors/UserNotFoundError'
import bcrypt from 'bcrypt'
import WrongCredentialsError from '../../../errors/WrongCredentialsError'

export function userExists (email: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    User.exists({ email }, (err, result) => {
      if (err) { reject(new GenericError('Error on user.exists')) }
      resolve(result)
    })
  })
}
export function createUser (email: string, password: string, passwordSalt: string, tokenSalt: string, includesToken: boolean = false): Promise<string | null> {
  return new Promise<string>((resolve, reject) => {
    const user = new User(
      {
        email,
        password,
        passwordSalt,
        tokenSalt
      }
    )
    user.save((err, result) => {
      if (err) {
        reject(new GenericError('Could not create user'))
        return
      }
      if (!includesToken) {
        resolve()
        return
      }
      const token = createToken(result)
      result.token = token
      result.save((err, result) => {
        if (err) {
          reject(new GenericError('Could not save user'))
          return
        }
        resolve(token)
      })
    })
  })
}

export function getUserWithToken (token: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>((resolve, reject) => {
    User.findOne({ token }, (err, result) => {
      if (err || result == null) {
        reject(new UserNotFoundError())
        return
      }
      resolve(result)
    })
  })
}

export function findUserWithEmail (email: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>((resolve, reject) => {
    User.findOne({ email }, (err, result) => {
      if (err) {
        reject(new GenericError(err))
        return
      }
      if (result == null) {
        reject(new UserNotFoundError())
        return
      }
      resolve(result)
    })
  })
}

export function checkUser (email: string, password: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>(async (resolve, reject) => {
    try {
      const user = await findUserWithEmail(email)
      if (bcrypt.compareSync(password, user.password)) {
        resolve(user)
      } else {
        reject(new WrongCredentialsError())
      }
    } catch (e) {
      reject(new WrongCredentialsError())
    }
  })
}
