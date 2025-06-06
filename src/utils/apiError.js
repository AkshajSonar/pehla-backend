

class ApiError extends Error {  // Custom error class for API errors
  constructor(statusCode, message = "An error occurred",errors = [],stack = ""){
        super(message) // Call the parent constructor with the error message
        this.statusCode = statusCode;
        this.data = null
        this.message = message;
        this.success = false;
        this.errors = errors
        if(stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);  
        }
    }
}
export {ApiError}   
