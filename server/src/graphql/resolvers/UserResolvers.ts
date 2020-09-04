import { IResolvers } from 'graphql-tools';
import {AuthenticateResponse, MutationRegisterArgs, QueryLoginArgs} from "../generated/graphql";
import {checkUser, createUser, userExists} from "../../database/schemas/user/Helpers";
import UserExistsError from "../../errors/UserExistsError";
import UUIDGenerator from "../../utils/UUIDGenerator";
import bcrypt from 'bcrypt';

export const UserResolvers: IResolvers = {
  Query: {
    async login(_: void, args: QueryLoginArgs): Promise<AuthenticateResponse> {
      const { email, password  } = args;
      const user = await checkUser(email, password);
      return {
        token: user.token
      }
    },
    test(_: void, args: unknown): string {
      return "hello";
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
