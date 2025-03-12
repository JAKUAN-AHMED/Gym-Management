export type TErrorSource = {
    field: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    success:boolean
    statusCode: number;
    message: string;
    errorDetails: TErrorSource;
  };