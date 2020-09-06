export default class GenericError extends Error {
  constructor (message: string) {
    super(message)
    console.error(this)
  }
}
