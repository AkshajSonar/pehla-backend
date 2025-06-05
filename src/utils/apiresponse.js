class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(data = null, message = "Operation successful") {
    return new ApiResponse(200, data, message);
  }

  static error(message, data = null) {
    return new ApiResponse(500, data, message);
  }
}

export default ApiResponse;