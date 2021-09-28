export class Exception extends Error {
  name: string;

  message: string;

  errors?: unknown;

  constructor(name: string, message: string, errors?: unknown) {
    super();
    this.name = name;
    this.message = message;
    this.errors = errors;
  }
}