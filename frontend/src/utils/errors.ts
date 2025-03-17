export class AuthError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'AuthError'
  }
}
export class FetchError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FetchError'
  }
}
