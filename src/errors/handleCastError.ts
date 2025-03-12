import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';


const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorDetails: TErrorSource = [
    {
      field: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    success:false,
    statusCode,
    message: 'Invalid Id',
    errorDetails,
  };
};

export default handleCastError;