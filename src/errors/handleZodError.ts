import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    success:false,
    statusCode,
    message: 'Zod Validation Error',
    errorDetails
  };
};

export default handleZodError;