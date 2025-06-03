class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(message, data = null) {
    return new ApiResponse('success', message, data);
  }

  static error(message, data = null) {
    return new ApiResponse('error', message, data);
  }
}