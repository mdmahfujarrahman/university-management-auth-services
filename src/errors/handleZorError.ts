import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  console.log(
    error.issues.map(i => i.path),
    'ZOD ERROR'
  );
  const errors: IGenericErrorMessage[] = error.issues.map((i: ZodIssue) => {
    return {
      path: i?.path[i?.path.length - 1],
      message: i?.message,
    };
  });
  const statusCode = 400;

  return { statusCode, message: 'Validation Error', errorMessages: errors };
};

export default handleZodError;
