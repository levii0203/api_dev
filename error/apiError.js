

class ApiError extends Error {
    constructor(name, status, err) {
        super()
        this.name = name;
        this.statusCode = status;
        this.message = err;
    }
}

module.exports = ApiError