import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
import mongoose from 'mongoose';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(el => {
    return { path: el?.path, message: el?.message };
  });
  const statusCode = 400;

  return { statusCode, message: 'Validation Error', errorMessages: errors };
};

export default handleValidationError;
