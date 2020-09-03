import User, {IUserSchema} from "./index"
import GenericError from "../../errors/GenericError";
import {createToken} from "../../utils/token";
import UserNotFoundError from "../../errors/UserNotFoundError";
import bcrypt from 'bcrypt';
import WrongCredentialsError from "../../errors/WrongCredentialsError";

export function userExists(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve, rejects) => {
    User.exists({email}, (err, result) => {
      if (err)
        rejects(new GenericError("Error on user.exists"))
      resolve(result);
    })
  })
}
export function createUser(email: string, password: string, passwordSalt: string, tokenSalt: string, includesToken: boolean = false): Promise<string | null> {
  return new Promise<string>((resolve, rejects) => {
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
        rejects(new GenericError("Could not create user"));
        return;
      }
      if (!includesToken) {
        resolve();
        return
      }
      const token = createToken(result);
      result.token = token;
      result.save((err, result) => {
        if (err) {
          rejects(new GenericError("Could not save user"))
          return;
        }
        resolve(token);
      })
    })
  })
}

export function getUserWithToken(token: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>((resolve, rejects) => {
    User.findOne({token}, (err, result) => {
      if (err || result == null) {
        rejects(new UserNotFoundError())
        return;
      }
      resolve(result);
    })
  })
}

export function findUserWithEmail(email: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>((resolve, rejects) => {
    User.findOne({email}, (err, result) => {
      if (err) {
        rejects(new GenericError(err));
        return;
      }
      if (result == null) {
        rejects(new UserNotFoundError());
        return;
      }
      resolve(result);
    })
  })
}

export function checkUser(email: string, password: string): Promise<IUserSchema> {
  return new Promise<IUserSchema>(async (resolve, rejects) => {
    try {
      const user = await findUserWithEmail(email);
      if (bcrypt.compareSync(password, user.password)) {
        resolve(user);
      } else {
        rejects(new WrongCredentialsError());
      }
    } catch (e) {
      rejects(new WrongCredentialsError());
    }
  })
}

/*
if (bcrypt.compareSync(password, user.password)) {
          resolve(user);
        } else {
          reject(new Error('Wrong password'));
        }
 */
// export function matchUserPassword() {
//
// }
