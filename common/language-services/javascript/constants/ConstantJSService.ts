import LanguageServiceInterface from "../../LanguageServiceInterface";
import ConstantJSTypes from "./ConstantJSTypes";

export default class ConstantJSService extends LanguageServiceInterface<ConstantJSTypes> {

  constructor(content: ConstantJSTypes, fileName: string) {
    super(content, fileName, "js");
  }

  addProperty(path: string, object: unknown): void {
  }

  convertFileToJSON(file: string): ConstantJSTypes {
    return {};
  }

  exportToFile(): string {
    return "";
  }

  removeProperty(path: string): void {
  }

}
