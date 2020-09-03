import { IResolvers } from 'graphql-tools';
import {AuthenticateResponse, MutationRegisterArgs} from "../generated/graphql";
import {createUser, userExists} from "../../database/user/Helpers";
import UserExistsError from "../../errors/UserExistsError";
import UUIDGenerator from "../../utils/UUIDGenerator";
import bcrypt from 'bcrypt';

export const UserResolvers: IResolvers = {
  Query: {
    login(_: void, args: unknown): string {
      return "token"
    }
  },
  Mutation: {
    async register(_: void, args: MutationRegisterArgs): Promise<AuthenticateResponse> {
      const { email, password } = args;
      const exists = await userExists(email);
      if (exists) {
        throw new UserExistsError();
      }
      const passwordSalt = bcrypt.genSaltSync(10);
      const tokenSalt = UUIDGenerator();
      const passwordHash = bcrypt.hashSync(password, passwordSalt);
      return {
        token: await createUser(email, passwordHash, passwordSalt, tokenSalt, true) as string
      }
    }
  }
}
