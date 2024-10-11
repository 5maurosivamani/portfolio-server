class ValidationError extends Error {
    constructor(message = "Validation failed") {
      super(message);
      this.name = "ValidationError";
      this.status = 400;
    }
  }
  
  module.exports = ValidationError;
  