import Exception from './Exception';

export class InvalidResponseBodyException extends Exception {
  validationErrMsg: string;

  constructor(code:number, message: string, validationErrMsg: string) {
    super(code, message);
    this.validationErrMsg = validationErrMsg;
  }
}