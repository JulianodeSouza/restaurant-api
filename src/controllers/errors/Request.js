class RequestErrors extends Error {
  requestErrors = [];

  constructor(message, errors) {
    super(message);
    this.requestErrors = errors || [];
  }
}

module.exports = RequestErrors;
