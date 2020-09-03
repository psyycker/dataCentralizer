import GenericError from "./GenericError";

export default class UserExistsError extends GenericError {
  constructor(customMessage = "User with same email address already exists") {
    super(customMessage);
  }
}
