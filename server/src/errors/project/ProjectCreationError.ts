import GenericError from "../GenericError";

export default class ProjectCreationError extends GenericError {
  constructor(customMessage = "Error when creating project") {
    super(customMessage);
  }

}
