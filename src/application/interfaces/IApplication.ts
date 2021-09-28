export interface IApplication<Parameters, Result> {
  handle: (param: Parameters) => Result
}
