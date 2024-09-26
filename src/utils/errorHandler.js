class InvalidPaginationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidPaginationError';
        this.statusCode = 400;
    }
}

class ExternalApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExternalApiError';
        this.statusCode = 502;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (err instanceof InvalidPaginationError) {
        return res.status(400).json({ error: err.message });
    }
    if (err instanceof ExternalApiError) {
        return res.status(502).json({ error: err.message });
    }
    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    res.status(statusCode).json({
        error: message,
    });
};

module.exports = {
    InvalidPaginationError,
    ExternalApiError,
    NotFoundError,
    errorHandler,
};
