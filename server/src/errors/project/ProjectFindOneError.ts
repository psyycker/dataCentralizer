import GenericError from "../GenericError";

export default class ProjectFindOneError extends GenericError {
  constructor(customMessage = "Error when finding project") {
    super(customMessage);
  }

}
