export default abstract class LanguageServiceInterface<T> {

  readonly content: T;
  readonly fileName: string;
  readonly extension: string

  protected constructor(fileContent: T, fileName: string, extension: string) {
    this.content = fileContent;
    this.fileName = fileName;
    this.extension = extension;
  }

  abstract addProperty(path: string, object: unknown): void;

  abstract removeProperty(path: string): void;

  abstract exportToFile(): string;

  abstract convertFileToJSON(file: string): T;
}
