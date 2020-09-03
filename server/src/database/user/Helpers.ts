import User, {IUserSchema} from "./index"
import GenericError from "../../errors/GenericError";
import {createToken} from "../../utils/token";

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
