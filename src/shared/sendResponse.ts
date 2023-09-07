import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  message?: string | null;
  success: boolean;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const { statusCode, message, success, data: responseData } = data;

  const response: IApiResponse<T> = {
    statusCode,
    success,
    message: message || null,
    data: responseData || null,
  };

  res.status(statusCode).json(response);
};

export default sendResponse;
