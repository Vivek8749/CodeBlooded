class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode < 400;
        this.message = message;
        this.data = data;
        this.success = true;
        this.errors = [];
    }
}

export { ApiResponse };
