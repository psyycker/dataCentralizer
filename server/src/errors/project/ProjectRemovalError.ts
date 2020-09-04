import GenericError from "../GenericError";

export default class ProjectRemovalError extends GenericError {
  constructor(customMessage = "Error when removing project") {
    super(customMessage);
  }

}
