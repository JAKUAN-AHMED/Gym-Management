import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorDetails: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        field: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    success:false,
    statusCode,
    message: 'Validation Error',
    errorDetails,
  };
};
export default handleValidationError;