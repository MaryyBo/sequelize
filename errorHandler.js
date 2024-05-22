const { ValidationError } = require('yup');

module.exports.errorHandler = async (req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).send(err.message);
    }
}