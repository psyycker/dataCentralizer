import { IUserSchema } from '../database/schemas/user'
import UUIDGenerator from './UUIDGenerator'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/Token'

export function getTokenPayloadForUser (user: IUserSchema): TokenPayload {
  return {
    password: user.password,
    email: user.email,
    id: user._id
  }
}

export function createTokenSalt (): string {
  return UUIDGenerator(15)
}

export function createToken (user: IUserSchema): string {
  return generateToken(getTokenPayloadForUser(user), user.tokenSalt)
}

export function generateToken (payload: TokenPayload, salt: string): string {
  return jwt.sign(payload, salt)
}

export function decodeToken (token: string, salt: string): TokenPayload {
  return jwt.verify(token, salt) as TokenPayload
}
