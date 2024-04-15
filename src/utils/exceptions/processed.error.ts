import {randomUUID, UUID} from 'node:crypto';
import {InvalidResponseBodyException} from './InvalidResponseBodyException';
import Exception from './Exception';

export type ProcessedError = {
  id: UUID,
  statusCode?: string
  message: string
  info?: string
}

export function errorProcessor(err: InvalidResponseBodyException | Exception): ProcessedError {
  let processedError: ProcessedError;

  err instanceof InvalidResponseBodyException
      ? processedError = {
        id: randomUUID(),
        message: err.message,
        info: err.validationErrMsg
      }
      : processedError = {
        id: randomUUID(),
        message: err.message
      }

  return processedError;
}